import { bookingFixtures } from '@/lib/mock-data';
import type { Booking } from '@/lib/types';

export type BookingRepository = {
  list: () => Promise<Booking[]>;
  assignTechnician: (bookingId: string, technicianId: string) => Promise<Booking>;
  create: (input: Omit<Booking, 'id' | 'endAt' | 'timezone'>) => Promise<Booking>;
};

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
  }
};
