# Ideas Hub

A Markdown-first, tool-independent workspace for brainstorming, project context, and durable reference notes.

GitHub is the source of truth. AI chats and coding agents are working interfaces: they can read this repository for context, help develop ideas, and save approved outcomes back here.

## Start Here

1. [`AGENTS.md`](AGENTS.md) — rules for ChatGPT, Codex, Claude, Copilot, and other agents.
2. [`AGENT_RETRIEVAL.md`](AGENT_RETRIEVAL.md) — deterministic retrieval and safe-update contract.
3. [`catalog/workspace-summary.json`](catalog/workspace-summary.json) — compact machine-readable portfolio overview.
4. [`catalog/projects.json`](catalog/projects.json) — generated project resolver and metadata catalog.
5. [`CONTEXT.md`](CONTEXT.md) — quick human-readable workspace overview.
6. [`PROJECTS.md`](PROJECTS.md) — canonical index of all tracked projects.
7. [`INBOX.md`](INBOX.md) — raw brainstorming and unorganized notes.
8. [`projects/`](projects/) — detailed notes for each project.

Generated files under `catalog/` are retrieval indexes. They are derived from `PROJECTS.md` and `projects/*.md`; they do not replace those Markdown sources of truth.

## Simple Workflow

### Load the hub

For fast machine retrieval, read `catalog/workspace-summary.json` and `catalog/projects.json`, resolve the target project, then open only its project record.

For a human-oriented overview, read `AGENTS.md`, `CONTEXT.md`, and `PROJECTS.md`, then open only the project files relevant to the task.

### Brainstorm

Use chat to explore ideas, compare options, research questions, or refine a project direction. Rough thoughts can be proposed for `INBOX.md`.

### Save useful outcomes

After reviewing the proposed notes, explicitly approve the write with language such as:

- `capture this`
- `save to Brain`
- `update the hub`
- `commit these notes`

Agents must not write to this repository without explicit approval.

## Agent Tooling

The repository includes dependency-free Node.js tooling for catalog generation, validation, drift detection, tests, and classification-aware project updates.

```bash
npm run hub:check
npm run hub:index
npm run hub:update -- \
  --project context-api \
  --section "Current State" \
  --classification fact \
  --text "GitHub Gateway deployment verified." \
  --source "context-api@<commit>" \
  --verified-at 2026-07-22
```

`hub:update` is a dry run by default. Add `--apply` only after the repository write has been explicitly approved.

After any manual project or index edit, run:

```bash
npm run hub:index
npm run hub:check
```

## Source-of-Truth Rules

- `PROJECTS.md` is the only canonical project index.
- `CONTEXT.md` is the fast workspace briefing and should stay concise.
- `INBOX.md` contains unprocessed thoughts, not confirmed plans.
- `projects/<project>.md` contains durable project-specific context.
- `catalog/*.json` contains generated retrieval views and must never become an independent source of project truth.
- Repository history provides change tracking and recovery.

## Design Principles

- Simple Markdown over custom software.
- Useful to humans and any GitHub-enabled AI agent.
- Deterministic machine indexes without replacing narrative context.
- Facts, decisions, assumptions, questions, actions, and ideas stay clearly separated.
- Dry-run updates, explicit approval, validation, and drift detection before durable writes.
- Start small and add structure only when the workspace needs it.
