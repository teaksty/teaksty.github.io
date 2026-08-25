import Link from 'next/link';

import { LocalTime } from '@/components/local-time';
import { site } from '@/data/site';

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-[var(--section)] border-t border-line bg-black/40 backdrop-blur-[2px]">
      <div className="shell pb-10 pt-[clamp(3.5rem,7vw,6rem)]">
        <div className="grid-12 items-end gap-y-10">
          {/* The wordmark is set at the largest size on the page and cropped to
              its own baseline — it closes the document rather than decorating it. */}
          <div className="col-span-6 lg:col-span-7">
            <p className="line-clip text-[clamp(3rem,11vw,8.5rem)] font-medium leading-[0.85] tracking-[-0.045em] text-fg/90">
              {site.wordmark}
            </p>
          </div>

          <div className="col-span-6 lg:col-span-4 lg:col-start-9">
            <p className="micro-label">Colophon</p>
            <p className="mt-4 max-w-[38ch] text-meta text-faint">
              Set in Inter and JetBrains Mono. Built with Next.js and Tailwind. Project imagery is
              drawn in SVG until the screenshots replace it.
            </p>
          </div>
        </div>

        <div className="rule mt-12" />

        <div className="grid-12 gap-y-4 pt-5">
          <p className="col-span-6 font-mono text-micro text-faint lg:col-span-4">
            © {year} {site.name}
          </p>
          <p className="col-span-6 font-mono text-micro text-faint lg:col-span-4 lg:text-center">
            {site.location.split(',')[0]} <LocalTime timeZone={site.timezone} className="ml-1" />
          </p>
          <p className="col-span-6 font-mono text-micro lg:col-span-4 lg:text-right">
            <Link href="#top" className="link-underline text-faint transition-colors hover:text-fg">
              Back to top
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
