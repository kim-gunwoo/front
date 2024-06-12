import { MetadataRoute } from 'next';
import { BASE_URL, MAX_PER_FILE } from '../sitemap';

export async function generateSitemaps() {
  console.log(MAX_PER_FILE);
  // Fetch the total number of products and calculate the number of sitemaps needed
  return [{ id: 1 }, { id: 2 }, { id: 3 }];
}

export default function sitemap({ id }: { id: number }): MetadataRoute.Sitemap {
  console.log(MAX_PER_FILE);
  const stores = [1, 2, 3, 4, 5, 6, 7, 8];

  const storesPosts = stores.map((store) => ({
    url: `${BASE_URL}/store/${store}`,
    lastModified: new Date(),
    priority: 0.5,
  }));

  return [...storesPosts];
}
