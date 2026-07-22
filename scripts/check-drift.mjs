#!/usr/bin/env node
import path from 'node:path';
import { parseArgs } from './lib/core.mjs';
import { checkDrift } from './lib/catalog.mjs';

const args = parseArgs(process.argv.slice(2));
const rootDir = path.resolve(args.root ?? process.cwd());
const result = await checkDrift(rootDir);

for (const error of result.errors) console.error(`ERROR: ${error}`);
if (result.errors.length) {
  process.exitCode = 1;
} else {
  console.log('No catalog drift detected.');
}
