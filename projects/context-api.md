# Context API

**Last updated:** 2026-07-22

## Snapshot

- **Lifecycle:** Active
- **Summary:** Centralized API for structured, reusable user, engineering, project, workflow, glossary, and learning context.
- **Repository:** https://github.com/kofiarhin/context-api
- **Live:** https://context-api-3b9dfadf403e.herokuapp.com
- **Product requirements:** https://github.com/kofiarhin/context-api/blob/main/docs/PRD.md
- **Technical specification:** https://github.com/kofiarhin/context-api/blob/main/docs/SPEC.md

## Links

- Repository: https://github.com/kofiarhin/context-api
- Live API: https://context-api-3b9dfadf403e.herokuapp.com
- PRD: https://github.com/kofiarhin/context-api/blob/main/docs/PRD.md
- Specification: https://github.com/kofiarhin/context-api/blob/main/docs/SPEC.md
- GitHub Gateway specification: https://github.com/kofiarhin/context-api/blob/main/docs/GITHUB_GATEWAY_SPEC.md
- GitHub Gateway implementation plan: https://github.com/kofiarhin/context-api/blob/main/docs/GITHUB_GATEWAY_IMPLEMENTATION_PLAN.md
- Maintained Zoro Action schema: https://github.com/kofiarhin/context-api/blob/main/docs/openapi/zoro-action.yaml
- Release checklist: https://github.com/kofiarhin/context-api/blob/main/docs/GITHUB_GATEWAY_RELEASE_CHECKLIST.md
- Forge: [forge.md](forge.md)
- Zoro: [zoro.md](zoro.md)

## Current State

- The Node.js and Express API is backed by MongoDB through Mongoose and deployed to Heroku at the user-confirmed live URL.
- Public context CRUD and the authenticated GitHub Gateway runtime are committed to `main`.
- The GitHub Gateway exposes repository, content, branch, file, and pull-request operations beneath `/api/v1/github` using GitHub App installation authentication and a dedicated Bearer credential.
- The gateway enforces UTF-8 text-only writes, workflow-path blocking, non-force branch updates, branch protection, and optimistic concurrency for file replacement, deletion, branch updates, and pull-request merges.
- The maintained OpenAPI schema now uses the production URL `https://context-api-3b9dfadf403e.herokuapp.com`, declares 27 operations, and remains within the GPT Action limit.
- A repository release validator and aggregate `npm run verify` command are committed. The validator checks the production URL, operation count, operation-ID uniqueness, required GitHub operations, Bearer declarations, and required specification files.
- The `express-rate-limit` regression assertion now matches the configured draft-7 `RateLimit` header and confirms legacy `X-RateLimit-*` headers are absent.
- Optional defense-in-depth repository restriction is implemented through `GITHUB_REPOSITORY_ALLOWLIST`; leaving it empty preserves the approved all-repository default.
- A release checklist documents repository verification, deployment, safe reads, disposable-branch write/delete testing, GPT Builder handoff, the MongoDB startup boundary, and allowlist configuration.
- GitHub request routing bypasses the MongoDB request guard, but `src/server.js` still requires MongoDB before binding the process. This route-level versus process-level availability limitation is documented and intentionally unchanged.
- Repository changes are committed, but no green execution output for `npm run verify` has been recorded through the available GitHub connector. The feature must not be marked fully verified until those commands run successfully.
- The GPT Builder Action and final Zoro read/write smoke test remain manual work and have not been completed.

## Current Focus

Run the complete repository verification command from a clean checkout, resolve any remaining seed-data failures, deploy the verified revision, then complete GPT Builder configuration and the controlled Zoro smoke test.

## Brainstorming

- Semantic or vector search across context records
- A context-management dashboard
- Automatic learning ingestion with review and approval
- Event-driven synchronization with the Ideas Hub
- Context versioning and rollback
- Multi-user and project-scoped context
- Expand Zoro with additional Actions for coding conventions, instruction sets, glossary entries, Ideas Hub context, and learnings
- Forge-specific entities or schemas for agent roles, workflow evidence, approvals, relationships, and task ownership
- Consider process-level separation for the GitHub Gateway if repository access must remain available during MongoDB startup outages

## Decisions

- Context is divided into independently retrievable domains.
- API routes are versioned under `/api/v1`.
- The simplified context MVP supports `POST`, `GET`, `PATCH`, and soft-delete `DELETE`; `PUT` is excluded.
- Existing context endpoints remain public and unauthenticated for the current MVP; the GitHub surface uses separate Bearer authentication.
- The Ideas Hub remains the durable narrative source for project knowledge.
- Context API is Forge's shared memory and system of record but remains independently maintained.
- GitHub App installation authentication is used instead of a personal access token.
- Zoro may read repositories and files, create and update branches without force-pushing, create/update/delete UTF-8 files, write directly to default branches where GitHub permits it, and manage pull requests through merge.
- GitHub branch protection remains authoritative and must not be bypassed.
- Zoro must not modify `.github/workflows/*`, manage Actions, access secrets, administer repositories or organizations, manage collaborators, force-push, or bypass branch protection.
- File updates and deletions require the current blob SHA; branch updates and pull-request merges require optimistic concurrency checks.
- Direct implementation on `main` was explicitly authorized for this remediation scope.
- Route-level MongoDB independence is retained; process-level decoupling is deferred to a separately approved architecture change.
- Repository allowlisting is optional defense in depth. Empty configuration preserves the approved all-repository behavior.

## Assumptions

- MongoDB remains suitable for the current context schemas.
- The installed GitHub App permissions are sufficient for approved content and pull-request operations, subject to repository rules.
- Claude's earlier deployment and authenticated read report is accurate, but direct Zoro evidence is still required.

## Open Questions

- How will Ideas Hub records be synchronized without creating competing sources of truth?
- What authentication model should eventually replace public writes across non-GitHub Context API endpoints?
- Should the maintained OpenAPI schema eventually be hosted by the Context API for stable import?
- Which Context API entities should represent Forge modules, authority boundaries, project relationships, evidence, and task locks?
- Do any seed-data regression failures remain after the rate-limit assertion correction?
- Is route-level MongoDB independence sufficient long term?

## Next Actions

### GitHub Gateway Audit Tasks

- [x] **Task 1 — Correct the maintained Action schema:** production URL committed; 27-operation contract retained; static validation added.
- [ ] **Task 2 — Establish repository verification evidence:** from a clean checkout run `npm ci` and `npm run verify`; repair any remaining seed-data failures and preserve exact passing output.
- [ ] **Task 3 — Deploy the verified revision:** deploy only after Task 2 passes and preserve the Heroku release and startup evidence.
- [ ] **Task 4 — Configure the live Zoro Action:** paste the corrected schema into GPT Builder and configure `ZORO_GITHUB_API_KEY` as Bearer authentication.
- [ ] **Task 5 — Verify non-destructive reads through Zoro:** list repositories and read `README.md` from `kofiarhin/context-api` on `main`.
- [ ] **Task 6 — Run the controlled write smoke test:** use a disposable branch, create a temporary UTF-8 file, retrieve its SHA, delete it with that SHA, and confirm `main` was unchanged.
- [ ] **Task 7 — Record completion evidence:** capture verification output, deployment, Action setup, reads, writes, deletion, and cleanup before marking the feature complete.
- [x] **Task 8 — Add repository-scope hardening:** optional `GITHUB_REPOSITORY_ALLOWLIST` support, tests, example configuration, and documentation committed while preserving the current default.
- [ ] Create and verify the Forge and Zoro project records through Zoro.
- [ ] Define the Forge Context API data model, valid task transitions, single-owner enforcement, approval gates, and evidence schemas.
