import Link from 'next/link';

export function FoundationPage({ eyebrow, title, description, cards }: { eyebrow: string; title: string; description: string; cards: Array<{ title: string; body: string }> }) {
  return <><header className="page-header"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-subtitle">{description}</p></div></header><section className="technician-grid">{cards.map((card) => <article className="panel tech-card" key={card.title}><p className="eyebrow">Frontend foundation</p><h2>{card.title}</h2><p className="muted">{card.body}</p></article>)}</section><aside className="panel verification"><span className="alert-mark">i</span><div><h2>Local UI only</h2><p>These controls describe the future integration boundary. They do not claim to enforce roles, retain secrets, or show production analytics.</p></div><Link href="/dashboard" className="button">Return to overview</Link></aside></>;
}
