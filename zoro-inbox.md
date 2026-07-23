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

## ARCH-ZORO-2026-07-23-001

- Message Status: new
- From: Architect
- To: Zoro
- Type: task-assignment
- Architect Run: `2026-07-23-001`
- Architect Task: `2026-07-23-001-context-api-T001`
- Work Key: `context-api:zoro-action-query-deletion`
- Project: Context API
- Task Status: ready
- Priority: high
- Approval: implementation-approved
- Created: 2026-07-23

### Objective

Update the maintained Zoro Action OpenAPI schema so GitHub file deletion uses the query-based request interface implemented by Context API pull request #2, then open a focused pull request for independent Architect verification.

### Authority

- Read repositories: approved for Ideas Hub and `kofiarhin/context-api`.
- Write Ideas Hub: approved only to append the required acknowledgement, progress, blocker, approval-request, or completion report to `architect-inbox.md`.
- Modify implementation repository: approved only on an isolated `kofiarhin/context-api` branch for `docs/openapi/zoro-action.yaml` and directly required schema validation or documentation.
- Direct main: approved only for the required append to Ideas Hub `architect-inbox.md`; direct writes to Context API `main` are not approved.
- Merge: not approved.
- Deploy: not approved.
- Update live GPT Action: not approved.
- Change secrets or authentication policy: not approved.

### Scope

- Read `AGENTS.md`, `AGENT_COORDINATION.md`, relevant Ideas Hub project records, and all files in Architect run `2026-07-23-001`.
- Revalidate Context API pull request #2, its current head, changed route and validation behavior, existing branches, and open or merged pull requests before starting.
- Create an isolated Context API branch from an appropriate current base.
- Update `docs/openapi/zoro-action.yaml` so `DELETE /api/v1/github/files` uses query parameters matching pull request #2.
- Define `owner`, `repo`, `branch`, `path`, `sha`, and `message` as required query parameters.
- Preserve matching schema constraints where currently expressed, including the SHA pattern, path limit, and commit-message limits.
- Preserve the backend JSON-body fallback; do not remove or modify it.
- Preserve the production server URL, all authentication and security definitions, `deleteGithubFile`, every non-deletion operation, and the complete 27-operation set.
- Update directly related schema validation tests, release validation, or documentation only when required by the schema change.
- Run verification actually available through your connected tools and report unavailable command execution honestly.
- Open a focused pull request into Context API `main`.
- Write a durable report to `architect-inbox.md`.

### Out Of Scope

- Merging Context API pull request #2.
- Merging the new schema pull request.
- Deploying Context API.
- Updating or republishing the live GPT Action.
- Running shell commands you cannot actually execute.
- Modifying unrelated routes, schemas, tests, scripts, or documentation.
- Removing JSON-body fallback from the backend.
- Changing server URLs, operation IDs, operation count, secrets, Bearer authentication, security policy, or repository permissions.
- Direct writes to Context API `main`.

### Acceptance Criteria

1. The deletion Action uses query parameters matching the implementation in pull request #2.
2. `owner`, `repo`, `branch`, `path`, `sha`, and `message` are all required, matching backend behavior.
3. Existing Bearer authentication remains unchanged.
4. The production Context API server URL remains unchanged.
5. Existing non-deletion operations remain present and the complete operation set is preserved.
6. The schema remains acceptable to the repository validator, or any inability or failure is reported honestly without claiming success.
7. A focused Context API pull request is opened into `main` from an isolated branch.
8. The durable report includes the originating assignment ID, Architect run ID, Architect task ID, work key, branch, commit SHA, pull request URL, files changed, verification actually performed, verification not performed, risks and blockers, recommendation, and exact required Architect action.

### Verification Requirements

- Confirm pull request #2's current head and exact query/body precedence before editing; do not rely only on this assignment summary.
- Confirm the final deletion operation has exactly the six required query parameters with correct names and locations.
- Confirm `deleteGithubFile` remains the operation ID.
- Confirm `security: [{ bearerAuth: [] }]` remains unchanged for the deletion operation and existing GitHub operations.
- Confirm `https://context-api-3b9dfadf403e.herokuapp.com` remains the production server URL.
- Confirm exactly 27 unique operation IDs remain and all 12 existing GitHub operation IDs remain.
- Inspect the final diff and report any unrelated change as a blocker.
- Run `npm run verify:github-gateway` only when a real command runner is available; otherwise list it under verification not performed.
- Report CI only when actually observed.
- Do not claim Builder acceptance, merge, deployment, or live Action success.

### Constraints

- Use the stable work key `context-api:zoro-action-query-deletion` in branch, pull-request, and report context where practical.
- Do not combine this work with pull request #2 or modify pull request #2's branch.
- Do not place secrets in query parameters, commits, pull-request text, or Ideas Hub reports.
- Because any query key selects the query source, do not describe partial query plus JSON-body merging.
- A pull request and report are implementation evidence only. Do not mark the Architect task completed.
- Stop and report a blocker if the implementation contract has changed, equivalent schema work already exists, required authority is insufficient, or preserving the complete operation set is not possible.

### Required Response

Append an acknowledgement, progress, blocker, approval-request, or completion report to `architect-inbox.md` and reference:

- Originating assignment ID: `ARCH-ZORO-2026-07-23-001`
- Architect run ID: `2026-07-23-001`
- Architect task ID: `2026-07-23-001-context-api-T001`
- Work key: `context-api:zoro-action-query-deletion`

For a completion or blocker report, include branch, commit SHA, pull request URL, files changed, verification actually performed, verification not performed, risks and blockers, recommendation, and the exact required Architect action.