import { AdminShell } from '@/components/admin/admin-shell';
import { BookingProvider } from '@/components/admin/booking-store';

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <BookingProvider><AdminShell>{children}</AdminShell></BookingProvider>;
}
