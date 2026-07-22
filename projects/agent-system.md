# Agent System

**Last updated:** 2026-07-22

## Snapshot

- **Lifecycle:** Active
- **Repository:** https://github.com/kofiarhin/agent-system
- **Current version:** v1.0.0; a later release tag has not been documented
- **Current focus:** Complete release verification and CI coverage for the streamlined setup/sync workflow.
- **Product position:** A runtime-agnostic agent instruction system that compiles shared behavior into native instruction files for Codex, Claude Code, Gemini CLI, and generic agents.

## Links

- Repository: https://github.com/kofiarhin/agent-system
- Product requirements: https://github.com/kofiarhin/agent-system/blob/main/docs/PRD.md
- Installation guide: https://github.com/kofiarhin/agent-system/blob/main/docs/INSTALLATION.md
- Operations guide: https://github.com/kofiarhin/agent-system/blob/main/docs/OPERATIONS.md
- Setup and sync specification: https://github.com/kofiarhin/agent-system/blob/main/docs/SETUP_AND_SYNC_SPEC.md
- Codebase audit: https://github.com/kofiarhin/agent-system/blob/main/docs/CODEBASE_AUDIT.md
- Verified refresh hardening commit: https://github.com/kofiarhin/agent-system/commit/45d6393af0fcc0acb743535b3332be5aeea24b23

## Current State

The shared-source architecture, deterministic generation, runtime adapters, source/generated/installed verification, approved-path installation, backups, rollback, restore, and Pester-independent test suite remain implemented.

The primary user workflow has been simplified to two commands:

```powershell
.\scripts\setup-agent-system.ps1
.\scripts\sync-agent-system.ps1
```

`sync-agent-system.ps1 -SkipPull` is available for development against the current checkout. Both high-level commands support PowerShell preview and confirmation semantics, use adapter-derived runtime detection, process Codex, Claude Code, and Gemini CLI sequentially, stop on the first failure, and report only changed runtimes as requiring restart.

The documentation set includes the README, PRD, installation guide, operations guide, runtime adapter guide, setup/sync specification, implementation record, and a 2026-07-22 codebase audit.

The audit confirmed that documentation is generally strong and aligned with the implemented source-of-truth and safety model. Remaining documentation and verification gaps are runtime compatibility reporting, requirements-to-test traceability, and explicit recovery guidance for partial success when a later runtime fails.

User-confirmed Windows verification remains valid evidence for current behavior, but durable cross-version CI evidence and a release tag remain outstanding.

## Current Focus

Finish release-quality evidence for the implemented setup/sync direction rather than redesigning the architecture.

Priority areas:

- add or confirm Windows CI for Windows PowerShell 5.1 and current PowerShell 7;
- expand top-level command tests for Git preconditions, pull failures, `-SkipPull`, `-Force`, `-Confirm`, exit code `3`, partial success, and restart output;
- document recovery steps for partial multi-runtime updates;
- add a runtime compatibility and verification matrix;
- decide and document the next release version/tag;
- continue keeping README, PRD, guides, and implementation behavior synchronized.

## Brainstorming

- transactional multi-runtime installation
- transaction journals and interrupted-operation recovery
- background synchronization services
- automatic runtime installation or restart
- structured operation logging and dashboards
- backup retention automation
- organization-wide deployment tooling
- future runtime adapters such as GitHub Copilot CLI, Cursor, Continue, Aider, and xAI

## Decisions

- `setup-agent-system.ps1` is the recommended first-time installation command.
- `sync-agent-system.ps1` is the recommended ongoing update command.
- `sync-agent-system.ps1` performs `git pull --rebase origin main` by default.
- `-SkipPull` is the approved developer override for using the current checkout.
- Codex, Claude Code, and Gemini CLI are the automatic setup/sync allowlist for the current product version.
- Runtime detection must derive from adapter installation metadata rather than duplicated path constants.
- Missing runtime directories must not be created by setup or sync.
- Runtime refresh remains sequential, fail-fast, and non-transactional.
- Previously completed runtimes are not rolled back when a later runtime fails.
- Low-level build, verify, install, restore, and compatibility wrapper commands remain supported as advanced tools.
- The product must describe its guarantees conservatively and must not claim cross-runtime transactionality.

## Assumptions

- The primary use case remains controlled personal or small-team use on Windows.
- Supported runtime applications are installed and launched separately before Agent System setup.
- Restarting a runtime or opening a fresh session is required before behavioral verification.
- Local Windows verification is valid evidence for current behavior, but CI is still required for durable cross-version compatibility proof.

## Open Questions

- What version number or release tag should contain the completed setup/sync milestone?
- Does the repository now have passing Windows CI for both Windows PowerShell 5.1 and current PowerShell 7?
- Should future automatic runtime support remain a hard-coded product allowlist or move to a manifest capability flag after further discovery?

## Next Actions

1. Add or verify a GitHub Actions Windows matrix for build, strict verification, and the full test suite.
2. Add top-level setup/sync integration coverage for Git safety, command switches, exit codes, partial success, and restart guidance.
3. Add a runtime compatibility matrix and requirements-to-tests mapping.
4. Document recovery for partial success and interrupted operations without claiming transactionality.
5. Run the complete suite in Windows PowerShell 5.1 and current PowerShell 7 and record evidence.
6. Choose and publish the next release version after CI and release verification pass.