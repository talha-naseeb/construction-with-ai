# Implementation Status

**Last updated:** 24 August 2026  
**Scope:** Frontend-only mock implementation. No backend, Retell connection, authentication enforcement, or real customer data is in scope yet.

## Current position

| Area | Status | Evidence / next step |
|---|---|---|
| Sprint 01 — Booking and technician foundation | In progress | Typed booking and technician repositories, assignment flow, and build/test baseline exist. Complete the remaining acceptance checks and request client approval. |
| Sprint 02 — Calls and leads | In progress | Calls list, typed local call data, call detail, transcript, outcome, and links to booking/lead queues are implemented. Lead qualification, loss reasons, filters, loading/empty/error states, and source-context conversion remain. |
| Sprint 03 — Booking lifecycle | Not started | Start after Sprint 02 is accepted: lead → pending booking → confirmed booking → technician assignment. |
| Sprint 04 — Customers, jobs, services | Started as UI lists | List pages exist with local typed data. Detail views, linked histories, forms, and status transitions remain. |
| Sprint 05 — Dashboard and resilience | Not started | Existing dashboard needs API-ready mock derivation and full state coverage. |
| Sprint 06 — Hardening and handoff | Not started | Begin only after core workflows are accepted. |

## Completed in this session

- Added calls, leads, customers, jobs, and services routes using typed local repository data.
- Added a call review detail page with transcript, AI summary, verification state, and outcome-specific follow-up.
- Connected call review actions to the appropriate booking or lead queue.
- Removed navigation links to routes that have no intentional destination.
- Ran `npm run build` and `npm test` successfully after each implemented workflow.

## Active next work

1. Build lead detail and qualification/lost-reason actions.
2. Preserve the source call when a qualified lead becomes a pending booking.
3. Add the booking creation/edit flow with Zod validation and clear mock mutation feedback.

## Approval rule

Work is not marked **complete** merely because it builds. Each sprint remains **in progress** until the client manually tests its workflow and explicitly approves it. Record that decision in `docs/SPRINTS.md`.
