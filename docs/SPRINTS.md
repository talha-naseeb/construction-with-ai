# Frontend Sprint Roadmap and Approval Gates

**Project:** Retell Construction Admin  
**Scope:** Frontend implementation only; backend and API integration start after frontend approval  
**Cadence assumption:** One frontend developer, two-week sprints, 8 productive days per sprint  
**Planning buffer:** 20% capacity is reserved for fixes, client feedback, and regression work

## Delivery control process

No sprint begins automatically. The workflow for every sprint is:

```text
Implement planned stories
        ↓
Run automated tests and production build
        ↓
Fix failures and provide test results
        ↓
Client manually tests the delivered workflow
        ↓
Client explicitly approves the sprint
        ↓
Start the next sprint
```

### Required gate checklist

Before asking for manual approval, the implementation owner must provide:

- [ ] A short summary of completed stories and any scope changes.
- [ ] The changed files and relevant workflow to test manually.
- [ ] Results of `npm test` and `npm run build`.
- [ ] Any additional component or end-to-end test results introduced in that sprint.
- [ ] Known limitations, deferred items, and no-go conditions.
- [ ] A demo-ready local application.

**Approval outcome:**

| Client decision | Next action |
|---|---|
| Approved | Mark sprint complete and begin the next sprint. |
| Approved with notes | Log notes for the next sprint unless they affect the delivered workflow. |
| Changes requested | Keep the current sprint active; fix, retest, and request approval again. |
| Scope changed | Update PRD and backlog before implementation resumes. |

## Roadmap at a glance

| Sprint | Target dates* | Goal | Approval artifact |
|---|---|---|---|
| 01 | 24 Aug–4 Sep | Stable, API-ready booking and technician foundation | Booking review and assignment demo |
| 02 | 7–18 Sep | Calls and leads workflow | Call → lead triage demo |
| 03 | 21 Sep–2 Oct | Complete booking lifecycle and technician management | Lead → booking → assignment demo |
| 04 | 5–16 Oct | Customers, jobs, and services operations | Customer/job lifecycle demo |
| 05 | 19–30 Oct | Dashboard, analytics foundation, settings, and resilience | Operations overview demo |
| 06 | 2–13 Nov | Frontend hardening and backend handoff | Release candidate and API contract pack |

\*Dates assume prior-sprint approval at the end of each target window. They shift if approval or client decisions take longer.

---

## Sprint 01 — Frontend foundation and core booking workflow

**Goal:** Make the app build reliably and make booking review and technician assignment API-ready.

**Committed scope (18 points)**

- [x] FE-01 Fix the booking-detail TypeScript error and restore the production build — 1 point.
- [x] FE-02 Ignore generated build artefacts — 1 point.
- [x] FE-03 Create booking and technician domain types plus API-shaped mock repositories — 3 points.
- [x] FE-04 Refactor booking and technician screens to use repositories — 3 points.
- [x] FE-05 Add assignment pending, success, validation-error, and service-error states — 3 points.
- [x] FE-06 Use ISO timestamps/time zones in booking fixtures and UI formatters — 2 points.
- [x] FE-07 Remove or intentionally gate unfinished navigation destinations — 2 points.
- [ ] FE-08 Add component tests for assignment feedback and missing bookings — 3 points.

**Stretch (5 points):** [ ] FE-09 mock create/edit booking form with validation and draft preservation.

**Manual client check:** Review a booking, select a technician, observe validation and error states, confirm the mobile layout, and confirm no visible navigation item unintentionally reaches a 404.

**Exit criteria:** Test suite and production build pass; booking and technician screens have no direct dependency on raw fixture arrays.

---

## Sprint 02 — Calls and leads workflow

**Goal:** Let an admin triage a call into a qualified, lost, or booking-ready lead without losing context.

**Committed scope (19 points)**

- [x] FE-10 Add call domain types, API-shaped repository, and realistic fixtures — 3 points.
- [-] FE-11 Build calls list with direction, outcome, date range/status filters, search, loading, empty, and error states — 3 points. *(List and outcome are done; filters, search, and state coverage remain.)*
- [-] FE-12 Build call detail with caller information, timeline, transcript, recording placeholder, AI summary, extracted fields, and disposition — 5 points. *(Caller, transcript, summary, outcome, and recording placeholder are done; timeline, extracted fields, and disposition remain.)*
- [x] FE-13 Add lead domain types, API-shaped repository, statuses, and fixtures — 3 points.
- [-] FE-14 Build lead list/detail with qualify, mark-lost, and lost-reason workflow — 3 points. *(List is done; detail and actions remain.)*
- [-] FE-15 Link call details to lead creation/review state and preserve source-call context — 2 points. *(Call outcome links to the lead queue; source context and conversion remain.)*

**Stretch (3 points):** FE-16 URL-synchronised filter state and pagination UI pattern.

**Manual client check:** Review a new call, inspect its transcript and AI summary, create a lead, qualify it, mark another lead lost with a reason, and verify all states are understandable without backend data.

**Exit criteria:** Calls and leads work as a cohesive mock workflow, every list has loading/empty/error states, and no Retell credentials or real call data are introduced.

---

## Sprint 03 — Booking lifecycle and technician management

**Goal:** Complete the dispatch workflow from qualified lead through an appointment and manual assignment.

**Committed scope (20 points)**

- FE-17 Build lead-to-pending-booking conversion with customer, property, service, requested window, and call context — 5 points.
- FE-18 Build create/edit/cancel booking forms with validation, confirmation, and recoverable errors — 5 points.
- FE-19 Add booking status model: pending review, confirmed, needs verification, assigned, cancelled, completed — 2 points.
- FE-20 Add technician list/detail/create/edit UI with trade, skills, service areas, active state, and availability — 5 points.
- FE-21 Add assignment suitability and conflict-warning presentation using mock scheduling rules — 3 points.

**Stretch (3 points):** FE-22 booking timeline/history UI using fixture audit events.

**Manual client check:** Convert a qualified lead to a booking, correct a validation error without losing data, select a suitable technician, review a conflict warning, cancel a booking with a reason, and view technician details.

**Exit criteria:** A full mock journey can be demonstrated: call → lead → pending booking → confirmed booking → technician assignment.

---

## Sprint 04 — Customers, jobs, and service catalogue

**Goal:** Give the admin the operational context to manage customer history and work after assignment.

**Committed scope (18 points)**

- FE-23 Add customer domain types, repository, list, detail, search, and linked call/lead/booking/job history — 5 points.
- FE-24 Add property/address presentation and an add/edit mock customer-property flow — 3 points.
- FE-25 Add job domain types, repository, job queue, and job detail — 3 points.
- FE-26 Build job state flow: scheduled, in progress, completed, cancelled, with clear allowed transitions — 3 points.
- FE-27 Add service catalogue list/detail with trade, duration range, active state, and service-area policy — 2 points.
- FE-28 Route unknown service requests to a clear lead-review state — 2 points.

**Stretch (3 points):** FE-29 job work-note and completion-summary UI.

**Manual client check:** Find a customer, inspect their complete mock history, open a related job, move it through allowed states, and verify an unknown service never silently appears in the catalogue.

**Exit criteria:** Customers, jobs, and services have linked data, useful empty/error states, and no accidental cross-feature data loss in local mock flows.

---

## Sprint 05 — Operations overview and application resilience

**Goal:** Make the dashboard and remaining administration areas truthful, navigable, and ready for real operational data.

**Committed scope (18 points)**

- FE-30 Refactor the dashboard to calculate fixture-driven KPIs, queues, and schedule entries rather than render literal values/dates — 4 points.
- FE-31 Add dashboard loading, empty, partial-data, and retryable-error states — 3 points.
- FE-32 Build analytics foundation screens with metric definitions, filters, tables/charts placeholders, and no fabricated production claims — 3 points.
- FE-33 Build settings UI shell for company profile, business hours, service areas, and future integration status; no secrets exposed — 3 points.
- FE-34 Build security UI shell for future sessions, roles, audit-log, and retention settings; no fake enforcement claim — 2 points.
- FE-35 Complete global not-found, permission, network-error, and recovery patterns — 3 points.

**Stretch (3 points):** FE-36 save filters in the URL for high-value lists.

**Manual client check:** Use the dashboard in populated, empty, and error states; navigate every visible screen; review business-hour/service-area settings UI; and verify it never claims metrics, authentication, or security that do not exist yet.

**Exit criteria:** Every visible navigation item has an intentional destination and every primary page has populated, loading, empty, and error behaviour.

---

## Sprint 06 — Quality, release candidate, and backend handoff

**Goal:** Deliver a tested, accessible frontend release candidate with clear API contracts for backend implementation.

**Committed scope (20 points)**

- FE-37 Perform responsive visual review across desktop, tablet, and mobile; fix critical layout defects — 4 points.
- FE-38 Perform keyboard, focus, semantic, form-label, table, contrast, and screen-reader accessibility review; fix P0/P1 issues — 4 points.
- FE-39 Expand unit/component tests for all status transitions, validation, async mutations, and error/empty states — 4 points.
- FE-40 Add end-to-end mock coverage for sign-in UI, call-to-lead, lead-to-booking, assignment, job state, and failure paths — 4 points.
- FE-41 Write API contract pack: entities, endpoints, request/response shapes, pagination, mutation errors, field ownership, and auth assumptions — 3 points.
- FE-42 Write backend and Retell integration checklist: webhook events, tool endpoints, idempotency, security boundaries, and migration order — 1 point.

**Stretch (3 points):** FE-43 visual regression snapshots for core screens.

**Manual client check:** Execute the complete documented happy path and error path on desktop and mobile. Review the API contract pack against the client’s actual construction operations before backend work starts.

**Exit criteria:** All automated checks pass, all P0/P1 accessibility issues are resolved, frontend rules are followed, and the client explicitly accepts the frontend release candidate.

---

## Check-and-balance tracker

Update this table at each sprint review. A sprint is not complete until the client approval column is marked approved.

| Sprint | Scope signed off | Automated tests | Build | Manual test | Client approval | Notes |
|---|---|---|---|---|---|---|
| 01 | Ready for approval | Passed | Passed | Passed | Pending | Manual testing completed; booking lifecycle and technician profile workflows are ready for approval. |
| 02 | Ready for approval | Passed | Passed | Passed | Pending | Manual testing completed; call search/outcome filtering and lead source-call context are ready for approval. |
| 03 | Ready for approval | Passed | Passed | Passed | Pending | Manual testing completed; lead-to-booking, lifecycle, cancellation, and assignment warning paths are ready for approval. |
| 04 | Ready for approval | Passed | Passed | Passed | Pending | Manual testing completed; customer history and job workflow screens are ready for approval. |
| 05 | Ready for approval | Passed | Passed | Passed | Pending | Manual testing completed; dashboard, analytics, and settings use explicit mock-data boundaries. |
| 06 | Ready for approval | Passed | Passed | Passed | Pending | Manual testing completed; API contract and Retell checklist are ready for approval. |
