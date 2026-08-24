import Link from 'next/link';
import { Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function FoundationPage({ eyebrow, title, description, cards }: { eyebrow: string; title: string; description: string; cards: Array<{ title: string; body: string }> }) {
  return <div className="space-y-5"><header><p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-muted-foreground">{eyebrow}</p><h1 className="mt-1 text-3xl font-bold tracking-tight">{title}</h1><p className="mt-2 text-sm text-muted-foreground">{description}</p></header><section className="grid gap-4 md:grid-cols-3">{cards.map((card) => <Card key={card.title}><CardHeader><p className="text-[10px] font-extrabold uppercase tracking-[.13em] text-muted-foreground">Frontend foundation</p><CardTitle>{card.title}</CardTitle></CardHeader><CardContent className="text-sm leading-6 text-muted-foreground">{card.body}</CardContent></Card>)}</section><Card className="border-amber-300 bg-amber-50 py-0"><CardContent className="flex flex-col gap-4 p-4 text-sm text-amber-950 sm:flex-row sm:items-center"><Info className="size-5 shrink-0"/><p className="flex-1"><b>Local UI only.</b> These controls describe the future integration boundary. They do not enforce roles, retain secrets, or show production analytics.</p><Button asChild variant="outline"><Link href="/dashboard">Return to overview</Link></Button></CardContent></Card></div>;
}
