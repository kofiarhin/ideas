# Codex Workflow Kit

**Last updated:** 2026-07-22

## Snapshot

Codex Workflow Kit is a lightweight reusable AI engineering workflow system for OpenAI Codex, Claude Code, Cursor, and similar coding agents.

It turns plain-language requests into clarified, approved, run-scoped implementation workflows with durable memory, specifications, tasks, progress, review, verification, and handoff artifacts.

## Links

- Repository: https://github.com/kofiarhin/codex-workflow-kit
- SSH: `git@github.com:kofiarhin/codex-workflow-kit.git`
- Product requirements: https://github.com/kofiarhin/codex-workflow-kit/blob/main/docs/PRD.md
- Technical specification: https://github.com/kofiarhin/codex-workflow-kit/blob/main/docs/TECHNICAL_SPEC.md
- Codebase audit: https://github.com/kofiarhin/codex-workflow-kit/blob/main/docs/CODEBASE_AUDIT.md
- Live: Not documented

## Current State

- Lifecycle: Not documented
- Scope: stack-neutral AI engineering workflow
- Core concepts: discovery, shared-understanding handoff, approval gates, run-scoped artifacts, Project Brain, TDD, verification, review, and handoff
- The repository now has a dedicated PRD, kit-specific technical specification, and codebase audit in addition to its extensive README and templates.
- The installer copies governed workflow templates into a target repository, preserves existing files by default, and requires `--force` for intentional replacement.
- The current active artifact model is `_workflow/runs/<run-id>/` plus Project Brain memory.
- The audit found documentation drift in `docs/ARCHITECTURE.md`, which still presents legacy `_spec/`, `_task/`, `_progress/`, and `_summary/` paths as active architecture even though the README defines those paths as compatibility history.
- No attached CI status was available for the documentation commits, so no automated verification claim has been recorded.

## Current Focus

Reconcile legacy documentation and templates with the current run-scoped workflow model, then establish automated installer and documentation consistency verification.

## Brainstorming

- First-class compatibility and conformance tests for more agent environments
- A machine-readable workflow version and migration contract
- Automated validation that installed templates and root documentation describe the same artifact model
- Explicit interoperability guidance between Ideas Hub, Project Brain, and repository-local run state

## Decisions

- Discovery and implementation are separate phases.
- Implementation begins only after explicit approval.
- Active workflow artifacts are scoped by branch or worktree run.
- Project Brain provides structured, non-destructive project memory.
- Code-changing work follows test-first Red -> Green -> Refactor cycles.
- The workflow remains stack-neutral even though MERN examples are included.
- The repository-local PRD and technical specification now document the kit itself rather than treating the README as the only product authority.
- `_workflow/runs/<run-id>/` is the current active workflow model; legacy folders are compatibility history and must not be presented as the preferred architecture.

## Assumptions

- The shell installer remains the primary distribution mechanism.
- Existing users may still have repositories with legacy workflow folders, so migration guidance should preserve compatibility rather than deleting history.

## Open Questions

- Which agent environments need the strongest first-class support next?
- What is the current release or adoption milestone?
- How should this Ideas Hub integrate with Project Brain without duplicating project-specific execution state?
- Which legacy templates can be deprecated, and which must remain supported?
- What automated checks should define installer and documentation conformance?

## Next Actions

1. Update `docs/ARCHITECTURE.md` and any affected templates so the active model consistently uses `_workflow/runs/<run-id>/`.
2. Add migration guidance for repositories that still use legacy workflow folders.
3. Add installer tests covering default preservation, `--force`, expected copied files, and Project Brain/run seed behavior.
4. Add a documentation consistency check for active and legacy artifact paths.
5. Define the current release milestone and supported agent-environment matrix.
6. Clarify the Ideas Hub versus Project Brain versus run-local state boundary.