# Workspace Context

**Last updated:** 2026-07-21

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

- **Forge** — an active AI-powered software organization that coordinates specialist agents from idea through implementation, verification, legal review, release preparation, marketing, and SEO; the MVP operating model is defined and Context API setup is next.
- **Zoro** — Forge's Chief Orchestrator and a Context API-connected Custom GPT; live project CRUD has been verified through OpenAI Actions.
- **Context API** — Forge's shared organizational memory and system of record; public CRUD is implemented and project create, retrieve, patch, and archive operations have been verified through Zoro.
- **Brain** — a MERN personal operating system with MongoDB-backed memory and AI-assisted workflows.
- **Codex Workflow Kit** — a reusable workflow system for AI coding agents.
- **Agent System** — an active runtime-agnostic agent instruction system; streamlined setup and synchronization are implemented and user-verified across Codex, Claude Code, and Gemini CLI, with CI and release evidence next.
- **Ideas Hub** — this repository; the shared reference and brainstorming layer across tools.
- **Architect Command System** — Ideas Hub-backed workflows for portfolio auditing, durable task queues, approval-aware execution, verification, reporting, and context maintenance.
- **Archon** — an active AI-powered software architecture studio with an approved MVP specification; Phase 1 foundation implementation is next.

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

Not documented yet. Agents must not infer priorities from repository order, recent commits, or project maturity.

## Workspace Gaps

- Forge still needs its durable Context API records, approved repository-local PRD, agent authority model, evidence model, task transition rules, and first end-to-end demonstration.
- Several projects still need a clear purpose, lifecycle status, current focus, and next actions.
- Current priorities and cross-project dependencies have not been documented.
- The inbox will need occasional review so useful ideas move into durable project notes.
- Architect audits depend on project records linking to current authoritative PRDs, specifications, plans, and repositories.

## Maintenance Rule

Keep this file short enough to read quickly. Move detailed project information into the relevant file under `projects/` and update this overview only when the broad workspace picture changes.
