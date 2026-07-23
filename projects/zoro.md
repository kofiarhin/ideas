# Zoro

**Last updated:** 2026-07-23

## Snapshot

- **Lifecycle:** Active
- **Summary:** Custom GPT and Forge Chief Orchestrator that coordinates governed software workflows using the Context API.
- **Repository:** Uses Ideas Hub for its command center; no separate implementation repository
- **Owner:** Kofi Arhin

## Links

- Forge: [forge.md](forge.md)
- Context API: [context-api.md](context-api.md)
- Zoro command center: [../zoro/README.md](../zoro/README.md)
- Canonical Zoro instructions: [../zoro/INSTRUCTIONS.md](../zoro/INSTRUCTIONS.md)
- GPT Builder bootstrap: [../zoro/BOOTSTRAP.md](../zoro/BOOTSTRAP.md)
- Shared agent coordination policy: [../AGENT_COORDINATION.md](../AGENT_COORDINATION.md)
- Zoro inbox: [../zoro-inbox.md](../zoro-inbox.md)
- Architect inbox: [../architect-inbox.md](../architect-inbox.md)
- Architect runs: [../architect/runs/README.md](../architect/runs/README.md)
- GitHub Gateway specification: https://github.com/kofiarhin/context-api/blob/main/docs/GITHUB_GATEWAY_SPEC.md
- GitHub Gateway implementation plan: https://github.com/kofiarhin/context-api/blob/main/docs/GITHUB_GATEWAY_IMPLEMENTATION_PLAN.md
- Maintained Action schema: https://github.com/kofiarhin/context-api/blob/main/docs/openapi/zoro-action.yaml
- Release checklist: https://github.com/kofiarhin/context-api/blob/main/docs/GITHUB_GATEWAY_RELEASE_CHECKLIST.md
- Open deletion-fix pull request: https://github.com/kofiarhin/context-api/pull/2

## Current State

- A private Custom GPT named **Zoro** exists and is connected to the deployed Context API through OpenAI Actions.
- End-to-end project CRUD has been verified through Zoro against the existing context routes.
- A dedicated GitHub App for Zoro is installed with metadata read, contents read/write, and pull-request read/write permissions.
- GitHub App credentials and the dedicated Bearer credential are stored in Heroku configuration; secret values are excluded from Ideas Hub and the repository.
- The GitHub Gateway implementation, tests, documentation, Octokit dependency, release validator, release checklist, and optional repository allowlist are committed to `kofiarhin/context-api` `main`.
- The maintained repository schema targets the production Context API and declares 27 operations: 15 context operations and 12 authenticated GitHub operations.
- GPT Builder rejected several valid OpenAPI composition patterns used by the maintained schema. A flattened Builder-compatible copy was created and accepted with all 27 actions visible.
- Zoro's Action authentication is configured as API Key with Bearer transport using `ZORO_GITHUB_API_KEY`; the key value is not recorded here.
- A fresh Zoro conversation successfully listed repositories available through the GitHub App installation.
- The controlled write smoke test partially succeeded: Zoro created `zoro-smoke-test` from `main`, created and read `tmp/zoro-smoke-test.txt`, retrieved blob SHA `98e0aa9e27c7f0fb860d44429e475fe12771cf8f`, and confirmed `main` remained unchanged.
- Deleting the temporary file failed with `ClientResponseError`. The branch and test file remain present.
- The failure was traced to `DELETE /api/v1/github/files` relying on a JSON request body that OpenAI Actions did not reliably transmit.
- Zoro created `fix/github-file-deletion`, changed four focused files, added regression tests, committed the work, and opened Context API pull request #2.
- Pull request #2 remains open and mergeable at head `654ebbc1bf8ada7b2ed339f342859204c6e88505`. It accepts query-based deletion input with JSON-body fallback while preserving workflow blocking, exact-SHA concurrency, branch forwarding, and safe error behavior.
- Zoro did not execute shell verification because its connected tools do not provide a shell runner. No passing CI or local command evidence is recorded, so the change is implemented but unverified.
- The repository-maintained Action schema still describes deletion through a request body and must be reconciled before live verification.
- Zoro's GitHub capability remains incomplete until pull request #2 is verified, merged, deployed, represented in the live Action schema, exercised successfully, and cleaned up.
- Kofi approved full technical Ideas Hub read/write access for both Zoro and Architect with governed authority. Their original instructions, approval gates, command scopes, and verification requirements remain authoritative.
- Ideas Hub now has a two-way durable communication loop: `zoro-inbox.md` carries assignments and feedback to Zoro, while `architect-inbox.md` carries Zoro acknowledgements, progress, blockers, approval requests, and completion reports to Architect.
- Architect run `tasks.md` and `report.md` remain authoritative for governed task and verification state. Zoro reports evidence but may not complete its own Architect task.
- Architect created run `2026-07-23-001` and assigned ready task `2026-07-23-001-context-api-T001` through message `ARCH-ZORO-2026-07-23-001` for work key `context-api:zoro-action-query-deletion`.
- Zoro's version-controlled command center is defined under [`zoro/`](../zoro/README.md). It is not active in the live GPT until this change is merged, the minimal bootstrap is installed in GPT Builder, and a fresh-conversation loading test passes.

## Progress Summary — 2026-07-23

### Context And Actions

- Connected Zoro to Context API and verified project CRUD.
- Deployed and configured the authenticated GitHub Gateway for Zoro.
- Produced a GPT Builder-compatible schema preserving all 27 operations.
- Configured Bearer authentication without storing the credential in durable project records.

### Live GitHub Evidence

- Verified repository listing through a fresh Zoro conversation.
- Verified disposable branch creation, UTF-8 file creation, readback, blob-SHA retrieval, and protection of `main`.
- Confirmed that Zoro can investigate a defect, make focused source and test changes on a branch, commit them, and open a pull request without merging or deploying.

### Defect Discovery And Remediation

- Identified that OpenAI Actions did not reliably transmit the JSON body on the DELETE file operation.
- Preserved the existing backend safety model while proposing query-based deletion with JSON-body fallback.
- Opened Context API pull request #2 with four focused changed files, regression coverage, risks, and explicit verification gaps.

### Ideas Hub And Architect Integration

- Established Ideas Hub as the durable human-readable project brain and Context API as the structured operational context service.
- Added and merged the shared `AGENT_COORDINATION.md` policy.
- Added `zoro-inbox.md` for Kofi/Architect assignments and feedback to Zoro.
- Added `architect-inbox.md` for Zoro acknowledgements, progress, blockers, approval requests, and completion reports.
- Defined a complete communication loop in which Architect assigns approved `ready` work, Zoro reports evidence, Architect independently verifies it, and Architect sends feedback.
- Preserved the rule that mailbox state is not task state and that Zoro cannot approve or complete its own Architect task.

### Instruction And Live Task Preparation

- Prepared compact copy-ready Zoro and Architect instructions under the 8,000-character configuration limit.
- Preserved the original structure, discovery gates, execution boundaries, GitHub restrictions, and verification rules in both instruction sets.
- Defined a version-controlled Zoro command center in Ideas Hub with a canonical entrypoint, full instructions, and a minimal GPT Builder bootstrap.
- Kept repository implementation separate from live GPT activation; merge, installation, and fresh-conversation verification remain required.
- Architect created the first live governed run and ready task for the maintained Action query-deletion schema update.
- The assignment authorizes an isolated Context API branch, focused schema and directly required validation/documentation changes, a pull request, and a durable report to `architect-inbox.md`.
- Merge, deployment, direct Context API `main` writes, live GPT Action updates, secret changes, and authentication-policy changes remain explicitly unauthorized.

## Accomplished

- Completed the repository-side GitHub Gateway implementation required for Zoro.
- Corrected the maintained Action schema to target the production Context API deployment.
- Added release validation and an aggregate verification command for the backend repository.
- Added optional repository allowlist enforcement, automated coverage, and configuration documentation.
- Added a controlled release and smoke-test checklist.
- Preserved branch protection, non-force branch updates, optimistic concurrency, and workflow-file write blocking.
- Produced and installed a GPT Builder-compatible schema with all 27 actions visible.
- Configured Bearer authentication in GPT Builder without exposing the secret.
- Verified live repository listing, branch creation, UTF-8 file creation, readback, SHA retrieval, and protection of `main`.
- Demonstrated that Zoro can inspect a defect, create a focused branch, edit source and tests, commit changes, and open a pull request without merging or deploying.
- Opened Context API pull request #2 with documented scope, regression coverage, risks, manual verification instructions, and explicit unverified status.
- Added `zoro-inbox.md` as the assignment and feedback channel to Zoro.
- Added `architect-inbox.md` as Zoro's durable return channel to Architect.
- Defined the assignment, acknowledgement, progress, blocker, verification, feedback, and closure loop while preserving Architect as the authority for task state and independent verification.
- Prepared the full updated compact Zoro and Architect instruction sets.
- Created Architect run `2026-07-23-001`, authoritative ready task `2026-07-23-001-context-api-T001`, and assignment `ARCH-ZORO-2026-07-23-001` on Ideas Hub `main`.

## Current Focus

Review and merge the Zoro command-center pull request, install the minimal bootstrap in GPT Builder, and verify instruction loading in a fresh conversation. Then have Zoro pick up `ARCH-ZORO-2026-07-23-001`, implement only the approved query-deletion schema scope on an isolated Context API branch, open a focused pull request, and report through `architect-inbox.md`. Architect must then independently verify the evidence, update authoritative run state when permitted, and send feedback through `zoro-inbox.md`. In parallel, verify Context API pull request #2, deploy only verified changes, complete the deletion smoke test, and remove the disposable branch.

## Brainstorming

- Expand Actions to coding conventions, instruction sets, glossary, Ideas Hub metadata, and learnings
- Add specialist-agent routing and structured handoffs beyond Zoro and Architect
- Add workflow dashboards, audit trails, run summaries, and mailbox views
- Add per-project access profiles where a repository should not inherit the full installation scope
- Generate the GPT Builder-compatible schema from the maintained repository schema to prevent manual drift
- Consider append-only direct-`main` mailbox writes after the branch-and-PR communication loop is proven reliable

## Decisions

- Zoro is a separately maintained project within Forge, not the top-level organization.
- Zoro is responsible for orchestration, context retrieval, routing, approvals, progress tracking, and verified Context API updates.
- Zoro must retrieve relevant Context API data before making project recommendations.
- Zoro must ask for approval before persistent writes unless an approved workflow already authorizes them.
- Zoro must not approve its own work, bypass verification, invent project state, or mark unverified work completed.
- Zoro's GitHub access is provided through authenticated `/api/v1/github` routes in the existing Context API Action.
- Zoro may read repositories, branches, directories, and files; create and update branches without force-pushing; create, update, and delete UTF-8 files; and create, read, update, close, and merge pull requests subject to explicit authority and repository rules.
- Zoro must honor branch protection, optimistic concurrency, and the `.github/workflows` write prohibition.
- All Zoro GitHub routes require a dedicated Bearer credential separate from public context endpoints.
- A pull request created by Zoro is implementation evidence, not completion evidence; local or CI verification remains required before merge or deployment.
- Zoro and Architect have full technical read/write access to Ideas Hub through their available tools.
- Full access does not grant unlimited authority: durable changes must remain scoped to the active request or approved workflow and preserve approval, security, merge, deployment, and verification gates.
- `zoro-inbox.md` is the durable Kofi/Architect → Zoro channel.
- `architect-inbox.md` is the durable Zoro → Architect channel.
- Mailbox status is not authoritative task status.
- Zoro must reference the originating message, Architect run, task ID, and work key in durable reports when provided.
- Zoro may report implemented work and evidence but may not directly mark an Architect task completed.
- Architect must independently verify Zoro evidence before updating authoritative task state or durable project truth.
- Architect command-specific write boundaries remain authoritative.
- The shared coordination rules supplement rather than replace each agent's existing instructions.
- Zoro's canonical operating instructions live in Ideas Hub under `zoro/README.md` and `zoro/INSTRUCTIONS.md`; GPT Builder retains only the minimal loader from `zoro/BOOTSTRAP.md`.
- Repository instruction changes and live GPT installation are separate states and require fresh-conversation verification before being described as active.

## Assumptions

- OpenAI Actions remain suitable for the first orchestration MVP.
- The installed GitHub App permissions are sufficient for approved code and pull-request operations, subject to repository rules.
- Query-based deletion will work through OpenAI Actions after the backend fix is verified, deployed, and represented in the live Action schema.
- The GPT instruction field has enough capacity for the minimal repository bootstrap.
- The two-inbox protocol will initially use branch-and-PR writes unless direct-main authority is explicit.

## Open Questions

- What runtime and transport should Zoro use to invoke specialist agents?
- How should Zoro acquire and enforce task locks for single-Builder ownership?
- Which future workflows require explicit human approval versus workflow-level preauthorization?
- Which repositories should eventually use narrower allowlists or per-project policies?
- Does pull request #2 pass the repository's clean verification commands?
- Should the Builder-compatible schema be maintained directly or generated from the canonical OpenAPI source?
- Has `README.md` readback through Zoro been explicitly completed, or only repository listing?
- Has the repository-backed Zoro bootstrap been merged, installed, and validated in a fresh conversation?
- Will Zoro acknowledge and complete the assigned schema work without exceeding its stated authority?
- Should mailbox writes become append-only direct-main operations after the loop is verified?
- How should closed mailbox messages be archived without losing traceability?

## Next Actions

### Zoro GitHub Completion Tasks

- [x] **Task 1 — Correct and validate the Action schema:** production URL committed; 27-operation contract retained; repository validator added.
- [ ] **Task 2 — Confirm backend verification:** run `npm ci`, focused deletion tests, and `npm run verify` from a clean checkout of `fix/github-file-deletion`; preserve passing output or repair failures.
- [x] **Task 3 — Confirm current deployment:** Heroku release `v14` deployed `main` revision `bf378b82ed04c88152c3cbb7550a590e63a19601`. A new deployment is still required after the deletion fix is verified and merged.
- [x] **Task 4 — Configure GPT Builder:** the Builder-compatible schema was accepted, Bearer authentication was configured, Zoro was saved, and a fresh conversation was started.
- [ ] **Task 5 — Verify GitHub reads through Zoro:** repository listing is verified; explicitly read `README.md` from `kofiarhin/context-api` on `main` and retain the result if not already completed.
- [ ] **Task 6 — Verify GitHub writes through Zoro:** branch creation, file creation, readback, SHA retrieval, and `main` protection passed; deletion failed and remains outstanding.
- [ ] **Task 6A — Complete deletion remediation:** review and verify Context API pull request #2, update the maintained Action schema for query parameters, merge, deploy, and republish the Action.
- [ ] **Task 6B — Repeat live deletion:** delete `tmp/zoro-smoke-test.txt` from `zoro-smoke-test` using blob SHA `98e0aa9e27c7f0fb860d44429e475fe12771cf8f`, verify absence, confirm `main` is unchanged, and delete the disposable branch.
- [ ] **Task 7 — Close the delivery:** record verification, merge, deployment, Action configuration, read/write evidence, and cleanup before marking GitHub access available.
- [x] **Task 8 — Add access hardening:** optional repository allowlist support and documentation committed.
- [x] **Task 9 — Add shared assignment inbox:** `zoro-inbox.md` is on Ideas Hub `main`.
- [x] **Task 10 — Add durable return channel:** `architect-inbox.md` and the two-way communication protocol are on Ideas Hub `main`.
- [x] **Task 11 — Prepare updated agent instructions:** compact copy-ready Zoro and Architect instructions were produced under the 8,000-character limit.
- [ ] **Task 12 — Merge and validate repository-backed instructions:** merge the command-center change, replace Zoro's full GPT instruction field with the minimal bootstrap, start a fresh conversation, and verify the reported instruction version and loaded files.
- [x] **Task 13 — Create first governed assignment:** Architect run `2026-07-23-001`, task `2026-07-23-001-context-api-T001`, and assignment `ARCH-ZORO-2026-07-23-001` exist on Ideas Hub `main`.
- [ ] **Task 14 — Zoro executes and reports:** Zoro acknowledges the ready schema task, opens the focused Context API PR, and writes the required report to `architect-inbox.md`.
- [ ] **Task 15 — Architect verifies and responds:** Architect independently verifies Zoro evidence, updates run state when permitted, and sends feedback through `zoro-inbox.md`.
- [ ] Create and verify the Zoro project record in the Context API.
- [ ] Link Zoro to Forge as Chief Orchestrator.
- [ ] Finalize Zoro's broader Forge orchestration instructions, status transitions, approval rules, specialist handoffs, and evidence records.
