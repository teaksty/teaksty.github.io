'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

export type RevealKind = 'rise' | 'mask' | 'wipe' | 'rule' | 'fade';

type Props = {
  children: ReactNode;
  /** Different sections use different entrances on purpose. */
  kind?: RevealKind;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  as?: 'div' | 'section' | 'li' | 'span' | 'p' | 'header' | 'footer' | 'article';
  /** How far up from the bottom edge the element must travel before it plays. */
  margin?: number;
};

/**
 * One IntersectionObserver per element, disconnected after it fires. No
 * animation library, no scroll listener, no work after the element has played.
 * The transition itself is declared in CSS (`[data-reveal]`), which keeps the
 * reduced-motion override in one place.
 */
export function Reveal({
  children,
  kind = 'rise',
  delay = 0,
  className = '',
  style,
  as: Tag = 'div',
  margin = 0.1,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    // Anything already on screen at mount is measured directly. Observers are
    // not always delivered for a page that has not composited yet (a restored
    // background tab, for one), and content must never be left invisible.
    const box = node.getBoundingClientRect();
    if (box.top < window.innerHeight * (1 - margin) && box.bottom > 0) {
      setVisible(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      // threshold 0 with a bottom inset: it fires once the element has crossed
      // into the lower part of the viewport, whatever its height.
      { threshold: 0, rootMargin: `0px 0px -${Math.round(margin * 100)}% 0px` },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [margin, visible]);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-reveal={kind}
      className={`${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ ['--reveal-delay' as string]: `${delay}ms`, ...style }}
    >
      {children}
    </Tag>
  );
}
