import Link from 'next/link';

export function RecordDetail({ eyebrow, title, backHref, backLabel, rows, note }: { eyebrow: string; title: string; backHref: string; backLabel: string; rows: Array<[string, string]>; note: string }) {
  return <><header className="page-header"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div><Link href={backHref} className="button">← Back to {backLabel}</Link></header><section className="detail-grid"><article className="panel detail-panel"><p className="eyebrow">Record details</p><dl className="details">{rows.map(([label, value]) => <><dt key={`${label}-term`}>{label}</dt><dd key={`${label}-value`}>{value}</dd></>)}</dl></article><aside className="panel"><p className="eyebrow">Workflow note</p><h2>Backend action required</h2><p className="muted">{note}</p><div className="notice">This local demo view does not apply business-state changes or reveal protected data.</div></aside></section></>;
}
