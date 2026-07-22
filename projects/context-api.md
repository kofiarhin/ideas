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
- Public CRUD implementation: https://github.com/kofiarhin/context-api/commit/9f76f11356a80cd92e5f853e148df7f23b0c9340
- GitHub Gateway specification commit: https://github.com/kofiarhin/context-api/commit/9e0c7e238e3fbc9c91c7193103a726562582fca1
- GitHub Gateway plan commit: https://github.com/kofiarhin/context-api/commit/2646b86c3c88fd4d040453ca85e04fcd7575ff08
- Forge: [forge.md](forge.md)
- Zoro: [zoro.md](zoro.md)

## Current State

- The Node.js and Express API is backed by MongoDB through Mongoose and deployed to Heroku at the user-confirmed live URL.
- The API exposes profile, coding conventions, projects, tasks, instruction sets, Ideas Hub metadata, glossary entries, and durable learnings under `/api/v1`.
- Public unauthenticated CRUD is implemented on `main` through commit `9f76f11356a80cd92e5f853e148df7f23b0c9340`.
- Every context domain supports `POST`, `GET`, `PATCH`, and soft-delete `DELETE`; `PUT` is intentionally excluded.
- Writes use client-provided stable identifiers, schema allowlists, immutable identifiers, conflict responses, and existing response envelopes.
- Delete is idempotent, archives records with `archivedAt`, and archived records can be restored through `PATCH`.
- Archived records are excluded from normal collection reads, explicitly queryable by status, and directly retrievable where the domain has an identifier route.
- Local project create and read requests were successfully exercised against the API.
- A private Custom GPT named **Zoro** was created as an AI project manager and connected to the deployed Context API through a GPT Action using an OpenAPI schema.
- Zoro successfully invoked the live `listProjects` action and retrieved current project data from the Context API.
- Zoro generated a ProjectOS report from live API data, clearly separating stored facts from inferred project-management observations and making no persistent changes without approval.
- The deployed GPT Action currently exposes health, profile, project, and task operations, staying within the GPT Action operation limit.
- End-to-end project CRUD through Zoro has been verified against the deployed API: create, retrieve, patch, archive, and archived-state retrieval succeeded.
- Verification confirmed that project creation persisted, patching changed the requested fields while preserving `createdAt`, and soft deletion produced an archived record.
- The original action schema was corrected to remove unsupported project fields and stay within the GPT Builder operation limit.
- Jest and Supertest CRUD coverage was added for every domain. Syntax, lint, formatting, model validation, and mocked service verification passed locally.
- The complete MongoDB-backed integration suite still needs an environment run because the local verifier could not download the MongoDB test binary due DNS resolution failure.
- Context API is an approved infrastructure component of **Forge**, serving as its shared organizational memory and system of record.
- A GitHub App for Zoro has been created and installed with access to all repositories. Its approved repository permissions are metadata read, contents read/write, and pull requests read/write.
- The GitHub App credentials and dedicated `ZORO_GITHUB_API_KEY` bearer credential are stored as Heroku config variables for the `context-api` application. Secret key material is not stored in Ideas Hub or the repository.
- The detailed GitHub Gateway specification and implementation plan are approved and committed directly to `main`.
- The GitHub Gateway runtime implementation is now committed to `main`. The committed slices cover validated configuration and operational errors (`48d5001`), GitHub App client, policy, serialization, and upstream error translation (`508c040`), repository/branch/file/pull-request operations (`125fc45`), route-specific parsing and mounting (`57e7b81`), comprehensive gateway tests (`2e054b4`), documentation and the maintained Action schema (`e9cd1c9`), and the locked Octokit dependency (`dfabd94`).
- The maintained OpenAPI schema at `docs/openapi/zoro-action.yaml` exposes 27 operations: 15 context operations and 12 authenticated GitHub operations.
- The committed Action schema still contains the placeholder server URL `https://context-api.herokuapp.com`; it must be changed to the actual deployed URL before being pasted into GPT Builder.
- Claude Code reported a successful Heroku deployment, healthy replacement dynos, authenticated GitHub App access, and a live repository-list read returning three repositories. This deployment/read evidence has not yet been independently reproduced through Zoro.
- No controlled live file-write/delete smoke test has been completed, and the GPT Builder Action has not yet been updated with the new schema and bearer credential.
- Claude reported five pre-existing test failures unrelated to the gateway, involving an `express-rate-limit` header rename and seed-data drift. These remain unresolved and should not be silently treated as passing verification.
- The backend gateway is implemented, but the end-to-end Zoro GitHub feature is not complete until the Action configuration and controlled write verification succeed.

## Current Focus

Complete the manual Zoro Action integration and controlled end-to-end verification: correct the production server URL in the maintained schema, configure GPT Builder bearer authentication, then verify repository reads and a disposable branch file create/delete sequence through a fresh Zoro conversation.

## Brainstorming

- Semantic or vector search across context records
- A context-management dashboard
- Automatic learning ingestion with review and approval
- Event-driven synchronization with the Ideas Hub
- Context versioning and rollback
- Multi-user and project-scoped context
- Expand Zoro with additional Actions for coding conventions, instruction sets, glossary entries, Ideas Hub context, and learnings
- Forge-specific entities or schemas for agent roles, workflow evidence, approvals, relationships, and task ownership

## Decisions

- Context is divided into independently retrievable domains.
- API routes are versioned under `/api/v1`.
- The simplified context MVP supports `POST`, `GET`, `PATCH`, and soft-delete `DELETE`; `PUT` is excluded.
- Existing context endpoints remain public and unauthenticated for the current MVP; the new GitHub surface uses separate bearer authentication.
- Clients provide stable identifiers when creating context records; duplicate active or archived identifiers return `409`.
- Stable identifiers and API-managed fields cannot be changed through `PATCH`.
- Context record deletion archives rather than permanently removes data, and restore uses `PATCH` with a non-archived status.
- The public context MVP must not store secrets or sensitive private context.
- The Ideas Hub remains the durable narrative source for project knowledge unless a later approved decision changes that responsibility.
- Zoro must retrieve Context API data before making project recommendations and must ask for approval before persistent writes unless an approved workflow already authorizes them.
- Jest and Supertest are the backend verification tools.
- Context API is Forge's shared memory and system of record but remains an independently maintained infrastructure project.
- Verified repository state and approved repository-local specifications take precedence when Context API records are stale or conflicting.
- GitHub operations are exposed beneath `/api/v1/github` through the existing Context API and protected by a dedicated `ZORO_GITHUB_API_KEY` bearer token.
- GitHub App installation authentication is used instead of a personal access token.
- Zoro is approved to list and inspect repositories, read files and directories, create and update branches without force-pushing, create/update/delete UTF-8 files, write directly to repository default branches including `main` and `master`, and create/read/update/close/merge pull requests.
- GitHub branch protection remains authoritative and must not be bypassed.
- Zoro must not modify `.github/workflows/*`, manage Actions, access secrets, administer repositories or organizations, manage collaborators, force-push, or bypass branch protection.
- File updates and deletions require the current blob SHA; branch updates and pull-request merges require optimistic concurrency checks.
- Direct implementation on `main` is explicitly authorized for this approved GitHub Gateway scope.

## Assumptions

- MongoDB remains suitable for the initial flexible context schemas.
- Clients benefit from retrieving and updating targeted context rather than loading the complete context set.
- Rate limiting, payload limits, explicit serializers, and schema validation provide basic operational guardrails but are not substitutes for authentication.
- The current Heroku deployment URL may change and should remain configuration-specific rather than becoming a reusable Agent System default.
- Existing project and task entities may be sufficient for the first Forge setup, but dedicated evidence or relationship structures may still be required.
- The installed GitHub App permissions are sufficient for the approved content and pull-request operations, subject to each repository's branch protection and rulesets.
- Claude's deployment and live read report is accurate, but end-to-end completion still requires direct Zoro verification.

## Open Questions

- How will Ideas Hub records be synchronized without creating competing sources of truth?
- What authentication model should eventually replace public writes across the non-GitHub Context API endpoints?
- What approval workflow should govern promotion of observations into durable learnings?
- What precedence rules should apply when project-specific conventions conflict with global conventions?
- Should the maintained OpenAPI schema be hosted by the Context API so GPT Actions can import and refresh it from a stable URL?
- Which Context API entities should represent Forge modules, authority boundaries, project relationships, evidence, and task locks?
- Should the five pre-existing test failures be repaired before the GitHub Gateway is declared fully verified?

## Next Actions

- **Next actionable task:** update `docs/openapi/zoro-action.yaml` to use `https://context-api-3b9dfadf403e.herokuapp.com`, paste the complete schema into Zoro's GPT Action, configure the bearer API key, start a fresh Zoro chat, and run the documented read plus disposable-branch file create/delete smoke test.
- Record the exact Zoro smoke-test evidence, including repository listing, file read, branch creation, file creation, current blob SHA retrieval, and deletion.
- After the controlled smoke test passes, update Ideas Hub to mark the GitHub Gateway available through Zoro and remove the remaining integration blocker.
- Decide whether to fix the five pre-existing test failures immediately or track them as separate verified maintenance work.
- Create and verify the Forge and Zoro project records through Zoro.
- Define the Forge Context API data model, valid task transitions, single-owner enforcement, approval gates, and evidence schemas.
- Run the complete MongoDB-backed integration suite in an environment with a working MongoDB test binary.
