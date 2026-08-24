import type { Metadata } from 'next';
import './tailwind.css';
import './globals.css';
import './mobile.css';
import './typography.css';
import './sidebar.css';
import './offcanvas.css';
import './topbar.css';
import './logout.css';
import { ToastProvider } from '@/components/ui/toast-provider';

export const metadata: Metadata = {
  title: 'Retell AI | Construction Command Center',
  description: 'Admin operations dashboard for a construction calling agent.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body><ToastProvider>{children}</ToastProvider></body></html>;
}
