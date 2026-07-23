# Architect Inbox

**Last updated:** 2026-07-23

This file is the durable return channel from Zoro to Architect.

It is not a replacement for:

- `CONTEXT.md` — workspace briefing
- `PROJECTS.md` — canonical project index
- `projects/<project>.md` — durable project context
- `architect/runs/<run-id>/tasks.md` — authoritative governed task state
- `architect/runs/<run-id>/report.md` — authoritative execution and verification report

## Direction

- `zoro-inbox.md`: Kofi or Architect → Zoro
- `architect-inbox.md`: Zoro → Architect

Architect remains responsible for independently verifying Zoro evidence and updating authoritative Architect task and report state.

## Message Statuses

Use only:

- `new` — report has not been reviewed by Architect
- `acknowledged` — Architect has started reviewing it
- `responded` — Architect sent feedback through `zoro-inbox.md`
- `closed` — no further mailbox action is required

Mailbox status is not Architect task status.

## How Zoro Must Report

After processing an authorized Architect assignment, Zoro must write a progress, blocker, approval-request, or completion report here when durable feedback is required.

Each report must:

1. Reference the originating `zoro-inbox.md` message.
2. Include the Architect run ID and task ID when provided.
3. Include a stable work key when provided.
4. Separate work performed from verification actually completed.
5. List branches, commits, pull requests, CI, deployments, changed files, risks, and limits when applicable.
6. State what remains unverified.
7. Recommend the exact next action.
8. Never mark the authoritative Architect task completed.

Zoro should use an isolated branch and pull request for mailbox writes unless direct `main` authority is explicit.

## How Architect Must Process Reports

Before accepting a report, Architect must:

1. Read `AGENTS.md`, `AGENT_COORDINATION.md`, relevant project context, the originating inbox message, and applicable run files.
2. Match the report to its message ID, run ID, task ID, work key, branch, commit, and pull request.
3. Independently inspect the reported evidence.
4. Preserve the distinction between implemented, merged, deployed, verified, and completed.
5. Update `architect/runs/<run-id>/tasks.md` and `report.md` only when the active workflow permits it.
6. Send acceptance, rejection, blockers, questions, or follow-up instructions through `zoro-inbox.md`.
7. Close the mailbox report only after feedback is durable or no further action is required.

## Report Template

```md
## ZORO-ARCH-YYYY-MM-DD-NNN

- Message Status: new
- From: Zoro
- To: Architect
- Type: acknowledgement | progress-report | blocker | approval-request | completion-report
- Reply To: <zoro-inbox message ID>
- Architect Run: <run ID or none>
- Architect Task: <task ID or none>
- Work Key: <stable key or none>
- Project: <project>
- Report Status: acknowledged | running | blocked | awaiting-approval | awaiting-architect-review
- Created: YYYY-MM-DD

### Understanding

<What Zoro understood and the authority it applied>

### Work Performed

- ...

### Evidence

- Branch: ...
- Commit: ...
- Pull request: ...
- Changed files: ...
- CI/deployment evidence: ...

### Verification Actually Performed

- ...

### Verification Not Performed

- ...

### Acceptance-Criteria Assessment

- ...

### Blockers And Risks

- ...

### Recommendation

<Current recommendation>

### Required Architect Action

<Exact verification, approval, feedback, or closure action>
```

## Open Reports

No open reports.
