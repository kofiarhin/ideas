# Forge

**Last updated:** 2026-07-21

## Snapshot

- **Lifecycle:** Active
- **Summary:** AI-powered software organization that coordinates specialist agents to move software from idea through implementation, verification, release preparation, and launch.
- **Repository:** Not created
- **Owner:** Kofi Arhin

## Links

- Context API: [context-api.md](context-api.md)
- Zoro: [zoro.md](zoro.md)
- MVP PRD: Drafted in the approved project discussion; repository-local document not created yet

## Current State

- **Forge** is the approved name for the top-level AI software organization.
- Forge is distinct from Zoro: Forge is the organization, while Zoro is its Chief Orchestrator.
- The Context API is the shared organizational memory and system of record used by Forge agents.
- The approved MVP organization includes Zoro, Architect, Builder, Reviewer, QA, Legal, Marketing, and SEO.
- Architect, Builder, Reviewer, QA, Legal, Marketing, and SEO begin as Forge modules rather than separate top-level projects.
- A draft MVP PRD has been produced covering the organization, lifecycle, agent responsibilities, authority boundaries, evidence requirements, failure behavior, and MVP edge cases.
- A copy-and-paste Zoro setup prompt has been prepared to create Forge, create or link Zoro, link Context API, create module records and documentation, and establish the initial backlog through the Context API.
- Zoro completed a preflight check against the Context API: Forge did not exist, Context API existed, and no existing Zoro project record was found. No write operations had been performed at that checkpoint.

## Current Focus

Establish Forge as a durable project in the Context API, create the Zoro project record, link Context API and Zoro to Forge, create the MVP module records and documentation, and define the initial governed backlog without beginning implementation.

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
- Should Forge receive its own repository now or only after the MVP specification is approved?
- How should Context API and Ideas Hub synchronization avoid competing sources of truth?
- Which runtime will execute specialist agents during the first end-to-end demonstration?
- What constitutes a formal release event for the Marketing and SEO gates in the MVP?

## Next Actions

- Complete and verify creation of the Forge and Zoro project records in the Context API.
- Link the existing Context API project to Forge as shared memory and system of record.
- Create the Forge module records and operating documentation.
- Finalize and approve the Forge MVP PRD.
- Define the Context API data model, task transitions, evidence schema, and agent authority boundaries.
- Keep implementation tasks out of `ready` until approved specifications and acceptance criteria exist.
- Design the first end-to-end Forge demonstration after the foundation is approved.
