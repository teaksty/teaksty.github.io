import { Reveal } from '@/components/reveal';
import { site } from '@/data/site';

/**
 * A list, not a chart. Percentages on a skill are a claim nobody can check;
 * naming the work honestly is more useful and reads better besides.
 */
export function Capabilities() {
  return (
    <section className="shell pt-[var(--section)]">
      <div className="grid-12 items-baseline gap-y-6">
        <Reveal kind="wipe" className="col-span-6 lg:col-span-2">
          <h2 className="micro-label text-muted">Capabilities</h2>
        </Reveal>
        <Reveal kind="fade" delay={100} className="col-span-6 lg:col-span-5 lg:col-start-4">
          <p className="max-w-[46ch] text-meta text-faint">
            One person from the first commit to the installer. The list below is what I have
            actually shipped with, not what I have read about.
          </p>
        </Reveal>
      </div>

      <div className="grid-12 mt-[clamp(3rem,7vw,5.5rem)] gap-y-12">
        {site.capabilities.map((group, groupIndex) => (
          <Reveal
            key={group.title}
            kind="rise"
            delay={groupIndex * 110}
            className="col-span-6 lg:col-span-3"
          >
            {/* Columns start at slightly different heights: a deliberate break
                from a perfectly even three-up. */}
            <div className={groupIndex === 1 ? 'lg:pt-10' : groupIndex === 2 ? 'lg:pt-20' : ''}>
              <div className="rule" />
              <h3 className="mt-5 text-title font-medium text-fg">{group.title}</h3>
              <ul className="mt-6">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="border-t border-line py-3 text-body text-muted first:border-t-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}

        <Reveal
          kind="fade"
          delay={340}
          className="col-span-6 lg:col-span-2 lg:col-start-11 lg:pt-[7.5rem]"
        >
          <p className="micro-label">Tools</p>
          <p className="mt-5 text-meta leading-relaxed text-faint">
            VS Code, Claude Code, Rojo, Unity, wrangler, Vercel. None of them are the work.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
