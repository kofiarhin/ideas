import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { normalizeAlias, parseProjectsIndex } from '../scripts/lib/core.mjs';
import { buildCatalog, validateHub, writeCatalog } from '../scripts/lib/catalog.mjs';
import { insertProjectEntry } from '../scripts/lib/update.mjs';

async function createFixture() {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'ideahub-test-'));
  await fs.mkdir(path.join(root, 'projects'), { recursive: true });
  await fs.writeFile(
    path.join(root, 'PROJECTS.md'),
    `# Projects\n\n**Last updated:** 2026-07-22\n\n| Project | Summary | Repository | Live | Notes |\n| --- | --- | --- | --- | --- |\n| [Alpha Project](projects/alpha.md) | Alpha summary | https://github.com/example/alpha | — | Active work |\n| [Beta](projects/beta.md) | Beta summary | — | — | No repository |\n`,
  );
  await fs.writeFile(
    path.join(root, 'projects', 'alpha.md'),
    `# Alpha Project\n\n**Last updated:** 2026-07-22\n\n## Snapshot\n\n- **Lifecycle:** Active\n\n## Links\n\n- Repository: https://github.com/example/alpha\n- Related: [Beta](beta.md)\n\n## Current State\n\n- Existing fact.\n\n## Current Focus\n\n- Existing focus.\n\n## Brainstorming\n\n- Existing idea.\n\n## Decisions\n\n- Existing decision.\n\n## Assumptions\n\n- Existing assumption.\n\n## Open Questions\n\n- Existing question.\n\n## Next Actions\n\n- Existing action.\n`,
  );
  await fs.writeFile(
    path.join(root, 'projects', 'beta.md'),
    `# Beta\n\n**Last updated:** 2026-07-21\n\n## Snapshot\n\n- **Lifecycle:** Not documented\n\n## Links\n\n- Repository: Not created\n\n## Current State\n\nNot documented.\n\n## Decisions\n\n- None documented.\n\n## Next Actions\n\n- Document the project.\n`,
  );
  return root;
}

test('parses the canonical project index', async () => {
  const root = await createFixture();
  const markdown = await fs.readFile(path.join(root, 'PROJECTS.md'), 'utf8');
  const projects = parseProjectsIndex(markdown);
  assert.equal(projects.length, 2);
  assert.equal(projects[0].id, 'alpha');
  assert.equal(projects[0].repository, 'https://github.com/example/alpha');
});

test('builds deterministic aliases and relationships', async () => {
  const root = await createFixture();
  const catalog = await buildCatalog(root);
  const projects = catalog['projects.json'].projects;
  assert.equal(projects[0].lifecycle, 'Active');
  assert.deepEqual(projects[0].relatedProjects, ['beta']);
  assert.equal(catalog['aliases.json'].aliases[normalizeAlias('example/alpha')], 'alpha');
});

test('validates the fixture and detects stale catalogs', async () => {
  const root = await createFixture();
  const validation = await validateHub(root);
  assert.deepEqual(validation.errors, []);
  await writeCatalog(root);
  await writeCatalog(root, { check: true });
  await fs.writeFile(path.join(root, 'catalog', 'aliases.json'), '{}\n');
  await assert.rejects(() => writeCatalog(root, { check: true }), /stale/i);
});

test('adds a classified entry without deleting existing content', () => {
  const original = `# Alpha\n\n**Last updated:** 2026-07-20\n\n## Decisions\n\n- Keep this.\n\n## Next Actions\n\n- Existing.\n`;
  const updated = insertProjectEntry(original, {
    section: 'Decisions',
    classification: 'decision',
    text: 'Use generated catalogs.',
    date: '2026-07-22',
  });
  assert.match(updated, /- Keep this\./);
  assert.match(updated, /- Use generated catalogs\./);
  assert.match(updated, /\*\*Last updated:\*\* 2026-07-22/);
  assert.match(updated, /## Next Actions/);
});

test('rejects writing a classification to the wrong section', () => {
  assert.throws(
    () =>
      insertProjectEntry('## Decisions\n\n- Existing.\n', {
        section: 'Decisions',
        classification: 'idea',
        text: 'Wrong destination.',
        date: '2026-07-22',
      }),
    /may only be written/i,
  );
});
