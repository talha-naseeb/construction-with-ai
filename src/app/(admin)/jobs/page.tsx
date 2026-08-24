import { OperationsPage } from '@/components/admin/operations-page';
import { operationsRepository } from '@/lib/operations-repository';

export default function JobsPage() {
  const jobs = operationsRepository.listJobs();
  return <OperationsPage eyebrow="Work in the field" title="Jobs" description="Track job progress after a confirmed booking moves into site work, quotes, and delivery." action="Create job" columns={['Customer', 'Technician & schedule', 'Status', 'Action']} rows={jobs.map((job) => ({ id: job.id, primary: job.customer, secondary: job.service, meta: `${job.technician} · ${job.scheduledFor}`, state: job.status, href: `/jobs/${job.id}`, stateTone: job.status === 'Completed' ? 'success' : job.status === 'In progress' ? 'amber' : 'muted-pill' }))} emptyCopy="No jobs are scheduled yet." />;
}
