#!/usr/bin/env node
import path from 'node:path';
import { parseArgs } from './lib/core.mjs';
import { validateHub } from './lib/catalog.mjs';

const args = parseArgs(process.argv.slice(2));
const rootDir = path.resolve(args.root ?? process.cwd());
const result = await validateHub(rootDir);

for (const warning of result.warnings) console.warn(`WARN: ${warning}`);
for (const error of result.errors) console.error(`ERROR: ${error}`);

if (result.errors.length) {
  console.error(`Validation failed with ${result.errors.length} error(s).`);
  process.exitCode = 1;
} else {
  console.log(`Validated ${result.projectCount} project records.`);
}
