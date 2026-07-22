import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { spawnSync } from 'node:child_process';
import { SECTION_RULES, normalizeLineEndings, normalizeAlias } from './core.mjs';

export function resolveProject(projectsCatalog, input) {
  return projectsCatalog.aliases?.[normalizeAlias(input)] ?? null;
}

export function insertProjectEntry(markdown, { section, text, classification, date }) {
  const allowedHeadings = SECTION_RULES[classification];
  if (!allowedHeadings) throw new Error(`Unknown classification: ${classification}`);
  if (!allowedHeadings.includes(section)) {
    throw new Error(`Classification "${classification}" may only be written to: ${allowedHeadings.join(', ')}.`);
  }

  const normalized = normalizeLineEndings(markdown);
  const heading = `## ${section}`;
  const start = normalized.indexOf(`${heading}\n`);
  if (start === -1) throw new Error(`Section not found: ${section}`);
  const contentStart = start + heading.length + 1;
  const nextHeading = normalized.indexOf('\n## ', contentStart);
  const end = nextHeading === -1 ? normalized.length : nextHeading;
  const sectionBody = normalized.slice(contentStart, end).trimEnd();
  const entry = text.trim().startsWith('- ') ? text.trim() : `- ${text.trim()}`;
  const replacement = `${sectionBody}\n\n${entry}\n`;

  let output = `${normalized.slice(0, contentStart)}${replacement}${normalized.slice(end)}`;
  output = output.replace(
    /\*\*Last updated:\*\*\s*\d{4}-\d{2}-\d{2}/,
    `**Last updated:** ${date}`,
  );
  return output.endsWith('\n') ? output : `${output}\n`;
}

export async function renderGitDiff(oldContent, newContent, filePath) {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ideahub-diff-'));
  const before = path.join(tempDir, 'before.md');
  const after = path.join(tempDir, 'after.md');
  try {
    await fs.writeFile(before, oldContent, 'utf8');
    await fs.writeFile(after, newContent, 'utf8');
    const result = spawnSync(
      'git',
      ['diff', '--no-index', '--label', `a/${filePath}`, '--label', `b/${filePath}`, before, after],
      { encoding: 'utf8' },
    );
    if (result.error) throw result.error;
    return result.stdout || `Proposed update for ${filePath}`;
  } catch {
    return `--- ${filePath}\n+++ ${filePath}\n${newContent}`;
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}
