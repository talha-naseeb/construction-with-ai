'use client';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <html lang="en"><body><main className="error-page"><h1>Something went wrong.</h1><button className="button primary" onClick={reset}>Try again</button></main></body></html>;
}
