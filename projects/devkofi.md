# DevKofi

**Last updated:** 2026-07-18

## Snapshot

DevKofi is a MERN mentorship platform with a Vite-powered learning portal and an Express/MongoDB API. It supports mentee onboarding, curriculum presentation, templates, messaging, authentication, and internal tools for the mentorship team.

## Links

- Repository: https://github.com/kofiarhin/devkofi
- SSH: `git@github.com:kofiarhin/devkofi.git`
- Live: https://devkofi.com/
- Staging: https://devkofi.vercel.app/

## Current State

- Lifecycle: Not documented
- Stack: React, Vite, React Router, TanStack Query, Redux Toolkit, Node.js, Express, MongoDB, Mongoose
- Testing: Vitest for the client; Jest and Supertest for the server
- Deployment: Vercel frontend with a separately deployed API
- Current priority: Not documented

## Current Focus

Not documented.

## Brainstorming

_No durable brainstorming notes captured yet._

## Decisions

- TanStack Query handles server state.
- Redux Toolkit is reserved for shared UI and authentication state.
- Environment-specific values and secrets remain in environment variables.
- The platform separates the Vite client and Express API deployment surfaces.

## Assumptions

- None recorded.

## Open Questions

- Is the six-month mentorship programme still the active product direction?
- Which portal capability is the current priority?
- What should be improved next across onboarding, curriculum, messaging, templates, or administration?

## Next Actions

- Document the current mentorship programme status and target audience.
- Record the next approved learner-facing or operations milestone.
