# Zoro Command Center

**Instruction version:** 1.2.0  
**Last updated:** 2026-07-23

## Purpose

This directory stores Zoro's canonical detailed instructions. The live Custom GPT instruction field should contain only the loader in [`BOOTSTRAP.md`](BOOTSTRAP.md).

Zoro now starts from the compact generated runtime under [`../runtime/`](../runtime/) and loads detailed canonical sources only when required.

## Runtime And Canonical Sources

Hot path:

- [`../runtime/manifest.json`](../runtime/manifest.json) — runtime version and source fingerprints.
- [`../runtime/zoro.md`](../runtime/zoro.md) — compact startup instructions.

Canonical detailed sources:

- [`../AGENTS.md`](../AGENTS.md)
- [`../AGENT_COORDINATION.md`](../AGENT_COORDINATION.md)
- [`README.md`](README.md)
- [`INSTRUCTIONS.md`](INSTRUCTIONS.md)
- [`../logs/README.md`](../logs/README.md)

The runtime is generated output, not a competing source of truth. Run:

```bash
node scripts/build-agent-runtime.mjs --check
```

to detect source/runtime drift, or:

```bash
node scripts/build-agent-runtime.mjs --write
```

after intentionally updating the runtime templates and canonical instruction sources.

## Startup

A fresh conversation loads:

1. `runtime/manifest.json`
2. `runtime/zoro.md`

If either fails, Zoro falls back to the canonical detailed files in the documented order. If fallback is incomplete, Zoro remains read-only.

## Indexed Inbox

Primary hot-path inbox:

- [`../inboxes/zoro/open.json`](../inboxes/zoro/open.json)
- [`../inboxes/zoro/messages/`](../inboxes/zoro/messages/)
- [`../inboxes/zoro/archive/`](../inboxes/zoro/archive/)

Return channel:

- [`../inboxes/architect/open.json`](../inboxes/architect/open.json)
- [`../inboxes/architect/messages/`](../inboxes/architect/messages/)
- [`../inboxes/architect/archive/`](../inboxes/architect/archive/)

Legacy compatibility history remains in:

- [`../zoro-inbox.md`](../zoro-inbox.md)
- [`../architect-inbox.md`](../architect-inbox.md)
- [`messages/`](messages/)

New workflow logic must prefer the indexed inbox and load only selected messages.

## Architect Task Lookup

When a message references a run:

1. read `architect/runs/<run-id>/tasks/index.json` when present;
2. read only `architect/runs/<run-id>/tasks/<task-id>.md` when present;
3. fall back to the legacy run `tasks.md` only when detailed content is unavailable from the shard.

Authoritative task state remains in the Architect run.

## Authority

Repository access is not approval. Zoro must preserve user authority, Architect task state, branch isolation, repository protection, security, verification, and operational-log boundaries.

## Installation Verification

After the loader is installed, start a fresh Zoro conversation and ask it to report:

- runtime version;
- repository and branch;
- runtime files loaded;
- fallback files loaded, if any;
- indexed inbox path;
- loading failures.

Then test:

```text
Check your Ideas Hub inbox.
```

Do not describe version `1.2.0` as active in the live GPT until the fresh-conversation test passes.
