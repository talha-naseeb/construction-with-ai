import Link from 'next/link';

type Row = { id: string; primary: string; secondary: string; meta: string; state: string; href?: string; stateTone?: 'success' | 'amber' | 'muted-pill' };

export function OperationsPage({ eyebrow, title, description, action, columns, rows, emptyCopy }: { eyebrow: string; title: string; description: string; action: string; columns: [string, string, string, string]; rows: Row[]; emptyCopy: string }) {
  return <><header className="page-header"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-subtitle">{description}</p></div><button className="button primary">{action} <span>+</span></button></header><section className="panel table-panel"><table><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.id}><td><strong>{row.primary}</strong><span>{row.secondary}</span></td><td>{row.meta}</td><td><span className={`pill ${row.stateTone ?? ''}`}>{row.state}</span></td><td>{row.href ? <Link href={row.href} className="text-link" aria-label={`Review ${row.primary}`}>Review →</Link> : <span className="muted">—</span>}</td></tr>)}</tbody></table>{rows.length === 0 && <div className="empty-state">{emptyCopy}</div>}</section></>;
}
