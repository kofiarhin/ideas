# Ideas Hub

**Last updated:** 2026-07-22

## Snapshot

Ideas Hub is this Markdown-first repository for brainstorming, project context, and durable reference notes across tools.

## Links

- Repository: https://github.com/kofiarhin/ideahub
- Historical repository alias: https://github.com/kofiarhin/ideas
- SSH: `git@github.com:kofiarhin/ideahub.git`
- Live: Not documented

## Current State

- Lifecycle: Not documented
- Stack: Markdown with dependency-free Node.js validation and catalog tooling
- Current priority: Not documented
- Deterministic Ideas Hub update routing is defined in [`AGENTS.md`](../AGENTS.md).
- Machine-readable retrieval catalogs are generated from `PROJECTS.md` and `projects/*.md`.
- Catalog generation, validation, drift detection, tests, and classification-aware dry-run updates are available through the root npm scripts.

## Current Focus

Review and operate the first durable Architect portfolio run while preserving approval, specification, discovery, security, and verification gates.

## Architect Command System

### Structure

- [`architect/README.md`](../architect/README.md)
- [`architect/commands/good-morning.md`](../architect/commands/good-morning.md)
- [`architect/commands/run-all-tasks.md`](../architect/commands/run-all-tasks.md)
- [`architect/runs/2026-07-18-001/audit.md`](../architect/runs/2026-07-18-001/audit.md)
- [`architect/runs/2026-07-18-001/tasks.md`](../architect/runs/2026-07-18-001/tasks.md)
- [`architect/runs/2026-07-18-001/report.md`](../architect/runs/2026-07-18-001/report.md)

### Decisions

- Architect project settings remain global governance.
- Detailed workflows live in Ideas Hub.
- `good morning` performs lightweight portfolio scans and selective deep audits.
- Tasks require traceable approved intent or verified evidence.
- `good morning` writes only run-scoped audit/task files.
- `run all tasks` implements only `ready` tasks.
- Discovery/specification work pauses for approval.
- Repositories are isolated by branch, commit, and pull request unless the user explicitly authorizes a permitted direct-main update.
- Ideas Hub project truth updates only after verified work.
- Commands never silently approve scope, direction, migrations, security-sensitive changes, lifecycle changes, or direct-main work.

### Current State

- The first operational Architect run is `2026-07-18-001`.
- Its portfolio audit and durable task queue exist on the default branch.
- `run all tasks` began processing the queue on 2026-07-18.
- Connector-backed context updates can be isolated and proposed through a draft pull request.
- Local clean-checkout verification is currently limited because the execution environment cannot resolve `github.com`; tasks requiring installed dependencies and command execution remain unverified rather than being marked complete.

### Next Actions

1. Review the run report and the draft Ideas Hub context-update pull request.
2. Resolve the P0 security approval packets before security-sensitive mutation.
3. Provide an execution environment with repository checkout and dependency access for ProjectOS and Brain verification tasks.
4. Approve or answer the remaining discovery, specification, PR, product, and policy gates.
5. Resume with `run all tasks` after approvals or verification access changes.

## Ideas Hub Update Workflow

Requests such as `update Ideas Hub`, `update the hub`, or `save to <project>` use the repository routing rules in [`AGENTS.md`](../AGENTS.md). They do not create a new Architect command or bypass normal discovery, approval, security, and verification gates.

### Context Resolution

Resolve the applicable destination from the recognized command or run, named project, active project, referenced repository or work item, and the best matching `PROJECTS.md` entry. Ask one focused question only when the destination remains materially ambiguous after inspecting available context.

### Information Routing

- Verified current behavior belongs in `Current State`.
- Confirmed work being pursued now belongs in `Current Focus`.
- Proposed features and unapproved directions belong in `Brainstorming`.
- Explicitly approved choices belong in `Decisions`.
- Unverified beliefs belong in `Assumptions`.
- Unresolved matters belong in `Open Questions`.
- Concrete approved follow-up work belongs in `Next Actions`.
- Approved raw capture with no clear durable destination belongs in `INBOX.md`.

Statements containing multiple information types are split across the relevant sections rather than being forced into one category.

### Feature Request Promotion

1. Capture a proposed feature under the target project's `Brainstorming` section.
2. Move the approved direction into `Decisions` and its approved follow-up into `Next Actions`.
3. Use Architect discovery, specification, and approval statuses until scope and acceptance criteria are sufficient.
4. Mark implementation work `ready` only when it is eligible to execute.
5. Implement through the permitted Architect workflow.
6. After verification, update `Current State`, durable decisions, and remaining actions.

GitHub Issues are optional for this MVP. They may be created when requested or when a project already uses Issues for execution, but they do not replace the durable project record.

### File Boundaries

- Routine project updates change only the relevant `projects/<project>.md` file.
- `PROJECTS.md` changes only for project index fields such as name, summary, repository, live URL, or lifecycle.
- `CONTEXT.md` changes only when broad workspace context changes.
- Architect operational history remains under `architect/runs/`.
- Generated catalog files change only through `npm run hub:index` after their Markdown sources change.

## Brainstorming

_No durable brainstorming notes captured yet._

## Decisions

- GitHub is the source of truth for this workspace.
- `PROJECTS.md` is the only canonical project index.
- Ideas Hub updates use deterministic project and information-type routing.
- Proposed features remain ideas until explicitly approved.
- Approved features do not become implementation-ready until scope and acceptance criteria are sufficient.
- GitHub Issues are optional execution records, not a second source of project truth.
- Verified implementation updates project current state; unverified claims do not.
- `update Ideas Hub` remains a governed write request rather than a registered Architect command.
- Generated JSON catalogs are disposable retrieval views and never replace canonical Markdown.
- Project updates should use dry-run, classification-aware tooling when the change fits the supported update contract.

## Assumptions

- None recorded.

## Open Questions

- What maintenance cadence should this hub follow?
- Which project should be the daily focus after critical security work is resolved or explicitly deferred?

## Next Actions

- Apply the routing rules whenever approved project knowledge is captured or updated.
- Keep project context and links current as approved and verified project information changes.
- Use the active run report as the exact resume point for execution.
- Keep generated catalogs current and require `npm run hub:check` for durable changes.
