import { technicians } from '@/lib/mock-data';

export default function TechniciansPage() {
  return <><header className="page-header"><div><p className="eyebrow">Team records · admin managed</p><h1>Technicians</h1></div><button className="button primary">＋ Add technician</button></header><div className="notice"><strong>No technician accounts.</strong> These records help the admin decide who to assign and what details to share.</div><section className="technician-grid">{technicians.map((tech) => <article className="panel tech-card" key={tech.id}><span className={`pill ${tech.availability === 'Available' ? 'success' : tech.availability === 'Busy' ? 'amber' : 'muted-pill'}`}>{tech.availability}</span><div className="tech-heading"><span className="initials large">{tech.initials}</span><div><h2>{tech.name}</h2><p>{tech.trade}</p></div></div><dl><div><dt>Contact</dt><dd>{tech.phone}</dd></div><div><dt>Schedule</dt><dd>{tech.currentLoad}</dd></div></dl></article>)}</section></>;
}
