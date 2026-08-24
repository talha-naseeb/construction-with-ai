import { notFound } from 'next/navigation';
import { JobWorkflow } from '@/components/admin/job-workflow';
import { operationsRepository } from '@/lib/operations-repository';
export default async function JobDetail({ params }: { params: Promise<{ jobId: string }> }) { const job = operationsRepository.getJob((await params).jobId); if (!job) notFound(); return <><header className="page-header"><div><p className="eyebrow">Job · {job.id}</p><h1>{job.service}</h1></div></header><section className="detail-grid"><article className="panel"><dl className="details"><dt>Customer</dt><dd>{job.customer}</dd><dt>Technician</dt><dd>{job.technician}</dd><dt>Schedule</dt><dd>{job.scheduledFor}</dd><dt>Current status</dt><dd>{job.status}</dd></dl></article><JobWorkflow job={job}/></section></>; }
