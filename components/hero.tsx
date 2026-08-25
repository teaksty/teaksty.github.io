import { LocalTime } from '@/components/local-time';
import { site } from '@/data/site';
import { projects } from '@/data/projects';

/**
 * The hero states four things — who, what, where, and what is being offered —
 * and then stops. It is deliberately not a full viewport: the top of the work
 * index sits just below the fold so the page announces what it is for.
 */
export function Hero() {
  const years = [...new Set(projects.map((project) => project.year))].sort();
  const span = years.length > 1 ? `${years[0]}—${years[years.length - 1]}` : years[0];

  return (
    <section className="shell pt-[clamp(7rem,14vw,11rem)]">
      <div className="grid-12 items-baseline gap-y-6">
        <p className="micro-label fade-in col-span-3 lg:col-span-6" style={{ ['--fade-delay' as string]: '520ms' }}>
          {site.name}
        </p>
        <p
          className="micro-label fade-in col-span-3 text-right lg:col-span-6"
          style={{ ['--fade-delay' as string]: '600ms' }}
        >
          <span className="hidden sm:inline">{site.location} · </span>
          <LocalTime timeZone={site.timezone} />
        </p>
      </div>

      <div className="rule rule-draw mt-5" style={{ ['--rule-delay' as string]: '560ms' }} />

      <h1 className="mt-[clamp(2.5rem,6vw,4.5rem)] max-w-[16ch] text-display font-medium text-fg">
        {site.hero.lines.map((line, i) => (
          <span key={line} className="line-clip">
            <span className="line-inner" style={{ ['--line-delay' as string]: `${120 + i * 110}ms` }}>
              {line}
            </span>
          </span>
        ))}
      </h1>

      <div className="grid-12 mt-[clamp(3.5rem,8vw,7rem)] gap-y-10 pb-[clamp(3.5rem,7vw,6rem)]">
        <div
          className="fade-in col-span-6 lg:col-span-3"
          style={{ ['--fade-delay' as string]: '700ms' }}
        >
          <p className="micro-label">Status</p>
          <p className="mt-4 flex items-center gap-2.5 text-meta text-fg">
            <span
              aria-hidden
              className={`h-[5px] w-[5px] shrink-0 ${site.availability.open ? 'bg-accent' : 'bg-faint'}`}
            />
            {site.availability.label}
          </p>
          <p className="mt-1.5 pl-[15px] text-meta text-faint">{site.availability.detail}</p>
        </div>

        <p
          className="fade-in col-span-6 max-w-measure text-lead text-muted lg:col-span-6 lg:col-start-6"
          style={{ ['--fade-delay' as string]: '780ms' }}
        >
          {site.hero.intro}
        </p>

        <div
          className="fade-in col-span-6 hidden lg:col-span-2 lg:col-start-11 lg:block"
          style={{ ['--fade-delay' as string]: '860ms' }}
        >
          <p className="micro-label text-right">Selected {span}</p>
          <p className="mt-4 text-right text-meta text-faint">
            {projects.length} projects
          </p>
        </div>
      </div>
    </section>
  );
}
