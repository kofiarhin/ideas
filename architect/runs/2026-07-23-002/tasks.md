# Architect Tasks — 2026-07-23-002

## Queue Summary

- **Ready:** 1
- **Running:** 0
- **Verifying:** 0
- **Completed:** 0
- **Blocked:** 0
- **Assigned to Zoro:** 1
- **Source implementation performed by Architect:** No

## 2026-07-23-002-taxify-T001 — Remediate seeded-credential handling and audit repository-visible risks

- **Work key:** `taxify:seed-credential-remediation`
- **Requirement key:** `security:seeded-credential-handling`
- **Project:** Taxify
- **Repository:** `kofiarhin/taxify`
- **Default branch:** `main`
- **Assigned to:** Zoro
- **Task type:** Security remediation and focused repository audit
- **Priority:** critical
- **Priority rationale:** The public repository currently contains a hard-coded seed fallback, logs the effective seeded credential, resets existing seeded-user passwords by default, and preserves a seeded credential value in repository-visible commit and workflow evidence.
- **Status:** `ready`
- **Originating assignment:** `ARCH-ZORO-2026-07-23-002`
- **Source documents:** Explicit approved workflow request; `projects/taxify.md`; `server/scripts/seedUsers.js`; `server/models/User.js`; authentication and role middleware/controllers; environment configuration; tracked environment examples; authentication tests; repository commit and workflow evidence
- **Source section or requirement:** Explicit Taxify reactivation security objective and acceptance criteria; previously deferred seeded-credential remediation
- **Audited implementation revision:** `ecff7e6661f5543ba7112b759d1fa69101ef3944`
- **Audited seed-script blob:** `06af0dcfc42d195f81c2185762ff29b2a9fb9957`
- **Audited user-model blob:** `22b16834c9214328ed5ef22033c514147589d2f9`
- **Evidence:** The seed script has a repository-known fallback when `SEED_PASSWORD` is absent, prints the effective seeded password, and enables existing-user password replacement unless `RESET_SEEDED_PASSWORDS` is exactly `false`. Production seeding is blocked unless explicitly enabled. The `User` pre-save hook hashes modified password fields, but focused creation/update tests are missing. The current public main commit and tracked workflow artifacts preserve a seeded credential value. No equivalent Architect task or pull request was identified.
- **Duplicate check:** Prior Architect runs contain no `taxify:seed-credential-remediation` task. Taxify pull-request searches returned no open or historical pull requests, and no equivalent remediation was found. Branch enumeration through the connector was unavailable and must be revalidated by Zoro before implementation.

### Scope

1. Read the required Ideas Hub governance, project, mailbox, and all files in Architect run `2026-07-23-002`.
2. Revalidate Taxify `main`, current branches, commits, open and merged pull requests, and equivalent work before starting.
3. Create an isolated branch from the current Taxify `main` branch.
4. Remove every hard-coded fallback seed password.
5. Require `SEED_PASSWORD` explicitly before seeded users can be created or updated.
6. Remove password and credential-value logging from the seed workflow.
7. Preserve the existing production-seeding safeguard requiring explicit production opt-in.
8. Review whether rerunning the seed can reset passwords for existing seeded users unintentionally.
9. Make existing-user password reset behavior safe by default and require an explicit configuration before any reset is allowed.
10. Review and document whether password hashing is correctly applied when seeded users are created and when an explicitly authorized password update occurs.
11. Add or update focused tests for:
    - missing `SEED_PASSWORD`;
    - production seed protection;
    - absence of credential logging;
    - safe update behavior for existing seeded users;
    - password hashing behavior when creation or explicit update is exercised, where directly required to prove the reviewed behavior.
12. Inspect tracked environment examples and directly related documentation for seed-control accuracy.
13. Document additional repository-visible credential risks by path and commit evidence without reproducing any credential value.
14. Inspect the final diff for secrets, credential values, unrelated changes, workflow changes, and accidental history-rewrite instructions.
15. Open a focused pull request into Taxify `main`.
16. Write an acknowledgement, progress, blocker, approval-request, or completion report to `architect-inbox.md`.

### Out Of Scope

- Rotating production, staging, development, or local credentials.
- Accessing deployment-provider secrets.
- Accessing MongoDB credentials or databases.
- Reading or printing untracked `.env` contents.
- Modifying GitHub Actions workflows.
- Writing directly to Taxify `main`.
- Merging.
- Deploying.
- Adding unrelated features or broad authentication refactors.
- Rewriting Git history.
- Deleting or force-updating branches.
- Claiming tests, lint, builds, CI, runtime behavior, merge, deployment, or rotation passed without executable evidence.
- Copying any repository-visible credential value into source, tests, fixtures, snapshots, logs, commits, pull-request text, or Ideas Hub reports.

### Dependencies

- Current Taxify `main` and repository evidence must remain available for revalidation.
- No merge, deployment, database, or provider-secret access is required to create the remediation pull request.
- Stop and report a blocker if equivalent work is already active, if current behavior materially differs from the audited evidence, or if safe testing requires authority outside this task.

### Authority And Approvals

- Read Ideas Hub: approved.
- Read Taxify: approved.
- Create an isolated Taxify branch: approved.
- Modify `server/scripts/seedUsers.js`: approved.
- Modify authentication-related or seed-related tests directly required by this remediation: approved.
- Modify directly related environment examples or documentation: approved.
- Open a pull request into Taxify `main`: approved.
- Write the required report to `architect-inbox.md`: approved.
- Direct Taxify `main` writes: not approved.
- Secret rotation: not approved.
- Deployment-provider secret access: not approved.
- MongoDB credential or database access: not approved.
- GitHub Actions workflow changes: not approved.
- History rewrite or force-push: not approved.
- Merge: not approved.
- Deploy: not approved.

### Acceptance Criteria

1. No fallback seed password remains.
2. Seeding fails safely when `SEED_PASSWORD` is absent.
3. No password or credential value is printed to logs.
4. Production seeding remains disabled unless explicitly enabled.
5. Existing seeded users cannot have passwords reset unintentionally without explicit configuration.
6. Password hashing behavior for seeded-user creation and authorized update is reviewed and documented with source and test evidence.
7. Focused tests are added or updated for missing `SEED_PASSWORD`, production protection, no credential logging, and safe existing-user update behavior.
8. The pull request, commit messages, changed files, tests, fixtures, snapshots, and documentation contain no secret or credential values.
9. Additional repository-visible credential risks are documented by redacted path/commit evidence without exposing values.
10. Zoro opens a focused Taxify pull request into `main` from an isolated branch.
11. Zoro reports durably to `architect-inbox.md` with:
    - originating assignment ID;
    - Architect run ID;
    - Architect task ID;
    - work key;
    - branch;
    - commit SHA;
    - pull request URL;
    - files changed;
    - verification actually performed;
    - verification not performed;
    - risks and blockers;
    - recommendation; and
    - required Architect action.

### Verification Requirements

- Re-read `server/scripts/seedUsers.js` from current Taxify `main` before editing and record the exact audited base SHA.
- Revalidate that no equivalent open, merged, or branch-based remediation already exists.
- Confirm the final seed path rejects missing `SEED_PASSWORD` before connecting to or mutating a database.
- Confirm there is no fallback credential literal or equivalent defaulting expression.
- Confirm production seeding still rejects execution unless the existing explicit opt-in is present.
- Confirm no console, logger, error, test snapshot, fixture, or report reveals the credential value.
- Confirm existing-user password changes are disabled by default and require a distinct explicit reset configuration.
- Confirm creation of a missing seeded user still hashes the provided seed password exactly once.
- Confirm an explicitly authorized existing-user password update hashes the new value exactly once and remains verifiable through the model comparison path.
- Confirm rerunning the seed without explicit reset configuration preserves an existing seeded user's password.
- Run focused Jest tests and the repository's relevant full backend test command when a real command runner is available.
- Report exact commands, exit states, and observed failures; do not claim unavailable commands passed.
- Inspect the final pull-request diff and changed-file list for unrelated modifications.
- Inspect commit and pull-request text for secret or credential values before publishing.
- Report CI only when actually observed.
- Do not claim historical exposure is removed, credentials are rotated, the pull request is merged, or the change is deployed.
- Do not mark this task completed. Architect must independently inspect the branch, commit, pull request, diff, tests, CI evidence, and redacted audit findings.

### Delivery State

- **Branch:** To be created by Zoro from current Taxify `main`
- **Commit:** Pending
- **Pull request:** Required; pending
- **Verification evidence:** Pending Zoro report and independent Architect review
- **Outcome:** Pending
- **Next authoritative transition:** `ready` remains until Zoro durably acknowledges or starts work; Architect will record later state changes only after matching and independently checking evidence.