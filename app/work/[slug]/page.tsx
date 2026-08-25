import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ProjectMedia } from '@/components/project-media';
import { Reveal } from '@/components/reveal';
import { getNextProject, getProject, projects } from '@/data/projects';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: `${project.name} — ${project.kind}`,
    description: project.summary,
    openGraph: { title: project.name, description: project.summary },
  };
}

/** Label-left, content-right. Used for every prose block on the page. */
function Block({
  label,
  children,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`shell pt-[clamp(3.5rem,7vw,6rem)] ${className}`}>
      <div className="rule" />
      <div className="grid-12 gap-y-6 pt-6">
        <Reveal kind="fade" className="col-span-6 lg:col-span-2">
          <h2 className="micro-label text-muted">{label}</h2>
        </Reveal>
        <div className="col-span-6 lg:col-span-8 lg:col-start-4">{children}</div>
      </div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(project.slug);
  const { study } = project;

  return (
    <article className="pb-[clamp(4rem,8vw,7rem)]">
      {/* Masthead ---------------------------------------------------- */}
      <header className="shell pt-[clamp(7rem,13vw,10rem)]">
        <div className="grid-12 items-baseline gap-y-4">
          <p className="col-span-3 font-mono text-micro text-faint lg:col-span-6">
            <Link href="/#work" className="link-underline transition-colors hover:text-fg">
              Index
            </Link>
            <span className="px-2 text-fg/20">/</span>
            {project.index}
          </p>
          <p className="col-span-3 text-right font-mono text-micro text-faint lg:col-span-6">
            {project.year}
          </p>
        </div>

        <div className="rule mt-5" />

        <h1 className="mt-[clamp(2rem,5vw,3.5rem)] text-display font-medium">
          <span className="line-clip">
            <span className="line-inner">{project.name}</span>
          </span>
        </h1>
        <div
          className="fade-in mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-2"
          style={{ ['--fade-delay' as string]: '260ms' }}
        >
          <p className="text-lead text-muted">{project.kind}</p>
          {project.links?.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="Visit"
              className="link-underline font-mono text-micro text-fg transition-colors hover:text-accent"
            >
              {link.label} ↗
            </a>
          ))}
        </div>

        <div className="grid-12 mt-[clamp(3rem,7vw,5rem)] gap-y-8">
          <div
            className="fade-in col-span-3 lg:col-span-2"
            style={{ ['--fade-delay' as string]: '340ms' }}
          >
            <p className="micro-label">Client</p>
            <p className="mt-3 text-meta text-muted">{project.client}</p>
          </div>
          <div
            className="fade-in col-span-3 lg:col-span-2"
            style={{ ['--fade-delay' as string]: '380ms' }}
          >
            <p className="micro-label">Role</p>
            <ul className="mt-3 text-meta text-muted">
              {project.roles.map((role) => (
                <li key={role}>{role}</li>
              ))}
            </ul>
          </div>
          <div
            className="fade-in col-span-6 lg:col-span-3"
            style={{ ['--fade-delay' as string]: '420ms' }}
          >
            <p className="micro-label">Services</p>
            <ul className="mt-3 text-meta text-muted">
              {project.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <p
            className="fade-in col-span-6 max-w-measure text-body text-fg lg:col-span-4 lg:col-start-9"
            style={{ ['--fade-delay' as string]: '460ms' }}
          >
            {study.intro}
          </p>
        </div>
      </header>

      {/* Hero visual — the one full-bleed element on the site --------- */}
      <Reveal kind="mask" className="mt-[clamp(3rem,7vw,6rem)]">
        <ProjectMedia
          visual={project.visual}
          ratio="21 / 9"
          image={project.image}
          sizes="100vw"
          priority
        />
      </Reveal>

      {/* Problem ------------------------------------------------------ */}
      <Block label="Problem" className="mt-[clamp(3.5rem,8vw,7rem)]">
        {study.problem.map((paragraph, i) => (
          <Reveal
            key={i}
            kind="rise"
            delay={i * 90}
            as="p"
            className={`max-w-measure text-body ${i === 0 ? 'text-fg' : 'text-muted'} ${i > 0 ? 'mt-5' : ''}`}
          >
            {paragraph}
          </Reveal>
        ))}
      </Block>

      {/* Approach ----------------------------------------------------- */}
      <Block label="Approach">
        {study.approach.map((paragraph, i) => (
          <Reveal
            key={i}
            kind="rise"
            delay={i * 90}
            as="p"
            className={`max-w-measure text-body ${i === 0 ? 'text-fg' : 'text-muted'} ${i > 0 ? 'mt-5' : ''}`}
          >
            {paragraph}
          </Reveal>
        ))}

        <dl className="mt-12 grid gap-px bg-line sm:grid-cols-2">
          {study.principles.map((principle, i) => (
            <Reveal key={principle.label} kind="fade" delay={i * 90} className="bg-bg p-6">
              <dt className="text-meta font-medium text-fg">
                <span className="mr-2 font-mono text-micro text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {principle.label}
              </dt>
              <dd className="mt-3 text-meta leading-relaxed text-muted">{principle.body}</dd>
            </Reveal>
          ))}
        </dl>
      </Block>

      {/* Screens ------------------------------------------------------ */}
      <section className="shell pt-[clamp(4rem,9vw,8rem)]">
        <div className="rule" />
        <h2 className="micro-label mt-6 text-muted">Screens</h2>

        <div className="mt-10">
          {study.screens.map((screen, i) => {
            // Widths alternate so the sequence has a rhythm of its own.
            const width =
              i % 3 === 0
                ? 'lg:col-span-10'
                : i % 3 === 1
                  ? 'lg:col-span-6 lg:col-start-7'
                  : 'lg:col-span-5 lg:col-start-2';

            return (
              <div key={screen.caption} className={`grid-12 ${i > 0 ? 'mt-[clamp(3rem,6vw,5rem)]' : ''}`}>
                <Reveal kind="mask" className={`col-span-6 ${width}`}>
                  <ProjectMedia
                    visual={screen.visual}
                    ratio={screen.ratio}
                    image={screen.image}
                    sizes="(min-width: 1024px) 60vw, 100vw"
                  />
                  <p className="mt-4 text-meta text-faint">
                    <span className="mr-3 font-mono text-micro">
                      {project.index}.{i + 1}
                    </span>
                    {screen.caption}
                  </p>
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* Details ------------------------------------------------------ */}
      <Block label="Details">
        <dl className="grid sm:grid-cols-2">
          {study.details.map((detail) => (
            <div key={detail.label} className="border-t border-line py-4 first:border-t-0 sm:first:border-t sm:[&:nth-child(2)]:border-t">
              <dt className="micro-label">{detail.label}</dt>
              <dd className="mt-2.5 text-meta text-muted">{detail.value}</dd>
            </div>
          ))}
        </dl>
      </Block>

      {/* Result ------------------------------------------------------- */}
      <Block label="Result">
        {study.result.map((paragraph, i) => (
          <Reveal
            key={i}
            kind="rise"
            delay={i * 90}
            as="p"
            className={`max-w-measure text-body ${i === 0 ? 'text-fg' : 'text-muted'} ${i > 0 ? 'mt-5' : ''}`}
          >
            {paragraph}
          </Reveal>
        ))}

        {study.metrics ? (
          <dl className="mt-12 flex flex-wrap gap-x-16 gap-y-8">
            {study.metrics.map((metric, i) => (
              <Reveal key={metric.label} kind="fade" delay={i * 90}>
                <dt className="micro-label">{metric.label}</dt>
                <dd className="mt-3 text-title font-medium tabular-nums text-fg">{metric.value}</dd>
              </Reveal>
            ))}
          </dl>
        ) : null}
      </Block>

      {/* Next --------------------------------------------------------- */}
      <section className="shell pt-[clamp(4.5rem,10vw,9rem)]">
        <div className="rule" />
        <Link href={`/work/${next.slug}`} data-cursor="Open case" className="group block pt-8">
          <div className="grid-12 items-end gap-y-6">
            <div className="col-span-6 lg:col-span-8">
              <p className="micro-label">Next project</p>
              <p className="mt-5 text-headline font-medium text-fg transition-transform duration-500 ease-out group-hover:translate-x-2">
                {next.name}
              </p>
              <p className="mt-3 text-meta text-muted">{next.kind}</p>
            </div>
            <div className="col-span-6 lg:col-span-3 lg:col-start-10">
              <ProjectMedia
                visual={next.visual}
                ratio="4 / 3"
                image={next.image}
                sizes="(min-width: 1024px) 25vw, 100vw"
              />
            </div>
          </div>
        </Link>
      </section>
    </article>
  );
}
