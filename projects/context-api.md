# Context API

**Last updated:** 2026-07-19

## Snapshot

- **Lifecycle:** Active
- **Summary:** Centralized API for structured, reusable user, engineering, project, workflow, glossary, and learning context.
- **Repository:** https://github.com/kofiarhin/context-api
- **Product requirements:** https://github.com/kofiarhin/context-api/blob/main/docs/PRD.md

## Links

- Repository: https://github.com/kofiarhin/context-api
- PRD: https://github.com/kofiarhin/context-api/blob/main/docs/PRD.md

## Current State

- The repository exists and uses `main` as its default branch.
- The initial product requirements document is stored at `docs/PRD.md`.
- The MVP is intentionally read-only and unauthenticated while the architecture is validated.
- The planned implementation is a Node.js and Express API backed by MongoDB.
- The API will expose structured context domains including profile, coding conventions, projects, tasks, instruction sets, Ideas Hub metadata, glossary entries, and durable learnings.

## Current Focus

Validate whether ChatGPT projects, Architect, coding agents, and future applications can retrieve targeted persistent context from a centralized API instead of embedding all durable context in static instructions.

## Brainstorming

- Semantic or vector search across context records
- A context-management dashboard
- Automatic learning ingestion with review and approval
- Event-driven synchronization with the Ideas Hub
- Context versioning and rollback
- Multi-user and project-scoped context

## Decisions

- Context will be divided into independently retrievable domains.
- API routes will be versioned under `/api/v1`.
- The MVP will prioritize read endpoints and repeatable seed data.
- Authentication and authorization are deferred until the architecture is validated.
- The unauthenticated MVP must not store secrets or sensitive private context.
- The Ideas Hub remains the durable narrative source for project knowledge unless a later approved decision changes that responsibility.
- Jest is the default backend test framework.

## Assumptions

- An undisclosed deployment URL is sufficient for limited proof-of-concept testing, but not production security.
- MongoDB is suitable for the initial flexible context schemas.
- Clients will benefit from retrieving targeted context rather than loading the complete context set.

## Open Questions

- Which context domains should be implemented first after the foundation and health endpoint?
- How will Ideas Hub records be synchronized or indexed without creating competing sources of truth?
- What client authentication model should replace the unauthenticated MVP?
- What approval workflow should govern promotion of observations into durable learnings?
- What precedence rules should apply when project-specific conventions conflict with global conventions?

## Next Actions

- Scaffold the Express and MongoDB service.
- Add Jest and establish the backend test structure.
- Implement the health endpoint and shared response envelope.
- Define the first schemas and repeatable seed data.
- Implement read endpoints for the initial context domains.
- Build a sample client call from an Architect or ChatGPT workflow.
- Evaluate payload size, usefulness, consistency, and security requirements before adding writes.
