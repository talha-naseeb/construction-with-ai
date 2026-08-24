 'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { operationsRepository } from '@/lib/operations-repository';

function outcomeStyle(outcome: string) {
  if (outcome === 'Booking created') return { variant: 'default' as const, className: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-100' };
  if (outcome === 'Lead created') return { variant: 'secondary' as const, className: 'border-amber-300 bg-amber-100 text-amber-900 hover:bg-amber-100' };
  if (outcome === 'Failed') return { variant: 'destructive' as const, className: 'bg-red-100 text-red-800 hover:bg-red-100' };
  return { variant: 'secondary' as const, className: 'bg-slate-100 text-slate-700 hover:bg-slate-100' };
}

export default function CallsPage() {
  const calls = operationsRepository.listCalls();
  const [query, setQuery] = useState('');
  const [outcome, setOutcome] = useState('All outcomes');
  const visibleCalls = useMemo(() => calls.filter((call) => (outcome === 'All outcomes' || call.outcome === outcome) && `${call.customer} ${call.phone} ${call.service}`.toLowerCase().includes(query.toLowerCase())), [calls, outcome, query]);
  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-muted-foreground">AI call ledger · local demo data</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Calls</h1>
          <p className="mt-2 text-sm text-muted-foreground">Review outcomes, verify what the agent captured, and decide the next human action.</p>
        </div>
        <Button>Export calls</Button>
      </header>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div className="relative w-full sm:max-w-sm"><Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"/><Input value={query} onChange={(event) => setQuery(event.target.value)} className="pl-9" placeholder="Search caller, phone, or service"/></div><select value={outcome} onChange={(event) => setOutcome(event.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm"><option>All outcomes</option><option>Booking created</option><option>Lead created</option><option>Resolved</option><option>Failed</option></select></div>
      <Card className="overflow-hidden py-0">
        <Table className="table-fixed">
          <TableHeader><TableRow>
            <TableHead className="w-[37%] sm:w-[28%]">Caller</TableHead>
            <TableHead className="hidden w-[24%] md:table-cell">Service</TableHead>
            <TableHead className="hidden w-[19%] lg:table-cell">Time</TableHead>
            <TableHead className="w-[39%] sm:w-[34%] md:w-[25%] lg:w-[17%]">Outcome</TableHead>
            <TableHead className="w-[24%] text-right sm:w-[14%]">Action</TableHead>
          </TableRow></TableHeader>
          <TableBody>{visibleCalls.map((call) => {
            const style = outcomeStyle(call.outcome);
            return <TableRow key={call.id}>
              <TableCell className="whitespace-normal"><p className="font-semibold">{call.customer}</p><p className="mt-1 truncate text-xs text-muted-foreground">{call.phone} · {call.duration}</p></TableCell>
              <TableCell className="hidden text-sm font-medium whitespace-normal md:table-cell">{call.service}</TableCell>
              <TableCell className="hidden text-sm whitespace-normal text-muted-foreground lg:table-cell">{call.startedAt}</TableCell>
              <TableCell className="whitespace-normal"><Badge variant={style.variant} className={`max-w-full whitespace-normal text-center leading-4 ${style.className}`}>{call.outcome}</Badge><p className="mt-1 text-xs text-muted-foreground md:hidden">{call.service} · {call.startedAt}</p></TableCell>
              <TableCell className="text-right"><Button asChild variant="ghost" size="sm" className="px-2"><Link href={`/calls/${call.id}`}>Review</Link></Button></TableCell>
            </TableRow>;
          })}</TableBody>
        </Table>
        {visibleCalls.length === 0 && <CardContent className="py-12 text-center text-sm text-muted-foreground">No calls match this view. Try another caller, service, or outcome.</CardContent>}
      </Card>
    </div>
  );
}
