// Writes a static HTML file for every page (build/article/<id>.html,
// build/about.html, and the home page's build/index.html) with that page's
// title, description, canonical URL, share tags and JSON-LD already in <head>.
//
// GitHub Pages serves /article/8 from article/8.html with a 200 status, so
// search engines index the articles and link previews (LinkedIn, Facebook,
// WhatsApp), which don't run JavaScript, show the right title and excerpt.
// The React app still loads as usual; the Seo component replaces these tags
// (they are marked data-static-seo) once it renders.
//
// Keep the tags in step with src/components/Seo.js.
// Runs after `react-scripts build` (see the "build" script in package.json).
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://bulta.lk';
const SITE_NAME = 'Bulta';
const SITE_DESCRIPTION = 'Practical guides on development, DevOps and AI.';
const AUTHOR = 'Sandaruwan';
const DEFAULT_IMAGE = `${SITE_URL}/logo512.png`;
const LOCALES = { en: 'en_US', si: 'si_LK' };

const root = path.join(__dirname, '..');
const buildDir = path.join(root, 'build');
const template = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8');
const articles = JSON.parse(fs.readFileSync(path.join(root, 'public/articles/articles.json'), 'utf8'));

const escapeHtml = (value) => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

const absolute = (url) => (/^https?:\/\//.test(url) ? url : `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`);
const author = { '@type': 'Person', name: AUTHOR, url: `${SITE_URL}/about` };

function renderPage({
  title, description = SITE_DESCRIPTION, pagePath, image, type = 'website',
  publishedTime, tags = [], lang = 'en', structuredData,
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Practical engineering, explained simply`;
  const url = absolute(pagePath);
  const imageUrl = image ? absolute(image) : DEFAULT_IMAGE;
  const shareTitle = title || fullTitle;

  const meta = (attr, key, content) => `<meta ${attr}="${key}" content="${escapeHtml(content)}" data-static-seo>`;
  const tagsHtml = [
    `<title data-static-seo>${escapeHtml(fullTitle)}</title>`,
    meta('name', 'description', description),
    `<link rel="canonical" href="${escapeHtml(url)}" data-static-seo>`,
    meta('property', 'og:site_name', SITE_NAME),
    meta('property', 'og:type', type),
    meta('property', 'og:locale', LOCALES[lang] || LOCALES.en),
    meta('property', 'og:title', shareTitle),
    meta('property', 'og:description', description),
    meta('property', 'og:url', url),
    meta('property', 'og:image', imageUrl),
    publishedTime && meta('property', 'article:published_time', publishedTime),
    type === 'article' && meta('property', 'article:author', AUTHOR),
    ...tags.map(tag => meta('property', 'article:tag', tag)),
    meta('name', 'twitter:card', image ? 'summary_large_image' : 'summary'),
    meta('name', 'twitter:title', shareTitle),
    meta('name', 'twitter:description', description),
    meta('name', 'twitter:image', imageUrl),
    structuredData && `<script type="application/ld+json" data-static-seo>${JSON.stringify(structuredData).replace(/</g, '\\u003c')}</script>`,
  ].filter(Boolean).join('');

  return template
    .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
    .replace(/<title[^>]*>[\s\S]*?<\/title>/, '')
    .replace(/<meta[^>]*name="description"[^>]*>/, '')
    .replace('</head>', `${tagsHtml}</head>`);
}

function write(file, html) {
  const target = path.join(buildDir, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, html);
}

write('index.html', renderPage({
  pagePath: '/',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description: SITE_DESCRIPTION,
    publisher: author,
  },
}));

write('about.html', renderPage({
  title: 'About',
  description: 'Who writes Bulta and what the blog covers.',
  pagePath: '/about',
}));

for (const article of articles) {
  const pagePath = `/article/${article.id}`;
  const lang = article.lang || 'en';
  write(`article/${article.id}.html`, renderPage({
    title: article.title,
    description: article.excerpt,
    pagePath,
    image: article.cover,
    type: 'article',
    publishedTime: article.timestamp || article.date,
    tags: article.categories,
    lang,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt,
      url: absolute(pagePath),
      mainEntityOfPage: absolute(pagePath),
      datePublished: article.timestamp || article.date,
      dateModified: article.updated || article.timestamp || article.date,
      inLanguage: lang,
      keywords: (article.categories || []).join(', '),
      image: article.cover ? absolute(article.cover) : DEFAULT_IMAGE,
      author,
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: DEFAULT_IMAGE },
      },
    },
  }));
}

console.log(`Wrote static pages for home, about and ${articles.length} articles.`);
