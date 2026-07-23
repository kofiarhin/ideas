# Brain

**Last updated:** 2026-07-22

## Snapshot

Brain OS v2 is a full-stack MERN personal operating system where MongoDB stores durable memory, Codex CLI provides the AI workflow layer, and React provides the interface.

The application covers notes, tasks, plans, reviews, goals, projects, ideas, context, deliverables, generated posts, and day plans.

## Links

- Repository: https://github.com/kofiarhin/brain
- SSH: `git@github.com:kofiarhin/brain.git`
- Live: https://brain-pi-black.vercel.app/
- Product requirements: https://github.com/kofiarhin/brain/blob/main/docs/PRD.md
- Technical specification: https://github.com/kofiarhin/brain/blob/main/docs/TECHNICAL_SPEC.md
- Codebase audit: https://github.com/kofiarhin/brain/blob/main/docs/CODEBASE_AUDIT.md

## Reconciliation

```yaml
repository: kofiarhin/brain
default_branch: main
authority_document: docs/PRD.md
authority_revision: 69830f4d25256f6d814087034a5552c65e44d567
implementation_revision: 1302ad67912091ab806f0b08b607e8c14d4f3d93
last_reconciled: 2026-07-22
reconciliation_status: unverified
```

The repository now has a PRD, technical specification, and codebase audit derived from current repository evidence. Test execution, deployed revision, and runtime behavior still require separate verification.

## Current State

- Lifecycle: Not documented
- Stack: React, Vite, Node.js 22.x, Express, MongoDB, Mongoose
- AI workflow: Codex CLI reads and updates MongoDB-backed context
- Chat access: authenticated read-only conversational route backed by application context
- Write behavior: CRUD routes and explicit Codex-command workflows; the frontend chat is not an autonomous write surface
- Deployment patterns documented: Heroku single-app and Vercel frontend with Heroku backend
- Current priority: Not documented
- A repository-derived PRD, technical specification, and codebase audit were added to `main` on 2026-07-22.
- PR #9, `Audit app brain data flow and UX states`, merged into `main` on 2026-07-18 as commit `1302ad67912091ab806f0b08b607e8c14d4f3d93`.
- PR #9 reports fixes for structured list rendering, Dashboard loading/error/empty states, and Europe/London day calculations. Its description states that the test suite was not run in the implementation environment, so those behaviors remain implementation evidence rather than verified runtime state.
- Vercel reported a successful deployment status for the final documentation commit, but this does not verify application tests or confirm that the linked production runtime matches the documented implementation revision.

## Current Focus

Establish release and runtime evidence for the current application, confirm the immediate product milestone, and maintain requirements-to-code and requirements-to-tests traceability from the new authority documents.

## Requirement Ledger

| Requirement ID | Requirement | Authority | Status | Implementation evidence | Verification |
| --- | --- | --- | --- | --- | --- |
| `BRAIN-UX-001` | Render structured list items as readable text | PR #9 | `implemented_unverified` | PR #9; commit `1302ad67912091ab806f0b08b607e8c14d4f3d93` | Test execution not recorded |
| `BRAIN-UX-002` | Show Dashboard loading, error, and empty states | PR #9 | `implemented_unverified` | PR #9; commit `1302ad67912091ab806f0b08b607e8c14d4f3d93` | Test execution not recorded |
| `BRAIN-TIME-001` | Use Europe/London day calculations for Dashboard state | PR #9 | `implemented_unverified` | PR #9; commit `1302ad67912091ab806f0b08b607e8c14d4f3d93` | Test execution not recorded |

## Brainstorming

_No durable brainstorming notes captured yet._

## Decisions

- MongoDB is the application source of truth for personal operating-system data.
- Codex-command workflows perform AI-assisted updates.
- The authenticated chat interface is read-only unless write behavior is explicitly implemented later.
- Day planning is separate from the memory-only `update brain` workflow.
- Repository-local `docs/PRD.md` and `docs/TECHNICAL_SPEC.md` now provide the documentation baseline for product and technical intent; implementation and runtime evidence remain independently verifiable.
- PR #10 was closed without merging because its chat direction is superseded by current `main`.
- PR #6 was closed without merging because its modular agent-instruction proposal is superseded.

## Assumptions

- Closing PRs #10 and #6 does not remove any current behavior already present on `main`.
- Commit `1302ad67912091ab806f0b08b607e8c14d4f3d93` remains relevant implementation evidence for the reconciled UX requirements.

## Open Questions

- Which Brain workflow is the current priority?
- What should remain inside Brain versus this GitHub Ideas Hub?
- Which data should other agents be allowed to read or update?
- Has the current application revision passed the full server and client test suites?
- Which commit is currently deployed to the linked production environment?
- Which requirements in the new PRD and technical specification already have code and test evidence?

## Next Actions

1. Run `npm test` from a clean checkout and record server and client results.
2. Verify the deployed production revision and smoke-test the documented health, version, authentication, CRUD, and read-only chat boundaries.
3. Map the new PRD and technical specification requirements to implementation files and tests.
4. Confirm and document the immediate product milestone and lifecycle state.
5. Reconcile this record with the verified code and deployment revision.
