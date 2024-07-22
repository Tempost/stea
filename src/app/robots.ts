import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  let url;
  if (process.env.VERCEL_URL) {
    url = `https://${process.env.VERCEL_URL}`;
  } else {
    url = `http://localhost:${process.env.PORT ?? 3000}`;
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api', '/dashboard'],
    },
    sitemap: url + '/sitemap.xml',
  };
}
