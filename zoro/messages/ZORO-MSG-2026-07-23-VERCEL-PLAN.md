# Zoro Message — Vercel Gateway Implementation Plan

- Message Status: new
- From: Kofi
- To: Zoro
- Type: task-assignment
- Architect Run: none
- Architect Task: none
- Work Key: `context-api:vercel-gateway-implementation-plan`
- Project: Context API / Zoro
- Task Status: ready
- Priority: high
- Approval: implementation-approved
- Created: 2026-07-23

## Objective

Read the approved Vercel Gateway specification in `kofiarhin/context-api` and produce a detailed, implementation-ready delivery plan for adding governed Vercel access to the existing Context API and Zoro Custom GPT integration.

The plan must be saved directly to `kofiarhin/context-api` on `main` at:

```text
docs/VERCEL_GATEWAY_IMPLEMENTATION_PLAN.md
```

## Authoritative Source

Use the following document as the primary authority:

```text
docs/VERCEL_GATEWAY_SPEC.md
```

Also inspect the current Context API implementation, especially the existing GitHub Gateway, repository conventions, environment loader, authentication middleware, route structure, validation, controllers, services, serializers, error handling, tests, release validation, documentation, and maintained Zoro Action schema.

Do not replace or contradict the specification silently. Where the specification is incomplete, record an assumption, open question, dependency, or approval gate rather than inventing a decision.

## Authority

- Read `kofiarhin/ideahub`: approved as needed for Zoro, Context API, coordination, and project context.
- Read `kofiarhin/context-api`: approved.
- Modify `kofiarhin/context-api`: approved only for the new implementation-plan document and directly necessary documentation links if required.
- Direct write to Context API `main`: explicitly approved for this documentation-only task.
- Create branches or pull requests: not required for this task.
- Modify runtime source code: not approved.
- Modify tests, package dependencies, environment configuration, OpenAPI schemas, or deployment configuration: not approved.
- Merge: not applicable.
- Deploy: not approved.
- Access or rotate secrets: not approved.
- Modify live GPT Builder configuration: not approved.

## Required Plan Content

The implementation plan must include at least the following sections.

### 1. Delivery objective

Explain the desired end state:

```text
Kofi -> Zoro -> authenticated Context API Vercel Gateway -> Vercel REST API -> normalized result
```

Clarify how the Vercel Gateway complements the existing GitHub Gateway.

### 2. Current-state assessment

Document the relevant existing Context API architecture and conventions that the Vercel implementation must follow, including:

- CommonJS and Express conventions;
- application factory and route mounting;
- environment validation;
- dedicated Bearer authentication;
- policy middleware;
- validation middleware;
- thin controllers;
- service and client separation;
- serializers and normalized responses;
- centralized error translation;
- request limits, rate limiting, logging, and correlation IDs;
- Jest and Supertest test conventions;
- release validation and `npm run verify`;
- maintained OpenAPI Action schemas.

Reference exact current files and paths.

### 3. Scope and capability matrix

Break the gateway into resource areas and operations:

- identity and teams;
- projects;
- deployments;
- deployment events and logs;
- environment-variable metadata and mutations;
- project domains;
- aliases;
- DNS records;
- Git repository linkage;
- preview deployment;
- production promotion;
- rollback or recovery operations supported by the approved specification.

For every operation classify it as:

- read-only;
- normal write;
- production-sensitive;
- destructive;
- prohibited.

### 4. Security and approval model

Define:

- `ZORO_VERCEL_API_KEY` for Zoro-to-Context-API authentication;
- `VERCEL_TOKEN` for Context-API-to-Vercel authentication;
- Vercel team/account scoping;
- optional allowlists for teams, projects, repositories, and domains;
- Preview as the default deployment target;
- explicit approval requirements for Production and destructive changes;
- blocking decrypted environment-variable readback;
- secret redaction and safe logging;
- idempotency and concurrency protections where applicable;
- confirmation-token or approval-evidence design if required by the specification;
- failure-closed behavior when configuration is missing or invalid.

### 5. Proposed API surface

List every proposed Context API endpoint with:

- HTTP method;
- route;
- operation name;
- purpose;
- request parameters or body;
- classification;
- expected success status;
- expected error cases;
- required approval level.

Keep the routes under:

```text
/api/v1/vercel
```

### 6. File-level implementation map

Identify all new and modified files, including expected responsibilities. Cover at minimum:

```text
src/controllers/vercel.controller.js
src/middleware/requireVercelActionAuth.js
src/middleware/requireVercelResourceAccess.js
src/middleware/validateVercel.js
src/routes/v1/vercel.js
src/services/vercelClient.js
src/services/vercel.service.js
src/services/vercelPolicy.js
src/services/vercelErrors.js
src/serializers/vercel.serializer.js
src/validation/vercel.schemas.js
```

Also identify existing files likely to change, such as:

```text
src/app.js
src/config/env.js
src/middleware/errorHandler.js
src/utils/errors.js
src/utils/responses.js
.env.example
package.json
README.md
docs/DEPLOYMENT.md
docs/openapi/*
scripts/*
```

Do not claim a file must change unless current implementation evidence supports it.

### 7. Phased delivery plan

Provide ordered implementation phases with dependencies, tasks, exit criteria, and verification for each phase. The plan should include at least:

1. repository revalidation and test harness;
2. Vercel configuration and client;
3. dedicated authentication and policy enforcement;
4. read-only identity, team, project, and deployment operations;
5. deployment diagnostics;
6. Preview deployment creation and lifecycle management;
7. project creation and configuration;
8. environment-variable management without secret disclosure;
9. domain, alias, and DNS management;
10. Production promotion and destructive operations;
11. OpenAPI Action schema strategy;
12. release validation, deployment, and controlled Zoro smoke testing.

### 8. Test strategy

Define unit, integration, service, contract, security, regression, and production smoke-test coverage. Include:

- mocked Vercel API behavior;
- no live network calls in automated tests;
- authentication failure cases;
- missing or invalid environment configuration;
- allowlist enforcement;
- Preview defaults;
- Production approval enforcement;
- destructive-operation approval enforcement;
- secret-value redaction;
- upstream error translation;
- pagination;
- rate limits and body limits;
- existing Context API and GitHub Gateway regression coverage;
- OpenAPI operation validation;
- release checks.

List proposed test files and commands.

### 9. OpenAPI and GPT Action strategy

Assess the current operation count and recommend whether Vercel should use:

- the existing combined Action;
- a separate Vercel Action schema on the same Context API host; or
- another documented structure.

The recommendation must account for operation limits, authentication separation, maintainability, Builder configuration, and schema drift.

### 10. Deployment and rollout

Define:

- required Heroku configuration names without secret values;
- clean verification before deployment;
- deployed commit-SHA evidence;
- startup evidence;
- read-only smoke tests first;
- Preview mutation tests before Production;
- controlled disposable resource tests;
- cleanup requirements;
- rollback plan;
- live GPT Builder configuration steps;
- evidence required before describing the gateway as verified or available.

### 11. Risks, dependencies, and open questions

Include API-version drift, token scope, billing impact, destructive actions, rate limits, logs availability, DNS risk, environment-secret handling, project transfer restrictions, team scope, operation-count limits, and Vercel API behavior that must be confirmed during implementation.

### 12. Definition of done

Provide clear, testable completion criteria that distinguish:

- planned;
- implemented;
- committed;
- deployed;
- configured in GPT Builder;
- smoke-tested;
- independently verified;
- operationally available.

## Out Of Scope

- Implementing the Vercel Gateway runtime.
- Installing dependencies.
- Changing environment variables or secrets.
- Updating the live GPT Action.
- Deploying Context API.
- Creating, deleting, or modifying actual Vercel resources.
- Modifying the approved specification except for a separately reported blocking contradiction.
- Editing unrelated Context API documentation or source code.
- Claiming current Vercel integration exists or is verified.

## Acceptance Criteria

1. `docs/VERCEL_GATEWAY_IMPLEMENTATION_PLAN.md` exists on `kofiarhin/context-api` `main`.
2. The plan is grounded in `docs/VERCEL_GATEWAY_SPEC.md` and current repository implementation evidence.
3. The plan includes all required sections above.
4. Proposed routes, files, phases, tests, security rules, Action strategy, rollout, risks, and definition of done are implementation-ready.
5. Facts, approved decisions, assumptions, recommendations, open questions, and unresolved Vercel API details are clearly distinguished.
6. No secrets or credential values are written to the repository.
7. No runtime source code, tests, dependencies, schemas, deployment configuration, or unrelated documentation are modified.
8. The direct-main commit contains only the approved planning/documentation change, except for a directly necessary documentation link that is explicitly reported.
9. The final report includes the base revision, commit SHA, changed files, verification actually performed, verification not performed, assumptions, blockers, risks, and next recommended action.
10. The plan does not describe the Vercel Gateway as implemented, deployed, verified, or available.

## Verification Requirements

- Confirm `docs/VERCEL_GATEWAY_SPEC.md` exists on current `main` and record its blob SHA or commit evidence.
- Confirm no equivalent implementation plan already exists before creating the file.
- Inspect current Context API source and tests rather than relying only on the specification.
- Confirm the plan references real current paths and conventions.
- Confirm the final changed-file scope is limited to the approved documentation.
- Confirm the committed plan contains no token, key, secret, password, private key, or decrypted environment-variable value.
- Report command execution only when actually performed.
- Run repository documentation or full verification commands only if a real command runner is available; otherwise report them as not performed.
- Do not claim deployment, Builder acceptance, live Vercel access, or runtime verification.

## Constraints

- Work directly on `kofiarhin/context-api` `main`, as explicitly authorized for this documentation-only task.
- Re-read the current specification and repository before writing because the repository may have changed.
- Preserve existing GitHub Gateway behavior and documentation.
- Do not silently broaden Zoro authority beyond the approved specification.
- Do not expose decrypted Vercel environment-variable values in the proposed gateway.
- Stop and report a blocker if the specification is missing, materially contradictory, equivalent work already exists, or the requested plan cannot be produced without changing runtime behavior.

## Required Response

After completing or blocking the task, write a durable report to `architect-inbox.md` that references:

- Originating message: `ZORO-MSG-2026-07-23-VERCEL-PLAN`
- Work key: `context-api:vercel-gateway-implementation-plan`
- Project: Context API / Zoro

For completion, include:

- specification revision inspected;
- Context API base revision;
- commit SHA;
- changed files;
- summary of the plan;
- verification actually performed;
- verification not performed;
- assumptions and open questions;
- risks or blockers;
- confirmation that no implementation or deployment occurred; and
- exact recommended next action.
