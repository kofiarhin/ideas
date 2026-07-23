# Workspace Context

**Last updated:** 2026-07-23

## Purpose

This repository is Kofi's persistent brainstorming workspace and broad reference layer across software, business, content, photography, and AI-assisted work.

It exists so any GitHub-enabled AI agent can quickly understand the current project landscape without depending on old chat history.

## How To Use This Context

- Read this file for the broad overview.
- Use `PROJECTS.md` for the authoritative project list.
- Open project files for deeper context.
- Treat `INBOX.md` as unprocessed brainstorming, not confirmed direction.
- Use [`zoro-inbox.md`](zoro-inbox.md) for Kofi/Architect assignments and feedback to Zoro.
- Use [`architect-inbox.md`](architect-inbox.md) for Zoro acknowledgements, progress, blockers, approval requests, and completion reports to Architect.
- Follow [`AGENT_COORDINATION.md`](AGENT_COORDINATION.md) for shared access, authority, communication, verification, and write policy.
- Do not write changes without explicit approval or an approved workflow that authorizes the scoped change.
- Use [`architect/README.md`](architect/README.md) to resolve registered Architect commands.
- Treat [`architect/runs/`](architect/runs/README.md) as authoritative operational audit, task, and report history, not canonical project truth.

## Working Profile

Kofi works across full-stack software development, content creation, photography, product thinking, and business tooling.

Default engineering preferences unless a project says otherwise:

- React with the latest Vite
- Node.js and Express
- MongoDB and Mongoose
- Tailwind CSS by default
- TanStack Query for server state
- Redux Toolkit only for shared client state
- Vitest for frontend tests
- Jest and Supertest for backend tests
- Environment variables for secrets and environment-specific configuration

## Recent Accomplishments

- Deployed Context API to Heroku and confirmed release `v14` from `main` revision `bf378b82ed04c88152c3cbb7550a590e63a19601` started successfully and connected to MongoDB.
- Completed the authenticated GitHub Gateway foundation for Zoro with repository, branch, UTF-8 file, and pull-request operations plus branch protection, optimistic concurrency, non-force updates, workflow-file blocking, and optional repository allowlisting.
- Produced a GPT Builder-compatible OpenAPI copy preserving all 27 Context API and GitHub operations after resolving Builder limitations around reusable parameters, path-level parameters, `allOf`, YAML aliases, and duplicate identifier names.
- Configured the private Zoro GPT with Bearer authentication and verified live repository listing through the deployed Context API.
- Verified controlled GitHub writes through Zoro for branch creation, file creation, readback, blob-SHA retrieval, and protection of `main`.
- Identified a DELETE request-body transport defect, traced it to the Action client boundary, and used Zoro to create `fix/github-file-deletion` plus Context API pull request #2 with focused implementation and regression tests. The PR remains open, mergeable, and unverified.
- Established Ideas Hub as the shared durable project brain for Zoro and Architect, while Context API remains the structured operational context service.
- Added `AGENT_COORDINATION.md`, `zoro-inbox.md`, and `architect-inbox.md`, creating a governed two-way loop: Architect assigns approved `ready` work, Zoro reports evidence, Architect independently verifies it, and Architect sends durable feedback.
- Defined mailbox IDs, run IDs, task IDs, work keys, authority boundaries, acceptance criteria, verification requirements, and the rule that mailbox status is never authoritative task status.
- Prepared compact, copy-ready Zoro and Architect instruction sets that preserve each agent's original structure while adding the shared coordination and reporting model within the 8,000-character instruction limit.
- Created Architect run `2026-07-23-001` and assigned ready task `2026-07-23-001-context-api-T001` to Zoro through `ARCH-ZORO-2026-07-23-001` for work key `context-api:zoro-action-query-deletion`.

## Project Landscape

### Personal systems and AI workflows

- **Forge** — an active AI-powered software organization with a repository-local PRD, proposed technical specification, and codebase audit; it remains a documentation scaffold and the executable MVP has not started.
- **Zoro** — Forge's Chief Orchestrator and a Context API-connected Custom GPT; project CRUD, live GitHub repository listing, branch creation, file creation, and file readback are verified. File deletion exposed an Action transport defect, and Zoro opened an unverified fix in Context API pull request #2.
- **Context API** — Forge's shared organizational memory and system of record; public CRUD and the authenticated GitHub Gateway are deployed. GPT Builder configuration and live reads are complete, while deletion remediation, repository verification, redeployment, and final write/cleanup evidence remain outstanding.
- **Brain** — a MERN personal operating system with MongoDB-backed memory and AI-assisted workflows; repository-local PRD, technical specification, and audit now exist, while test and deployed-revision evidence remain outstanding.
- **Codex Workflow Kit** — a reusable workflow system for AI coding agents; PRD, technical specification, and audit now exist, with legacy artifact-path documentation reconciliation next.
- **Agent System** — an active runtime-agnostic agent instruction system; setup and synchronization are implemented and user-verified across Codex, Claude Code, and Gemini CLI, with Windows CI, compatibility evidence, and release tagging next.
- **Ideas Hub** — this repository; the shared reference, communication, and brainstorming layer across tools.
- **Zoro–Architect Coordination** — both agents have governed Ideas Hub access. Architect assigns approved ready work through `zoro-inbox.md`; Zoro reports through `architect-inbox.md`; Architect independently verifies evidence, updates authoritative run state when permitted, and sends feedback through `zoro-inbox.md`.
- **Architect Command System** — Ideas Hub-backed workflows for portfolio auditing, durable task queues, approval-aware execution, verification, reporting, and context maintenance.
- **Archon** — a paused AI-powered software architecture studio with approved MVP specifications; Phase 1 implementation has not started and no work should resume until explicit reactivation.

### Learning and mentorship

- **Piano360** — a guided piano-learning course application.
- **DevKofi** — a MERN mentorship and learning platform.

### Games and interactive experiences

- **Memory Sequence Game** — an exploring responsive browser game where players memorize and reconstruct increasingly long visual card sequences.

### Business and product projects

- **KareBraids** — a braid-service browsing and booking platform.
- **Amas Kitchen** — project details need to be documented.
- **Taxify** — project details need to be documented.
- **Kflix** — project details need to be documented.
- **Banging Prices** — project details need to be documented.
- **MoggOff** — project details need to be documented.
- **Projectos** — project details need to be documented.

## Known Live Products

- Brain: https://brain-pi-black.vercel.app/
- KareBraids: https://karebraids.vercel.app/
- DevKofi: https://devkofi.com/
- Context API: https://context-api-3b9dfadf403e.herokuapp.com/

## Current Priorities

1. Confirm the updated compact Zoro and Architect instructions are saved, then have Zoro pick up ready assignment `ARCH-ZORO-2026-07-23-001` and report through `architect-inbox.md`.
2. Have Architect independently verify Zoro's schema pull request and send durable feedback through `zoro-inbox.md`.
3. Verify Context API pull request #2, merge only after required checks and explicit authority, deploy the exact verified revision, republish the Action, and complete Zoro's delete-and-cleanup smoke test.
4. Approve the smallest executable Forge MVP slice, including state transitions, authority boundaries, evidence requirements, and acceptance criteria.
5. Implement and verify that Forge slice without implying the full multi-agent organization exists.
6. Complete remaining repository and deployed-revision evidence for Brain and Agent System.
7. Reconcile Codex Workflow Kit legacy documentation with its current run-scoped artifact model.

## Workspace Gaps

- The updated compact instruction sets have been prepared, but saving both configurations and validating them in fresh conversations has not been durably confirmed.
- Architect created the first governed ready assignment, but Zoro has not yet durably acknowledged it, opened the schema pull request, or reported through `architect-inbox.md`.
- The first communication-loop task has therefore not yet proven Zoro reporting, Architect independent verification, durable feedback, and closure.
- Context API pull request #2 remains open and mergeable but has no recorded shell or CI verification and has not been merged or deployed.
- The maintained Zoro Action schema still describes file deletion through a request body rather than the query-based interface proposed by pull request #2.
- The disposable `zoro-smoke-test` branch and `tmp/zoro-smoke-test.txt` remain until deletion succeeds and cleanup evidence is retained.
- Forge has strong initial product documentation but no executable orchestration foundation, tests, CI, API, persistence model, or deployment evidence.
- Brain and Agent System need durable verification evidence tied to exact revisions and environments.
- Codex Workflow Kit contains legacy architecture guidance that conflicts with its current `_workflow/runs/<run-id>/` model.
- Archon is paused with strong specifications but no verified application implementation.
- Several projects still need a clear purpose, lifecycle status, current focus, and next actions.

## Maintenance Rule

Keep this file short enough to read quickly. Move detailed project information into the relevant file under `projects/` and update this overview only when the broad workspace picture changes.
