'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { AlertTriangle, CalendarCheck, ClipboardCopy, Pencil, ShieldCheck, XCircle } from 'lucide-react';
import { assignmentWarnings, bookingTransitions } from '@/lib/repositories/booking-repository';
import { bookingSchema } from '@/lib/schemas';
import { formatBookingSchedule, jobSummary } from '@/lib/booking-utils';
import { useBookings } from './booking-store';
import { useToast } from '@/components/ui/toast-provider';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

function badgeVariant(status: string) {
  return status === 'Cancelled' ? 'destructive' as const : status === 'Confirmed' || status === 'Assigned' || status === 'Completed' ? 'default' as const : 'secondary' as const;
}

export function BookingDetail({ bookingId }: { bookingId: string }) {
  const { bookings, technicians, status, error: loadError, retry, assignTechnician, cancelBooking, transitionBooking, updateBooking, technicianName, assignmentBookingId, assignmentError } = useBookings();
  const { showToast } = useToast();
  const booking = bookings.find((item) => item.id === bookingId);
  const [technicianId, setTechnicianId] = useState('');
  const [editing, setEditing] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const isSaving = assignmentBookingId === bookingId;
  const selectedTechnician = technicians.find((technician) => technician.id === technicianId);
  const warnings = useMemo(() => booking && selectedTechnician ? assignmentWarnings(booking, selectedTechnician, bookings) : [], [booking, selectedTechnician, bookings]);

  if (status === 'loading') return <Card><CardContent className="py-14 text-center"><h1 className="text-xl font-bold">Loading booking…</h1><p className="mt-2 text-sm text-muted-foreground">Preparing the scheduling workspace.</p></CardContent></Card>;
  if (status === 'error') return <Card><CardContent className="py-14 text-center"><h1 className="text-xl font-bold">Booking could not load</h1><p className="mt-2 text-sm text-muted-foreground">{loadError}</p><Button className="mt-5" onClick={() => void retry()}>Try again</Button></CardContent></Card>;
  if (!booking) return <Card><CardContent className="py-14 text-center"><h1 className="text-xl font-bold">Booking not found</h1><p className="mt-2 text-sm text-muted-foreground">This booking may have been removed from the local demo.</p><Button asChild className="mt-5"><Link href="/bookings">Back to bookings</Link></Button></CardContent></Card>;
  const currentBooking = booking;

  async function moveTo(nextStatus: typeof currentBooking.status) {
    try { await transitionBooking(currentBooking.id, nextStatus); setMessage(`Booking moved to ${nextStatus}.`); showToast(`Booking moved to ${nextStatus}.`); }
    catch (cause) { showToast(cause instanceof Error ? cause.message : 'We could not update this booking.', 'error'); }
  }
  async function saveAssignment() {
    if (!technicianId) { showToast('Choose a technician before assigning.', 'error'); return; }
    try { await assignTechnician(currentBooking.id, technicianId); setMessage(`${technicianName(technicianId)} is assigned.`); showToast(`${technicianName(technicianId)} assigned to ${currentBooking.customer}.`); }
    catch (cause) { showToast(cause instanceof Error ? cause.message : assignmentError ?? 'We could not assign this technician.', 'error'); }
  }
  async function saveChanges(form: FormData) {
    const result = bookingSchema.safeParse(Object.fromEntries(form));
    if (!result.success) { showToast(result.error.issues[0].message, 'error'); return; }
    try {
      await updateBooking(currentBooking.id, { ...result.data, email: result.data.email || undefined, startAt: new Date(result.data.startAt).toISOString() });
      setEditing(false); setMessage('Booking details updated.'); showToast('Booking details updated.');
    } catch (cause) { showToast(cause instanceof Error ? cause.message : 'We could not update this booking.', 'error'); }
  }
  async function confirmCancellation() {
    if (!reason.trim()) { showToast('Add a cancellation reason before continuing.', 'error'); return; }
    try { await cancelBooking(currentBooking.id, reason); setCancelling(false); setMessage('Booking cancelled.'); showToast('Booking cancelled.'); }
    catch { showToast('We could not cancel this booking.', 'error'); }
  }
  async function copyDetails() {
    try { await navigator.clipboard.writeText(jobSummary(currentBooking)); showToast('Job details copied.'); }
    catch { showToast('We could not copy the job details.', 'error'); }
  }

  const nextStatuses = bookingTransitions[booking.status];
  return <div className="space-y-5">
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-muted-foreground">Booking {booking.id.replace('bkg-', '#')}</p><h1 className="mt-1 text-3xl font-bold tracking-tight">{booking.service}</h1><p className="mt-2 text-sm text-muted-foreground">{formatBookingSchedule(booking)} · {booking.customer}</p></div><Button asChild variant="outline"><Link href="/bookings">← Back to bookings</Link></Button></header>
    {message && <p className="rounded-md border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-950">{message}</p>}
    <div className="grid gap-4 xl:grid-cols-[1.3fr_.7fr]">
      <Card><CardHeader className="flex-row items-start justify-between gap-3"><div><p className="text-[10px] font-extrabold uppercase tracking-[.13em] text-muted-foreground">Customer request</p><CardTitle className="mt-1">Booking details</CardTitle></div><Badge variant={badgeVariant(booking.status)}>{booking.status}</Badge></CardHeader><CardContent className="space-y-5">
        {editing ? <form action={saveChanges} className="grid gap-4 sm:grid-cols-2"><label className="grid gap-2 text-sm font-medium">Customer<Input name="customer" defaultValue={booking.customer}/></label><label className="grid gap-2 text-sm font-medium">Phone<Input name="phone" defaultValue={booking.phone}/></label><label className="grid gap-2 text-sm font-medium">Email<Input name="email" type="email" defaultValue={booking.email}/></label><label className="grid gap-2 text-sm font-medium">Property type<Input name="propertyType" defaultValue={booking.propertyType ?? ''}/></label><label className="grid gap-2 text-sm font-medium">Service<Input name="service" defaultValue={booking.service}/></label><label className="grid gap-2 text-sm font-medium">Requested time<Input name="startAt" type="datetime-local" defaultValue={booking.startAt.slice(0, 16)}/></label><label className="grid gap-2 text-sm font-medium sm:col-span-2">Address<Input name="address" defaultValue={booking.address}/></label><label className="grid gap-2 text-sm font-medium sm:col-span-2">Work description<Textarea name="notes" defaultValue={booking.notes} rows={4}/></label><div className="flex gap-2 sm:col-span-2"><Button>Save changes</Button><Button type="button" variant="outline" onClick={() => setEditing(false)}>Discard</Button></div></form> : <><dl className="grid gap-4 text-sm sm:grid-cols-2"><div><dt className="text-xs font-semibold text-muted-foreground">Customer</dt><dd className="mt-1 font-medium">{booking.customer}</dd></div><div><dt className="text-xs font-semibold text-muted-foreground">Phone</dt><dd className="mt-1 font-medium">{booking.phone}</dd></div><div><dt className="text-xs font-semibold text-muted-foreground">Email</dt><dd className="mt-1 font-medium">{booking.email || 'Not provided'}</dd></div><div><dt className="text-xs font-semibold text-muted-foreground">Property type</dt><dd className="mt-1 font-medium">{booking.propertyType || 'Not recorded'}</dd></div><div className="sm:col-span-2"><dt className="text-xs font-semibold text-muted-foreground">Address</dt><dd className="mt-1 font-medium">{booking.address}</dd></div><div className="sm:col-span-2"><dt className="text-xs font-semibold text-muted-foreground">Work description</dt><dd className="mt-1 leading-6 text-muted-foreground">{booking.notes}</dd></div></dl><Button variant="outline" onClick={() => setEditing(true)} disabled={booking.status === 'Cancelled' || booking.status === 'Completed'}><Pencil/>Edit booking</Button></>}
      </CardContent></Card>
      <div className="space-y-4"><Card><CardHeader><p className="text-[10px] font-extrabold uppercase tracking-[.13em] text-muted-foreground">Lifecycle</p><CardTitle>Move booking forward</CardTitle></CardHeader><CardContent className="space-y-2">{nextStatuses.filter((status) => status !== 'Cancelled').map((next) => <Button key={next} className="w-full" onClick={() => void moveTo(next)}><CalendarCheck/>{next === 'Confirmed' ? 'Confirm booking' : `Mark ${next}`}</Button>)}{nextStatuses.length === 0 && <p className="text-sm text-muted-foreground">This booking is closed. Any reversal requires a backend-authorised action.</p>}{booking.status === 'Needs verification' && <p className="rounded-md bg-amber-50 p-3 text-xs leading-5 text-amber-950"><ShieldCheck className="mr-1 inline size-4"/> Customer verification must be confirmed by the backend before this status changes.</p>}</CardContent></Card>
        <Card><CardHeader><p className="text-[10px] font-extrabold uppercase tracking-[.13em] text-muted-foreground">Dispatch</p><CardTitle>Assign technician</CardTitle></CardHeader><CardContent className="space-y-3"><label className="grid gap-2 text-sm font-medium">Technician<select className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm" value={technicianId} onChange={(event) => setTechnicianId(event.target.value)} disabled={booking.status !== 'Confirmed' && booking.status !== 'Assigned'}><option value="">Choose a technician</option>{technicians.map((tech) => <option key={tech.id} value={tech.id}>{tech.name} · {tech.trade} · {tech.availability}</option>)}</select></label>{warnings.length > 0 && <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-xs leading-5 text-amber-950"><AlertTriangle className="mr-1 inline size-4"/>{warnings.map((warning) => <p key={warning}>{warning}</p>)}</div>}<Button className="w-full" onClick={() => void saveAssignment()} disabled={!technicianId || isSaving || (booking.status !== 'Confirmed' && booking.status !== 'Assigned')}>{isSaving ? 'Assigning…' : 'Assign technician'}</Button>{booking.status !== 'Confirmed' && booking.status !== 'Assigned' && <p className="text-xs text-muted-foreground">Confirm the booking before assigning a technician.</p>}</CardContent></Card>
        <Card><CardContent className="space-y-3 pt-6"><Button className="w-full" variant="outline" onClick={() => void copyDetails()}><ClipboardCopy/>Copy job details</Button>{cancelling ? <><Textarea value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Reason for cancellation"/><div className="flex gap-2"><Button variant="destructive" onClick={() => void confirmCancellation()}>Confirm cancellation</Button><Button variant="outline" onClick={() => setCancelling(false)}>Keep booking</Button></div></> : <Button className="w-full" variant="ghost" onClick={() => setCancelling(true)} disabled={!nextStatuses.includes('Cancelled')}><XCircle/>Cancel booking</Button>}</CardContent></Card>
      </div>
    </div>
  </div>;
}
