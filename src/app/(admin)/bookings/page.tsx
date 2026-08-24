'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useBookings } from '@/components/admin/booking-store';
import { bookingStatus, formatBookingSchedule } from '@/lib/booking-utils';

export default function BookingsPage() {
  const { bookings, technicianName, status, error, retry } = useBookings();
  const [query, setQuery] = useState('');
  const visible = bookings.filter((booking) => `${booking.customer} ${booking.service} ${technicianName(booking.technicianId)}`.toLowerCase().includes(query.toLowerCase()));

  if (status === 'loading') return <section className="empty-state panel"><h1>Loading bookings…</h1><p>Preparing the scheduling workspace.</p></section>;
  if (status === 'error') return <section className="empty-state panel"><h1>Bookings could not load</h1><p>{error}</p><button className="button primary" onClick={() => void retry()}>Try again</button></section>;

  return <>
    <header className="page-header"><div><p className="eyebrow">Manual scheduling · {bookings.length} upcoming</p><h1>Bookings</h1></div><Link className="button primary" href="/bookings/new">＋ New booking</Link></header>
    <div className="notice"><strong>Manual assignment only.</strong> The admin reviews every booking, chooses a technician, then shares the customer details directly.</div>
    <div className="toolbar"><label className="visually-hidden" htmlFor="booking-search">Search bookings</label><input id="booking-search" className="search-input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search customer, service, or technician"/><span className="muted">{visible.length} result{visible.length === 1 ? '' : 's'}</span></div>
    <article className="panel table-panel"><table><thead><tr><th>Customer</th><th>Service & address</th><th>Booking time</th><th>Technician</th><th>Status</th><th><span className="visually-hidden">Action</span></th></tr></thead><tbody>{visible.map((booking) => <tr key={booking.id}><td><strong>{booking.customer}</strong><span>{booking.phone}</span></td><td><strong>{booking.service}</strong><span>{booking.address}</span></td><td>{formatBookingSchedule(booking)}</td><td>{technicianName(booking.technicianId) || <span className="muted">Not assigned</span>}</td><td><span className={`pill ${booking.technicianId ? 'success' : 'amber'}`}>{bookingStatus(booking)}</span></td><td><Link href={`/bookings/${booking.id}`} className="text-link">Review →</Link></td></tr>)}</tbody></table>{visible.length === 0 && <div className="empty-state">No bookings match this search. Try another customer, service, or technician name.</div>}</article>
  </>;
}
