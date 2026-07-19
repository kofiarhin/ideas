# Universal Agent System

**Last updated:** 2026-07-19

## Snapshot

- **Lifecycle:** Active
- **Purpose:** A model-agnostic, runtime-independent instruction system that preserves the existing Codex workflow and compiles the same shared behavior into native instruction files for multiple AI coding runtimes.
- **Repository:** https://github.com/kofiarhin/agent-system
- **Current status:** Version 1.0.0 is implemented and committed. The shared architecture, adapters, deterministic generation, verification, backup, installation, restoration, tests, and documentation exist. Codex and Claude Code have now been installed and verified against the generated runtime artifacts. Gemini remains generated but not installed.

## Links

- Repository: https://github.com/kofiarhin/agent-system
- HTTPS clone URL: `https://github.com/kofiarhin/agent-system.git`
- SSH clone URL: `git@github.com:kofiarhin/agent-system.git`
- Initial implementation commit: https://github.com/kofiarhin/agent-system/commit/6cbcc589ff0eb6fdc7f09df2922b4d259f7f8894

## Current State

The project now provides one source of truth for agent behavior across Codex, Claude Code, Gemini CLI, and generic/custom runtimes.

Implemented architecture:

- shared instruction modules under `core/`, `workflows/`, `capabilities/`, and `memory/`;
- ordered compilation through `config/agent.json`;
- runtime adapters for Codex, Claude Code, Gemini CLI, and a generic system prompt;
- generated runtime files committed for review and freshness checking;
- deterministic PowerShell build tooling;
- source, generated, installed, and behavioral-anchor verification;
- timestamped SHA-256-verified backups;
- install and restore tooling with approved-path checks and `-WhatIf` support;
- a Pester-independent test suite using temporary runtime targets;
- migration, operations, runtime-adapter, and maintenance documentation.

The original Codex instruction structure and behavior were migrated into runtime-neutral modules. This includes instruction precedence, request classification, Discovery, the Shared Understanding approval gate, implementation rules, repository inspection, continuity, coding preferences, TDD and verification, safety, output requirements, global learnings, fallback behavior, and global invariants.

Deployment milestones completed:

- the generated Codex artifact was reviewed, installed to the active global `.codex/AGENTS.md`, backed up, and hash-verified;
- the generated Claude Code artifact was reviewed, installed to the active global `.claude/CLAUDE.md`, backed up, and hash-verified;
- both Codex and Claude Code now consume runtime-native files generated from the same shared source modules;
- separate timestamped backup manifests were created for both production installations;
- the generic and Gemini artifacts remain generated and verified, but Gemini has not yet been installed.

## Current Focus

Harden deployment safety before treating multi-runtime installation and restoration as fully production-ready.

The latest audit approved the architecture and generation system but identified deployment-layer risks:

- multi-runtime installation is not fully transactional;
- backup manifests are written too late during multi-runtime failure scenarios;
- restore does not automatically reinstate the pre-restore target after a failed replacement;
- temporary-file replacement is documented more strongly than its current atomicity guarantee;
- restore should verify the manifest's original path against the current adapter target;
- approved-root validation should account for reparse points in parent paths;
- Windows CI should enforce build freshness, verification, and tests.

## Brainstorming

- Add lightweight runtime profiles so a shared core can compile different capability bundles without duplicating behavior.
- Add continuous integration on Windows for deterministic build checks and deployment-safety tests.
- Consider formal JSON Schema validation while retaining manual security checks.
- Consider additional adapters for Cursor, OpenCode, and custom Node.js agents after the deployment layer is hardened.

## Decisions

- The existing Codex instruction architecture is the behavioral baseline.
- Shared modules are the source of truth.
- Runtime files are generated deployment artifacts and must not be maintained manually.
- Build and installation are separate operations.
- Generated runtime files are committed so changes are reviewable and stale output is detectable.
- The first supported targets are Codex, Claude Code, Gemini CLI, and Generic.
- Production installation was performed one runtime at a time for Codex and Claude Code after successful review and verification.
- `-Runtime All` should not be used for production installation until the multi-runtime transaction and rollback behavior is hardened.
- The next release should focus on safety hardening rather than architectural redesign.

## Assumptions

- PowerShell remains the primary implementation language for build and deployment tooling on Windows.
- Runtime-specific differences remain limited to instruction entry points, headers, precedence notes, and installation paths.
- Active global runtime files should be installed only after generated output has been reviewed.
- Codex and Claude Code sessions should be restarted after installation so the updated global instructions are loaded.

## Open Questions

- Should `-Runtime All` provide full transaction semantics across every runtime, or explicitly operate as independent per-runtime deployments?
- Should the next release be tagged `v1.0.1` after deployment-safety fixes?
- Which runtime should be added or installed next after Codex and Claude Code?
- Should generated artifacts remain committed if automated release packaging is introduced later?

## Next Actions

1. Make backup manifests durable before the first runtime target is changed.
2. Add rollback of every earlier runtime when a later runtime fails during an all-runtime transaction, or document independent deployment semantics explicitly.
3. Add verified rollback to failed restore operations.
4. Replace or qualify the current atomic-replacement implementation.
5. Validate restore manifest paths against adapter targets.
6. Harden approved-root checks against reparse points in parent paths.
7. Add a Windows GitHub Actions workflow running build freshness, verification, and the full test suite.
8. Re-audit deployment safety.
9. Install Gemini only after reviewing the generated artifact and confirming the target path.
10. Continue maintaining shared behavior only through `agent-system` source modules, then rebuild and reinstall runtime outputs as needed.
