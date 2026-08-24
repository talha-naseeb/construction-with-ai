'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  ['Overview', '/dashboard', '▦'], ['Calls', '/calls', '⌕'], ['Leads', '/leads', '◉'], ['Customers', '/customers', '♙'], ['Bookings', '/bookings', '▣'], ['Jobs', '/jobs', '▰'], ['Services', '/services', '⌘'], ['Technicians', '/technicians', '♟'], ['Analytics', '/analytics', '▥'], ['Security', '/security', '♢'], ['Settings', '/settings', '⚙']
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <div className="app-shell"><aside className="sidebar"><Link href="/dashboard" className="brand"><span className="helmet" aria-hidden="true"/><span><strong>Retell AI</strong><small>Construction calls</small></span></Link><nav aria-label="Main navigation">{navigation.map(([label, href, icon]) => <Link key={href} href={href} className={pathname === href || (href !== '/dashboard' && pathname.startsWith(`${href}/`)) ? 'active' : ''}><span aria-hidden="true">{icon}</span>{label}</Link>)}</nav><div className="sidebar-status"><span/>All systems operational<small>Updated just now</small></div></aside><main className="main-content">{children}</main></div>;
}
