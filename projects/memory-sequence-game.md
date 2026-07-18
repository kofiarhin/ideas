# Memory Sequence Game

**Last updated:** 2026-07-18

## Snapshot

- **Lifecycle:** Exploring
- **Working title:** Memory Sequence Game
- **Repository:** `kofiarhin/memory-game`
- **Type:** Responsive browser game
- **Audience:** General players aged 8+
- **Purpose:** A casual visual memory-training game where players memorize and reconstruct increasingly long card sequences.
- **Status:** MVP concept and detailed PRD completed; application repository created and awaiting its first commit.

## Links

- **Repository:** https://github.com/kofiarhin/memory-game
- **HTTPS clone:** https://github.com/kofiarhin/memory-game.git
- **SSH remote:** `git@github.com:kofiarhin/memory-game.git`
- **Default branch:** `main`
- **Visibility:** Public
- **Live application:** Not available
- **Product requirements document:** `memory-game-PRD.md` generated outside GitHub; awaiting commit as `PRD.md` on `main`
- **Ideas Hub:** [Project index](../PROJECTS.md)
- **Ideas Hub draft PR:** https://github.com/kofiarhin/ideas/pull/1

## Current State

The MVP gameplay model has been defined and approved.

A player selects one visual category—colours, shapes, or familiar icons—then watches a generated sequence shown one card at a time. After playback, the player reconstructs the sequence using ordered slots and a shuffled card grid.

The game begins with three cards. Every correct round adds one card. The player receives one retry at the current sequence length; a second incorrect submission ends the run.

A detailed 669-line product requirements document was generated on 2026-07-18. It covers product goals, non-goals, audience, gameplay rules, scoring, state management, persistence, screens, accessibility, responsiveness, technical direction, functional requirements, acceptance criteria, testing, risks, milestones, and definition of done.

The public application repository `kofiarhin/memory-game` has now been created. GitHub reports `main` as the default branch and confirms that the connected GitHub app has administrative and push access. The repository is currently empty and has not received its first commit, so the completed PRD and application implementation are not yet stored there.

No application implementation currently exists.

## Accomplished

- Completed product discovery for the MVP.
- Approved the complete Shared Understanding Handoff.
- Defined the visual card categories: colours, shapes, and familiar icons.
- Defined sequence playback, recall interaction, scoring direction, retries, persistence, accessibility, and responsive behaviour.
- Added the project to the Ideas Hub project index and workspace landscape.
- Created this durable project note with decisions, assumptions, scope, acceptance criteria, risks, and future ideas.
- Generated a full PRD as `memory-game-PRD.md`.
- Selected `memory-game` as the GitHub repository name.
- Created the public repository `kofiarhin/memory-game`.
- Configured `main` as the repository's default branch.
- Confirmed the connected GitHub app has administrative and push access.
- Recorded the HTTPS clone URL and SSH remote.
- Opened Ideas Hub draft PR #1 to review the project documentation.

## Current Focus

Commit the completed PRD to the new repository's `main` branch, initialise the project, and begin the responsive web MVP.

## Core Gameplay

1. The player chooses colours, shapes, or icons.
2. The game generates a sequence starting at three cards.
3. Cards appear one at a time for one second, with a 300 ms gap.
4. The recall screen shows ordered empty slots and a shuffled card grid.
5. The player selects cards to fill the slots in order.
6. The player may undo the latest selection.
7. Submit becomes available when every slot is filled.
8. Correct answers increase the score and sequence length.
9. The first incorrect answer consumes the retry and repeats the same sequence length.
10. A second incorrect answer ends the run.

## Decisions

### Product

- Build a responsive browser game for mobile and desktop.
- Support touch, mouse, and keyboard input.
- Target general players aged 8 and above.
- Position the product as casual memory training, not a medical or therapeutic tool.
- Use one endless progression mode for the MVP.
- Do not require an account.
- Use `memory-game` as the repository name.
- Use `main` as the default branch.

### Cards and playback

- Use colours, shapes, and familiar icons as the initial card categories.
- Let the player choose one category before each run.
- Keep mixed-category sequences out of the MVP.
- Show cards one at a time.
- Keep each card visible for one second.
- Add a 300 ms gap between cards.
- Do not increase playback speed during a run.
- Keep cards unique through sequence length five.
- Allow repeated cards from sequence length six onward.

### Recall interaction

- Display ordered empty slots above a shuffled card grid.
- Selecting a card fills the next available slot.
- Allow the player to undo the most recent choice.
- Enable submission only when all slots are filled.
- Disable recall input during playback and feedback transitions.

### Difficulty and run structure

- Start every run with a three-card sequence.
- Add one card after every correct round.
- Give the player one retry at the same sequence length.
- End the run after the second incorrect submission.

### Scoring and feedback

- Base scoring on sequence length.
- Award progressively more points for longer sequences.
- Do not include recall speed in the score.
- Recall time may be stored as an optional personal statistic.
- Mark every submitted slot as correct or incorrect.
- Briefly reveal the original sequence after submission.
- Show the updated score and remaining retry.
- Avoid additional penalties beyond ending the run after the second mistake.
- The generated PRD proposes `sequence length² × 10` as the initial scoring formula; confirm it before implementation.

### Persistence

Store the following locally in the browser:

- Best score
- Highest sequence length
- Settings
- Optional recall-time statistics

## Assumptions

- The MVP will use React with the latest Vite.
- TypeScript will be used for application code.
- Tailwind CSS will be used for styling.
- Vitest and React Testing Library will cover frontend unit and interaction tests.
- No backend is needed for the MVP.
- `localStorage` is sufficient for persistent progress and settings.
- Cards will include accessible text labels rather than relying only on appearance.
- Colour cards will use an additional label, symbol, or pattern so colour is not the only identifier.
- Motion and audio preferences will respect browser and operating-system settings.
- Sequence generation must be reproducible during validation and replay.
- A maximum sequence length will be selected during design to prevent unusable layouts and excessively long playback.

## MVP Scope

### In scope

- Start screen
- Category selection
- Endless game session
- Sequence generation
- Card playback
- Ordered recall slots
- Shuffled card grid
- Undo action
- Submission and validation
- Position-level correct and incorrect feedback
- Retry tracking
- Score and best-score tracking
- Highest sequence length tracking
- Optional recall-time statistics
- Local settings and persistence
- Responsive mobile and desktop layouts
- Touch, mouse, and keyboard support
- Reduced-motion support
- Basic sound toggle if sound feedback is included
- Frontend unit and interaction tests

### Out of scope

- User accounts
- Backend API
- MongoDB persistence
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

## Acceptance Criteria

1. A player can select colours, shapes, or icons and start a run.
2. Every run begins with a three-card sequence.
3. Cards play one at a time for one second with a 300 ms gap.
4. Sequences through length five contain no duplicate cards.
5. Duplicate cards may appear from sequence length six onward.
6. Recall input is disabled until the full sequence finishes.
7. The recall screen displays ordered slots and a shuffled choice grid.
8. Selecting a card fills the next available slot.
9. Undo removes the most recently selected card.
10. Submit remains disabled until every slot is filled.
11. A correct answer increases the score and sequence length.
12. A first incorrect answer keeps the same sequence length and consumes the retry.
13. A second incorrect answer ends the run.
14. Submitted answers identify every correct and incorrect position.
15. The correct sequence is shown after an incorrect submission.
16. Best score and highest sequence length survive a browser refresh.
17. Clearing stored game data resets local progress.
18. The game is usable with touch, mouse, and keyboard.
19. The interface remains usable on common mobile and desktop viewport sizes.
20. Tests cover sequence generation, duplicate rules, scoring, retries, validation, persistence, and primary player interactions.

## Risks And Edge Cases

- The repository is empty until the initial `main` commit is created.
- The completed PRD is not yet stored in the application repository.
- Repeated cards must remain independently selectable when duplicates are required.
- The shuffled recall pool must include the exact card quantities needed to rebuild the sequence.
- Rapid taps, clicks, or key presses must not bypass playback or transition locks.
- Refreshing during a round must not corrupt persistent statistics.
- Long sequences may overflow small screens or create excessive playback duration.
- Colour cards must remain identifiable for players with colour-vision differences.
- Reduced-motion settings must not remove essential gameplay information.
- Accidental double taps must not create unintended duplicate selections.
- The game must continue safely when browser storage is unavailable or malformed.

## Brainstorming

Possible post-MVP extensions:

- Mixed-category difficulty mode
- Daily sequences
- Timed challenges
- Cloud accounts and cross-device sync
- Global or friends-only leaderboards
- Multiplayer challenges
- User-created card decks
- Additional audio or spatial-memory modes

These are ideas only and are not approved scope.

## Open Questions

- Final product name and visual brand
- Whether to adopt the PRD's proposed `sequence length² × 10` scoring formula
- Final card artwork and icon set
- Maximum supported sequence length
- Whether basic audio feedback belongs in the first release

## Next Actions

1. Create the repository's initial commit on `main`.
2. Commit the completed `memory-game-PRD.md` as `PRD.md` directly to `main`.
3. Add a README describing the project and local setup.
4. Initialise React, Vite, TypeScript, Tailwind CSS, Vitest, and React Testing Library.
5. Produce the responsive UX and visual direction.
6. Confirm the scoring formula and maximum sequence length.
7. Implement sequence-generation and validation logic test-first.
8. Build the gameplay screens and accessibility interactions.
9. Validate persistence, input locking, repeated-card behaviour, and responsive layouts.
