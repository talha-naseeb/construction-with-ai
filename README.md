# Retell Construction Admin

This workspace separates the production applications and shared delivery material.

```text
retell-admin/
├── frontend/   Next.js admin dashboard
├── backend/    NestJS API and Drizzle database schema
├── docs/       Product, sprint, API, and architecture records
└── rules/      Shared implementation and quality rules
```

## Run the frontend

```bash
cd frontend
npm run dev
```

## Run the backend

```bash
cd backend
npm run start:dev
```

The Vercel project is configured to deploy the `frontend/` directory. The backend uses the Neon PostgreSQL integration configured for this workspace.
