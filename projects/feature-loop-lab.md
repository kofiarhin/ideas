# FeatureLoop Lab

**Last updated:** 2026-07-24

## Snapshot

FeatureLoop Lab is a small MERN reference application for testing a reusable AI-assisted feature implementation loop. The application, LoopBoard, provides authentication and personal task management as a controlled environment for evaluating discovery, specification, planning, test-driven implementation, Playwright verification, repair iterations, and evidence-based completion reporting.

## Links

- Intended repository: `https://github.com/kofiarhin/feature-loop-lab` — creation assigned to Zoro; not yet verified
- Product requirements: [`feature-loop-lab/PRD.md`](feature-loop-lab/PRD.md)
- Live: Not documented

## Current State

- Lifecycle: Not documented
- Repository creation and PRD publication have been approved and assigned to Zoro.
- The durable PRD is stored in Ideas Hub as the source artifact for repository initialization.
- No application implementation, automated tests, CI, deployment, or runtime verification has been completed.

## Current Focus

Create the standalone `kofiarhin/feature-loop-lab` repository, publish the approved PRD, initialize the repository foundation, and report primary GitHub evidence before implementation begins.

## Brainstorming

- Use LoopBoard authentication as the first full feature-loop experiment.
- Reuse the same workflow for task CRUD, filtering, optimistic updates, and deployment readiness.
- Compare results with Codex Workflow Kit and consider promoting successful patterns into that project after evidence is available.
- Track discovery questions, repair iterations, tests generated, human corrections, token use, and false completion claims.

## Decisions

- The test product is a lightweight personal task board called LoopBoard.
- The default stack is React with Vite, Tailwind CSS, TanStack Query, Node.js, Express, MongoDB, Mongoose, Vitest, Jest, Supertest, and Playwright.
- The first implementation experiment is authentication.
- Each feature must produce discovery, specification, plan, progress, and verification artifacts.
- Verification includes lint, frontend tests, backend tests, Playwright tests, production build, browser-console inspection, and acceptance-criteria evidence.
- The repair loop stops after five unsuccessful attempts and produces a blocker report.
- Tests must not be weakened or removed merely to produce a passing result.

## Assumptions

- Zoro has or can obtain sufficient GitHub capability to create the new repository; this remains unverified.
- The initial repository can remain private unless Kofi directs otherwise.
- Authentication will use an HTTP-only cookie, subject to repository discovery and security review before implementation.

## Open Questions

- Can Zoro's current GitHub gateway create repositories, or is manual repository creation required?
- Should the new repository be private or public?
- Should the initial repository foundation include only documentation and workflow files, or also scaffold the MERN application?
- Should successful feature-loop patterns be merged into Codex Workflow Kit after the experiment?

## Next Actions

1. Zoro creates `kofiarhin/feature-loop-lab` on an isolated and reviewable workflow where supported.
2. Zoro saves the durable PRD as `PRD.md` in the new repository.
3. Zoro adds a concise `README.md` linking to the PRD and describing the experiment.
4. Zoro reports repository URL, default branch, commit SHA, changed files, and verification readback through the indexed Architect inbox.
5. Architect or Kofi independently verifies the repository and PRD before implementation is treated as ready.
6. Begin repository discovery for the authentication feature only after the foundation is verified.