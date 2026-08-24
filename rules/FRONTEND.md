# Frontend rules

- Use Next.js App Router and TypeScript with strict mode.
- Keep pages server-rendered by default; use client components only for interaction and local UI state.
- Build responsive layouts for desktop, tablet, and mobile.
- Every user action needs a visible success, validation, or error result.
- Use accessible labels, keyboard focus, and semantic controls.
- Do not put Retell credentials, API secrets, or authorization decisions in the client.
- Treat the frontend as API-ready, not API-connected: use typed repository/service interfaces and mock implementations until the backend is available.
- Keep domain data canonical. Store timestamps as ISO 8601 with an IANA timezone; format dates, times, phones, and statuses only at the UI boundary.
- Do not import raw fixture arrays directly into pages or feature components. Access fixture data through the relevant mock repository or feature hook.
- Every data view must define loading, populated, empty, retryable-error, not-found (when applicable), and mutation-pending states.
- Every form must have client-side Zod validation, accessible field errors, preserved input after a failure, disabled duplicate submission, and a plain-language result.
- Do not show a successful save, assignment, booking, or status change unless the data layer reports success. Demo/mock actions must be clearly scoped to local demo state.
- Hide navigation to unfinished product areas. Do not leave links that lead to unintentional 404 pages.
- Use reusable components and design tokens for repeated tables, status badges, page headers, dialogs, empty states, and feedback; do not duplicate workflow logic across pages.
- Keep client components small. Data fetching, persistence, authorization, Retell webhooks, and secrets belong to server-side/backend layers.
- Make status values explicit types or constants; do not derive business truth from display strings, colours, or UI labels.
- All customer-facing personal data shown in the UI must have a clear field owner in the future API contract. Never place sensitive values in URLs, browser storage, or client logs.
- Add unit tests for formatting and business-state helpers, component tests for interactive states, and end-to-end coverage of core workflows once the backend is connected.
