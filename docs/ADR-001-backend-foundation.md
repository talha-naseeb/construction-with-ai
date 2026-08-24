# ADR-001: Backend foundation

## Status

Accepted

## Context

The dashboard needs a durable API and relational store for calls, leads, bookings, jobs, customers, services, and technicians. The frontend is already deployed independently and its mock data will be replaced incrementally through the existing API contract.

## Decision

Use a NestJS API in `backend/`, PostgreSQL provisioned through the Neon Vercel Marketplace integration, and Drizzle ORM for schema and migrations.

The backend exposes routes under `/api`, reads `DATABASE_URL` for runtime queries, and reads `DATABASE_URL_UNPOOLED` only when generating or applying migrations.

## Consequences

- The first production schema is versioned in `backend/drizzle/`.
- Runtime and migration database access remain explicitly separated.
- Feature modules can be introduced without changing the current frontend deployment.
- Authentication, Retell webhooks, and production API clients remain the next backend milestones.
