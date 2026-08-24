import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid admin email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.')
});

export const assignmentSchema = z.object({
  technicianId: z.string().min(1, 'Choose a technician before assigning this booking.')
});
