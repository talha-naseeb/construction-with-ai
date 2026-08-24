# Retell Construction Admin

Next.js front end for the single-admin construction calling-agent platform.

## Current scope

- Admin sign-in interface with validation
- Dashboard shell and overview
- Booking list, detail, manual technician assignment, and share-ready job details
- Technician records (no technician accounts)
- Responsive UI, toast feedback, error boundaries, and unit tests

## Start locally

```bash
npm install
npm run dev
```

## Verify

```bash
npm test
npm run build
```

The booking data is local demo state until the NestJS backend is connected.

## Product delivery documents

- [PRD](docs/PRD.md)
- [Frontend delivery plan](docs/FRONTEND-PLAN.md)
- [All sprints and approval gates](docs/SPRINTS.md)
- [Sprint 01 detail](docs/SPRINT-01.md)
- [Frontend implementation rules](rules/FRONTEND.md)

## Environments

- **Staging:** Vercel Preview deployments. Copy `.env.staging.example` to `.env.staging` for local staging checks.
- **Production:** Vercel Production deployments. Copy `.env.production.example` to `.env.production` only when you need a local production-like build.

Environment files with real values are ignored by Git. Do not put Retell keys, backend secrets, or database credentials in `NEXT_PUBLIC_*` variables.
