#!/usr/bin/env node
import path from 'node:path';
import { parseArgs } from './lib/core.mjs';
import { writeCatalog } from './lib/catalog.mjs';

const args = parseArgs(process.argv.slice(2));
const rootDir = path.resolve(args.root ?? process.cwd());

try {
  const files = await writeCatalog(rootDir, { check: Boolean(args.check) });
  console.log(args.check ? `Catalog is current (${files.length} files).` : `Generated ${files.length} catalog files.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
