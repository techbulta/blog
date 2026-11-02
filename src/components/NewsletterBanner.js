import React, { useId, useState } from 'react';
import { site } from '../config/site';
import './NewsletterBanner.css';

const COPY = {
  home: {
    heading: 'Get new guides in your inbox',
    text: 'One email when a new article is out. No spam, unsubscribe anytime.',
  },
  article: {
    heading: 'Liked this guide?',
    text: 'Get the next one in your inbox. One email per new article.',
  },
};

function NewsletterBanner({ variant = 'home' }) {
  const inputId = useId();
  const [status, setStatus] = useState('');
  const copy = COPY[variant];
  const endpoint = site.newsletterEndpoint;

  const handleSubmit = (event) => {
    // TODO: pick a newsletter provider and set REACT_APP_NEWSLETTER_ENDPOINT.
    if (!endpoint) {
      event.preventDefault();
      setStatus('Newsletter sign-up is coming soon.');
    }
  };

  return (
    <section id="subscribe" className={`newsletter newsletter--${variant} container`}>
      <div className="newsletter-card">
        <div className="newsletter-copy">
          <h2>{copy.heading}</h2>
          <p>{copy.text}</p>
        </div>
        <form className="newsletter-form" action={endpoint || undefined} method="post" onSubmit={handleSubmit}>
          <label htmlFor={inputId} className="visually-hidden">Email address</label>
          <input id={inputId} name="email" type="email" required placeholder="you@example.com" autoComplete="email" />
          <button type="submit">Subscribe</button>
          <p className="newsletter-status" aria-live="polite">{status}</p>
        </form>
      </div>
    </section>
  );
}

export default NewsletterBanner;
