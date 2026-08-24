import { describe, expect, it } from 'vitest';
import { assignmentSchema, bookingSchema, loginSchema } from './schemas';

describe('form validation', () => {
  it('rejects an incomplete admin login', () => {
    expect(loginSchema.safeParse({ email: 'not-an-email', password: 'short' }).success).toBe(false);
  });

  it('accepts a valid admin login shape', () => {
    expect(loginSchema.safeParse({ email: 'admin@buildpro.com', password: 'a-secure-password' }).success).toBe(true);
  });

  it('requires a technician before assignment', () => {
    expect(assignmentSchema.safeParse({ technicianId: '' }).success).toBe(false);
  });

  it('requires the booking intake details before creating a local booking', () => {
    expect(bookingSchema.safeParse({ customer: 'Alex', phone: '(512) 555-0198', service: 'Kitchen remodel', address: '123 Maple Dr', startAt: '2026-08-24T10:00', notes: 'Cabinet and countertop estimate' }).success).toBe(true);
    expect(bookingSchema.safeParse({ customer: '', phone: '', service: '', address: '', startAt: '', notes: '' }).success).toBe(false);
  });
});
