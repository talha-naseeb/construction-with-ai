import { bookingFixtures } from '@/lib/mock-data';
import type { Booking, BookingStatus, Technician } from '@/lib/types';

export type BookingRepository = {
  list: () => Promise<Booking[]>;
  assignTechnician: (bookingId: string, technicianId: string) => Promise<Booking>;
  create: (input: Omit<Booking, 'id' | 'endAt' | 'timezone'>) => Promise<Booking>;
  cancel: (bookingId: string, reason: string) => Promise<Booking>;
  transition: (bookingId: string, status: BookingStatus) => Promise<Booking>;
  update: (bookingId: string, input: Partial<Pick<Booking, 'customer' | 'phone' | 'email' | 'service' | 'address' | 'propertyType' | 'startAt' | 'notes'>>) => Promise<Booking>;
};

export const bookingTransitions: Record<BookingStatus, BookingStatus[]> = {
  'Pending review': ['Needs verification', 'Confirmed', 'Cancelled'],
  'Needs verification': ['Confirmed', 'Cancelled'],
  Confirmed: ['Assigned', 'Cancelled'],
  Assigned: ['Completed', 'Cancelled'],
  Cancelled: [],
  Completed: []
};

export function assignmentWarnings(booking: Booking, technician: Technician, assignedBookings: Booking[]) {
  const warnings: string[] = [];
  if (technician.availability === 'Busy') warnings.push(`${technician.name} is currently marked busy.`);
  if (technician.serviceArea && !booking.address.toLowerCase().includes(technician.serviceArea.split(' · ')[0].toLowerCase().replace(' metro', ''))) warnings.push(`Confirm this address is within ${technician.name}'s service area (${technician.serviceArea}).`);
  const overlapping = assignedBookings.some((item) => item.id !== booking.id && item.technicianId === technician.id && item.startAt === booking.startAt && item.status !== 'Cancelled');
  if (overlapping) warnings.push(`${technician.name} already has a booking in this time window.`);
  return warnings;
}

let bookings = bookingFixtures.map((booking) => ({ ...booking }));

function cloneBooking(booking: Booking) {
  return { ...booking };
}

export const bookingRepository: BookingRepository = {
  async list() {
    return bookings.map(cloneBooking);
  },
  async assignTechnician(bookingId, technicianId) {
    const existingBooking = bookings.find((item) => item.id === bookingId);
    if (!existingBooking) throw new Error('This booking is no longer available. Refresh and try again.');
    if (existingBooking.status !== 'Confirmed' && existingBooking.status !== 'Assigned') throw new Error('Confirm this booking before assigning a technician.');
    const updatedBooking = { ...existingBooking, technicianId, status: 'Assigned' as const };
    bookings = bookings.map((item) => item.id === bookingId ? updatedBooking : item);
    return cloneBooking(updatedBooking);
  },
  async create(input) {
    const start = new Date(input.startAt);
    const endAt = new Date(start.getTime() + 60 * 60 * 1000).toISOString();
    const booking: Booking = { ...input, id: `bkg-${Date.now()}`, endAt, timezone: 'America/Chicago', status: 'Pending review' };
    bookings = [booking, ...bookings];
    return cloneBooking(booking);
  },
  async cancel(bookingId, reason) {
    const existing = bookings.find((item) => item.id === bookingId);
    if (!existing) throw new Error('This booking is no longer available. Refresh and try again.');
    const updated: Booking = { ...existing, status: 'Cancelled', cancellationReason: reason, technicianId: undefined };
    bookings = bookings.map((item) => item.id === bookingId ? updated : item);
    return cloneBooking(updated);
  },
  async transition(bookingId, status) {
    const existing = bookings.find((item) => item.id === bookingId);
    if (!existing) throw new Error('This booking is no longer available. Refresh and try again.');
    if (!bookingTransitions[existing.status].includes(status)) throw new Error(`This booking cannot move from ${existing.status} to ${status}.`);
    const updated = { ...existing, status, technicianId: status === 'Cancelled' ? undefined : existing.technicianId };
    bookings = bookings.map((item) => item.id === bookingId ? updated : item);
    return cloneBooking(updated);
  },
  async update(bookingId, input) {
    const existing = bookings.find((item) => item.id === bookingId);
    if (!existing) throw new Error('This booking is no longer available. Refresh and try again.');
    if (existing.status === 'Cancelled' || existing.status === 'Completed') throw new Error('Completed or cancelled bookings cannot be edited.');
    const startAt = input.startAt ? new Date(input.startAt).toISOString() : existing.startAt;
    const updated = { ...existing, ...input, startAt, endAt: input.startAt ? new Date(new Date(startAt).getTime() + 60 * 60 * 1000).toISOString() : existing.endAt };
    bookings = bookings.map((item) => item.id === bookingId ? updated : item);
    return cloneBooking(updated);
  }
};
