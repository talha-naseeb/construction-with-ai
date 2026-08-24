import { OperationsPage } from '@/components/admin/operations-page';
import { operationsRepository } from '@/lib/operations-repository';

export default function CustomersPage() {
  const customers = operationsRepository.listCustomers();
  return <OperationsPage eyebrow="Customer records · local demo data" title="Customers" description="Verification level controls what can be revealed and which booking actions need step-up verification." action="Add customer" columns={['Customer', 'Active work', 'Verification', 'Action']} rows={customers.map((customer) => ({ id: customer.id, primary: customer.name, secondary: `${customer.phone} · ${customer.email}`, meta: customer.activeWork, state: customer.verification, href: `/customers/${customer.id}`, stateTone: customer.verification === 'Level 2' ? 'success' : customer.verification === 'Level 0' ? 'amber' : 'muted-pill' }))} emptyCopy="No customer records are available." />;
}
