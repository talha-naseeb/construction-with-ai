import { BookingDetail } from '@/components/admin/booking-detail';

export default async function BookingPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = await params;
  return <BookingDetail bookingId={bookingId}/>;
}
