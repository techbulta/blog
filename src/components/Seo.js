import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { site } from '../config/site';

const DEFAULT_IMAGE = `${site.url}/logo512.png`;
const LOCALES = { en: 'en_US', si: 'si_LK' };

function absolute(url) {
  return /^https?:\/\//.test(url) ? url : `${site.url}${url.startsWith('/') ? '' : '/'}${url}`;
}

// Per-page <title>, description, canonical URL, Open Graph and Twitter tags,
// plus JSON-LD structured data. scripts/prerender-pages.js writes the same
// tags into the static HTML for crawlers that don't run JavaScript.
function Seo({
  title,
  description = site.description,
  path = '/',
  image,
  type = 'website',
  publishedTime,
  tags = [],
  lang = 'en',
  noindex = false,
  structuredData,
}) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | Practical engineering, explained simply`;
  const url = absolute(path);
  const imageUrl = image ? absolute(image) : DEFAULT_IMAGE;

  // The static HTML carries its own copy of these tags (marked data-static-seo).
  // React 19 adds Helmet's tags alongside them, so drop the static ones.
  useEffect(() => {
    document.head.querySelectorAll('[data-static-seo]').forEach(element => element.remove());
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex" />}

      <meta property="og:site_name" content={site.name} />
      <meta property="og:type" content={type} />
      <meta property="og:locale" content={LOCALES[lang] || LOCALES.en} />
      <meta property="og:title" content={title || fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {type === 'article' && <meta property="article:author" content={site.author.name} />}
      {tags.map(tag => <meta key={tag} property="article:tag" content={tag} />)}

      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title || fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {structuredData && (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      )}
    </Helmet>
  );
}

// schema.org BlogPosting for an article page.
export function articleStructuredData(article) {
  const url = `${site.url}/article/${article.id}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    url,
    mainEntityOfPage: url,
    datePublished: article.timestamp || article.date,
    dateModified: article.updated || article.timestamp || article.date,
    inLanguage: article.lang || 'en',
    keywords: (article.categories || []).join(', '),
    image: article.cover ? absolute(article.cover) : DEFAULT_IMAGE,
    author: { '@type': 'Person', name: site.author.name, url: `${site.url}/about` },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
      logo: { '@type': 'ImageObject', url: DEFAULT_IMAGE },
    },
  };
}

// schema.org WebSite for the home page.
export const websiteStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: site.name,
  url: `${site.url}/`,
  description: site.description,
  publisher: { '@type': 'Person', name: site.author.name, url: `${site.url}/about` },
};

export default Seo;
