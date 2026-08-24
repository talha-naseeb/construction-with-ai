# Testing rules

- Add unit tests for validation, status rules, formatting, and utility functions.
- Add component tests for interactive forms and assignment feedback.
- Before merge, run `cd frontend && npm test && npm run build`, then `cd backend && npm test -- --runInBand && npm run build` when backend changes are included.
- Add end-to-end coverage for admin sign-in, booking review, technician assignment, and error states when the backend is connected.
- At the end of every sprint, run all relevant automated checks, report the results, and fix failures before requesting manual testing.
- Do not start the next sprint until the client has manually tested the delivered workflow and explicitly approved it.
- If the client requests changes, keep the current sprint active; implement the changes, rerun tests, and request approval again.
- Record automated-test status, build status, manual-test status, approval status, and deferred notes in `docs/SPRINTS.md`.
