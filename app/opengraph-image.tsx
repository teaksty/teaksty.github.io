import { ImageResponse } from 'next/og';

import { site } from '@/data/site';

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Required by `output: 'export'`: rendered once at build time into out/.
export const dynamic = 'force-static';

/**
 * The card shown when the site is pasted into a chat or a timeline. Same
 * surfaces, same hairline, same single accent as the page itself — it should
 * read as a crop of the site, not as a separate poster.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0a',
          color: '#f2f2f0',
          padding: '64px 72px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 10, height: 10, background: '#e0533b' }} />
            <div style={{ fontSize: 22, letterSpacing: 3, color: '#8c8c86' }}>
              {site.availability.label.toUpperCase()}
            </div>
          </div>
          <div style={{ fontSize: 22, letterSpacing: 3, color: '#55554f' }}>
            {site.location.toUpperCase()}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: 1, background: 'rgba(255,255,255,0.14)' }} />
          <div style={{ display: 'flex', fontSize: 128, letterSpacing: -5, marginTop: 44 }}>
            {site.name}
          </div>
          <div style={{ display: 'flex', fontSize: 40, color: '#8c8c86', marginTop: 18 }}>
            {site.role}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#55554f' }}>
          <div style={{ display: 'flex' }}>Desktop apps · Storefronts · Games</div>
          <div style={{ display: 'flex' }}>{site.url.replace('https://', '')}</div>
        </div>
      </div>
    ),
    size,
  );
}
