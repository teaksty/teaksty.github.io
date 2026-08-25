import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

import { CursorLabel } from '@/components/cursor-label';
import { SiteBackground } from '@/components/site-background';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { site } from '@/data/site';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-inter',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  display: 'swap',
  variable: '--font-mono-jb',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.hero.intro,
  openGraph: {
    type: 'website',
    title: `${site.name} — ${site.role}`,
    description: site.hero.intro,
    url: site.url,
    siteName: site.name,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <head>
        {/* Without JS the scroll reveals never fire, so neutralise them. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body id="top" className="min-h-screen antialiased">
        <a
          href="#work"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-fg focus:px-4 focus:py-2 focus:text-meta focus:text-bg"
        >
          Skip to work
        </a>
        <SiteBackground />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <CursorLabel />
      </body>
    </html>
  );
}
