import Image from 'next/image';

import { ProjectVisual } from '@/components/project-visual';
import type { ProjectImage, VisualKey } from '@/data/projects';

type Props = {
  visual: VisualKey;
  ratio: string;
  image?: ProjectImage;
  /** Passed to next/image so the browser downloads the right file. */
  sizes?: string;
  priority?: boolean;
  className?: string;
};

/** Minimal browser bar for screenshots taken without one. */
function BrowserBar({ url }: { url: string }) {
  return (
    <div className="flex h-9 items-center gap-3 border-b border-[var(--line)] bg-white/[0.03] px-3 sm:h-11 sm:gap-4 sm:px-4">
      <div className="flex shrink-0 gap-1.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-[6px] w-[6px] rounded-full bg-white/15 sm:h-2 sm:w-2" />
        ))}
      </div>
      <div className="flex h-5 min-w-0 flex-1 items-center rounded-sm bg-white/[0.04] px-2.5 sm:h-6">
        <span className="truncate font-mono text-[0.5625rem] tracking-[0.06em] text-faint sm:text-[0.625rem]">
          {url}
        </span>
      </div>
    </div>
  );
}

/**
 * Two presentations, chosen per image:
 *
 *  bleed  — fills the frame and crops to it. Used for the drawn schematics,
 *           which are designed to be cropped.
 *  stage  — the screenshot is placed on a surface and contained, never cut.
 *           Desktop captures already carry their own window chrome, so the
 *           stage adds none; a web capture gets a browser bar instead.
 *
 * The frame owns the aspect ratio either way, so nothing shifts while the
 * image loads, and the hover scale lives on an inner element so the crop and
 * the chrome stay put.
 */
export function ProjectMedia({
  visual,
  ratio,
  image,
  sizes = '(min-width: 1024px) 60vw, 100vw',
  priority = false,
  className = '',
}: Props) {
  const frame = image?.frame ?? 'bleed';
  const staged = Boolean(image) && frame !== 'bleed';

  return (
    <div
      className={`relative overflow-hidden bg-[var(--bg-media)] ${className}`}
      // A staged shot sets its own height — padding plus chrome plus the image
      // itself — so there is no ratio it can be cropped to.
      style={staged ? undefined : { aspectRatio: ratio }}
    >
      {image && staged ? (
        <div className="flex items-center justify-center p-[clamp(1rem,3.5%,3rem)]">
          <div className="flex w-full flex-col overflow-hidden border border-[var(--line-strong)] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.9)] transition-transform duration-[620ms] ease-out will-change-transform group-hover:-translate-y-1">
            {frame === 'browser' && image.url ? <BrowserBar url={image.url} /> : null}
            <Image
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              sizes={sizes}
              priority={priority}
              className="h-auto w-full"
            />
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 transition-transform duration-[620ms] ease-out will-change-transform group-hover:scale-[1.025]">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              priority={priority}
              className="object-cover"
            />
          ) : (
            <ProjectVisual variant={visual} className="h-full w-full" />
          )}
        </div>
      )}

      {/* A hairline inside the crop, not a border on it — keeps edges sharp. */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[var(--line)]" />

      {/* Barely-there lift on hover instead of a glow. */}
      <div className="pointer-events-none absolute inset-0 bg-white/0 transition-colors duration-500 group-hover:bg-white/[0.025]" />
    </div>
  );
}
