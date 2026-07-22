# Architect Tasks — 2026-07-22-001

## Queue Summary

- **Ready:** 0
- **Needs approval:** 2
- **Blocked:** 2
- **Needs specification:** 1
- **Source implementation performed:** No

## 2026-07-22-001-projectos-T001 — Approve ProjectOS reactivation

- **Work key:** `projectos:reactivation`
- **Requirement key:** `lifecycle:reactivation`
- **Project:** ProjectOS
- **Repository:** `kofiarhin/projectos`
- **Task type:** Approval
- **Priority:** P0
- **Priority rationale:** Blocks all further ProjectOS work.
- **Status:** `needs_approval`
- **Source document:** `projects/projectos.md`
- **Source section or requirement:** Decisions; Next Actions
- **Audited revision:** `4918a545a498b4575f10f1dd1abe6b2e715f9e20`
- **Evidence:** Project is archived and further verification or Phase 1 work requires explicit reactivation.
- **Scope:** Approve or reject reactivation; define lifecycle state and immediate objective.
- **Out of scope:** Source changes, feature implementation, security remediation.
- **Dependencies:** None
- **Required approval:** Explicit lifecycle reactivation approval.
- **Acceptance criteria:** User explicitly approves reactivation and the intended near-term scope.
- **Verification required:** Approval recorded in the run and later reflected in the project record after verified work.
- **Branch:** Not applicable
- **Pull request:** Not applicable
- **Verification evidence:** Pending
- **Outcome:** Pending

## 2026-07-22-001-projectos-T002 — Perform fresh security and repository-state review

- **Work key:** `projectos:reactivation-security-review`
- **Requirement key:** `security:credential-and-repository-review`
- **Project:** ProjectOS
- **Repository:** `kofiarhin/projectos`
- **Task type:** Security audit
- **Priority:** P0
- **Priority rationale:** A previously exposed MongoDB credential may remain valid.
- **Status:** `blocked`
- **Source document:** `projects/projectos.md`
- **Source section or requirement:** Assumptions; Risks and Open Questions; Next Actions
- **Audited revision:** `4918a545a498b4575f10f1dd1abe6b2e715f9e20`
- **Evidence:** Credential rotation or revocation is not documented; reactivation requires a fresh review.
- **Scope:** Inspect tracked configuration and history for secret exposure, dependency risk, branch state, CI state, and current security controls without printing secret values.
- **Out of scope:** Rotating credentials without user-controlled provider access; product implementation.
- **Dependencies:** T001
- **Required approval:** Reactivation approval; separate approval for destructive remediation if discovered.
- **Acceptance criteria:** Review records exact revision, findings, severity, affected paths, and safe remediation steps; no secrets are reproduced.
- **Verification required:** Repository searches, dependency audit evidence, CI/status evidence, and configuration review.
- **Branch:** `main` authorized for approved non-breaking work
- **Pull request:** None; direct-main authorization recorded
- **Verification evidence:** Pending
- **Outcome:** Pending

## 2026-07-22-001-projectos-T003 — Reconcile Phase 0 implementation against authority documents

- **Work key:** `projectos:phase-0-reconciliation`
- **Requirement key:** `plan:phase-0-exit-criteria`
- **Project:** ProjectOS
- **Repository:** `kofiarhin/projectos`
- **Task type:** Verification audit
- **Priority:** P1
- **Priority rationale:** Current implementation claims cannot be used safely until verified against current requirements.
- **Status:** `blocked`
- **Source document:** `docs/PRD.md`, `docs/ARCHITECTURE.md`, `docs/IMPLEMENTATION_PLAN.md`
- **Source section or requirement:** Phase 0 and CLI foundation exit criteria
- **Audited revision:** `583f005d33649d033622bf037256fd0499e7040c`
- **Evidence:** Latest commit claims Phase 0 completion, while durable context requires reassessment before reactivation.
- **Scope:** Map Phase 0 requirements to implementation and tests; run documented lint, type-check, test, build, CLI help/version, and doctor checks where available.
- **Out of scope:** Phase 1 implementation or undocumented refactors.
- **Dependencies:** T001, T002
- **Required approval:** None after prerequisites, unless authority conflicts are found.
- **Acceptance criteria:** Every Phase 0 criterion is classified with file/test/command evidence; failures and missing work become bounded follow-up tasks.
- **Verification required:** Exact commands, outputs, commit SHA, CI status, and requirement-to-evidence matrix.
- **Branch:** `main` authorized for approved non-breaking work
- **Pull request:** None; direct-main authorization recorded
- **Verification evidence:** Pending
- **Outcome:** Pending

## 2026-07-22-001-projectos-T004 — Resolve REST API and browser UI scope conflict

- **Work key:** `projectos:mvp-interface-scope`
- **Requirement key:** `prd:mvp-exclusions-api-ui`
- **Project:** ProjectOS
- **Repository:** `kofiarhin/projectos`
- **Task type:** Product scope approval
- **Priority:** P1
- **Priority rationale:** Earlier proposed tasks conflict with the MVP source of truth.
- **Status:** `needs_approval`
- **Source document:** `docs/PRD.md`
- **Source section or requirement:** MVP Excluded; CLI Surface
- **Audited revision:** `0da5b2a9e976a6da1a4bfb69b5fdc4f59dff5516`
- **Evidence:** PRD excludes HTTP/REST API, persistent server, and browser dashboard; earlier chat list included REST API and Mission Control UI.
- **Scope:** Choose between retaining CLI-only MVP or approving a separately specified post-MVP API/UI phase.
- **Out of scope:** Implementing API or UI before approval and specification.
- **Dependencies:** T001
- **Required approval:** Explicit product scope decision.
- **Acceptance criteria:** One interface direction is approved; conflicting tasks are removed, deferred, or moved into a new approved phase.
- **Verification required:** Updated authority document revision before implementation tasks become ready.
- **Branch:** Not applicable
- **Pull request:** Not applicable
- **Verification evidence:** Pending
- **Outcome:** Pending

## 2026-07-22-001-projectos-T005 — Produce implementation-ready task breakdown

- **Work key:** `projectos:implementation-task-breakdown`
- **Requirement key:** `prd:approved-mvp-requirements`
- **Project:** ProjectOS
- **Repository:** `kofiarhin/projectos`
- **Task type:** Specification and planning
- **Priority:** P1
- **Priority rationale:** Broad capability labels are too large for safe AI-agent execution.
- **Status:** `needs_spec`
- **Source document:** `docs/PRD.md`, `docs/IMPLEMENTATION_PLAN.md`
- **Source section or requirement:** FR-1 through FR-14 and approved phase exit criteria
- **Audited revision:** `583f005d33649d033622bf037256fd0499e7040c`
- **Evidence:** Earlier tasks do not identify exact gaps, files, dependencies, duplicate work, or verification commands.
- **Scope:** After T003 and T004, create small requirement-linked tasks suitable for one AI-agent run each.
- **Out of scope:** Implementation itself.
- **Dependencies:** T003, T004
- **Required approval:** Approval of any changed scope; otherwise none for tasks directly supported by current authority documents.
- **Acceptance criteria:** Each task has one repository, stable work key, exact scope, out-of-scope section, dependencies, objective done criteria, verification commands, and duplicate check.
- **Verification required:** Cross-check against implementation, historical tasks, commits, and open/merged PRs.
- **Branch:** Not applicable
- **Pull request:** Not applicable
- **Verification evidence:** Pending
- **Outcome:** Pending
