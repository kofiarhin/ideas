# Piano360

**Last updated:** 2026-07-18

## Snapshot

Piano360 is a MongoDB-backed course MVP for guided piano learning. It uses a `Course -> Lesson -> Step` content model, an Express API, and a React/Vite client. Learner progress is stored locally in the browser.

## Links

- Repository: https://github.com/kofiarhin/piano360
- SSH: `git@github.com:kofiarhin/piano360.git`
- Guided Learning Mode PR: https://github.com/kofiarhin/piano360/pull/2
- Guided Learning Mode specification: https://github.com/kofiarhin/piano360/blob/docs/guided-learning-mode/docs/specs/guided-learning-mode.md
- Guided Learning Mode implementation plan: https://github.com/kofiarhin/piano360/blob/docs/guided-learning-mode/docs/plans/guided-learning-mode.md
- Live: Not documented

## Current State

- Lifecycle: Not documented
- Stack: React, Vite, Node.js, Express, MongoDB, Mongoose
- Testing: Vitest and React Testing Library for the client; Jest, Supertest, and `mongodb-memory-server` for the API
- Current priority: Guided Learning Mode
- Current milestone: Specification and implementation plan prepared; implementation not started

## Current Focus

Implement the first complete pause-and-wait guided lesson experience. The lesson player will present an ordered sequence of expected notes, wait for correct learner input before advancing, provide accessible feedback for incorrect attempts, and persist completion metrics through the existing browser-local progress model.

The approved delivery strategy is vertical and test-first: audit the current implementation, establish deterministic lesson normalization and state-machine behaviour, integrate existing piano inputs, add timing and UI, extend local progress, and validate at least one seeded guided lesson end to end.

## Decisions

- Course content continues to follow the `Course -> Lesson -> Step` model.
- Learner progress remains local to the browser for the MVP.
- Course content remains deliberately published through the seed workflow rather than during application startup.
- The feature is named Guided Learning Mode.
- Guided progression uses pause-and-wait behaviour: incorrect input does not advance; correct input advances exactly once.
- On-screen piano and existing computer-keyboard controls normalize into one input path.
- The guided session uses an explicit reducer or state machine with loading, ready, countdown, waiting, feedback, paused, completed, and error states.
- Microphone pitch recognition, authentication, cloud progress, payments, multiplayer, and course-authoring UI are outside this workstream.
- The specification lives at `docs/specs/guided-learning-mode.md`.
- The implementation plan lives at `docs/plans/guided-learning-mode.md`.

## Completed Work

- Completed discovery and approved the Shared Understanding Handoff.
- Defined functional behaviour, state transitions, persistence boundaries, accessibility requirements, error handling, performance expectations, risks, and acceptance criteria.
- Created a phased test-first implementation plan.
- Opened Piano360 PR #2 containing the specification and plan.

## Remaining Work

- Merge Piano360 PR #2.
- Audit the current lesson page, piano input, keyboard mapping, audio behaviour, local progress adapter, API lesson payload, and seed schema.
- Select the first seeded lesson to support Guided Learning Mode.
- Implement lesson normalization and the guided lesson reducer with tests.
- Integrate the existing input layer, controller timing, player UI, and local progress.
- Add or extend guided lesson seed data only where the audit proves it is required.
- Run lint, typecheck, tests, build, accessibility checks, and responsive manual validation.
- Record the implementation commits, validation results, and release status here after completion.

## Risks and Blockers

- Existing lesson data may not expose stable ordered note-event identifiers.
- Held keyboard keys may emit repeated input events.
- Feedback timers may race with pause, restart, navigation, or unmount.
- Existing browser progress may require defensive migration.
- Consecutive identical notes must remain distinct sequence events.
- A full piano keyboard may require a dedicated scrolling region on small screens.
- No implementation blocker is currently confirmed; Phase 0 audit is required before code changes.

## Assumptions

- Initial input uses the existing on-screen piano and current keyboard mappings.
- Guided note correctness is based on structured lesson data rather than acoustic pitch detection.
- Current local progress storage remains the persistence boundary.
- API and seed schemas change only if current lesson payloads cannot represent ordered expected notes.

## Open Questions

- What lifecycle state should Piano360 use in the Ideas Hub?
- Is a public deployment planned or already available?
- Which existing seeded lesson is the best first Guided Learning Mode candidate? This should be resolved during the implementation audit.

## Next Actions

1. Review and merge Piano360 PR #2.
2. Begin Phase 0 of the implementation plan.
3. Produce a concise audit mapping current files and behaviours to the planned architecture.
4. Implement the feature in the ordered test-first phases.
5. Update this record with completed implementation evidence and the recommended release action.