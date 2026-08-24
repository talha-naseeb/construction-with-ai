import Link from 'next/link';
import { formatBookingSchedule } from '@/lib/booking-utils';
import { bookingRepository } from '@/lib/repositories/booking-repository';
import { technicianRepository } from '@/lib/repositories/technician-repository';
import { operationsRepository } from '@/lib/operations-repository';
import { CallVolumeChart } from '@/components/admin/call-volume-chart';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const callBars = [36, 56, 43, 71, 62, 80, 66];

export default async function DashboardPage() {
  const [bookings, technicians] = await Promise.all([bookingRepository.list(), technicianRepository.list()]);
  const calls = operationsRepository.listCalls();
  const leads = operationsRepository.listLeads();
  const jobs = operationsRepository.listJobs();
  const needsAssignment = bookings.filter((booking) => !booking.technicianId && booking.status !== 'Cancelled').length;
  const kpis = [
    { label: 'Calls handled', value: calls.length, caption: 'Today · demo data', accent: 'bg-blue-500' },
    { label: 'Qualified leads', value: leads.filter((lead) => lead.status === 'Qualified').length, caption: 'Ready for booking', accent: 'bg-amber-400' },
    { label: 'Bookings assigned', value: bookings.filter((booking) => booking.status === 'Assigned').length, caption: `${needsAssignment} need review`, accent: 'bg-emerald-500' },
    { label: 'Jobs in progress', value: jobs.filter((job) => job.status === 'In progress').length, caption: 'Field work today', accent: 'bg-violet-500' }
  ];
  const activities = [...calls.map((call) => ({ id: call.id, title: call.outcome, detail: `${call.customer} · ${call.service}`, time: call.startedAt, tone: call.outcome === 'Failed' ? 'bg-red-400' : call.outcome === 'Lead created' ? 'bg-amber-400' : 'bg-emerald-500' })), ...jobs.map((job) => ({ id: job.id, title: job.status, detail: `${job.service} · ${job.technician}`, time: job.scheduledFor, tone: 'bg-blue-500' }))].slice(0, 5);

  return <div className="space-y-5 lg:space-y-6">
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-ops-muted">Operations command · local demo</p><h1 className="mt-1 text-3xl font-bold tracking-[-0.04em] text-ops-ink sm:text-4xl">Good morning, Aisha</h1><p className="mt-2 text-sm text-ops-muted">A clear view of today’s call outcomes, dispatch work, and field capacity.</p></div>
      <Button asChild className="h-11 bg-ops-signal px-4 font-bold text-[#352700] hover:bg-ops-signal/90"><Link href="/bookings">Review assignment queue <span className="ml-2">→</span></Link></Button>
    </header>

    <section className="grid grid-cols-2 gap-3 xl:grid-cols-4" aria-label="Key performance indicators">{kpis.map((kpi) => <Card key={kpi.label} className="gap-0 border-ops-ink/10 py-0 shadow-panel"><CardContent className="p-4"><div className="flex items-center justify-between"><p className="text-xs font-semibold text-ops-muted">{kpi.label}</p><span className={`h-2.5 w-2.5 rounded-full ${kpi.accent}`}/></div><strong className="mt-3 block text-3xl font-bold tracking-[-0.06em] text-ops-ink">{kpi.value}</strong><p className="mt-2 text-[11px] font-medium text-ops-muted">{kpi.caption}</p></CardContent></Card>)}</section>

    <section className="grid gap-4 xl:grid-cols-[1.55fr_1fr]">
      <article className="rounded-panel border border-ops-ink/10 bg-white p-5 shadow-panel"><div className="flex items-start justify-between gap-3"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-ops-muted">Call activity</p><h2 className="mt-1 text-lg font-bold tracking-tight text-ops-ink">Inbound call volume</h2></div><span className="rounded-full bg-ops-paper px-2.5 py-1 text-[10px] font-bold text-ops-muted">Last 7 days · demo</span></div><div className="mt-4"><CallVolumeChart values={callBars}/></div><div className="mt-1 flex items-center gap-5 text-xs text-ops-muted"><span><b className="text-ops-ink">{calls.length}</b> calls in current fixture</span><span><b className="text-ops-ink">{calls.filter((call) => call.outcome === 'Booking created').length}</b> bookings created</span></div></article>
      <article className="rounded-panel border border-ops-ink/10 bg-ops-navy p-5 text-white shadow-panel"><p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-emerald-100/70">Dispatch readiness</p><h2 className="mt-1 text-lg font-bold tracking-tight">Today’s working line</h2><div className="mt-6 space-y-4">{bookings.slice(0, 4).map((booking, index) => <div className="flex gap-3" key={booking.id}><span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${index === 0 ? 'bg-ops-signal ring-4 ring-ops-signal/15' : 'bg-emerald-300'}`}/><div><p className="text-xs font-bold">{booking.service}</p><p className="mt-1 text-[11px] text-emerald-50/75">{formatBookingSchedule(booking)} · {booking.customer}</p></div></div>)}</div><Link className="mt-6 inline-flex text-xs font-bold text-ops-signal hover:text-white" href="/bookings">View all bookings →</Link></article>
    </section>

    <section className="grid gap-4 xl:grid-cols-[1.08fr_.92fr]">
      <article className="rounded-panel border border-ops-ink/10 bg-white p-5 shadow-panel"><div className="flex items-start justify-between"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-ops-muted">Decision queue</p><h2 className="mt-1 text-lg font-bold tracking-tight text-ops-ink">Bookings needing attention</h2></div><Link className="text-xs font-bold text-ops-success" href="/bookings">Open queue →</Link></div><div className="mt-4 divide-y divide-ops-ink/8">{bookings.filter((booking) => !booking.technicianId && booking.status !== 'Cancelled').map((booking) => <Link href={`/bookings/${booking.id}`} key={booking.id} className="flex items-center gap-3 py-3 transition hover:bg-ops-paper/70"><span className="grid h-9 w-9 place-items-center rounded-full bg-ops-signal/20 text-xs font-extrabold text-[#715009]">{booking.customer.split(' ').map((part) => part[0]).join('')}</span><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-ops-ink">{booking.service}</p><p className="mt-1 truncate text-[11px] text-ops-muted">{booking.customer} · {formatBookingSchedule(booking)}</p></div><span className="rounded-full bg-ops-signal/15 px-2 py-1 text-[10px] font-bold text-[#8a650a]">Assign</span></Link>)}{needsAssignment === 0 && <p className="py-6 text-sm text-ops-muted">No bookings need assignment.</p>}</div></article>
      <article className="rounded-panel border border-ops-ink/10 bg-white p-5 shadow-panel"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-ops-muted">Activity log</p><h2 className="mt-1 text-lg font-bold tracking-tight text-ops-ink">Latest operations events</h2></div><ol className="mt-4 space-y-4">{activities.map((activity) => <li className="flex gap-3" key={activity.id}><span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${activity.tone}`}/><div className="min-w-0 flex-1"><p className="text-xs font-bold text-ops-ink">{activity.title}</p><p className="mt-1 truncate text-[11px] text-ops-muted">{activity.detail}</p></div><time className="shrink-0 text-[10px] font-medium text-ops-muted">{activity.time.replace('Today · ', '')}</time></li>)}</ol><Link href="/calls" className="mt-5 inline-flex text-xs font-bold text-ops-success">Open call log →</Link></article>
    </section>

    <section className="rounded-panel border border-ops-ink/10 bg-white p-5 shadow-panel"><div className="flex items-center justify-between"><div><p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-ops-muted">Crew capacity</p><h2 className="mt-1 text-lg font-bold tracking-tight text-ops-ink">Technician availability</h2></div><Link href="/technicians" className="text-xs font-bold text-ops-success">View roster →</Link></div><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{technicians.map((tech) => <div className="rounded-lg border border-ops-ink/10 bg-ops-paper/60 p-3" key={tech.id}><div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[10px] font-extrabold text-ops-slate">{tech.initials}</span><div><p className="text-xs font-bold text-ops-ink">{tech.name}</p><p className="text-[10px] text-ops-muted">{tech.trade}</p></div></div><div className="mt-4 flex items-center justify-between"><span className="text-[10px] text-ops-muted">{tech.currentLoad}</span><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${tech.availability === 'Available' ? 'bg-emerald-100 text-ops-success' : 'bg-amber-100 text-amber-800'}`}>{tech.availability}</span></div></div>)}</div></section>
  </div>;
}
