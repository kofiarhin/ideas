# Ideas Hub

A Markdown-first, tool-independent workspace for brainstorming, project context, and durable reference notes.

GitHub is the source of truth. AI chats and coding agents are working interfaces: they can read this repository for context, help develop ideas, and save approved outcomes back here.

## Start Here

1. [`AGENTS.md`](AGENTS.md) — rules for ChatGPT, Codex, Claude, Copilot, and other agents.
2. [`CONTEXT.md`](CONTEXT.md) — quick overview of the workspace and current landscape.
3. [`PROJECTS.md`](PROJECTS.md) — canonical index of all tracked projects.
4. [`INBOX.md`](INBOX.md) — raw brainstorming and unorganized notes.
5. [`projects/`](projects/) — detailed notes for each project.

## Simple Workflow

### Load the hub

Ask an agent to read `AGENTS.md`, `CONTEXT.md`, and `PROJECTS.md`, then open only the project files relevant to the task.

### Brainstorm

Use chat to explore ideas, compare options, research questions, or refine a project direction. Rough thoughts can be proposed for `INBOX.md`.

### Save useful outcomes

After reviewing the proposed notes, explicitly approve the write with language such as:

- `capture this`
- `save to Brain`
- `update the hub`
- `commit these notes`

Agents must not write to this repository without explicit approval.

## Source-of-Truth Rules

- `PROJECTS.md` is the only canonical project index.
- `CONTEXT.md` is the fast workspace briefing and should stay concise.
- `INBOX.md` contains unprocessed thoughts, not confirmed plans.
- `projects/<project>.md` contains durable project-specific context.
- Repository history provides change tracking and recovery.

## Design Principles

- Simple Markdown over custom software.
- Useful to humans and any GitHub-enabled AI agent.
- Facts, decisions, assumptions, and ideas stay clearly separated.
- Start small and add structure only when the workspace needs it.
