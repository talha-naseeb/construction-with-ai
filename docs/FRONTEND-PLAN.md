# Frontend Delivery Plan

This plan deliberately completes the user experience before API integration. Every completed screen must consume a typed feature service so that changing from mock data to HTTP calls is isolated to the data layer.

## Phase 0 — Stabilize the baseline

- Fix the current production build failure in booking detail.
- Add `.next` and `.DS_Store` to `.gitignore`; do not commit generated build files.
- Replace direct mock-data imports in pages with typed feature repositories.
- Define a shared `AsyncState` convention: loading, data, empty, error, retry.

**Exit criteria:** from `frontend/`, `npm test` and `npm run build` pass; no generated files are part of planned source changes.

## Phase 1 — Shared app foundation

- Finalize navigation so only implemented routes are visible.
- Create reusable page headers, tables, filtering, detail panels, confirmation dialogs, form fields, status badges, empty states, error states, and skeletons.
- Add application-level mock session state for the UI only; clearly label it as demo authentication.
- Add domain types and API-shaped repository interfaces for calls, leads, customers, bookings, technicians, jobs, and services.

**Exit criteria:** all common states are reusable and all pages can render from fixtures without direct array imports.

## Phase 2 — High-value operations workflow

- Calls: list, filters, details, transcript/summary, disposition, and lead/booking next actions.
- Leads: list, details, qualification, lost reason, and conversion to a pending booking.
- Bookings: create/edit/cancel/review, date/time fields, customer/property context, verification, and technician assignment.
- Technicians: list/detail/form, skills, trade, service area, availability, and assignment suitability.

**Exit criteria:** a reviewer can demonstrate the full mock journey: call → lead → booking → technician assignment.

## Phase 3 — Operational completeness

- Jobs: job-ready queue, status flow, work context, and linkage to booking/customer/technician.
- Services: controlled catalogue and unknown-service lead state.
- Dashboard: dynamic mock-derived counts and schedule, not literal metrics or dates.
- Analytics placeholder screens that define metrics and empty states without inventing data.

**Exit criteria:** every visible navigation item is functional and every main view has loading, empty, error, and populated states.

## Phase 4 — Frontend hardening and backend handoff

- Responsive and accessibility review at desktop, tablet, and mobile widths.
- Unit tests for domain/status/formatting rules; component tests for forms; end-to-end mock workflow coverage.
- Document request/response contracts, mutation states, error mapping, pagination/filter conventions, and field ownership.
- Create a backend handoff checklist: auth decisions, API base URL, error envelope, upload policy, Retell webhook events, and event idempotency.

**Exit criteria:** the frontend has no production dependency on local mock data and can be integrated one repository at a time.

## Backend integration rule

For each feature, retain the component interface and replace only the repository implementation:

```text
Page/component → feature hook → repository interface → mock repository (now)
                                                   → HTTP repository (later)
```

No components may contain API keys, Retell secrets, authorization decisions, or direct database assumptions.
