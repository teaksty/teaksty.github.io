'use client';

import { useEffect, useState } from 'react';

/**
 * Local time where I am. Rendered empty on the server and filled after mount,
 * so there is no hydration mismatch and no layout shift (the slot is reserved
 * with tabular figures).
 */
export function LocalTime({ timeZone, className = '' }: { timeZone: string; className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone,
      }).format(new Date());

    setTime(format());
    const id = window.setInterval(() => setTime(format()), 20_000);
    return () => window.clearInterval(id);
  }, [timeZone]);

  return (
    <span className={`tabular-nums ${className}`} suppressHydrationWarning>
      {time ?? '—'}
    </span>
  );
}
