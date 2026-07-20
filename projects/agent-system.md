# Agent System

**Last updated:** 2026-07-20

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
- Verified refresh hardening commit: https://github.com/kofiarhin/agent-system/commit/45d6393af0fcc0acb743535b3332be5aeea24b23

## Current State

The shared-source architecture, deterministic generation, runtime adapters, source/generated/installed verification, approved-path installation, backups, rollback, restore, and Pester-independent test suite remain implemented.

The primary user workflow has been simplified to two commands:

```powershell
# First-time installation into detected runtimes.
.\scripts\setup-agent-system.ps1

# Ongoing repository and runtime synchronization.
.\scripts\sync-agent-system.ps1
```

`sync-agent-system.ps1 -SkipPull` is available for development against the current checkout. Both high-level commands support PowerShell preview and confirmation semantics, use adapter-derived runtime detection, process Codex, Claude Code, and Gemini CLI sequentially, stop on the first failure, and report only changed runtimes as requiring restart.

Runtime detection is based on the existing parent directory of each adapter-defined install target. Missing runtime directories are not created automatically.

The documentation set was aligned with this product direction, including the README, PRD, installation guide, operations guide, runtime adapter guide, setup/sync specification, and implementation record.

A local PowerShell verification pass found and fixed three implementation issues:

- PowerShell parsed `$code:` as an invalid drive-qualified variable in the child-script error message; it now uses `${code}`.
- The no-detected-runtime path could not receive an empty collection; `RuntimeRecords` now permits empty collections and returns structured exit code `2` behavior.
- Test counters leaked between repeated runs in the same PowerShell session; the harness now starts each run with fresh state.

Commit `45d6393af0fcc0acb743535b3332be5aeea24b23` records these fixes and targeted tests.

User-confirmed verification on Windows:

- the full test suite passed after the fixes, including repeated execution in the same PowerShell session;
- setup preview detected Codex, Claude Code, and Gemini CLI without writing installed files;
- real setup completed successfully;
- Codex and Claude Code were already current;
- Gemini CLI was updated and installed-hash verification passed;
- generated and installed Codex hashes matched;
- fresh Codex and Claude Code sessions demonstrated repository inspection, discovery-first behavior, explicit approval gates, and verification-oriented workflow.

Observed runtime style difference:

- Codex tended to provide a concise audit of concrete repository facts before explaining the workflow.
- Claude Code tended to provide a richer architecture summary before explaining the workflow.
- Both followed the same installed discovery, handoff, approval, implementation, and verification lifecycle.

## Current Focus

Finish release-quality evidence for the implemented setup/sync direction rather than redesigning the architecture.

Priority areas:

- add or confirm Windows CI for Windows PowerShell 5.1 and current PowerShell 7;
- expand top-level command tests for Git preconditions, pull failures, `-SkipPull`, `-Force`, `-Confirm`, exit code `3`, partial success, and restart output;
- decide and document the next release version/tag;
- continue keeping README, PRD, guides, and implementation behavior synchronized.

## Brainstorming

Deferred ideas that are not part of the current milestone:

- transactional multi-runtime installation;
- transaction journals and interrupted-operation recovery;
- background synchronization services;
- automatic runtime installation or restart;
- structured operation logging and dashboards;
- backup retention automation;
- organization-wide deployment tooling;
- future runtime adapters such as GitHub Copilot CLI, Cursor, Continue, Aider, and xAI.

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

1. Add or verify a GitHub Actions Windows matrix that runs:

   ```powershell
   .\scripts\build-agent.ps1 -Runtime All -Check
   .\scripts\verify-agent.ps1 -Scope All -Strict
   .\tests\run-tests.ps1
   ```

2. Add top-level setup/sync integration coverage for Git safety, command switches, exit codes, partial success, and restart guidance.
3. Run the complete suite in Windows PowerShell 5.1 and current PowerShell 7 and record the evidence.
4. Choose and publish the next release version when CI and release verification pass.
5. Preserve the two-command user experience and avoid unrelated refactoring or enterprise transaction infrastructure.
