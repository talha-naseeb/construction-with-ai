import { describe, expect, it } from 'vitest';
import { assignmentSchema, loginSchema } from './schemas';

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
});
