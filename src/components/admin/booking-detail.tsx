'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { assignmentSchema } from '@/lib/schemas';
import { formatBookingSchedule, jobSummary } from '@/lib/booking-utils';
import { useBookings } from './booking-store';
import { useToast } from '@/components/ui/toast-provider';

export function BookingDetail({ bookingId }: { bookingId: string }) {
  const { bookings, technicians, status, error: loadError, retry, assignTechnician, technicianName, assignmentBookingId, assignmentError } = useBookings();
  const { showToast } = useToast();
  const booking = bookings.find((item) => item.id === bookingId);
  const [technicianId, setTechnicianId] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (booking?.technicianId) setTechnicianId(booking.technicianId);
  }, [booking?.technicianId]);

  if (status === 'loading') return <section className="empty-state panel"><h1>Loading booking…</h1><p>Preparing the booking details.</p></section>;
  if (status === 'error') return <section className="empty-state panel"><h1>Booking could not load</h1><p>{loadError}</p><button className="button primary" onClick={() => void retry()}>Try again</button></section>;
  if (!booking) return <section className="empty-state panel"><h1>Booking not found</h1><p>This booking may have been removed. Return to the booking list.</p><Link href="/bookings" className="button primary">Back to bookings</Link></section>;

  const currentBooking = booking;
  const isSaving = assignmentBookingId === currentBooking.id;

  async function saveAssignment() {
    const result = assignmentSchema.safeParse({ technicianId });
    if (!result.success) { const message = result.error.issues[0].message; setError(message); showToast(message, 'error'); return; }
    try {
      await assignTechnician(currentBooking.id, result.data.technicianId);
      setError('');
      showToast(`${technicianName(result.data.technicianId)} assigned to ${currentBooking.customer}.`);
    } catch {
      const message = assignmentError ?? 'We could not assign this technician. Please try again.';
      setError(message);
      showToast(message, 'error');
    }
  }

  async function copyDetails() {
    try { await navigator.clipboard.writeText(jobSummary(currentBooking)); showToast('Job details copied. You can now share them with the technician.'); }
    catch { showToast('We could not copy the details. Please copy them manually.', 'error'); }
  }

  return <>
    <header className="page-header"><div><p className="eyebrow">Booking {currentBooking.id.replace('bkg-', '#')}</p><h1>Booking details</h1></div><Link href="/bookings" className="button">← Back to bookings</Link></header>
    <section className="detail-grid"><article className="panel detail-panel"><div className="panel-header"><h2>{currentBooking.service}</h2><span className={`pill ${currentBooking.verified ? 'success' : 'amber'}`}>{currentBooking.verified ? 'Verified customer' : 'Verification needed'}</span></div><dl className="details"><dt>Customer</dt><dd>{currentBooking.customer}</dd><dt>Phone</dt><dd>{currentBooking.phone}</dd><dt>Appointment</dt><dd>{formatBookingSchedule(currentBooking)}</dd><dt>Address</dt><dd>{currentBooking.address}</dd><dt>Call summary</dt><dd>{currentBooking.notes}</dd><dt>Assigned technician</dt><dd>{technicianName(currentBooking.technicianId) || 'Not assigned'}</dd></dl></article><aside className="panel"><div className="assignment-box"><label htmlFor="technician">Assign technician manually</label><select id="technician" value={technicianId} onChange={(event) => { setTechnicianId(event.target.value); setError(''); }} aria-invalid={Boolean(error)} aria-describedby={error ? 'assignment-error' : undefined} disabled={isSaving}><option value="">Choose a technician</option>{technicians.map((tech) => <option value={tech.id} key={tech.id}>{tech.name} · {tech.trade} · {tech.availability}</option>)}</select><p id="assignment-error" className="field-error">{error}</p><button onClick={() => void saveAssignment()} className="button primary wide" disabled={isSaving}>{isSaving ? 'Assigning…' : 'Assign technician'}</button></div><div className="job-summary"><p className="eyebrow">Share-ready job summary</p><strong>{currentBooking.service}</strong><p>{currentBooking.customer} · {currentBooking.phone}<br/>{currentBooking.address}<br/>{formatBookingSchedule(currentBooking)}</p><p>{currentBooking.notes}</p><button className="button wide" onClick={() => void copyDetails()}>Copy details to share</button></div></aside></section>
  </>;
}
