import { Reveal } from '@/components/reveal';
import { site } from '@/data/site';

/**
 * The one banded section on the page. A change of surface — not a change of
 * layout — is what separates this from the work index above it.
 */
export function About() {
  return (
    <section
      id="about"
      className="mt-[var(--section)] scroll-mt-24 border-y border-line bg-white/[0.025] backdrop-blur-[2px]"
    >
      <div className="shell py-[clamp(4.5rem,9vw,8rem)]">
        <div className="grid-12 gap-y-12">
          <Reveal kind="wipe" className="col-span-6 lg:col-span-2">
            <h2 className="micro-label text-muted">About</h2>
          </Reveal>

          <div className="col-span-6 lg:col-span-6 lg:col-start-4">
            {site.about.paragraphs.map((paragraph, i) => (
              <Reveal
                key={i}
                kind="rise"
                delay={i * 90}
                as="p"
                className={`max-w-measure text-body ${i === 0 ? 'text-fg' : 'text-muted'} ${
                  i > 0 ? 'mt-6' : ''
                }`}
              >
                {paragraph}
              </Reveal>
            ))}
          </div>

          <Reveal kind="fade" delay={160} className="col-span-6 lg:col-span-3 lg:col-start-10">
            <dl>
              {site.about.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-4 border-t border-line py-3.5 first:border-t-0 first:pt-0 lg:justify-start lg:gap-6"
                >
                  <dt className="micro-label shrink-0 lg:w-[10ch]">{fact.label}</dt>
                  <dd className="text-meta text-muted">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
