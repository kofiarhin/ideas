# Workspace Context

**Last updated:** 2026-07-22

## Purpose

This repository is Kofi's persistent brainstorming workspace and broad reference layer across software, business, content, photography, and AI-assisted work.

It exists so any GitHub-enabled AI agent can quickly understand the current project landscape without depending on old chat history.

## How To Use This Context

- Read this file for the broad overview.
- Use `PROJECTS.md` for the authoritative project list.
- Open project files for deeper context.
- Treat `INBOX.md` as unprocessed brainstorming, not confirmed direction.
- Do not write changes without explicit approval.
- Use [`architect/README.md`](architect/README.md) to resolve registered Architect commands.
- Treat [`architect/runs/`](architect/runs/README.md) as operational audit, task, and report history, not canonical project truth.

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

## Project Landscape

### Personal systems and AI workflows

- **Forge** — an active AI-powered software organization with a repository-local PRD, proposed technical specification, and codebase audit; it remains a documentation scaffold and the executable MVP has not started.
- **Zoro** — Forge's Chief Orchestrator and a Context API-connected Custom GPT; live project CRUD has been verified through OpenAI Actions.
- **Context API** — Forge's shared organizational memory and system of record; public CRUD and the authenticated GitHub Gateway are implemented, documentation is strong, and clean verification plus live Action smoke-test evidence remain outstanding.
- **Brain** — a MERN personal operating system with MongoDB-backed memory and AI-assisted workflows; repository-local PRD, technical specification, and audit now exist, while test and deployed-revision evidence remain outstanding.
- **Codex Workflow Kit** — a reusable workflow system for AI coding agents; PRD, technical specification, and audit now exist, with legacy artifact-path documentation reconciliation next.
- **Agent System** — an active runtime-agnostic agent instruction system; setup and synchronization are implemented and user-verified across Codex, Claude Code, and Gemini CLI, with Windows CI, compatibility evidence, and release tagging next.
- **Ideas Hub** — this repository; the shared reference and brainstorming layer across tools.
- **Architect Command System** — Ideas Hub-backed workflows for portfolio auditing, durable task queues, approval-aware execution, verification, reporting, and context maintenance.
- **Archon** — an active AI-powered software architecture studio with strong approved MVP specifications; it remains specification-first and Phase 1 application implementation has not started.

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

1. Approve the smallest executable Forge MVP slice, including state transitions, authority boundaries, evidence requirements, and acceptance criteria.
2. Implement and verify that Forge slice without implying the full multi-agent organization exists.
3. Complete repository and live verification evidence for Context API, Brain, and Agent System.
4. Reconcile Codex Workflow Kit legacy documentation with its current run-scoped artifact model.
5. Begin Archon Phase 1 only through its approved implementation plan and verification gates.

## Workspace Gaps

- Forge has strong initial product documentation but no executable orchestration foundation, tests, CI, API, persistence model, or deployment evidence.
- Context API, Brain, and Agent System need durable verification evidence tied to exact revisions and environments.
- Codex Workflow Kit contains legacy architecture guidance that conflicts with its current `_workflow/runs/<run-id>/` model.
- Archon has strong specifications but no verified application implementation.
- Several projects still need a clear purpose, lifecycle status, current focus, and next actions.
- The inbox will need occasional review so useful ideas move into durable project notes.
- Architect audits depend on project records linking to current authoritative PRDs, specifications, plans, repositories, implementation revisions, and verification evidence.

## Maintenance Rule

Keep this file short enough to read quickly. Move detailed project information into the relevant file under `projects/` and update this overview only when the broad workspace picture changes.