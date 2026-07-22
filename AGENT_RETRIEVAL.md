# Agent Retrieval and Update Contract

This contract gives GitHub-enabled AI agents a deterministic way to find and update Ideas Hub information without loading the entire repository or creating competing sources of truth.

## Authority

The generated catalog is an index, not project truth.

Use this precedence order:

1. User's latest instruction.
2. Approved Shared Understanding Handoff.
3. Verified repository implementation.
4. Approved repository-local PRD, specification, or plan.
5. `projects/<project>.md`.
6. `PROJECTS.md` for project identity, summary, repository, and live URL.
7. `CONTEXT.md` for broad workspace context.
8. Generated `catalog/*.json` for retrieval only.
9. `INBOX.md` as unprocessed material.

When a generated file conflicts with Markdown, report catalog drift and use the Markdown source.

## Workspace Overview

1. Read `catalog/workspace-summary.json`.
2. Read `catalog/projects.json` only when more detail is required.
3. Open `CONTEXT.md` when the question needs broad narrative context.
4. Do not load every project record by default.

## Project Resolution

Resolve a project in this order:

1. Exact project ID from `catalog/projects.json`.
2. Normalized name or alias from `catalog/aliases.json`.
3. Repository identifier from `catalog/repositories.json`.
4. Related project links from `catalog/relationships.json`.
5. One focused clarification question when multiple candidates remain.

After resolution, open the `record` path from `catalog/projects.json`.

## Project Reading

Read only the sections needed for the request:

- `Snapshot` for identity and purpose.
- `Links` for repository and authority documents.
- `Current State` for confirmed current facts.
- `Current Focus` for explicitly confirmed active work.
- `Brainstorming` or `Ideas` for unapproved possibilities.
- `Decisions` for approved choices.
- `Assumptions` for unverified beliefs.
- `Open Questions` for unresolved decisions.
- `Next Actions` for approved incomplete work.

Do not treat `Brainstorming`, `Assumptions`, or `Open Questions` as approved implementation direction.

## Repository Inspection

When implementation detail matters:

1. Read the project's repository link.
2. Inspect current implementation and repository-local authority documents.
3. Prefer verified implementation over stale Ideas Hub narrative.
4. Report any drift instead of silently rewriting project truth.
5. Update Ideas Hub only after the change is approved and verified.

## Safe Project Update

Use the classification-aware updater for simple additions:

```bash
npm run hub:update -- \
  --project <id-name-alias-or-repository> \
  --section "<target heading>" \
  --classification <fact|focus|idea|decision|assumption|question|action> \
  --text "<approved text>" \
  --source "<traceable source>" \
  --verified-at YYYY-MM-DD
```

The command is a dry run by default. It prints the proposed diff and does not write.

After explicit approval, add `--apply`. The updater:

1. Resolves the project through the generated alias catalog.
2. Enforces classification-to-section routing.
3. Preserves existing project content.
4. Adds the new entry to the selected section.
5. Updates `Last updated`.
6. Regenerates the catalog.

Run `npm run hub:check` before committing.

## Classification Routing

| Classification | Allowed destination |
| --- | --- |
| `fact` | `Current State` |
| `focus` | `Current Focus` |
| `idea` | `Brainstorming` or `Ideas` |
| `decision` | `Decisions` |
| `assumption` | `Assumptions` |
| `question` | `Open Questions` or `Risks and Open Questions` |
| `action` | `Next Actions` |

Split mixed statements across sections rather than weakening the classification rules.

## Manual Update Checklist

When the updater cannot express the approved change:

1. Edit only the relevant Markdown source.
2. Preserve existing useful context.
3. Refresh the file's `Last updated` date.
4. Update `PROJECTS.md` only when project index fields changed.
5. Update `CONTEXT.md` only for workspace-level changes.
6. Run `npm run hub:index`.
7. Run `npm run hub:check`.
8. Review the diff for unrelated changes.
9. Commit the knowledge change with a focused message.

## Catalog Guarantees

Catalog generation is deterministic. It derives:

- project identity and record paths from `PROJECTS.md`;
- lifecycle and updated dates from project records;
- aliases from project IDs, names, and repositories;
- repository lookup keys from canonical repository URLs;
- relationships from relative links between project records.

Generated catalogs must not contain new facts that are absent from the canonical Markdown sources.
