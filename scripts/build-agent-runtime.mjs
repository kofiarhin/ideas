import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import process from 'node:process';

const ROOT = path.resolve(import.meta.dirname, '..');

const RUNTIMES = {
  zoro: {
    version: '1.2.0',
    template: 'runtime/templates/zoro.md',
    output: 'runtime/zoro.md',
    sources: [
      'AGENTS.md',
      'AGENT_COORDINATION.md',
      'zoro/README.md',
      'zoro/INSTRUCTIONS.md',
      'logs/README.md',
    ],
  },
  architect: {
    version: '1.1.0',
    template: 'runtime/templates/architect.md',
    output: 'runtime/architect.md',
    sources: [
      'AGENTS.md',
      'AGENT_COORDINATION.md',
      'architect/README.md',
      'architect/INSTRUCTIONS.md',
      'logs/README.md',
    ],
  },
};

function absolute(relativePath) {
  return path.join(ROOT, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(absolute(relativePath), 'utf8');
}

function gitBlobSha(content) {
  const body = Buffer.from(content, 'utf8');
  return crypto.createHash('sha1').update(`blob ${body.length}\0`).update(body).digest('hex');
}

function sourceFingerprints(paths) {
  return Object.fromEntries(paths.map((sourcePath) => [sourcePath, gitBlobSha(read(sourcePath))]));
}

function buildManifest(generatedAt = new Date().toISOString()) {
  return {
    schemaVersion: 1,
    generatedAt,
    repository: 'kofiarhin/ideahub',
    branch: 'main',
    runtimes: Object.fromEntries(
      Object.entries(RUNTIMES).map(([name, runtime]) => [
        name,
        {
          version: runtime.version,
          path: runtime.output,
          template: runtime.template,
          sources: sourceFingerprints(runtime.sources),
        },
      ])
    ),
  };
}

function writeRuntime() {
  for (const runtime of Object.values(RUNTIMES)) {
    fs.copyFileSync(absolute(runtime.template), absolute(runtime.output));
  }

  fs.writeFileSync(
    absolute('runtime/manifest.json'),
    `${JSON.stringify(buildManifest(), null, 2)}\n`
  );
}

function checkRuntime() {
  const problems = [];
  const manifestPath = absolute('runtime/manifest.json');

  if (!fs.existsSync(manifestPath)) {
    problems.push('runtime/manifest.json is missing.');
  } else {
    const actual = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    const expected = buildManifest(actual.generatedAt);

    for (const [name, runtime] of Object.entries(RUNTIMES)) {
      const actualRuntime = actual.runtimes?.[name];
      const expectedRuntime = expected.runtimes[name];

      if (!actualRuntime) {
        problems.push(`Manifest entry for ${name} is missing.`);
        continue;
      }

      if (actualRuntime.version !== expectedRuntime.version) {
        problems.push(`${name} runtime version is stale.`);
      }

      if (actualRuntime.path !== expectedRuntime.path) {
        problems.push(`${name} runtime path is stale.`);
      }

      if (actualRuntime.template !== expectedRuntime.template) {
        problems.push(`${name} runtime template path is stale.`);
      }

      if (JSON.stringify(actualRuntime.sources) !== JSON.stringify(expectedRuntime.sources)) {
        problems.push(`${name} canonical source fingerprints are stale.`);
      }

      if (!fs.existsSync(absolute(runtime.output))) {
        problems.push(`${runtime.output} is missing.`);
      } else if (read(runtime.output) !== read(runtime.template)) {
        problems.push(`${runtime.output} does not match ${runtime.template}.`);
      }
    }
  }

  if (problems.length > 0) {
    for (const problem of problems) console.error(`- ${problem}`);
    console.error('Run: npm run hub:runtime:build');
    process.exitCode = 1;
    return;
  }

  console.log('Agent runtime files and canonical source fingerprints are current.');
}

if (process.argv.includes('--write')) {
  writeRuntime();
  console.log('Generated agent runtime outputs and manifest.');
} else {
  checkRuntime();
}
