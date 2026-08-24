'use client';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="error-page"><p className="eyebrow">Application error</p><h1>We could not load this workspace.</h1><p>Nothing was changed. Please try again.</p><button className="button primary" onClick={reset}>Try again</button></main>;
}
