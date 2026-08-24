import Link from 'next/link';

export default function NotFound() {
  return <main className="error-page"><p className="eyebrow">404</p><h1>This page does not exist.</h1><p>Return to the operations overview.</p><Link href="/dashboard" className="button primary">Go to dashboard</Link></main>;
}
