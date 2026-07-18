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
- Contact and booking submissions now trigger optional private Telegram admin notifications after successful MongoDB persistence.

## Current Focus

- Telegram admin notifications are implemented for contact messages and booking-based enrolment submissions.
- Production configuration still requires the Telegram bot token, destination chat ID, and notifications-enabled environment flag.

## Brainstorming

_No durable brainstorming notes captured yet._

## Decisions

- TanStack Query handles server state.
- Redux Toolkit is reserved for shared UI and authentication state.
- Environment-specific values and secrets remain in environment variables.
- The platform separates the Vite client and Express API deployment surfaces.
- MongoDB remains the source of truth for contact and booking submissions.
- Telegram is a best-effort private admin notification channel and must never block or roll back successful submissions.
- The existing booking submission is the V1 enrolment notification source.
- Telegram notifications use one server-configured bot and private chat, HTML formatting with escaped user content, a five-second timeout, and no request-lifecycle retries.

## Assumptions

- None recorded.

## Open Questions

- Is the six-month mentorship programme still the active product direction?
- Which portal capability is the current priority?
- What should be improved next across onboarding, curriculum, messaging, templates, or administration?

## Next Actions

- Configure `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, and `TELEGRAM_NOTIFICATIONS_ENABLED=true` in the deployed API environment.
- Submit one production-safe contact message and one booking to confirm end-to-end Telegram delivery.
- Document the current mentorship programme status and target audience.
- Record the next approved learner-facing or operations milestone.
