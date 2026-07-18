# Memory Sequence Game

**Last updated:** 2026-07-18

## Snapshot

- **Lifecycle:** Exploring
- **Working title:** Memory Sequence Game
- **Product name:** Memory Game
- **Repository:** `kofiarhin/memory-game`
- **Type:** Responsive browser game
- **Audience:** General players aged 8+
- **Purpose:** A casual visual memory-training game where players memorize and reconstruct increasingly long card sequences.
- **Status:** MVP implemented directly on `main`; PRD committed; local validation passes; deployment not configured.

## Links

- **Repository:** https://github.com/kofiarhin/memory-game
- **HTTPS clone:** https://github.com/kofiarhin/memory-game.git
- **SSH remote:** `git@github.com:kofiarhin/memory-game.git`
- **Default branch:** `main`
- **Visibility:** Public
- **Product requirements:** https://github.com/kofiarhin/memory-game/blob/main/PRD.md
- **Initial commit:** https://github.com/kofiarhin/memory-game/commit/5ce147d15c91a6f98b8bd4a05c29cb97bab70ac0
- **MVP implementation:** https://github.com/kofiarhin/memory-game/commit/324d276bb6e6f3df3c62c7366cf63fa5ae73146a
- **PRD commit:** https://github.com/kofiarhin/memory-game/commit/7cbc149890af5fbc3dad71aa28b4c1f0b6a31be5
- **Dependency pinning:** https://github.com/kofiarhin/memory-game/commit/07dd7c1d95f1d971ff3d7f4118287e62dde46be7
- **Live application:** Not deployed
- **Ideas Hub:** [Project index](../PROJECTS.md)
- **Ideas Hub draft PR:** https://github.com/kofiarhin/ideas/pull/1

## Current State

The approved MVP has been implemented directly on the application repository's `main` branch.

Players choose colours, shapes, or familiar icons, watch a sequence displayed one card at a time, and reconstruct the order from a shuffled card pool. Correct rounds increase the sequence length. The first incorrect submission consumes the retry, and the second ends the run.

The application includes responsive gameplay screens, local records and settings, accessible card names, keyboard-operable controls, reduced-motion handling, optional sound feedback, position-level validation, and recall-time statistics.

The complete product requirements document is stored as `PRD.md` in the application repository.

Implementation validation was completed locally against the exact dependency versions committed to `package.json`:

- 6 test files passed
- 19 automated tests passed
- Oxlint completed with 0 warnings and 0 errors
- TypeScript compilation succeeded
- Vite production build succeeded

No live deployment has been configured yet.

## Accomplished

- Completed MVP discovery and approved the Shared Understanding Handoff.
- Defined the card categories, gameplay loop, playback timing, recall interaction, retry model, scoring, persistence, accessibility, and responsive behaviour.
- Created the public repository `kofiarhin/memory-game` with `main` as the default branch.
- Generated and committed the complete product requirements document.
- Added the React, TypeScript, Vite, and Tailwind CSS application foundation.
- Implemented colours, shapes, and familiar icon card decks.
- Implemented unique sequences through length five and repeated-card sequences from length six onward.
- Implemented one-second card playback with a 300 ms gap.
- Implemented ordered recall slots, shuffled choices, undo, submission locking, validation, and sequence reveal.
- Adopted `sequence length² × 10` as the MVP scoring formula.
- Implemented one retry per run and game over after the second mistake.
- Implemented best score, highest sequence length, settings, completed runs, completed rounds, and best recall-time persistence.
- Added malformed-storage protection and local-data reset.
- Added optional sound feedback and reduced-motion settings.
- Added responsive mobile and desktop layouts with touch, mouse, and keyboard support.
- Added automated domain, reducer, persistence, timer, and interaction tests.
- Pinned the exact dependency versions used during validation.
- Validated tests, lint, TypeScript, and the production build successfully.

## Current Focus

Deploy the validated MVP, complete a manual browser and accessibility review, and collect the first round of player feedback before expanding scope.

## Core Gameplay

1. The player chooses colours, shapes, or icons.
2. The game generates a sequence starting at three cards.
3. Cards appear one at a time for one second, with a 300 ms gap.
4. The recall screen shows ordered empty slots and a shuffled card grid.
5. The player selects cards to fill the slots in order.
6. The player may undo the latest selection.
7. Submit becomes available only when every slot is filled.
8. Correct answers award `sequence length² × 10` points and add one card.
9. The first incorrect answer consumes the single retry and repeats the same sequence length.
10. A second incorrect answer ends the run.

## Decisions

### Product

- Build a responsive browser game for mobile and desktop.
- Support touch, mouse, and keyboard input.
- Target general players aged 8 and above.
- Position the product as casual memory training, not a medical or therapeutic tool.
- Use one endless progression mode for the MVP.
- Do not require an account or backend.
- Use `memory-game` as the repository name.
- Use `main` as the default branch.

### Technical

- Use React 19, TypeScript, Vite, and Tailwind CSS.
- Use a reducer for game-session state.
- Keep sequence generation, scoring, and validation in pure domain functions.
- Keep browser persistence behind a storage adapter.
- Use Vitest and React Testing Library for automated tests.
- Pin the dependency versions validated during implementation.
- Do not use Redux Toolkit or TanStack Query because the MVP has no suitable global or server state requirement.

### Cards and playback

- Use colours, shapes, and familiar icons as the initial categories.
- Use one category per run.
- Show cards one at a time for one second with a 300 ms gap.
- Keep playback speed constant.
- Keep cards unique through sequence length five.
- Allow and generate repeats from sequence length six onward.
- Include accessible labels and symbols so colour is not the only identifier.

### Scoring and run structure

- Start every run with three cards.
- Add one card after every correct round.
- Score each correct round as `sequence length² × 10`.
- Do not include recall speed in the score.
- Record recall time only as a personal statistic.
- Give the player one retry per run.
- End the run after the second incorrect submission.

### Persistence and feedback

- Store best score, highest sequence length, preferred category, settings, run totals, completed rounds, and best recall time locally.
- Do not persist an active run.
- Mark every submitted position correct or incorrect.
- Reveal the original sequence after submission.
- Use encouraging, non-punitive feedback.
- Continue gameplay safely if browser storage is unavailable or malformed.

## MVP Scope

### Implemented

- Start and category-selection screen
- Endless sequence progression
- Sequence generation and shuffled recall pool
- Timed card playback
- Ordered recall slots
- Undo and submission locking
- Position-level validation and original-sequence reveal
- Retry tracking and game-over flow
- Progressive scoring
- Best-score and highest-length records
- Optional recall-time statistics
- Local settings and data reset
- Responsive mobile and desktop layouts
- Touch, mouse, and keyboard support
- Reduced-motion handling
- Optional sound feedback
- Automated unit and interaction tests
- README and PRD

### Out of scope

- User accounts
- Backend API or MongoDB
- Cloud synchronisation
- Global leaderboards
- Multiplayer
- Daily challenges
- Timed modes
- Mixed-category sequences
- User-created decks
- Medical claims or cognitive assessment
- Native mobile applications
- Monetisation

## Validation

The final implementation was tested locally after dependency versions were pinned:

- `npm test` — 6 files and 19 tests passed
- `npm run lint` — 0 warnings and 0 errors
- `npm run build` — TypeScript and Vite production build passed

Automated coverage includes:

- unique and repeated sequence rules
- deterministic seeded generation
- recall-pool composition
- scoring
- position-level validation
- first-mistake retry behaviour
- second-mistake game over
- persistence parsing and failure handling
- category selection
- playback input locking
- slot filling
- undo
- submit readiness
- local-data reset

## Risks And Edge Cases

- A manual browser pass is still required across representative mobile and desktop devices.
- Keyboard support is built from native controls but should receive a dedicated manual accessibility audit.
- Correct and incorrect results use colour plus context, but screen-reader wording can be strengthened in a later accessibility pass.
- Very long runs create long playback durations even though the recall slots scroll horizontally.
- The current icon set uses emoji, whose appearance varies by operating system.
- There is no cloud backup for locally stored progress.
- Sound depends on browser Web Audio support and user interaction policies.
- The application is not yet deployed, so production hosting behaviour has not been verified.

## Open Questions

- Final brand name and visual identity
- Deployment platform and production URL
- Whether to add a committed lockfile or use an automated dependency update workflow
- Whether to add a formal maximum sequence length
- Whether the next release should prioritise daily challenges, mixed categories, or leaderboards

## Next Actions

1. Deploy the current `main` branch to a static host such as Vercel.
2. Record the production URL in this project note and `PROJECTS.md`.
3. Complete a manual mobile, desktop, keyboard, screen-reader, and reduced-motion review.
4. Add a committed lockfile or configure a deliberate dependency-locking workflow.
5. Collect player feedback on card readability, playback pacing, retry fairness, and difficulty progression.
6. Resolve the final product name and visual brand.
7. Prioritise the first post-MVP enhancement only after validation feedback.
