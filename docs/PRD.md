# PRD — Construction Call Operations MVP

**Status:** Proposed  
**Date:** 24 August 2026  
**Product:** Retell Construction Admin  
**Release:** Frontend MVP, followed by backend integration

## 1. Product summary

Retell Construction Admin is an internal command centre for a construction company. It gives an owner or dispatcher one place to review AI-handled calls, qualify leads, review pending bookings, manually assign technicians, and track work through completion.

The first release is an admin-only application. The frontend will use typed mock data and API-shaped interfaces until the backend is available; it must not pretend that actions have been saved remotely.

## 2. Problem statement

Construction companies lose revenue when calls are missed, lead information is incomplete, or scheduling details are scattered across calls, messages, and spreadsheets. The business owner needs a reliable workflow to review every AI-handled call, decide whether it is a lead or booking, and assign the right technician without guessing.

Without this workflow, calls cannot be audited, bookings are easily missed or double-booked, and the future voice agent cannot be trusted with customer-facing scheduling.

## 3. Users and permissions

| Persona | MVP access | Primary need |
|---|---|---|
| Owner/admin | Full access | Monitor calls, leads, bookings, jobs, technicians, and performance. |
| Dispatcher | Planned after MVP | Triage work and assign technicians with restricted settings access. |
| Technician | No portal in MVP | Receives job details outside the product. |
| Customer | No portal in MVP | Calls the business; does not log into the admin product. |

The backend will be the authority for authentication and authorization. The frontend may render role-aware UI later, but must never rely on hidden controls as protection.

## 4. Goals

1. Let an admin move a qualified customer from call review to a pending booking and technician assignment without losing the call context.
2. Make booking status, verification state, assigned technician, time, address, and service clearly visible in every relevant view.
3. Support a Retell voice-agent pilot by defining stable UI fields and API contracts for calls, transcripts, summaries, extracted lead data, and booking outcomes.
4. Make all core workflows responsive, keyboard accessible, and testable before backend integration.
5. Provide a dashboard that can eventually report operational metrics from real data rather than static figures.

## 5. Non-goals for this release

- Technician or customer accounts, mobile portal, or self-service job updates.
- Automated technician assignment; an admin always decides the assignment in MVP.
- Sending SMS, email, WhatsApp, invoices, estimates, payments, or contracts.
- Production Retell credentials, real calls, or API calls before backend work begins.
- Building a complete CRM, accounting system, or field-service management suite.

## 6. MVP user stories

### Call and lead triage

- As an admin, I want to see recent calls with their outcome, summary, transcript availability, and extracted details so that I can decide the next action.
- As an admin, I want to turn a qualified call into a lead or pending booking so that no opportunity is lost.
- As an admin, I want unknown service requests marked as leads so that the service catalogue stays controlled.

### Booking and assignment

- As an admin, I want to review customer, property, service, notes, verification, requested time, and call context before assigning work.
- As an admin, I want to assign one suitable technician manually so that the customer details can be shared safely.
- As an admin, I want obvious conflict and unavailable states so that I do not assign impossible work.

### Team and operations

- As an admin, I want to maintain technician records and see availability so that assignment decisions are informed.
- As an owner, I want a dashboard of live operational counts so that I can spot missed calls and unassigned bookings.

## 7. Functional requirements

### P0 — Frontend MVP

| Area | Requirement | Acceptance criteria |
|---|---|---|
| App shell | Every navigation item either leads to a complete page or is hidden until implemented. | No sidebar link reaches a 404 page. Active navigation is accurate. |
| Login | Provide the complete UI state for sign-in, validation, submitting, invalid credentials, and service failure. | Form values remain after failure; no real session or credentials are used until backend integration. |
| Dashboard | Show API-shaped KPI cards, shift schedule, unassigned bookings, technician availability, loading, empty, and error states. | No hard-coded date or business metrics remain in production-facing components. |
| Calls | Provide a call list and call detail view. | A call shows direction, caller, timestamp, duration, outcome, recording/transcript availability, AI summary, extracted fields, and next action. |
| Leads | Provide list, filters, detail, status, and conversion UI. | Admin can mark a mock lead as qualified, lost, or converted; reason is required for lost. |
| Bookings | Provide list, search, filters, create, detail, edit, cancel, and assignment UI. | Appointment data uses a real date/time representation; confirmation, cancellation, unassigned, and verification states are clear. |
| Assignment | Show only suitable technician choices and a conflict warning. | Assignment requires a technician; UI confirms the result and supports a recoverable error state. |
| Technicians | Provide list, detail, add, edit, active/inactive, skill/trade, service-area, and availability UI. | Forms validate required fields and preserve input on errors. |
| Jobs | Provide a simple job list/detail with scheduled, in-progress, completed, and cancelled states. | A booking can be represented as a job-ready record without losing customer and assignment context. |
| Services | Provide a read-only service catalogue and service detail. | Unknown requests are visibly routed to Leads rather than silently added as a service. |
| Shared states | Build loading skeletons, empty states, permission-denied, not-found, retryable error, and toast feedback patterns. | Every primary page has a defined loading, empty, and error state. |

### P1 — Fast follow after core UI

- Analytics views for call volume, qualification rate, booking conversion, missed calls, transfer rate, and unassigned-booking age.
- Customer profile with call, lead, booking, and job history.
- Security and settings screens for future backend configuration, without exposing secrets.
- Filters saved in the URL and paginated data-table patterns.

### P2 — Future backend-enabled work

- Real authentication, role-based access control, audit logs, data retention rules, and exports.
- Retell inbound/outbound calls, webhooks, recordings, transcripts, post-call analysis, knowledge base, and warm human transfer.
- Calendar, SMS/email, maps, accounting, payment, and external CRM integrations.

## 8. Data and API readiness

The frontend must use TypeScript domain types, service/repository interfaces, and mock implementations that mirror the future API. Components must not import `mock-data.ts` directly once their feature service exists.

Core entities:

| Entity | Important fields |
|---|---|
| Call | id, direction, customer/contact, timestamp, duration, status, disposition, transcript, recording URL, AI summary, extracted data, lead/booking links |
| Customer | id, name, phones, email, properties, notes, consent flags |
| Lead | id, source, service request, status, qualification reason, customer, property, call link, owner |
| Booking | id, customer, property, service, start/end datetime, timezone, status, verification, notes, technician, call/lead links |
| Technician | id, name, phone, skills, service areas, availability, active state, current assignments |
| Job | id, booking, status, technician, scheduled window, work notes, completion details |
| Service | id, name, trade, duration range, active state, service-area policy |

Use ISO 8601 timestamps and IANA time zones in the API contract. Human-readable formatting belongs in UI utilities only.

## 9. Success metrics

Metrics are measured after backend and Retell launch, not from mock data.

| Metric | Initial success target | Measurement |
|---|---:|---|
| Qualified calls reviewed | 95% within one business hour | Call and lead timestamps |
| Pending bookings assigned | 90% within one business hour | Booking audit events |
| Call-to-lead capture | 100% of qualifying calls create a reviewable record | Retell webhooks vs. lead records |
| Booking completion | 95% of attempted admin actions complete without UI error | Product analytics/error tracking |
| Voice-agent human transfer | Under 15% for supported requests after tuning | Retell call outcomes |

## 10. Frontend rules

The authoritative implementation rules are maintained in [rules/FRONTEND.md](../rules/FRONTEND.md). They are part of this PRD and apply to every frontend story.

## 11. Dependencies and open questions

| Question | Owner | Blocking? |
|---|---|---|
| Which services, trades, service areas, and emergency categories does the company support? | Client/product | Yes, before final service and intake UI. |
| What are booking durations, working hours, buffers, and assignment rules? | Client/operations | Yes, before calendar and conflict UI. |
| What information may the voice agent collect, store, repeat, or transfer? | Client/legal | Yes, before Retell launch. |
| Which system is authoritative for existing customers and jobs? | Client/backend | Yes, before API design. |
| Does the client need multiple dispatchers and role-based access at launch? | Client/product | No for frontend MVP, yes before production auth. |

## 12. Delivery phases

1. **Frontend foundation:** repair build, introduce feature boundaries, typed mock repositories, and common UI states.
2. **Operations UI:** finish Calls, Leads, Bookings, Technicians, Jobs, Services, and dashboard views with realistic mock workflows.
3. **Frontend hardening:** responsive/accessibility pass, component tests, workflow tests, and API contract documentation.
4. **Backend:** implement NestJS, PostgreSQL, authentication, domain APIs, audit events, and Retell webhook/function endpoints.
5. **Integration and pilot:** replace mocks feature-by-feature, launch one inbound Retell receptionist, then measure and tune.
