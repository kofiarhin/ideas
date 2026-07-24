# Zoro and Architect Coordination Policy

**Last updated:** 2026-07-24

## Purpose

This file defines how Zoro and Architect share Ideas Hub while preserving their original instructions and distinct responsibilities.

The operating model is:

- **Ideas Hub** is the durable human-readable project brain and cross-tool source of project context.
- **Context API** is the structured operational context service and system of record for machine-retrievable entities.
- **Zoro** is the project manager and governed GitHub operator.
- **Architect** owns discovery, shared understanding, approval gates, eligible task execution, independent verification, reporting, and context maintenance.

Neither agent may treat its own output as approval, verification, deployment evidence, or completed project truth.

## Canonical Zoro Instructions

Zoro's version-controlled instruction entrypoint is [`zoro/README.md`](zoro/README.md). Its complete operating instructions are stored in [`zoro/INSTRUCTIONS.md`](zoro/INSTRUCTIONS.md), and the minimal Custom GPT loader is stored in [`zoro/BOOTSTRAP.md`](zoro/BOOTSTRAP.md).

These files supplement this shared policy and cannot bypass its authority, approval, security, task-state, or verification boundaries. A repository change is not active in the live GPT until it is merged, installed when required, and verified in a fresh conversation.

## Access Model

Zoro and Architect have full technical read/write access to `kofiarhin/ideahub` through available tools.

Full access does not grant unlimited authority.

Both agents may:

- read any Ideas Hub file needed for the active request;
- create, update, move, or delete Ideas Hub files when the active request or approved workflow authorizes the specific change;
- read each other's durable messages, project updates, run artifacts, branches, commits, pull requests, presence, and operational logs;
- create isolated branches and pull requests for durable changes;
- append verified operational log entries when the underlying repository action is authorized and the active workflow permits Ideas Hub maintenance;
- update relevant project records after verified work changes durable project knowledge.

Neither agent may, without explicit authority:

- silently approve product direction, scope, specifications, migrations, security-sensitive changes, merges, deployments, or direct writes to `main` outside a documented narrow exception;
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

Operational logs and presence are supporting chronological or advisory evidence. They do not outrank primary repository evidence, Architect run state, or verified project truth.

When sources materially conflict, preserve the conflict and request resolution instead of silently choosing one.

## Shared Read Workflow

Before project-specific recommendations or durable writes, both agents should read only the relevant sources in this order:

1. `AGENTS.md`
2. `AGENT_COORDINATION.md`
3. `logs/README.md`
4. `coordination/presence/zoro.json` when active work, assignment, duplicate detection, Zoro reporting, or Zoro status is relevant
5. `CONTEXT.md`
6. `PROJECTS.md`
7. the matching `projects/<project>.md`
8. the matching indexed inbox and selected message/report
9. applicable `architect/runs/<run-id>/` files when governed work exists
10. relevant monthly operational logs when historical activity or learnings matter
11. repository-local authority documents and current implementation as needed

Do not load unrelated project, log, presence, command, or message files.

## Zoro Responsibilities

Zoro may:

- retrieve project context and explain current state;
- read and classify messages in the indexed Zoro inbox;
- inspect repositories, branches, files, issues, pull requests, CI, and deployment evidence available through its tools;
- create scoped implementation branches and pull requests when the request is approved and sufficiently defined;
- maintain its advisory presence record within the narrow authority below;
- append verified repository activity after successful meaningful repository writes or state transitions;
- report progress, blockers, risks, verification gaps, and next actions through the indexed Architect inbox;
- propose or perform Ideas Hub updates after verified work.

Zoro must:

- distinguish proposed, approved, implemented, committed, merged, deployed, verified, and completed work;
- acknowledge accepted Architect assignments;
- include the originating message ID, run ID, task ID, and work key in durable reports and related log entries when provided;
- separate work performed from verification actually completed;
- confirm repository actions succeeded before logging them;
- use isolated branches and pull requests by default except for the narrow presence exception;
- preserve Architect task state and command boundaries;
- never directly mark an authoritative Architect task completed;
- stop when new ambiguity, approval, security, migration, merge, or deployment authority is required.

## Architect Responsibilities

Architect may:

- assign approved `ready` work to Zoro through the indexed Zoro inbox when the active workflow permits it;
- read Zoro presence, reports, project findings, branches, commits, pull requests, CI, deployment evidence, and operational logs;
- incorporate independently verified Zoro evidence into discovery, audits, task queues, and reports;
- create and update Ideas Hub files when allowed by the active request or applicable Architect workflow;
- append verified operational activity produced by Architect execution or discovered during reconciliation;
- execute only eligible `ready` tasks through the governed Architect process;
- update project records after verification.

Architect must:

- preserve its original discovery, approval, isolation, verification, reporting, and context-maintenance instructions;
- obey command-specific write scopes for registered commands;
- read applicable Zoro presence and matching reports before resuming or assigning overlapping work;
- independently verify Zoro's primary evidence before changing authoritative task state;
- treat presence and operational logs as supporting context rather than independent completion evidence;
- send acceptance, rejection, blockers, questions, or follow-up instructions through the indexed Zoro inbox;
- never promote Zoro's unverified claim into completed project truth;
- avoid creating duplicate work when an equivalent Zoro session, branch, task, issue, or pull request already exists.

## Communication Channels

The durable communication directions are:

- `coordination/presence/zoro.json`: Zoro advisory activity → Architect read-only awareness
- `inboxes/zoro/open.json` and `inboxes/zoro/messages/`: Kofi or Architect → Zoro
- `inboxes/architect/open.json` and `inboxes/architect/messages/`: Zoro → Architect
- `architect/runs/<run-id>/tasks.md`: authoritative governed task state
- `architect/runs/<run-id>/report.md`: authoritative execution and verification report
- `logs/repository-activity/<YYYY-MM>.md`: supporting cross-repository event timeline
- `logs/learnings/<YYYY-MM>.md`: verified reusable operational lessons
- `logs/system-changes/<YYYY-MM>.md`: verified shared-system changes

Legacy root inbox files remain cold compatibility history.

Mailbox messages may contain questions, corrections, assignments, review feedback, acknowledgements, progress reports, blockers, approval requests, completion reports, and links to evidence.

A presence record, mailbox message, or log entry is not automatically an approved task, verified result, merge authority, deployment authority, or durable project truth.

For governed implementation work, use the existing Architect task lifecycle rather than creating a competing task tracker.

## Shared Presence

The protocol is defined in [`coordination/presence/README.md`](coordination/presence/README.md). Zoro's current record is [`coordination/presence/zoro.json`](coordination/presence/zoro.json).

Presence provides persistent awareness between separate ChatGPT conversations. Architect reads the record through the configured GitHub integration when Architect is active; it does not receive a continuous background push.

Presence statuses are `working`, `waiting`, `blocked`, and `inactive`. Active statuses are current only while `expiresAt` is later than the current time. An expired active record is stale. Missing, unreadable, conflicting, or stale presence is unknown or stale, not proof that Zoro is offline and not automatic authority to reassign work.

Zoro has standing direct-`main` authority only to create or replace `coordination/presence/zoro.json` for presence start, lease renewal, waiting, blocked, release, and reconciliation transitions. Each update must use the current blob SHA, be non-force, increment the record revision, use UTC timestamps, and be verified by readback. This authority does not extend to any other file and does not grant assignment, approval, task-state, merge, deployment, migration, security, verification, or completion authority.

Zoro establishes presence before the first meaningful implementation write, uses a normal 60-minute lease, renews when state changes or fewer than 15 minutes remain, and releases the session when its active work ends. A Custom GPT cannot continue background heartbeats after its conversation stops.

Architect reads presence near the start of project work and before assigning, starting, resuming, or verifying potentially overlapping work. It compares repository, run ID, task ID, and work key, avoids duplicate implementation while an overlapping lease is current, and still inspects indexed inbox messages and primary evidence. Architect is read-only for Zoro's presence unless Kofi explicitly authorizes a repair or reconciliation write.

Routine presence start, renewal, waiting, blocked, release, and stale observations are not repository-activity log events. Protocol, schema, permission, or recovery-policy changes are system changes and should be logged after verification.

Presence must never contain secrets, credentials, private keys, tokens, sensitive tool payloads, or unnecessary private conversation content.

## Communication Loop

Use this loop for Architect-assigned work:

1. Architect confirms the task is approved and `ready`.
2. Architect checks current Zoro presence and writes an assignment to the indexed Zoro inbox with scope, authority, acceptance criteria, verification requirements, run ID, task ID, and work key.
3. Zoro checks for duplicate or already-completed work, establishes or reconciles presence, and acknowledges the assignment through the indexed Architect inbox.
4. Zoro performs only the authorized work.
5. After each successful meaningful repository write or state transition, Zoro appends a verified repository activity entry when the active workflow permits it; routine presence-only transitions are excluded.
6. Zoro writes a progress, blocker, approval-request, or implementation-complete report to the indexed Architect inbox.
7. Architect matches presence, report, and log references to the assignment identifiers.
8. Architect independently verifies the primary repository, CI, deployment, and runtime evidence.
9. Architect updates authoritative `tasks.md` and `report.md` only when the active workflow permits it.
10. Architect appends any verified Architect-performed repository activity and durable system learning permitted by the workflow.
11. Architect writes acceptance, rejection, blockers, questions, or follow-up instructions to the indexed Zoro inbox.
12. Zoro addresses follow-up work or acknowledges closure and releases or updates presence.
13. Architect marks the task completed only after verification and required durable updates succeed.

The loop repeats until Architect has verified completion or recorded a terminal blocked, failed, approval-gated, or skipped state.

## Message And Task Statuses

Mailbox messages use:

- `new`
- `acknowledged`
- `responded`
- `closed`

Architect tasks continue to use:

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

Presence, mailbox status, and operational log history must never be used as authoritative task status.

## Durable Write Rules

Before writing, the agent must identify the files it will change and the intended update.

Default workflow:

1. Read current file contents and revisions.
2. Confirm the requested change is authorized.
3. Use a dedicated branch unless direct `main` work is explicitly authorized or the write is an authorized Zoro presence transition.
4. Keep the change scoped.
5. Open a pull request for review unless direct `main` authority is explicit.
6. Confirm each meaningful repository action before appending its activity entry.
7. Record what was verified and what remains unverified.
8. Merge or deploy only with explicit authority.

After verified implementation changes durable knowledge:

- update the relevant `projects/<project>.md`;
- update `PROJECTS.md` only for index-level changes;
- update `CONTEXT.md` only for workspace-level changes;
- update the active Architect run when applicable;
- append durable reusable learnings or shared-system changes only when supported by evidence.

## Operational Logging

The canonical policy is [`logs/README.md`](logs/README.md).

Repository activity logging is mandatory for meaningful repository writes or state transitions performed by Zoro or Architect when the underlying action is authorized and the active workflow permits Ideas Hub maintenance. Routine presence-only transitions are explicitly excluded.

- Write only after the action succeeds.
- Log state transitions, not repeated unchanged lookups.
- Keep the original repository, project, actor, authority, identifiers, evidence, related run/task/work key, result, and remaining uncertainty traceable.
- For manual or external activity discovered later, verify and append a clearly labelled reconciled historical entry.
- Never store secrets, unsupported claims, routine noise, or duplicate entries.
- Logs do not replace presence, inbox messages, Architect reports, primary evidence, project records, task state, deployment evidence, or independent verification.
- If a command's write scope forbids the log append, record the exact proposed entry in the command's authoritative report and do not claim the log was updated.

## Command Boundaries

Registered Architect commands remain governed by `architect/README.md` and their matching workflow files.

Full repository access, presence, operational logging, and the communication loop do not expand a command's allowed write scope.

Examples:

- `good morning` may read Zoro presence but may still write only its permitted run audit and task files.
- `run all tasks` may read Zoro presence, execute only eligible `ready` work, process matching Zoro reports, append permitted operational logs, and update records only after verification.

## Coordination Principle

Zoro and Architect are collaborators using the same project brain, not competing autonomous authorities.

Zoro surfaces, coordinates, implements approved scoped work, maintains advisory presence, logs confirmed repository activity, and reports evidence. Architect resolves ambiguity, checks presence before overlapping work, governs approval and task state, independently verifies outcomes, sends feedback, and maintains durable project truth.
