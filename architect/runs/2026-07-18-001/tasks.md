# Architect Task Queue — 2026-07-18-001

## Queue Metadata

- **Run ID:** `2026-07-18-001`
- **Created:** 2026-07-18 17:38 Europe/London
- **Audit:** [`audit.md`](audit.md)
- **Ideas Hub base revision:** `2b52251c95431dd9b34d1da81fa69f33f67d272a`
- **Source fingerprint:** `sha256:ea3eef8ad0f64bf5a8efed15a70c332a03589e6a1c662bdae5c00da9d635de52`
- **Queue status:** Awaiting review, approvals, discovery, specification, and execution
- **Implementation performed by `good morning`:** None

## Status Summary

| Status | Count |
| --- | ---: |
| `ready` | 4 |
| `needs_approval` | 8 |
| `needs_spec` | 1 |
| `needs_discovery` | 8 |
| `blocked` | 3 |
| **Total** | 24 |

## Execution Rules

- Process the queue in the order below, respecting dependencies and repository isolation.
- Only tasks with status `ready` may enter implementation or verification.
- Security containment is ordered first. No credential, session, deployment, history, merge, closure, design, lifecycle, or authority-document mutation is authorized by this queue alone.
- A task becoming higher priority does not bypass its approval, discovery, specification, or dependency gate.
- Use separate branches, commits, and pull requests for unrelated repositories or tasks.
- Update statuses and create `report.md` only through the approved `run all tasks` workflow.

## 2026-07-18-001-taxify-T001 — Contain the public Taxify seeded credential exposure

- **Project:** Taxify
- **Repository:** `kofiarhin/taxify`
- **Task type:** Security incident response
- **Priority:** P0 — Critical
- **Priority rationale:** A credential for a seeded administrator is exposed in public commit metadata, and the seed workflow uses a predictable fallback and logs the effective password.
- **Status:** `needs_approval`
- **Source document:** `projects/taxify.md`; repository head and `server/scripts/seedUsers.js`
- **Source section or requirement:** Verified repository security gap; credential hygiene
- **Audited revision:** Ideas Hub `a2f83dfc4243455c4c5545ab17d8935cf27f97cd`; repository `ecff7e6661f5543ba7112b759d1fa69101ef3944`; seed script blob `06af0dcfc42d195f81c2185762ff29b2a9fb9957`
- **Evidence:** The public head commit exposes a seeded administrator credential in commit metadata. The seed script has a predictable fallback password, resets seeded passwords by default, and prints the effective password.
- **Scope:** Confirm every environment where the seeded identity may exist; rotate affected credentials; invalidate relevant sessions/tokens; remove the insecure fallback and password logging; add safe seed-secret validation; decide and execute public-history remediation only if approved; verify old credentials no longer authenticate.
- **Out of scope:** Changing unrelated Taxify features, redesigning authentication, resetting databases, or rewriting Git history without explicit approval.
- **Dependencies:** Access to the affected database/deployment/session stores and confirmation of the environments to treat as impacted.
- **Required approval:** Required before credential rotation, session invalidation, source changes, or Git-history rewriting. History rewriting requires separate explicit approval because it is destructive.
- **Acceptance criteria:** Affected environments are documented; credentials are rotated; old credentials fail; active sessions/tokens are invalidated where applicable; seed execution requires an explicit non-default secret; seed logs do not reveal passwords; any approved history remediation is completed and documented.
- **Verification required:** Authentication attempt with old credential fails; new credential works only in intended environment; automated seed tests or a safe dry run pass; secret scanning confirms no newly introduced credential value; relevant tests/lint/build pass; post-remediation Git history and deployment state are recorded.
- **Branch:** Not assigned until approval; use an isolated security branch if source changes are approved.
- **Pull request:** None.
- **Verification evidence:** Not run.
- **Outcome:** Pending approval.

## 2026-07-18-001-projectos-T002 — Rotate the ProjectOS MongoDB credential recorded as exposed

- **Project:** ProjectOS
- **Repository:** `kofiarhin/projectos`
- **Task type:** Security incident response
- **Priority:** P0 — Critical
- **Priority rationale:** The durable ProjectOS record says a MongoDB credential was visible in a screenshot and should be rotated; continued validity has not been disproven.
- **Status:** `needs_approval`
- **Source document:** `projects/projectos.md`
- **Source section or requirement:** Risks and Open Questions — exposed MongoDB credentials
- **Audited revision:** Ideas Hub `5653636820b2d200d207e8b71bef1863f4c02bcc`; repository `583f005d33649d033622bf037256fd0499e7040c`
- **Evidence:** The project record explicitly states that MongoDB credentials previously visible in a screenshot should be rotated.
- **Scope:** Identify the credential and environment; rotate/revoke it at the provider; update only local uncommitted configuration or approved secret stores; invalidate the old value; verify ProjectOS connectivity; confirm logs, screenshots, and tracked files do not expose the replacement.
- **Out of scope:** Committing secrets, changing ProjectOS product scope, modifying database data, or rotating unrelated credentials.
- **Dependencies:** Access to the MongoDB provider and the affected local/deployment secret configuration.
- **Required approval:** Required because credential rotation and secret-store changes are security-sensitive.
- **Acceptance criteria:** The affected credential is identified; replacement credential is installed in approved secret locations; old credential is revoked; ProjectOS connects successfully with the replacement; no replacement secret is committed or logged.
- **Verification required:** Provider confirms revocation; old connection fails; `projectos doctor` or equivalent approved connection check passes with the replacement; repository secret scan and `git status` confirm no secret was written.
- **Branch:** No branch expected unless documentation or validation code changes are separately approved.
- **Pull request:** None.
- **Verification evidence:** Not run.
- **Outcome:** Pending approval.

## 2026-07-18-001-projectos-T003 — Independently verify ProjectOS Phase 0 from a clean checkout

- **Project:** ProjectOS
- **Repository:** `kofiarhin/projectos`
- **Task type:** Verification
- **Priority:** P1 — High
- **Priority rationale:** Repository evidence says Phase 0 is finalized, but no connector-visible workflow run is attached to the audited head and the Ideas Hub still records closure steps as pending.
- **Status:** `ready`
- **Source document:** `docs/IMPLEMENTATION_PLAN.md`; `summary/PROJECT_SUMMARY.md`; `.github/workflows/ci.yml`; `projects/projectos.md`
- **Source section or requirement:** Phase 0 exit criteria and project next actions
- **Audited revision:** Repository `583f005d33649d033622bf037256fd0499e7040c`; plan blob `2f29b83094d2e19566640cc381dcaa4a0d5c73fe`; summary blob `813b383fb739ad471469a56478655f4654cf6574`; Ideas Hub `5653636820b2d200d207e8b71bef1863f4c02bcc`
- **Evidence:** The repository summary claims all Phase 0 validation commands pass. The CI workflow defines `npm ci`, lint, typecheck, test, and build. The audited head has no connector-visible workflow run.
- **Scope:** Use a clean checkout of the audited head; run installation, lint, typecheck, tests, build, documented CLI help/version/doctor checks, and clean-working-tree verification; record exact commands and outputs; do not change implementation unless a failure creates a separately classified task.
- **Out of scope:** Beginning Phase 1, changing product behavior, fixing unrelated failures without a new task, or updating Ideas Hub before verification passes.
- **Dependencies:** None beyond repository access and a suitable local MongoDB/configuration setup for documented doctor checks.
- **Required approval:** No additional approval required for read-only verification. Any source change discovered as necessary requires a new or reclassified task.
- **Acceptance criteria:** All Phase 0 exit criteria are executed against the audited head; every check has pass/fail evidence; the working tree remains clean; limitations are explicit.
- **Verification required:** `npm ci`; `npm run lint`; `npm run typecheck`; `npm test`; `npm run build`; CLI `--help`, `--version`, and `doctor`; `git status --short`; compare results with the Phase 0 plan.
- **Branch:** Not required for read-only verification; create an isolated branch only if an approved evidence document must be added.
- **Pull request:** None.
- **Verification evidence:** Repository-reported validation exists; independent run pending.
- **Outcome:** Not started.

## 2026-07-18-001-projectos-T004 — Reconcile the ProjectOS Ideas Hub record after Phase 0 verification

- **Project:** ProjectOS
- **Repository:** `kofiarhin/ideas`
- **Task type:** Context maintenance
- **Priority:** P1 — High
- **Priority rationale:** The current project record says final Phase 0 verification and closure are pending, while repository evidence says the phase is finalized.
- **Status:** `blocked`
- **Source document:** `projects/projectos.md`; ProjectOS Phase 0 evidence
- **Source section or requirement:** Current Focus and Next Actions
- **Audited revision:** Ideas Hub `5653636820b2d200d207e8b71bef1863f4c02bcc`; ProjectOS `583f005d33649d033622bf037256fd0499e7040c`
- **Evidence:** The Ideas Hub and repository disagree about whether Phase 0 is formally complete.
- **Scope:** After T003 passes, update `projects/projectos.md` with verified Phase 0 status, commands/evidence, remaining risks, Phase 1 readiness, and exact next action; update root index/context only if their broad statements materially change.
- **Out of scope:** Changing ProjectOS source, silently marking Phase 1 ready, removing unresolved security or specification risks, or updating unrelated project records.
- **Dependencies:** T003 completed with passing evidence; T002 status preserved accurately.
- **Required approval:** No additional product approval required for a factual verified context update. Any lifecycle or priority change requires explicit approval.
- **Acceptance criteria:** Project record matches verified repository state; unresolved security and Phase 1 specification gaps remain visible; links and revisions are recorded; no unrelated records change.
- **Verification required:** Diff review against T003 evidence; links resolve; `Last updated` is refreshed; repository status and run report record the exact update.
- **Branch:** To be created by `run all tasks` in an Ideas Hub-specific branch.
- **Pull request:** None.
- **Verification evidence:** Blocked on T003.
- **Outcome:** Blocked.

## 2026-07-18-001-projectos-T005 — Specify ProjectOS Phase 1 domain and persistence contracts

- **Project:** ProjectOS
- **Repository:** `kofiarhin/projectos`
- **Task type:** Specification
- **Priority:** P1 — High
- **Priority rationale:** Phase 1 is the documented next phase, but broad deliverables are not sufficient to implement models and state transitions safely.
- **Status:** `needs_spec`
- **Source document:** `docs/PRD.md`; `docs/ARCHITECTURE.md`; `docs/IMPLEMENTATION_PLAN.md`; `AGENTS.md`
- **Source section or requirement:** Phase 1 — Domain and Persistence; functional requirements and state-transition constraints
- **Audited revision:** Repository `583f005d33649d033622bf037256fd0499e7040c`; PRD blob `0da5b2a9e976a6da1a4bfb69b5fdc4f59dff5516`; architecture blob `65e1491cf2e25801f019836bd8add1e583766721`; plan blob `2f29b83094d2e19566640cc381dcaa4a0d5c73fe`
- **Evidence:** The database package is still a Phase 0 placeholder. Authority documents name entities and deliverables but do not provide field-level schemas, enum/state-transition tables, index/uniqueness rules, repository/service contracts, migration/seed strategy, or a complete test matrix.
- **Scope:** Draft an implementation-ready Phase 1 specification covering Workspace, Project, Request, Specification, Plan, Task, Agent, Run, Report, Activity, Settings and related value objects; define statuses/transitions, invariants, timestamps/revisions, indexes, repository/service interfaces, activity-event requirements, migration/seed approach, error behavior, and acceptance tests.
- **Out of scope:** Implementing Mongoose models, writing production persistence code, beginning Phase 2, adding APIs/UI, or changing approved MVP scope.
- **Dependencies:** T003 should confirm Phase 0 baseline. Resolve any material conflict found during specification.
- **Required approval:** Draft specification requires explicit approval before implementation tasks become `ready`.
- **Acceptance criteria:** Every Phase 1 entity has fields/types/required/default rules; state transitions and invariants are tabulated; index and uniqueness rules are defined; repository/service boundaries are clear; activity events are mapped; migration/seed behavior is documented; acceptance criteria and Jest/Vitest test matrix are implementation-ready.
- **Verification required:** Cross-check against PRD, architecture, implementation plan, agent contract, and security boundaries; review for CLI-first/no-server compliance; record unresolved decisions; obtain explicit approval.
- **Branch:** Specification branch to be created after discovery begins.
- **Pull request:** None.
- **Verification evidence:** Not started.
- **Outcome:** Specification required.

## 2026-07-18-001-brain-T006 — Verify Brain PR #9 against current main

- **Project:** Brain
- **Repository:** `kofiarhin/brain`
- **Task type:** PR verification
- **Priority:** P1 — High
- **Priority rationale:** PR #9 addresses confirmed user-facing data rendering, dashboard state, and timezone bugs, is mergeable, but lacks executed test evidence and has diverged from a substantially newer main.
- **Status:** `ready`
- **Source document:** Brain PR #9; current main implementation
- **Source section or requirement:** Structured list rendering, Dashboard loading/error/empty states, Europe/London day calculations
- **Audited revision:** Main `c86d02828cae92943460f8124d2eb7ddddaac767`; PR head `9d0f97658a7bfb440f2781c1476c20002785e605`; Ideas Hub `7e5b6fc25d8bb4eaf10e938c4171ef821dcbd9a3`
- **Evidence:** PR #9 is mergeable and Vercel succeeded, but its author could not run tests. Main's shared `List` still renders raw items directly and can stringify structured objects.
- **Scope:** Rebase or test-apply PR #9 onto current main without merging; inspect conflicts/overlap; run focused regression tests plus full client tests, lint/typecheck/build as supported; verify Europe/London calculations; produce a merge/changes-needed recommendation.
- **Out of scope:** Merging the PR, altering unrelated Brain features, changing timezone policy, or combining PR #9 with PRs #6/#10.
- **Dependencies:** Repository access and current dependency installation.
- **Required approval:** No additional approval for verification. Explicit approval is required before merge or any material scope change.
- **Acceptance criteria:** PR #9 behavior is tested against current main; overlap/conflicts are documented; tests and build results are recorded; recommendation states merge as-is, update, or close.
- **Verification required:** Focused List/Dashboard tests; full client suite; lint/typecheck/build where defined; manual inspection of structured values and Europe/London boundary cases; clean diff review.
- **Branch:** Use PR branch `audit-data-flow-ux-fixes` or an isolated verification branch; do not merge.
- **Pull request:** #9
- **Verification evidence:** Vercel success; local tests not previously run.
- **Outcome:** Not started.

## 2026-07-18-001-brain-T007 — Resolve whether Brain PR #10 is superseded or needs selective reconciliation

- **Project:** Brain
- **Repository:** `kofiarhin/brain`
- **Task type:** PR reconciliation
- **Priority:** P1 — High
- **Priority rationale:** Authenticated read-only chat already exists on main with later fallback changes, while PR #10 remains open, conflicted, and diverged.
- **Status:** `needs_approval`
- **Source document:** Brain PR #10; current main chat implementation; `projects/brain.md`
- **Source section or requirement:** Authenticated read-only chat direction
- **Audited revision:** Main `c86d02828cae92943460f8124d2eb7ddddaac767`; PR head `d37af0fdd831a8f488fc0818e4141c0f3f989acf`; Ideas Hub `7e5b6fc25d8bb4eaf10e938c4171ef821dcbd9a3`
- **Evidence:** Main contains chat models, controller, services, UI, and a local fallback. PR #10 is conflicted and diverged from main; its original feature direction is already substantially implemented.
- **Scope:** Compare PR #10 with current main; identify unique missing changes, regressions, or obsolete changes; recommend closing as superseded or creating a focused follow-up for approved missing behavior.
- **Out of scope:** Blindly resolving conflicts, merging the original PR, removing current fallback behavior, changing providers, or enabling chat writes/streaming.
- **Dependencies:** User decision on whether the current main chat behavior is accepted and whether any PR-only behavior remains desired.
- **Required approval:** Required to close as superseded, preserve/reject differing behavior, or authorize a new focused implementation.
- **Acceptance criteria:** A file/behavior reconciliation is documented; every material PR-only difference is classified; user approves close, retain, or follow-up direction; no code changes occur before approval.
- **Verification required:** Compare commits/diffs; run existing chat tests on current main if available; inspect auth/read-only/provider/error contracts; record the approved disposition.
- **Branch:** Existing PR branch `agent-zero/implement-authenticated-ai-chat-interface`; no changes until approved.
- **Pull request:** #10
- **Verification evidence:** Vercel success and PR-reported tests/build; conflict and divergence unresolved.
- **Outcome:** Pending approval.

## 2026-07-18-001-brain-T008 — Decide the future of Brain PR #6 modular agent instructions

- **Project:** Brain
- **Repository:** `kofiarhin/brain`
- **Task type:** Authority-document decision
- **Priority:** P2 — Medium
- **Priority rationale:** PR #6 changes repository-wide agent authority files and is conflicted; silently resolving it could alter workflow precedence.
- **Status:** `needs_approval`
- **Source document:** Brain PR #6
- **Source section or requirement:** Repository agent instruction architecture
- **Audited revision:** Main `c86d02828cae92943460f8124d2eb7ddddaac767`; PR head `4216e84b316ef5a8e2dcdc1ed03402321c5be4f2`
- **Evidence:** The PR replaces the root authority file with a module map and adds eight instruction modules. It is conflicted and predates later main changes.
- **Scope:** Review current root instructions versus the proposed modules; identify lost, duplicated, or conflicting rules; recommend refresh, redesign, or closure.
- **Out of scope:** Resolving conflicts, changing workflow semantics, merging, or deleting current instructions without approval.
- **Dependencies:** None, but the decision should account for the current Brain command system and any later authority-file changes.
- **Required approval:** Required because this changes repository-wide agent governance and PR disposition.
- **Acceptance criteria:** Current and proposed instruction precedence are compared; material semantic changes are listed; user approves refresh, close, or replace direction.
- **Verification required:** Diff and precedence review; check every current rule has an authoritative destination; validate links/module load order in any later approved implementation.
- **Branch:** Existing PR branch `refactor/modular-agents-md`.
- **Pull request:** #6
- **Verification evidence:** No independent verification established.
- **Outcome:** Pending approval.

## 2026-07-18-001-piano360-T009 — Review and approve Piano360 Guided Learning Mode PR #2

- **Project:** Piano360
- **Repository:** `kofiarhin/piano360`
- **Task type:** Specification approval
- **Priority:** P1 — High
- **Priority rationale:** PR #2 contains the specification and phased plan needed to govern the next guided-learning work; it is not yet authority on main.
- **Status:** `needs_approval`
- **Source document:** Piano360 PR #2
- **Source section or requirement:** Guided Learning Mode specification and plan
- **Audited revision:** Main `7b70fed89d95f869e90a110d2a8fa7a527ee4509`; PR head `2a481dd4120b13c394b1fbaf51cacf11a84531e7`; Ideas Hub `f4d0a0e1006cef1564fb44a55b1de37efbbc5c68`
- **Evidence:** The PR is mergeable, documentation-only, and has a successful Vercel status. Its body says the documents are approved and the next action is a Phase 0 audit, but merge/user approval has not occurred in this run.
- **Scope:** Review requirements, pause-and-wait progression, input normalization, states, persistence, accessibility, API boundaries, risks, acceptance criteria, and phase plan; reconcile with recent guided press-only implementation; approve changes or request revisions; merge only after explicit approval.
- **Out of scope:** Beginning implementation, silently treating the PR as merged authority, or changing unrelated Piano360 course scope.
- **Dependencies:** User review of product behavior and acceptance criteria.
- **Required approval:** Explicit approval required for the specification/plan and merge.
- **Acceptance criteria:** Material decisions and conflicts with current implementation are resolved; acceptance criteria are testable; plan phases are scoped; user explicitly approves or requests revisions; merge disposition is recorded.
- **Verification required:** Document review against `AGENTS.md`, README, current guided-player code/tests, accessibility and persistence constraints; Vercel status remains successful; post-merge main contains exact approved revisions.
- **Branch:** `docs/guided-learning-mode`
- **Pull request:** #2
- **Verification evidence:** Vercel success; documentation-only.
- **Outcome:** Pending approval.

## 2026-07-18-001-piano360-T010 — Run the Guided Learning Mode Phase 0 implementation audit

- **Project:** Piano360
- **Repository:** `kofiarhin/piano360`
- **Task type:** Repository audit
- **Priority:** P1 — High
- **Priority rationale:** The proposed plan explicitly makes a current-state audit the next action, and recent guided-player implementation may overlap the planned work.
- **Status:** `blocked`
- **Source document:** Piano360 PR #2 plan
- **Source section or requirement:** Phase 0 — audit current lesson page, input, progress adapter, lesson schema, and candidate guided lesson
- **Audited revision:** Main `7b70fed89d95f869e90a110d2a8fa7a527ee4509`; PR head `2a481dd4120b13c394b1fbaf51cacf11a84531e7`
- **Evidence:** Main contains guided press-only behavior and recorded focused tests/typecheck/build. The proposed plan says to audit current capabilities before implementation.
- **Scope:** After T009 approval/merge, map current lesson page, piano input events, timeline/guided controller, local progress adapter, API lesson schema, seed content, tests, and first candidate lesson to the approved requirements; classify implemented/partial/missing/conflicting items; produce evidence-backed tasks.
- **Out of scope:** Implementing later phases, changing course content, refactoring unrelated player code, or assuming code presence proves acceptance.
- **Dependencies:** T009 approved and the authority documents available on main.
- **Required approval:** No additional approval for a read-only audit. Generated implementation tasks must follow their own approval/status classification.
- **Acceptance criteria:** Every Phase 0 audit target is inspected; requirement-to-code matrix is complete; recent guided implementation is reconciled; risks and missing tests are identified; resulting tasks are traceable.
- **Verification required:** Source/test/config inspection; run relevant existing tests, typecheck, build, and browser tests if feasible; record commit and command evidence.
- **Branch:** Not required for read-only audit.
- **Pull request:** None.
- **Verification evidence:** Blocked on T009.
- **Outcome:** Blocked.

## 2026-07-18-001-amas-kitchen-T011 — Choose and consolidate the Amas Kitchen design direction

- **Project:** Amas Kitchen
- **Repository:** `kofiarhin/amas-kitchen`
- **Task type:** Product/design approval
- **Priority:** P1 — High
- **Priority rationale:** PR #4 explicitly waits for human decisions and conflicts with main; PR #5 introduces a separate shortlist/component without local test evidence.
- **Status:** `needs_approval`
- **Source document:** Amas Kitchen PRs #4 and #5
- **Source section or requirement:** Homepage hero/conversion strip direction and design inspiration shortlist
- **Audited revision:** Main `661212ec1be589084d9cbaaaec4fcf1bb64ace08`; PR #4 `54575d311cf9f82fdc1ff73b7dc4d02b409bdded`; PR #5 `c2380041cc3c152f6080fa5023a3aeeb030d3cee`; Ideas Hub `a4eee301239c671f547c2ab9a60d367894842e22`
- **Evidence:** PR #4 asks for logo, photography, delivery-language, CTA-priority, and brand-tone decisions. PR #5 is mergeable and adds an inspiration shortlist component but was not locally tested.
- **Scope:** Review both PRs as one decision packet; confirm brand tone, target audience/location language, primary CTA, delivery wording, logo/photography assets, and whether the shortlist is a review artifact or product UI; approve consolidation, supersession, or closure.
- **Out of scope:** Implementing the homepage, merging either PR, inventing brand assets, or changing ordering/payment behavior.
- **Dependencies:** Human/client answers and access to approved brand assets where available.
- **Required approval:** Explicit product/design approval required.
- **Acceptance criteria:** Each open design question has an approved answer or explicit placeholder; PR #4/#5 relationship is resolved; one normalized implementation-ready direction is produced; PR dispositions are approved.
- **Verification required:** Visual/content review; compare against current routes/data behavior; validate any approved spec has testable acceptance criteria and asset references.
- **Branch:** Existing branches `agent-zero/prepare-design-draft-for-ama-s-kitchen` and `design-inspiration-shortlist`.
- **Pull request:** #4 and #5
- **Verification evidence:** Both have Vercel success; #4 reports frontend tests pass; #5 lacks local test execution.
- **Outcome:** Pending approval.

## 2026-07-18-001-amas-kitchen-T012 — Sync confirmed Amas Kitchen context into Ideas Hub

- **Project:** Amas Kitchen
- **Repository:** `kofiarhin/ideas`
- **Task type:** Context maintenance
- **Priority:** P2 — Medium
- **Priority rationale:** The project record says details are unknown, while repository evidence confirms product and technical context even before final design approval.
- **Status:** `ready`
- **Source document:** `projects/amas-kitchen.md`; Amas Kitchen repository and PR evidence
- **Source section or requirement:** Snapshot, Links, Current State, Open Questions, Next Actions
- **Audited revision:** Ideas Hub `a4eee301239c671f547c2ab9a60d367894842e22`; repository `661212ec1be589084d9cbaaaec4fcf1bb64ace08`; package blob `16722ac647c772213fc58fb5d943a75138e52aaa`
- **Evidence:** The repository is a React/Vite client plus Express/Mongoose backend. PR evidence consistently identifies a premium Ghanaian kitchen, Accra/Lapaz delivery, menu ordering, services, testimonials, contact, and checkout, while design decisions remain open.
- **Scope:** Update only confirmed facts in `projects/amas-kitchen.md`; preserve uncertain lifecycle/priority; record both open PRs, approval gate, missing brand decisions, stack, and exact next action. Update root index/context only if factually necessary.
- **Out of scope:** Approving the design, claiming a live URL, inventing business details, changing lifecycle/priority, or modifying Amas Kitchen source.
- **Dependencies:** None for confirmed context; T011 outcomes may be linked later but must not be anticipated.
- **Required approval:** No additional approval for factual repository-backed context maintenance after verification. Product/lifecycle choices remain unapproved.
- **Acceptance criteria:** Project record no longer says the product and stack are wholly unknown; every new statement has repository evidence; open design decisions remain questions; no speculative facts are promoted.
- **Verification required:** Diff against repository/PR evidence; links resolve; standard project-file structure and `Last updated` are correct; no unrelated records change.
- **Branch:** To be created by `run all tasks` in an Ideas Hub-specific branch.
- **Pull request:** None.
- **Verification evidence:** Repository/PR evidence gathered; write not started.
- **Outcome:** Not started.

## 2026-07-18-001-karebraids-T013 — Decide whether to refresh or close KareBraids PR #1

- **Project:** KareBraids
- **Repository:** `kofiarhin/karebraids`
- **Task type:** PR/product-direction decision
- **Priority:** P2 — Medium
- **Priority rationale:** The PR changes the site-wide visual system, is conflicted, and predates later main changes; conflict resolution without direction could regress the current live product.
- **Status:** `needs_approval`
- **Source document:** KareBraids PR #1; `projects/karebraids.md`
- **Source section or requirement:** Dark salon theme, UI primitives, and booking inputs
- **Audited revision:** Main `3e0869f54d4de775e5ed11ac3cf62eb26252ab31`; PR head `bdd8eaa75e3ede1627986717ebef9d276dd79e06`; Ideas Hub `19c452832caf71d1c9900aa9c9c753da0ce98341`
- **Evidence:** PR #1 reports tests/lint/build pass and Vercel succeeds, but GitHub reports the branch conflicted. It proposes a broad site-wide redesign rather than a narrow bug fix.
- **Scope:** Review the current live/main visual direction against the PR; identify reusable primitives worth retaining; approve refresh/rebase, redesign from current main, or closure.
- **Out of scope:** Resolving conflicts, merging, changing booking behavior, or selecting a new visual identity without approval.
- **Dependencies:** Business owner confirmation of current brand direction and acceptable visual scope.
- **Required approval:** Explicit approval required for product/design direction and PR disposition.
- **Acceptance criteria:** Current versus proposed theme is reviewed; reusable components and obsolete overrides are classified; user approves refresh, replace, or close; any follow-up scope is bounded and testable.
- **Verification required:** Visual diff/screenshots against current main/live product; build/test/lint evidence on any later refreshed branch; booking-flow regression checks.
- **Branch:** `agent-zero/redesign-ui-with-dark-salon-theme`
- **Pull request:** #1
- **Verification evidence:** PR-reported tests/lint/build and Vercel success; conflict unresolved.
- **Outcome:** Pending approval.

## 2026-07-18-001-memory-sequence-game-T014 — Select the Memory Game deployment target and release owner

- **Project:** Memory Sequence Game
- **Repository:** `kofiarhin/memory-game`
- **Task type:** Release discovery
- **Priority:** P1 — High
- **Priority rationale:** Deployment is the first explicit next action, but hosting target, domain, environment ownership, and release criteria are not documented.
- **Status:** `needs_discovery`
- **Source document:** `projects/memory-sequence-game.md`; approved `PRD.md`
- **Source section or requirement:** Next Actions — deploy main; Remaining Risks — production hosting unverified
- **Audited revision:** Ideas Hub `0dfabce7dae296d436eb297238351de69d834164`; repository `3073edad00666fd8538af68ada4727639050aa16`; PRD blob `7051fe8417a813f49261996447d523522df099ad`
- **Evidence:** MVP is implemented and audited, but no live URL or deployment platform is recorded.
- **Scope:** Choose static hosting provider/project, production URL/domain, release owner, branch/source, build command/output, environment requirements, and rollback/removal process; define post-deploy smoke criteria.
- **Out of scope:** Deploying before the choice is approved, adding a backend/account system, selecting post-MVP features, or changing gameplay.
- **Dependencies:** User preference and access to the chosen hosting provider/domain.
- **Required approval:** Deployment target and any domain/cost choice require explicit approval.
- **Acceptance criteria:** Hosting target, project/account owner, URL/domain, build settings, release source, and smoke/rollback criteria are confirmed.
- **Verification required:** Documented settings are compatible with Vite/static output and current repository; no secret/environment dependency is overlooked.
- **Branch:** None for discovery.
- **Pull request:** None.
- **Verification evidence:** Not started.
- **Outcome:** Discovery required.

## 2026-07-18-001-memory-sequence-game-T015 — Complete the Memory Game manual acceptance matrix

- **Project:** Memory Sequence Game
- **Repository:** `kofiarhin/memory-game`
- **Task type:** Manual verification
- **Priority:** P1 — High
- **Priority rationale:** The approved PRD requires responsive, keyboard, accessible, and reduced-motion behavior that automated tests alone do not establish.
- **Status:** `blocked`
- **Source document:** Approved `PRD.md`; `projects/memory-sequence-game.md`
- **Source section or requirement:** Accessibility, responsive requirements, and remaining risks
- **Audited revision:** Repository `3073edad00666fd8538af68ada4727639050aa16`; PRD blob `7051fe8417a813f49261996447d523522df099ad`; Ideas Hub `0dfabce7dae296d436eb297238351de69d834164`
- **Evidence:** Manual mobile, desktop, keyboard, screen-reader, and reduced-motion testing is explicitly pending.
- **Scope:** Against the deployed production candidate, test representative mobile/tablet/desktop viewports; touch/mouse/keyboard complete flows; focus order/visibility; live-region and screen-reader announcements; non-colour feedback; reduced motion; optional sound fallback; long sequence layouts; refresh/storage failure behavior; record defects with reproduction evidence.
- **Out of scope:** Changing gameplay during verification, substituting automated source review for assistive-technology testing, or selecting post-MVP scope.
- **Dependencies:** T014 approved and deployment available; access to representative browsers/devices and at least one screen reader.
- **Required approval:** No additional approval for verification. Fixes discovered require separately classified tasks.
- **Acceptance criteria:** Every matrix case has pass/fail/not-applicable evidence; blockers and defects are recorded; production URL/build revision is fixed; release recommendation is explicit.
- **Verification required:** Manual matrix with screenshots/recordings where useful; cross-check automated tests/build; retest any separately approved fixes.
- **Branch:** None for verification.
- **Pull request:** None.
- **Verification evidence:** Blocked on T014 and test-environment access.
- **Outcome:** Blocked.

## 2026-07-18-001-memory-sequence-game-T016 — Approve a deliberate Memory Game dependency-locking strategy

- **Project:** Memory Sequence Game
- **Repository:** `kofiarhin/memory-game`
- **Task type:** Engineering policy decision
- **Priority:** P2 — Medium
- **Priority rationale:** The repository has no lockfile and CI uses `npm install`, leaving dependency resolution non-reproducible.
- **Status:** `needs_approval`
- **Source document:** `projects/memory-sequence-game.md`; CI workflow
- **Source section or requirement:** Remaining Risks — no lockfile; Next Actions — add lockfile or deliberate workflow
- **Audited revision:** Repository `3073edad00666fd8538af68ada4727639050aa16`; Ideas Hub `0dfabce7dae296d436eb297238351de69d834164`
- **Evidence:** `package-lock.json` is absent and the documented risk explicitly allows either adding a lockfile or defining a deliberate unlocked workflow.
- **Scope:** Choose npm lockfile plus `npm ci` as the recommended default, or explicitly approve an alternative reproducibility policy; define update cadence, CI install command, and verification.
- **Out of scope:** Adding/upgrading dependencies, forcing breaking audit fixes, or changing application behavior before approval.
- **Dependencies:** None.
- **Required approval:** Explicit approval required because the project record presents multiple valid policy choices.
- **Acceptance criteria:** One strategy is selected; rationale and update workflow are documented; CI/install behavior is specified; any implementation task has clear acceptance criteria.
- **Verification required:** For lockfile option: clean `npm ci`, tests, lint, build, and deterministic diff. For alternative: documented reproducibility proof and CI enforcement.
- **Branch:** None until policy is approved.
- **Pull request:** None.
- **Verification evidence:** Not started.
- **Outcome:** Pending approval.

## 2026-07-18-001-ideas-T017 — Record the first operational Architect run in Ideas Hub context

- **Project:** Ideas Hub
- **Repository:** `kofiarhin/ideas`
- **Task type:** Context maintenance
- **Priority:** P2 — Medium
- **Priority rationale:** The project record says no operational run exists; this verified run makes that statement stale.
- **Status:** `ready`
- **Source document:** `projects/ideas.md`; `architect/runs/2026-07-18-001/audit.md`; `tasks.md`
- **Source section or requirement:** Architect Command System — Current State and Next Actions
- **Audited revision:** Ideas Hub base `2b52251c95431dd9b34d1da81fa69f33f67d272a`; run fingerprint `sha256:ea3eef8ad0f64bf5a8efed15a70c332a03589e6a1c662bdae5c00da9d635de52`
- **Evidence:** This command creates the first operational audit and durable queue under the authorized run path.
- **Scope:** After verifying both run files exist and are complete, update `projects/ideas.md` to record the first run ID, audit status, task-queue existence, current workflow learning, and next action; update broader context only if necessary.
- **Out of scope:** Changing command semantics, editing this run's historical findings, marking tasks completed, or updating unrelated projects.
- **Dependencies:** Both run files verified on main.
- **Required approval:** No additional approval for a factual verified context update. Workflow redesign requires separate approval.
- **Acceptance criteria:** The stale statement is corrected; run ID and links are recorded; next action reflects review/approval then `run all tasks`; no task outcomes are invented.
- **Verification required:** Fetch run files from main; validate links and status counts; diff review; `Last updated` refreshed.
- **Branch:** To be created by `run all tasks` in an Ideas Hub-specific branch.
- **Pull request:** None.
- **Verification evidence:** Run files being created by this command.
- **Outcome:** Not started.

## 2026-07-18-001-ideas-T018 — Select the portfolio daily focus and confirm priority policy

- **Project:** Ideas Hub
- **Repository:** `kofiarhin/ideas`
- **Task type:** Portfolio discovery
- **Priority:** P1 — High
- **Priority rationale:** After security and blocking dependencies, several projects are materially tied because the hub explicitly has no current priorities.
- **Status:** `needs_discovery`
- **Source document:** `CONTEXT.md`; `PROJECTS.md`; this audit
- **Source section or requirement:** Current Priorities and portfolio coordination
- **Audited revision:** `CONTEXT.md` `caf3a98d7003c2148c4fd42541f14cd34e58412d`; `PROJECTS.md` `1a3fe0d9a2d8620010b633457e69487f916eec43`; run fingerprint `sha256:ea3eef8ad0f64bf5a8efed15a70c332a03589e6a1c662bdae5c00da9d635de52`
- **Evidence:** The workspace says priorities are not documented and forbids inferring them from order, activity, or maturity.
- **Scope:** Choose one daily focus after P0 security response; confirm whether the next focus is ProjectOS Phase 0/1 readiness, Brain PR cleanup, Piano360 Guided Learning, Amas/Kare design decisions, or Memory Game release; record any cross-project dependency/priority rule approved by the user.
- **Out of scope:** Changing lifecycle states, approving product scope, or reordering security work without user authority.
- **Dependencies:** P0 security tasks should be addressed first or explicitly deferred by the user.
- **Required approval:** User selection is the discovery outcome and is required before durable priority updates.
- **Acceptance criteria:** One primary daily focus and one fallback are selected; rationale and dependencies are explicit; any durable priority update is separately approved.
- **Verification required:** Check selected focus against task dependencies/statuses; ensure no non-ready implementation is authorized by priority alone.
- **Branch:** None for discovery.
- **Pull request:** None.
- **Verification evidence:** Not started.
- **Outcome:** Discovery required.

## 2026-07-18-001-taxify-T019 — Document Taxify purpose, lifecycle, and immediate milestone

- **Project:** Taxify
- **Repository:** `kofiarhin/ideas`
- **Task type:** Project discovery
- **Priority:** P2 — Medium
- **Priority rationale:** The repository contains substantial ride, driver, booking, payment, and admin implementation, but the canonical project record intentionally has no approved product definition.
- **Status:** `needs_discovery`
- **Source document:** `projects/taxify.md`; Taxify repository evidence
- **Source section or requirement:** Snapshot, Current State, Current Focus, Next Actions
- **Audited revision:** Ideas Hub `a2f83dfc4243455c4c5545ab17d8935cf27f97cd`; repository `ecff7e6661f5543ba7112b759d1fa69101ef3944`
- **Evidence:** Repository workflow artifacts and implementation show a ride-booking/driver lifecycle product, but the hub says not to infer scope from the name alone.
- **Scope:** Confirm product problem, target user/market, lifecycle, current environment/live URL, current milestone, active blockers, and immediate next action; then prepare a factual project-record update.
- **Out of scope:** Inferring a commercial launch, approving features, changing Taxify source, or exposing security values.
- **Dependencies:** T001 containment scope should be known first so security status is accurately recorded.
- **Required approval:** User confirmation required for purpose, lifecycle, and priority; later project-record write requires approval through the execution workflow.
- **Acceptance criteria:** Product summary, audience, lifecycle, deployment status, current focus, security state, and next milestone are confirmed; assumptions and open questions are separated.
- **Verification required:** Reconcile confirmed answers with repository implementation and active environment evidence; do not include credentials.
- **Branch:** None for discovery.
- **Pull request:** None.
- **Verification evidence:** Not started.
- **Outcome:** Discovery required.

## 2026-07-18-001-devkofi-T020 — Clarify the current DevKofi programme milestone

- **Project:** DevKofi
- **Repository:** `kofiarhin/ideas`
- **Task type:** Project discovery
- **Priority:** P2 — Medium
- **Priority rationale:** DevKofi is live and implemented, but lifecycle, active programme direction, current priority, and next learner/operations milestone are undocumented.
- **Status:** `needs_discovery`
- **Source document:** `projects/devkofi.md`
- **Source section or requirement:** Open Questions and Next Actions
- **Audited revision:** Ideas Hub `2222c9fa6ff6f10e252f99783cc758954e4709da`; repository `941e0ca84dc33e30304bd78116030473fdba9f0b`
- **Evidence:** The project record asks whether the six-month mentorship programme remains active and which portal capability is the priority.
- **Scope:** Confirm active programme model, target learner, lifecycle, current operational/product pain point, and next approved milestone across onboarding, curriculum, messaging, templates, or administration.
- **Out of scope:** Selecting a feature based on repository activity, changing source, or assuming the programme is unchanged.
- **Dependencies:** Portfolio focus selection may determine when this discovery is performed.
- **Required approval:** User confirmation required before updating durable project context or generating implementation tasks.
- **Acceptance criteria:** Current programme direction, lifecycle, priority, milestone, and success criteria are confirmed; unrelated ideas remain out of scope.
- **Verification required:** Cross-check against live/repository behavior and existing project decisions; preserve unknowns explicitly.
- **Branch:** None for discovery.
- **Pull request:** None.
- **Verification evidence:** Not started.
- **Outcome:** Discovery required.

## 2026-07-18-001-codex-workflow-kit-T021 — Clarify Codex Workflow Kit milestone and memory boundary

- **Project:** Codex Workflow Kit
- **Repository:** `kofiarhin/ideas`
- **Task type:** Project discovery
- **Priority:** P2 — Medium
- **Priority rationale:** The workflow system has a defined architecture but no current release/adoption milestone or approved boundary between Ideas Hub and repository-local Project Brain.
- **Status:** `needs_discovery`
- **Source document:** `projects/codex-workflow.md`
- **Source section or requirement:** Open Questions and Next Actions
- **Audited revision:** Ideas Hub `d80656be176ca1ad8401d4f039ffc6233b090398`; repository `d2cfdf9cd23b1577efbcc7f53bc1f0701ae02ae3`
- **Evidence:** The project record asks which agent environments need first-class support, what the release/adoption milestone is, and how memory layers should avoid duplication.
- **Scope:** Confirm intended users/environments, current lifecycle, next release milestone, distribution/adoption success criteria, and durable boundaries among Ideas Hub, repository Project Brain, run artifacts, and agent-specific integrations.
- **Out of scope:** Changing workflow semantics, implementing integrations, or consolidating memory stores without approval.
- **Dependencies:** Portfolio focus selection.
- **Required approval:** User confirmation required before durable context or implementation planning.
- **Acceptance criteria:** Milestone, target environments, success criteria, and memory ownership rules are explicit; conflicts with Architect/ProjectOS are identified.
- **Verification required:** Review current repository docs and command behavior against the confirmed boundary; record unresolved questions.
- **Branch:** None for discovery.
- **Pull request:** None.
- **Verification evidence:** Not started.
- **Outcome:** Discovery required.

## 2026-07-18-001-kflix-T022 — Document Kflix product scope and current state

- **Project:** Kflix
- **Repository:** `kofiarhin/ideas`
- **Task type:** Project discovery
- **Priority:** P3 — Low
- **Priority rationale:** Repository activity proves implemented series/episode behavior, but the canonical record has no approved purpose, audience, lifecycle, deployment, or milestone.
- **Status:** `needs_discovery`
- **Source document:** `projects/kflix.md`; repository head
- **Source section or requirement:** Entire project record
- **Audited revision:** Ideas Hub `e4a9f3871fdecfecaa892a6a64016d6791a7a6e0`; repository `a32b4a840614779f92fed0f154cfc022d73ae0ef`
- **Evidence:** The audited head is `Show clickable series episodes`; this is insufficient to infer the complete product direction.
- **Scope:** Confirm purpose, target user, data/content source, legal/content constraints, lifecycle, deployment status, current focus, and next milestone.
- **Out of scope:** Inferring it is a Netflix clone, approving content use, or changing source.
- **Dependencies:** Portfolio focus selection.
- **Required approval:** User confirmation required.
- **Acceptance criteria:** A concise approved snapshot, lifecycle, current state, focus, risks, and next action are available for later context update.
- **Verification required:** Reconcile answers with repository structure and deployed evidence if supplied.
- **Branch:** None for discovery.
- **Pull request:** None.
- **Verification evidence:** Not started.
- **Outcome:** Discovery required.

## 2026-07-18-001-banging-prices-T023 — Document Banging Prices purpose and next action

- **Project:** Banging Prices
- **Repository:** `kofiarhin/ideas`
- **Task type:** Project discovery
- **Priority:** P3 — Low
- **Priority rationale:** The canonical project record contains no confirmed purpose, user, lifecycle, or current work.
- **Status:** `needs_discovery`
- **Source document:** `projects/banging-prices.md`; repository head
- **Source section or requirement:** Entire project record
- **Audited revision:** Ideas Hub `3fa23f1b916d2b66b5352b00550201c5d7384c81`; repository `f569177cdde96c592f6eb8bd0878e0f5181c4ad1`
- **Evidence:** Repository availability and a merged development branch do not provide approved product intent.
- **Scope:** Confirm product problem, audience, lifecycle, deployment, current blockers, and immediate next action.
- **Out of scope:** Inferring an e-commerce/price-comparison model from the name, changing source, or assigning priority.
- **Dependencies:** Portfolio focus selection.
- **Required approval:** User confirmation required.
- **Acceptance criteria:** Approved purpose, audience, lifecycle, current state, focus, and next action are documented for a later context update.
- **Verification required:** Cross-check answers with repository implementation and any supplied live URL.
- **Branch:** None for discovery.
- **Pull request:** None.
- **Verification evidence:** Not started.
- **Outcome:** Discovery required.

## 2026-07-18-001-moggoff-T024 — Document MoggOff product scope and current milestone

- **Project:** MoggOff
- **Repository:** `kofiarhin/ideas`
- **Task type:** Project discovery
- **Priority:** P3 — Low
- **Priority rationale:** The repository contains saved-battle history behavior, but the canonical record has no approved purpose, audience, lifecycle, deployment, or milestone.
- **Status:** `needs_discovery`
- **Source document:** `projects/moggoff.md`; repository head
- **Source section or requirement:** Entire project record
- **Audited revision:** Ideas Hub `a69f5ac71f2ed77999d7a5f56cf5f8f13852d174`; repository `9980273c5fcc023cfbf159af0183af3879873f96`
- **Evidence:** The audited head adds saved battle history routes/delete flow; repository behavior alone is not approved product context.
- **Scope:** Confirm the product problem, target user, meaning of battles/history, lifecycle, deployment status, moderation/safety considerations if relevant, current focus, and next milestone.
- **Out of scope:** Inferring product category or social behavior from naming/code fragments, changing source, or assigning priority.
- **Dependencies:** Portfolio focus selection.
- **Required approval:** User confirmation required.
- **Acceptance criteria:** Approved snapshot, audience, lifecycle, deployment, current state, risks, and next action are available for later context update.
- **Verification required:** Reconcile confirmed context with repository structure and any live environment evidence.
- **Branch:** None for discovery.
- **Pull request:** None.
- **Verification evidence:** Not started.
- **Outcome:** Discovery required.
