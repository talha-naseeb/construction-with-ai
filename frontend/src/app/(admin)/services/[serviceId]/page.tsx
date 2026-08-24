import { notFound } from 'next/navigation';
import { RecordDetail } from '@/components/admin/record-detail';
import { operationsRepository } from '@/lib/operations-repository';
export default async function ServiceDetail({ params }: { params: Promise<{ serviceId: string }> }) { const service = operationsRepository.getService((await params).serviceId); if (!service) notFound(); return <RecordDetail eyebrow={`Service · ${service.id}`} title={service.name} backHref="/services" backLabel="services" rows={[["Category", service.category], ["Service areas", service.areas], ["Booking questions", String(service.bookingQuestions)], ["Availability", service.state]]} note="Only active backend catalogue services can be offered by the agent. Unknown requests must remain leads." />; }
