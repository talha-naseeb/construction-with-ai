# Frontend API Contract

This document defines the boundary expected by the frontend. The NestJS backend remains authoritative for all business state, permissions, verification, and audit history.

## Shared conventions

- JSON request and response bodies.
- ISO 8601 timestamps with an IANA time zone where a schedule is shown.
- List responses use `{ data, page, pageSize, total }`.
- Mutation failures use `{ code, message, fieldErrors? }`.
- The frontend never accepts caller ID as full authentication.

## Core entities

### Booking

`id`, `customer`, `phone`, `email?`, `service`, `address`, `propertyType`, `notes`, `startAt`, `endAt`, `timezone`, `status`, `verified`, `technicianId?`, `sourceLeadId?`, `sourceCallId?`, `cancellationReason?`.

Allowed frontend status requests: `Pending review → Needs verification | Confirmed`, `Needs verification → Confirmed`, `Confirmed → Assigned`, `Assigned → Completed`, and a permitted transition to `Cancelled` with a reason.

### Technician

`id`, `name`, `initials`, `trade`, `skills`, `serviceArea`, `phone`, `availability`, `currentLoad`.

### Call and lead

Calls provide the immutable transcript, summary, outcome, verification state, and source timestamp. A lead includes its source call ID, requested service, location, owner, follow-up time, and status.

## Endpoints expected by the UI

| Resource | Operations |
| --- | --- |
| `/api/calls` | List/search/filter calls; retrieve call transcript and extracted fields. |
| `/api/leads` | List, retrieve, qualify, mark lost with a reason, and convert to a pending booking. |
| `/api/bookings` | List, create, retrieve, edit, transition status, cancel with reason, and assign technician. |
| `/api/technicians` | List, retrieve, create, and edit technician profiles. |
| `/api/customers` | List/search customers, properties, and linked history. |
| `/api/jobs` | List, retrieve, transition, cancel, and save work notes. |
| `/api/services` | List/retrieve services and edit active state, trade, duration range, and service areas. |
| `/api/analytics` | Filtered metric definitions, series, and tabular breakdowns. |

## Ownership and safety

- The backend decides service availability, scheduling conflicts, verification requirements, and allowed state transitions.
- A confirmation token is single-use, expires, and is never a customer ID or booking ID.
- Sensitive customer changes require backend step-up verification and a durable audit event.
