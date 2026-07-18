# Archon

**Last updated:** 2026-07-18

## Snapshot

- **Lifecycle:** Active
- **Product:** AI-powered software architecture studio
- **Tagline:** From idea to architecture.
- **Current phase:** Approved MVP specification; implementation has not started

Archon transforms a plain-language product idea into a structured, reviewable, implementation-ready engineering blueprint. The MVP focuses on architecture documentation, clarification, review, revision, validation, and Markdown export. Complete application-code generation and autonomous deployment are outside MVP scope.

## Links

- **Repository:** https://github.com/kofiarhin/archon
- **Approved PRD and architecture:** https://github.com/kofiarhin/archon/pull/1
- **Approved implementation specification and plan:** https://github.com/kofiarhin/archon/pull/2
- **Latest verified merge:** https://github.com/kofiarhin/archon/commit/f89140062b069487c35319b525cc15aae100dc8b

## Current State

The product requirements, architecture, security baseline, implementation specification, API and data design, testing and operations strategy, and phased implementation plan have been reviewed and merged into `main`.

The approved MVP direction includes:

- Next.js, React, and TypeScript modular monolith
- separately runnable background worker
- PostgreSQL with Prisma
- Redis with BullMQ
- Auth.js using email magic-link and GitHub OAuth
- OpenAI Responses API behind a provider-neutral adapter
- private workspace projects
- Markdown export with text-based Mermaid diagrams

No application implementation has been verified yet.

## Current Focus

Begin Phase 1 foundation work from the approved implementation plan:

1. initialize the pnpm workspace and application boundaries
2. establish formatting, linting, type-checking, tests, build, and CI
3. add validated runtime configuration
4. add local PostgreSQL and Redis through Docker Compose
5. establish the initial database and migration foundation

Implementation must follow the approved specifications and remain isolated in reviewable branches and pull requests.

## Brainstorming

- Post-MVP candidates include visual architecture editing, collaborative review, OpenAPI and infrastructure exports, GitHub repository bootstrapping, starter-code generation, organization controls, and billing.
- These are not approved implementation scope.

## Decisions

- The MVP produces architecture and delivery artifacts rather than complete production applications.
- A modular monolith plus a separate background worker is the approved initial architecture.
- Generated content remains distinct from user-approved decisions.
- Every artifact revision is immutable and approval applies to a specific revision.
- Projects are private to their workspace for the MVP.
- Markdown is the required MVP export format.
- Coding-agent prompts may only target explicitly approved implementation tasks and do not authorize execution.
- The implementation specification and plan were approved and merged in PR #2 at commit `f89140062b069487c35319b525cc15aae100dc8b`.

## Assumptions

- Exact hosting provider remains intentionally undecided.
- AI model identifiers will remain configurable behind the provider adapter.
- Retention defaults documented in the approved implementation specification will be validated during implementation and before production release.

## Open Questions

- Which hosting platform will be used for staging and production?
- What exact OpenAI model configuration and fallback policy will be used at launch?
- What quality thresholds will be required for the synthetic architecture evaluation set?
- What usage limits will apply before billing is introduced?

## Next Actions

1. Create and approve the first Phase 1 implementation task from `docs/specs/IMPLEMENTATION_PLAN.md`.
2. Implement the repository and CI foundation in a dedicated branch and pull request.
3. Verify clean installation, local web and worker startup, safe configuration failure, and required CI checks.
4. Update this project record only after the implementation work is verified and merged.
