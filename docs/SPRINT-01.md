# Sprint 01 — Frontend Foundation and Core Booking Workflow

**Dates:** 24 August–4 September 2026 (two weeks)  
**Planning assumption:** one full-time frontend developer, 8 productive days after review, meetings, and buffer  
**Sprint goal:** Make the frontend build reliably and demonstrate a complete, API-ready mock workflow from booking review to technician assignment.

## Capacity

| Role | Available days | Planned allocation |
|---|---:|---:|
| Frontend developer | 8 | 80% planned, 20% buffer |
| Client/product reviewer | 2 short review sessions | Scope decisions and demo feedback |

## Committed backlog

| ID | Priority | Story | Estimate | Dependency |
|---|---|---|---:|---|
| FE-01 | P0 | Fix the booking-detail TypeScript error and restore production build. | 1 | None |
| FE-02 | P0 | Add generated-file ignores and protect the source tree from build artefacts. | 1 | None |
| FE-03 | P0 | Define shared domain types and API-shaped mock repositories for bookings and technicians. | 3 | FE-01 |
| FE-04 | P0 | Refactor booking list/detail and technician list to consume repositories rather than raw mock arrays. | 3 | FE-03 |
| FE-05 | P0 | Add booking loading, empty, error, assignment-pending, assignment-success, and assignment-failure states. | 3 | FE-04 |
| FE-06 | P0 | Make booking date/time fields API-ready with ISO timestamp fixtures and display formatters. | 2 | FE-03 |
| FE-07 | P0 | Audit navigation and hide incomplete routes or add intentional placeholder states. | 2 | None |
| FE-08 | P1 | Add component tests for assignment feedback and missing-booking handling. | 3 | FE-05 |
| FE-09 | P1 | Add a mock booking create/edit form with validation and draft preservation. | 5 | FE-06 |

**Committed estimate:** 18 points  
**Stretch estimate:** 5 points  
**Cut first if needed:** FE-09, then FE-08. Do not cut FE-01–FE-07.

## Acceptance criteria

- [x] `npm test` passes.
- [x] From `frontend/`, `npm run build` passes.
- [x] The booking and technician UI use typed feature repositories, not direct imports from `mock-data.ts`.
- [x] Assignment can show loading, success, validation error, and recoverable service-error UI states.
- [ ] A missing booking produces a useful not-found experience.
- [ ] Every visible sidebar route is complete or intentionally unavailable; none leads to an accidental 404.
- [ ] Booking fixtures preserve canonical timestamp/timezone data and UI formatting is separated from domain data.
- [ ] Desktop, tablet, and mobile layouts remain usable for changed pages.

## Day-by-day plan

| Timing | Focus | Review point |
|---|---|---|
| Days 1–2 | FE-01, FE-02, FE-03 | Confirm core types and API contract shape. |
| Days 3–5 | FE-04, FE-05, FE-06 | Demo booking review and assignment states. |
| Days 6–7 | FE-07, FE-08 | Review navigation and test coverage. |
| Day 8 | Buffer, regression, build, demo preparation | Client sprint demo. |

## Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Client has not finalized services or scheduling rules. | Forms and status rules may need rework. | Keep services and availability in fixtures/repositories; record decisions in the PRD. |
| Scope expands into backend work. | Frontend sprint misses its goal. | Keep API integration out of scope; use mock repositories only. |
| Styling work hides missing workflow states. | Demo looks complete but cannot integrate. | Prioritize domain types, error states, and contract readiness over visual polish. |
| Existing build failure remains unresolved. | No reliable deployment baseline. | Address FE-01 before all feature work. |

## Definition of done

- [ ] Implementation follows `rules/FRONTEND.md`.
- [ ] Required tests are added and pass.
- [ ] Production build passes.
- [ ] Empty/loading/error states are included for changed user flows.
- [ ] No credentials, API secrets, or real external calls are added.
- [ ] PRD and plan remain accurate after scope decisions.
