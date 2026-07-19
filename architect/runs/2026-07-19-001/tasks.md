# Architect Task Queue — 2026-07-19-001

## Queue Metadata

- **Run ID:** `2026-07-19-001`
- **Created:** 2026-07-19 Europe/London
- **Audit:** [`audit.md`](audit.md)
- **Ideas Hub base revision:** `2ba615021f8fa4fb5a7dde916b3bf03af79d8c0a`
- **Source fingerprint:** `sha256:fa837cc99e86b4e8963f3ea5f1102ee59e7dc7a6c579a6e356d3ca60c60d35d2`
- **Previous run:** `2026-07-18-002`
- **Queue status:** Actionable ready work exists; approvals, evidence, and access are required for the remainder
- **Implementation performed by `good morning`:** None

## Status Summary

| Status | Count |
| --- | ---: |
| `ready` | 5 |
| `needs_approval` | 5 |
| `blocked` | 4 |
| `needs_discovery` | 1 |
| `skipped` | 2 |
| **Total** | 17 |

## Execution Rules

- Process the queue in order unless the user selects a different daily focus.
- Only `ready` tasks may enter implementation or verification.
- Carried-forward tasks reference prior-run evidence and must not be treated as newly approved scope.
- `skipped` security tasks remain unresolved and must be re-audited before an archived project is reactivated.
- Do not configure production secrets, deploy, merge, register a new canonical project, assign lifecycle state, change workflow policy, change product direction, choose dependency policy, or modify install/restore security behavior without the task's required approval.
- Use isolated branches, commits, and pull requests for unrelated repositories or projects.
- Update task statuses and create `report.md` only through the registered `run all tasks` workflow.
- Update Ideas Hub project truth only after verification.

## 2026-07-19-001-taxify-T001 — Preserve the deferred Taxify credential incident for reactivation review

- **Project:** Taxify
- **Repository:** `kofiarhin/taxify`
- **Task type:** Security incident response
- **Priority:** P0 — Critical, deferred
- **Priority rationale:** The prior audit confirmed a public seeded credential exposure. Archiving did not remediate the risk.
- **Status:** `skipped`
- **Source document:** `projects/taxify.md`; prior runs `2026-07-18-001` and `2026-07-18-002`
- **Source section or requirement:** Decisions, Assumptions, and reactivation safety
- **Audited revision:** Ideas Hub `101be10ba96a2c70ad8a3f3e9bd3b9f35b82a095`; repository `ecff7e6661f5543ba7112b759d1fa69101ef3944`
- **Evidence:** Taxify is explicitly archived and its record states that the identified credential risk remains unremediated while work is deferred.
- **Scope:** On explicit reactivation only, confirm affected environments; rotate credentials; assess session/token invalidation; remove insecure seed fallback and password logging; scan current and historical content; decide whether public-history remediation is required.
- **Out of scope:** Any mutation while archived; unrelated feature work; repeating credential values; destructive history changes without separate approval.
- **Dependencies:** Explicit project reactivation and access to affected deployment, database, and session systems.
- **Required approval:** Explicit reactivation and security-sensitive mutation approval; separate approval for history rewriting.
- **Acceptance criteria:** Before future work, affected environments are documented; old credentials are invalid; seed behavior is hardened; secret scanning passes; approved history action is recorded.
- **Verification required:** Old authentication fails; replacement access works only where intended; seed tests or safe dry run pass; scans and deployment state are recorded.
- **Branch:** None while archived.
- **Pull request:** None.
- **Verification evidence:** Not run; intentionally deferred.
- **Outcome:** Skipped by explicit archive decision. Risk remains unresolved.

## 2026-07-19-001-projectos-T002 — Preserve deferred ProjectOS security and pull-request work for reactivation review

- **Project:** ProjectOS
- **Repository:** `kofiarhin/projectos`
- **Task type:** Security and repository-state preservation
- **Priority:** P0 — Critical, deferred
- **Priority rationale:** A previously exposed MongoDB credential may remain valid, and PR #1 is still open and conflicted despite the project being archived.
- **Status:** `skipped`
- **Source document:** `projects/projectos.md`; ProjectOS PR #1; prior runs
- **Source section or requirement:** Decisions, Assumptions, Risks, and reactivation safety
- **Audited revision:** Ideas Hub `4918a545a498b4575f10f1dd1abe6b2e715f9e20`; repository `583f005d33649d033622bf037256fd0499e7040c`; PR head `094feae2f33bd735a7c14998ee1f4ce75c2d8d12`
- **Evidence:** The project is archived; the credential risk is explicitly deferred; PR #1 remains open, unmerged, and conflicted against a stale base.
- **Scope:** On explicit reactivation only, identify and revoke the credential, verify repository and authority-document state, decide PR #1 disposition, and rebuild the implementation baseline from current main.
- **Out of scope:** Any mutation while archived; committing secrets; beginning Phase 1; merging or rebasing PR #1 without reactivation and authority review.
- **Dependencies:** Explicit reactivation; MongoDB-provider access; repository/dependency access; authority-document reconciliation.
- **Required approval:** Explicit reactivation and security-sensitive approval; separate approval for PR disposition and any scope change.
- **Acceptance criteria:** Credential state is resolved; old access fails; current repository authority is identified; PR #1 is reviewed against current main and given an approved disposition; no archived work is silently resumed.
- **Verification required:** Provider revocation evidence; approved connection check; PR/main diff review; clean repository and secret scans.
- **Branch:** None while archived.
- **Pull request:** #1, open and conflicted.
- **Verification evidence:** Not run; intentionally deferred.
- **Outcome:** Skipped by explicit archive decision. Risks remain unresolved.

## 2026-07-19-001-brain-T003 — Independently verify the merged Brain PR #9 behavior

- **Project:** Brain
- **Repository:** `kofiarhin/brain`
- **Task type:** Verification
- **Priority:** P1 — High
- **Priority rationale:** User-facing rendering, dashboard states, and Europe/London calculations were merged without the executable verification required by the original task.
- **Status:** `ready`
- **Source document:** Brain PR #9; prior tasks `2026-07-18-001-brain-T006` and `2026-07-18-002-brain-T003`; `projects/brain.md`
- **Source section or requirement:** Structured list rendering, Dashboard loading/error/empty states, and Europe/London day calculations
- **Audited revision:** Main/merge `1302ad67912091ab806f0b08b607e8c14d4f3d93`; Ideas Hub `695a9926b337a4912f7fae484541d00997a2460d`
- **Evidence:** PR #9 is merged and Vercel succeeded, but the required dependency-backed test and boundary matrix has not been executed independently.
- **Scope:** Verify the merged commit from a clean checkout; run focused List/Dashboard tests, full client validation, lint/type-check/build where defined, executable Europe/London boundary cases, and manual structured-value/loading/error/empty-state checks.
- **Out of scope:** Reverting or changing implementation before a failure is classified; unrelated Brain refactors; changing timezone policy.
- **Dependencies:** Repository checkout and dependency access.
- **Required approval:** No additional approval for read-only verification. Any fix requires a new or reclassified task.
- **Acceptance criteria:** Every original PR #9 behavior is exercised; commands and boundary cases are recorded; the working tree remains clean; failures become traceable tasks; the merged work receives an explicit verified/not-verified outcome.
- **Verification required:** Focused tests; full client tests; lint/type-check/build where present; Europe/London boundary cases; manual UI inspection; `git status --short`.
- **Branch:** No branch for read-only verification; create an isolated fix branch only after a separate task becomes `ready`.
- **Pull request:** #9, merged.
- **Verification evidence:** Vercel success only; executable verification pending.
- **Outcome:** Not started.

## 2026-07-19-001-devkofi-T004 — Add server CI validation and integration coverage for Telegram notifications

- **Project:** DevKofi
- **Repository:** `kofiarhin/devkofi`
- **Task type:** Maintenance and test hardening
- **Priority:** P1 — High
- **Priority rationale:** Production-facing server changes do not trigger the current client-only workflow, so backend regressions can merge without CI evidence.
- **Status:** `ready`
- **Source document:** `.github/workflows/ci.yml`; root `package.json`; Telegram service/controllers/tests; `projects/devkofi.md`; prior task `2026-07-18-002-devkofi-T004`
- **Source section or requirement:** Testing baseline and best-effort Telegram notification decisions
- **Audited revision:** Repository `3c42e10712b3c60a0ee24e855823039be027e617`; Ideas Hub `14528bcb7226e7537171fde75f6aff752acf7efe`
- **Evidence:** The workflow is path-filtered to client changes. Root/server Jest tests are not run for backend-only changes. Service tests exist, but controller-level failure behavior is not fully covered.
- **Scope:** Add a non-deploy server validation job triggered by server/root dependency/workflow changes; use the repository lockfile and supported Node version; run root Jest tests; add focused controller/integration tests proving persistence precedes notification, disabled/missing configuration skips safely, Telegram failures do not change successful API responses, and user content remains escaped.
- **Out of scope:** Configuring real Telegram credentials; sending production messages; changing enrolment/contact behavior; redesigning deployment; unrelated dependency upgrades.
- **Dependencies:** Repository checkout and existing test-database support.
- **Required approval:** No additional product approval for bounded CI/test hardening. Workflow permission or deployment changes beyond validation require separate approval.
- **Acceptance criteria:** Server/root changes trigger CI; tests run without external Telegram access; integration coverage proves best-effort behavior; failures block validation; secrets are never echoed; existing client deploy behavior remains unchanged.
- **Verification required:** Clean install; focused Jest tests; full root Jest suite; workflow syntax and path-filter review; secret-leakage log review; client workflow regression review.
- **Branch:** `ci/server-validation-telegram`
- **Pull request:** None.
- **Verification evidence:** Source gap confirmed; implementation not started.
- **Outcome:** Not started.

## 2026-07-19-001-devkofi-T005 — Configure and smoke-test DevKofi Telegram notifications in production

- **Project:** DevKofi
- **Repository:** `kofiarhin/devkofi`
- **Task type:** Production configuration and verification
- **Priority:** P1 — High
- **Priority rationale:** The feature is implemented but disabled until production secrets and the enable flag are configured; enabling it changes external production behavior.
- **Status:** `needs_approval`
- **Source document:** `projects/devkofi.md`; `.env.example`; Telegram service implementation; prior task `2026-07-18-002-devkofi-T005`
- **Source section or requirement:** Current Focus and Next Actions — production configuration and end-to-end delivery
- **Audited revision:** Repository `3c42e10712b3c60a0ee24e855823039be027e617`; Ideas Hub `14528bcb7226e7537171fde75f6aff752acf7efe`
- **Evidence:** Notifications default to disabled and require server-side bot token/chat ID configuration. No deployment-provider or end-to-end evidence is available.
- **Scope:** After T004 passes, configure approved production secrets and the enable flag; submit one production-safe contact and one booking/enrolment; confirm MongoDB persistence, API success, private Telegram delivery, escaped content, and no duplicate notification.
- **Out of scope:** Writing secrets to Git or run files; changing recipients; bulk submissions; changing business workflows.
- **Dependencies:** T004 completed; explicit user approval; deployed API, Telegram bot/chat, and production-safe test data access.
- **Required approval:** Explicit approval for production secret-store changes and live submissions.
- **Acceptance criteria:** Secrets exist only in approved storage; both submissions persist and deliver exactly once; API success remains independent of delivery; evidence contains no secret values.
- **Verification required:** Provider configuration review; production-safe contact and booking; database and Telegram confirmation; disable/failure rollback check; log review.
- **Branch:** None unless a separately approved code or documentation fix is required.
- **Pull request:** None.
- **Verification evidence:** Not run.
- **Outcome:** Pending approval.

## 2026-07-19-001-archon-T006 — Implement Archon Phase 1 workspace bootstrap and CI baseline

- **Project:** Archon
- **Repository:** `kofiarhin/archon`
- **Task type:** Approved foundation implementation
- **Priority:** P1 — High
- **Priority rationale:** The approved plan's first bounded work item is a prerequisite for every later phase and has explicit acceptance checks.
- **Status:** `ready`
- **Source document:** `docs/specs/IMPLEMENTATION_PLAN.md`; `docs/specs/MVP_IMPLEMENTATION_SPEC.md`; `projects/archon.md`; prior task `2026-07-18-002-archon-T006`
- **Source section or requirement:** Phase 1.1 Workspace bootstrap and Phase 1.2 CI baseline
- **Audited revision:** Repository `f89140062b069487c35319b525cc15aae100dc8b`; Ideas Hub `497c0b9a8cc35b7c8791162cfea18a6750ac5acb`
- **Evidence:** The approved implementation plan is merged. Main has no application bootstrap. Phase 1.1/1.2 define workspace, app boundaries, configuration, Docker services, quality checks, and CI acceptance criteria.
- **Scope:** Test-first bootstrap the approved pnpm workspace, `apps/web`, `apps/worker`, shared package boundaries, TypeScript/configuration baseline, formatting/lint/type-check/tests/build, import-boundary enforcement, validated runtime configuration, Docker Compose PostgreSQL/Redis, documented local commands, and required GitHub Actions checks. Keep web and worker minimally runnable.
- **Out of scope:** Phase 1.3 Prisma schema/migrations/repositories/outbox; authentication; project intake; AI provider integration; hosting choice; post-MVP features.
- **Dependencies:** Repository, dependency, and Docker access.
- **Required approval:** Covered by the merged approved plan. Any architecture, dependency-family, security-boundary, or scope deviation requires approval.
- **Acceptance criteria:** Fresh install succeeds; web and worker start; invalid config fails safely; app packages cannot import each other's internals; PostgreSQL/Redis start locally; required CI checks run and block failures; build artifacts exclude secrets.
- **Verification required:** Clean install; format/lint/type-check/tests/build; local web/worker startup; invalid-config cases; import-boundary tests; Docker health; CI run; secret scan; clean tree.
- **Branch:** `feat/phase-1-foundation`
- **Pull request:** None.
- **Verification evidence:** Authority and gap confirmed; implementation not started.
- **Outcome:** Not started.

## 2026-07-19-001-archon-T007 — Reconcile Archon authority-document approval status

- **Project:** Archon
- **Repository:** `kofiarhin/archon`
- **Task type:** Documentation and authority maintenance
- **Priority:** P2 — Medium
- **Priority rationale:** Merged authority documents still contain proposed or awaiting-review wording, creating ambiguity for contributors and agents.
- **Status:** `ready`
- **Source document:** `README.md`; `docs/specs/MVP_IMPLEMENTATION_SPEC.md`; `docs/specs/IMPLEMENTATION_PLAN.md`; Archon PR #2; prior task `2026-07-18-002-archon-T007`
- **Source section or requirement:** Project status and document status headers
- **Audited revision:** Repository `f89140062b069487c35319b525cc15aae100dc8b`
- **Evidence:** PR #2 and the Ideas Hub record establish approval, while repository status text remains stale.
- **Scope:** Update only status labels and approval references for the exact merged revisions; preserve all requirements, risks, acceptance criteria, and scope boundaries.
- **Out of scope:** Revising architecture, technology choices, retention defaults, implementation sequence, or product scope.
- **Dependencies:** None. May be a distinct commit in T006's branch if clearly separated.
- **Required approval:** No additional approval for factual reconciliation. Any substantive content change requires approval.
- **Acceptance criteria:** README/spec/plan agree that PR #2's merged revisions are approved; no requirement changes; post-MVP content remains proposed.
- **Verification required:** Semantic diff; comparison with PR #2 and `projects/archon.md`; link and documentation checks.
- **Branch:** `docs/approved-spec-status` or distinct T006 commit.
- **Pull request:** None.
- **Verification evidence:** Drift confirmed.
- **Outcome:** Not started.

## 2026-07-19-001-piano360-T008 — Recover Phase 0 audit evidence and approve the first Guided Learning implementation slice

- **Project:** Piano360
- **Repository:** `kofiarhin/piano360`
- **Task type:** Evidence reconciliation and implementation approval
- **Priority:** P1 — High
- **Priority rationale:** The approved plan is ready, but the findings required to select a safe first implementation task are not durably linked.
- **Status:** `blocked`
- **Source document:** `projects/piano360.md`; `docs/plans/guided-learning-mode.md`; Piano360 PR #2; prior task `2026-07-18-002-piano360-T008`
- **Source section or requirement:** Phase 0 exit criteria; Current Priority and Next Actions
- **Audited revision:** Repository `5e7fe9555312f10432519ee18ae4a2dc3d63c01a`; Ideas Hub `5d3b19950139152c0a7d88e2ee86b923c84c0bbe`
- **Evidence:** The plan is merged and marked ready. The project record says Phase 0 completed, but no linked matrix identifies input/progress boundaries, selected lesson, schema changes, conflicts, or first task.
- **Scope:** Locate or reconstruct the audit read-only; record requirement-to-code/test/data evidence; identify the first seeded lesson and minimal schema impact; propose one bounded test-first slice; obtain approval before code changes.
- **Out of scope:** Implementing Guided Learning; choosing schema or lesson without evidence; beginning multiple phases; unrelated refactors.
- **Dependencies:** Access to the completed audit artifact or a repository/dependency environment for reconstruction.
- **Required approval:** Explicit approval for the selected first implementation slice.
- **Acceptance criteria:** Phase 0 exit criteria have traceable evidence; conflicts and missing tests are visible; one bounded task has scope, acceptance criteria, verification, and branch plan; user approves or revises it.
- **Verification required:** Source/test/seed/API inspection; relevant tests/type-check/build; compare against approved spec/plan; record exact commit.
- **Branch:** None for evidence work; implementation branch only after approval.
- **Pull request:** #2, merged documentation authority.
- **Verification evidence:** Plan and completion claim exist; detailed evidence unavailable.
- **Outcome:** Blocked on evidence access, then approval.

## 2026-07-19-001-amas-kitchen-T009 — Update Amas Kitchen context for resolved PR dispositions

- **Project:** Amas Kitchen
- **Repository:** `kofiarhin/ideas`
- **Task type:** Context maintenance
- **Priority:** P2 — Medium
- **Priority rationale:** The canonical project record incorrectly describes PRs #4 and #5 as unresolved open work.
- **Status:** `ready`
- **Source document:** `projects/amas-kitchen.md`; Amas Kitchen PRs #4 and #5; prior task `2026-07-18-002-amas-kitchen-T009`
- **Source section or requirement:** Links, Current State, Current Focus, Decisions, Open Questions, and Next Actions
- **Audited revision:** Ideas Hub `2159d7b655dbbf003c6cd18b0ff6cf10b4b5a059`; Amas Kitchen main `5f2f0cb5df73ec74596d45be40ceb1dc3f53fd85`
- **Evidence:** PR #4 is closed without merge as superseded; PR #5 is merged with successful Vercel status.
- **Scope:** Update only factual PR state and merged shortlist context; preserve unresolved brand/CTA/assets/delivery decisions and exact next action.
- **Out of scope:** Approving homepage direction; claiming local test execution; changing lifecycle/priority; modifying application source; inventing assets or business details.
- **Dependencies:** None.
- **Required approval:** No additional approval for verified factual context maintenance.
- **Acceptance criteria:** Record no longer describes closed/merged PRs as open; links/revisions are correct; uncertainty remains explicit; `Last updated` is refreshed; no unrelated records change.
- **Verification required:** Current PR-state and main-head fetch; diff and link review; project-structure check.
- **Branch:** Ideas Hub isolated context branch.
- **Pull request:** None.
- **Verification evidence:** PR states and main head verified.
- **Outcome:** Not started.

## 2026-07-19-001-amas-kitchen-T010 — Approve the next Amas Kitchen homepage direction

- **Project:** Amas Kitchen
- **Repository:** `kofiarhin/amas-kitchen`
- **Task type:** Product and design approval
- **Priority:** P1 — High
- **Priority rationale:** The prior hero brief was superseded and the inspiration shortlist is merged, but implementation cannot proceed without brand and conversion decisions.
- **Status:** `needs_approval`
- **Source document:** `projects/amas-kitchen.md`; merged design shortlist; superseded PR #4; prior task `2026-07-18-002-amas-kitchen-T010`
- **Source section or requirement:** Current Focus, Decisions, Open Questions, and Next Actions
- **Audited revision:** Main `5f2f0cb5df73ec74596d45be40ceb1dc3f53fd85`; Ideas Hub `2159d7b655dbbf003c6cd18b0ff6cf10b4b5a059`
- **Evidence:** Existing routes/data behavior must be preserved. Primary CTA, delivery wording, brand tone, logo, photography, and shortlist disposition remain unresolved.
- **Scope:** Approve target audience/location wording, primary/supporting CTAs, delivery language, brand tone, logo/photography sources, shortlist disposition, and one bounded implementation section with testable acceptance criteria.
- **Out of scope:** Implementing before approval; changing ordering/payment flows; inventing assets; broad redesign; reviving PR #4 unchanged.
- **Dependencies:** Human/client decisions and approved asset access.
- **Required approval:** Explicit product/design approval.
- **Acceptance criteria:** Material decisions are approved or explicitly placeholdered; one implementation-ready direction exists; assets have references/owners; scope and verification are testable.
- **Verification required:** Visual/content review against current main; accessibility/responsive criteria; asset/license review; approved handoff.
- **Branch:** None until approval.
- **Pull request:** PR #4 closed; PR #5 merged.
- **Verification evidence:** Repository state verified; direction unresolved.
- **Outcome:** Pending approval.

## 2026-07-19-001-memory-sequence-game-T011 — Deploy Memory Game to Vercel and record release evidence

- **Project:** Memory Sequence Game
- **Repository:** `kofiarhin/memory-game`
- **Task type:** Deployment and release verification
- **Priority:** P1 — High
- **Priority rationale:** Vercel is approved, but no production project, URL, owner, smoke result, or rollback evidence exists.
- **Status:** `blocked`
- **Source document:** `projects/memory-sequence-game.md`; approved `PRD.md`; prior task `2026-07-18-002-memory-sequence-game-T011`
- **Source section or requirement:** Decisions and Next Actions — deploy static frontend to Vercel
- **Audited revision:** Repository `3073edad00666fd8538af68ada4727639050aa16`; Ideas Hub `4be662b8fad08fe062032a121365e88a4f747986`
- **Evidence:** MVP and prior validation exist; project record says not deployed and selects Vercel.
- **Scope:** Create or identify the Vercel project; deploy audited main; record owner, production URL, source revision, build settings, deployment result, gameplay smoke evidence, and rollback/removal procedure.
- **Out of scope:** Adding a backend; using Heroku for the static app; changing gameplay; selecting post-MVP features; claiming readiness before T012.
- **Dependencies:** Authenticated Vercel access and ownership confirmation.
- **Required approval:** Hosting target is approved. Paid plan, custom domain, transfer, or production-data changes require explicit approval.
- **Acceptance criteria:** URL resolves; exact commit is deployed; landing/category/start/round/game-over/local-persistence smoke passes; owner and rollback are documented; no secrets exposed.
- **Verification required:** Vercel logs; URL; browser smoke; source/build settings; rollback evidence; post-verification context update.
- **Branch:** None for deployment; source fixes require separate task/branch.
- **Pull request:** None.
- **Verification evidence:** No authenticated deployment access.
- **Outcome:** Blocked on Vercel access.

## 2026-07-19-001-memory-sequence-game-T012 — Complete the deployed Memory Game manual acceptance matrix

- **Project:** Memory Sequence Game
- **Repository:** `kofiarhin/memory-game`
- **Task type:** Manual acceptance verification
- **Priority:** P1 — High
- **Priority rationale:** Responsive, keyboard, screen-reader, reduced-motion, and non-colour requirements cannot be proven by source inspection alone.
- **Status:** `blocked`
- **Source document:** Approved `PRD.md`; `projects/memory-sequence-game.md`; prior task `2026-07-18-002-memory-sequence-game-T012`
- **Source section or requirement:** Accessibility, responsive behavior, and Remaining Risks
- **Audited revision:** Repository `3073edad00666fd8538af68ada4727639050aa16`; Ideas Hub `4be662b8fad08fe062032a121365e88a4f747986`
- **Evidence:** Manual mobile, desktop, keyboard, screen-reader, and reduced-motion testing remains pending.
- **Scope:** Against the T011 deployment, test representative viewports; touch/mouse/keyboard flows; focus; announcements; accessible names; non-colour feedback; reduced motion; sound fallback; long sequences; refresh/storage; record pass/fail/not applicable.
- **Out of scope:** Changing gameplay during verification; substituting source review for assistive-technology testing; selecting post-MVP features; silently fixing defects.
- **Dependencies:** T011 completed; representative browsers/devices; at least one screen reader.
- **Required approval:** No additional approval for verification. Defect fixes require separate tasks.
- **Acceptance criteria:** Matrix is complete against a fixed URL/revision; defects have evidence and severity; release recommendation is explicit; no failed case is hidden.
- **Verification required:** Manual matrix; screenshots/recordings where useful; automated test/build cross-check; approved-fix retest.
- **Branch:** None.
- **Pull request:** None.
- **Verification evidence:** Blocked on deployment and test-environment access.
- **Outcome:** Blocked.

## 2026-07-19-001-memory-sequence-game-T013 — Approve the Memory Game dependency reproducibility policy

- **Project:** Memory Sequence Game
- **Repository:** `kofiarhin/memory-game`
- **Task type:** Engineering policy decision
- **Priority:** P2 — Medium
- **Priority rationale:** Direct versions are pinned, but there is no lockfile and CI uses `npm install`, so transitive resolution is not reproducible.
- **Status:** `needs_approval`
- **Source document:** `package.json`; `.github/workflows/ci.yml`; `projects/memory-sequence-game.md`; prior task `2026-07-18-002-memory-sequence-game-T013`
- **Source section or requirement:** Remaining Risks and Next Actions — locking workflow
- **Audited revision:** Repository `3073edad00666fd8538af68ada4727639050aa16`
- **Evidence:** `package-lock.json` is absent; CI uses `npm install`; direct dependencies are exact-pinned.
- **Scope:** Approve committing `package-lock.json` and using `npm ci`, or approve a documented alternative; define update cadence, CI enforcement, and verification.
- **Out of scope:** Package upgrades; breaking changes; behavior changes; dependency mutation before policy approval.
- **Dependencies:** None.
- **Required approval:** Explicit engineering-policy approval.
- **Acceptance criteria:** One policy is selected with rationale; install/CI/update behavior is documented; implementation task has clear acceptance criteria.
- **Verification required:** Lockfile option: clean `npm ci`, tests, lint, build, deterministic diff, CI update. Alternative: documented reproducibility proof and enforcement.
- **Branch:** None until approval.
- **Pull request:** None.
- **Verification evidence:** Gap confirmed.
- **Outcome:** Pending approval.

## 2026-07-19-001-agent-system-T014 — Approve the Universal Agent System canonical project registration

- **Project:** Universal Agent System, proposed
- **Repository:** `kofiarhin/ideas`; linked repository `kofiarhin/agent-system`
- **Task type:** Project registration and lifecycle approval
- **Priority:** P1 — High
- **Priority rationale:** Ideas Hub PR #6 proposes adding an Active canonical project and durable record; root governance prohibits silently adding projects or lifecycle state.
- **Status:** `needs_approval`
- **Source document:** Ideas Hub PR #6; `kofiarhin/agent-system` README and `docs/PRD.md`
- **Source section or requirement:** `PROJECTS.md` canonical index; proposed `projects/agent-system.md`; project/lifecycle approval rules
- **Audited revision:** Ideas main `2ba615021f8fa4fb5a7dde916b3bf03af79d8c0a`; PR head `af42750bc05014e0c0c8dee239b9b07403c07ba2`; Agent System main `7a32a1559137793a12e178da52284a5b41c7b34e`; PRD `b566760821cb78f29bb68180b289f80ad4e9f754`
- **Evidence:** PR #6 is open and mergeable. Repository evidence supports shared modules, adapters, deterministic generation, verification, install/restore tooling, tests, and documented limitations. Runtime-local installation claims were not independently reproduced.
- **Scope:** Review PR #6 for factual accuracy, approve or revise the project name, Active lifecycle, current status, repository links, installation claims, known limitations, next actions, and whether it should enter the canonical portfolio now; then approve merge or closure.
- **Out of scope:** Merging without approval; changing Agent System source; claiming Gemini installation; hiding deployment risks; treating registration as approval for safety-sensitive implementation.
- **Dependencies:** User review and explicit approval; optional runtime-local evidence for installed Codex/Claude claims.
- **Required approval:** Explicit approval required for canonical project addition, lifecycle assignment, and PR merge.
- **Acceptance criteria:** Project identity and lifecycle are explicitly approved; factual claims match audited repository evidence; unverified runtime-local claims are labelled; known limitations remain visible; PR disposition is explicit.
- **Verification required:** PR diff review; links and repository head check; compare proposed record with README/PRD; confirm no unrelated index/context changes.
- **Branch:** Existing PR branch `docs/add-agent-system-project`.
- **Pull request:** Ideas Hub #6, open and mergeable.
- **Verification evidence:** Repository/document consistency partially verified; approval pending.
- **Outcome:** Pending approval.

## 2026-07-19-001-agent-system-T015 — Specify Universal Agent System deployment-safety hardening

- **Project:** Universal Agent System, proposed
- **Repository:** `kofiarhin/agent-system`
- **Task type:** Security-sensitive specification
- **Priority:** P1 — High
- **Priority rationale:** Installation and restore tooling writes active runtime instruction files; the PRD records incomplete transaction, backup durability, rollback, path-validation, atomicity, and CI guarantees.
- **Status:** `blocked`
- **Source document:** `docs/PRD.md`; `README.md`; proposed Ideas project record
- **Source section or requirement:** PRD Known Limitations, Near-term Roadmap, Non-Goals, and product governance
- **Audited revision:** Repository `7a32a1559137793a12e178da52284a5b41c7b34e`; PRD `b566760821cb78f29bb68180b289f80ad4e9f754`; README `c9ce742bafd10fb0ec8dabaa23689955536381c3`
- **Evidence:** The PRD explicitly lists multi-runtime transaction ambiguity, late manifest durability, incomplete restore rollback, qualified atomicity, manifest-target validation, reparse-point risks, and missing Windows CI. It also lists complete cross-runtime transaction guarantees as a v1 non-goal.
- **Scope:** After T014, decide full transaction versus independent per-runtime semantics; draft an implementation-ready hardening specification covering manifest write timing, rollback state machine, replacement guarantees, adapter-target validation, reparse-point handling, failure injection, Windows CI, compatibility, and migration/release behavior.
- **Out of scope:** Modifying install/restore scripts before approval; installing Gemini; architectural redesign; changing shared agent behavior; editing active runtime files.
- **Dependencies:** T014 approved; explicit transaction-semantics decision; access to current scripts/tests and Windows behavior.
- **Required approval:** Explicit approval for transaction semantics and the resulting security-sensitive specification before implementation becomes `ready`.
- **Acceptance criteria:** Semantics are unambiguous; failure states and rollback guarantees are tabulated; path and reparse-point rules are defined; manifest durability timing is specified; replacement claims match guarantees; test matrix covers partial failure and restore failure; CI and release criteria are implementation-ready.
- **Verification required:** Cross-check PRD/README/scripts/tests; threat and failure-mode review; Windows PowerShell 5.1/7 compatibility review; explicit approval.
- **Branch:** None until registration and specification approval.
- **Pull request:** None.
- **Verification evidence:** Limitations confirmed; implementation-ready specification absent.
- **Outcome:** Blocked on T014 and approval/specification.

## 2026-07-19-001-codex-workflow-T016 — Decide and reconcile the Fallow Quality workflow PR

- **Project:** Codex Workflow Kit
- **Repository:** `kofiarhin/codex-workflow-kit`
- **Task type:** Workflow policy and pull-request approval
- **Priority:** P1 — High
- **Priority rationale:** PR #3 makes a third-party quality layer mandatory across installed workflows, changes agent authority files and templates, is conflicted, and reports only a `PARTIAL` Fallow verdict.
- **Status:** `needs_approval`
- **Source document:** Codex Workflow Kit PR #3; `projects/codex-workflow.md`; changed workflow, installer, template, and audit artifacts
- **Source section or requirement:** Mandatory Fallow gate, fetched skill provenance, installer behavior, final health-gate semantics
- **Audited revision:** Main/base `a48ea9cce44f3df832e2335b0bc699f1333c653d`; PR head `606506b01c8c1c4d7dce08cd512b957337adc770`; Ideas Hub `d80656be176ca1ad8401d4f039ffc6233b090398`
- **Evidence:** PR #3 is open and conflicted. Reported tests/build/routing/lint/typecheck pass, but the primary changed-code Fallow audit could not resolve `main`; fallback produced parseable output and a `PARTIAL` verdict with unresolved findings. The PR changes mandatory workflow behavior and copies fetched skill/reference files into installable templates.
- **Scope:** Decide whether Fallow is mandatory, optional, or rejected; verify source/provenance and update mechanism for fetched skill files; confirm telemetry and untrusted remote-config protections; reconcile against current main; require a target-repository audit with a resolvable base ref; decide treatment of remaining findings; approve merge, revision, or closure.
- **Out of scope:** Merging the conflicted PR without policy approval; automatically deleting unused candidates; broad application refactoring; enabling telemetry; trusting remote `extends`; treating fallback `PARTIAL` as clean verification.
- **Dependencies:** User workflow-policy decision; conflict reconciliation; repository/dependency access; provenance review.
- **Required approval:** Explicit approval for mandatory workflow behavior, third-party skill distribution, installer changes, and PR disposition.
- **Acceptance criteria:** Policy is explicit; provenance/update strategy is documented; telemetry/remote-config safeguards are verified; PR is reconciled to current main; primary audit runs against a real base; remaining findings have approved disposition; final verdict and PR outcome are explicit.
- **Verification required:** Diff and authority review; clean install; routing/tests/lint/typecheck/build; primary Fallow JSON audit with resolvable base; installer dry run; generated/template freshness; security review; clean tree.
- **Branch:** Existing PR branch `agent-zero/implement-fallow-quality-layer` until approved disposition.
- **Pull request:** #3, open and conflicted.
- **Verification evidence:** Reported validation exists; primary audit incomplete; verdict `PARTIAL`.
- **Outcome:** Pending approval and reconciliation.

## 2026-07-19-001-ideas-T017 — Select the portfolio daily focus and fallback

- **Project:** Ideas Hub / portfolio-wide
- **Repository:** `kofiarhin/ideas`
- **Task type:** Portfolio discovery
- **Priority:** P1 — High
- **Priority rationale:** Brain verification, DevKofi CI hardening, Archon foundation, Agent System registration, and Codex Workflow policy review are all defensible priorities; workspace rules prohibit inferring priority from activity or project order.
- **Status:** `needs_discovery`
- **Source document:** `CONTEXT.md`; `PROJECTS.md`; this audit; prior task `2026-07-18-002-ideas-T014`
- **Source section or requirement:** Current Priorities and portfolio coordination
- **Audited revision:** `CONTEXT.md` `034d28c51d6f1951ce8f17d934a64c80a8bdf47b`; `PROJECTS.md` `fe0d86cc76c85ce4979d6fd99ccfd615a6d94e9f`; run fingerprint `sha256:fa837cc99e86b4e8963f3ea5f1102ee59e7dc7a6c579a6e356d3ca60c60d35d2`
- **Evidence:** Current priorities are not documented. Ready execution and approval-review tracks have different risk and value profiles.
- **Scope:** Choose one primary focus and one fallback among Brain T003, DevKofi T004, Archon T006, Agent System T014, and Codex Workflow T016; confirm archived security risks remain deferred; decide when focused discovery should begin for under-documented projects.
- **Out of scope:** Changing lifecycle states; approving product scope; treating priority as implementation approval; reactivating archived projects without explicit decision.
- **Dependencies:** User choice.
- **Required approval:** User selection is the discovery outcome. Durable priority changes require explicit approval before Ideas Hub updates.
- **Acceptance criteria:** One primary focus and one fallback are named; rationale/dependencies are explicit; archived security posture is acknowledged; next discovery target, if any, is selected.
- **Verification required:** Confirm selected tasks' statuses and dependencies; ensure only `ready` work is authorized; record the decision in the execution report and project context only after approval.
- **Branch:** None for discovery.
- **Pull request:** None.
- **Verification evidence:** Not started.
- **Outcome:** Discovery required.