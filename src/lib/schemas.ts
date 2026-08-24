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
  email: z.union([z.literal(''), z.string().trim().email('Enter a valid email address.')]),
  service: z.string().trim().min(2, 'Choose or describe the requested service.'),
  address: z.string().trim().min(5, 'Enter the property address.'),
  propertyType: z.string().trim().min(2, 'Choose the property type.'),
  startAt: z.string().min(1, 'Choose a requested date and time.'),
  notes: z.string().trim().min(5, 'Add a short description of the work.')
});

export const technicianSchema = z.object({
  name: z.string().trim().min(2, 'Enter the technician name.'),
  trade: z.string().trim().min(2, 'Enter the primary trade.'),
  phone: z.string().trim().min(7, 'Enter a valid phone number.'),
  skills: z.string().trim().min(2, 'Add at least one skill.'),
  serviceArea: z.string().trim().min(2, 'Add a service area.'),
  availability: z.enum(['Available', 'Assigned', 'Busy'])
});
