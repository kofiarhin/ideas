# Amas Kitchen

**Last updated:** 2026-07-18

## Snapshot

Amas Kitchen is a full-stack web application for a premium Ghanaian kitchen. Repository and pull-request evidence show customer-facing menu ordering, services, testimonials, contact, and checkout flows, with delivery language centred on Accra and Lapaz.

## Links

- Repository: https://github.com/kofiarhin/amas-kitchen
- SSH: `git@github.com:kofiarhin/amas-kitchen.git`
- Live: Not documented
- Design review PR: https://github.com/kofiarhin/amas-kitchen/pull/4
- Design inspiration PR: https://github.com/kofiarhin/amas-kitchen/pull/5

## Current State

- Lifecycle: Not documented
- Stack: React 19, Vite, Tailwind CSS, Vitest, Node.js, Express, MongoDB, Mongoose, Jest, Supertest
- Architecture: React/Vite client with an Express/Mongoose server
- Current priority: Not documented
- Open work: Two design-related pull requests await a consolidated direction

## Current Focus

The current repository work is focused on the homepage visual direction and conversion experience. PR #4 contains a design brief for an asymmetric hero and immediate conversion strip but is conflicted and explicitly paused for human review. PR #5 adds a separate design-inspiration shortlist component and is mergeable, but its validation was not run locally.

## Brainstorming

_No durable brainstorming notes captured yet._

## Decisions

- Existing routes and data behaviour should be preserved while the homepage design direction is reviewed.
- No final homepage visual direction, CTA priority, delivery wording, logo, photography set, or brand tone has been approved in the Ideas Hub.

## Assumptions

- None recorded.

## Open Questions

- What is the current lifecycle state and immediate business milestone?
- Is there a live product or business URL?
- Which CTA should lead the homepage: menu ordering, direct contact, or another conversion path?
- What delivery-area wording should be used for Accra and Lapaz?
- Which logo, photography, and brand-tone assets are approved?
- Should PR #5 remain a review artifact, become product UI, or be superseded by the consolidated homepage direction?

## Next Actions

- Review PRs #4 and #5 together and approve one consolidated design direction.
- Confirm the primary CTA, delivery language, brand tone, logo, and photography assets before homepage implementation.
- Record lifecycle, live URL, and immediate milestone when confirmed.
