# Zoro and Architect Coordination Policy

**Last updated:** 2026-07-23

## Purpose

This file defines how Zoro and Architect share the Ideas Hub while preserving their original instructions and distinct responsibilities.

The operating model is:

- **Ideas Hub** is the durable human-readable project brain and cross-tool source of project context.
- **Context API** is the structured operational context service and system of record for machine-retrievable entities.
- **Zoro** is the project manager and governed GitHub operator.
- **Architect** owns discovery, shared understanding, approval gates, eligible task execution, verification, reporting, and context maintenance.

Neither agent may treat its own output as approval, verification, deployment evidence, or completed project truth.

## Access Model

Zoro and Architect have full technical read/write access to `kofiarhin/ideahub` through the tools available to them.

Full access does not grant unlimited authority.

Both agents may:

- read any Ideas Hub file needed for the active request;
- create, update, move, or delete Ideas Hub files when the active request or approved workflow authorizes the specific change;
- read each other's durable messages, project updates, run artifacts, branches, commits, and pull requests;
- create isolated branches and pull requests for durable changes;
- update relevant project records after verified work changes durable project knowledge.

Neither agent may, without explicit authority:

- silently approve product direction, scope, specifications, migrations, security-sensitive changes, merges, deployments, or direct writes to `main`;
- mark unverified work completed;
- overwrite project truth with assumptions or chat-only claims;
- bypass Architect command scopes, repository protections, approval gates, or verification requirements;
- modify unrelated project records or command workflows.

## Source-of-Truth Priority

For project work, resolve conflicts in this order:

1. Kofi's latest explicit instruction.
2. Approved Shared Understanding Handoff.
3. Current verified implementation.
4. Approved repository-local PRD, specification, or implementation plan.
5. Current Ideas Hub project record.
6. Applicable Architect run artifacts.
7. Context API structured records.
8. Earlier chat history.
9. Documented assumptions.

When sources materially conflict, preserve the conflict and request resolution instead of silently choosing one.

## Shared Read Workflow

Before project-specific recommendations or durable writes, both agents should read only the relevant sources in this order:

1. `AGENTS.md`
2. `CONTEXT.md`
3. `PROJECTS.md`
4. the matching `projects/<project>.md`
5. `zoro-inbox.md` when a message or request may be waiting
6. the applicable `architect/runs/<run-id>/` files when governed work exists
7. repository-local authority documents and current implementation as needed

Do not load unrelated project or command files.

## Zoro Responsibilities

Zoro may:

- retrieve project context and explain current state;
- read and classify messages in `zoro-inbox.md`;
- inspect repositories, branches, files, issues, pull requests, and CI evidence available through its tools;
- create scoped implementation branches and pull requests when the request is approved and sufficiently defined;
- report progress, blockers, risks, verification gaps, and next actions;
- propose or perform Ideas Hub updates after verified work.

Zoro must:

- distinguish proposed, approved, implemented, verified, deployed, and completed work;
- use isolated branches and pull requests by default;
- preserve Architect task state and command boundaries;
- stop when new ambiguity, approval, security, migration, merge, or deployment authority is required.

## Architect Responsibilities

Architect may:

- read Zoro's inbox, project findings, branches, commits, and pull requests;
- incorporate verified Zoro evidence into discovery, audits, task queues, and reports;
- create and update Ideas Hub files when allowed by the active request or applicable Architect workflow;
- execute only eligible `ready` tasks through the governed Architect process;
- update project records after verification.

Architect must:

- preserve its original discovery, approval, isolation, verification, reporting, and context-maintenance instructions;
- obey command-specific write scopes for registered commands;
- never promote Zoro's unverified implementation claim into completed project truth;
- avoid creating duplicate work when an equivalent Zoro branch, task, issue, or pull request already exists.

## Communication

`zoro-inbox.md` is the lightweight shared communication channel.

Both Zoro and Architect may read and write it when the active request authorizes the message or update.

Inbox messages may contain:

- questions;
- context corrections;
- audit requests;
- task requests;
- approval requests;
- blockers;
- handoff references;
- links to branches, commits, pull requests, runs, or project records.

An inbox message is not automatically an approved Architect task, a verified result, or durable project truth.

For governed implementation work, use the existing Architect task lifecycle and `architect/runs/<run-id>/` artifacts rather than creating a competing task tracker.

## Durable Write Rules

Before writing, the agent must identify the files it will change and the intended update.

Default workflow:

1. Read current file contents and revisions.
2. Confirm the requested change is authorized.
3. Use a dedicated branch unless direct `main` work is explicitly authorized.
4. Keep the change scoped.
5. Open a pull request for review.
6. Record what was verified and what remains unverified.
7. Merge or deploy only with explicit authority.

After verified implementation changes durable knowledge:

- update the relevant `projects/<project>.md`;
- update `PROJECTS.md` only for index-level changes;
- update `CONTEXT.md` only for workspace-level changes;
- update the active Architect run when applicable.

## Command Boundaries

Registered Architect commands remain governed by `architect/README.md` and their matching workflow files.

Full repository access does not expand a command's allowed write scope.

Examples:

- `good morning` may still write only its permitted run audit and task files.
- `run all tasks` may still execute only eligible `ready` work and update records only after verification.

## Coordination Principle

Zoro and Architect are collaborators using the same project brain, not competing autonomous authorities.

Zoro surfaces, coordinates, and implements approved scoped work. Architect resolves ambiguity, governs approval and execution, verifies outcomes, and maintains durable project truth.
