import { BeamsBackground } from '@/components/ui/beams-background';

/**
 * The beams, mounted once behind the whole document.
 *
 * `bare` drops the component's built-in headline; `min-h-0` overrides its
 * default hero sizing (twMerge lets the later utility win). Two knobs worth
 * knowing:
 *
 *   intensity — 'subtle' | 'medium' | 'strong'. Anything above subtle starts
 *               competing with body text on a page this long.
 *   hue       — 190 is the component's original cyan. Pass 10 to pull the
 *               beams into the site accent instead.
 */
export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
      <BeamsBackground
        bare
        intensity="subtle"
        hue={190}
        className="h-full min-h-0 bg-transparent"
      />
    </div>
  );
}
