# Agent System

**Last updated:** 2026-07-19

## Snapshot

- **Lifecycle:** Active
- **Repository:** https://github.com/kofiarhin/agent-system
- **Current version:** v1.0.0
- **Current focus:** Deliver the approved v1.0.1 MVP safety-hardening release.
- **Product position:** A universal, runtime-agnostic agent instruction system that compiles shared behavior into native instruction files for Codex, Claude Code, Gemini CLI, and generic agents.

## Links

- Repository: https://github.com/kofiarhin/agent-system
- Product requirements: https://github.com/kofiarhin/agent-system/blob/main/docs/PRD.md
- Installation guide: https://github.com/kofiarhin/agent-system/blob/main/docs/INSTALLATION.md

## Current State

Version 1.0.0 is implemented with shared instruction modules, runtime adapters, deterministic PowerShell generation, verification, installation, backup, restore, and a Pester-independent test suite.

A code-to-PRD audit rated the implementation approximately 7.6/10 overall. The shared-source architecture, build isolation, deterministic output, and verification model are strong. The main risks are concentrated in installation, restore rollback, backup manifest durability, approved-path validation, and missing Windows CI evidence.

The v1.0.1 MVP safety-hardening backlog is approved and ready for implementation. The product should remain an MVP, prioritize simple high-value safety improvements, and avoid enterprise transaction infrastructure.

## Current Focus

Deliver a focused `v1.0.1` MVP safety-hardening release.

Recommended usage remains one runtime per installation command:

```powershell
.\scripts\install-agent.ps1 -Runtime codex
.\scripts\install-agent.ps1 -Runtime claude
```

Build and verification may continue to support `-Runtime All`. Installation must reject `-Runtime All` and require one runtime per command.

## Decisions

- Keep the application MVP-sized and understandable.
- Prioritize safe single-runtime installation and restore over multi-runtime transactions.
- Reject `install-agent.ps1 -Runtime All` during the MVP; retain `-Runtime All` for build and verification.
- Do not build transaction journals, recovery engines, dashboards, or enterprise deployment tooling for the MVP.
- Keep the current staged temporary-file replacement approach, but describe its guarantees accurately rather than calling it fully atomic.
- Add only the failure tests needed to cover material MVP risks.
- Use Windows CI to prove compatibility with Windows PowerShell 5.1 and current PowerShell 7.
- Recommend one runtime per installation command.
- The v1.0.1 MVP safety-hardening backlog was approved on 2026-07-19.

## Assumptions

- The primary use case is controlled personal or small-team use on Windows.
- Users can manually inspect backups when a rare rollback failure occurs.
- Cross-runtime all-or-nothing deployment is not required for the MVP.
- New runtime expansion is lower priority than hardening the existing supported runtimes.

## Brainstorming

Deferred ideas that should not be implemented during MVP hardening:

- multi-runtime transactional installation;
- transaction journals and resume-after-interruption workflows;
- `recover-transaction.ps1`;
- structured operation logging;
- status dashboards or doctor commands;
- backup retention management;
- native Windows replacement API interop;
- release signing;
- automated requirements-traceability systems;
- organization-wide deployment support.

## Open Questions

None currently documented.

## Next Actions

### MVP Hardening Task

**Target release:** `v1.0.1`  
**Priority:** High  
**Status:** `ready`  
**Approved:** 2026-07-19

#### 1. Make backup manifests durable

Write the backup manifest immediately after creating and verifying a backup, before replacing the installed runtime file.

Acceptance criteria:

- A backup always has a valid manifest before the target changes.
- Manifest-writing failure stops installation.
- Backup hash and path are recorded.
- Tests cover backup and manifest failure.

#### 2. Add restore rollback

Before restoring, back up and verify the current target. If restore fails, reinstate the previous target and verify its original hash.

Acceptance criteria:

- Failed restore returns the target to its original hash.
- Rollback success or failure is clearly reported.
- Tests cover replacement and final hash-verification failure.

#### 3. Validate restore destinations

Require the backup manifest's recorded original path to match the current runtime target.

Acceptance criteria:

- Mismatched targets are rejected.
- Matching targets restore normally.
- No target-migration override is required for the MVP.

#### 4. Harden approved-path validation

Improve the current path checks without introducing a large filesystem-security framework.

Validate:

- normalized target remains inside the approved runtime directory;
- target filename matches the adapter;
- target is not a reparse point;
- existing parent directories below the approved root are not reparse points;
- traversal and sibling-prefix paths are rejected.

Acceptance criteria:

- Tests cover traversal, sibling-prefix attacks, target reparse points, parent reparse points, and valid runtime paths.
- Unsafe paths are rejected before backups or target changes.

#### 5. Strengthen backup manifest validation

Validate the fields required by the MVP:

- backup ID;
- runtime ID;
- original path;
- backup filename and path;
- SHA-256 hash;
- file size;
- backup path remains inside the selected backup directory;
- duplicate runtime entries are rejected.

Acceptance criteria:

- Missing or malformed required fields are rejected.
- Escaped paths are rejected.
- Incorrect hash or size is rejected.
- A JSON Schema is optional and should be used only when it reduces complexity.

#### 6. Correct replacement wording

Describe the existing approach as:

> Same-directory staged replacement with post-write hash verification.

Acceptance criteria:

- Scripts and documentation do not claim stronger atomic guarantees than the implementation provides.
- No native Windows interop is introduced for the MVP.

#### 7. Add simple Windows CI

Create one GitHub Actions workflow covering Windows PowerShell 5.1 and current PowerShell 7.

Required commands:

```powershell
.\scripts\build-agent.ps1 -Runtime All -Check
.\scripts\verify-agent.ps1 -Scope All -Strict
.\tests\run-tests.ps1
```

Acceptance criteria:

- Pull requests run the complete checks.
- Stale generated files fail CI.
- Tests never access real runtime directories.
- CI passes before release.

#### 8. Add targeted failure tests

Cover only the highest-risk cases.

Installation:

- backup failure;
- manifest failure;
- temporary copy failure;
- final hash mismatch;
- rollback success.

Restore:

- corrupt backup;
- original-path mismatch;
- replacement failure;
- final hash mismatch;
- rollback success.

Security:

- traversal;
- sibling-prefix path;
- target reparse point;
- parent reparse point;
- backup path escaping its directory.

Acceptance criteria:

- Each scenario has an automated test.
- Tests assert exit code and final target hash.
- No production runtime paths are accessed.

#### 9. Update PRD and operational documentation

Document:

- one-runtime-at-a-time installation is required;
- `-Runtime All` is rejected for MVP installation;
- install and restore use staged replacement and hash verification;
- interrupted-operation recovery is not included;
- rare rollback failure may require manual recovery from the backup directory.

Acceptance criteria:

- Product claims match the implementation.
- Known limitations are visible in installation and operational guidance.
- Deferred enterprise features are not presented as MVP requirements.

### Definition of Done

The MVP hardening release is complete when:

- deterministic build and verification pass;
- Codex and Claude install successfully one runtime at a time;
- an existing target is backed up before replacement;
- failed installation restores the previous file where possible;
- failed restore restores the pre-restore file;
- unsafe paths and invalid manifests are rejected;
- Windows PowerShell 5.1 and PowerShell 7 tests pass in CI;
- documentation accurately describes guarantees and limitations.

A strong MVP target is approximately 8.5–9/10 overall. Chasing a theoretical 10/10 through enterprise complexity is explicitly not required.
