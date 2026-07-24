# `good morning` — Portfolio Audit Workflow

## Purpose

Audit the Ideas Hub portfolio and linked repositories, reconcile approved intent against current implementation, detect active Zoro work, and create a durable, evidence-backed task queue. This command does **not** implement source-code changes.

## Trigger

- Canonical command: `good morning`
- Approved alias: `morning audit`

Casual greetings must not trigger this workflow unless they match a registered command or alias.

## Authorized Writes

This command may create or refresh only:

- `architect/runs/<run-id>/audit.md`
- `architect/runs/<run-id>/tasks.md`

It must not modify root `AGENTS.md`, `CONTEXT.md`, `PROJECTS.md`, `INBOX.md`, `projects/*.md`, `coordination/presence/zoro.json`, linked PRDs/specifications/plans, linked source repositories, issues, pull requests, or lifecycle states.

## Required Read Order

1. Root [`AGENTS.md`](../../AGENTS.md).
2. [`AGENT_COORDINATION.md`](../../AGENT_COORDINATION.md).
3. [`architect/README.md`](../README.md).
4. `architect/commands/good-morning.md`.
5. [`coordination/presence/zoro.json`](../../coordination/presence/zoro.json).
6. Root [`CONTEXT.md`](../../CONTEXT.md).
7. Root [`PROJECTS.md`](../../PROJECTS.md).
8. Relevant `projects/<project>.md`.
9. Linked project repositories and their authority documents.
10. Relevant issues, pull requests, tests, CI, releases, deployments, and implementation evidence.

Inspect [`INBOX.md`](../../INBOX.md) only when a durable project record or approved request explicitly points to relevant inbox material. Unprocessed inbox ideas are not approved work.

Treat Zoro presence as advisory. Determine whether the lease is current, stale, inactive, or unknown; compare repository, run ID, task ID, and work key; and do not create duplicate implementation tasks for clearly overlapping current work. Presence does not change task status or prove implementation or completion.

## Portfolio Scan

Perform a lightweight scan of every project in `PROJECTS.md`. Capture lifecycle, repository, live URL, current focus, decisions, open questions, next actions, blockers, risks, linked authority documents, open requests, documentation freshness, applicable Zoro presence, and whether deep inspection is justified.

## Deep-Audit Selection

Perform full audits for:

- `Active` projects;
- `Exploring` projects with documented work or approved intent;
- projects with approved open requests or unresolved blockers;
- projects with failing tests, CI, build, deployment, or production behavior;
- projects with security risks;
- projects with unfinished approved phases or next actions; and
- projects explicitly selected by the user.

Lifecycle behavior:

- `Paused`: lightweight scan unless an urgent risk or approved request exists.
- `Maintenance`: audit only active maintenance, breakage, or security issues.
- `Shipped`: lightweight scan unless an urgent issue or approved request exists.
- `Archived`: lightweight scan unless an urgent security or data issue exists.
- `Not documented`: create context-gap findings, not invented implementation work.

## Authority Resolution

For each deeply audited project:

1. Identify the repository’s documented authority order.
2. Prefer approved/current PRDs, specifications, implementation plans, approved requests, acceptance criteria, repository `AGENTS.md`, current implementation, tests, and Ideas Hub records.
3. Record material conflicts.
4. Never silently choose between conflicting authoritative directions.
5. Create `needs_approval` or `blocked` tasks for conflicts.
6. When approved intent is missing, create `needs_discovery` or `needs_spec`, not implementation work.

## Reconciliation Procedure

For every deeply audited project:

1. Record repository, branch, and commit SHA.
2. Record authority-document paths and revisions.
3. Extract approved requirements and acceptance criteria.
4. Inspect implementation, tests, configuration, CI, open requests, applicable Zoro presence, and relevant recent activity.
5. Classify requirements as implemented and verified; implemented but unverified; partially implemented; not implemented; conflicting with implementation; obsolete or superseded; or unable to determine.
6. Identify missing requirements, partial implementation, undocumented implemented behavior, behavior conflicting with approved intent, approved requests absent from plans, bugs/regressions, failing tests/lint/type-check/build/CI/deployment/production behavior, security or credential risks, destructive migration risks, stale documentation, unresolved blockers, active duplicate work, and completed work not reflected in the Ideas Hub.
7. Record evidence for every finding.

Do not treat code presence or presence state as proof that acceptance criteria pass.

## Task Classification

### `ready`

Use only when direction is approved; an approved PRD, specification, or plan supports the work; acceptance criteria are clear; no approval, security, migration, source conflict, or overlapping current implementation blocks execution; and verification requirements are known.

### `needs_discovery`

Use when desired behavior is unclear, user needs or scope are unconfirmed, several plausible directions exist, approved intent is insufficient, or stale/unknown presence creates material ambiguity about duplicate work.

### `needs_spec`

Use when the goal is approved but implementation-ready requirements, acceptance criteria, PRD, specification, or plan are missing or require revision.

### `needs_approval`

Use when a conflict needs user resolution; a product or scope change is proposed; a draft PRD, specification, or plan needs approval; or breaking, destructive, migration, security-sensitive, lifecycle, or direct-main decisions require approval.

### `blocked`

Use when required access or dependencies are unavailable, evidence is contradictory or stale, a prerequisite is incomplete, or an external issue prevents safe work.

Use `proposed` only for a defensible but not-yet-approved suggestion. `run all tasks` must not implement `proposed`.

## Task Template

```md
## <task-id> — <title>

- **Project:**
- **Repository:**
- **Task type:**
- **Priority:**
- **Priority rationale:**
- **Status:**
- **Source document:**
- **Source section or requirement:**
- **Audited revision:**
- **Evidence:**
- **Scope:**
- **Out of scope:**
- **Dependencies:**
- **Required approval:**
- **Acceptance criteria:**
- **Verification required:**
- **Branch:**
- **Pull request:**
- **Verification evidence:**
- **Outcome:**
```

## Idempotency

Build a source fingerprint from Ideas Hub project-record revisions, authority-document revisions, repository commit SHAs, relevant issue/pull-request revisions, CI state, and applicable Zoro presence revision.

When rerun without material changes, refresh the current same-day incomplete run; do not duplicate equivalent tasks; preserve user edits, approvals, completed outcomes, and historical evidence; and mark obsolete tasks `skipped` with a reason instead of deleting them.

Create a new run when no valid incomplete run exists, the previous run is completed, material source changes create a new audit cycle, or the user explicitly requests a new run.

## Chat Output

Return the run ID; portfolio health summary; Zoro presence summary when relevant; highest-priority findings; `ready` tasks; tasks needing discovery, specification, approval, or unblocking; security or production incidents; projects not deeply audited and why; a daily-focus question if priorities remain tied; confirmation that no source-code implementation occurred; and `run all tasks` as the next command only when actionable tasks exist.
