# Zoro

**Last updated:** 2026-07-21

## Snapshot

- **Lifecycle:** Active
- **Summary:** Custom GPT and Forge Chief Orchestrator that coordinates governed software workflows using the Context API.
- **Repository:** Not created
- **Owner:** Kofi Arhin

## Links

- Forge: [forge.md](forge.md)
- Context API: [context-api.md](context-api.md)

## Current State

- A private Custom GPT named **Zoro** exists and is connected to the deployed Context API through OpenAI Actions.
- Zoro can retrieve live project and task context before responding.
- The GPT Action exposes health, profile, project, and task operations within the platform operation limit.
- End-to-end project CRUD has been verified through Zoro: create, retrieve, patch, archive, and archived-state retrieval all succeeded against the deployed Context API.
- Zoro has successfully generated project reports from live Context API data while separating stored facts from inference.
- Zoro completed a Forge preflight check and correctly reported that Forge did not yet exist and that no Zoro project record existed in the Context API at that checkpoint.
- Zoro's approved organizational role is Chief Orchestrator within Forge.

## Current Focus

Create Zoro's durable Context API project record, link it to Forge, and formalize its orchestration instructions, approval gates, status enforcement, routing behavior, evidence collection, and failure handling.

## Brainstorming

- Expand Actions to coding conventions, instruction sets, glossary, Ideas Hub metadata, and learnings
- Add specialist-agent routing and structured handoffs
- Add workflow dashboards, audit trails, and run summaries
- Add safe GitHub integration for approved Builder tasks

## Decisions

- Zoro is a separately maintained project within Forge, not the top-level organization.
- Zoro is responsible for orchestration, context retrieval, routing, approvals, progress tracking, and verified Context API updates.
- Zoro must retrieve relevant Context API data before making project recommendations.
- Zoro must ask for approval before persistent writes unless an approved workflow already authorizes the write.
- Zoro must not implement production code, approve its own work, bypass verification, invent project state, or mark unverified work completed.
- Zoro coordinates specialist modules but does not absorb their responsibilities.

## Assumptions

- OpenAI Actions remain suitable for the first orchestration MVP.
- The Context API remains available and compatible with Zoro's current project and task operations.
- Specialist agents can initially be represented through instructions and structured handoffs before dedicated runtimes are introduced.

## Open Questions

- What runtime and transport should Zoro use to invoke specialist agents?
- How should Zoro acquire and enforce task locks for single-Builder ownership?
- Which actions require explicit human approval versus workflow-level preauthorization?
- How should Zoro reconcile stale Context API records with repository-local specifications and implementation state?

## Next Actions

- Create and verify the Zoro project record in the Context API.
- Link Zoro to Forge as Chief Orchestrator.
- Finalize Zoro's Forge orchestration instructions.
- Define valid status transitions and approval rules.
- Define structured agent handoffs and evidence records.
- Keep code execution disabled until the Forge MVP PRD and relevant tasks are approved.
