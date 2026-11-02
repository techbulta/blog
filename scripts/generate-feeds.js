// Writes build/sitemap.xml and build/rss.xml from public/articles/articles.json.
// Runs after `react-scripts build` (see the "build" script in package.json).
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://bulta.lk';
const SITE_TITLE = 'Bulta';
const SITE_DESCRIPTION = 'Practical guides on development, DevOps and AI.';

const root = path.join(__dirname, '..');
const buildDir = path.join(root, 'build');
const articles = JSON.parse(fs.readFileSync(path.join(root, 'public/articles/articles.json'), 'utf8'))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

const escapeXml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const articleUrl = (article) => `${SITE_URL}/article/${article.id}`;
const lastUpdated = articles.length ? articles[0].date : new Date().toISOString().slice(0, 10);

const sitemapEntries = [
  { loc: `${SITE_URL}/`, lastmod: lastUpdated },
  { loc: `${SITE_URL}/about` },
  ...articles.map(article => ({ loc: articleUrl(article), lastmod: article.date })),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.map(entry => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>${entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>
`;

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}/</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${articles.map(article => `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${articleUrl(article)}</link>
      <guid isPermaLink="true">${articleUrl(article)}</guid>
      <pubDate>${new Date(article.timestamp || article.date).toUTCString()}</pubDate>
      <description>${escapeXml(article.excerpt)}</description>${(article.categories || []).map(cat => `\n      <category>${escapeXml(cat)}</category>`).join('')}
    </item>`).join('\n')}
  </channel>
</rss>
`;

fs.writeFileSync(path.join(buildDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(buildDir, 'rss.xml'), rss);
console.log(`Wrote sitemap.xml and rss.xml for ${articles.length} articles.`);
