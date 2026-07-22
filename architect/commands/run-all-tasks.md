# `run all tasks` — Approval-Aware Execution Workflow

## Purpose

Process a durable Architect task queue, execute everything safe, preserve approval gates, verify implementation, produce a report, and update Ideas Hub context only after verified outcomes.

## Triggers

- Canonical command: `run all tasks`
- Approved aliases: `resume all tasks`, `continue all tasks`

## Preconditions

Before processing:

1. Read root [`AGENTS.md`](../../AGENTS.md).
2. Read [`architect/README.md`](../README.md).
3. Read [`architect/RECONCILIATION.md`](../RECONCILIATION.md).
4. Read this workflow.
5. Resolve the explicitly named or latest valid incomplete run.
6. Read `audit.md` and `tasks.md`.
7. Validate the queue with `python scripts/validate_ideahub.py` when execution access permits.
8. Revalidate source revisions and repository SHAs.
9. Confirm repository access.
10. Stop if no durable queue exists.
11. Never reconstruct a queue from chat memory.
12. Stop if the run is completed unless the user explicitly starts a new audit.

## Authorized Writes

May:

- update `tasks.md`;
- create or update `report.md`;
- create isolated branches, commits, tests, and pull requests for eligible tasks;
- update affected Ideas Hub project records after verified completion;
- update `PROJECTS.md` only for index-level changes; and
- update `CONTEXT.md` only for broad workspace changes.

May not silently approve discovery, PRDs/specifications/plans, migrations, breaking changes, security direction, lifecycle changes, or direct-main commits; implement `proposed` work; modify unrelated repositories; mark unverified work complete; or merge pull requests without explicit authority.

## Queue Validation And Deduplication

Before processing or promoting any task:

1. Require `task_id`, stable `work_key`, applicable `requirement_key`, `duplicate_of`, and `supersedes` fields.
2. Confirm the source document, source revision, audited implementation revision, acceptance criteria, and verification requirements are recorded.
3. Search current and historical Architect runs for the same `work_key`.
4. Search the project record for equivalent current focus, next action, requirement, or completed evidence.
5. Search relevant open and merged pull requests and commits for equivalent work.
6. Confirm the recorded implementation gap still exists on the current default-branch revision.
7. Reject duplicate active work and do not reimplement completed, merged, or superseded work.
8. Record duplicate or supersession relationships in the task and report.

A queue with duplicate active `work_key` values is invalid. Route ambiguous equivalence to `needs_discovery`; route conclusive completed work to `completed` or `skipped` with evidence and reconcile stale project notes.

## Readiness Gate

A task may become or remain `ready` only when all applicable checks pass:

- repository and default branch are known;
- current implementation revision matches the audited evidence or has been safely reconciled;
- approved authority document and revision are known;
- requirement or approved change request is explicit;
- implementation gap is verified;
- no equivalent active or completed work exists;
- no open or merged pull request already satisfies the work;
- acceptance criteria and verification requirements are explicit;
- authority and implementation are not materially conflicted; and
- required approvals, including direct-`main` authorization, are recorded.

Route failures to `needs_discovery`, `needs_spec`, `needs_approval`, or `blocked` according to [`RECONCILIATION.md`](../RECONCILIATION.md).

## Queue Processing

Order work by dependency, then priority, then queue order.

- One active implementation task runs at a time by default.
- Process repositories sequentially.
- Continue past blocked or approval-gated tasks only when later tasks are independent.
- Persist status and evidence after each transition.

Pause the entire run only for a security incident, destructive migration, source-of-truth conflict affecting multiple tasks, failure that could affect other projects, repository-isolation failure, credential-safety issue, or broad queue invalidation.

## Status Handling

### `ready`

Revalidate the readiness gate, set to `running`, then implement.

### `needs_discovery`

Run project-specific discovery, produce a full Shared Understanding Handoff in `report.md`, set to `needs_approval`, and continue with later independent tasks.

### `needs_spec`

Draft the missing or revised PRD, specification, or implementation plan. Include the complete draft or approval packet in `report.md`, set to `needs_approval`, and do not implement against the unapproved draft.

### `needs_approval`

Do not implement. Record the exact approval needed. After explicit approval, record approval, revalidate, move to `ready` when eligible, and resume processing.

### `blocked`

Record blocker, evidence, dependency or owner, recovery action, and whether other tasks remain safe.

### `proposed`

Do not implement. Require explicit confirmation or discovery.

### `running`

Treat as interrupted work. Inspect branch, repository state, commits, tests, and report evidence; resume only if safe.

### `verifying`

Resume verification only.

### `completed`

Do not reimplement. Confirm evidence and context updates exist.

### `failed`

Do not retry automatically unless clearly transient and safe.

### `skipped`

Preserve the reason and take no implementation action.

## Repository Isolation

For implementation-ready tasks:

- Use branch `architect/<run-id>/<project-slug>`.
- Use one branch per project per run.
- Reuse the project-run branch for multiple approved tasks only when safe.
- Create a separate commit per task.
- Create one pull request per project run unless repository rules require finer isolation.
- Never combine unrelated repositories, modify files outside the active project, or broaden scope into unrelated cleanup.
- Refresh or rebase safely when the base branch changes.
- Block tasks when new repository state invalidates audit evidence.

## Direct `main`

Direct commits to `main` are allowed only when the individual task explicitly authorizes them and the repository permits direct pushes; scope is approved; tests and checks pass; no destructive migration is involved; the work is not security-sensitive; there is no unapproved breaking change; and repository work remains isolated. Otherwise, use a branch and pull request.

## Implementation Process

For each `ready` task:

1. Set to `running`.
2. Read repository-local `AGENTS.md` and authority documents.
3. Inspect current code and tests.
4. Confirm the smallest valid scope.
5. Use test-first development where applicable.
6. Add or update failing tests first.
7. Implement the smallest passing change.
8. Refactor only inside approved scope.
9. Preserve architecture and conventions.
10. Avoid unrelated dependency upgrades.
11. Protect secrets.
12. Record changed files and commands.
13. Create a focused commit.
14. Move to `verifying`.

## Verification

Run applicable unit, integration, E2E, lint, type-check, production-build, CI, acceptance, manual browser/device, accessibility, migration, and security checks.

Record commands and results, failures, environment limitations, changed files, commit SHA, pull request URL, and remaining risks. Mark a task `completed` only when required checks and acceptance criteria pass. Mark it `failed` when verification cannot safely be corrected inside scope.

## Pull Requests

Create a separate pull request per repository. Each pull request must include the Architect run ID, included tasks, approved source documents, summary, scope and out-of-scope work, verification, risks, follow-up, and Ideas Hub references. Default to draft pull requests. Do not auto-merge.

## Report

Maintain `architect/runs/<run-id>/report.md` and update it after every transition. Include run metadata and state; execution order; completed tasks; discovery handoffs; draft specifications/plans; approvals requested; duplicate and superseded work; blocked, failed, and skipped tasks; branches, commits, and pull requests; verification evidence; Ideas Hub updates; remaining risks; and the exact resume point.

## Ideas Hub Maintenance

After verified completion:

1. Update the matching `projects/<project>.md`.
2. Record what changed, verification evidence, current status, decisions, remaining work, risks or blockers, recommended next action, and commit/pull-request/issue/CI/document links.
3. Remove completed work from `Current Focus` and `Next Actions`.
4. Update the project's `Reconciliation` section and `Last updated`.
5. Update `PROJECTS.md` only for name, repository, live URL, lifecycle, summary, or index-level status changes.
6. Update `CONTEXT.md` only for broad workspace changes.
7. Preserve facts, decisions, ideas, assumptions, and questions as separate categories.
8. Never record drafts as approved or unverified implementation as completed.
9. Never update unrelated records.

If Ideas Hub writing fails, place exact proposed updates in `report.md`, state that they were not written, and do not claim synchronization succeeded.

## Completion

A run is complete only when every task is `completed`, `failed`, `blocked`, `needs_approval`, or `skipped`; none remain `running` or `verifying`; completed tasks have evidence; duplicate checks and reconciliation pass; changed repositories have isolated branches and pull requests or explicitly authorized direct-main commits; Ideas Hub updates are written or exact unwritten updates are recorded; and the report contains final status and next action.

Runs with approvals or blockers must be marked `paused`, not completed.