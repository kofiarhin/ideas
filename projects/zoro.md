# Zoro

**Last updated:** 2026-07-23

## Snapshot

- **Lifecycle:** Active
- **Summary:** Custom GPT and Forge Chief Orchestrator that coordinates governed software workflows using the Context API.
- **Repository:** Not created
- **Owner:** Kofi Arhin

## Links

- Forge: [forge.md](forge.md)
- Context API: [context-api.md](context-api.md)
- Shared agent coordination policy: [../AGENT_COORDINATION.md](../AGENT_COORDINATION.md)
- Zoro inbox: [../zoro-inbox.md](../zoro-inbox.md)
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
- The maintained repository schema points at `https://context-api-3b9dfadf403e.herokuapp.com` and declares 27 operations: 15 context operations and 12 authenticated GitHub operations.
- GPT Builder rejected several valid OpenAPI composition patterns used by the maintained schema. A flattened Builder-compatible copy was created with inline parameters, operation-level path parameters, flattened request bodies, no YAML aliases, and no duplicate path/body identifier names.
- The Builder-compatible schema was accepted and all 27 actions appeared in Zoro's Action editor.
- Zoro's Action authentication is configured as API Key with Bearer transport using `ZORO_GITHUB_API_KEY`; the key value is not recorded here.
- A fresh Zoro conversation successfully listed repositories available through the GitHub App installation.
- The controlled write smoke test partially succeeded: Zoro created `zoro-smoke-test` from `main`, created and read `tmp/zoro-smoke-test.txt`, retrieved blob SHA `98e0aa9e27c7f0fb860d44429e475fe12771cf8f`, and confirmed `main` remained unchanged.
- Deleting the temporary file failed with `ClientResponseError`. The branch and test file remain present.
- The failure was traced to `DELETE /api/v1/github/files` relying on a JSON request body that OpenAI Actions did not reliably transmit. Existing branch forwarding, blob-SHA comparison, Octokit payload construction, and stale-SHA conflict handling were already correct.
- Zoro then performed a real implementation workflow: it created `fix/github-file-deletion`, changed four focused files, added unit and integration regression tests, committed the work, and opened Context API pull request #2.
- Pull request #2 is open and mergeable at head `654ebbc1bf8ada7b2ed339f342859204c6e88505`. It accepts query-based deletion input with JSON-body fallback and preserves workflow blocking, exact-SHA concurrency, branch forwarding, and safe error behavior.
- Zoro did not execute shell verification because its connected tools do not provide a shell runner. No CI status is recorded for the PR head, so the change is implemented but unverified.
- The repository-maintained Action schema still describes deletion through a request body. It must be reconciled with query-based deletion before the live Action can verify the fix.
- Zoro's GitHub capability remains incomplete until pull request #2 is reviewed, verified, merged, deployed, represented in the live Action schema, exercised successfully through deletion, and cleaned up.
- `zoro-inbox.md` is available on Ideas Hub `main` as a lightweight communication and request-intake channel.
- Kofi approved full technical Ideas Hub read/write access for both Zoro and Architect with governed authority. The shared policy preserves their original instructions, branch and pull-request defaults, approval gates, command-specific scopes, and verification requirements.

## Accomplished

- Completed the repository-side GitHub Gateway implementation required for Zoro.
- Corrected the maintained Action schema to target the production Context API deployment.
- Added release validation and an aggregate verification command for the backend repository.
- Corrected the rate-limit regression assertion to match the configured standard headers.
- Added optional repository allowlist enforcement, automated coverage, and configuration documentation without reducing the approved default capability.
- Added a controlled release and smoke-test checklist for GPT Builder setup, repository reads, disposable writes, SHA-based deletion, cleanup, and evidence capture.
- Preserved Zoro's approved GitHub safety boundaries, including branch protection, non-force branch updates, optimistic concurrency, and workflow-file write blocking.
- Produced and installed a GPT Builder-compatible schema with all 27 actions visible.
- Configured Bearer authentication in GPT Builder without exposing the secret.
- Verified live repository listing through a fresh Zoro conversation.
- Verified branch creation, UTF-8 file creation, file readback, blob-SHA retrieval, and protection of `main`.
- Demonstrated that Zoro can inspect a defect, create a focused branch, edit source and tests, commit changes, and open a pull request without merging or deploying.
- Opened Context API pull request #2 with a documented root cause, implementation summary, test coverage, risks, manual verification instructions, and explicit unverified status.
- Added `zoro-inbox.md` as the first shared human-to-agent communication channel.
- Approved and documented a shared Zoro and Architect coordination model with full technical Ideas Hub access and governed write authority.

## Current Focus

Add the shared coordination block to the bottom of the existing Zoro and Architect instructions without replacing their original instructions. Then test that both agents can read Ideas Hub, recognize each other's role and durable artifacts, and preserve approval and verification boundaries. In parallel, review and locally verify pull request #2, update the maintained Action schema for query-based deletion, deploy only a verified merge, republish the Action, complete the delete smoke test, and remove the disposable branch.

## Brainstorming

- Expand Actions to coding conventions, instruction sets, glossary, Ideas Hub metadata, and learnings
- Add specialist-agent routing and structured handoffs
- Add workflow dashboards, audit trails, and run summaries
- Add per-project access profiles where a repository should not inherit the full installation scope
- Generate the GPT Builder-compatible schema from the maintained repository schema to prevent manual drift
- Add structured Zoro-to-Architect handoff messages after the single-file inbox workflow is proven

## Decisions

- Zoro is a separately maintained project within Forge, not the top-level organization.
- Zoro is responsible for orchestration, context retrieval, routing, approvals, progress tracking, and verified Context API updates.
- Zoro must retrieve relevant Context API data before making project recommendations.
- Zoro must ask for approval before persistent writes unless an approved workflow already authorizes them.
- Zoro must not approve its own work, bypass verification, invent project state, or mark unverified work completed.
- Zoro's GitHub access is provided through authenticated `/api/v1/github` routes in the existing Context API Action.
- Zoro may read repositories, branches, directories, and files; create and update branches without force-pushing; create, update, and delete UTF-8 files; write directly to default branches where GitHub permits it; and create, read, update, close, and merge pull requests.
- Zoro must honor branch protection, optimistic concurrency, and the `.github/workflows` write prohibition.
- All Zoro GitHub routes require a dedicated Bearer credential separate from public context endpoints.
- Optional repository allowlisting is supported as defense in depth without changing the current default.
- A pull request created by Zoro is implementation evidence, not completion evidence; local or CI verification remains required before merge or deployment.
- Zoro and Architect have full technical read/write access to Ideas Hub through their available tools.
- Full access does not grant unlimited authority: durable changes must remain scoped to the active request or approved workflow, use branches and pull requests by default, and preserve approval, security, merge, deployment, and verification gates.
- Zoro and Architect may read and write `zoro-inbox.md` when authorized, but the inbox does not replace Architect task state, approved specifications, verified implementation evidence, or durable project records.
- Architect command-specific write boundaries remain authoritative even when Architect has broader technical repository access.
- Their existing instruction sets remain intact; the shared coordination rules are appended as an additional block rather than replacing prior behavior.

## Assumptions

- OpenAI Actions remain suitable for the first orchestration MVP.
- The installed GitHub App permissions are sufficient for approved code and pull-request operations, subject to repository rules.
- Query-based deletion will work through OpenAI Actions after the backend fix is verified, deployed, and represented in the live Action schema.
- Both GPT instruction fields have enough capacity for the shared coordination addendum.

## Open Questions

- What runtime and transport should Zoro use to invoke specialist agents?
- How should Zoro acquire and enforce task locks for single-Builder ownership?
- Which future workflows require explicit human approval versus workflow-level preauthorization?
- Which repositories should eventually use narrower allowlists or per-project policies?
- Does pull request #2 pass the repository's clean verification commands?
- Should the Builder-compatible schema be maintained directly or generated from the canonical OpenAPI source?
- Has `README.md` readback through Zoro been explicitly completed, or only repository listing?
- Should later versions add structured response and handoff files after the shared inbox is proven?

## Next Actions

### Zoro GitHub Completion Tasks

- [x] **Task 1 — Correct and validate the Action schema:** production URL committed; 27-operation contract retained; repository validator added.
- [ ] **Task 2 — Confirm backend verification:** run `npm ci`, focused deletion tests, and `npm run verify` from a clean checkout of `fix/github-file-deletion`; preserve passing output or repair failures.
- [x] **Task 3 — Confirm current deployment:** Heroku release `v14` deployed `main` revision `bf378b82ed04c88152c3cbb7550a590e63a19601` and startup evidence showed MongoDB connection plus server listening. A new deployment is still required after the deletion fix is verified and merged.
- [x] **Task 4 — Configure GPT Builder:** the Builder-compatible schema was accepted, API Key authentication was configured as Bearer, Zoro was saved, and a fresh conversation was started.
- [ ] **Task 5 — Verify GitHub reads through Zoro:** repository listing is verified; explicitly read `README.md` from `kofiarhin/context-api` on `main` and retain the result if not already completed.
- [ ] **Task 6 — Verify GitHub writes through Zoro:** branch creation, file creation, readback, SHA retrieval, and `main` protection passed; deletion failed and remains outstanding.
- [ ] **Task 6A — Complete deletion remediation:** review and verify Context API pull request #2, update the maintained Action schema for query parameters, merge, deploy, and republish the Action.
- [ ] **Task 6B — Repeat live deletion:** delete `tmp/zoro-smoke-test.txt` from `zoro-smoke-test` using blob SHA `98e0aa9e27c7f0fb860d44429e475fe12771cf8f`, verify absence, confirm `main` is unchanged, and delete the disposable branch.
- [ ] **Task 7 — Close the delivery:** record verification, merge, deployment, Action configuration, read/write evidence, and cleanup before marking GitHub access available.
- [x] **Task 8 — Add access hardening:** optional repository allowlist support and documentation committed without reducing the approved default capability.
- [x] **Task 9 — Add shared inbox:** `zoro-inbox.md` is merged into Ideas Hub `main`.
- [ ] **Task 10 — Install shared coordination instructions:** append the approved coordination addendum to both Zoro and Architect without replacing existing instructions, save both, and start fresh conversations.
- [ ] **Task 11 — Verify mutual awareness:** confirm Zoro can read the Architect registry and applicable runs, and Architect can read the Zoro project record and inbox while both preserve governed authority.
- [ ] Create and verify the Zoro project record in the Context API.
- [ ] Link Zoro to Forge as Chief Orchestrator.
- [ ] Finalize Zoro's Forge orchestration instructions, status transitions, approval rules, structured handoffs, and evidence records.
