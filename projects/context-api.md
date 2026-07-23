# Context API

**Last updated:** 2026-07-23

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
- Codebase audit: https://github.com/kofiarhin/context-api/blob/main/docs/CODEBASE_AUDIT.md
- GitHub Gateway specification: https://github.com/kofiarhin/context-api/blob/main/docs/GITHUB_GATEWAY_SPEC.md
- GitHub Gateway implementation plan: https://github.com/kofiarhin/context-api/blob/main/docs/GITHUB_GATEWAY_IMPLEMENTATION_PLAN.md
- Maintained Zoro Action schema: https://github.com/kofiarhin/context-api/blob/main/docs/openapi/zoro-action.yaml
- Release checklist: https://github.com/kofiarhin/context-api/blob/main/docs/GITHUB_GATEWAY_RELEASE_CHECKLIST.md
- Open deletion-fix pull request: https://github.com/kofiarhin/context-api/pull/2
- Forge: [forge.md](forge.md)
- Zoro: [zoro.md](zoro.md)

## Current State

- The Node.js and Express API is backed by MongoDB through Mongoose and deployed to Heroku at the user-confirmed live URL.
- Heroku release `v14` successfully deployed `main` revision `bf378b82ed04c88152c3cbb7550a590e63a19601`; the process started, connected to MongoDB, and reported the server listening.
- Public context CRUD and the authenticated GitHub Gateway runtime are committed to `main`.
- The GitHub Gateway exposes repository, content, branch, file, and pull-request operations beneath `/api/v1/github` using GitHub App installation authentication and a dedicated Bearer credential.
- The gateway enforces UTF-8 text-only writes, workflow-path blocking, non-force branch updates, branch protection, and optimistic concurrency for file replacement, deletion, branch updates, and pull-request merges.
- The maintained OpenAPI schema uses the production URL, declares 27 operations, and remains within the GPT Action limit.
- GPT Builder rejected reusable parameter references, path-level parameters, `allOf` request bodies, and duplicate path/body identifier names. A flattened Builder-compatible schema preserving all 27 operations was produced and accepted in the private Zoro configuration.
- Zoro's Action authentication is configured as API Key with Bearer transport using the Heroku-managed `ZORO_GITHUB_API_KEY`; the secret value is not stored in this repository.
- A fresh Zoro conversation successfully listed repositories available to the GitHub App installation, providing direct live read evidence.
- The controlled write smoke test partially succeeded: Zoro created `zoro-smoke-test` from `main`, created and read `tmp/zoro-smoke-test.txt`, retrieved blob SHA `98e0aa9e27c7f0fb860d44429e475fe12771cf8f`, and confirmed `main` remained unchanged.
- File deletion failed because the Action/OpenAPI client did not reliably transmit the JSON request body on `DELETE /api/v1/github/files`. The disposable branch and test file still exist.
- Zoro implemented a proposed fix on `fix/github-file-deletion` and opened pull request #2. The change accepts deletion arguments from query parameters while preserving the JSON-body contract as a fallback, keeps the existing validation and safety policy, and adds unit plus integration regression coverage.
- Pull request #2 is open and mergeable at head `654ebbc1bf8ada7b2ed339f342859204c6e88505`, but no CI status or local command output is recorded. It is not verified, merged, or deployed.
- The repository-maintained Action schema still describes deletion through a request body. It must be updated to emit query parameters before the live GPT Action can exercise the proposed route fix.
- A repository release validator and aggregate `npm run verify` command are committed.
- Optional defense-in-depth repository restriction is implemented through `GITHUB_REPOSITORY_ALLOWLIST`; leaving it empty preserves the approved all-repository default.
- GitHub request routing bypasses the MongoDB request guard, but `src/server.js` still requires MongoDB before binding the process. This route-level versus process-level availability limitation is documented and intentionally unchanged.
- The 2026-07-22 documentation audit found that Context API already has one of the portfolio's strongest documentation sets: README, PRD, specification, implementation plan, deployment guidance, gateway specification, OpenAPI schema, and release controls.
- The audit identified runtime-version drift between the README and executable manifest and aligned the README with the Node.js 24.x requirement in `package.json`.
- The GitHub Gateway must not be marked fully verified until pull request #2 passes repository verification, the schema is reconciled, the verified revision is deployed, deletion succeeds through Zoro, cleanup is completed, and evidence is retained.

## Accomplished

- Corrected the production server URL in the maintained Zoro Action schema.
- Added deterministic release validation and the aggregate `npm run verify` command.
- Corrected the draft-7 rate-limit header regression assertion.
- Implemented optional repository allowlist enforcement with case-insensitive matching, tests, and example configuration.
- Added a GitHub Gateway release checklist covering verification, deployment, GPT Builder configuration, safe reads, disposable writes, cleanup, and evidence capture.
- Preserved the approved security controls: Bearer authentication, optimistic concurrency, non-force updates, branch-protection enforcement, and blocked workflow-file writes.
- Documented the MongoDB startup dependency without expanding scope into a process-architecture redesign.
- Added a codebase and documentation audit and corrected README runtime-version drift.
- Produced and installed a GPT Builder-compatible 27-operation schema after resolving Builder parsing limitations.
- Configured the live Zoro Action with Bearer authentication and verified repository listing through a fresh conversation.
- Verified branch creation, UTF-8 file creation, file readback, blob-SHA retrieval, and protection of `main` through the disposable write test.
- Used Zoro to implement a real repository fix and open pull request #2 with focused production changes and regression tests.

## Current Focus

Review and verify pull request #2, reconcile the maintained OpenAPI schema with query-based deletion, merge only after checks pass, deploy the verified revision, republish the Action schema, and complete the delete-and-cleanup smoke test through Zoro.

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
- Route-level MongoDB independence is retained; process-level decoupling is deferred to a separately approved architecture change.
- Repository allowlisting is optional defense in depth. Empty configuration preserves the approved all-repository behavior.

## Assumptions

- MongoDB remains suitable for the current context schemas.
- The installed GitHub App permissions are sufficient for approved content and pull-request operations, subject to repository rules.
- Query-based deletion will resolve the OpenAI Action transport failure once the route change is verified, deployed, and represented in the live Action schema.

## Open Questions

- How will Ideas Hub records be synchronized without creating competing sources of truth?
- What authentication model should eventually replace public writes across non-GitHub Context API endpoints?
- Should the maintained OpenAPI schema eventually be hosted by the Context API for stable import?
- Which Context API entities should represent Forge modules, authority boundaries, project relationships, evidence, and task locks?
- Does pull request #2 pass `npm ci`, `npm run verify`, and focused deletion regression tests in a clean checkout?
- Should query-based deletion become the sole documented transport, or should JSON-body fallback remain a supported compatibility contract?
- Is route-level MongoDB independence sufficient long term?

## Next Actions

1. Review pull request #2, including the query/body precedence behavior and the added tests.
2. From a clean checkout of `fix/github-file-deletion`, run `npm ci`, focused deletion tests, and `npm run verify`; preserve exact output or repair failures.
3. Update `docs/openapi/zoro-action.yaml` so `DELETE /api/v1/github/files` sends owner, repo, branch, path, SHA, and message as query parameters in a GPT Builder-compatible form.
4. Merge pull request #2 only after verification and schema reconciliation pass.
5. Deploy the exact verified merge revision and record the Heroku release, commit SHA, and startup evidence.
6. Update the live Zoro Action with the reconciled schema and retain Bearer authentication.
7. Delete `tmp/zoro-smoke-test.txt` from `zoro-smoke-test` using blob SHA `98e0aa9e27c7f0fb860d44429e475fe12771cf8f`; confirm the file is absent and `main` is unchanged.
8. Delete the disposable branch after evidence is captured.
9. Record final verification, deployment, Action, read/write, and cleanup evidence before marking the GitHub Gateway fully verified.
10. Create and verify the Forge and Zoro project records through Zoro.
11. Define the Forge Context API data model, valid task transitions, single-owner enforcement, approval gates, and evidence schemas.
12. Extend requirements-to-tests traceability from the GitHub Gateway to the context domains.
