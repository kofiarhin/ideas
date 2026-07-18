# Architect Task Queue — 2026-07-18-002

## Queue Metadata

- **Run ID:** `2026-07-18-002`
- **Created:** 2026-07-18 19:35 Europe/London
- **Audit:** [`audit.md`](audit.md)
- **Ideas Hub base revision:** `0badb2ad174b20866c137ebb1636633c30588f98`
- **Source fingerprint:** `sha256:5f219f9c599de763b5a279b4f3ddc677b416fdc8850029924f6638aa2c8f2aed`
- **Previous run:** `2026-07-18-001`
- **Queue status:** Actionable ready work exists; approvals, evidence, and access are required for the remainder
- **Implementation performed by `good morning`:** None

## Status Summary

| Status | Count |
| --- | ---: |
| `ready` | 5 |
| `needs_approval` | 3 |
| `blocked` | 3 |
| `needs_discovery` | 1 |
| `skipped` | 2 |
| **Total** | 14 |

## Execution Rules

- Process the queue in order unless the user selects a different daily focus.
- Only `ready` tasks may enter implementation or verification.
- `skipped` security tasks remain unresolved and must be re-audited before either archived project is reactivated.
- Do not configure production secrets, deploy, merge, change product direction, change dependency policy, or broaden scope without the task's required approval.
- Use isolated branches, commits, and pull requests for unrelated repository changes.
- Update task statuses and create `report.md` only through the registered `run all tasks` workflow.
- Update Ideas Hub project truth only after verification.

## 2026-07-18-002-taxify-T001 — Preserve the deferred Taxify credential incident for reactivation review

- **Project:** Taxify
- **Repository:** `kofiarhin/taxify`
- **Task type:** Security incident response
- **Priority:** P0 — Critical, deferred
- **Priority rationale:** The prior audit confirmed a public seeded credential exposure. Archiving did not remediate the risk.
- **Status:** `skipped`
- **Source document:** `projects/taxify.md`; prior run `2026-07-18-001`
- **Source section or requirement:** Decisions, Assumptions, and reactivation safety
- **Audited revision:** Ideas Hub `101be10ba96a2c70ad8a3f3e9bd3b9f35b82a095`; repository `ecff7e6661f5543ba7112b759d1fa69101ef3944`
- **Evidence:** The project is explicitly archived and the record states that the identified security risk is ignored while archived and remains unremediated.
- **Scope:** On explicit reactivation only, confirm affected environments; rotate credentials; assess session/token invalidation; remove insecure seed fallback and password logging; scan current and historical content; decide whether public-history remediation is required.
- **Out of scope:** Any mutation while Taxify remains archived; unrelated feature work; repeating credential values; destructive history changes without separate approval.
- **Dependencies:** Explicit project reactivation and access to affected deployment/database/session systems.
- **Required approval:** Explicit reactivation and security-sensitive mutation approval; separate approval for history rewriting.
- **Acceptance criteria:** Before future work, affected environments are documented; old credentials are invalid; seed behavior is hardened; secret scanning passes; approved history action is recorded.
- **Verification required:** Old authentication fails; replacement access works only where intended; seed tests/dry run pass; scans and deployment state are recorded.
- **Branch:** None while archived.
- **Pull request:** None.
- **Verification evidence:** Not run; intentionally deferred.
- **Outcome:** Skipped by explicit archive decision. Risk remains unresolved.

## 2026-07-18-002-projectos-T002 — Preserve the deferred ProjectOS credential incident for reactivation review

- **Project:** ProjectOS
- **Repository:** `kofiarhin/projectos`
- **Task type:** Security incident response
- **Priority:** P0 — Critical, deferred
- **Priority rationale:** The project record says a previously exposed MongoDB credential may remain valid; revocation has not been verified.
- **Status:** `skipped`
- **Source document:** `projects/projectos.md`; prior run `2026-07-18-001`
- **Source section or requirement:** Decisions, Assumptions, Risks, and reactivation safety
- **Audited revision:** Ideas Hub `4918a545a498b4575f10f1dd1abe6b2e715f9e20`; repository `583f005d33649d033622bf037256fd0499e7040c`
- **Evidence:** ProjectOS is archived and its durable record explicitly defers the credential-rotation risk without claiming remediation.
- **Scope:** On explicit reactivation only, identify the credential/environment; revoke and replace it through approved secret stores; verify old access fails; check tracked files, screenshots, logs, and local configuration for exposure.
- **Out of scope:** Any mutation while ProjectOS remains archived; committing secrets; Phase 1 work; unrelated dependency or architecture changes.
- **Dependencies:** Explicit project reactivation and access to the MongoDB provider and affected configuration.
- **Required approval:** Explicit reactivation and security-sensitive secret-store approval.
- **Acceptance criteria:** Credential is identified; replacement is installed only in approved locations; old value is revoked; connectivity works; replacement is not committed or logged.
- **Verification required:** Provider revocation evidence; old connection fails; approved connection check passes; repository and working-tree scans are clean.
- **Branch:** None while archived.
- **Pull request:** None.
- **Verification evidence:** Not run; intentionally deferred.
- **Outcome:** Skipped by explicit archive decision. Risk remains unresolved.

## 2026-07-18-002-brain-T003 — Independently verify the merged Brain PR #9 behavior

- **Project:** Brain
- **Repository:** `kofiarhin/brain`
- **Task type:** Verification
- **Priority:** P1 — High
- **Priority rationale:** User-facing rendering, dashboard states, and Europe/London calculations were merged without the executable verification required by the original task.
- **Status:** `ready`
- **Source document:** Brain PR #9; prior queue task `2026-07-18-001-brain-T006`; `projects/brain.md`
- **Source section or requirement:** Structured list rendering, Dashboard loading/error/empty states, and Europe/London day calculations
- **Audited revision:** Main/merge `1302ad67912091ab806f0b08b607e8c14d4f3d93`; Ideas Hub `695a9926b337a4912f7fae484541d00997a2460d`
- **Evidence:** PR #9 is merged and Vercel succeeded. The PR author explicitly could not install dependencies or run tests locally.
- **Scope:** Verify the merged commit from a clean checkout; run focused List/Dashboard regression tests, the full client suite, lint/type-check/build where defined, and executable Europe/London boundary cases; manually inspect structured values and loading/error/empty states; produce a pass/fail recommendation.
- **Out of scope:** Reverting or changing implementation before a failure is classified; merging other PRs; changing timezone policy; unrelated Brain refactors.
- **Dependencies:** Repository checkout and dependency access.
- **Required approval:** No additional approval for read-only verification. Any fix requires a new or reclassified task.
- **Acceptance criteria:** Every original PR #9 acceptance behavior is exercised; command outputs and boundary cases are recorded; the working tree remains clean; failures become traceable tasks; the merged work receives an explicit verified/not-verified outcome.
- **Verification required:** Focused tests; full client tests; lint/type-check/build where present; Europe/London date-boundary cases; manual UI inspection; `git status --short`.
- **Branch:** No branch for read-only verification; create an isolated fix branch only after a separate task becomes `ready`.
- **Pull request:** #9, merged.
- **Verification evidence:** Vercel success only; executable verification pending.
- **Outcome:** Not started.

## 2026-07-18-002-devkofi-T004 — Add server CI validation and integration coverage for Telegram notifications

- **Project:** DevKofi
- **Repository:** `kofiarhin/devkofi`
- **Task type:** Maintenance and test hardening
- **Priority:** P1 — High
- **Priority rationale:** Recent production-facing server changes do not trigger the current client-only workflow, so backend regressions can merge without CI evidence.
- **Status:** `ready`
- **Source document:** `.github/workflows/ci.yml`; root `package.json`; Telegram service/controllers/tests; `projects/devkofi.md`
- **Source section or requirement:** Testing baseline and best-effort Telegram notification decisions
- **Audited revision:** Repository `3c42e10712b3c60a0ee24e855823039be027e617`; workflow `0465bea1f6c7d8d3ba445e76eb9e5afdf854b794`; package `626c45443cfffbd32ebfede640a906f16bd4580d`; service `e1cec04f8a201860b8b16384cd166962111f5378`; service test `5e3c03c5cca3cf2e78c470ebbf0ca05c67d54a1a`
- **Evidence:** The workflow is path-filtered to `client/**` and deploys the client. Root Jest tests are not run for `server/**` changes. Telegram service unit tests exist, but controller-level failure behavior was not found.
- **Scope:** Add a non-deploy server validation job triggered by server/root dependency/workflow changes; use the repository lockfile and supported Node version; run root Jest tests; add focused controller/integration tests proving MongoDB persistence succeeds before notification, disabled/missing configuration skips safely, Telegram failures do not change successful API responses, and user content remains escaped at the service boundary.
- **Out of scope:** Configuring real Telegram credentials; sending production messages; changing enrolment/contact product behavior; redesigning deployment; unrelated dependency upgrades.
- **Dependencies:** Repository checkout and test database support already used by the project.
- **Required approval:** No additional product approval required for bounded CI/test hardening. Workflow permission or deployment changes beyond validation require separate approval.
- **Acceptance criteria:** Server/root changes trigger CI; tests run without external Telegram access; focused integration coverage proves best-effort behavior; failures block the validation job; secrets are never echoed; existing client deploy behavior remains unchanged.
- **Verification required:** Clean `npm ci`; focused Jest tests; full root Jest suite; workflow syntax review; test the path filters; inspect logs for token/chat-ID leakage; client workflow regression review.
- **Branch:** `ci/server-validation-telegram`
- **Pull request:** None.
- **Verification evidence:** Source inspection complete; implementation not started.
- **Outcome:** Not started.

## 2026-07-18-002-devkofi-T005 — Configure and smoke-test DevKofi Telegram notifications in production

- **Project:** DevKofi
- **Repository:** `kofiarhin/devkofi`
- **Task type:** Production configuration and verification
- **Priority:** P1 — High
- **Priority rationale:** The feature is implemented but disabled until production secrets and the enable flag are configured; enabling it changes external production behavior.
- **Status:** `needs_approval`
- **Source document:** `projects/devkofi.md`; `.env.example`; Telegram service implementation
- **Source section or requirement:** Current Focus and Next Actions — production configuration and end-to-end delivery
- **Audited revision:** Repository `3c42e10712b3c60a0ee24e855823039be027e617`; Ideas Hub `14528bcb7226e7537171fde75f6aff752acf7efe`
- **Evidence:** `.env.example` defines `TELEGRAM_NOTIFICATIONS_ENABLED=false`, `TELEGRAM_BOT_TOKEN`, and `TELEGRAM_CHAT_ID`. No deployment-provider state or end-to-end evidence was available.
- **Scope:** After T004 passes, configure the bot token, private chat ID, and enable flag in the deployed API secret store; submit one production-safe contact and one booking/enrolment; confirm MongoDB persistence, API success, private Telegram delivery, escaped content, and no duplicate notification.
- **Out of scope:** Writing secrets to Git, exposing credentials in chat/run files, changing notification recipients, bulk production submissions, or changing business workflows.
- **Dependencies:** T004 completed; explicit user approval; access to the deployed API environment, Telegram bot/chat, and production-safe test data.
- **Required approval:** Explicit approval required for production secret-store changes and live test submissions.
- **Acceptance criteria:** Secrets exist only in approved provider storage; notifications are enabled; both production-safe test submissions persist and deliver exactly once; API success is independent of delivery; evidence contains no secret values.
- **Verification required:** Provider configuration review; production-safe contact and booking; database confirmation; Telegram receipt confirmation; failure/disable rollback check; log review for secret leakage.
- **Branch:** No branch expected unless a separately approved documentation or code fix is required.
- **Pull request:** None.
- **Verification evidence:** Not run.
- **Outcome:** Pending approval.

## 2026-07-18-002-archon-T006 — Implement Archon Phase 1 workspace bootstrap and CI baseline

- **Project:** Archon
- **Repository:** `kofiarhin/archon`
- **Task type:** Approved foundation implementation
- **Priority:** P1 — High
- **Priority rationale:** The approved plan's first bounded work item is a prerequisite for all later Archon phases and has explicit deliverables and acceptance checks.
- **Status:** `ready`
- **Source document:** `docs/specs/IMPLEMENTATION_PLAN.md`; `docs/specs/MVP_IMPLEMENTATION_SPEC.md`; `projects/archon.md`
- **Source section or requirement:** Phase 1.1 Workspace bootstrap and Phase 1.2 CI baseline
- **Audited revision:** Repository `f89140062b069487c35319b525cc15aae100dc8b`; plan `bb782597a39127399ed88bc50b0a4c2afe6deb56`; implementation spec `b013c38f06fcf2dac108d272771b8d02d95eb9ab`; Ideas Hub `497c0b9a8cc35b7c8791162cfea18a6750ac5acb`
- **Evidence:** PR #2 merged the approved implementation plan. Main has no root `package.json` and no application implementation. Phase 1.1/1.2 define the workspace, app boundaries, config validation, Docker services, quality checks, and CI acceptance criteria.
- **Scope:** Test-first bootstrap a pnpm workspace with `apps/web`, `apps/worker`, approved shared package boundaries, shared TypeScript config, ESLint, Prettier, import-boundary enforcement, validated runtime configuration, Docker Compose for local PostgreSQL/Redis, documented local commands, and GitHub Actions for format, lint, type-check, tests, migration validation placeholder/contract, build, and supported dependency/secret scanning. Keep the web and worker minimally runnable.
- **Out of scope:** Phase 1.3 Prisma schema/migrations/repositories/outbox implementation; authentication; project intake; AI provider integration; production hosting choice; post-MVP features.
- **Dependencies:** None beyond repository/dependency/Docker access.
- **Required approval:** Already covered by the merged approved implementation plan. Any architecture, dependency-family, security-boundary, or scope deviation requires approval.
- **Acceptance criteria:** Fresh `pnpm install` succeeds; web and worker start locally; invalid configuration fails safely without revealing secrets; app packages cannot import each other's internals; PostgreSQL/Redis start through Docker Compose; required CI checks run on PRs and block completion on failure; build artifacts exclude `.env` and credentials; local setup is documented.
- **Verification required:** Clean clone/install; format; lint; type-check; unit tests; production builds; web/worker startup; invalid-config tests; import-boundary tests; Docker Compose health; workflow review/run; secret scan; `git status --short`.
- **Branch:** `feat/phase-1-foundation`
- **Pull request:** None.
- **Verification evidence:** Authority and gap verified; implementation not started.
- **Outcome:** Not started.

## 2026-07-18-002-archon-T007 — Reconcile Archon authority-document approval status

- **Project:** Archon
- **Repository:** `kofiarhin/archon`
- **Task type:** Documentation and authority maintenance
- **Priority:** P2 — Medium
- **Priority rationale:** Merged authority documents still say proposed or awaiting review, creating avoidable ambiguity for agents and contributors.
- **Status:** `ready`
- **Source document:** `README.md`; `docs/specs/MVP_IMPLEMENTATION_SPEC.md`; `docs/specs/IMPLEMENTATION_PLAN.md`; Archon PR #2
- **Source section or requirement:** Project status and document status headers
- **Audited revision:** Repository `f89140062b069487c35319b525cc15aae100dc8b`; README `204930a4bd5c3fb5529f18886147aa203942a7ec`; spec `b013c38f06fcf2dac108d272771b8d02d95eb9ab`; plan `bb782597a39127399ed88bc50b0a4c2afe6deb56`
- **Evidence:** PR #2 is merged and the Ideas Hub records approval, while the files still say proposed or must be reviewed before implementation.
- **Scope:** Update status labels and project-status wording to state that the exact merged revisions are approved; link the approving PR/merge commit where useful; preserve every requirement, decision, risk, acceptance criterion, and scope boundary unchanged.
- **Out of scope:** Revising architecture, technology choices, retention defaults, acceptance criteria, implementation sequence, or product scope.
- **Dependencies:** None. May be included in T006's branch only if kept as a distinct commit and clearly reviewed.
- **Required approval:** No additional approval for factual reconciliation of already approved revisions. Any substantive content change requires approval.
- **Acceptance criteria:** README/spec/plan agree that merged PR #2 is approved; no requirement or acceptance criterion changes; approval applies to the exact merged revision; proposed post-MVP content remains labelled proposed.
- **Verification required:** Semantic diff review; compare against PR #2 and `projects/archon.md`; links resolve; documentation checks pass.
- **Branch:** `docs/approved-spec-status` or a distinct commit in T006's branch.
- **Pull request:** None.
- **Verification evidence:** Drift confirmed.
- **Outcome:** Not started.

## 2026-07-18-002-piano360-T008 — Recover Phase 0 audit evidence and approve the first Guided Learning implementation slice

- **Project:** Piano360
- **Repository:** `kofiarhin/piano360`
- **Task type:** Evidence reconciliation and implementation approval
- **Priority:** P1 — High
- **Priority rationale:** The approved plan is ready, and the project record says Phase 0 is complete, but the findings needed to select a safe first implementation task are not linked.
- **Status:** `blocked`
- **Source document:** `projects/piano360.md`; `docs/plans/guided-learning-mode.md`; Piano360 PR #2
- **Source section or requirement:** Phase 0 exit criteria; Current Priority and Next Actions
- **Audited revision:** Repository `5e7fe9555312f10432519ee18ae4a2dc3d63c01a`; plan `634a4d5c5882cb759dcad8e340f8bae52c560136`; Ideas Hub `5d3b19950139152c0a7d88e2ee86b923c84c0bbe`
- **Evidence:** The plan is marked ready for implementation and PR #2 is merged. The durable project record says Phase 0 audit completed, but no linked audit matrix identifies input/progress boundaries, selected lesson, required schema changes, conflicts, or first task.
- **Scope:** Locate the completed audit artifact or reconstruct it read-only; record the requirement-to-code/test/data matrix; identify the first seeded lesson and minimal schema impact; propose one bounded test-first implementation slice; obtain explicit approval before code changes.
- **Out of scope:** Implementing Guided Learning; choosing a lesson or schema change without evidence; beginning multiple phases; unrelated player refactors.
- **Dependencies:** Access to the completed Phase 0 audit evidence or repository/dependency environment to reconstruct it.
- **Required approval:** Explicit approval required for the selected first implementation slice after evidence review.
- **Acceptance criteria:** Phase 0 exit criteria have traceable evidence; conflicts and missing tests are visible; one bounded task has scope/out-of-scope, acceptance criteria, verification, and branch plan; user approves or requests revision.
- **Verification required:** Source/test/seed/API inspection; relevant current tests/type-check/build where available; compare against approved spec/plan; record exact commit.
- **Branch:** None for evidence reconciliation; implementation branch only after approval.
- **Pull request:** #2, merged documentation authority.
- **Verification evidence:** Plan and project claim exist; detailed audit evidence unavailable.
- **Outcome:** Blocked on evidence access, then approval.

## 2026-07-18-002-amas-kitchen-T009 — Update Amas Kitchen context for resolved PR dispositions

- **Project:** Amas Kitchen
- **Repository:** `kofiarhin/ideas`
- **Task type:** Context maintenance
- **Priority:** P2 — Medium
- **Priority rationale:** The canonical project record incorrectly says PRs #4 and #5 remain open, which can misdirect future work.
- **Status:** `ready`
- **Source document:** `projects/amas-kitchen.md`; Amas Kitchen PRs #4 and #5
- **Source section or requirement:** Links, Current State, Current Focus, Decisions, Open Questions, and Next Actions
- **Audited revision:** Ideas Hub `2159d7b655dbbf003c6cd18b0ff6cf10b4b5a059`; Amas Kitchen main `5f2f0cb5df73ec74596d45be40ceb1dc3f53fd85`
- **Evidence:** PR #4 is closed without merge and retitled superseded. PR #5 is merged at `5f2f0cb...` with a successful Vercel status.
- **Scope:** Update only factual PR state and merged shortlist context; record PR #4 as superseded, PR #5 as merged, current head, remaining unapproved brand/CTA/assets/delivery decisions, and the exact next action.
- **Out of scope:** Approving homepage direction; claiming local test execution; changing lifecycle/priority; modifying Amas Kitchen source; inventing brand assets or business details.
- **Dependencies:** None.
- **Required approval:** No additional approval for verified factual context maintenance.
- **Acceptance criteria:** Project record no longer describes closed/merged PRs as open; links and revisions are correct; uncertainty remains explicit; `Last updated` is refreshed; no unrelated records change.
- **Verification required:** Fetch current PR states and main head; diff review; link check; standard project structure check.
- **Branch:** Ideas Hub isolated context branch.
- **Pull request:** None.
- **Verification evidence:** PR states and main head verified.
- **Outcome:** Not started.

## 2026-07-18-002-amas-kitchen-T010 — Approve the next Amas Kitchen homepage direction

- **Project:** Amas Kitchen
- **Repository:** `kofiarhin/amas-kitchen`
- **Task type:** Product and design approval
- **Priority:** P1 — High
- **Priority rationale:** The prior hero brief was superseded and the inspiration shortlist is now merged, but implementation cannot proceed without brand and conversion decisions.
- **Status:** `needs_approval`
- **Source document:** `projects/amas-kitchen.md`; merged design inspiration shortlist; superseded PR #4
- **Source section or requirement:** Current Focus, Decisions, Open Questions, and Next Actions
- **Audited revision:** Main `5f2f0cb5df73ec74596d45be40ceb1dc3f53fd85`; Ideas Hub `2159d7b655dbbf003c6cd18b0ff6cf10b4b5a059`
- **Evidence:** Existing routes/data behavior must be preserved. The unresolved decisions are primary CTA, Accra/Lapaz delivery wording, brand tone, approved logo, approved photography, and whether the shortlist is review UI or product UI.
- **Scope:** Review the merged shortlist and current homepage; approve target audience/location wording, one primary CTA, supporting CTA, delivery language, brand tone, logo/photography sources, shortlist disposition, and one bounded implementation section with testable acceptance criteria.
- **Out of scope:** Implementing before approval; changing ordering/payment flows; inventing assets; broad site redesign; reviving superseded PR #4 unchanged.
- **Dependencies:** Human/client decisions and approved asset access.
- **Required approval:** Explicit product/design approval required.
- **Acceptance criteria:** Every material decision is approved or marked with an explicit placeholder; one normalized implementation-ready direction exists; assets have references/owners; scope and verification are testable.
- **Verification required:** Visual/content review against current main and routes/data behavior; accessibility and responsive criteria; asset/license review; approved handoff.
- **Branch:** None until approval.
- **Pull request:** PR #4 closed; PR #5 merged.
- **Verification evidence:** Repository and PR state verified; direction unresolved.
- **Outcome:** Pending approval.

## 2026-07-18-002-memory-sequence-game-T011 — Deploy Memory Game to Vercel and record release evidence

- **Project:** Memory Sequence Game
- **Repository:** `kofiarhin/memory-game`
- **Task type:** Deployment and release verification
- **Priority:** P1 — High
- **Priority rationale:** Vercel is the approved frontend target, but no production project, URL, owner, smoke result, or rollback evidence exists.
- **Status:** `blocked`
- **Source document:** `projects/memory-sequence-game.md`; approved `PRD.md`; prior run report
- **Source section or requirement:** Decisions and Next Actions — deploy current static frontend to Vercel
- **Audited revision:** Repository `3073edad00666fd8538af68ada4727639050aa16`; Ideas Hub `4be662b8fad08fe062032a121365e88a4f747986`
- **Evidence:** The MVP is implemented and previously validated. The project record says not deployed and records Vercel as the frontend target.
- **Scope:** Create or identify the Vercel project; deploy audited `main` with the Vite build; record account/project owner, production URL, source revision, build settings, deployment result, basic gameplay smoke evidence, and rollback/removal procedure.
- **Out of scope:** Adding a backend, using Heroku for the current static app, changing gameplay, selecting post-MVP features, or claiming release readiness before T012.
- **Dependencies:** Authenticated Vercel access and ownership confirmation.
- **Required approval:** Hosting target is approved. Any paid plan, custom domain, organization transfer, or production data change requires explicit approval.
- **Acceptance criteria:** Production URL resolves; exact commit is deployed; landing/category/start/one-round/game-over/local-persistence smoke checks pass; owner and rollback process are documented; no secrets are required or exposed.
- **Verification required:** Vercel build/deploy logs; production URL; browser smoke; source/build settings; rollback test or documented safe rollback; update evidence after verification.
- **Branch:** None for deployment; source fixes require a separate task/branch.
- **Pull request:** None.
- **Verification evidence:** Blocked; no authenticated deployment access.
- **Outcome:** Blocked on Vercel access.

## 2026-07-18-002-memory-sequence-game-T012 — Complete the deployed Memory Game manual acceptance matrix

- **Project:** Memory Sequence Game
- **Repository:** `kofiarhin/memory-game`
- **Task type:** Manual acceptance verification
- **Priority:** P1 — High
- **Priority rationale:** Approved responsive, keyboard, screen-reader, reduced-motion, and non-colour feedback requirements cannot be proven by source inspection or automated tests alone.
- **Status:** `blocked`
- **Source document:** Approved `PRD.md`; `projects/memory-sequence-game.md`
- **Source section or requirement:** Accessibility, responsive behavior, and Remaining Risks
- **Audited revision:** Repository `3073edad00666fd8538af68ada4727639050aa16`; Ideas Hub `4be662b8fad08fe062032a121365e88a4f747986`
- **Evidence:** Manual mobile, desktop, keyboard, screen-reader, and reduced-motion testing remains explicitly pending.
- **Scope:** Against the deployed T011 candidate, test representative mobile/tablet/desktop viewports; touch/mouse/keyboard complete flows; focus visibility/order; announcements and accessible names; non-colour result feedback; reduced motion; optional sound fallback; long sequences; storage/refresh behavior; record every case as pass/fail/not applicable.
- **Out of scope:** Changing gameplay during verification; substituting source review for assistive-technology testing; selecting post-MVP features; silently fixing defects.
- **Dependencies:** T011 completed; representative browsers/devices; at least one screen reader.
- **Required approval:** No additional approval for verification. Defect fixes require separately classified tasks.
- **Acceptance criteria:** Matrix is complete against a fixed URL/revision; defects have reproduction evidence and severity; release recommendation is explicit; no failed case is hidden.
- **Verification required:** Manual matrix, screenshots/recordings where useful, automated test/build cross-check, retest of any approved fixes.
- **Branch:** None.
- **Pull request:** None.
- **Verification evidence:** Blocked on deployment and test-environment access.
- **Outcome:** Blocked.

## 2026-07-18-002-memory-sequence-game-T013 — Approve the Memory Game dependency reproducibility policy

- **Project:** Memory Sequence Game
- **Repository:** `kofiarhin/memory-game`
- **Task type:** Engineering policy decision
- **Priority:** P2 — Medium
- **Priority rationale:** Exact versions are pinned, but there is no lockfile and CI uses `npm install`, so transitive dependency resolution remains non-reproducible.
- **Status:** `needs_approval`
- **Source document:** `package.json`; `.github/workflows/ci.yml`; `projects/memory-sequence-game.md`
- **Source section or requirement:** Remaining Risks and Next Actions — lockfile or deliberate dependency-locking workflow
- **Audited revision:** Repository `3073edad00666fd8538af68ada4727639050aa16`; package `cf2d9d4febbb8f28ce0a9dadda8a7c3eb9b17400`; CI `dc2aabe9943476084b34a1fcf9d8dd414f23e418`
- **Evidence:** `package-lock.json` is absent; CI runs `npm install`; direct dependencies are pinned to exact versions.
- **Scope:** Approve the recommended default of committing `package-lock.json` and using `npm ci`, or explicitly approve an alternative reproducibility policy; define dependency update cadence, CI enforcement, and verification.
- **Out of scope:** Upgrading packages, accepting breaking changes, changing application behavior, or modifying dependencies before policy approval.
- **Dependencies:** None.
- **Required approval:** Explicit approval required because the durable project record presents more than one valid policy.
- **Acceptance criteria:** One policy is selected with rationale; CI/install command and update process are documented; implementation task has clear acceptance criteria.
- **Verification required:** Lockfile option: clean `npm ci`, tests, lint, build, deterministic diff, CI update. Alternative: documented reproducibility proof and enforcement.
- **Branch:** None until policy approval.
- **Pull request:** None.
- **Verification evidence:** Gap confirmed.
- **Outcome:** Pending approval.

## 2026-07-18-002-ideas-T014 — Select the portfolio daily focus and fallback

- **Project:** Ideas Hub
- **Repository:** `kofiarhin/ideas`
- **Task type:** Portfolio discovery
- **Priority:** P1 — High
- **Priority rationale:** Brain verification, DevKofi CI hardening, and Archon foundation are all defensible P1 tasks, while the workspace explicitly forbids inferring priority from activity or project order.
- **Status:** `needs_discovery`
- **Source document:** `CONTEXT.md`; `PROJECTS.md`; this audit
- **Source section or requirement:** Current Priorities and portfolio coordination
- **Audited revision:** `CONTEXT.md` `034d28c51d6f1951ce8f17d934a64c80a8bdf47b`; `PROJECTS.md` `fe0d86cc76c85ce4979d6fd99ccfd615a6d94e9f`; run fingerprint `sha256:5f219f9c599de763b5a279b4f3ddc677b416fdc8850029924f6638aa2c8f2aed`
- **Evidence:** Current priorities are not documented. The active choices have different tradeoffs: verify existing live behavior, harden a recent backend feature, or begin a newly approved product foundation.
- **Scope:** Choose one primary focus and one fallback among Brain T003, DevKofi T004, and Archon T006; confirm whether archived security risks remain deferred; decide when focused discovery should begin for KareBraids, Codex Workflow Kit, Kflix, Banging Prices, or MoggOff.
- **Out of scope:** Changing lifecycle states; approving product scope; treating priority as implementation approval; reactivating archived projects without explicit decision.
- **Dependencies:** User choice.
- **Required approval:** User selection is the discovery outcome. Durable priority changes require explicit approval before Ideas Hub updates.
- **Acceptance criteria:** One primary focus and one fallback are named; rationale and dependencies are explicit; archived security posture is acknowledged; next discovery target, if any, is selected.
- **Verification required:** Confirm selected tasks' statuses and dependencies; ensure only `ready` work is authorized; record the decision in the execution report and project context only after approval.
- **Branch:** None for discovery.
- **Pull request:** None.
- **Verification evidence:** Not started.
- **Outcome:** Discovery required.
