import type { Booking } from './types';

export function bookingStatus(booking: Booking) {
  return booking.technicianId ? 'Assigned' : 'Needs assignment';
}

export function jobSummary(booking: Booking) {
  return `${booking.service}\nCustomer: ${booking.customer}\nPhone: ${booking.phone}\nAddress: ${booking.address}\nTime: ${booking.date}\nNotes: ${booking.notes}`;
}
