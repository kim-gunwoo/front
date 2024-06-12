const fs = require('fs');
const axios = require('axios');

const DOMAIN = 'https://ex.com';
// const API_URL = 'https://api.example.com/stores';
const API_URL = 'https://jsonplaceholder.typicode.com/todos';
const MAX_STORES_PER_FILE = 30000;

async function generateSitemap() {
  try {
    const response = await axios.get(API_URL);
    const stores = response.data;

    for (let i = 0; i < Math.ceil(stores.length / MAX_STORES_PER_FILE); i++) {
      const startIndex = i * MAX_STORES_PER_FILE;
      const endIndex = Math.min((i + 1) * MAX_STORES_PER_FILE, stores.length);
      const partialStores = stores.slice(startIndex, endIndex);
      const sitemapContent = generateSitemapContent(partialStores);

      // sitemap 파일 생성
      fs.writeFileSync(`public/sitemap-${i + 1}.xml`, sitemapContent);
    }
    console.log('Sitemaps generated successfully!');
  } catch (error) {
    console.error('Error generating sitemaps:', error);
  }
}

function generateSitemapContent(stores) {
  let sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemapContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  stores.forEach((store) => {
    const storeUrl = `${DOMAIN}/store/${store.id}`;
    sitemapContent += `  <url>
    <loc>${storeUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>${0.5}</priority>
  </url>\n`;
  });

  sitemapContent += '</urlset>';
  return sitemapContent;
}

generateSitemap();
