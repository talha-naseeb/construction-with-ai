'use client';

import { useBookings } from '@/components/admin/booking-store';
import { TechnicianForm } from '@/components/admin/technician-form';
import { use } from 'react';

export default function EditTechnicianPage({ params }: { params: Promise<{ technicianId: string }> }) {
  const { technicians } = useBookings();
  const { technicianId } = use(params);
  return <TechnicianForm technician={technicians.find((technician) => technician.id === technicianId)} />;
}
