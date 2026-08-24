import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JobWorkflow } from '@/components/admin/job-workflow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { operationsRepository } from '@/lib/operations-repository';

export default async function JobDetail({ params }: { params: Promise<{ jobId: string }> }) { const job = operationsRepository.getJob((await params).jobId); if (!job) notFound(); return <div className="space-y-5"><header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-muted-foreground">Job · {job.id}</p><h1 className="mt-1 text-3xl font-bold tracking-tight">{job.service}</h1></div><Button asChild variant="outline"><Link href="/jobs">← Back to jobs</Link></Button></header><section className="grid gap-4 xl:grid-cols-[1.2fr_.8fr]"><Card><CardHeader><CardTitle>Field details</CardTitle></CardHeader><CardContent><dl className="grid gap-y-4 text-sm sm:grid-cols-[150px_1fr]"><dt className="text-muted-foreground">Customer</dt><dd className="font-medium">{job.customer}</dd><dt className="text-muted-foreground">Technician</dt><dd className="font-medium">{job.technician}</dd><dt className="text-muted-foreground">Schedule</dt><dd className="font-medium">{job.scheduledFor}</dd><dt className="text-muted-foreground">Current status</dt><dd className="font-medium">{job.status}</dd></dl></CardContent></Card><JobWorkflow job={job}/></section></div>; }
