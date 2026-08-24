# Backend and Retell Integration Checklist

- [ ] Establish authenticated admin session and RBAC claims.
- [ ] Implement the API error envelope and pagination convention in `API-CONTRACTS.md`.
- [ ] Replace one mock repository at a time; retain the component interface.
- [ ] Verify Retell webhook signatures before processing event payloads.
- [ ] Persist Retell event IDs and make webhook handling idempotent.
- [ ] Keep Retell keys, provider credentials, confirmation tokens, and OTP secrets server-side.
- [ ] Enforce verification for cancel, reschedule, address change, account change, payment, and detailed history actions.
- [ ] Redact sensitive fields from logs and define recording/transcript retention.
- [ ] Generate confirmation links with single-use, expiring random tokens; never use a booking/customer ID as proof.
- [ ] Add integration and end-to-end tests for authorization, duplicate events, failed tool calls, and verification failures.
