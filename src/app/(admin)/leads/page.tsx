import { OperationsPage } from '@/components/admin/operations-page';
import { operationsRepository } from '@/lib/operations-repository';

export default function LeadsPage() {
  const leads = operationsRepository.listLeads();
  return <OperationsPage eyebrow="Requests requiring follow-up" title="Leads" description="Unknown services remain requests until an admin qualifies them—never silently add them to the catalogue." action="Create lead" columns={['Customer', 'Service & location', 'Status', 'Action']} rows={leads.map((lead) => ({ id: lead.id, primary: lead.customer, secondary: `${lead.source} · ${lead.followUp}`, meta: `${lead.service} · ${lead.location}`, state: lead.status, href: `/leads/${lead.id}`, stateTone: lead.status === 'Qualified' ? 'success' : lead.status === 'Follow-up due' ? 'amber' : 'muted-pill' }))} emptyCopy="No leads need follow-up." />;
}
