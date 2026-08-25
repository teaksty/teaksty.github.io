/**
 * Everything personal lives here. Swap these values and the whole site follows —
 * no copy is hard-coded in components.
 */

export const site = {
  name: 'teaksty',
  /** Short form used in the header and the footer wordmark. */
  wordmark: 'teaksty',
  role: 'Independent developer',
  location: 'Germany',
  timezone: 'Europe/Berlin',
  availability: {
    label: 'Open to work and commissions',
    /** Set to false when booked — the header state changes, not the layout. */
    open: true,
    detail: 'Telegram is the fastest way to reach me',
  },
  email: 'teaksty@gmail.com',
  // Canonical address of THIS site — used for og:url and the sitemap.
  // Currently points at the shop; change it once the portfolio has its own domain.
  url: 'https://teaksty.store',

  hero: {
    /** Rendered as individually masked lines, so keep them short. */
    lines: ['I build small', 'products alone —', 'and finish them.'],
    intro:
      'Desktop apps, storefronts and games, designed and written by one person. Electron and Python on the desktop, React on the web, Luau and C# when it has to be a game. Most of it is live: a shop on its own domain, a launcher sold by licence key, a player people keep open all day.',
  },

  about: {
    paragraphs: [
      'I work solo, from an empty folder to something installed or bought. There is no handover in the middle, which is why the products end up small, opinionated and finished rather than half-built.',
      'What I actually enjoy is the part nobody sees: atomic writes so a crash cannot eat a library, migrations that add fields without wiping someone else’s data, licence caches that are signed instead of trusted, image pipelines that turn an 8 MB photo into 33 KB before it ever leaves the browser. The interface is the easy half.',
      'From Odessa, based in Germany. I run teaksty.store, sell CoreBots by licence key, and build the rest because the idea would not leave me alone.',
    ],
    facts: [
      { label: 'Based in', value: 'Germany, CET' },
      { label: 'From', value: 'Odessa, Ukraine' },
      { label: 'Shop', value: 'teaksty.store' },
      { label: 'Works as', value: 'Solo — design and code' },
    ],
  },

  capabilities: [
    {
      title: 'Web',
      items: [
        'React 18 · Vite · Next.js',
        'TypeScript',
        'Supabase — Postgres, RLS, Storage',
        'Cloudflare Workers · D1',
        'PWA, SEO, sitemaps',
      ],
    },
    {
      title: 'Desktop',
      items: [
        'Electron — IPC, tray, SMTC',
        'Python — PyQt6, pywebview',
        'Nuitka builds, Inno Setup',
        'Licensing, HWID binding',
        'Auto-update from GitHub releases',
      ],
    },
    {
      title: 'Games & systems',
      items: [
        'Roblox — Luau, Rojo, DataStore',
        'Unity 6 — C#, URP',
        'Odds and simulation models',
        'OpenStreetMap pipelines',
        'Web Audio, yt-dlp, ffmpeg',
      ],
    },
  ],

  links: [
    { label: 'Email', value: 'teaksty@gmail.com', href: 'mailto:teaksty@gmail.com' },
    { label: 'Telegram', value: '@teaksty', href: 'https://t.me/teaksty' },
    { label: 'GitHub', value: 'github.com/teaksty', href: 'https://github.com/teaksty' },
    { label: 'Shop', value: 'teaksty.store', href: 'https://teaksty.store' },
  ],

  nav: [
    { label: 'Work', href: '/#work' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ],
} as const;

export type Site = typeof site;
