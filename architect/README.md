# Architect Command System

## Purpose

The Ideas Hub stores command-specific Architect workflows and durable run artifacts. ChatGPT Architect project settings remain the global governance layer for discovery, Shared Understanding Handoffs, approval gates, implementation safety, repository isolation, verification, reporting, and context maintenance.

Workflow files may narrow command behavior, but cannot bypass discovery, approval, security, verification, repository-isolation, reconciliation, deduplication, or source-of-truth rules.

## Command Resolution

1. Read root [`AGENTS.md`](../AGENTS.md).
2. Read `architect/README.md`.
3. Resolve the canonical command or an approved alias.
4. Open only the matching workflow under `architect/commands/`.
5. Resolve the applicable run.
6. Follow the command’s documented read/write scope.
7. Do not load unrelated command workflows.
8. Use normal Architect discovery when no command matches.

Only aliases listed in this registry are valid command triggers.

## Command Registry

| Canonical command | Approved aliases | Workflow | Primary result |
| --- | --- | --- | --- |
| `good morning` | `morning audit` | [commands/good-morning.md](commands/good-morning.md) | Portfolio audit and durable task queue |
| `run all tasks` | `resume all tasks`, `continue all tasks` | [commands/run-all-tasks.md](commands/run-all-tasks.md) | Approval-aware execution, verification, reporting, and context updates |

## Reconciliation Contract

All audits and task queues must follow [`RECONCILIATION.md`](RECONCILIATION.md).

Before a task may become `ready`, Architect must record and revalidate:

- the repository and default branch;
- the audited implementation revision;
- the approved authority document and revision;
- the stable `work_key` and applicable `requirement_key`;
- evidence that the implementation gap still exists;
- searches of prior runs plus open and merged pull requests for equivalent work;
- explicit acceptance criteria and verification requirements; and
- any required approval, including direct-`main` authorization.

A task with missing evidence, duplicate work, or unresolved authority conflict must not become `ready`.

## Run Resolution

- Use an explicitly named run when supplied; otherwise prefer the latest valid incomplete run.
- `good morning` may refresh the latest same-day incomplete audit when it belongs to the same audit cycle.
- Create a new run when no valid incomplete run exists.
- Never overwrite a completed historical run.
- Record the Ideas Hub revisions, authority-document revisions, repository commit SHAs, relevant requests, pull requests, and CI state used during the audit.

## Run Files

Run artifacts live under [`architect/runs/`](runs/README.md).

### `audit.md`

Contains run metadata, source fingerprint, portfolio scan, deep-audit selection reasons, project findings, PRD/spec/plan-to-code reconciliation, repository and CI evidence, conflicts, risks, blockers, task-generation rationale, and limitations.

### `tasks.md`

Contains an ordered durable queue. Every task must include its task ID, stable work key, applicable requirement key, duplicate/supersession metadata, title, project, repository, task type, priority, priority rationale, status, source document, source section or requirement, audited revision or commit, evidence, scope, out-of-scope work, dependencies, required approval, acceptance criteria, verification requirements, branch, pull request, verification evidence, and final outcome.

Task IDs use `<run-id>-<project-slug>-TNNN`. Stable work keys use `<project-slug>:<semantic-key>` and remain the same across runs.

### `report.md`

Contains run status, execution order, completed tasks, approval packets, blocked tasks, failed tasks, skipped tasks, branches, commits, pull requests, test and verification results, Ideas Hub updates, remaining risks, and the exact resume point.

## Task Statuses

Use only these statuses:

- `proposed`
- `ready`
- `needs_discovery`
- `needs_spec`
- `needs_approval`
- `blocked`
- `running`
- `verifying`
- `completed`
- `failed`
- `skipped`

Source-code implementation may start only for `ready` tasks. The normal successful lifecycle is `ready` → `running` → `verifying` → `completed`.

## Evidence Requirements

A task must be traceable to at least one of the following:

- an approved PRD requirement;
- an approved specification or acceptance criterion;
- an approved implementation plan;
- an approved feature, bug, maintenance, refactor, or change request;
- a documented next action;
- a documented blocker or risk;
- a verified repository gap;
- a failing test, build, CI workflow, deployment, or production behavior;
- a security finding; or
- confirmed implementation/documentation drift.

Do not permit implementation tasks based only on unsupported inference. A merged pull request proves merge state only; deployment and runtime claims require separate evidence.

## Deduplication Requirements

Before creating or promoting any task, search current and historical task queues, project records, relevant commits, and open and merged pull requests for its `work_key` or equivalent work.

- Do not generate a new task when the same work is active.
- Do not reimplement completed or merged work.
- Record duplicate and superseded relationships explicitly.
- When evidence shows a project `Next Action` is already complete, reconcile the project record instead of generating implementation work.

## Priority Rules

Rank tasks by: (1) security incidents or credential exposure; (2) broken production behavior, deployment, build, tests, or CI; (3) blocking dependencies; (4) pending approval that unblocks approved work; (5) explicit next actions; (6) unfinished approved work; (7) verified PRD/specification gaps; and (8) documentation and context gaps.

Do not infer priority from project order, repository activity, or project maturity. When materially equal projects remain tied, Architect must ask the user to choose one daily focus.

## Write Boundaries

`good morning` may create or refresh only:

- `architect/runs/<run-id>/audit.md`
- `architect/runs/<run-id>/tasks.md`

It may not modify project records, PRDs, specifications, plans, issues, pull requests, or source repositories.

`run all tasks` may update the active run’s task statuses; create or update `report.md`; create isolated project branches, commits, and pull requests for eligible tasks; and update Ideas Hub project records only after verified work.

It may never silently approve product direction, scope, PRDs, specifications, plans, migrations, breaking changes, security-sensitive changes, lifecycle changes, or direct commits to `main`.