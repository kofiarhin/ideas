#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { parseArgs } from './lib/core.mjs';
import { writeCatalog } from './lib/catalog.mjs';
import { insertProjectEntry, renderGitDiff, resolveProject } from './lib/update.mjs';

const args = parseArgs(process.argv.slice(2));
const required = ['project', 'section', 'classification', 'text'];
const missing = required.filter((key) => !args[key]);
if (missing.length) {
  console.error(`Missing required options: ${missing.map((key) => `--${key}`).join(', ')}`);
  process.exit(1);
}

const rootDir = path.resolve(args.root ?? process.cwd());
const aliasesPath = path.join(rootDir, 'catalog', 'aliases.json');
const projectsPath = path.join(rootDir, 'catalog', 'projects.json');
const aliasesCatalog = JSON.parse(await fs.readFile(aliasesPath, 'utf8'));
const projectsCatalog = JSON.parse(await fs.readFile(projectsPath, 'utf8'));
const projectId = resolveProject(aliasesCatalog, args.project);

if (!projectId) {
  console.error(`Unknown project: ${args.project}. Run npm run hub:index after adding a project.`);
  process.exit(1);
}

const project = projectsCatalog.projects.find((item) => item.id === projectId);
if (!project) {
  console.error(`Catalog entry missing for project: ${projectId}`);
  process.exit(1);
}

const recordPath = path.join(rootDir, project.record);
const current = await fs.readFile(recordPath, 'utf8');
const date = args.date ?? new Date().toISOString().slice(0, 10);
const metadata = [
  args.source ? `Source: ${args.source}` : null,
  args['verified-at'] ? `Verified: ${args['verified-at']}` : null,
].filter(Boolean);
const text = metadata.length ? `${args.text} (${metadata.join('; ')})` : args.text;
const updated = insertProjectEntry(current, {
  section: args.section,
  classification: args.classification,
  text,
  date,
});

const diff = await renderGitDiff(current, updated, project.record);
console.log(diff);

if (!args.apply) {
  console.log('Dry run only. Re-run with --apply after the repository write is approved.');
  process.exit(0);
}

await fs.writeFile(recordPath, updated, 'utf8');
await writeCatalog(rootDir);
console.log(`Updated ${project.record} and regenerated catalog files.`);
