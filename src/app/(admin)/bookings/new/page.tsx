import { NewBookingForm } from '@/components/admin/new-booking-form';
import { operationsRepository } from '@/lib/operations-repository';

export default async function NewBookingPage({ searchParams }: { searchParams: Promise<{ lead?: string }> }) {
  const { lead } = await searchParams;
  return <NewBookingForm sourceLead={operationsRepository.getLead(lead ?? '')} />;
}
