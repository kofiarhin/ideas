# Ideas Hub

**Last updated:** 2026-07-18

## Snapshot

Ideas Hub is this Markdown-first repository for brainstorming, project context, and durable reference notes across tools.

## Links

- Repository: https://github.com/kofiarhin/ideas
- SSH: `git@github.com:kofiarhin/ideas.git`
- Live: Not documented

## Current State

- Lifecycle: Not documented
- Stack: Markdown
- Current priority: Not documented

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
- Repositories are isolated by branch, commit, and pull request.
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

## Brainstorming

_No durable brainstorming notes captured yet._

## Decisions

- GitHub is the source of truth for this workspace.
- `PROJECTS.md` is the only canonical project index.

## Assumptions

- None recorded.

## Open Questions

- What maintenance cadence should this hub follow?
- Which project should be the daily focus after critical security work is resolved or explicitly deferred?

## Next Actions

- Keep project context and links current as approved and verified project information changes.
- Use the active run report as the exact resume point for execution.
