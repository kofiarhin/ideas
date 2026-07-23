import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import test from 'node:test';

const ROOT = path.resolve(import.meta.dirname, '..');

test('generated agent runtimes match canonical source fingerprints', () => {
  const result = spawnSync(process.execPath, ['scripts/build-agent-runtime.mjs', '--check'], {
    cwd: ROOT,
    encoding: 'utf8',
  });

  assert.equal(result.status, 0, result.stderr || result.stdout);
});
