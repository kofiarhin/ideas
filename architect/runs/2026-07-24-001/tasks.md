# Architect Tasks — Run 2026-07-24-001

## 2026-07-24-001-context-api-T001 — Implement governed Vercel Gateway

- **Status:** running
- **Project:** Context API / Zoro
- **Repository:** `kofiarhin/context-api`
- **Base branch:** `main`
- **Implementation branch:** `feat/vercel-gateway`
- **Work key:** `context-api:vercel-gateway`
- **Requirement key:** `context-api:vercel-gateway-spec-v1`
- **Authority:** Kofi explicitly approved the isolated-branch implementation scope on 2026-07-24.
- **Authority documents:**
  - `docs/VERCEL_GATEWAY_SPEC.md` blob `f0ec1fd9c1032627a515c9d0513f262af568f013`
  - `docs/VERCEL_GATEWAY_IMPLEMENTATION_PLAN.md` blob `38736854554ad734cf4a56a0104dbcae2cdd7a7e`

### In scope

- Implement authenticated `/api/v1/vercel` routes inside Context API.
- Add separate Zoro and upstream Vercel credential boundaries.
- Implement resource allowlists, Preview-first behavior, production approval checks, destructive confirmations, safe error translation, serializers, bounded diagnostics, and environment-variable value non-disclosure.
- Add deterministic tests and release validation.
- Add a dedicated Vercel GPT Action OpenAPI document.
- Open a pull request for review and collect available CI evidence.

### Out of scope

- Merge to `main`.
- Deployment or production release.
- Heroku or other secret/configuration changes.
- GPT Builder Action installation.
- Live Vercel reads or mutations.
- Destructive or production smoke tests.
- Declaring the gateway deployed, live, verified, or completed.

### Acceptance criteria

1. Every exposed Vercel route requires the dedicated bearer credential and bypasses request-time MongoDB middleware.
2. Vercel provider credentials remain server-side and are never returned or logged.
3. Preview is the deployment default.
4. Production-sensitive operations reject missing or mismatched approval evidence before upstream calls.
5. Destructive operations are disabled by default and require exact resource confirmation when enabled.
6. Team, project, repository, and domain constraints fail closed.
7. Decrypted environment-variable retrieval is not exposed, and supplied values are absent from responses and errors.
8. Upstream responses are explicitly serialized and errors are safely normalized.
9. Deployment events/logs are bounded and redacted on a best-effort basis.
10. The dedicated OpenAPI schema includes only implemented operations with unique operation IDs and bearer authentication.
11. Automated tests, lint, formatting, and release validation pass through CI or a clean external checkout.
12. A reviewable pull request is open and no merge/deploy occurs.

### Verification requirements

- Inspect the complete branch diff against current `main`.
- Confirm no generic upstream proxy, decrypted-value operation, billing/account administration, or secret was introduced.
- Run `npm ci` and `npm run verify` through CI or an external clean checkout.
- Inspect CI job output and resolve failures before changing status to `verifying`.
- Independently verify exact Vercel endpoint contracts against official documentation.
- Keep deployment, GPT Builder, and live smoke tests recorded as unperformed.

### Current evidence

- Branch `feat/vercel-gateway` exists and contains the initial implementation, tests, release validator, and dedicated Action schema.
- The branch is currently behind `main` and requires reconciliation before merge.
- No shell or CI verification has yet been recorded.
