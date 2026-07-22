import fs from 'node:fs/promises';
import path from 'node:path';
import {
  SCHEMA_VERSION,
  LIFECYCLES,
  REQUIRED_PROJECT_SECTIONS,
  normalizeLineEndings,
  normalizeAlias,
  extractLastUpdated,
  extractTitle,
  parseSections,
  extractLifecycle,
  extractRepositoryFromRecord,
  extractProjectLinks,
  parseProjectsIndex,
  buildAliases,
} from './core.mjs';

const ROOT_INDEX = 'PROJECTS.md';
const CATALOG_DIR = 'catalog';

export async function buildCatalog(rootDir) {
  const indexMarkdown = normalizeLineEndings(await fs.readFile(path.join(rootDir, ROOT_INDEX), 'utf8'));
  const indexUpdatedAt = extractLastUpdated(indexMarkdown);
  const indexedProjects = parseProjectsIndex(indexMarkdown);
  const knownRecordPaths = new Set(indexedProjects.map((project) => project.record));
  const projects = [];

  for (const indexed of indexedProjects) {
    const markdown = normalizeLineEndings(await fs.readFile(path.join(rootDir, indexed.record), 'utf8'));
    const lifecycleRaw = extractLifecycle(markdown);
    projects.push({
      ...indexed,
      title: extractTitle(markdown),
      lifecycle: LIFECYCLES.has(lifecycleRaw) ? lifecycleRaw : 'Not documented',
      lifecycleRaw,
      updatedAt: extractLastUpdated(markdown),
      aliases: buildAliases(indexed),
      relatedProjects: extractProjectLinks(markdown, indexed.record, knownRecordPaths),
    });
  }

  const aliasMap = {};
  const repositoryMap = {};
  const relationships = [];
  for (const project of projects) {
    for (const alias of project.aliases) {
      if (aliasMap[alias] && aliasMap[alias] !== project.id) {
        throw new Error(`Duplicate project alias "${alias}" for ${aliasMap[alias]} and ${project.id}`);
      }
      aliasMap[alias] = project.id;
    }
    if (project.repository) {
      const repoKey = normalizeAlias(project.repository);
      if (repositoryMap[repoKey] && repositoryMap[repoKey] !== project.id) {
        throw new Error(`Duplicate repository "${repoKey}"`);
      }
      repositoryMap[repoKey] = project.id;
    }
    for (const target of project.relatedProjects) {
      relationships.push({ source: project.id, target, type: 'related' });
    }
  }

  const common = {
    schemaVersion: SCHEMA_VERSION,
    source: 'PROJECTS.md + projects/*.md',
    projectsIndexUpdatedAt: indexUpdatedAt,
  };
  const lifecycleCounts = Object.fromEntries(
    [...LIFECYCLES].map((lifecycle) => [lifecycle, projects.filter((p) => p.lifecycle === lifecycle).length]),
  );

  return {
    'projects.json': {
      ...common,
      projects: projects.map(({ title, lifecycleRaw, ...project }) => ({
        ...project,
        recordTitle: title,
        lifecycleRaw,
      })),
    },
    'aliases.json': {
      ...common,
      aliases: Object.fromEntries(Object.entries(aliasMap).sort(([a], [b]) => a.localeCompare(b))),
    },
    'repositories.json': {
      ...common,
      repositories: Object.fromEntries(Object.entries(repositoryMap).sort(([a], [b]) => a.localeCompare(b))),
    },
    'relationships.json': {
      ...common,
      relationships: relationships.sort((a, b) =>
        `${a.source}:${a.target}`.localeCompare(`${b.source}:${b.target}`),
      ),
    },
    'workspace-summary.json': {
      ...common,
      projectCount: projects.length,
      lifecycleCounts,
      activeProjectIds: projects.filter((p) => p.lifecycle === 'Active').map((p) => p.id),
      projectsWithoutRepository: projects.filter((p) => !p.repository).map((p) => p.id),
      projectsWithoutLiveUrl: projects.filter((p) => !p.liveUrl).map((p) => p.id),
    },
  };
}

export function stringifyCatalog(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

export async function writeCatalog(rootDir, { check = false } = {}) {
  const catalog = await buildCatalog(rootDir);
  const catalogDir = path.join(rootDir, CATALOG_DIR);
  await fs.mkdir(catalogDir, { recursive: true });
  const mismatches = [];
  for (const [fileName, value] of Object.entries(catalog)) {
    const output = stringifyCatalog(value);
    const target = path.join(catalogDir, fileName);
    if (check) {
      let existing = null;
      try {
        existing = normalizeLineEndings(await fs.readFile(target, 'utf8'));
      } catch (error) {
        if (error.code !== 'ENOENT') throw error;
      }
      if (existing !== output) mismatches.push(path.relative(rootDir, target));
    } else {
      await fs.writeFile(target, output, 'utf8');
    }
  }
  if (check && mismatches.length) throw new Error(`Generated catalog is stale: ${mismatches.join(', ')}`);
  return Object.keys(catalog).map((fileName) => path.posix.join(CATALOG_DIR, fileName));
}

export async function validateHub(rootDir) {
  const errors = [];
  const warnings = [];
  const indexMarkdown = normalizeLineEndings(await fs.readFile(path.join(rootDir, ROOT_INDEX), 'utf8'));
  const indexedProjects = parseProjectsIndex(indexMarkdown);
  const seenIds = new Set();
  const seenRecords = new Set();
  const seenRepositories = new Map();

  if (!extractLastUpdated(indexMarkdown)) errors.push('PROJECTS.md is missing a valid Last updated date.');
  if (!indexedProjects.length) errors.push('PROJECTS.md contains no project rows.');

  for (const project of indexedProjects) {
    if (seenIds.has(project.id)) errors.push(`Duplicate project id: ${project.id}`);
    if (seenRecords.has(project.record)) errors.push(`Duplicate project record: ${project.record}`);
    seenIds.add(project.id);
    seenRecords.add(project.record);

    let markdown;
    try {
      markdown = normalizeLineEndings(await fs.readFile(path.join(rootDir, project.record), 'utf8'));
    } catch {
      errors.push(`Missing project record: ${project.record}`);
      continue;
    }

    const title = extractTitle(markdown);
    if (title !== project.name) errors.push(`${project.record}: title "${title}" does not match index name "${project.name}".`);
    if (!extractLastUpdated(markdown)) errors.push(`${project.record}: missing a valid Last updated date.`);

    const sections = parseSections(markdown);
    for (const section of REQUIRED_PROJECT_SECTIONS) {
      if (!sections.has(section)) errors.push(`${project.record}: missing required section "${section}".`);
    }

    const lifecycle = extractLifecycle(markdown);
    if (!LIFECYCLES.has(lifecycle)) {
      errors.push(`${project.record}: lifecycle "${lifecycle}" is not one of ${[...LIFECYCLES].join(', ')}.`);
    }

    const recordRepository = extractRepositoryFromRecord(markdown);
    if (project.repository && recordRepository && project.repository !== recordRepository) {
      errors.push(`${project.record}: repository differs from PROJECTS.md (${recordRepository} vs ${project.repository}).`);
    }

    if (project.repository) {
      const key = normalizeAlias(project.repository);
      const duplicate = seenRepositories.get(key);
      if (duplicate && duplicate !== project.id) {
        errors.push(`Repository ${project.repository} is assigned to ${duplicate} and ${project.id}.`);
      }
      seenRepositories.set(key, project.id);
    }

    const secretPatterns = [
      /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
      /\bghp_[A-Za-z0-9]{30,}\b/,
      /\bgithub_pat_[A-Za-z0-9_]{40,}\b/,
      /\bsk-[A-Za-z0-9]{32,}\b/,
    ];
    if (secretPatterns.some((pattern) => pattern.test(markdown))) {
      errors.push(`${project.record}: possible secret material detected.`);
    }
  }

  try {
    await buildCatalog(rootDir);
  } catch (error) {
    errors.push(error.message);
  }
  return { errors, warnings, projectCount: indexedProjects.length };
}

export async function checkDrift(rootDir) {
  const errors = [];
  try {
    await writeCatalog(rootDir, { check: true });
  } catch (error) {
    errors.push(error.message);
  }
  return { errors };
}
