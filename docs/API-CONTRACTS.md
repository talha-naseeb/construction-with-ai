# Frontend API Contract Pack

The current repositories are local mock implementations. Replace each repository implementation with HTTP without changing page/component interfaces.

## Shared conventions

- All timestamps are ISO 8601 strings with an IANA timezone at the UI boundary.
- IDs are opaque; never place customer identifiers or security tokens in public URLs.
- List endpoints use `cursor` and `limit`; responses return `{ data, nextCursor }`.
- Mutations return the updated resource or an error envelope: `{ code, message, fieldErrors? }`.
- The backend owns authorization, verification, Retell signature validation, and all business-state transitions.

## Booking

`GET /admin/bookings` returns booking reference, customer-facing details authorised for the signed-in admin, service, property, requested/scheduled window, verification state, technician assignment, and lifecycle status.

`POST /admin/bookings` accepts `customer`, `phone`, `service`, `address`, `startAt`, and `notes`. The backend returns a booking in `Pending review`; it does not claim customer confirmation.

`PATCH /admin/bookings/:id/assignment` accepts `{ technicianId }`. The backend validates technician capability, availability, conflict rules, and authorization before returning the booking.

## Calls and leads

`GET /admin/calls` returns authorised call metadata, outcome, verification state, and linked lead/booking IDs when present. Transcript and recording URLs require a separate, authorised detail request.

`POST /admin/leads` accepts an explicit unknown-service or follow-up request. A lead retains its `sourceCallId`; it never silently creates a catalogue service.

## Field ownership

| Field | Owner |
|---|---|
| Customer identity and verification | Backend customer/verification service |
| Service availability and pricing | Backend service catalogue |
| Appointment/technician eligibility | Backend scheduling service |
| Call recording/transcript | Retell sync service with backend authorization |
| UI filters, unsaved form values | Frontend only |
