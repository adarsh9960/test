const fs = require('fs');
const path = require('path');

const baseUrl = 'https://elitecabmumbai.com';

const pages = [
  '',
  '#about',
  '#services',
  '#fleet',
  '#gallery',
  '#sightseeing',
  '#testimonials',
  '#clients',
  '#pricing',
  '#why-choose-us',
  '#how-it-works',
  '#faq',
  '#rate-service',
  '#contact',
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, 'public', 'sitemap.xml'), sitemap);
console.log('Sitemap generated successfully!');