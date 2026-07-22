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
- Maintained Action schema: https://github.com/kofiarhin/context-api/blob/main/docs/openapi/zoro-action.yaml

## Current State

- A private Custom GPT named **Zoro** exists and is connected to the deployed Context API through OpenAI Actions.
- Zoro can retrieve live project and task context before responding.
- The currently configured GPT Action exposes health, profile, project, and task operations within the platform operation limit.
- End-to-end project CRUD has been verified through Zoro: create, retrieve, patch, archive, and archived-state retrieval all succeeded against the deployed Context API.
- Zoro has successfully generated project reports from live Context API data while separating stored facts from inference.
- Zoro completed a Forge preflight check and correctly reported that Forge did not yet exist and that no Zoro project record existed in the Context API at that checkpoint.
- Zoro's approved organizational role is Chief Orchestrator within Forge.
- A dedicated GitHub App for Zoro has been created and installed with access to all repositories. Its approved permissions are metadata read, contents read/write, and pull requests read/write.
- The GitHub App credentials and dedicated bearer credential are stored in the Heroku configuration for the `context-api` application. Secret values and private key material are intentionally excluded from Ideas Hub.
- The GitHub Gateway specification, endpoint contract, access boundaries, security controls, implementation plan, runtime code, automated tests, documentation, Octokit dependency, and maintained Action schema are now committed to the Context API `main` branch.
- The maintained schema defines 27 operations: 15 existing Context API operations and 12 authenticated GitHub operations.
- Claude Code reported successful Heroku deployment, healthy replacement dynos, GitHub App authentication, and a live repository-list read returning three repositories. This has not yet been independently reproduced through Zoro.
- The maintained Action schema still uses the placeholder server URL `https://context-api.herokuapp.com` instead of the actual Heroku URL.
- The new schema and bearer authentication have not yet been configured in GPT Builder, so Zoro cannot yet invoke the GitHub Gateway through its live Action.
- No controlled live write/delete smoke test has been completed through Zoro.
- The backend implementation is substantially complete, but the user-facing Zoro GitHub capability remains incomplete until manual Action setup and end-to-end verification pass.

## Current Focus

Complete the manual GPT Builder integration and controlled verification: correct the Action schema server URL, configure the bearer key, start a fresh Zoro conversation, verify repository listing and file reads, then create and delete a disposable file on a temporary branch.

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
- Zoro's GitHub access is provided through authenticated `/api/v1/github` routes in the existing Context API Action rather than replacing Context API or adding a personal access token.
- Zoro is approved to read repositories, branches, directories, and files; create and update branches without force-pushing; create, update, and delete UTF-8 files; write directly to default branches including `main` and `master`; and create, read, update, close, and merge pull requests.
- Direct default-branch writes, file deletion, and pull-request merging are explicitly approved within the GitHub Gateway scope.
- Zoro must honor repository branch protection and rulesets and must use optimistic concurrency for file replacement, file deletion, branch updates, and pull-request merges.
- Zoro must not modify `.github/workflows/*`, manage GitHub Actions, access or modify secrets, administer repositories or organizations, manage collaborators, force-push, or bypass branch protection.
- All Zoro GitHub routes require a dedicated bearer credential separate from the existing public context endpoints.
- Runtime implementation may be committed directly to the Context API `main` branch for this approved scope, but completion still requires live Action configuration and end-to-end verification.

## Assumptions

- OpenAI Actions remain suitable for the first orchestration MVP.
- The Context API remains available and compatible with Zoro's current project and task operations.
- Specialist agents can initially be represented through instructions and structured handoffs before dedicated runtimes are introduced.
- The installed GitHub App permissions are sufficient for the approved code and pull-request operations, subject to repository-specific protection rules.
- Claude's deployment and authenticated read report is accurate, but Zoro-level evidence is still required before the feature is marked complete.

## Open Questions

- What runtime and transport should Zoro use to invoke specialist agents?
- How should Zoro acquire and enforce task locks for single-Builder ownership?
- Which future workflows require explicit human approval versus workflow-level preauthorization once GitHub operations are available?
- How should Zoro reconcile stale Context API records with repository-local specifications and implementation state?
- Should some repositories later use stricter GitHub Gateway policies than the current all-repository code and pull-request scope?
- Should the five reported pre-existing Context API test failures be fixed before declaring the broader delivery fully verified?

## Next Actions

- **Next actionable task:** change the server URL in `docs/openapi/zoro-action.yaml` to `https://context-api-3b9dfadf403e.herokuapp.com`, paste the complete schema into Zoro's GPT Action, configure the `ZORO_GITHUB_API_KEY` as Bearer authentication, save the GPT, and start a fresh conversation.
- Verify a non-destructive repository listing and `README.md` read through Zoro.
- Run a controlled write smoke test on a disposable branch: create a temporary UTF-8 file, retrieve its blob SHA, delete it using that SHA, and preserve the resulting evidence.
- After the smoke test passes, update Ideas Hub to mark Zoro's GitHub repository access as available and verified.
- Create and verify the Zoro project record in the Context API.
- Link Zoro to Forge as Chief Orchestrator.
- Finalize Zoro's Forge orchestration instructions, status transitions, approval rules, structured handoffs, and evidence records.
