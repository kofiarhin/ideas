# Projects

**Last updated:** 2026-07-23

This is the only canonical project index for the Ideas Hub.

| Project | Summary | Repository | Live | Notes |
| --- | --- | --- | --- | --- |
| [Piano360](projects/piano360.md) | Guided piano-learning course application | https://github.com/kofiarhin/piano360 | — | MongoDB-backed course MVP |
| [Brain](projects/brain.md) | MERN personal operating system with AI-assisted workflows | https://github.com/kofiarhin/brain | https://brain-pi-black.vercel.app/ | MongoDB is the durable application memory |
| [KareBraids](projects/karebraids.md) | Braid services, availability, booking, enquiries, and admin management | https://github.com/kofiarhin/karebraids | https://karebraids.vercel.app/ | MERN booking platform |
| [Amas Kitchen](projects/amas-kitchen.md) | Premium Ghanaian kitchen ordering, services, testimonials, contact, and checkout application | https://github.com/kofiarhin/amas-kitchen | — | Homepage design direction awaits approval |
| [DevKofi](projects/devkofi.md) | MERN mentorship and learning platform | https://github.com/kofiarhin/devkofi | https://devkofi.com/ | Includes mentee onboarding and internal tooling |
| [Memory Sequence Game](projects/memory-sequence-game.md) | Responsive visual sequence-recall browser game | https://github.com/kofiarhin/memory-game | — | Exploring; MVP audited and fixes merged; CI passing; deployment pending |
| [Ideas Hub](projects/ideas.md) | Markdown-first brainstorming workspace and durable cross-tool reference layer | https://github.com/kofiarhin/ideahub | — | This repository; `kofiarhin/ideas` remains a historical alias |
| [Forge](projects/forge.md) | AI-powered software organization coordinating specialist agents from idea through verified launch preparation | https://github.com/kofiarhin/forge | — | Active; repository-local PRD/spec/audit added; executable MVP not implemented |
| [Zoro](projects/zoro.md) | Forge Chief Orchestrator and Context API-connected Custom GPT | https://github.com/kofiarhin/zoro | — | Active; repository linked on 2026-07-23; Forge linkage next |
| [Context API](projects/context-api.md) | Centralized API for structured, reusable user, engineering, project, workflow, glossary, and learning context | https://github.com/kofiarhin/context-api | https://context-api-3b9dfadf403e.herokuapp.com | Active; strong docs; repository and live gateway verification evidence next |
| [Codex Workflow Kit](projects/codex-workflow.md) | Reusable AI engineering workflow system | https://github.com/kofiarhin/codex-workflow-kit | — | PRD/spec/audit added; legacy artifact-path documentation needs reconciliation |
| [Agent System](projects/agent-system.md) | Runtime-agnostic agent instruction system with deterministic generation and native runtime outputs | https://github.com/kofiarhin/agent-system | — | Active; streamlined setup/sync verified locally; CI/release evidence next |
| [Archon](projects/archon.md) | AI-powered software architecture studio that turns ideas into implementation-ready engineering blueprints | https://github.com/kofiarhin/archon | — | Paused; approved specifications retained; Phase 1 has not started |
| [Taxify](projects/taxify.md) | Archived project; no work is planned unless explicitly reactivated | https://github.com/kofiarhin/taxify | — | Archived; reassess security and deployment state before reactivation |
| [Kflix](projects/kflix.md) | Project details not yet documented | https://github.com/kofiarhin/kflix | — | Needs overview and current status |
| [Banging Prices](projects/banging-prices.md) | Project details not yet documented | https://github.com/kofiarhin/banging-prices | — | Needs overview and current status |
| [MoggOff](projects/moggoff.md) | Project details not yet documented | https://github.com/kofiarhin/moggedoff | — | Repository slug differs from project display name |
| [ProjectOS](projects/projectos.md) | Archived autonomous development operating system for multi-repository local workspaces | https://github.com/kofiarhin/projectos | — | Archived; fresh security and repository review required before reactivation |
| [Agency Landing Page](projects/agency-landing-page.md) | Repository-backed project; purpose and scope not yet documented | https://github.com/kofiarhin/agency-landing-page | — | Dedicated project record added 2026-07-23 |
| [Agenda Boys](projects/agenda-boys.md) | Repository-backed project; purpose and scope not yet documented | https://github.com/kofiarhin/agenda-boys | — | Dedicated project record added 2026-07-23 |
| [Repository Project Catalog](projects/catalog/repository-catalog.md) | Approved inventory of 193 repository-backed projects not previously represented by dedicated records | — | — | Repository existence verified; lifecycle, priority, stack, and scope remain undocumented |

## Repository Coverage

All 212 repositories accessible through the installed GitHub App are now represented in Ideas Hub without removing any existing project:

- Existing dedicated project records were preserved.
- `kofiarhin/zoro` was linked to the existing Zoro project.
- Agency Landing Page and Agenda Boys have dedicated project files.
- The [Repository Project Catalog](projects/repository-catalog.md) records the remaining imported repositories. Agenda Boys remains listed in the catalog as part of the original import inventory as well as having a dedicated record.

Catalog entries are recorded without inferred lifecycle, priority, stack, live URL, or project purpose. Repositories requiring active project management should be promoted into dedicated `projects/<slug>.md` records after their details are confirmed.

## Lifecycle Guidance

Project lifecycle states may be recorded in each project file using one of these values:

- `Exploring`
- `Active`
- `Paused`
- `Maintenance`
- `Shipped`
- `Archived`
- `Not documented`

Do not assign or change a lifecycle state without confirmed information or explicit approval.

## Adding A Project

1. Add one row to this file.
2. Create one matching file under `projects/`.
3. Add the project to `CONTEXT.md` only when it changes the broad workspace overview.
