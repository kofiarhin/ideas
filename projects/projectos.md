# ProjectOS

**Last updated:** 2026-07-18

## Snapshot

ProjectOS is an archived autonomous development operating-system project for coordinating discovery, specification, planning, execution, verification, and reporting across local repositories.

## Links

- Repository: https://github.com/kofiarhin/projectos
- SSH: `git@github.com:kofiarhin/projectos.git`
- Live: Not applicable

## Current State

- Lifecycle: Archived
- Last phase: Phase 0 — CLI foundation and repository architecture
- Stack: TypeScript, Node.js, Commander, MongoDB/Mongoose, Zod, Pino, Jest, Vitest
- Runtime model: Local, CLI-first, in-process application
- Current priority: None

## Current Focus

None. Project archived by user decision.

## Product Direction

The recorded direction was CLI-first orchestration with MongoDB-backed operational state and optional future administrative UI oversight.

## Decisions

- Archive ProjectOS.
- Ignore the previously identified MongoDB credential-rotation task while the project remains archived.
- Do not begin Phase 1 or further verification without explicit reactivation.

## Assumptions

- Archiving does not prove the previously exposed credential was rotated or revoked.
- Any future reactivation must begin with a fresh security and repository-state review.

## Risks and Open Questions

- Previously recorded MongoDB credential exposure remains intentionally deferred.

## Next Actions

- None. Reassess credentials, dependencies, Phase 0 verification, and authority documents before any future reactivation.