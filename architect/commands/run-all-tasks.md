# `run all tasks` — Approval-Aware Execution Workflow

## Purpose

Process a durable Architect task queue, check current Zoro presence, process matching Zoro reports, execute everything safe, preserve approval gates, independently verify implementation, maintain the feedback loop, record meaningful repository activity, produce a report, and update Ideas Hub context only after verified outcomes.

## Triggers

- Canonical command: `run all tasks`
- Approved aliases: `resume all tasks`, `continue all tasks`

## Preconditions

Before processing:

1. Read root [`AGENTS.md`](../../AGENTS.md).
2. Read [`AGENT_COORDINATION.md`](../../AGENT_COORDINATION.md).
3. Read [`architect/README.md`](../README.md).
4. Read [`architect/RECONCILIATION.md`](../RECONCILIATION.md).
5. Read [`logs/README.md`](../../logs/README.md).
6. Read [`coordination/presence/zoro.json`](../../coordination/presence/zoro.json).
7. Read this workflow.
8. Resolve the explicitly named or latest valid incomplete run.
9. Read `audit.md`, `tasks.md`, and existing `report.md` when present.
10. Read the indexed Architect inbox for Zoro reports matching the run, task IDs, or work keys.
11. Validate the queue with `python scripts/validate_ideahub.py` when execution access permits.
12. Revalidate source revisions and repository SHAs.
13. Confirm repository access.
14. Stop if no durable queue exists.
15. Never reconstruct a queue from chat memory.
16. Stop if the run is completed unless the user explicitly starts a new audit.

Interpret presence using `coordination/presence/README.md`: active statuses are current only before `expiresAt`; expired active presence is stale; missing, unreadable, conflicting, or stale presence is not proof that Zoro is offline. Presence is advisory and cannot change task state or prove implementation or completion.

## Authorized Writes

May:

- update `tasks.md`;
- create or update `report.md`;
- write scoped verification feedback or follow-up instructions to the indexed Zoro inbox;
- update matching mailbox message status when the active workflow permits it;
- create isolated branches, commits, tests, and pull requests for eligible tasks;
- append verified entries to the current monthly `logs/repository-activity/` file;
- append evidence-supported reusable lessons to `logs/learnings/` after verification;
- append verified Architect, Zoro, Ideas Hub, or coordination changes to `logs/system-changes/` after verification;
- update affected Ideas Hub project records after verified completion;
- update `PROJECTS.md` only for index-level changes; and
- update `CONTEXT.md` only for broad workspace changes.

May read but may not modify `coordination/presence/zoro.json` without separate explicit authority.

May not silently approve discovery, PRDs/specifications/plans, migrations, breaking changes, security direction, lifecycle changes, direct-main commits, merges, or deployments; implement `proposed` work; modify unrelated repositories; mark unverified work complete; or treat presence, a mailbox report, or a log entry as primary verification evidence.

## Queue Validation And Deduplication

Before processing or promoting any task:

1. Require `task_id`, stable `work_key`, applicable `requirement_key`, `duplicate_of`, and `supersedes` fields.
2. Confirm the source document, source revision, audited implementation revision, acceptance criteria, and verification requirements are recorded.
3. Search current and historical Architect runs for the same `work_key`.
4. Search the project record for equivalent current focus, next action, requirement, or completed evidence.
5. Inspect current Zoro presence for matching repository, run ID, task ID, or work key.
6. Search relevant monthly repository activity for traceable related work when useful.
7. Search relevant open and merged pull requests and commits for equivalent work.
8. Confirm the recorded implementation gap still exists on the current default-branch revision.
9. Reject duplicate active work and do not reimplement current Zoro work or completed, merged, or superseded work.
10. Record duplicate, active-presence, or supersession relationships in the task and report.

A queue with duplicate active `work_key` values is invalid. Route ambiguous equivalence or stale/unknown overlapping presence to `needs_discovery`; route conclusive completed work to `completed` or `skipped` with primary evidence and reconcile stale project notes.

Presence and operational logs may help discover activity, but they cannot establish completion without primary repository, CI, deployment, or runtime evidence.

## Zoro Report Processing And Feedback

Before starting new implementation or resuming assigned work:

1. Read current Zoro presence and find new or unresolved indexed Architect inbox messages that match the active run, originating assignment, task ID, or work key.
2. Confirm the report references the assignment and preserves repository, branch, commit, pull request, authority, verification, and remaining-risk details.
3. Distinguish acknowledgement, progress, blocker, approval request, and implementation-complete reports.
4. Match the report to the applicable presence session and repository events when provided.
5. Independently inspect the branch, commits, changed files, pull request, CI, reviews, deployment, runtime evidence, and current default branch as applicable.
6. Do not accept Zoro's presence, report, its own checks, or an activity entry as independent verification.
7. Update `tasks.md` and `report.md` only after the evidence supports the transition.
8. Send one clear response through the indexed Zoro inbox using the same message ID, run ID, task ID, and work key.
9. Use one of these outcomes when applicable: `accepted`, `follow-up-required`, `rejected`, `blocked`, `approval-required`, or `closed`.
10. State what Architect verified, what remains unverified, the exact authorized follow-up, and all authority that remains withheld.
11. Continue the loop until verification succeeds or the task reaches a legitimate blocked, failed, approval-gated, or skipped state.

Zoro cannot complete its own task. Presence, mailbox status, and log history are not task status.

## Readiness Gate

A task may become or remain `ready` only when all applicable checks pass:

- repository and default branch are known;
- current implementation revision matches the audited evidence or has been safely reconciled;
- approved authority document and revision are known;
- requirement or approved change request is explicit;
- implementation gap is verified;
- no equivalent active or completed work exists, including clearly overlapping current Zoro presence;
- no open or merged pull request already satisfies the work;
- acceptance criteria and verification requirements are explicit;
- authority and implementation are not materially conflicted; and
- required approvals, including direct-`main` authorization, are recorded.

Route failures to `needs_discovery`, `needs_spec`, `needs_approval`, or `blocked` according to [`RECONCILIATION.md`](../RECONCILIATION.md).

## Queue Processing

Order work by dependency, then priority, then queue order.

- Process matching Zoro reports and current overlapping presence before starting duplicate Architect implementation.
- One active implementation task runs at a time by default.
- Process repositories sequentially.
- Continue past blocked or approval-gated tasks only when later tasks are independent.
- Persist status, evidence, feedback, and applicable log references after each transition.

Pause the entire run only for a security incident, destructive migration, source-of-truth conflict affecting multiple tasks, failure that could affect other projects, repository-isolation failure, credential-safety issue, or broad queue invalidation.

## Status Handling

### `ready`

Revalidate the readiness gate, set to `running`, then implement or assign through the authorized communication loop.

### `needs_discovery`

Run project-specific discovery, produce a full Shared Understanding Handoff in `report.md`, set to `needs_approval`, and continue with later independent tasks.

### `needs_spec`

Draft the missing or revised PRD, specification, or implementation plan. Include the complete draft or approval packet in `report.md`, set to `needs_approval`, and do not implement against the unapproved draft.

### `needs_approval`

Do not implement. Record the exact approval needed. After explicit approval, record approval, revalidate, move to `ready` when eligible, and resume processing.

### `blocked`

Record blocker, evidence, dependency or owner, recovery action, and whether other tasks remain safe. Send matching Zoro feedback when the blocker follows a Zoro report.

### `proposed`

Do not implement. Require explicit confirmation or discovery.

### `running`

Treat as interrupted work. Inspect presence, branch, repository state, commits, tests, mailbox reports, activity entries, and report evidence; resume only if safe.

### `verifying`

Process matching Zoro reports and resume independent verification only.

### `completed`

Do not reimplement. Confirm primary evidence, feedback closure, required activity entries, and context updates exist.

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

A direct-main action must be confirmed through repository readback and recorded in repository activity after it succeeds. Zoro's narrow standing authority for `coordination/presence/zoro.json` does not grant Architect direct-main authority and routine presence-only commits are not repository-activity events.

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
13. Confirm meaningful repository actions through GitHub or the relevant operational system.
14. Append the applicable repository activity entry after each confirmed state transition.
15. Create a focused commit.
16. Move to `verifying`.

When the implementation is assigned to Zoro, inspect current presence, process Zoro's report, and independently verify rather than duplicating the implementation.

## Repository Activity Logging

Follow [`logs/README.md`](../../logs/README.md).

Log meaningful confirmed transitions such as:

- branch creation or deletion;
- meaningful commits;
- pull request creation, material update, closure, or merge;
- relevant CI transition to passed or failed;
- release creation;
- deployment, rollback, or post-deployment verification;
- repository configuration changes;
- verified security remediation.

Rules:

1. Confirm the action succeeded before logging it.
2. Do not pre-log intended work.
3. Preserve repository, project, actor, authority, identifiers, evidence, run ID, task ID, work key, result, and remaining uncertainty when available.
4. Do not log read-only inspection, routine presence-only transitions, repeated unchanged status checks, ordinary comments, secrets, unsupported claims, or duplicates.
5. Operational-log maintenance commits are not recursively logged; the entry for the original event is sufficient.
6. Mailbox and report-only updates are not separately logged unless they represent a material shared-system change.
7. Verify external or manual activity before appending a reconciled historical entry.
8. A presence or log entry never promotes a task to `completed`.

## Verification

Run applicable unit, integration, E2E, lint, type-check, production-build, CI, acceptance, manual browser/device, accessibility, migration, and security checks.

Record commands and results, failures, environment limitations, changed files, commit SHA, pull request URL, related operational activity, presence considered, and remaining risks. Mark a task `completed` only when required checks and acceptance criteria pass and any required feedback or durable updates succeed. Mark it `failed` when verification cannot safely be corrected inside scope.

When verifying Zoro work, independently reproduce or inspect the required evidence. Do not rely solely on Zoro's presence, summary, or log entry.

## Pull Requests

Create a separate pull request per repository. Each pull request must include the Architect run ID, included tasks, approved source documents, summary, scope and out-of-scope work, verification, risks, follow-up, and Ideas Hub references. Default to draft pull requests. Do not auto-merge.

After GitHub confirms PR creation or a later material PR state transition, append the corresponding repository activity entry.

## Report

Maintain `architect/runs/<run-id>/report.md` and update it after every transition. Include run metadata and state; execution order; Zoro presence considered; Zoro acknowledgements and reports; Architect verification and feedback; completed tasks; discovery handoffs; draft specifications/plans; approvals requested; duplicate and superseded work; blocked, failed, and skipped tasks; branches, commits, and pull requests; operational activity entries; verification evidence; Ideas Hub updates; remaining risks; and the exact resume point.

## Ideas Hub Maintenance

After verified completion:

1. Update the matching `projects/<project>.md`.
2. Record what changed, verification evidence, current status, decisions, remaining work, risks or blockers, recommended next action, and commit/pull-request/issue/CI/document links.
3. Remove completed work from `Current Focus` and `Next Actions`.
4. Update the project's `Reconciliation` section and `Last updated`.
5. Update `PROJECTS.md` only for name, repository, live URL, lifecycle, summary, or index-level status changes.
6. Update `CONTEXT.md` only for broad workspace changes.
7. Append reusable evidence-supported lessons when they have lasting operational value.
8. Append verified changes to Zoro, Architect, Ideas Hub governance, presence, or shared coordination to the current system-change log.
9. Preserve facts, decisions, ideas, assumptions, and questions as separate categories.
10. Never record drafts as approved or unverified implementation as completed.
11. Never update unrelated records.

If Ideas Hub writing fails, place exact proposed project, feedback, and log updates in `report.md`, state that they were not written, and do not claim synchronization succeeded.

## Completion

A run is complete only when every task is `completed`, `failed`, `blocked`, `needs_approval`, or `skipped`; none remain `running` or `verifying`; completed tasks have independently verified evidence; matching Zoro reports have an Architect response; duplicate checks, presence reconciliation, and source reconciliation pass; changed repositories have isolated branches and pull requests or explicitly authorized direct-main commits; required repository activity entries exist; Ideas Hub updates are written or exact unwritten updates are recorded; and the report contains final status and next action.

Runs with approvals or blockers must be marked `paused`, not completed.
