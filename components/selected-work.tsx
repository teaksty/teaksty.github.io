import { ProjectRow } from '@/components/project-row';
import { Reveal } from '@/components/reveal';
import { projects } from '@/data/projects';

/**
 * Spacing between projects is not uniform. Cases that share a shape get a
 * tighter gap; a change of layout gets a wider one. It reads as a considered
 * sequence rather than a list.
 */
const gaps = [
  '',
  'mt-[clamp(6rem,12vw,11rem)]',
  'mt-[clamp(5rem,9vw,8rem)]',
  'mt-[clamp(7rem,14vw,13rem)]',
  'mt-[clamp(5rem,9vw,8rem)]',
  'mt-[clamp(6rem,12vw,11rem)]',
];

export function SelectedWork() {
  return (
    <section id="work" className="shell scroll-mt-24 pt-[var(--section)]">
      <div className="grid-12 items-end gap-y-6">
        <Reveal kind="wipe" className="col-span-6 lg:col-span-4">
          <h2 className="micro-label text-muted">Selected work</h2>
        </Reveal>
        <Reveal kind="fade" delay={120} className="col-span-6 lg:col-span-5 lg:col-start-6">
          <p className="max-w-[42ch] text-meta text-faint">
            Four products I designed and wrote myself. Each entry opens a short case: the
            constraint, the decision that followed from it, and what actually shipped.
          </p>
        </Reveal>
      </div>

      <div className="mt-[clamp(3rem,6vw,5rem)]">
        {projects.map((project, i) => (
          <div key={project.slug} className={gaps[i % gaps.length]}>
            <ProjectRow project={project} first={i === 0} />
          </div>
        ))}
      </div>
    </section>
  );
}
