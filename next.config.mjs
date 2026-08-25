/**
 * Static export for GitHub Pages.
 *
 * `PAGES_BASE_PATH` is filled in by the deploy workflow from
 * actions/configure-pages, so the same config works either way:
 *
 *   repo named `teaksty.github.io`  → served at the root, base path empty
 *   any other repo name            → served at /<repo>, base path /<repo>
 *
 * Locally the variable is unset, so `npm run dev` stays at http://localhost:3000.
 */
const basePath = process.env.PAGES_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath || undefined,
  // Pages emits work/<slug>/index.html, which GitHub Pages serves without
  // relying on extensionless lookups.
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    // There is no image server on Pages, so next/image must not try to optimise.
    unoptimized: true,
  },
};

export default nextConfig;
