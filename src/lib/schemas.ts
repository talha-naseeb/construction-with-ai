import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid admin email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.')
});

export const assignmentSchema = z.object({
  technicianId: z.string().min(1, 'Choose a technician before assigning this booking.')
});

export const bookingSchema = z.object({
  customer: z.string().trim().min(2, 'Enter the customer name.'),
  phone: z.string().trim().min(7, 'Enter a valid phone number.'),
  service: z.string().trim().min(2, 'Choose or describe the requested service.'),
  address: z.string().trim().min(5, 'Enter the property address.'),
  startAt: z.string().min(1, 'Choose a requested date and time.'),
  notes: z.string().trim().min(5, 'Add a short description of the work.')
});
