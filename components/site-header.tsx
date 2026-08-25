'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

import { site } from '@/data/site';

/**
 * The header is meant to be forgettable: hairline weight, no background until
 * you have actually scrolled, and it steps out of the way when you are reading
 * downwards. It returns the moment you scroll back up.
 */
export function SiteHeader() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      setScrolled(y > 24);
      // Ignore sub-pixel jitter and the rubber-band zone at the top.
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > 220);
        lastY.current = y;
      }
      ticking.current = false;
    };

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(update);
    };

    lastY.current = window.scrollY;
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-500 ease-out',
        hidden ? '-translate-y-full' : 'translate-y-0',
        scrolled
          ? 'border-b border-line bg-bg/80 backdrop-blur-[10px]'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
    >
      <div className="shell flex h-[58px] items-center justify-between gap-6 sm:h-[68px]">
        <Link
          href="/"
          className="text-[0.9375rem] font-medium tracking-[-0.01em] text-fg transition-opacity duration-300 hover:opacity-60"
        >
          {site.wordmark}
          <span className="hidden text-faint sm:inline">, {site.location.split(',')[0]}</span>
        </Link>

        <div className="flex items-center gap-6 sm:gap-9">
          <span className="micro-label hidden items-center gap-2 lg:flex">
            <span
              aria-hidden
              className={`h-[5px] w-[5px] ${site.availability.open ? 'bg-accent' : 'bg-faint'}`}
            />
            {site.availability.label}
          </span>

          <nav aria-label="Primary">
            <ul className="flex items-center gap-5 sm:gap-7">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-meta text-muted transition-colors duration-300 hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
