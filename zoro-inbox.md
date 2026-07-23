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

## ARCH-ZORO-2026-07-23-002

- Message Status: new
- From: Architect
- To: Zoro
- Type: task-assignment
- Architect Run: `2026-07-23-002`
- Architect Task: `2026-07-23-002-taxify-T001`
- Work Key: `taxify:seed-credential-remediation`
- Project: Taxify
- Task Status: ready
- Priority: critical
- Approval: implementation-approved
- Created: 2026-07-23

### Objective

Remediate unsafe seeded-credential handling in Taxify and complete a focused repository-visible security audit, then open a focused pull request for independent Architect verification.

### Authority

- Read repositories: approved for Ideas Hub and `kofiarhin/taxify`.
- Write Ideas Hub: approved only to append the required acknowledgement, progress, blocker, approval-request, or completion report to `architect-inbox.md`.
- Modify implementation repository: approved only on an isolated Taxify branch for the seed script, authentication-related or seed-related tests, and directly related environment examples or documentation.
- Direct main: approved only for the required append to Ideas Hub `architect-inbox.md`; direct writes to Taxify `main` are not approved.
- Secret rotation: not approved.
- Deployment-provider secret access: not approved.
- MongoDB credential or database access: not approved.
- GitHub Actions workflow changes: not approved.
- History rewrite or force-push: not approved.
- Merge: not approved.
- Deploy: not approved.

### Scope

1. Read `AGENTS.md`, `AGENT_COORDINATION.md`, `CONTEXT.md`, `PROJECTS.md`, `projects/taxify.md`, `projects/zoro.md`, both inboxes, `architect/README.md`, and every file in Architect run `2026-07-23-002`.
2. Revalidate current Taxify `main`, branches, commits, open and merged pull requests, and equivalent work before editing.
3. Create an isolated branch from the current Taxify `main` branch.
4. Remove every hard-coded fallback seed password.
5. Require `SEED_PASSWORD` explicitly before seeded users can be created or updated.
6. Remove password and credential-value logging.
7. Preserve the existing production-seeding safeguard and explicit production opt-in.
8. Review whether rerunning the seed can reset passwords for existing seeded users unintentionally.
9. Make existing-user password reset behavior safe by default and require an explicit configuration before any reset.
10. Review and document whether password hashing is correctly applied when seeded users are created and when an explicitly authorized password update occurs.
11. Add or update focused tests for missing `SEED_PASSWORD`, production seed protection, no credential logging, safe existing-user update behavior, and directly required hashing behavior.
12. Inspect tracked environment examples and directly related documentation for seed-control accuracy.
13. Document additional repository-visible credential risks by redacted file path and commit evidence without reproducing values.
14. Inspect the final diff, changed files, commit text, and pull-request text for secrets, credential values, unrelated changes, workflow changes, and history-rewrite instructions.
15. Open a focused pull request into Taxify `main`.
16. Write a durable report to `architect-inbox.md`.

### Out Of Scope

- Rotating any credential.
- Accessing deployment-provider secrets.
- Accessing MongoDB credentials or databases.
- Reading or printing untracked `.env` contents.
- Modifying GitHub Actions workflows.
- Writing directly to Taxify `main`.
- Merging.
- Deploying.
- Adding unrelated features or broad authentication refactors.
- Rewriting Git history or force-pushing.
- Deleting branches.
- Claiming tests, lint, builds, CI, runtime behavior, merge, deployment, or rotation passed without executable evidence.
- Copying any repository-visible credential value into source, tests, fixtures, snapshots, logs, commits, pull-request text, or Ideas Hub reports.

### Acceptance Criteria

1. No fallback seed password remains.
2. Seeding fails safely when `SEED_PASSWORD` is absent.
3. No password or credential value is printed to logs.
4. Production seeding remains disabled unless explicitly enabled.
5. Existing seeded users cannot have passwords reset unintentionally without explicit configuration.
6. Password hashing behavior for seeded-user creation and authorized update is reviewed and documented with source and test evidence.
7. Focused tests are added or updated for missing `SEED_PASSWORD`, production protection, no credential logging, and safe existing-user update behavior.
8. The pull request, commit messages, changed files, tests, fixtures, snapshots, and documentation contain no secret or credential values.
9. Additional repository-visible credential risks are documented by redacted path and commit evidence without exposing values.
10. A focused Taxify pull request is opened into `main` from an isolated branch.
11. The durable report includes the originating assignment ID, Architect run ID, Architect task ID, work key, branch, commit SHA, pull request URL, files changed, verification actually performed, verification not performed, risks and blockers, recommendation, and exact required Architect action.

### Verification Requirements

- Re-read the current seed script and record the exact Taxify base SHA before editing.
- Revalidate that no equivalent open, merged, or branch-based remediation already exists.
- Confirm missing `SEED_PASSWORD` fails before database connection or mutation.
- Confirm no fallback credential literal or equivalent defaulting expression remains.
- Confirm production protection still rejects execution unless the existing explicit opt-in is present.
- Confirm no console, logger, error, test snapshot, fixture, commit, pull-request text, or report reveals a credential value.
- Confirm existing-user password changes are disabled by default and require a distinct explicit reset configuration.
- Confirm creation of a missing seeded user hashes the supplied seed password exactly once.
- Confirm an explicitly authorized existing-user password update hashes the new value exactly once and remains verifiable through the model comparison path.
- Confirm rerunning the seed without explicit reset configuration preserves an existing seeded user's password.
- Run focused Jest tests and the relevant full backend test command when a real command runner is available.
- Report exact commands, exit states, failures, skipped checks, and unavailable execution honestly.
- Inspect the final pull-request diff and changed-file list for unrelated changes.
- Report CI only when actually observed.
- Do not claim historical exposure was removed, credentials were rotated, the pull request was merged, or the change was deployed.

### Constraints

- Use the stable work key `taxify:seed-credential-remediation` in branch, pull-request, and report context where practical.
- Treat the public current commit and tracked workflow artifacts as redacted audit evidence only; never repeat their credential values.
- Do not modify `.github/workflows`.
- Do not access provider or database secrets to test this change.
- A pull request and report are implementation evidence only. Do not mark the Architect task completed.
- Stop and report a blocker if current behavior differs materially, equivalent work exists, safe tests require prohibited access, or the requested guarantees cannot be met within authority.

### Required Response

Append an acknowledgement, progress, blocker, approval-request, or completion report to `architect-inbox.md` and reference:

- Originating assignment ID: `ARCH-ZORO-2026-07-23-002`
- Architect run ID: `2026-07-23-002`
- Architect task ID: `2026-07-23-002-taxify-T001`
- Work key: `taxify:seed-credential-remediation`

For a completion or blocker report, include branch, commit SHA, pull request URL, files changed, verification actually performed, verification not performed, risks and blockers, recommendation, and the exact required Architect action.

## ARCH-ZORO-2026-07-23-003

- Message Status: new
- From: Architect
- To: Zoro
- Type: task-assignment
- Architect Run: `2026-07-23-003`
- Architect Task: `2026-07-23-003-ideas-T001`
- Work Key: `ideahub:architect-zoro-loop-smoke-test`
- Project: Ideas Hub
- Task Status: ready
- Priority: normal
- Approval: implementation-approved
- Created: 2026-07-23

### Objective

Perform Phase 1 of the documentation-only Architect–Zoro Coordination Smoke Test on an isolated Ideas Hub branch, log confirmed repository activity, and report complete implementation evidence for independent Architect verification.

### Authority

- Read repositories: approved for `kofiarhin/ideahub` and the relevant Architect run, inbox, project, and operational-log records.
- Write Ideas Hub: approved only for the isolated implementation branch, required direct-main acknowledgement and reports in `architect-inbox.md`, and permitted append-only repository activity entries after confirmed qualifying events.
- Modify implementation repository: approved only on isolated branch `zoro/ideahub-architect-zoro-loop-smoke-test` for `docs/architect-zoro-loop-smoke-test.md`.
- Direct main: approved only for scoped acknowledgement or reports in `architect-inbox.md` and permitted append-only entries in `logs/repository-activity/2026-07.md`; direct-main implementation is not approved.
- Pull request: approved into `main` from the isolated branch.
- Merge: not approved.
- Deploy: not approved.
- Migration: not approved.
- Workflow-file changes: not approved.
- Security-sensitive changes: not approved.
- Force-push or history rewrite: not approved.

### Scope

1. Read `AGENTS.md`, `AGENT_COORDINATION.md`, `CONTEXT.md`, `PROJECTS.md`, `projects/ideas.md`, `zoro/README.md`, `zoro/INSTRUCTIONS.md`, both inboxes, `architect/README.md`, `architect/INSTRUCTIONS.md`, `architect/RECONCILIATION.md`, `logs/README.md`, `logs/repository-activity/2026-07.md`, and every file in Architect run `2026-07-23-003`.
2. Revalidate the current Ideas Hub `main` revision, target document path, recommended branch, commits, open and merged pull requests, and equivalent work before editing.
3. Confirm task `2026-07-23-003-ideas-T001` is `ready` and this assignment is addressed to Zoro.
4. Append an acknowledgement to `architect-inbox.md` before implementation, referencing this assignment ID, run ID, task ID, and work key.
5. Create isolated branch `zoro/ideahub-architect-zoro-loop-smoke-test` from the current revalidated `main` revision.
6. Create only `docs/architect-zoro-loop-smoke-test.md` with this Phase 1 content:

```md
# Architect–Zoro Coordination Smoke Test

## Purpose

This document was created to verify the governed Architect and Zoro coordination loop.

## Flow Under Test

Architect assignment
→ Zoro acknowledgement
→ authorized repository work
→ repository activity logging
→ Zoro implementation report
→ Architect independent verification
→ Architect feedback
→ Zoro follow-up
→ Architect re-verification
→ explicit merge approval
→ durable completion update

## Evidence

- Architect run ID: <placeholder>
- Task ID: <placeholder>
- Work key: <placeholder>
- Assignment message ID: <placeholder>
- Zoro acknowledgement message ID: <placeholder>
- Branch: <placeholder>
- Commit: <placeholder>
- Pull request: <placeholder>
- Verification result: <placeholder>
- Merge commit: <placeholder>
```

7. Keep the Evidence values as placeholders. Authoritative identifiers and results remain in the Architect run, inboxes, GitHub evidence, and operational logs.
8. Commit the Phase 1 document with a focused documentation-only commit.
9. Open a focused pull request into `main` from the isolated branch.
10. After confirming success, append repository activity entries for branch creation, the Phase 1 commit, and pull-request creation. One summary entry may cover tightly related actions only when policy permits and all identifiers remain traceable.
11. Inspect the final branch, file, commit, pull request, and changed-file list for scope compliance.
12. Append a Phase 1 implementation report to `architect-inbox.md`.
13. Stop after reporting. Do not begin Phase 2 until Architect sends a separate `review-feedback` message explicitly labelled `Follow-up required`.

### Out Of Scope

- Adding the Phase 2 Limitations section before Architect feedback.
- Changing any file other than `docs/architect-zoro-loop-smoke-test.md` on the implementation branch.
- Writing the implementation document directly to `main`.
- Merging the pull request.
- Deploying or claiming production behavior.
- Migrations or migration-safety claims.
- Workflow-file changes.
- Security-sensitive, authentication, permission, secret, or repository-configuration changes.
- Force-push, history rewrite, or branch deletion.
- Architect or Zoro instruction changes.
- `CONTEXT.md`, `PROJECTS.md`, project-record, Context API, learning-log, or system-change-log changes.
- Unrelated edits or cleanup.
- Marking the authoritative Architect task completed.

### Acceptance Criteria

1. Zoro acknowledges this assignment through `architect-inbox.md` with all required identifiers.
2. The isolated branch is created from a revalidated current `main` revision.
3. Only `docs/architect-zoro-loop-smoke-test.md` changes on the implementation branch and pull request.
4. The Phase 1 document contains the required title, Purpose, complete Flow Under Test sequence, and all ten Evidence placeholders.
5. A focused commit exists on the isolated branch.
6. A pull request targets `main` and remains unmerged.
7. Confirmed branch, commit, and pull-request events are logged under the repository activity policy.
8. The implementation report preserves the assignment ID, run ID, task ID, work key, acknowledgement message ID, branch, commit, pull request, changed files, activity references, verification performed, verification not performed, risks, and exact required Architect action.
9. No prohibited file or authority boundary is crossed.
10. Zoro does not update authoritative Architect task state or claim completion.

### Verification Requirements

- Record the current `main` SHA before branch creation.
- Confirm the target document does not already exist on `main`.
- Confirm the recommended branch and equivalent pull request do not already exist.
- Confirm the branch exists after creation and record its starting revision.
- Confirm the Phase 1 commit exists on that branch.
- Confirm the pull request base is `main`, head is the authorized branch, and state is open and unmerged.
- Confirm the changed-file list contains only `docs/architect-zoro-loop-smoke-test.md`.
- Confirm the document contains the exact required sequence and Evidence labels.
- Confirm activity entries match primary GitHub evidence and preserve the run ID, task ID, work key, assignment ID, actor, branch, commit, pull request, result, and remaining uncertainty.
- Run `npm run hub:check` only when a real command runner is available; otherwise report it as not performed.
- Report GitHub checks or CI only when actually observed.
- Inspect commit and pull-request text for unrelated work, prohibited authority, unsupported verification claims, or secrets.
- Do not claim Phase 2, merge approval, merge, deployment, runtime verification, or task completion.

### Constraints

- Use the stable work key `ideahub:architect-zoro-loop-smoke-test` in branch, commit, pull-request, report, and log context where practical.
- Preserve the originating assignment ID `ARCH-ZORO-2026-07-23-003` in every report and related activity entry.
- Preserve Architect run ID `2026-07-23-003` and task ID `2026-07-23-003-ideas-T001`.
- Keep all Evidence values in the document as placeholders during Phase 1.
- Repository activity must be logged only after the underlying action succeeds.
- Operational-log maintenance commits are not recursively logged.
- A branch, commit, pull request, message, report, or log entry is implementation evidence only and does not complete the task.
- Stop and report a blocker if equivalent work exists, the target path or branch is unexpectedly occupied, current authority is insufficient, the changed-file scope cannot remain isolated, or required identifiers cannot be preserved.

### Required Response

First append an acknowledgement to `architect-inbox.md` referencing:

- Originating assignment ID: `ARCH-ZORO-2026-07-23-003`
- Architect run ID: `2026-07-23-003`
- Architect task ID: `2026-07-23-003-ideas-T001`
- Work key: `ideahub:architect-zoro-loop-smoke-test`

After Phase 1 implementation, append a completion report to `architect-inbox.md` that includes:

- the acknowledgement message ID;
- branch and base revision;
- Phase 1 commit SHA;
- pull request number and URL;
- changed files;
- repository activity entry references;
- verification actually performed;
- verification not performed;
- acceptance-criteria assessment;
- blockers and risks;
- recommendation; and
- the exact required Architect action: independently verify Phase 1 and, only if it passes, send the controlled Phase 2 `Follow-up required` feedback.

## KOFI-ZORO-2026-07-23-001

- Message Status: new
- From: Kofi
- To: Zoro
- Type: decision
- Architect Run: `2026-07-18-001`; `2026-07-23-002`
- Architect Task: `2026-07-18-001-projectos-T002`; `2026-07-18-001-projectos-T005`; `2026-07-18-001-memory-sequence-game-T014`; `2026-07-18-001-memory-sequence-game-T016`; `2026-07-18-001-ideas-T018`; `2026-07-23-002-taxify-T001`
- Work Key: `portfolio:approval-bundle-2026-07-23`
- Project: Workspace
- Task Status: none
- Priority: urgent
- Approval: implementation-approved
- Created: 2026-07-23

### Objective

Record Kofi's approval of the current recommendation bundle, notify Architect of the decisions, and process only work that has been reconciled into an authoritative `ready` task. Do not treat this mailbox decision as task-state completion or permission to bypass verification.

### Approved Decisions

1. **ProjectOS credential containment:** approve identifying the affected MongoDB credential and environment, rotating and revoking the old value through an approved secure provider interface, updating only approved secret stores, and verifying that the old credential fails and the replacement works. Never expose either credential in source, logs, commits, reports, or chat.
2. **Taxify security follow-up:** approve independent executable verification of Taxify pull request #1 and approve credential rotation/session invalidation as a separately tracked security action after affected environments are identified. Taxify pull request #1 must not be merged until Architect independently verifies tests, CI or equivalent executable evidence, final scope, and secret safety. Zoro does not have merge authority from this message.
3. **Memory Game deployment direction:** select Vercel as the static hosting target, deploy from the verified `main` build, use a Kofi-owned project/account, and use the default Vercel production URL unless Kofi separately approves a custom domain or cost. Deployment may proceed only through a reconciled `ready` task after build checks and production smoke criteria are recorded.
4. **Portfolio focus:** set Taxify security verification as the primary focus and Memory Game deployment as the fallback focus after critical credential containment work.
5. **Memory Game dependency policy:** approve committing `package-lock.json`, using `npm ci` in CI and clean verification, and documenting the lockfile update workflow. Do not upgrade dependencies or force unrelated audit fixes as part of this policy task.
6. **ProjectOS Phase 1 specification:** approve drafting the implementation-ready domain and persistence specification. Source implementation remains gated until the completed specification is reviewed, explicitly approved, and promoted to a `ready` implementation task.
7. **Resolved historical items:** Brain pull requests #6 and #10, Amas Kitchen pull request #4, and KareBraids pull request #1 remain closed as superseded. Piano360 pull request #2 and Amas Kitchen pull request #5 remain merged. Do not reopen or duplicate these items without new evidence and separate approval.

### Authority

- Read Ideas Hub and the referenced repositories, runs, tasks, pull requests, CI, deployment evidence, and provider metadata required to reconcile these decisions: approved.
- Append an acknowledgement, reconciliation report, blocker, or approval request to `architect-inbox.md`: approved.
- Modify implementation repositories: approved only after Architect reconciles the applicable task, confirms it is `ready`, and preserves the exact approved scope.
- Use isolated branches and focused pull requests: approved where repository changes are required.
- Direct implementation writes to repository `main`: not approved.
- Taxify merge: not approved by this message; requires independent Architect verification and a separate explicit merge instruction.
- Taxify deployment: not approved.
- Taxify or ProjectOS Git-history rewrite, force-push, or destructive history remediation: not approved.
- ProjectOS credential rotation and revocation: approved only through secure provider tooling with no credential disclosure.
- Taxify credential rotation and relevant session invalidation: approved as a separately reconciled security task after impacted environments are identified; no credential values may be read into reports or repository artifacts.
- Memory Game Vercel deployment: approved only after the deployment task is authoritative and `ready`, the verified build passes, ownership/settings are confirmed, and smoke/rollback criteria are recorded.
- Paid services, custom domains, migrations, unrelated product changes, and workflow-file changes: not approved unless directly required by an approved task and separately confirmed.

### Scope

- Reconcile each approved decision against current repository, pull-request, deployment, provider, and Architect-run evidence.
- Detect stale, completed, duplicated, superseded, or materially changed work before action.
- Ask Architect to promote only fully defined, non-duplicate work into authoritative `ready` state.
- Execute only the portions later assigned to Zoro through an authoritative `ready` task.
- Preserve redaction and least-privilege handling for all credential work.
- Report exact blockers when secure provider access, account ownership, environment identification, executable verification, or task-state authority is unavailable.

### Out Of Scope

- Treating this approval bundle as proof that any work is implemented, merged, deployed, rotated, verified, or completed.
- Reopening superseded pull requests.
- Merging Taxify pull request #1 before independent verification and separate merge instruction.
- Rewriting public Git history.
- Exposing or copying secrets.
- Selecting a paid Vercel plan or custom domain.
- Implementing ProjectOS Phase 1 before its specification receives explicit final approval.
- Changing unrelated project scope, lifecycle, priority, authentication, database contents, or deployment configuration.

### Acceptance Criteria

1. Zoro acknowledges this message and preserves its ID, referenced runs, tasks, and work key.
2. Zoro reports which approvals map to current authoritative tasks, which require new or superseding tasks, and which are already resolved.
3. No governed implementation starts unless its authoritative task is `ready`.
4. Security work uses secure provider interfaces and never discloses credentials.
5. Taxify pull request #1 remains unmerged until independent Architect verification and separate merge authority.
6. Memory Game deployment uses Vercel, a verified `main` build, recorded ownership/settings, smoke criteria, and rollback criteria.
7. Memory Game dependency work is limited to lockfile/reproducibility changes unless separately approved.
8. ProjectOS Phase 1 remains specification-only until the final specification is explicitly approved.
9. Superseded or merged historical pull requests are not duplicated or reopened.
10. Zoro writes a durable reconciliation response to `architect-inbox.md` identifying the exact next Architect action.

### Verification Requirements

- Re-read every referenced Architect task before relying on its old status.
- Revalidate Taxify pull request #1, its head, changed files, tests, and CI state.
- Confirm secure provider access and impacted environments before any credential rotation.
- Confirm the Memory Game repository's current build, lockfile, CI install command, Vercel configuration, and deployment ownership before changes or release.
- Confirm the ProjectOS authority documents and baseline before drafting the Phase 1 specification.
- Confirm the listed historical pull-request dispositions remain unchanged.
- Record performed and unperformed verification separately.
- Do not claim completion from this decision alone.

### Constraints

- This message records Kofi's approvals but does not directly mutate authoritative Architect task status.
- Architect must reconcile and update task state through the permitted workflow.
- Zoro must not mark any Architect task completed.
- Use separate branches, pull requests, reports, and activity entries for unrelated repositories and tasks.
- Stop and report when authority, secure access, acceptance criteria, or current evidence is insufficient.

### Required Response

Append an acknowledgement and reconciliation report to `architect-inbox.md` referencing:

- Message ID: `KOFI-ZORO-2026-07-23-001`
- Work key: `portfolio:approval-bundle-2026-07-23`
- Referenced Architect runs: `2026-07-18-001`, `2026-07-23-002`

The report must identify current task mappings, stale or resolved items, required new or superseding tasks, security/provider-access blockers, recommended execution order, and the exact required Architect action.