# Piano360

**Last updated:** 2026-07-22

## Snapshot

Piano360 is a MongoDB-backed course MVP for guided piano learning. It uses a `Course -> Lesson -> Step` content model, an Express API, and a React/Vite client. Learner progress is stored locally in the browser.

## Links

- Repository: https://github.com/kofiarhin/piano360
- SSH: `git@github.com:kofiarhin/piano360.git`
- Live: Not documented

## Current State

- Lifecycle: Active
- Stack: React, Vite, Node.js, Express, MongoDB, Mongoose
- Testing: Vitest and React Testing Library for the client; Jest, Supertest, and `mongodb-memory-server` for the API
- Current priority: Convert the completed Phase 0 audit into an approved implementation plan

## Current Focus

- Phase 0 implementation audit completed.
- Review the audit findings and confirm the next implementation scope.

## Brainstorming

_No durable brainstorming notes captured yet._

## Decisions

- Course content follows a `Course -> Lesson -> Step` model.
- Learner progress remains local to the browser for the MVP.
- Course content is deliberately published through the seed workflow rather than during application startup.

## Assumptions

- The completed audit is the Phase 0 implementation audit identified in the Architect run.

## Open Questions

- Which audit findings should be implemented first?
- Is a public deployment planned or already available?

## Next Actions

- Record the audit findings and evidence in the active Architect run report.
- Define and approve the first implementation task from the audit.
