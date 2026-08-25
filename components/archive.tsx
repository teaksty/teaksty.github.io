import { Reveal } from '@/components/reveal';
import { archive } from '@/data/projects';

/**
 * Everything that is real but not worth a full case. A plain table changes the
 * page rhythm after three sections of large media, and it is honest: these are
 * listed, not sold.
 */
export function Archive() {
  return (
    <section className="shell pt-[var(--section)]">
      <div className="grid-12 items-baseline gap-y-6">
        <Reveal kind="wipe" className="col-span-6 lg:col-span-2">
          <h2 className="micro-label text-muted">Also built</h2>
        </Reveal>
        <Reveal kind="fade" delay={100} className="col-span-6 lg:col-span-5 lg:col-start-4">
          <p className="max-w-[46ch] text-meta text-faint">
            Smaller builds that do not need a case page — what it is, and what it runs on.
          </p>
        </Reveal>
      </div>

      <ul className="mt-[clamp(2.5rem,5vw,4rem)]">
        {archive.map((item, i) => (
          <Reveal as="li" key={item.name} kind="rise" delay={i * 70} className="group">
            <div className="rule" />
            <div className="grid-12 gap-y-3 py-7">
              <div className="col-span-6 lg:col-span-3">
                <h3 className="text-body font-medium text-fg">{item.name}</h3>
                <p className="mt-1.5 text-meta text-faint">{item.kind}</p>
              </div>
              <p className="col-span-6 max-w-measure text-meta text-muted lg:col-span-5 lg:col-start-5">
                {item.note}
              </p>
              <p className="col-span-3 text-meta text-faint lg:col-span-3 lg:col-start-11">
                {item.stack}
              </p>
              <p className="col-span-3 text-right font-mono text-micro text-faint lg:hidden">
                {item.year}
              </p>
            </div>
          </Reveal>
        ))}
        <li aria-hidden className="rule" />
      </ul>
    </section>
  );
}
