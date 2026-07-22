import path from 'node:path';

export const SCHEMA_VERSION = 1;
export const LIFECYCLES = new Set([
  'Exploring',
  'Active',
  'Paused',
  'Maintenance',
  'Shipped',
  'Archived',
  'Not documented',
]);
export const REQUIRED_PROJECT_SECTIONS = [
  'Snapshot',
  'Links',
  'Current State',
  'Decisions',
  'Next Actions',
];
export const SECTION_RULES = {
  fact: ['Current State'],
  focus: ['Current Focus'],
  idea: ['Brainstorming', 'Ideas'],
  decision: ['Decisions'],
  assumption: ['Assumptions'],
  question: ['Open Questions', 'Risks and Open Questions'],
  action: ['Next Actions'],
};

export function normalizeLineEndings(value) {
  return value.replace(/\r\n/g, '\n');
}

export function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function normalizeAlias(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/^https?:\/\/(www\.)?github\.com\//, '')
    .replace(/\.git$/, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9/]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractLastUpdated(markdown) {
  return markdown.match(/\*\*Last updated:\*\*\s*(\d{4}-\d{2}-\d{2})/)?.[1] ?? null;
}

export function extractTitle(markdown) {
  return markdown.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? null;
}

export function parseSections(markdown) {
  const sections = new Map();
  const lines = normalizeLineEndings(markdown).split('\n');
  let current = null;
  let buffer = [];
  const flush = () => {
    if (current) sections.set(current, buffer.join('\n').trim());
  };
  for (const line of lines) {
    const match = line.match(/^##\s+(.+?)\s*$/);
    if (match) {
      flush();
      current = match[1].trim();
      buffer = [];
    } else if (current) {
      buffer.push(line);
    }
  }
  flush();
  return sections;
}

export function extractLifecycle(markdown) {
  for (const pattern of [/^-\s+\*\*Lifecycle:\*\*\s*(.+)$/im, /^-\s+Lifecycle:\s*(.+)$/im]) {
    const value = markdown.match(pattern)?.[1]?.trim();
    if (value) return value.replace(/[.]+$/, '');
  }
  return 'Not documented';
}

export function extractRepositoryFromRecord(markdown) {
  const match = markdown.match(
    /^-\s+(?:\*\*)?Repository:(?:\*\*)?\s+(https:\/\/github\.com\/[^\s)]+|Not created|Not documented)$/im,
  );
  if (!match || !match[1].startsWith('http')) return null;
  return match[1].replace(/\/$/, '');
}

export function extractProjectLinks(markdown, recordPath, knownRecordPaths) {
  const links = new Set();
  for (const match of markdown.matchAll(/\[[^\]]+\]\(([^)]+\.md)(?:#[^)]+)?\)/g)) {
    const href = match[1];
    if (/^https?:\/\//.test(href)) continue;
    const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(recordPath), href));
    if (knownRecordPaths.has(resolved) && resolved !== recordPath) {
      links.add(path.posix.basename(resolved, '.md'));
    }
  }
  return [...links].sort();
}

export function parseProjectsIndex(markdown) {
  const projects = [];
  let inTable = false;
  for (const line of normalizeLineEndings(markdown).split('\n')) {
    if (/^\|\s*Project\s*\|\s*Summary\s*\|/.test(line)) {
      inTable = true;
      continue;
    }
    if (!inTable) continue;
    if (/^\|\s*---/.test(line)) continue;
    if (!line.startsWith('|')) break;
    const cells = line.slice(1, -1).split('|').map((cell) => cell.trim());
    if (cells.length < 5) continue;
    const projectMatch = cells[0].match(/^\[([^\]]+)\]\((projects\/[^)]+\.md)\)$/);
    if (!projectMatch) continue;
    const [, name, record] = projectMatch;
    projects.push({
      id: path.posix.basename(record, '.md'),
      name,
      summary: cells[1],
      repository: cells[2] === '—' ? null : cells[2].replace(/\/$/, ''),
      liveUrl: cells[3] === '—' ? null : cells[3].replace(/\/$/, ''),
      notes: cells[4],
      record,
    });
  }
  return projects;
}

export function buildAliases(project) {
  const values = new Set([project.id, project.name, slugify(project.name)]);
  if (project.repository) {
    const fullName = project.repository.replace(/^https:\/\/github\.com\//, '').replace(/\.git$/, '');
    values.add(fullName);
    values.add(fullName.split('/').at(-1));
    values.add(project.repository);
  }
  return [...new Set([...values].map(normalizeAlias).filter(Boolean))].sort();
}

export function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    if (key === 'apply' || key === 'check') {
      args[key] = true;
      continue;
    }
    const value = argv[index + 1];
    if (!value || value.startsWith('--')) throw new Error(`Missing value for --${key}`);
    args[key] = value;
    index += 1;
  }
  return args;
}
