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

/**
 * The media frame owns the aspect ratio, so nothing shifts while an image
 * loads. The scale on hover lives on an inner element — animating a child
 * rather than the frame keeps the crop stable.
 */
export function ProjectMedia({
  visual,
  ratio,
  image,
  sizes = '(min-width: 1024px) 60vw, 100vw',
  priority = false,
  className = '',
}: Props) {
  return (
    <div
      className={`relative overflow-hidden bg-[var(--bg-media)] ${className}`}
      style={{ aspectRatio: ratio }}
    >
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

      {/* A hairline inside the crop, not a border on it — keeps edges sharp. */}
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[var(--line)]" />

      {/* Barely-there lift on hover instead of a glow. */}
      <div className="pointer-events-none absolute inset-0 bg-white/0 transition-colors duration-500 group-hover:bg-white/[0.025]" />
    </div>
  );
}
