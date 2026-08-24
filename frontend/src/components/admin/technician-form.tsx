'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { Technician } from '@/lib/types';
import { technicianSchema } from '@/lib/schemas';
import { useBookings } from '@/components/admin/booking-store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export function TechnicianForm({ technician }: { technician?: Technician }) {
  const router = useRouter();
  const { createTechnician, updateTechnician } = useBookings();
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  async function submit(form: FormData) {
    const values = Object.fromEntries(form) as Record<string, string>;
    const result = technicianSchema.safeParse(values);
    if (!result.success) { setError(result.error.issues[0].message); return; }
    setSaving(true);
    const input = { ...result.data, skills: result.data.skills.split(',').map((skill) => skill.trim()).filter(Boolean) };
    try {
      const saved = technician ? await updateTechnician(technician.id, input) : await createTechnician(input);
      router.push(`/technicians/${saved.id}`);
    } catch (cause) { setError(cause instanceof Error ? cause.message : 'We could not save this technician.'); setSaving(false); }
  }
  return <div className="space-y-5"><header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-muted-foreground">Team management · local demo</p><h1 className="mt-1 text-3xl font-bold tracking-tight">{technician ? 'Edit technician' : 'Add technician'}</h1><p className="mt-2 text-sm text-muted-foreground">Skills and service area help the admin make a safer assignment decision.</p></div><Button asChild variant="outline"><Link href="/technicians">← Back to technicians</Link></Button></header><Card className="max-w-3xl"><CardHeader><CardTitle>Technician profile</CardTitle></CardHeader><CardContent><form action={submit} className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-sm font-medium">Full name<Input name="name" defaultValue={technician?.name} required/></label><label className="grid gap-2 text-sm font-medium">Primary trade<Input name="trade" defaultValue={technician?.trade} required/></label><label className="grid gap-2 text-sm font-medium">Phone number<Input name="phone" defaultValue={technician?.phone} required/></label><label className="grid gap-2 text-sm font-medium">Availability<select name="availability" defaultValue={technician?.availability ?? 'Available'} className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"><option>Available</option><option>Assigned</option><option>Busy</option></select></label><label className="grid gap-2 text-sm font-medium sm:col-span-2">Skills <span className="font-normal text-muted-foreground">(comma separated)</span><Input name="skills" defaultValue={technician?.skills?.join(', ')} placeholder="Electrical, HVAC" required/></label><label className="grid gap-2 text-sm font-medium sm:col-span-2">Service area<Input name="serviceArea" defaultValue={technician?.serviceArea} placeholder="Austin metro" required/></label>{error && <p className="sm:col-span-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}<div className="sm:col-span-2"><Button disabled={saving}>{saving ? 'Saving…' : technician ? 'Save technician' : 'Add technician'}</Button></div></form></CardContent></Card></div>;
}
