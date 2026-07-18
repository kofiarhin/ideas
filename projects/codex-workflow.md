# Codex Workflow Kit

**Last updated:** 2026-07-18

## Snapshot

Codex Workflow Kit is a lightweight reusable AI engineering workflow system for OpenAI Codex, Claude Code, Cursor, and similar coding agents.

It turns plain-language requests into clarified, approved, run-scoped implementation workflows with durable memory, specifications, tasks, progress, review, verification, and handoff artifacts.

## Links

- Repository: https://github.com/kofiarhin/codex-workflow-kit
- SSH: `git@github.com:kofiarhin/codex-workflow-kit.git`
- Live: Not documented

## Current State

- Lifecycle: Not documented
- Scope: stack-neutral AI engineering workflow
- Core concepts: discovery, shared-understanding handoff, approval gates, run-scoped artifacts, Project Brain, TDD, verification, review, and handoff
- Current priority: Not documented

## Current Focus

Not documented.

## Brainstorming

_No durable brainstorming notes captured yet._

## Decisions

- Discovery and implementation are separate phases.
- Implementation begins only after explicit approval.
- Active workflow artifacts are scoped by branch or worktree run.
- Project Brain provides structured, non-destructive project memory.
- Code-changing work follows test-first Red -> Green -> Refactor cycles.
- The workflow remains stack-neutral even though MERN examples are included.

## Assumptions

- None recorded.

## Open Questions

- Which agent environments need the strongest first-class support next?
- What is the current release or adoption milestone?
- How should this Ideas Hub integrate with Project Brain without duplicating project-specific execution state?

## Next Actions

- Document the current workflow-kit milestone and intended users.
- Clarify the boundary between cross-project reference memory here and repository-local Project Brain memory.
