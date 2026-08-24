'use client';

import Link from 'next/link';

import { useBookings } from '@/components/admin/booking-store';

export default function TechniciansPage() {
  const { technicians, status, error, retry } = useBookings();
  if (status === 'loading') return <section className="empty-state panel"><h1>Loading technicians…</h1><p>Preparing team records.</p></section>;
  if (status === 'error') return <section className="empty-state panel"><h1>Technicians could not load</h1><p>{error}</p><button className="button primary" onClick={() => void retry()}>Try again</button></section>;
  return <><header className="page-header"><div><p className="eyebrow">Team records · admin managed</p><h1>Technicians</h1></div><Link className="button primary" href="/technicians/new">＋ Add technician</Link></header><div className="notice"><strong>No technician accounts.</strong> These records help the admin decide who to assign and what details to share.</div><section className="technician-grid">{technicians.map((tech) => <article className="panel tech-card" key={tech.id}><span className={`pill ${tech.availability === 'Available' ? 'success' : tech.availability === 'Busy' ? 'amber' : 'muted-pill'}`}>{tech.availability}</span><div className="tech-heading"><span className="initials large">{tech.initials}</span><div><h2>{tech.name}</h2><p>{tech.trade}</p></div></div><dl><div><dt>Contact</dt><dd>{tech.phone}</dd></div><div><dt>Schedule</dt><dd>{tech.currentLoad}</dd></div></dl><div className="flex gap-3"><Link className="text-link" href={`/technicians/${tech.id}`}>View profile →</Link><Link className="text-link" href={`/technicians/${tech.id}/edit`}>Edit</Link></div></article>)}</section>{technicians.length === 0 && <div className="empty-state panel">No technicians are available yet.</div>}</>;
}
