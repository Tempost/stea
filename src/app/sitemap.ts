import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  let url;
  if (process.env.VERCEL_URL) {
    url = `https://${process.env.VERCEL_URL}`;
  } else {
    url = `http://localhost:${process.env.PORT ?? 3000}`;
  }

  return [
    {
      url: url + '/',
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: url + '/members-horses',
      changeFrequency: 'monthly',
      priority: 2,
    },
    {
      url: url + '/scores',
      changeFrequency: 'monthly',
      priority: 4,
    },
    {
      url: url + '/calendar',
      changeFrequency: 'monthly',
      priority: 5,
    },
    {
      url: url + '/join',
      changeFrequency: 'monthly',
      priority: 3,
    },
    {
      url: url + '/join/benefits',
      changeFrequency: 'monthly',
      priority: 6,
    },
    {
      url: url + '/contactus',
      changeFrequency: 'never',
      priority: 7,
    },
  ];
}
