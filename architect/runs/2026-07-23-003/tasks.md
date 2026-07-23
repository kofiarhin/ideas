# Architect Tasks — 2026-07-23-003

## Queue Summary

- **Ready:** 1
- **Running:** 0
- **Verifying:** 0
- **Completed:** 0
- **Blocked:** 0
- **Assigned to Zoro:** 1
- **Source implementation performed by Architect:** No

## 2026-07-23-003-ideas-T001 — Architect–Zoro Coordination Smoke Test

- **Task ID:** `2026-07-23-003-ideas-T001`
- **Work key:** `ideahub:architect-zoro-loop-smoke-test`
- **Requirement key:** `ideahub:architect-zoro-loop-smoke-test`
- **Duplicate of:** null
- **Supersedes:** []
- **Project:** Ideas Hub
- **Repository:** `kofiarhin/ideahub`
- **Default branch:** `main`
- **Assigned to:** Zoro
- **Task type:** Documentation-only coordination audit
- **Priority:** normal
- **Priority rationale:** This harmless audit verifies the newly established repository-backed Architect and Zoro communication, logging, feedback, verification, and completion loop.
- **Status:** `ready`
- **Originating assignment:** `ARCH-ZORO-2026-07-23-003`
- **Source documents:** Kofi's explicit request; approved Shared Understanding Handoff; `AGENT_COORDINATION.md`; `architect/INSTRUCTIONS.md`; `zoro/INSTRUCTIONS.md`; `logs/README.md`
- **Source section or requirement:** Approved end-to-end Architect–Zoro coordination smoke test
- **Approved source revision:** user approval message `looks good proceed` on 2026-07-23; repository revision not applicable
- **Audited implementation revision:** `08147c53fdac918c6d14144699bd485693aa784d`
- **Evidence:** The approved document is absent from `main`; run `2026-07-23-003`, assignment `ARCH-ZORO-2026-07-23-003`, the work key, the recommended branch, and equivalent pull requests were unused at reconciliation time.
- **Duplicate check:** Current and historical repository content, branches, commits, and open/closed pull requests revealed no equivalent active, completed, merged, or satisfied work.

### Objective

Verify that repository-backed Architect and Zoro instructions, inbox communication, repository activity logging, independent verification, feedback, and authoritative task-state transitions work correctly from assignment through verified merge and durable completion.

### Scope

#### Phase 1

- Read the required Ideas Hub governance, project, inbox, run, and operational-log sources.
- Revalidate `main`, existing branches, commits, pull requests, the target path, and equivalent work before implementation.
- Acknowledge the assignment through `architect-inbox.md` while preserving the assignment ID, run ID, task ID, and work key.
- Create isolated branch `zoro/ideahub-architect-zoro-loop-smoke-test` from the current revalidated `main` revision.
- Create only `docs/architect-zoro-loop-smoke-test.md`.
- Make the document initially contain:

```md
# Architect–Zoro Coordination Smoke Test

## Purpose

Explain that this document was created to verify the governed Architect and Zoro coordination loop.

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

- Commit the Phase 1 change.
- Open a focused pull request into `main`.
- Confirm and append permitted repository activity entries after successful branch creation, Phase 1 commit, and pull-request creation.
- Send an implementation report through `architect-inbox.md` with identifiers and evidence.

#### Phase 2

Phase 2 may begin only after Architect independently verifies Phase 1 and sends a `review-feedback` message explicitly labelled `Follow-up required`.

On the same branch and pull request, add exactly:

```md
## Limitations

This audit verifies the repository-backed instruction, communication, logging, pull-request, feedback, and verification flow. It does not prove deployment, production behavior, migration safety, or security-sensitive authority.
```

Then:

- commit the follow-up change;
- confirm and log the follow-up commit and any material pull-request update;
- report the follow-up through `architect-inbox.md`; and
- preserve all original identifiers and related message IDs.

### Out Of Scope

- Direct implementation on `main`.
- Any file other than `docs/architect-zoro-loop-smoke-test.md` on the Zoro implementation branch.
- Automatic or unapproved merge.
- Deployment or production verification.
- Migrations.
- Security-sensitive changes.
- Secrets, authentication, permissions, or repository configuration changes.
- `.github/workflows/*` changes.
- Force-pushes, history rewriting, or branch deletion.
- Architect or Zoro instruction changes.
- `PROJECTS.md`, `CONTEXT.md`, project-record, Context API, learning-log, or system-change-log updates.
- Claims that the audit proves deployment, production behavior, migration safety, or security authority.

### Dependencies

- Kofi must prompt Zoro to check its Ideas Hub inbox for Phase 1.
- Architect must independently verify Phase 1 before sending Phase 2 feedback.
- Kofi must prompt Zoro to check its inbox again for Phase 2.
- Kofi must explicitly approve merge after final Architect verification.
- GitHub branch, commit, pull-request, file, and applicable check evidence must remain accessible.

### Authority And Approvals

- Read Ideas Hub: approved.
- Create the isolated Ideas Hub branch: approved.
- Create and update only `docs/architect-zoro-loop-smoke-test.md` on that branch: approved.
- Commit and open or update the pull request: approved.
- Append permitted repository activity entries after confirmed qualifying events: approved.
- Append acknowledgements and reports to `architect-inbox.md`: approved.
- Architect may update this run and append assignment or feedback messages: approved.
- Direct-main implementation of the documentation file: not approved.
- Merge: not approved until Kofi provides a separate explicit approval after final verification.
- Deployment: not approved.
- Migration: not approved.
- Workflow-file changes: not approved.
- Security-sensitive changes: not approved.
- Unrelated edits: not approved.

### Acceptance Criteria

1. A durable Architect task exists with work key `ideahub:architect-zoro-loop-smoke-test`.
2. Architect assigns only this approved `ready` work through `zoro-inbox.md`.
3. Zoro acknowledges through `architect-inbox.md`.
4. Zoro creates an isolated branch.
5. Zoro creates the Phase 1 document.
6. Zoro confirms and logs the branch, commit, and pull-request events.
7. Zoro sends an implementation report with identifiers and evidence.
8. Architect independently inspects the branch, file, commit, pull request, and applicable logs.
9. Architect sends the controlled Phase 2 follow-up through `zoro-inbox.md`.
10. Zoro adds the Limitations section on the same branch and pull request.
11. Zoro logs and reports the follow-up commit.
12. Architect independently re-verifies the updated pull request.
13. Architect requests explicit merge approval instead of merging automatically.
14. After merge approval, the merge is verified and logged.
15. The Architect task is marked completed only after verification and required durable updates succeed.
16. Zoro never marks the authoritative Architect task completed.
17. Only the approved implementation document changes on the Zoro branch and pull request.
18. No prohibited deployment, migration, workflow, security, direct-main implementation, or unrelated change occurs.

### Verification Requirements

#### Before Zoro starts

- Confirm the current `main` revision.
- Confirm the target document remains absent.
- Confirm the recommended branch does not already exist.
- Confirm no equivalent open or merged pull request, commit, task, or work key exists.

#### Architect Phase 1 verification

- Confirm the branch exists and record its base and head.
- Confirm the reported Phase 1 commit exists on the branch.
- Confirm the pull request targets `main` and is not merged.
- Confirm the changed-file list contains only `docs/architect-zoro-loop-smoke-test.md`.
- Confirm the document contains the required title, Purpose, Flow Under Test, and Evidence sections.
- Confirm the complete arrow sequence and all ten Evidence placeholders are present.
- Confirm activity entries match GitHub evidence.
- Confirm all messages preserve run ID, task ID, work key, and related message IDs.
- Confirm Zoro did not update authoritative task state.
- Confirm no prohibited change occurred.
- Run or inspect `npm run hub:check` evidence when an actual runner or GitHub checks are available; otherwise record it as unverified.

#### Architect Phase 2 verification

- Confirm the same branch and pull request are used.
- Confirm the feedback message references the Phase 1 report and is explicitly labelled `Follow-up required`.
- Confirm the follow-up commit exists.
- Confirm the exact Limitations section was added.
- Confirm no required Phase 1 content was removed or changed improperly.
- Confirm the pull request still changes only the approved document.
- Confirm follow-up activity and report evidence match GitHub.
- Confirm the pull request remains unmerged.

#### Merge verification

- Confirm the pull-request head SHA is unchanged since final verification.
- Obtain Kofi's explicit merge approval.
- Merge only after approval.
- Confirm the pull request is merged into `main`.
- Confirm the merge commit exists.
- Confirm final `main` contains all required sections.
- Confirm merge activity matches GitHub evidence.
- Complete the task only after run, report, mailbox, and required log updates succeed.

### Delivery State

- **Branch:** To be created by Zoro: `zoro/ideahub-architect-zoro-loop-smoke-test`
- **Phase 1 commit:** Pending
- **Pull request:** Required; pending
- **Zoro acknowledgement:** Pending
- **Phase 1 report:** Pending
- **Architect Phase 1 verification:** Pending
- **Phase 2 feedback:** Pending
- **Phase 2 commit and report:** Pending
- **Architect re-verification:** Pending
- **Merge approval:** Not granted
- **Merge commit:** Pending
- **Verification evidence:** Pending Zoro reports and independent Architect inspection
- **Outcome:** Pending
- **Next authoritative transition:** Remain `ready` until Zoro acknowledgement or repository evidence supports a later Architect-recorded state.
