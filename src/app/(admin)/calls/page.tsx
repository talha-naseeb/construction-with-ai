import { OperationsPage } from '@/components/admin/operations-page';
import { operationsRepository } from '@/lib/operations-repository';

export default function CallsPage() {
  const calls = operationsRepository.listCalls();
  return <OperationsPage eyebrow="AI call ledger · local demo data" title="Calls" description="Review outcomes, verify what the agent captured, and decide the next human action." action="Export calls" columns={['Caller', 'Service & time', 'Outcome', 'Action']} rows={calls.map((call) => ({ id: call.id, primary: call.customer, secondary: `${call.phone} · ${call.duration}`, meta: `${call.service} · ${call.startedAt}`, state: call.outcome, href: `/calls/${call.id}`, stateTone: call.outcome === 'Booking created' ? 'success' : call.outcome === 'Lead created' ? 'amber' : 'muted-pill' }))} emptyCopy="No calls match this view." />;
}
