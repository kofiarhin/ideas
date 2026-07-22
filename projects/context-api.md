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
- Codebase audit: https://github.com/kofiarhin/context-api/blob/main/docs/CODEBASE_AUDIT.md
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
- The maintained OpenAPI schema uses the production URL, declares 27 operations, and remains within the GPT Action limit.
- A repository release validator and aggregate `npm run verify` command are committed.
- Optional defense-in-depth repository restriction is implemented through `GITHUB_REPOSITORY_ALLOWLIST`; leaving it empty preserves the approved all-repository default.
- GitHub request routing bypasses the MongoDB request guard, but `src/server.js` still requires MongoDB before binding the process. This route-level versus process-level availability limitation is documented and intentionally unchanged.
- The 2026-07-22 documentation audit found that Context API already has one of the portfolio's strongest documentation sets: README, PRD, specification, implementation plan, deployment guidance, gateway specification, OpenAPI schema, and release controls.
- The audit identified runtime-version drift between the README and executable manifest and aligned the README with the Node.js 24.x requirement in `package.json`.
- Repository changes are committed, but no green execution output for `npm run verify` has been recorded through the available GitHub connector. The feature must not be marked fully verified until those commands run successfully.
- The GPT Builder Action and final Zoro read/write smoke test remain manual work and have not been completed.

## Accomplished

- Corrected the production server URL in the maintained Zoro Action schema.
- Added deterministic release validation and the aggregate `npm run verify` command.
- Corrected the draft-7 rate-limit header regression assertion.
- Implemented optional repository allowlist enforcement with case-insensitive matching, tests, and example configuration.
- Added a GitHub Gateway release checklist covering verification, deployment, GPT Builder configuration, safe reads, disposable writes, cleanup, and evidence capture.
- Preserved the approved security controls: Bearer authentication, optimistic concurrency, non-force updates, branch-protection enforcement, and blocked workflow-file writes.
- Documented the MongoDB startup dependency without expanding scope into a process-architecture redesign.
- Added a codebase and documentation audit and corrected README runtime-version drift.

## Current Focus

Run the complete repository verification command from a clean checkout, resolve any remaining failures, deploy the verified revision, then complete GPT Builder configuration and the controlled Zoro smoke test.

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
- Claude's earlier deployment and authenticated read report is accurate, but direct Zoro evidence is still required.

## Open Questions

- How will Ideas Hub records be synchronized without creating competing sources of truth?
- What authentication model should eventually replace public writes across non-GitHub Context API endpoints?
- Should the maintained OpenAPI schema eventually be hosted by the Context API for stable import?
- Which Context API entities should represent Forge modules, authority boundaries, project relationships, evidence, and task locks?
- Do any repository verification failures remain after the documented corrections?
- Is route-level MongoDB independence sufficient long term?

## Next Actions

1. From a clean checkout, run `npm ci` and `npm run verify`; preserve exact passing output or repair failures.
2. Deploy only the verified revision and record the deployed commit SHA and startup evidence.
3. Configure the live Zoro Action with the maintained schema and Bearer authentication.
4. Verify non-destructive repository reads through Zoro.
5. Run the disposable-branch create/read/delete smoke test and confirm `main` remains unchanged.
6. Record completion evidence before marking the GitHub Gateway fully verified.
7. Create and verify the Forge and Zoro project records through Zoro.
8. Define the Forge Context API data model, valid task transitions, single-owner enforcement, approval gates, and evidence schemas.
9. Extend requirements-to-tests traceability from the GitHub Gateway to the context domains.