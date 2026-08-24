'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { BarChart3, BriefcaseBusiness, CalendarDays, ChevronLeft, ChevronRight, ClipboardList, LogOut, Menu, PhoneCall, Settings, ShieldCheck, UserRound, UsersRound, Wrench, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  { label: 'Overview', href: '/dashboard', Icon: BarChart3 }, { label: 'Calls', href: '/calls', Icon: PhoneCall }, { label: 'Leads', href: '/leads', Icon: ClipboardList }, { label: 'Customers', href: '/customers', Icon: UsersRound }, { label: 'Bookings', href: '/bookings', Icon: CalendarDays }, { label: 'Jobs', href: '/jobs', Icon: BriefcaseBusiness }, { label: 'Services', href: '/services', Icon: Wrench }, { label: 'Technicians', href: '/technicians', Icon: UsersRound }, { label: 'Analytics', href: '/analytics', Icon: BarChart3 }, { label: 'Security', href: '/security', Icon: ShieldCheck }, { label: 'Settings', href: '/settings', Icon: Settings }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const toggleSidebar = () => setIsCollapsed((value) => !value);
  return <div className={`app-shell shell-fixed ${isCollapsed ? 'shell-collapsed' : ''}`}>
    <button className="mobile-menu-button" type="button" aria-label="Open navigation" aria-expanded={isOpen} onClick={() => setIsOpen(true)}><Menu size={21}/></button>
    {isOpen && <button className="sidebar-backdrop" type="button" aria-label="Close navigation" onClick={closeMenu}/>} 
    <aside className={`sidebar app-sidebar ${isOpen ? 'is-open' : ''} ${isCollapsed ? 'is-collapsed' : ''}`}>
      <div className="sidebar-top"><Link href="/dashboard" className="brand" onClick={closeMenu}><span className="helmet" aria-hidden="true"/><span><strong>Retell AI</strong><small>Construction calls</small></span></Link><button className="mobile-sidebar-close" type="button" onClick={closeMenu} aria-label="Close navigation"><X size={19}/></button></div>
      <nav aria-label="Main navigation">{navigation.map(({ label, href, Icon }) => <Link key={href} href={href} title={isCollapsed ? label : undefined} onClick={closeMenu} className={pathname === href || (href !== '/dashboard' && pathname.startsWith(`${href}/`)) ? 'active' : ''}><span aria-hidden="true"><Icon size={16} strokeWidth={2}/></span><b>{label}</b></Link>)}</nav>
      <div className="sidebar-footer"><div className="sidebar-status"><span/> <b>All systems operational</b><small>Updated just now</small></div><Link href="/login" onClick={closeMenu} title={isCollapsed ? 'Log out' : undefined} className="sidebar-logout"><LogOut size={16}/><b>Log out</b></Link></div>
    </aside>
    <header className="app-topbar"><div className="app-topbar-workspace"><button className="header-sidebar-toggle" type="button" onClick={toggleSidebar} aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'} title={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}>{isCollapsed ? <ChevronRight size={18}/> : <ChevronLeft size={18}/>}</button><p>Construction operations</p></div><Button asChild variant="ghost" className="h-auto gap-3 px-2 py-1.5"><Link href="/profile"><span className="grid size-8 place-items-center rounded-full bg-ops-slate text-[10px] font-extrabold text-white">AK</span><span className="hidden text-left sm:block"><b className="block text-xs">Aisha Khan</b><small className="block text-[10px] text-muted-foreground">Operations Manager</small></span><UserRound className="size-4 text-muted-foreground"/></Link></Button></header>
    <main className="main-content app-main">{children}</main>
  </div>;
}
