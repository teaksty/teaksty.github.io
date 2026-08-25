import { Reveal } from '@/components/reveal';
import { site } from '@/data/site';

/**
 * The last thing on the page is a question and an address. Anything else here
 * would be a form standing between someone and an email they can just send.
 */
export function Contact() {
  return (
    <section id="contact" className="shell scroll-mt-24 pt-[var(--section)]">
      <div className="rule" />

      <div className="grid-12 gap-y-12 pt-[clamp(3rem,7vw,5.5rem)]">
        <Reveal kind="fade" className="col-span-6 lg:col-span-2">
          <h2 className="micro-label text-muted">Contact</h2>
        </Reveal>

        <div className="col-span-6 lg:col-span-10 lg:col-start-3">
          <Reveal kind="rise" as="p" className="max-w-[18ch] text-headline font-medium text-fg">
            Have something worth building?
          </Reveal>

          <Reveal kind="fade" delay={120}>
            <a
              href={`mailto:${site.email}`}
              data-cursor="Write"
              className="link-underline mt-10 inline-block text-lead text-fg transition-colors duration-300 hover:text-accent"
            >
              {site.email}
            </a>
          </Reveal>

          <Reveal kind="fade" delay={200}>
            <p className="mt-6 max-w-measure text-body text-muted">
              Tell me what you are making, who it is for, and when it needs to exist. Telegram
              gets read fastest; email works just as well for anything longer.
            </p>
          </Reveal>

          <Reveal kind="rise" delay={260}>
            <ul className="mt-12 grid grid-cols-2 gap-px border border-line bg-line sm:grid-cols-4">
              {site.links.map((link) => (
                <li key={link.label} className="bg-bg">
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
                    className="group flex h-full flex-col justify-between gap-6 p-5 transition-colors duration-300 hover:bg-[var(--bg-raised)]"
                  >
                    <span className="micro-label transition-colors duration-300 group-hover:text-accent">
                      {link.label}
                    </span>
                    <span className="text-meta text-muted transition-colors duration-300 group-hover:text-fg">
                      {link.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
