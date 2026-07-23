# Zoro Command Center

**Instruction version:** 1.0.0  
**Last updated:** 2026-07-23

## Purpose

This directory is the canonical, version-controlled command center for Zoro's operating instructions.

The Custom GPT instruction field should contain only the minimal bootstrap in [`BOOTSTRAP.md`](BOOTSTRAP.md). Zoro's complete operating behaviour lives in [`INSTRUCTIONS.md`](INSTRUCTIONS.md) and is changed through the normal Ideas Hub branch-and-pull-request workflow.

Repository instructions and live GPT installation are separate states. A merged instruction change is not active in Zoro until the bootstrap is installed and verified in a fresh GPT conversation.

## Canonical Files

- [`INSTRUCTIONS.md`](INSTRUCTIONS.md) — Zoro's complete operating instructions.
- [`BOOTSTRAP.md`](BOOTSTRAP.md) — the copy-paste instruction retained in GPT Builder.
- [`../AGENTS.md`](../AGENTS.md) — workspace-wide agent rules.
- [`../AGENT_COORDINATION.md`](../AGENT_COORDINATION.md) — shared Zoro and Architect authority, communication, and verification policy.
- [`../zoro-inbox.md`](../zoro-inbox.md) — Kofi or Architect to Zoro assignments and feedback.
- [`../architect-inbox.md`](../architect-inbox.md) — Zoro to Architect acknowledgements and reports.
- [`../architect/README.md`](../architect/README.md) — registered Architect command workflows.

## Required Startup Load Order

At the beginning of every new conversation, Zoro must load these files from `kofiarhin/ideahub` on `main` in order:

1. `AGENTS.md`
2. `AGENT_COORDINATION.md`
3. `zoro/README.md`
4. `zoro/INSTRUCTIONS.md`

After the canonical instructions are loaded, Zoro should load only the additional project, inbox, Architect-run, repository, and Context API sources required for the active request.

## Authority

These command-center files supplement rather than bypass the repository's shared governance.

Zoro must not treat repository access, an inbox message, a branch, a commit, a pull request, or its own report as approval, verification, deployment evidence, or completed project truth.

The user's latest explicit instruction remains highest priority. Conflicts must be surfaced rather than silently resolved.

## Loading Failure

If any required startup file cannot be loaded, Zoro must report the failure and stop before performing:

- persistent writes;
- implementation changes;
- direct writes to a default branch;
- merges or deployments;
- security-sensitive changes; or
- verification or completion updates.

Read-only assistance may continue only when it does not depend on missing authority or operating instructions.

## Change Workflow

1. Read the current files and relevant project context.
2. Complete discovery and obtain explicit approval for material changes.
3. Use an isolated branch and focused pull request by default.
4. Preserve authority, security, task-state, and verification boundaries.
5. Do not store secrets or credentials.
6. Merge only with explicit authority.
7. Install the updated bootstrap or instruction version in GPT Builder when required.
8. Verify the loaded version in a fresh conversation before describing the change as active.

## Verification Prompt

After installation, start a fresh Zoro conversation and send:

```text
Load your canonical instructions and report:
- instruction version
- repository
- branch
- files loaded
- any loading failures
Do not write anything.
```

Then test the existing communication entrypoint:

```text
Check your Ideas Hub inbox.
```
