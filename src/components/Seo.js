import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { site } from '../config/site';

const DEFAULT_IMAGE = `${site.url}/logo512.png`;

function absolute(url) {
  return /^https?:\/\//.test(url) ? url : `${site.url}${url.startsWith('/') ? '' : '/'}${url}`;
}

// Per-page <title>, description, canonical URL, Open Graph and Twitter tags.
function Seo({ title, description = site.description, path = '/', image, type = 'website', publishedTime }) {
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | Practical engineering, explained simply`;
  const url = absolute(path);
  const imageUrl = image ? absolute(image) : DEFAULT_IMAGE;

  // index.html keeps a fallback title and description for crawlers that don't
  // run JavaScript. React 19 adds these tags alongside them, so drop the fallbacks.
  useEffect(() => {
    document.head.querySelectorAll('[data-static-seo]').forEach(element => element.remove());
  }, []);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:site_name" content={site.name} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}

      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title || fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}

export default Seo;
