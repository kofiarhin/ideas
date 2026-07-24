# Architect Command System

**Instruction version:** 1.2.0  
**Last updated:** 2026-07-24

## Purpose

Ideas Hub stores Architect's canonical detailed instructions, command workflows, durable run artifacts, indexed communication, shared presence, and operational logs.

The live Architect Project instruction field should contain only [`BOOTSTRAP.md`](BOOTSTRAP.md). Architect starts from the compact generated runtime under [`../runtime/`](../runtime/).

## Runtime And Canonical Sources

Hot path:

- [`../runtime/manifest.json`](../runtime/manifest.json)
- [`../runtime/architect.md`](../runtime/architect.md)

Canonical detailed sources:

- [`../AGENTS.md`](../AGENTS.md)
- [`../AGENT_COORDINATION.md`](../AGENT_COORDINATION.md)
- [`README.md`](README.md)
- [`INSTRUCTIONS.md`](INSTRUCTIONS.md)
- [`../logs/README.md`](../logs/README.md)

The runtime is generated output. Use:

```bash
node scripts/build-agent-runtime.mjs --check
```

to detect drift, and `--write` after intentionally updating both canonical sources and runtime templates.

## Startup

A fresh conversation loads:

1. `runtime/manifest.json`
2. `runtime/architect.md`

Fallback loads the five canonical detailed sources. Incomplete runtime and fallback means read-only operation.

## Zoro Presence

Architect reads:

- [`../coordination/presence/README.md`](../coordination/presence/README.md)
- [`../coordination/presence/zoro.json`](../coordination/presence/zoro.json)

Presence is checked near the start of project work and before assigning, starting, resuming, or verifying potentially overlapping Zoro work. Architect compares repository, run ID, task ID, and work key; treats expired active leases as stale; avoids duplicate implementation while an overlapping lease is current; and still inspects indexed inbox messages and primary evidence.

Presence is advisory and cannot change authoritative task state or prove implementation, verification, merge, deployment, or completion. Architect is read-only for Zoro presence unless Kofi explicitly authorizes a repair or reconciliation write.

## Command Registry

| Canonical command | Approved aliases | Workflow |
| --- | --- | --- |
| `good morning` | `morning audit` | [`commands/good-morning.md`](commands/good-morning.md) |
| `run all tasks` | `resume all tasks`, `continue all tasks` | [`commands/run-all-tasks.md`](commands/run-all-tasks.md) |

Only load the matching workflow.

## Indexed Communication

- [`../inboxes/zoro/open.json`](../inboxes/zoro/open.json)
- [`../inboxes/zoro/messages/`](../inboxes/zoro/messages/)
- [`../inboxes/architect/open.json`](../inboxes/architect/open.json)
- [`../inboxes/architect/messages/`](../inboxes/architect/messages/)

Legacy root inbox files remain cold compatibility history.

## Run Artifacts

Each run retains:

```text
architect/runs/<run-id>/
├── audit.md
├── tasks.md
├── tasks/
│   ├── index.json
│   └── <task-id>.md
└── report.md
```

`tasks.md` remains authoritative full detail. The task index and shards are a generated retrieval layer and must not create competing task state.

## Reconciliation

Before promotion to `ready`, verify authority, revisions, evidence, duplicates, active Zoro presence when applicable, work key, requirement key, acceptance criteria, verification requirements, and approvals.

A presence record, message, log entry, branch, commit, or pull request is not task completion evidence.

## Command Boundaries

`good morning` may read Zoro presence and create or refresh only its permitted run audit/task artifacts and matching generated task retrieval files.

`run all tasks` may read Zoro presence, execute only eligible `ready` work, and perform only its documented run, indexed communication, repository, log, and verified context updates.

Neither command may modify Zoro presence without separate explicit authority.

## Installation Verification

After installing the loader, start a fresh Architect conversation and ask it to report:

- runtime version;
- repository and branch;
- runtime files loaded;
- fallback files loaded, if any;
- command registry;
- indexed inbox paths;
- Zoro presence path and interpreted status;
- loading failures.

Do not describe version `1.2.0` as active in the live Project until this test passes.
