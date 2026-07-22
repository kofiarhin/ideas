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
- The GitHub App credentials have been stored as Heroku config variables for the `context-api` application. Secret key material is not stored in Ideas Hub or the repository.
- The detailed GitHub Gateway specification and implementation plan are approved and committed directly to `main`.
- As of 2026-07-22, `main` contains the approved GitHub Gateway documents but no committed runtime GitHub Gateway implementation. The feature is not yet deployed or available through Zoro's Action.

## Current Focus

Implement and verify the approved GitHub Gateway, deploy it to the existing Heroku Context API, then extend Zoro's Action schema with the authenticated GitHub operations.

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
- Existing context endpoints remain public and unauthenticated for the current MVP; the new GitHub surface will use separate bearer authentication.
- Clients provide stable identifiers when creating context records; duplicate active or archived identifiers return `409`.
- Stable identifiers and API-managed fields cannot be changed through `PATCH`.
- Context record deletion archives rather than permanently removes data, and restore uses `PATCH` with a non-archived status.
- The public context MVP must not store secrets or sensitive private context.
- The Ideas Hub remains the durable narrative source for project knowledge unless a later approved decision changes that responsibility.
- Zoro must retrieve Context API data before making project recommendations and must ask for approval before persistent writes unless an approved workflow already authorizes them.
- Jest and Supertest are the backend verification tools.
- Context API is Forge's shared memory and system of record but remains an independently maintained infrastructure project.
- Verified repository state and approved repository-local specifications take precedence when Context API records are stale or conflicting.
- GitHub operations will be exposed beneath `/api/v1/github` through the existing Context API and protected by a dedicated `ZORO_GITHUB_API_KEY` bearer token.
- GitHub App installation authentication will be used instead of a personal access token.
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

## Open Questions

- How will Ideas Hub records be synchronized without creating competing sources of truth?
- What authentication model should eventually replace public writes across the non-GitHub Context API endpoints?
- What approval workflow should govern promotion of observations into durable learnings?
- What precedence rules should apply when project-specific conventions conflict with global conventions?
- Should the maintained OpenAPI schema be hosted by the Context API so GPT Actions can import and refresh it from a stable URL?
- Which Context API entities should represent Forge modules, authority boundaries, project relationships, evidence, and task locks?

## Next Actions

- Complete the runtime implementation defined by `docs/GITHUB_GATEWAY_SPEC.md` and `docs/GITHUB_GATEWAY_IMPLEMENTATION_PLAN.md`.
- Add the dedicated bearer-auth middleware, GitHub App installation client, validation, policy enforcement, serializers, services, controllers, and routes.
- Add comprehensive Jest and Supertest coverage without calling the live GitHub API.
- Run `npm test`, `npm run lint`, and `npm run format:check`; resolve all failures before claiming completion.
- Commit the verified implementation to `main` without committing secrets or `.env` values.
- Deploy the verified `main` revision to the `context-api` Heroku application and perform safe read and controlled write smoke tests.
- Save the maintained OpenAPI 3.1 Action schema in the repository, paste the deployed schema into Zoro's GPT Action, and configure the bearer API key in the GPT Builder.
- Verify repository reads, branch/file writes, direct default-branch writes, file deletion, and pull-request lifecycle operations end to end through Zoro.
- Create and verify the Forge and Zoro project records through Zoro.
- Define the Forge Context API data model, valid task transitions, single-owner enforcement, approval gates, and evidence schemas.
- Run the complete MongoDB-backed integration suite in an environment with a working MongoDB test binary.