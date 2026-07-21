# Forge

**Last updated:** 2026-07-21

## Snapshot

- **Lifecycle:** Active
- **Summary:** AI-powered software organization that coordinates specialist agents to move software from idea through implementation, verification, release preparation, and launch.
- **Repository:** https://github.com/kofiarhin/forge
- **Owner:** Kofi Arhin

## Links

- Repository: https://github.com/kofiarhin/forge
- Context API: [context-api.md](context-api.md)
- Zoro: [zoro.md](zoro.md)
- Approved MVP PRD pull request: https://github.com/kofiarhin/forge/pull/1
- Repository-local MVP PRD: `docs/forge-mvp-prd.md` on PR #1 until merged

## Current State

- **Forge** is the approved name for the top-level AI software organization.
- Forge is distinct from Zoro: Forge is the organization, while Zoro is its Chief Orchestrator.
- The Context API is the shared organizational memory and system of record used by Forge agents.
- The approved MVP organization includes Zoro, Architect, Builder, Reviewer, QA, Legal, Marketing, and SEO.
- Architect, Builder, Reviewer, QA, Legal, Marketing, and SEO begin as Forge modules rather than separate top-level projects.
- Kofi Arhin explicitly approved the Forge MVP PRD on 2026-07-21.
- The Forge GitHub repository now exists and has been bootstrapped with an initial `main` commit.
- Draft pull request [kofiarhin/forge#1](https://github.com/kofiarhin/forge/pull/1) adds the approved repository-local MVP PRD and links it from the README.
- The PRD approval does not authorize source-code implementation by itself. Implementation remains gated on approved foundation specifications and tasks explicitly marked `ready`.
- The Context API task `forge-001 — Finalize and approve the Forge MVP PRD` was previously recorded as `backlog` / `needs_approval`; its approval state still needs to be persisted through the Context API.
- A copy-and-paste Zoro setup prompt has been prepared to create Forge, create or link Zoro, link Context API, create module records and documentation, and establish the initial backlog through the Context API.
- Zoro completed a preflight check against the Context API: Forge did not exist, Context API existed, and no existing Zoro project record was found. No write operations had been performed at that checkpoint.

## Current Focus

Review and merge the approved MVP PRD pull request, persist the approval in the Context API, and define the foundation specifications required before any implementation task can become `ready`.

## Brainstorming

- Future specialist agents for product discovery, release operations, security, research, customer feedback, finance, sales, and support
- Promotion of mature Forge modules into independently versioned projects
- Event-driven synchronization between Forge workflow records, GitHub, and the Ideas Hub
- Reusable Forge templates for other founders or software teams

## Decisions

- The top-level project is named **Forge**.
- Forge is an AI-powered software organization, not merely an agent framework.
- Zoro is the Chief Orchestrator within Forge and is not the parent organization.
- Context API remains a separate infrastructure project and serves as Forge's shared memory and system of record.
- Zoro remains a separately maintained project because it has a distinct orchestration purpose and can evolve independently.
- The MVP specialist roles are Architect, Builder, Reviewer, QA, Legal, Marketing, and SEO.
- Specialist roles other than Zoro start as Forge modules, not separate projects.
- The Forge MVP PRD was approved by Kofi Arhin on 2026-07-21.
- The repository-local PRD becomes the authoritative Forge MVP product document after PR #1 is merged.
- Only tasks with status `ready` may be implemented.
- One Builder may actively own a task at a time.
- Builders cannot approve or complete their own work; Reviewer and QA provide independent verification.
- Every agent must retrieve current context before acting and must produce evidence for its work.
- A required-stage failure stops downstream execution and results in a `blocked` or `failed` state.
- Marketing and SEO may reference only QA-verified and released features.
- Human approval remains mandatory for implementation and other material or sensitive decisions.

## Assumptions

- The Context API can represent the Forge project, linked projects, tasks, and documentation records without immediate schema changes.
- The first Forge implementation can coordinate one repository and one active Builder per task.
- Legal provides first-pass risk review and does not replace qualified legal counsel.

## Open Questions

- Which Context API entities should hold Forge modules, documentation, evidence, relationships, and agent authority rules?
- How should Context API and Ideas Hub synchronization avoid competing sources of truth?
- Which runtime will execute specialist agents during the first end-to-end demonstration?
- What constitutes a formal release event for the Marketing and SEO gates in the MVP?

## Next Actions

- Review and merge https://github.com/kofiarhin/forge/pull/1.
- Persist the PRD approval and updated `forge-001` status in the Context API.
- Complete and verify creation of the Forge and Zoro project records in the Context API.
- Link the existing Context API project to Forge as shared memory and system of record.
- Define and approve the Forge module contracts.
- Define and approve the Context API data model, task transitions, evidence schema, and agent authority boundaries.
- Create the Forge module records and operating documentation after their contracts are approved.
- Keep implementation tasks out of `ready` until approved specifications and acceptance criteria exist.
- Design and approve the first end-to-end Forge demonstration specification before implementation.
