import type { MetadataRoute } from 'next';

import { projects } from '@/data/projects';
import { site } from '@/data/site';

// Required by `output: 'export'`: the file is written once at build time.
export const dynamic = 'force-static';

/**
 * Generated at build time into out/sitemap.xml. Trailing slashes match the
 * static export, so the URLs here are the ones GitHub Pages actually serves.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date();

  return [
    {
      url: `${site.url}/`,
      lastModified: updated,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${site.url}/work/${project.slug}/`,
      lastModified: updated,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  ];
}
