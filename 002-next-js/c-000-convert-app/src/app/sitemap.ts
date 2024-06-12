import { MetadataRoute } from 'next';

export const BASE_URL = 'https://app.passorder.co.kr';
export const MAX_PER_FILE = 30000;

export default function sitemap(): MetadataRoute.Sitemap {
  const stores = [1, 2, 3, 4, 5, 6, 7, 8];

  const storesPosts = stores.map((store) => ({
    url: `${BASE_URL}/store/${store}`,
    lastModified: new Date(),
    priority: 0.5,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: BASE_URL + '/stores/sitemap.xml',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: BASE_URL + '/sitemap-1.xml',
      lastModified: new Date(),
      priority: 1,
    },
    // ...storesPosts,
  ];
}
