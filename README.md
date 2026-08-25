# teaksty — portfolio

Dark editorial portfolio. Next.js 15 (App Router) · TypeScript · Tailwind. Fully static: every
route is prerendered, ~111 KB of JS on first load, no animation library.

```bash
npm run dev
```

Then open http://localhost:3000. `npm run build` produces the static output, `npm run typecheck`
runs TypeScript with no emit.

## Deploying to GitHub Pages

The site is a static export (`output: 'export'` in `next.config.mjs`), and
`.github/workflows/deploy.yml` builds and publishes it on every push to `main`.

One-time setup in the repository: **Settings → Pages → Source → GitHub Actions**.
That is all — no branch to pick, no `gh-pages` to maintain.

The base path is worked out at build time, so the repo name decides the URL:

| Repo name | URL | Base path |
| --- | --- | --- |
| `teaksty.github.io` | `https://teaksty.github.io` | none |
| anything else, e.g. `portfolio` | `https://teaksty.github.io/portfolio` | `/portfolio` |

`actions/configure-pages` reports the right value and the workflow passes it in as
`PAGES_BASE_PATH`. Locally the variable is unset, so `npm run dev` stays at the root.

After the first deploy, point `site.url` in `data/site.ts` at the published address — it
feeds `og:url` and the canonical tag.

## Where the content lives

Nothing is written inside components. Two files hold everything:

| File | What it controls |
| --- | --- |
| `data/site.ts` | Name, role, location, availability, email, links, hero copy, about, capabilities |
| `data/projects.ts` | The six cased projects and the `archive` list underneath them |

Editing a project's `layout` (`full` / `offset-right` / `offset-left` / `inset`) and `ratio` changes
how its row is composed — that variation is what stops the index reading as six identical cards.
Adding a project to the array creates its case page at `/work/<slug>` automatically.

## Swapping in real screenshots

Project imagery is currently drawn as inline SVG (`components/project-visual.tsx`) — schematic
diagrams of each product, not stock decoration. To use real screenshots:

1. Put the file in `public/work/`.
2. Add `image` to the project (or to a `screens` entry):

```ts
image: {
  src: '/work/corebots-launcher.png',
  width: 2560,
  height: 1440,
  alt: 'CoreBots launcher with bot tiles',
}
```

The placeholder is bypassed and `next/image` takes over — the frame already owns the aspect ratio,
so nothing shifts while it loads.

## Background

`components/ui/beams-background.tsx` is a shadcn-style component (canvas beams + `motion`) mounted
once behind the whole document by `components/site-background.tsx`:

```tsx
<BeamsBackground bare intensity="subtle" hue={190} className="h-full min-h-0 bg-transparent" />
```

- `intensity` — `subtle` | `medium` | `strong`. Above `subtle` it starts competing with body text.
- `hue` — `190` is the component's original cyan. Pass `10` to pull the beams into the site accent.
- `bare` — drops the component's built-in headline. Without it, `<BeamsBackground />` still renders
  its own demo hero (see `components/ui/beams-background-demo.tsx`).

It skips the animation loop entirely under `prefers-reduced-motion` (drawing one static frame) and
stops while the tab is hidden. The About band and the footer are translucent so the background stays
continuous behind them; make them opaque again to cut it off there.

## Design system

Tokens are CSS custom properties in `app/globals.css`; Tailwind mirrors them in
`tailwind.config.ts` and never redefines a value.

- Surfaces: `#0a0a0a` background, `#101010` raised, `#060606` sunken, `#131312` media
- Text: `#f2f2f0` primary, `#8c8c86` muted, `#55554f` faint
- Lines: `rgba(255,255,255,0.08)`
- Accent `#e0533b` — used only for the availability mark, project indices on hover, selection and focus

Type is Inter with JetBrains Mono for micro-labels and figures, loaded through `next/font` so there
is no layout shift and no external request at runtime.

## Motion

No animation library. Scroll reveals are one `IntersectionObserver` per element that disconnects
after it fires (`components/reveal.tsx`); the transitions themselves are CSS, with five distinct
entrances (`rise`, `mask`, `wipe`, `rule`, `fade`) assigned per section so the page does not read as
one repeated fade-up. Everything collapses under `prefers-reduced-motion`, and a `<noscript>` rule
makes the content visible if JavaScript never runs.

The pointer label over project rows (`components/cursor-label.tsx`) never mounts on touch devices or
under reduced motion, and runs no animation frame while idle.

## Before publishing

- `site.url` still points at the shop — change it once this site has its own domain, since it feeds
  `og:url` and the canonical tag.
- Availability is a real claim: flip `site.availability.open` to `false` when booked.
