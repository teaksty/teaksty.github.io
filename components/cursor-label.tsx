'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * A small label that trails the pointer over anything carrying `data-cursor`.
 * The native cursor is left alone — replacing it wholesale looks broken the
 * moment the page is doing anything else.
 *
 * Costs nothing until a target is hovered: no rAF loop runs while idle, and the
 * whole thing never mounts on touch devices or under reduced motion.
 */
export function CursorLabel() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const node = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const rendered = useRef({ x: 0, y: 0 });
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)');
    const still = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setEnabled(fine.matches && !still.matches);

    sync();
    fine.addEventListener('change', sync);
    still.addEventListener('change', sync);
    return () => {
      fine.removeEventListener('change', sync);
      still.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const tick = () => {
      const current = rendered.current;
      // Light easing: enough to feel attached, not enough to feel laggy.
      current.x += (pointer.current.x - current.x) * 0.18;
      current.y += (pointer.current.y - current.y) * 0.18;

      if (node.current) {
        node.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }
      frame.current = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      pointer.current = { x: event.clientX, y: event.clientY };

      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]');
      const next = target?.dataset.cursor ?? null;

      setLabel((previous) => {
        if (previous === next) return previous;
        // Snap on first acquisition so the label does not fly in from the last
        // place the pointer happened to be.
        if (!previous && next) rendered.current = { ...pointer.current };
        return next;
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    frame.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={node}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden lg:block"
    >
      <span
        className={[
          'flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full',
          'border border-line-strong bg-bg/70 backdrop-blur-[2px]',
          'font-mono text-[0.625rem] uppercase tracking-[0.14em] text-fg',
          'transition-[opacity,transform] duration-300 ease-out',
          label ? 'scale-100 opacity-100' : 'scale-50 opacity-0',
        ].join(' ')}
      >
        {label}
      </span>
    </div>
  );
}
