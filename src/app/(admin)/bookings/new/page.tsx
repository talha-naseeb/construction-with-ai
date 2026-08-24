'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { bookingSchema } from '@/lib/schemas';
import { useBookings } from '@/components/admin/booking-store';

export default function NewBookingPage() {
  const router = useRouter(); const { createBooking } = useBookings(); const [error, setError] = useState(''); const [saving, setSaving] = useState(false);
  async function submit(form: FormData) { const values = Object.fromEntries(form) as Record<string, string>; const result = bookingSchema.safeParse(values); if (!result.success) { setError(result.error.issues[0].message); return; } setSaving(true); try { const booking = await createBooking({ ...result.data, startAt: new Date(result.data.startAt).toISOString(), verified: false, status: 'Pending review' }); router.push(`/bookings/${booking.id}`); } catch { setError('Booking could not be created. Your entries are still here; try again.'); setSaving(false); } }
  return <><header className="page-header"><div><p className="eyebrow">Manual booking intake</p><h1>Create booking</h1><p className="page-subtitle">This creates a local demo booking only. Backend confirmation is required in production.</p></div><Link href="/bookings" className="button">← Back</Link></header><form className="panel form-grid" action={submit}><label>Customer name<input name="customer" required /></label><label>Phone number<input name="phone" required /></label><label>Service<input name="service" required /></label><label>Requested time<input name="startAt" type="datetime-local" required /></label><label className="full-field">Property address<input name="address" required /></label><label className="full-field">Work description<textarea name="notes" required rows={4}/></label>{error && <p className="field-error full-field">{error}</p>}<button className="button primary" disabled={saving}>{saving ? 'Creating…' : 'Create pending booking'}</button></form></>;
}
