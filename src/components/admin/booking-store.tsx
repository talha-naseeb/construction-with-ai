'use client';

import { createContext, useContext, useState } from 'react';
import { initialBookings, technicians } from '@/lib/mock-data';
import type { Booking } from '@/lib/types';

type BookingContextValue = {
  bookings: Booking[];
  assignTechnician: (bookingId: string, technicianId: string) => void;
  technicianName: (technicianId?: string) => string;
};
const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState(initialBookings);
  function assignTechnician(bookingId: string, technicianId: string) {
    setBookings((current) => current.map((booking) => booking.id === bookingId ? { ...booking, technicianId } : booking));
  }
  function technicianName(technicianId?: string) {
    return technicians.find((technician) => technician.id === technicianId)?.name ?? '';
  }
  return <BookingContext.Provider value={{ bookings, assignTechnician, technicianName }}>{children}</BookingContext.Provider>;
}

export function useBookings() {
  const value = useContext(BookingContext);
  if (!value) throw new Error('useBookings must be used inside BookingProvider.');
  return value;
}
