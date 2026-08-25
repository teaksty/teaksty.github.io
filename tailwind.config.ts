import type { Config } from 'tailwindcss';

/**
 * The design tokens live in `app/globals.css` as CSS custom properties so that
 * they can be inspected in devtools and reused outside of utility classes.
 * Tailwind only mirrors them — it never redefines a value.
 */
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './data/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        raised: 'var(--bg-raised)',
        sunken: 'var(--bg-sunken)',
        fg: 'var(--fg)',
        muted: 'var(--fg-muted)',
        faint: 'var(--fg-faint)',
        line: 'var(--line)',
        'line-strong': 'var(--line-strong)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        sans: 'var(--font-sans)',
        mono: 'var(--font-mono)',
      },
      fontSize: {
        micro: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.16em' }],
        meta: ['0.8125rem', { lineHeight: '1.45', letterSpacing: '0.01em' }],
        body: ['1.0625rem', { lineHeight: '1.65', letterSpacing: '-0.005em' }],
        lead: ['clamp(1.125rem, 1.5vw, 1.375rem)', { lineHeight: '1.5', letterSpacing: '-0.012em' }],
        title: ['clamp(1.375rem, 2vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        headline: ['clamp(2rem, 4.2vw, 3.25rem)', { lineHeight: '1.02', letterSpacing: '-0.032em' }],
        display: ['clamp(2.5rem, 6.2vw, 5.25rem)', { lineHeight: '0.98', letterSpacing: '-0.038em' }],
      },
      maxWidth: {
        shell: '1440px',
        content: '1280px',
        measure: '58ch',
      },
      spacing: {
        gutter: 'var(--gutter)',
        section: 'var(--section)',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
        inout: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
