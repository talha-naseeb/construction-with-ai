'use client';

import { useState } from 'react';
import type { JobRecord, JobStatus } from '@/lib/operations-repository';

const nextStatus: Record<JobStatus, JobStatus | null> = { 'Site visit': 'Quote pending', 'Quote pending': 'Scheduled', Scheduled: 'In progress', 'In progress': 'Completed', Completed: null };
export function JobWorkflow({ job }: { job: JobRecord }) { const [status, setStatus] = useState(job.status); const [message, setMessage] = useState(''); const next = nextStatus[status]; return <aside className="panel"><p className="eyebrow">Job status</p><h2>{status}</h2><p className="muted">Only the next valid transition is available in this demo.</p>{next ? <button className="button primary wide" onClick={() => { setStatus(next); setMessage(`Moved to ${next} in this local demo.`); }}>Move to {next}</button> : <p className="notice inline-notice">This job is complete. Reopening requires an authorised backend action.</p>}{message && <p className="notice inline-notice">{message}</p>}</aside>; }
