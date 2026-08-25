/**
 * Project data. Add, remove or reorder freely — the page composes itself.
 *
 * `layout` and `ratio` deliberately differ from project to project: a page where
 * every case sits in an identical card reads as a template, not as a portfolio.
 *
 * `visual` selects a drawn placeholder composition (components/project-visual.tsx).
 * Once you have screenshots, set `image` and the placeholder is bypassed.
 */

export type ProjectLayout = 'full' | 'offset-right' | 'offset-left' | 'inset';

export type VisualKey =
  | 'launcher'
  | 'catalog'
  | 'player'
  | 'garment'
  | 'feed'
  | 'map'
  | 'voice';

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt: string;
  /**
   * How the shot is presented. `bleed` fills and crops the frame; `stage`
   * places it on a surface, contained and uncropped; `browser` is a stage with
   * an address bar, for web captures taken without one. Defaults to `bleed`.
   */
  frame?: 'bleed' | 'stage' | 'browser';
  /** Shown in the address bar when `frame` is `browser`. */
  url?: string;
}

export interface Project {
  slug: string;
  index: string;
  name: string;
  kind: string;
  year: string;
  client: string;
  roles: string[];
  stack: string[];
  /** Live product, source, downloads — rendered as links in the case masthead. */
  links?: { label: string; href: string }[];
  /** One or two sentences. Anything longer belongs in the case study. */
  summary: string;
  layout: ProjectLayout;
  /** CSS aspect-ratio for the index preview. Varying these sets the page rhythm. */
  ratio: string;
  visual: VisualKey;
  image?: ProjectImage;
  study: {
    intro: string;
    problem: string[];
    approach: string[];
    principles: { label: string; body: string }[];
    screens: { caption: string; visual: VisualKey; ratio: string; image?: ProjectImage }[];
    details: { label: string; value: string }[];
    result: string[];
    metrics?: { label: string; value: string }[];
  };
}

export const projects: Project[] = [
  {
    slug: 'corebots',
    index: '01',
    name: 'CoreBots',
    kind: 'Desktop launcher, sold by licence',
    year: '2026',
    client: 'Own product',
    roles: ['Product', 'Development', 'Release'],
    stack: ['Python', 'pywebview', 'React', 'Nuitka', 'Cloudflare Workers'],
    links: [
      { label: 'corebots.org', href: 'https://corebots.org' },
      // Release assets, not source — labelled for what it actually is.
      { label: 'Releases', href: 'https://github.com/teaksty/corebots-release/releases/latest' },
    ],
    summary:
      'A Windows launcher for ten automation bots, sold by licence key. Installs without admin rights, binds to the machine, and updates itself from GitHub — the boring parts of shipping software to people who will never open a terminal.',
    layout: 'full',
    ratio: '16 / 9',
    visual: 'launcher',
    image: {
      src: '/work/corebots-launcher.webp',
      width: 1141,
      height: 681,
      alt: 'CoreBots launcher: a grid of bot tiles, each with its run state, and a panel showing which bots are running',
      frame: 'stage',
    },
    study: {
      intro:
        'CoreBots is a desktop launcher for ten bots that automate repetitive tasks in a GTA5RP roleplay server. It is a real product with paying users, which means most of the work is not the interface — it is distribution, licensing, updates, and the failure modes of a Windows machine you cannot see.',
      problem: [
        'The buyers are players, not developers. The app has to install without admin rights, run on a machine that may not have a WebView2 runtime, update itself without being asked twice, and refuse to run for someone who has not paid — without any of that being defeated by editing a file in the install folder.',
        'Ten bots also means ten windows. Each one had grown its own inline stylesheet, so the product looked like ten programs wearing the same name.',
      ],
      approach: [
        'The host is Python on pywebview; the interface is React compiled into a single offline HTML file by a small Node build step. Data is JSON written atomically next to the executable, so a crash mid-write cannot leave a user with an empty config.',
        'The release is a folder build, not onefile: Nuitka standalone produces a 269 MB directory, and an Inno Setup script wraps it into a 78 MB installer that lands in %LocalAppData% and pulls in the WebView2 runtime if the machine lacks it. Onefile was tried and dropped — it shipped a DLL instead of an executable and started slowly.',
        'The version number exists in exactly one place, app.py. The build script reads it from there into the executable metadata and generates the installer version file, which is why a release cannot disagree with itself.',
        'Every bot window now draws from one theme module: one stylesheet for the whole application, DWM blur behind the frame, rounded corners through SetWindowRgn, and roles set by object name rather than inline styles.',
      ],
      principles: [
        {
          label: 'One source of version',
          body: 'The number lives in the code. Metadata, installer and update check all read it, so a release can never half-happen.',
        },
        {
          label: 'Ask before updating',
          body: 'The app checks GitHub at start, compares, and asks. It verifies the checksum before it installs anything over itself.',
        },
        {
          label: 'Trust nothing on disk',
          body: 'The licence cache is signed with a salt and the machine id. An unsigned cache is a cache anyone can grant themselves a year with.',
        },
      ],
      screens: [
        {
          caption: 'Settings — appearance, sounds, assistant, licence, updates',
          visual: 'launcher',
          ratio: '16 / 10',
          image: {
            src: '/work/corebots-settings.webp',
            width: 1143,
            height: 685,
            alt: 'CoreBots settings, five sections listed as rows: appearance, sounds, AI assistant, licence and updates',
            frame: 'stage',
          },
        },
      ],
      details: [
        { label: 'Surface', value: 'Windows 10 / 11' },
        { label: 'Licensing', value: 'Cloudflare Worker, HWID-bound' },
        { label: 'Distribution', value: 'GitHub releases, auto-update' },
        { label: 'Beyond the bots', value: 'Calculator, statistics, timer, assistant' },
      ],
      result: [
        'Version 2.2 is live, the installer checksum matches, and the update path has been verified end to end from an older build.',
        'A later security pass found the real hole: a shortcut flag launched a bot before the licence check ran. It now goes through the same gate as the interface, and the licence cache is signed.',
        'Still open, honestly: a download mirror in case GitHub is unreachable, and a code-signing certificate so Windows stops calling it an unknown publisher.',
      ],
      metrics: [
        { label: 'Installer', value: '78 MB' },
        { label: 'Bots shipped', value: '10' },
        { label: 'Current version', value: '2.2' },
      ],
    },
  },
  {
    slug: 'teaksty-store',
    index: '02',
    name: 'teaksty.store',
    kind: 'Archive & secondhand storefront',
    year: '2026',
    client: 'Own shop',
    roles: ['Design', 'Frontend', 'Backend'],
    stack: ['React 18', 'Vite', 'Supabase', 'Vercel'],
    links: [{ label: 'teaksty.store', href: 'https://teaksty.store' }],
    summary:
      'My own shop: archive and secondhand clothing out of Germany, shipping across Europe. A catalogue with no cart — every item opens a ready-written Telegram message, because that is where the sale actually happens.',
    layout: 'offset-right',
    ratio: '5 / 4',
    visual: 'catalog',
    image: {
      src: '/work/teaksty-store-home.webp',
      width: 1862,
      height: 926,
      alt: 'teaksty.store home page: bilingual navigation, a full-bleed hero over blurred garments, and a row of shop facts',
      frame: 'browser',
      url: 'teaksty.store',
    },
    study: {
      intro:
        'The shop had been running out of a Telegram channel. That works until someone wants to browse, or find the piece again, or share it. The site is the catalogue the channel could not be — indexable, linkable, bilingual — while the conversation stays in Telegram.',
      problem: [
        'A storefront implies a checkout, and a checkout implies payments, addresses and returns. None of that was real: the deal is a conversation, then a card payment, then DHL.',
        'It also had to be honest. An early draft carried invented terms — commission rates, delivery windows, free shipping thresholds — and they reached production before being replaced with what I actually offer.',
      ],
      approach: [
        'No cart, no favourites. Each item has one button that opens Telegram with a message about that exact piece already written. Everything the catalogue promises is something I can deliver.',
        'Items live in Supabase behind row-level security — anyone can read, only an authenticated session can write — with photos in a public bucket. The admin password that used to guard the panel is gone; it was never protection.',
        'Photos are compressed in the browser before upload: canvas resize to 1600px, WebP at 0.82, EXIF rotation preserved, with a fallback to the original when it is already smaller. An 8.7 MB, 4032px phone photo lands at 33 KB.',
        'Metadata is generated per page — title, description, canonical, Open Graph with the product photo and price — and the sitemap is built after each deploy from the live Supabase catalogue.',
      ],
      principles: [
        {
          label: 'Never invent terms',
          body: 'If I have not stated a fee or a delivery window, the site says "individual" rather than a plausible number.',
        },
        {
          label: 'Cache the shell, never the stock',
          body: 'The service worker holds static assets only. A sold piece must never be served from a cache.',
        },
        {
          label: 'Deploy is git push',
          body: 'Vercel builds from the main branch. There is no step in between where a version can be forgotten.',
        },
      ],
      screens: [],
      details: [
        { label: 'Live', value: 'teaksty.store' },
        { label: 'Data', value: 'Supabase, RLS + Storage' },
        { label: 'Locales', value: 'EN storefront, RU admin' },
        { label: 'Extras', value: 'PWA, sitemap, analytics' },
      ],
      result: [
        'The shop runs on its own domain and updates by pushing to main. Bulk upload means a new drop of twenty pieces is one session, not an evening.',
        'One typographic detail worth keeping: the display face has no Cyrillic, so the Russian side of the site swaps to a second family through a variable, with its own size corrections because that face runs wider.',
      ],
      metrics: [
        { label: 'Photo pipeline', value: '8.7 MB → 33 KB' },
        { label: 'Deploy', value: 'git push' },
        { label: 'Storefront', value: 'EN / RU' },
      ],
    },
  },
  {
    slug: 'corecloud',
    index: '03',
    name: 'CoreCloud',
    kind: 'Desktop music player',
    year: '2026',
    client: 'Own product',
    roles: ['Product', 'Development'],
    stack: ['Electron', 'Web Audio', 'yt-dlp', 'Cloudflare Workers'],
    summary:
      'An Electron player that streams from YouTube and SoundCloud through a local proxy. Ten-band EQ, real crossfade, synced karaoke, and an interface that takes its colour from the cover currently playing.',
    layout: 'offset-left',
    ratio: '4 / 3',
    visual: 'player',
    image: {
      src: '/work/corecloud-player.png',
      width: 1365,
      height: 818,
      alt: 'CoreCloud player: cover art, a waveform seek bar with listener comments pinned to it, transport controls and the track queue below',
      frame: 'stage',
    },
    study: {
      intro:
        'CoreCloud started as a rebuild of a player I liked and kept going past it. It is the project where I learned that audio software is mostly about latency and state — the visible part is a list of songs.',
      problem: [
        'Streaming from sources that do not hand you a file means a pipeline: fetch, transcode, serve, buffer. Doing it naively puts a two-second gap between clicking a track and hearing it.',
        'Lyrics were worse. Fetching candidates one after another took twelve seconds, by which point the song is a verse in and the feature is pointless.',
      ],
      approach: [
        'Audio is piped through a local proxy on 127.0.0.1, with stream URLs cached and the next track prebuffered into a second audio element while the first is still playing.',
        'That second element is what makes crossfade and gapless real: the two elements swap, and all five media events are bound to both with a guard so the inactive one is ignored. No rewrite of every reference to the player was needed.',
        'Lyric lookups now race in parallel with per-request timeouts, and titles in "artist - song" shape are split into several candidate pairs before querying. Twelve seconds became one to four, and the renderer prefetches on play so the karaoke view opens instantly.',
        'The colour system samples the cover on a small canvas, finds the most vibrant pixel, and writes it into three custom properties. Progress bars, the active nav item and the karaoke highlight all follow the record. It degrades to plain white when the cover cannot be read.',
      ],
      principles: [
        {
          label: 'The stylesheet is the truth',
          body: 'When a view broke, I rewrote the JavaScript to emit the classes the CSS already had, instead of inventing new CSS to match broken markup.',
        },
        {
          label: 'Never lose a library',
          body: 'The store writes atomically with a backup file and flushes synchronously before quit.',
        },
        {
          label: 'Effects must degrade',
          body: 'No analyser, no cover colour, no lyrics — the audio still plays. Nothing decorative is allowed to block playback.',
        },
      ],
      screens: [
        {
          caption: 'Library — playlists, local files and generated selections',
          visual: 'player',
          ratio: '16 / 10',
          image: {
            src: '/work/corecloud-library.png',
            width: 1365,
            height: 807,
            alt: 'CoreCloud library: favourites and local files at the top, generated selections, and the playlist list down the left',
            frame: 'stage',
          },
        },
      ],
      details: [
        { label: 'Surface', value: 'Windows desktop' },
        { label: 'Integration', value: 'SMTC, thumbar, tray' },
        { label: 'Backend', value: 'Cloudflare Worker + D1' },
        { label: 'Mini player', value: '380 × 132, always on top' },
      ],
      result: [
        'The equaliser, sleep timer, Windows media controls, drag-and-drop import and the compact mini player all landed over successive releases; it is on 0.8.x now.',
        'The visualiser depends on the proxy sending its CORS header — a small, documented coupling I would rather write down than rediscover.',
      ],
      metrics: [
        { label: 'Lyric lookup', value: '12s → 1–4s' },
        { label: 'Equaliser', value: '10 bands' },
        { label: 'Playback rate', value: '0.5–2×, pitch kept' },
      ],
    },
  },
  {
    slug: 'vecini',
    index: '04',
    name: 'Vecini',
    kind: 'Neighbourhood app',
    year: '2026',
    client: 'Prototype',
    roles: ['Product design', 'Frontend', 'Backend'],
    stack: ['Vite', 'Express', 'JWT', 'PWA'],
    summary:
      'A neighbourhood app for a residential complex — listings, rentals, chats, reviews, moderation. It began as a single 12,200-line HTML file and had to become a real application without losing a working prototype.',
    layout: 'inset',
    ratio: '4 / 5',
    visual: 'feed',
    study: {
      intro:
        'Vecini serves one building: neighbours lending, renting, selling and arranging things, with four roles from resident to owner and a moderation queue behind it. Trilingual, because the complex it was designed for is in Moldova.',
      problem: [
        'The prototype worked and was unmaintainable: one HTML file, 1.2 MB, every block of script patching the block before it in load order.',
        'Rewriting it from scratch would have thrown away the only version anyone had ever used.',
      ],
      approach: [
        'A script split the monolith into forty-one stylesheets and thirty-nine scripts, preserving load order exactly, and reduced the page to a 440-line shell. The scripts stayed classic, not modules: they share a global scope and patch each other in sequence, and module scoping would have silently broken that.',
        'A backend was added underneath rather than in front — Express with hashed passwords and JWT over a JSON document store, so there are no native builds and no external services to sign up for.',
        'Every feature syncs both ways and survives a cleared browser: listings, chat threads, reviews, reports and notifications were each verified by wiping local storage and watching the data come back from the server.',
        'The moderation loop is closed: a resident’s report reaches the moderator console, gets resolved there, and the resident is notified by a poll that deduplicates what it has already shown.',
      ],
      principles: [
        {
          label: 'Preserve the working version',
          body: 'Refactor mechanically first, redesign second. The extraction kept behaviour identical by construction.',
        },
        {
          label: 'Offline is not an error',
          body: 'Every sync path falls back to local state rather than blocking the interface.',
        },
        {
          label: 'Privacy by default',
          body: 'Apartment numbers stay hidden; handovers are suggested at reception, not at a door.',
        },
      ],
      screens: [
        { caption: 'Feed — offers, requests, swaps, giveaways', visual: 'feed', ratio: '9 / 16' },
        { caption: 'Desktop layout, bottom nav becomes a rail', visual: 'map', ratio: '16 / 10' },
      ],
      details: [
        { label: 'Roles', value: 'Resident, admin, moderator, owner' },
        { label: 'Languages', value: 'RU / RO / EN' },
        { label: 'Backend', value: 'Express, bcrypt, JWT' },
        { label: 'Install', value: 'PWA, offline-capable' },
      ],
      result: [
        'The prototype is now a Vite application with a backend, a desktop layout above 1200 pixels, and an installable PWA — with the original file still building the same product.',
        'Left deliberately unfinished: the Postgres store is written but not switched on, because that needs hosting decisions that are not mine to make.',
      ],
      metrics: [
        { label: 'Monolith split', value: '12,200 lines' },
        { label: 'Extracted files', value: '41 CSS / 39 JS' },
        { label: 'Shell reduced to', value: '440 lines' },
      ],
    },
  },
];

/**
 * Smaller or older builds. These are listed, not cased — a portfolio should
 * show what it is proud of and admit the rest exists.
 */
export const archive = [
  {
    name: 'Vinted Manager',
    kind: 'Desktop tool',
    year: '2026',
    note: 'A local catalogue for resale listings — status tracking, thumbnails, embedded charts, CSV export. Everything stays on the machine.',
    stack: 'PyQt6 · SQLite · matplotlib',
  },
] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
