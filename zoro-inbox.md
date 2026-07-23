# Zoro Inbox

**Last updated:** 2026-07-23

This file is the durable assignment and feedback channel from Kofi or Architect to Zoro.

It is not a replacement for:

- `CONTEXT.md` — workspace briefing
- `PROJECTS.md` — canonical project index
- `projects/<project>.md` — durable project context
- `architect/runs/<run-id>/tasks.md` — authoritative governed task state
- `architect/runs/<run-id>/report.md` — authoritative execution and verification report

## Direction

- `zoro-inbox.md`: Kofi or Architect → Zoro
- `architect-inbox.md`: Zoro → Architect

## Message Statuses

Use only:

- `new` — Zoro has not acknowledged the message
- `acknowledged` — Zoro accepted the message for processing
- `responded` — Zoro produced a durable report in `architect-inbox.md`
- `closed` — no further mailbox action is required

Mailbox status is not Architect task status.

## How Kofi Or Architect Uses This File

Add a message under **Open Messages**, then tell Zoro:

```text
Check your Ideas Hub inbox.
```

For governed work, include the Architect run ID, task ID, stable work key, approval state, acceptance criteria, verification requirements, and explicit authority boundaries.

## How Zoro Must Process Messages

Before processing a message, Zoro must:

1. Read `AGENTS.md` and `AGENT_COORDINATION.md`.
2. Read `CONTEXT.md`, `PROJECTS.md`, and the relevant project record.
3. Read the applicable Architect run files when a run or task is referenced.
4. Check existing branches, commits, issues, pull requests, CI, deployments, and repository specifications when relevant.
5. Confirm the message is assigned to Zoro and that equivalent work is not already active or completed.
6. Confirm the task is `ready` before implementing governed Architect work.
7. Preserve all stated merge, deployment, direct-`main`, security, and verification restrictions.

Zoro must acknowledge accepted work and write durable progress, blocker, approval-request, or completion reports to `architect-inbox.md` when the message requests durable feedback.

A Zoro report must reference the originating message, run ID, task ID, and work key. It must separate work performed from verification actually completed and list evidence, risks, remaining work, and the exact next action.

Zoro must not directly mark an authoritative Architect task completed. Architect independently verifies evidence and updates task state.

Inbox messages are not automatically approval, proof of implementation, verification, deployment, completion, merge authority, deployment authority, or direct-`main` authority.

Durable repository changes should use an isolated branch and pull request unless direct `main` work is explicitly authorized.

## Message Template

```md
## ARCH-ZORO-YYYY-MM-DD-NNN

- Message Status: new
- From: Kofi | Architect
- To: Zoro
- Type: question | review | task-assignment | decision | context-correction | review-feedback
- Architect Run: <run ID or none>
- Architect Task: <task ID or none>
- Work Key: <stable key or none>
- Project: <project or workspace>
- Task Status: proposed | ready | needs_discovery | needs_spec | needs_approval | blocked | running | verifying | completed | failed | skipped | none
- Priority: low | normal | high | urgent
- Approval: read-only | discovery-approved | implementation-approved
- Created: YYYY-MM-DD

### Objective

<What Zoro should understand or accomplish>

### Authority

- Read repositories: approved | not approved
- Write Ideas Hub: approved | not approved
- Modify implementation repository: approved | not approved
- Direct main: approved | not approved
- Merge: approved | not approved
- Deploy: approved | not approved

### Scope

- ...

### Out Of Scope

- ...

### Acceptance Criteria

- ...

### Verification Requirements

- ...

### Constraints

- ...

### Required Response

Write an acknowledgement, progress, blocker, approval-request, or completion report to `architect-inbox.md` and reference this message ID.
```

## Open Messages

## ZORO-MSG-2026-07-23-001

- Message Status: new
- From: Kofi
- To: Zoro
- Type: review
- Architect Run: none
- Architect Task: none
- Work Key: zoro:ideas-hub-inbox-read
- Project: Zoro
- Task Status: none
- Priority: normal
- Approval: read-only
- Created: 2026-07-23

### Objective

Confirm that you can read this Ideas Hub inbox and explain how you will use it when Kofi says, "Check your Ideas Hub inbox."

### Authority

- Read repositories: approved
- Write Ideas Hub: not approved
- Modify implementation repository: not approved
- Direct main: not approved
- Merge: not approved
- Deploy: not approved

### Scope

- Read the required Ideas Hub context.
- Explain the inbox workflow.

### Out Of Scope

- Repository changes.
- Task creation.

### Acceptance Criteria

- Confirm the inbox is readable.
- List the Ideas Hub files read before project-specific processing.

### Verification Requirements

- Cite the repository files inspected.

### Constraints

- Do not modify any repository.
- Do not create branches, commits, pull requests, or tasks.
- Do not mark this message complete.

### Required Response

Respond in chat because durable Ideas Hub writing is not approved for this test.
