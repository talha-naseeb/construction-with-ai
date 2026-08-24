'use client';

import { useState } from 'react';
import type { LeadRecord } from '@/lib/operations-repository';

export function LeadWorkflow({ lead }: { lead: LeadRecord }) {
  const [status, setStatus] = useState(lead.status); const [lostReason, setLostReason] = useState(''); const [message, setMessage] = useState('');
  function qualify() { setStatus('Qualified'); setMessage('Lead qualified in this local demo. Create a pending booking after confirming service and requested time.'); }
  function markLost() { if (!lostReason.trim()) { setMessage('Add a reason before marking this lead lost.'); return; } setStatus('Lost'); setMessage('Lead marked lost in this local demo.'); }
  return <aside className="panel"><p className="eyebrow">Lead disposition</p><h2>{status}</h2><p className="muted">These controls demonstrate the frontend mutation states. A backend repository will persist the decision and audit event.</p><button className="button primary wide" onClick={qualify} disabled={status === 'Qualified'}>Qualify lead</button><label className="field-label">Lost reason<input value={lostReason} onChange={(event) => setLostReason(event.target.value)} placeholder="e.g. outside service area" /></label><button className="button wide" onClick={markLost} disabled={status === 'Lost'}>Mark lost</button>{message && <p className="notice inline-notice">{message}</p>}</aside>;
}
