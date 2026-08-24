'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { bookingRepository } from '@/lib/repositories/booking-repository';
import { technicianRepository } from '@/lib/repositories/technician-repository';
import type { Booking, BookingStatus, Technician } from '@/lib/types';

type BookingContextValue = {
  bookings: Booking[];
  technicians: Technician[];
  status: 'loading' | 'ready' | 'error';
  error: string | null;
  assignmentBookingId: string | null;
  assignmentError: string | null;
  retry: () => Promise<void>;
  assignTechnician: (bookingId: string, technicianId: string) => Promise<void>;
  createBooking: (input: Omit<Booking, 'id' | 'endAt' | 'timezone'>) => Promise<Booking>;
  cancelBooking: (bookingId: string, reason: string) => Promise<void>;
  transitionBooking: (bookingId: string, status: BookingStatus) => Promise<void>;
  updateBooking: (bookingId: string, input: Partial<Pick<Booking, 'customer' | 'phone' | 'email' | 'service' | 'address' | 'propertyType' | 'startAt' | 'notes'>>) => Promise<Booking>;
  createTechnician: (input: Omit<Technician, 'id' | 'initials' | 'currentLoad'>) => Promise<Technician>;
  updateTechnician: (id: string, input: Omit<Technician, 'id' | 'initials' | 'currentLoad'>) => Promise<Technician>;
  technicianName: (technicianId?: string) => string;
};
const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [status, setStatus] = useState<BookingContextValue['status']>('loading');
  const [error, setError] = useState<string | null>(null);
  const [assignmentBookingId, setAssignmentBookingId] = useState<string | null>(null);
  const [assignmentError, setAssignmentError] = useState<string | null>(null);

  async function retry() {
    setStatus('loading');
    setError(null);
    try {
      const [nextBookings, nextTechnicians] = await Promise.all([bookingRepository.list(), technicianRepository.list()]);
      setBookings(nextBookings);
      setTechnicians(nextTechnicians);
      setStatus('ready');
    } catch {
      setStatus('error');
      setError('We could not load bookings. Please try again.');
    }
  }

  useEffect(() => { void retry(); }, []);

  async function assignTechnician(bookingId: string, technicianId: string) {
    setAssignmentBookingId(bookingId);
    setAssignmentError(null);
    try {
      const booking = await bookingRepository.assignTechnician(bookingId, technicianId);
      setBookings((current) => current.map((item) => item.id === booking.id ? booking : item));
    } catch (cause) {
      setAssignmentError(cause instanceof Error ? cause.message : 'We could not assign this technician. Please try again.');
      throw cause;
    } finally {
      setAssignmentBookingId(null);
    }
  }
  async function createBooking(input: Omit<Booking, 'id' | 'endAt' | 'timezone'>) {
    const booking = await bookingRepository.create(input);
    setBookings((current) => [booking, ...current]);
    return booking;
  }
  async function cancelBooking(bookingId: string, reason: string) {
    const booking = await bookingRepository.cancel(bookingId, reason);
    setBookings((current) => current.map((item) => item.id === booking.id ? booking : item));
  }
  async function transitionBooking(bookingId: string, status: BookingStatus) {
    const booking = await bookingRepository.transition(bookingId, status);
    setBookings((current) => current.map((item) => item.id === booking.id ? booking : item));
  }
  async function updateBooking(bookingId: string, input: Partial<Pick<Booking, 'customer' | 'phone' | 'email' | 'service' | 'address' | 'propertyType' | 'startAt' | 'notes'>>) {
    const booking = await bookingRepository.update(bookingId, input);
    setBookings((current) => current.map((item) => item.id === booking.id ? booking : item));
    return booking;
  }
  async function createTechnician(input: Omit<Technician, 'id' | 'initials' | 'currentLoad'>) {
    const technician = await technicianRepository.create(input);
    setTechnicians((current) => [...current, technician]);
    return technician;
  }
  async function updateTechnician(id: string, input: Omit<Technician, 'id' | 'initials' | 'currentLoad'>) {
    const technician = await technicianRepository.update(id, input);
    setTechnicians((current) => current.map((item) => item.id === id ? technician : item));
    return technician;
  }

  function technicianName(technicianId?: string) {
    return technicians.find((technician) => technician.id === technicianId)?.name ?? '';
  }
  return <BookingContext.Provider value={{ bookings, technicians, status, error, assignmentBookingId, assignmentError, retry, assignTechnician, createBooking, cancelBooking, transitionBooking, updateBooking, createTechnician, updateTechnician, technicianName }}>{children}</BookingContext.Provider>;
}

export function useBookings() {
  const value = useContext(BookingContext);
  if (!value) throw new Error('useBookings must be used inside BookingProvider.');
  return value;
}
