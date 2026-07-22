# Zoro

**Last updated:** 2026-07-22

## Snapshot

- **Lifecycle:** Active
- **Summary:** Custom GPT and Forge Chief Orchestrator that coordinates governed software workflows using the Context API.
- **Repository:** Not created
- **Owner:** Kofi Arhin

## Links

- Forge: [forge.md](forge.md)
- Context API: [context-api.md](context-api.md)
- GitHub Gateway specification: https://github.com/kofiarhin/context-api/blob/main/docs/GITHUB_GATEWAY_SPEC.md
- GitHub Gateway implementation plan: https://github.com/kofiarhin/context-api/blob/main/docs/GITHUB_GATEWAY_IMPLEMENTATION_PLAN.md
- Maintained Action schema: https://github.com/kofiarhin/context-api/blob/main/docs/openapi/zoro-action.yaml
- Release checklist: https://github.com/kofiarhin/context-api/blob/main/docs/GITHUB_GATEWAY_RELEASE_CHECKLIST.md

## Current State

- A private Custom GPT named **Zoro** exists and is connected to the deployed Context API through OpenAI Actions.
- End-to-end project CRUD has been verified through Zoro against the existing context routes.
- A dedicated GitHub App for Zoro is installed with metadata read, contents read/write, and pull-request read/write permissions.
- GitHub App credentials and the dedicated Bearer credential are stored in Heroku configuration; secret values are excluded from Ideas Hub and the repository.
- The GitHub Gateway implementation, tests, documentation, Octokit dependency, corrected maintained Action schema, release validator, release checklist, and optional repository allowlist are committed to `kofiarhin/context-api` `main`.
- The maintained schema now points at `https://context-api-3b9dfadf403e.herokuapp.com` and declares 27 operations: 15 context operations and 12 authenticated GitHub operations.
- The rate-limit header regression assertion has been corrected to match the configured draft-7 standard header.
- Optional repository allowlisting is available through `GITHUB_REPOSITORY_ALLOWLIST` while empty configuration preserves the approved all-repository default.
- Repository-side remediation is committed but not yet proven by recorded green `npm run verify` output.
- The corrected schema and Bearer authentication have not yet been configured in GPT Builder.
- No controlled live repository write/delete smoke test has been completed through Zoro.
- Zoro's GitHub capability remains incomplete until repository verification, deployment confirmation, GPT Builder setup, and end-to-end evidence pass.

## Current Focus

Obtain green repository verification and deployment evidence, then complete the private GPT Builder configuration and verify safe reads plus a disposable-branch file create/delete sequence through a fresh Zoro conversation.

## Brainstorming

- Expand Actions to coding conventions, instruction sets, glossary, Ideas Hub metadata, and learnings
- Add specialist-agent routing and structured handoffs
- Add workflow dashboards, audit trails, and run summaries
- Add per-project access profiles where a repository should not inherit the full installation scope

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

## Assumptions

- OpenAI Actions remain suitable for the first orchestration MVP.
- The installed GitHub App permissions are sufficient for approved code and pull-request operations, subject to repository rules.
- Earlier deployment and authenticated read reports are accurate, but Zoro-level evidence is still required.

## Open Questions

- What runtime and transport should Zoro use to invoke specialist agents?
- How should Zoro acquire and enforce task locks for single-Builder ownership?
- Which future workflows require explicit human approval versus workflow-level preauthorization?
- Which repositories should eventually use narrower allowlists or per-project policies?
- Do any Context API seed-data regression failures remain after the rate-limit assertion correction?

## Next Actions

### Zoro GitHub Completion Tasks

- [x] **Task 1 — Correct and validate the Action schema:** production URL committed; 27-operation contract retained; repository validator added.
- [ ] **Task 2 — Confirm backend verification:** run `npm ci` and `npm run verify` from a clean checkout, fix any remaining seed failures, and preserve passing output.
- [ ] **Task 3 — Confirm deployment:** deploy the verified `main` revision and retain the Heroku release and startup evidence.
- [ ] **Task 4 — Configure GPT Builder:** paste the corrected schema, configure `ZORO_GITHUB_API_KEY` as Bearer authentication, save Zoro, and start a fresh conversation.
- [ ] **Task 5 — Verify GitHub reads through Zoro:** list repositories and read `README.md` from `kofiarhin/context-api` on `main`.
- [ ] **Task 6 — Verify GitHub writes through Zoro:** create a disposable branch, create a temporary UTF-8 file, retrieve its blob SHA, delete it with that SHA, and verify `main` was unchanged.
- [ ] **Task 7 — Close the delivery:** record verification, deployment, Action configuration, read/write evidence, and cleanup before marking GitHub access available.
- [x] **Task 8 — Add access hardening:** optional repository allowlist support and documentation committed without reducing the approved default capability.
- [ ] Create and verify the Zoro project record in the Context API.
- [ ] Link Zoro to Forge as Chief Orchestrator.
- [ ] Finalize Zoro's Forge orchestration instructions, status transitions, approval rules, structured handoffs, and evidence records.
