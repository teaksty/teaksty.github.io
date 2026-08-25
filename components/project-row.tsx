import Link from 'next/link';

import { ProjectMedia } from '@/components/project-media';
import { Reveal } from '@/components/reveal';
import type { Project, ProjectLayout } from '@/data/projects';

/**
 * One row, four placeable blocks: head, media, summary, meta.
 *
 * Each layout only moves those blocks around the same twelve columns — the
 * markup is written once. DOM order stays head → media → summary → meta, which
 * is both the mobile order and the reading order for assistive tech.
 */
const placements: Record<
  ProjectLayout,
  { head: string; media: string; summary: string; meta: string; sizes: string }
> = {
  full: {
    head: 'lg:col-span-12 lg:row-start-1',
    media: 'lg:col-span-12 lg:row-start-2',
    summary: 'lg:col-span-5 lg:row-start-3',
    meta: 'lg:col-span-3 lg:col-start-10 lg:row-start-3',
    sizes: '(min-width: 1440px) 1376px, (min-width: 1024px) 92vw, 100vw',
  },
  'offset-right': {
    head: 'lg:col-span-5 lg:row-start-1',
    media: 'lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-span-3 lg:self-start',
    summary: 'lg:col-span-4 lg:row-start-2',
    meta: 'lg:col-span-4 lg:row-start-3 lg:self-end',
    sizes: '(min-width: 1024px) 46vw, 100vw',
  },
  'offset-left': {
    head: 'lg:col-span-4 lg:col-start-9 lg:row-start-1',
    media: 'lg:col-span-7 lg:row-start-1 lg:row-span-3 lg:self-start',
    summary: 'lg:col-span-4 lg:col-start-9 lg:row-start-2',
    meta: 'lg:col-span-4 lg:col-start-9 lg:row-start-3 lg:self-end',
    sizes: '(min-width: 1024px) 54vw, 100vw',
  },
  inset: {
    head: 'lg:col-span-12 lg:row-start-1',
    media: 'lg:col-span-6 lg:col-start-2 lg:row-start-2',
    summary: 'lg:col-span-3 lg:col-start-9 lg:row-start-2 lg:self-end',
    meta: 'lg:col-span-3 lg:col-start-9 lg:row-start-3',
    sizes: '(min-width: 1024px) 46vw, 100vw',
  },
};

export function ProjectRow({ project, first = false }: { project: Project; first?: boolean }) {
  const place = placements[project.layout];

  return (
    <article>
      <Link
        href={`/work/${project.slug}`}
        data-cursor="Open case"
        className="group block focus-visible:outline-none"
        aria-label={`${project.name} — ${project.kind}, ${project.year}`}
      >
        <div className="grid-12 gap-y-7 lg:gap-y-9">
          {/* Head ------------------------------------------------------- */}
          <Reveal kind="fade" className={`col-span-6 ${place.head}`}>
            <div className="rule mb-5" />
            <div className="flex items-baseline justify-between gap-4">
              <div className="flex items-baseline gap-4 sm:gap-6">
                <span className="font-mono text-micro text-faint transition-colors duration-300 group-hover:text-accent">
                  {project.index}
                </span>
                <h3 className="text-title font-medium text-fg transition-transform duration-500 ease-out group-hover:translate-x-1.5">
                  {project.name}
                </h3>
              </div>
              <span className="font-mono text-micro text-faint">{project.year}</span>
            </div>
            <p className="mt-2 pl-[calc(1rem+2ch)] text-meta text-muted sm:pl-[calc(1.5rem+2ch)]">
              {project.kind}
            </p>
          </Reveal>

          {/* Media ------------------------------------------------------ */}
          <Reveal kind="mask" delay={60} className={`col-span-6 ${place.media}`}>
            <ProjectMedia
              visual={project.visual}
              ratio={project.ratio}
              image={project.image}
              sizes={place.sizes}
              priority={first}
            />
          </Reveal>

          {/* Summary ---------------------------------------------------- */}
          <Reveal kind="rise" delay={120} className={`col-span-6 ${place.summary}`}>
            <p className="max-w-measure text-body text-muted">{project.summary}</p>
            <span className="link-underline mt-6 inline-block text-meta text-fg">
              Open case
            </span>
          </Reveal>

          {/* Meta ------------------------------------------------------- */}
          <Reveal kind="rise" delay={180} className={`col-span-6 ${place.meta}`}>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 lg:grid-cols-1">
              <div>
                <dt className="micro-label">Role</dt>
                <dd className="mt-2.5 text-meta text-muted">{project.roles.join(', ')}</dd>
              </div>
              <div>
                <dt className="micro-label">Stack</dt>
                <dd className="mt-2.5 text-meta text-muted">{project.stack.join(', ')}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </Link>
    </article>
  );
}
