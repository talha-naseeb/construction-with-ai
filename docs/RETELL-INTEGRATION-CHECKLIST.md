# Backend and Retell Integration Checklist

- [ ] Store Retell credentials only in server-side environment variables.
- [ ] Verify every Retell webhook signature before processing its payload.
- [ ] Make webhook processing idempotent using the Retell call/event ID.
- [ ] Implement service lookup before the agent offers a service or availability.
- [ ] Route unavailable services to a lead; never add them to the catalogue automatically.
- [ ] Create bookings through the backend and return the authoritative booking status.
- [ ] Send confirmation links with random, expiring, single-use tokens.
- [ ] Require step-up verification for cancellation, rescheduling, address changes, payments, history, and account changes.
- [ ] Record durable audit events for agent tool calls and admin mutations.
- [ ] Apply rate limits to OTP and verification endpoints.
- [ ] Return field-level validation and transition errors in the API contract format.
- [ ] Replace local fixture repositories only after the equivalent endpoint is available and tested.
