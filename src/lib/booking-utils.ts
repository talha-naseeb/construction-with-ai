import type { Booking } from './types';

export function bookingStatus(booking: Booking) {
  return booking.status;
}

export function jobSummary(booking: Booking) {
  return `${booking.service}\nCustomer: ${booking.customer}\nPhone: ${booking.phone}\nAddress: ${booking.address}\nTime: ${formatBookingSchedule(booking)}\nNotes: ${booking.notes}`;
}

export function formatBookingSchedule(booking: Pick<Booking, 'startAt' | 'timezone'>) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: booking.timezone
  }).format(new Date(booking.startAt));
}
