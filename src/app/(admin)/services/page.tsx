import { OperationsPage } from '@/components/admin/operations-page';
import { operationsRepository } from '@/lib/operations-repository';

export default function ServicesPage() {
  const services = operationsRepository.listServices();
  return <OperationsPage eyebrow="Controlled service catalogue" title="Services" description="Only listed, active services can be offered by the agent. Other requests become leads for human review." action="Add service" columns={['Service', 'Area & questions', 'Availability', 'Action']} rows={services.map((service) => ({ id: service.id, primary: service.name, secondary: service.category, meta: `${service.areas} · ${service.bookingQuestions} booking questions`, state: service.state, href: `/services/${service.id}`, stateTone: service.state === 'Active' ? 'success' : 'amber' }))} emptyCopy="No services have been configured." />;
}
