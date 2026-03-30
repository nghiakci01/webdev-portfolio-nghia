import fs from 'node:fs';
import path from 'node:path';
import dotenv from 'dotenv';

// Load environment variables from .env.production
dotenv.config({ path: '.env.production' });

const SITE_URL = process.env.VITE_SITE_URL || 'https://yourportfolio.com';
const PAGES = ['']; // Add other pages if you have them, e.g., ['about', 'projects']

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${PAGES.map(page => `
  <url>
    <loc>${SITE_URL}${page ? `/${page}` : ''}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

  const distPath = path.resolve(process.cwd(), 'dist');
  
  if (!fs.existsSync(distPath)) {
    console.error('Dist directory does not exist. Run npm run build first.');
    process.exit(1);
  }

  fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemap);
  console.log('Sitemap generated successfully in dist/sitemap.xml');

  // Also generate robots.txt
  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml`;
  fs.writeFileSync(path.join(distPath, 'robots.txt'), robots);
  console.log('robots.txt generated successfully in dist/robots.txt');
};

generateSitemap();
