# Zoro Command Center

**Instruction version:** 1.1.1  
**Last updated:** 2026-07-23

## Purpose

This directory is the canonical, version-controlled command center for Zoro's operating instructions.

The Custom GPT instruction field should contain only the minimal bootstrap in [`BOOTSTRAP.md`](BOOTSTRAP.md). Zoro's complete operating behaviour lives in [`INSTRUCTIONS.md`](INSTRUCTIONS.md) and is changed through the normal Ideas Hub repository workflow.

The bootstrap is installed once. Normal instruction, coordination, and operational-memory improvements happen in Ideas Hub and are picked up in a fresh Zoro conversation after they reach `main`.

Repository instructions and live GPT installation are separate states. A merged instruction change is not active in Zoro until the bootstrap is installed when required and the current version is verified in a fresh GPT conversation.

## Canonical Files

- [`INSTRUCTIONS.md`](INSTRUCTIONS.md) — Zoro's complete operating instructions.
- [`BOOTSTRAP.md`](BOOTSTRAP.md) — the copy-paste instruction retained in GPT Builder.
- [`../AGENTS.md`](../AGENTS.md) — workspace-wide agent rules.
- [`../AGENT_COORDINATION.md`](../AGENT_COORDINATION.md) — shared Zoro and Architect authority, communication, logging, and verification policy.
- [`../logs/README.md`](../logs/README.md) — operational log policy and category index.
- [`../zoro-inbox.md`](../zoro-inbox.md) — canonical Kofi or Architect to Zoro assignments and feedback.
- [`messages/`](messages/) — supplemental one-message-per-file assignments that must be checked together with `zoro-inbox.md`.
- [`../architect-inbox.md`](../architect-inbox.md) — Zoro to Architect acknowledgements and reports.
- [`../architect/README.md`](../architect/README.md) — registered Architect command workflows.

## Required Startup Load Order

At the beginning of every new conversation, Zoro must load these files from `kofiarhin/ideahub` on `main` in order:

1. `AGENTS.md`
2. `AGENT_COORDINATION.md`
3. `zoro/README.md`
4. `zoro/INSTRUCTIONS.md`
5. `logs/README.md`

The first four files are loaded by the GPT Builder bootstrap. The repository instructions then require the operational log index as the fifth startup file.

After the canonical instructions and log index are loaded, Zoro should load only the additional project, inbox, Architect-run, monthly log, repository, and Context API sources required for the active request.

When told `Check your Ideas Hub inbox`, Zoro must read `zoro-inbox.md` and then inspect `zoro/messages/` for new message files assigned to Zoro. A message in either location is part of the same governed inbox workflow and must be deduplicated by message ID and work key before execution.

Do not load all historical logs automatically.

## Operational Memory

Ideas Hub uses three operational log categories:

- `logs/repository-activity/<YYYY-MM>.md` — meaningful verified repository writes and state transitions.
- `logs/learnings/<YYYY-MM>.md` — reusable evidence-supported lessons.
- `logs/system-changes/<YYYY-MM>.md` — verified changes to Zoro, Architect, Ideas Hub governance, and shared workflows.

Repository activity is append-only supporting history. It does not replace GitHub evidence, Architect task state, inbox reports, project records, deployment evidence, or independent verification.

When Zoro performs an authorized meaningful repository action, it must confirm the action succeeded before appending the corresponding activity entry. For Architect-assigned work, Zoro must also report through `architect-inbox.md` and await Architect feedback through `zoro-inbox.md`.

## Authority

These command-center files supplement rather than bypass the repository's shared governance.

Zoro must not treat repository access, an inbox message, a log entry, a branch, a commit, a pull request, or its own report as approval, verification, deployment evidence, or completed project truth.

The user's latest explicit instruction remains highest priority. Conflicts must be surfaced rather than silently resolved.

## Loading Failure

If any required startup file cannot be loaded, Zoro must report the failure and stop before performing:

- persistent writes;
- implementation changes;
- direct writes to a default branch;
- merges or deployments;
- migrations or security-sensitive changes; or
- verification or completion updates.

Read-only assistance may continue only when it does not depend on missing authority or operating instructions.

## Change Workflow

1. Read the current files and relevant project context.
2. Complete discovery and obtain explicit approval for material changes.
3. Use an isolated branch and focused pull request by default.
4. Preserve authority, security, task-state, logging, and verification boundaries.
5. Do not store secrets or credentials.
6. Confirm meaningful repository actions before logging them.
7. Merge only with explicit authority.
8. Install an updated bootstrap in GPT Builder only when the bootstrap itself changes.
9. Verify the loaded version and startup files in a fresh conversation before describing the change as active.

## Verification Prompt

After an instruction release reaches `main`, start a fresh Zoro conversation and send:

```text
Load your canonical instructions and report:
- instruction version
- repository
- branch
- core files loaded
- operational log index loaded
- any loading failures
Do not write anything.
```

Then test the existing communication entrypoint:

```text
Check your Ideas Hub inbox.
```

For the logging workflow, use an explicitly authorized harmless repository change and confirm that Zoro records the successful action and reports governed work through the correct inbox.
