# Zoro

**Last updated:** 2026-07-22

## Snapshot

- **Lifecycle:** Active
- **Summary:** Custom GPT and Forge Chief Orchestrator that coordinates governed software workflows using the Context API.
- **Repository:** Not created
- **Owner:** Kofi Arhin

## Links

- Forge: [forge.md](forge.md)
- Context API: [context-api.md](context-api.md)
- GitHub Gateway specification: https://github.com/kofiarhin/context-api/blob/main/docs/GITHUB_GATEWAY_SPEC.md
- GitHub Gateway implementation plan: https://github.com/kofiarhin/context-api/blob/main/docs/GITHUB_GATEWAY_IMPLEMENTATION_PLAN.md

## Current State

- A private Custom GPT named **Zoro** exists and is connected to the deployed Context API through OpenAI Actions.
- Zoro can retrieve live project and task context before responding.
- The deployed GPT Action exposes health, profile, project, and task operations within the platform operation limit.
- End-to-end project CRUD has been verified through Zoro: create, retrieve, patch, archive, and archived-state retrieval all succeeded against the deployed Context API.
- Zoro has successfully generated project reports from live Context API data while separating stored facts from inference.
- Zoro completed a Forge preflight check and correctly reported that Forge did not yet exist and that no Zoro project record existed in the Context API at that checkpoint.
- Zoro's approved organizational role is Chief Orchestrator within Forge.
- A dedicated GitHub App for Zoro has been created and installed with access to all repositories. Its approved permissions are metadata read, contents read/write, and pull requests read/write.
- The GitHub App credentials are stored in the Heroku configuration for the `context-api` application. Secret values and private key material are intentionally excluded from Ideas Hub.
- The GitHub Gateway scope, endpoint contract, access boundaries, security controls, and implementation sequence are approved and committed to the Context API repository.
- As of 2026-07-22, the runtime GitHub Gateway is not committed, deployed, or exposed through Zoro's Action. Zoro therefore cannot yet perform GitHub repository operations through Context API.

## Current Focus

Complete, verify, and deploy the authenticated GitHub Gateway in Context API, then update Zoro's Action schema so it can perform the approved repository code and pull-request operations.

## Brainstorming

- Expand Actions to coding conventions, instruction sets, glossary, Ideas Hub metadata, and learnings
- Add specialist-agent routing and structured handoffs
- Add workflow dashboards, audit trails, and run summaries
- Add repository-level approval policies or narrower access profiles for projects that later require stricter controls

## Decisions

- Zoro is a separately maintained project within Forge, not the top-level organization.
- Zoro is responsible for orchestration, context retrieval, routing, approvals, progress tracking, and verified Context API updates.
- Zoro must retrieve relevant Context API data before making project recommendations.
- Zoro must ask for approval before persistent writes unless an approved workflow already authorizes the write.
- Zoro must not approve its own work, bypass verification, invent project state, or mark unverified work completed.
- Zoro coordinates specialist modules but does not absorb their responsibilities.
- Zoro's GitHub access will be provided through authenticated `/api/v1/github` routes in the existing Context API Action rather than replacing Context API or adding a personal access token.
- Zoro is approved to read repositories, branches, directories, and files; create and update branches without force-pushing; create, update, and delete UTF-8 files; write directly to default branches including `main` and `master`; and create, read, update, close, and merge pull requests.
- Direct default-branch writes, file deletion, and pull-request merging are explicitly approved within the GitHub Gateway scope.
- Zoro must honor repository branch protection and rulesets and must use optimistic concurrency for file replacement, file deletion, branch updates, and pull-request merges.
- Zoro must not modify `.github/workflows/*`, manage GitHub Actions, access or modify secrets, administer repositories or organizations, manage collaborators, force-push, or bypass branch protection.
- All Zoro GitHub routes require a dedicated bearer credential separate from the existing public context endpoints.
- Runtime implementation may be committed directly to the Context API `main` branch for this approved scope, but completion still requires tests, deployment, and end-to-end verification.

## Assumptions

- OpenAI Actions remain suitable for the first orchestration MVP.
- The Context API remains available and compatible with Zoro's current project and task operations.
- Specialist agents can initially be represented through instructions and structured handoffs before dedicated runtimes are introduced.
- The installed GitHub App permissions are sufficient for the approved code and pull-request operations, subject to repository-specific protection rules.

## Open Questions

- What runtime and transport should Zoro use to invoke specialist agents?
- How should Zoro acquire and enforce task locks for single-Builder ownership?
- Which future workflows require explicit human approval versus workflow-level preauthorization once GitHub operations are available?
- How should Zoro reconcile stale Context API records with repository-local specifications and implementation state?
- Should some repositories later use stricter GitHub Gateway policies than the current all-repository code and pull-request scope?

## Next Actions

- Complete the Context API GitHub Gateway implementation against the approved specification and plan.
- Verify the implementation with Jest, Supertest, linting, formatting, and regression coverage.
- Deploy the verified Context API revision to Heroku and run safe read and controlled write smoke tests.
- Save and validate the maintained OpenAPI 3.1 schema, then update Zoro's GPT Action with all deployed GitHub operations.
- Configure Zoro's Action bearer authentication without exposing the credential in the schema or repository.
- Verify repository listing, content reads, branch creation and updates, direct default-branch file writes, file deletion, pull-request creation and updates, closing, and merging through Zoro.
- Create and verify the Zoro project record in the Context API.
- Link Zoro to Forge as Chief Orchestrator.
- Finalize Zoro's Forge orchestration instructions, status transitions, approval rules, structured handoffs, and evidence records.