import { notFound } from 'next/navigation';
import { RecordDetail } from '@/components/admin/record-detail';
import { technicianRepository } from '@/lib/repositories/technician-repository';

export default async function TechnicianDetail({ params }: { params: Promise<{ technicianId: string }> }) {
  const technician = await technicianRepository.get((await params).technicianId);
  if (!technician) notFound();
  return <RecordDetail eyebrow={`Technician · ${technician.id}`} title={technician.name} backHref="/technicians" backLabel="technicians" rows={[["Trade", technician.trade], ["Skills", technician.skills?.join(', ') ?? 'Not recorded'], ["Service area", technician.serviceArea ?? 'Not recorded'], ["Availability", technician.availability], ["Active load", technician.currentLoad], ["Contact", technician.phone]]} note="Technician profile updates, service-area eligibility, and conflict rules will be persisted and enforced by the backend scheduling service." />;
}
