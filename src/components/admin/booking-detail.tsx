'use client';

import Link from 'next/link';
import { useState } from 'react';
import { technicians } from '@/lib/mock-data';
import { assignmentSchema } from '@/lib/schemas';
import { jobSummary } from '@/lib/booking-utils';
import { useBookings } from './booking-store';
import { useToast } from '@/components/ui/toast-provider';

export function BookingDetail({ bookingId }: { bookingId: string }) {
  const { bookings, assignTechnician, technicianName } = useBookings();
  const { showToast } = useToast();
  const booking = bookings.find((item) => item.id === bookingId);
  const [technicianId, setTechnicianId] = useState(booking?.technicianId ?? '');
  const [error, setError] = useState('');

  if (!booking) return <section className="empty-state panel"><h1>Booking not found</h1><p>This booking may have been removed. Return to the booking list.</p><Link href="/bookings" className="button primary">Back to bookings</Link></section>;

  function saveAssignment() {
    const result = assignmentSchema.safeParse({ technicianId });
    if (!result.success) { const message = result.error.issues[0].message; setError(message); showToast(message, 'error'); return; }
    assignTechnician(booking.id, result.data.technicianId);
    setError('');
    showToast(`${technicianName(result.data.technicianId)} assigned to ${booking.customer}.`);
  }
  async function copyDetails() {
    try { await navigator.clipboard.writeText(jobSummary(booking)); showToast('Job details copied. You can now share them with the technician.'); }
    catch { showToast('We could not copy the details. Please copy them manually.', 'error'); }
  }

  return <><header className="page-header"><div><p className="eyebrow">Booking {booking.id.replace('bkg-', '#')}</p><h1>Booking details</h1></div><Link href="/bookings" className="button">← Back to bookings</Link></header><section className="detail-grid"><article className="panel detail-panel"><div className="panel-header"><h2>{booking.service}</h2><span className={`pill ${booking.verified ? 'success' : 'amber'}`}>{booking.verified ? 'Verified customer' : 'Verification needed'}</span></div><dl className="details"><dt>Customer</dt><dd>{booking.customer}</dd><dt>Phone</dt><dd>{booking.phone}</dd><dt>Appointment</dt><dd>{booking.date}</dd><dt>Address</dt><dd>{booking.address}</dd><dt>Call summary</dt><dd>{booking.notes}</dd><dt>Assigned technician</dt><dd>{technicianName(booking.technicianId) || 'Not assigned'}</dd></dl></article><aside className="panel"><div className="assignment-box"><label htmlFor="technician">Assign technician manually</label><select id="technician" value={technicianId} onChange={(event) => { setTechnicianId(event.target.value); setError(''); }} aria-invalid={Boolean(error)} aria-describedby={error ? 'assignment-error' : undefined}><option value="">Choose a technician</option>{technicians.map((tech) => <option value={tech.id} key={tech.id}>{tech.name} · {tech.trade} · {tech.availability}</option>)}</select><p id="assignment-error" className="field-error">{error}</p><button onClick={saveAssignment} className="button primary wide">Assign technician</button></div><div className="job-summary"><p className="eyebrow">Share-ready job summary</p><strong>{booking.service}</strong><p>{booking.customer} · {booking.phone}<br/>{booking.address}<br/>{booking.date}</p><p>{booking.notes}</p><button className="button wide" onClick={copyDetails}>Copy details to share</button></div></aside></section></>;
}
