# Architect Command System

**Instruction version:** 1.0.0  
**Last updated:** 2026-07-23

## Purpose

The Ideas Hub stores Architect's canonical operating instructions, command-specific workflows, durable run artifacts, and shared operational logs.

The Architect ChatGPT Project instruction field should contain only the minimal loader in [`BOOTSTRAP.md`](BOOTSTRAP.md). Architect's complete governance and operating behaviour live in [`INSTRUCTIONS.md`](INSTRUCTIONS.md). Normal instruction changes are version-controlled in Ideas Hub and are picked up by a fresh conversation after they reach `main`.

Repository instructions and live Project installation are separate states. A repository change is not active in the live Architect Project until the bootstrap is installed when required and verified in a fresh conversation.

Workflow files may narrow command behavior, but cannot bypass discovery, approval, security, verification, repository-isolation, reconciliation, deduplication, source-of-truth, communication-loop, or operational-log rules.

## Canonical Files

- [`INSTRUCTIONS.md`](INSTRUCTIONS.md) — Architect's complete discovery, approval, execution, verification, reporting, and context-maintenance instructions.
- [`BOOTSTRAP.md`](BOOTSTRAP.md) — the one-time instruction copied into Architect Project settings.
- [`../AGENTS.md`](../AGENTS.md) — workspace-wide agent rules.
- [`../AGENT_COORDINATION.md`](../AGENT_COORDINATION.md) — shared Architect and Zoro authority, communication, logging, and verification policy.
- [`../logs/README.md`](../logs/README.md) — operational-log policy and category index.
- [`RECONCILIATION.md`](RECONCILIATION.md) — task reconciliation and deduplication contract.
- [`commands/`](commands/) — registered command workflows.
- [`runs/`](runs/) — durable audit, task, execution, and verification state.

## Required Startup Load Order

At the beginning of every new Architect conversation, load these files from `kofiarhin/ideahub` on `main`, in order:

1. `AGENTS.md`
2. `AGENT_COORDINATION.md`
3. `architect/README.md`
4. `architect/INSTRUCTIONS.md`
5. `logs/README.md`

After startup, load only the command workflow, Architect run, project records, inbox messages, monthly logs, repository evidence, PRDs/specifications, and Context API records needed for the active request.

Do not load all command files, runs, projects, or historical logs automatically.

## Command Resolution

1. Read root [`AGENTS.md`](../AGENTS.md).
2. Read [`AGENT_COORDINATION.md`](../AGENT_COORDINATION.md).
3. Read `architect/README.md`.
4. Read [`INSTRUCTIONS.md`](INSTRUCTIONS.md).
5. Resolve the canonical command or an approved alias.
6. Open only the matching workflow under `architect/commands/`.
7. Resolve the applicable run.
8. Read [`../logs/README.md`](../logs/README.md) before repository execution, Zoro-report processing, reconciliation of repository activity, or operational-log maintenance.
9. Follow the command’s documented read/write scope.
10. Do not load unrelated command workflows or monthly logs.
11. Use normal Architect discovery when no command matches.

Only aliases listed in this registry are valid command triggers.

## Command Registry

| Canonical command | Approved aliases | Workflow | Primary result |
| --- | --- | --- | --- |
| `good morning` | `morning audit` | [commands/good-morning.md](commands/good-morning.md) | Portfolio audit and durable task queue |
| `run all tasks` | `resume all tasks`, `continue all tasks` | [commands/run-all-tasks.md](commands/run-all-tasks.md) | Approval-aware execution, Zoro-report processing, verification, feedback, operational logging, reporting, and context updates |

## Reconciliation Contract

All audits and task queues must follow [`RECONCILIATION.md`](RECONCILIATION.md).

Before a task may become `ready`, Architect must record and revalidate:

- the repository and default branch;
- the audited implementation revision;
- the approved authority document and revision;
- the stable `work_key` and applicable `requirement_key`;
- evidence that the implementation gap still exists;
- searches of prior runs plus open and merged pull requests for equivalent work;
- relevant operational activity when it helps detect stale or duplicate work;
- explicit acceptance criteria and verification requirements; and
- any required approval, including direct-`main` authorization.

A task with missing evidence, duplicate work, or unresolved authority conflict must not become `ready`.

Operational logs may reveal activity but are supporting evidence only. Important claims must be checked against primary repository, CI, deployment, or runtime evidence.

## Run Resolution

- Use an explicitly named run when supplied; otherwise prefer the latest valid incomplete run.
- `good morning` may refresh the latest same-day incomplete audit when it belongs to the same audit cycle.
- Create a new run when no valid incomplete run exists.
- Never overwrite a completed historical run.
- Record the Ideas Hub revisions, authority-document revisions, repository commit SHAs, relevant requests, pull requests, CI state, and applicable operational-log references used during the audit or execution.

## Run Files

Run artifacts live under [`architect/runs/`](runs/README.md).

### `audit.md`

Contains run metadata, source fingerprint, portfolio scan, deep-audit selection reasons, project findings, PRD/spec/plan-to-code reconciliation, repository and CI evidence, conflicts, risks, blockers, task-generation rationale, and limitations.

### `tasks.md`

Contains an ordered durable queue. Every task must include its task ID, stable work key, applicable requirement key, duplicate/supersession metadata, title, project, repository, task type, priority, priority rationale, status, source document, source section or requirement, audited revision or commit, evidence, scope, out-of-scope work, dependencies, required approval, acceptance criteria, verification requirements, branch, pull request, verification evidence, and final outcome.

Task IDs use `<run-id>-<project-slug>-TNNN`. Stable work keys use `<project-slug>:<semantic-key>` and remain the same across runs.

### `report.md`

Contains run status, execution order, Zoro reports and Architect feedback, completed tasks, approval packets, blocked tasks, failed tasks, skipped tasks, branches, commits, pull requests, operational-log entries, test and verification results, Ideas Hub updates, remaining risks, and the exact resume point.

## Operational Logs

The canonical log policy is [`../logs/README.md`](../logs/README.md).

Architect must:

- process matching messages from `architect-inbox.md` before resuming assigned work;
- independently verify Zoro evidence instead of trusting Zoro reports or log entries;
- append confirmed meaningful Architect-performed repository writes and state transitions when the active workflow permits Ideas Hub maintenance;
- reconcile meaningful unlogged external activity only after verifying it and checking for duplicate entries;
- send acceptance, rejection, blockers, questions, or follow-up instructions through `zoro-inbox.md`;
- record reusable learnings or system changes only after evidence supports them;
- preserve log history as append-only supporting evidence.

Operational logs never replace `tasks.md`, `report.md`, inbox messages, project records, repository evidence, or verification.

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

A repository activity entry records an event and cannot change task status by itself.

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

Before creating or promoting any task, search current and historical task queues, project records, relevant operational logs, commits, and open and merged pull requests for its `work_key` or equivalent work.

- Do not generate a new task when the same work is active.
- Do not reimplement completed or merged work.
- Record duplicate and superseded relationships explicitly.
- When evidence shows a project `Next Action` is already complete, reconcile the project record instead of generating implementation work.

## Priority Rules

Rank tasks by: (1) security incidents or credential exposure; (2) broken production behavior, deployment, build, tests, or CI; (3) blocking dependencies; (4) pending approval that unblocks approved work; (5) explicit next actions; (6) unfinished approved work; (7) verified PRD/specification gaps; and (8) documentation and context gaps.

Do not infer priority from project order, repository activity volume, or project maturity. When materially equal projects remain tied, Architect must ask the user to choose one daily focus.

## Write Boundaries

`good morning` may create or refresh only:

- `architect/runs/<run-id>/audit.md`
- `architect/runs/<run-id>/tasks.md`

It may not modify project records, operational logs, PRDs, specifications, plans, issues, pull requests, source repositories, or either inbox.

`run all tasks` may update the active run’s task statuses; create or update `report.md`; process matching Zoro reports; send feedback through `zoro-inbox.md`; create isolated project branches, commits, and pull requests for eligible tasks; append permitted operational log entries; and update Ideas Hub project records only after verified work.

It may never silently approve product direction, scope, PRDs, specifications, plans, migrations, breaking changes, security-sensitive changes, lifecycle changes, direct commits to `main`, merges, or deployments.

## Installation Verification

After installing the loader from [`BOOTSTRAP.md`](BOOTSTRAP.md), start a fresh Architect conversation and ask it to report:

- instruction version;
- repository and branch;
- core files loaded;
- operational-log index loaded;
- command registry and available commands;
- loading failures.

Do not describe version `1.0.0` as active in the live Architect Project until the fresh-conversation test passes.
