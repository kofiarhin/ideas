# Architect Task Queue — 2026-07-18-001

## Run Metadata

- **Run ID:** `2026-07-18-001`
- **Source audit:** `architect/runs/2026-07-18-001/audit.md`
- **Queue status:** Audit complete; execution not started
- **Source fingerprint:** `sha256:ea3eef8ad0f64bf5a8efed15a70c332a03589e6a1c662bdae5c00da9d635de52`
- **Generated tasks:** 24
- **Ready:** 4
- **Needs discovery/specification/approval/unblocking:** 20

## 2026-07-18-001-taxify-T001 — Contain exposed seeded credentials

- **Project:** Taxify
- **Repository:** `kofiarhin/taxify`
- **Task type:** Security incident
- **Priority:** P0
- **Priority rationale:** Public credential exposure is the highest-ranked portfolio risk.
- **Status:** needs_approval
- **Source document:** Audit F-001
- **Source section or requirement:** Credential hygiene and seed-user safety
- **Audited revision:** `ecff7e6661f5543ba7112b759d1fa69101ef3944`
- **Evidence:** Public commit metadata exposes a seeded administrator credential; seed logic has a predictable fallback and logs the effective password.
- **Scope:** Identify affected environments, rotate credentials, invalidate sessions/tokens, remove fallback/password logging, and assess history remediation.
- **Out of scope:** Unrelated authentication refactors.
- **Dependencies:** Access to hosting, database, identity/session controls, and repository history policy.
- **Required approval:** Explicit security and any history-rewrite approval.
- **Acceptance criteria:** Compromised values are invalid; affected environments are confirmed; unsafe seed behavior is removed; remediation evidence is recorded.
- **Verification required:** Login/session checks, seed tests, secret scan, and provider-side invalidation evidence.
- **Branch:** TBD after approval
- **Pull request:** —
- **Verification evidence:** —
- **Outcome:** —

## 2026-07-18-001-projectos-T002 — Rotate potentially exposed MongoDB credentials

- **Project:** ProjectOS
- **Repository:** `kofiarhin/projectos`
- **Task type:** Security incident
- **Priority:** P0
- **Priority rationale:** A documented database credential exposure remains uncontained.
- **Status:** needs_approval
- **Source document:** Audit F-002; `projects/projectos.md`
- **Source section or requirement:** Credential rotation risk
- **Audited revision:** `583f005d33649d033622bf037256fd0499e7040c`
- **Evidence:** Ideas Hub records MongoDB credentials previously visible in a screenshot and needing rotation.
- **Scope:** Locate the credential/provider, rotate it, update local configuration, invalidate the old value, and verify redaction/connectivity.
- **Out of scope:** Database schema changes.
- **Dependencies:** Credential-provider access and confirmation of affected environment.
- **Required approval:** Explicit security approval.
- **Acceptance criteria:** Old credential is invalid; replacement works; no secret remains in tracked artifacts.
- **Verification required:** Provider evidence, connection test, and repository/history secret scan.
- **Branch:** TBD after approval
- **Pull request:** —
- **Verification evidence:** —
- **Outcome:** —

## 2026-07-18-001-projectos-T003 — Independently verify Phase 0 closure

- **Project:** ProjectOS
- **Repository:** `kofiarhin/projectos`
- **Task type:** Verification
- **Priority:** P1
- **Priority rationale:** Verification closes an approved phase and unblocks truthful context maintenance.
- **Status:** ready
- **Source document:** Audit F-003; repository Phase 0 summary
- **Source section or requirement:** Phase 0 completion checks
- **Audited revision:** `583f005d33649d033622bf037256fd0499e7040c`
- **Evidence:** Repository reports Phase 0 finalized; connector did not independently execute the clean-checkout matrix.
- **Scope:** Run clean install, lint, typecheck, tests, build, CLI smoke checks, and clean-tree verification.
- **Out of scope:** Phase 1 implementation.
- **Dependencies:** Repository checkout and supported runtime/toolchain.
- **Required approval:** None beyond `run all tasks` execution authority.
- **Acceptance criteria:** All documented Phase 0 checks pass from a clean checkout and the worktree remains clean.
- **Verification required:** Command outputs, versions, commit SHA, and clean-tree evidence.
- **Branch:** Verification-only; no branch unless fixes become necessary
- **Pull request:** —
- **Verification evidence:** —
- **Outcome:** —

## 2026-07-18-001-projectos-T004 — Update Ideas Hub after verified Phase 0 closure

- **Project:** ProjectOS
- **Repository:** `kofiarhin/ideas`
- **Task type:** Context maintenance
- **Priority:** P1
- **Priority rationale:** Confirmed implementation/documentation drift should be corrected after verification.
- **Status:** blocked
- **Source document:** Audit F-003
- **Source section or requirement:** Ideas Hub state drift
- **Audited revision:** `projects/projectos.md@5653636820b2d200d207e8b71bef1863f4c02bcc`
- **Evidence:** Hub still describes Phase 0 closure work as pending.
- **Scope:** Update `projects/projectos.md` with verified status, evidence, remaining risks, and next action.
- **Out of scope:** Changing project direction or approving Phase 1 details.
- **Dependencies:** T003 completed successfully.
- **Required approval:** Covered by verified `run all tasks` context-maintenance scope.
- **Acceptance criteria:** Project record accurately reflects verified Phase 0 completion without overstating CI or security status.
- **Verification required:** Diff review against T003 evidence.
- **Branch:** Ideas Hub task branch
- **Pull request:** —
- **Verification evidence:** —
- **Outcome:** —

## 2026-07-18-001-projectos-T005 — Specify Phase 1 domain and persistence contracts

- **Project:** ProjectOS
- **Repository:** `kofiarhin/projectos`
- **Task type:** Specification
- **Priority:** P1
- **Priority rationale:** Phase 1 is next but unsafe to implement without detailed contracts.
- **Status:** needs_spec
- **Source document:** Audit F-004; approved implementation plan
- **Source section or requirement:** Phase 1 Domain and Persistence
- **Audited revision:** `583f005d33649d033622bf037256fd0499e7040c`
- **Evidence:** Models, states, indexes, migration/seed behavior, and test matrix are not implementation-ready.
- **Scope:** Define fields, enums, transitions, validation, indexes, repositories/services, activity logging, migrations/seeds, and tests.
- **Out of scope:** Writing production models before approval.
- **Dependencies:** T003 and resolution of T002 security risk.
- **Required approval:** Specification approval required.
- **Acceptance criteria:** A complete, reviewable Phase 1 specification maps every planned deliverable to testable criteria.
- **Verification required:** Authority-order review and acceptance-criteria coverage.
- **Branch:** Documentation branch after approval
- **Pull request:** —
- **Verification evidence:** —
- **Outcome:** —

## 2026-07-18-001-brain-T006 — Verify Brain PR #9 against current main

- **Project:** Brain
- **Repository:** `kofiarhin/brain`
- **Task type:** PR verification
- **Priority:** P1
- **Priority rationale:** Mergeable fixes remain unverified and address observable UI/state defects.
- **Status:** ready
- **Source document:** Audit F-005
- **Source section or requirement:** Structured list rendering and Dashboard states/timezone
- **Audited revision:** main `c86d02828cae92943460f8124d2eb7ddddaac767`; PR #9 `9d0f97658a7bfb440f2781c1476c20002785e605`
- **Evidence:** PR #9 is mergeable, but its test suite was not executed by the author.
- **Scope:** Rebase/test the PR against current main and document whether all changes remain necessary.
- **Out of scope:** Merging without approval or unrelated Brain refactors.
- **Dependencies:** Repository checkout.
- **Required approval:** Merge remains approval-gated.
- **Acceptance criteria:** Tests, lint, typecheck, and build pass; patch is reconciled against main; merge recommendation is evidence-backed.
- **Verification required:** Full relevant test/build matrix and diff review.
- **Branch:** Existing PR branch or isolated verification branch
- **Pull request:** #9
- **Verification evidence:** —
- **Outcome:** —

## 2026-07-18-001-brain-T007 — Reconcile Brain PR #10 with current implementation

- **Project:** Brain
- **Repository:** `kofiarhin/brain`
- **Task type:** PR reconciliation
- **Priority:** P1
- **Priority rationale:** Conflicted and partially superseded work creates integration risk.
- **Status:** needs_approval
- **Source document:** Audit F-005
- **Source section or requirement:** Authenticated read-only chat
- **Audited revision:** main `c86d02828cae92943460f8124d2eb7ddddaac767`; PR #10 `d37af0fdd831a8f488fc0818e4141c0f3f989acf`
- **Evidence:** Main already contains chat and later fallback/landing work; PR #10 is conflicted.
- **Scope:** Decide close-as-superseded versus selectively port missing behavior.
- **Out of scope:** Blind conflict resolution or wholesale replacement of newer main behavior.
- **Dependencies:** Product/implementation decision.
- **Required approval:** Explicit keep/port/close approval.
- **Acceptance criteria:** A documented decision identifies retained, superseded, and missing changes.
- **Verification required:** Patch-to-main comparison and targeted tests for retained behavior.
- **Branch:** TBD
- **Pull request:** #10
- **Verification evidence:** —
- **Outcome:** —

## 2026-07-18-001-brain-T008 — Decide Brain authority-file refactor in PR #6

- **Project:** Brain
- **Repository:** `kofiarhin/brain`
- **Task type:** Authority-document decision
- **Priority:** P2
- **Priority rationale:** Conflicted authority-file changes must not be merged without confirming governance intent.
- **Status:** needs_approval
- **Source document:** Audit F-005
- **Source section or requirement:** Modular `AGENTS.md` refactor
- **Audited revision:** PR #6 `4216e84b316ef5a8e2dcdc1ed03402321c5be4f2`
- **Evidence:** PR is conflicted and changes repository authority structure.
- **Scope:** Decide whether the modular authority structure is still desired; refresh or close accordingly.
- **Out of scope:** Silent authority-order changes.
- **Dependencies:** User governance decision.
- **Required approval:** Explicit authority-document approval.
- **Acceptance criteria:** Desired authority structure and disposition of PR #6 are documented.
- **Verification required:** Check instruction consistency and absence of conflicting authority.
- **Branch:** TBD
- **Pull request:** #6
- **Verification evidence:** —
- **Outcome:** —

## 2026-07-18-001-piano360-T009 — Review and decide Guided Learning PR #2

- **Project:** Piano360
- **Repository:** `kofiarhin/piano360`
- **Task type:** Approval gate
- **Priority:** P1
- **Priority rationale:** The specification and phased plan must become authority before planned implementation proceeds.
- **Status:** needs_approval
- **Source document:** Audit F-006
- **Source section or requirement:** Guided Learning Mode specification and plan
- **Audited revision:** main `7b70fed89d95f869e90a110d2a8fa7a527ee4509`; PR #2 `2a481dd4120b13c394b1fbaf51cacf11a84531e7`
- **Evidence:** PR #2 is mergeable and adds the specification/plan; main already has recent guided press-only work.
- **Scope:** Review authority documents and approve/merge, revise, or reject them.
- **Out of scope:** Implementing later phases before authority approval.
- **Dependencies:** Human review.
- **Required approval:** Explicit PR/specification approval.
- **Acceptance criteria:** PR disposition is recorded and authoritative scope is unambiguous.
- **Verification required:** Compare documents with current implementation and project goals.
- **Branch:** Existing PR branch
- **Pull request:** #2
- **Verification evidence:** —
- **Outcome:** —

## 2026-07-18-001-piano360-T010 — Execute Guided Learning Phase 0 audit

- **Project:** Piano360
- **Repository:** `kofiarhin/piano360`
- **Task type:** Verification/audit
- **Priority:** P2
- **Priority rationale:** The approved plan requires a baseline audit before further implementation.
- **Status:** blocked
- **Source document:** Guided Learning plan in PR #2
- **Source section or requirement:** Phase 0 audit
- **Audited revision:** PR #2 `2a481dd4120b13c394b1fbaf51cacf11a84531e7`
- **Evidence:** Plan is not yet repository authority.
- **Scope:** Perform the plan-defined baseline audit and record gaps.
- **Out of scope:** Feature implementation beyond Phase 0.
- **Dependencies:** T009 approved and merged.
- **Required approval:** None after authority approval unless new scope emerges.
- **Acceptance criteria:** Every Phase 0 criterion is assessed with repository evidence.
- **Verification required:** Tests, typecheck, build, and documented manual checks required by the plan.
- **Branch:** Audit branch if artifacts change
- **Pull request:** —
- **Verification evidence:** —
- **Outcome:** —

## 2026-07-18-001-piano360-T011 — Refresh Piano360 project context after authority decision

- **Project:** Piano360
- **Repository:** `kofiarhin/ideas`
- **Task type:** Context maintenance
- **Priority:** P3
- **Priority rationale:** Hub current focus is stale relative to confirmed guided-learning work.
- **Status:** blocked
- **Source document:** Audit F-006
- **Source section or requirement:** Current focus and milestone
- **Audited revision:** `projects/piano360.md@f4d0a0e1006cef1564fb44a55b1de37efbbc5c68`
- **Evidence:** Hub says focus and milestone are undocumented while PR #2 documents active work.
- **Scope:** Record only approved focus, milestone, authority links, and next action.
- **Out of scope:** Inferring lifecycle or priority.
- **Dependencies:** T009 completed; T010 findings if available.
- **Required approval:** Verified context-maintenance scope.
- **Acceptance criteria:** Project record matches approved authority and current implementation evidence.
- **Verification required:** Cross-check against merged docs and repository head.
- **Branch:** Ideas Hub task branch
- **Pull request:** —
- **Verification evidence:** —
- **Outcome:** —

## 2026-07-18-001-amas-kitchen-T012 — Resolve competing design PR direction

- **Project:** Amas Kitchen
- **Repository:** `kofiarhin/amas-kitchen`
- **Task type:** Product/design approval
- **Priority:** P2
- **Priority rationale:** Competing artifacts and an explicit human gate block safe implementation.
- **Status:** needs_approval
- **Source document:** Audit F-007
- **Source section or requirement:** Homepage direction and inspiration shortlist
- **Audited revision:** main `661212ec1be589084d9cbaaaec4fcf1bb64ace08`; PR #4 `54575d311cf9f82fdc1ff73b7dc4d02b409bdded`; PR #5 `c2380041cc3c152f6080fa5023a3aeeb030d3cee`
- **Evidence:** PR #4 is conflicted and requests decisions; PR #5 is mergeable but untested and separate.
- **Scope:** Choose consolidate, supersede, continue, or close each PR; resolve assets, CTA, delivery language, and tone.
- **Out of scope:** Implementing a guessed visual direction.
- **Dependencies:** Human product/design decisions.
- **Required approval:** Explicit product/design and PR disposition approval.
- **Acceptance criteria:** One coherent approved direction and explicit disposition for both PRs.
- **Verification required:** Design/content review and tests for any retained implementation.
- **Branch:** TBD
- **Pull request:** #4 and #5
- **Verification evidence:** —
- **Outcome:** —

## 2026-07-18-001-amas-kitchen-T013 — Verify retained Amas Kitchen PR changes

- **Project:** Amas Kitchen
- **Repository:** `kofiarhin/amas-kitchen`
- **Task type:** PR verification
- **Priority:** P2
- **Priority rationale:** Retained design work must be tested against current main before integration.
- **Status:** blocked
- **Source document:** Audit F-007
- **Source section or requirement:** Selected homepage/design behavior
- **Audited revision:** Same as T012
- **Evidence:** PR #5 lacks local test evidence; PR #4 is conflicted.
- **Scope:** Rebase and verify only the changes approved in T012.
- **Out of scope:** Adding unapproved design scope.
- **Dependencies:** T012 completed.
- **Required approval:** Merge remains approval-gated.
- **Acceptance criteria:** Approved changes pass tests, lint, typecheck, build, and visual/content checks.
- **Verification required:** Automated suite plus responsive/manual review.
- **Branch:** Existing or isolated reconciliation branch
- **Pull request:** #4 or #5 as selected
- **Verification evidence:** —
- **Outcome:** —

## 2026-07-18-001-amas-kitchen-T014 — Document confirmed Amas Kitchen context

- **Project:** Amas Kitchen
- **Repository:** `kofiarhin/ideas`
- **Task type:** Context maintenance
- **Priority:** P3
- **Priority rationale:** Hub says details are unknown despite confirmed repository evidence.
- **Status:** blocked
- **Source document:** Audit F-007
- **Source section or requirement:** Product context drift
- **Audited revision:** `projects/amas-kitchen.md@a4eee301239c671f547c2ab9a60d367894842e22`
- **Evidence:** Repository evidence identifies a premium Ghanaian kitchen and ordering/delivery experience.
- **Scope:** Record only confirmed product context, approved direction, repository status, and next action.
- **Out of scope:** Inventing lifecycle, priority, or unsupported business claims.
- **Dependencies:** T012 and retained-work verification.
- **Required approval:** Verified context-maintenance scope.
- **Acceptance criteria:** Hub reflects confirmed facts and decisions with links and no speculative promotion.
- **Verification required:** Evidence-to-note traceability review.
- **Branch:** Ideas Hub task branch
- **Pull request:** —
- **Verification evidence:** —
- **Outcome:** —

## 2026-07-18-001-karebraids-T015 — Decide disposition of stale redesign PR #1

- **Project:** KareBraids
- **Repository:** `kofiarhin/karebraids`
- **Task type:** Product/design approval
- **Priority:** P2
- **Priority rationale:** A conflicted site-wide redesign cannot be safely refreshed without current visual direction.
- **Status:** needs_approval
- **Source document:** Audit F-008
- **Source section or requirement:** Dark salon redesign
- **Audited revision:** main `3e0869f54d4de775e5ed11ac3cf62eb26252ab31`; PR #1 `bdd8eaa75e3ede1627986717ebef9d276dd79e06`
- **Evidence:** PR predates later image-library changes and conflicts with main.
- **Scope:** Choose preserve/refresh, redesign anew, or close.
- **Out of scope:** Resolving conflicts before visual approval.
- **Dependencies:** Current brand/product direction.
- **Required approval:** Explicit design and PR disposition approval.
- **Acceptance criteria:** Decision and rationale are documented; no newer main work is discarded.
- **Verification required:** Diff/design review and test plan for retained work.
- **Branch:** TBD
- **Pull request:** #1
- **Verification evidence:** —
- **Outcome:** —

## 2026-07-18-001-memory-game-T016 — Select and configure production deployment

- **Project:** Memory Sequence Game
- **Repository:** `kofiarhin/memory-game`
- **Task type:** Release preparation
- **Priority:** P2
- **Priority rationale:** Approved MVP exists but cannot complete acceptance testing without a deployed target.
- **Status:** needs_approval
- **Source document:** Audit F-009; approved PRD
- **Source section or requirement:** Production deployment
- **Audited revision:** `3073edad00666fd8538af68ada4727639050aa16`
- **Evidence:** No live URL is recorded.
- **Scope:** Choose hosting target and deployment configuration.
- **Out of scope:** Post-MVP features.
- **Dependencies:** Hosting/account access.
- **Required approval:** Deployment target and any cost/domain decision.
- **Acceptance criteria:** Production build is deployed at a documented URL with repeatable settings.
- **Verification required:** Build/deploy logs and smoke test.
- **Branch:** Deployment branch if configuration changes
- **Pull request:** —
- **Verification evidence:** —
- **Outcome:** —

## 2026-07-18-001-memory-game-T017 — Run deployed manual acceptance matrix

- **Project:** Memory Sequence Game
- **Repository:** `kofiarhin/memory-game`
- **Task type:** Release verification
- **Priority:** P2
- **Priority rationale:** Device, keyboard, screen-reader, and reduced-motion checks remain pending.
- **Status:** blocked
- **Source document:** Audit F-009; approved PRD
- **Source section or requirement:** Accessibility and representative-device acceptance
- **Audited revision:** `3073edad00666fd8538af68ada4727639050aa16`
- **Evidence:** Automated fixes exist, but deployed manual validation has not been recorded.
- **Scope:** Execute the documented manual matrix on the deployed build and record defects.
- **Out of scope:** Post-MVP feature selection.
- **Dependencies:** T016 completed.
- **Required approval:** None for verification; fixes require normal task classification.
- **Acceptance criteria:** All required scenarios have pass/fail evidence and blocking defects are classified.
- **Verification required:** Device/browser/accessibility evidence.
- **Branch:** Verification-only
- **Pull request:** —
- **Verification evidence:** —
- **Outcome:** —

## 2026-07-18-001-memory-game-T018 — Decide dependency-locking strategy

- **Project:** Memory Sequence Game
- **Repository:** `kofiarhin/memory-game`
- **Task type:** Maintenance decision
- **Priority:** P3
- **Priority rationale:** Reproducible installs are missing, but lockfile policy is a deliberate repository decision.
- **Status:** needs_approval
- **Source document:** Audit F-009
- **Source section or requirement:** Reproducible dependency install
- **Audited revision:** `3073edad00666fd8538af68ada4727639050aa16`
- **Evidence:** No lockfile exists; CI uses `npm install`.
- **Scope:** Approve package manager/lockfile policy and corresponding CI install command.
- **Out of scope:** Broad dependency upgrades.
- **Dependencies:** None.
- **Required approval:** Explicit dependency-policy approval.
- **Acceptance criteria:** Policy is documented and yields deterministic clean installs.
- **Verification required:** Clean install, tests, and build after implementation.
- **Branch:** TBD
- **Pull request:** —
- **Verification evidence:** —
- **Outcome:** —

## 2026-07-18-001-ideas-T019 — Verify first Architect run artifacts

- **Project:** Ideas Hub
- **Repository:** `kofiarhin/ideas`
- **Task type:** Operational verification
- **Priority:** P2
- **Priority rationale:** The first durable run must be internally consistent before canonical context is updated.
- **Status:** ready
- **Source document:** Audit F-010; Architect command system
- **Source section or requirement:** Run artifact completeness and schema
- **Audited revision:** audit `e91c6dcc151fe4d29ced3ef80b8acc0c2b7623e7`
- **Evidence:** Audit exists; this task queue completes the required pair.
- **Scope:** Validate run ID, fingerprint, task IDs, required fields, statuses, ordering, links, and write-boundary compliance.
- **Out of scope:** Executing project tasks.
- **Dependencies:** None.
- **Required approval:** None beyond `run all tasks` execution authority.
- **Acceptance criteria:** Audit/tasks are complete, mutually consistent, parseable, and contain no unauthorized claims or writes.
- **Verification required:** Repository diff and structured checklist.
- **Branch:** Verification-only
- **Pull request:** —
- **Verification evidence:** —
- **Outcome:** —

## 2026-07-18-001-ideas-T020 — Update Ideas Hub project record for first operational run

- **Project:** Ideas Hub
- **Repository:** `kofiarhin/ideas`
- **Task type:** Context maintenance
- **Priority:** P2
- **Priority rationale:** Project record becomes stale once the first run is verified.
- **Status:** blocked
- **Source document:** Audit F-010
- **Source section or requirement:** First operational Architect run
- **Audited revision:** `projects/ideas.md@46ece928994bd1d5c0288e3ae17f95f9b37413db`
- **Evidence:** Project record states no operational run has occurred.
- **Scope:** Record the verified run, current command-system state, remaining risks, and next action.
- **Out of scope:** Changing command governance or project priorities.
- **Dependencies:** T019 completed.
- **Required approval:** Covered by verified `run all tasks` context-maintenance scope.
- **Acceptance criteria:** Project record accurately links the run and no longer claims zero operational runs.
- **Verification required:** Diff review against verified artifacts.
- **Branch:** Ideas Hub task branch
- **Pull request:** —
- **Verification evidence:** —
- **Outcome:** —

## 2026-07-18-001-portfolio-T021 — Select today’s non-security focus

- **Project:** Portfolio-wide
- **Repository:** `kofiarhin/ideas`
- **Task type:** Priority decision
- **Priority:** P1
- **Priority rationale:** Materially equal priorities remain tied after security and blocking dependencies.
- **Status:** needs_approval
- **Source document:** Audit F-011; `CONTEXT.md`
- **Source section or requirement:** Current priorities
- **Audited revision:** `caf3a98d7003c2148c4fd42541f14cd34e58412d`
- **Evidence:** Portfolio priorities are explicitly not documented.
- **Scope:** Choose one daily focus after urgent security containment.
- **Out of scope:** Assigning permanent portfolio priority or lifecycle states.
- **Dependencies:** Awareness of P0 security tasks.
- **Required approval:** User selection.
- **Acceptance criteria:** One project/outcome is selected as today’s focus with a clear stopping condition.
- **Verification required:** Decision recorded in run report; canonical update only if explicitly warranted.
- **Branch:** —
- **Pull request:** —
- **Verification evidence:** —
- **Outcome:** —

## 2026-07-18-001-devkofi-T022 — Discover current DevKofi milestone

- **Project:** DevKofi
- **Repository:** `kofiarhin/devkofi`
- **Task type:** Discovery
- **Priority:** P3
- **Priority rationale:** Live project lacks lifecycle, focus, and milestone but has no urgent failure signal.
- **Status:** needs_discovery
- **Source document:** Audit lightweight scan; `projects/devkofi.md`
- **Source section or requirement:** Current focus and next action
- **Audited revision:** `projects/devkofi.md@2222c9fa6ff6f10e252f99783cc758954e4709da`
- **Evidence:** No approved current request, blocker, PR, issue, or priority is documented.
- **Scope:** Confirm lifecycle, target users, immediate milestone, and next approved outcome.
- **Out of scope:** Inferring work from repository activity.
- **Dependencies:** User/product input.
- **Required approval:** Discovery outcome approval before implementation.
- **Acceptance criteria:** A shared-understanding handoff defines scope and testable next outcome.
- **Verification required:** Cross-check against current implementation and existing docs.
- **Branch:** —
- **Pull request:** —
- **Verification evidence:** —
- **Outcome:** —

## 2026-07-18-001-codex-workflow-T023 — Discover Codex Workflow Kit milestone and boundary

- **Project:** Codex Workflow Kit
- **Repository:** `kofiarhin/codex-workflow-kit`
- **Task type:** Discovery
- **Priority:** P3
- **Priority rationale:** Intended users, milestone, and memory/integration boundary remain unresolved.
- **Status:** needs_discovery
- **Source document:** Audit lightweight scan; `projects/codex-workflow.md`
- **Source section or requirement:** Current focus and integration boundary
- **Audited revision:** `projects/codex-workflow.md@d80656be176ca1ad8401d4f039ffc6233b090398`
- **Evidence:** No approved implementation request or urgent failure signal exists.
- **Scope:** Confirm users, supported agents, immediate milestone, and boundary with Brain/Ideas Hub.
- **Out of scope:** Building integrations before direction is approved.
- **Dependencies:** User/product input.
- **Required approval:** Discovery outcome approval.
- **Acceptance criteria:** A shared-understanding handoff defines one implementation-ready next outcome or records a pause.
- **Verification required:** Check against repository docs and current implementation.
- **Branch:** —
- **Pull request:** —
- **Verification evidence:** —
- **Outcome:** —

## 2026-07-18-001-context-gaps-T024 — Triage under-documented project records

- **Project:** Piano360, Brain, KareBraids, Amas Kitchen, Taxify, Kflix, Banging Prices, MoggOff
- **Repository:** `kofiarhin/ideas`
- **Task type:** Discovery/context triage
- **Priority:** P3
- **Priority rationale:** Broad lifecycle/focus gaps impair coordination but do not justify invented implementation work.
- **Status:** needs_discovery
- **Source document:** Audit F-011 and lightweight scans
- **Source section or requirement:** Lifecycle, current focus, milestone, and next actions
- **Audited revision:** Ideas Hub source fingerprint for run `2026-07-18-001`
- **Evidence:** Twelve of thirteen records lack confirmed lifecycle; most lack focus and milestone.
- **Scope:** Process one project at a time, confirming facts, decisions, open questions, and next approved action.
- **Out of scope:** Bulk-assuming lifecycle or priority; combining unrelated implementation work.
- **Dependencies:** T021 daily-focus decision and project-specific user input.
- **Required approval:** Each project’s discovery outcome must be approved before canonical updates or implementation.
- **Acceptance criteria:** Each selected project receives a separate shared-understanding handoff or a documented reason to defer.
- **Verification required:** Compare confirmed answers with repository state and authority documents.
- **Branch:** One isolated Ideas Hub branch per approved context update
- **Pull request:** —
- **Verification evidence:** —
- **Outcome:** —

## Queue Summary

### Ready

1. `2026-07-18-001-projectos-T003` — Independently verify Phase 0 closure
2. `2026-07-18-001-brain-T006` — Verify Brain PR #9 against current main
3. `2026-07-18-001-ideas-T019` — Verify first Architect run artifacts
4. No source mutation is authorized for the fourth implementation-ready outcome until its prerequisite verification is complete; `projectos-T004` remains correctly blocked.

### Approval, specification, discovery, or dependency gates

- Security approval: T001, T002
- Specification: T005
- Product/PR/authority decisions: T007, T008, T009, T012, T015, T016, T018, T021
- Discovery: T022, T023, T024
- Blocked by prerequisites: T004, T010, T011, T013, T014, T017, T020

### Execution rule

Only tasks with status `ready` may enter implementation or verification. All other tasks must remain gated until their documented dependency, specification, discovery, or approval requirement is satisfied.
