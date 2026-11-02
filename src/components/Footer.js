import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { site } from '../config/site';
import './Footer.css';

// `compact` is the article-page footer: the legal bar only, plus YouTube and RSS.
function Footer({ compact = false }) {
  const year = new Date().getFullYear();

  const legal = (
    <div className="footer-legal">
      <span>© {year} Bulta</span>
      <div className="footer-legal-links">
        {compact && <a href={site.links.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>}
        {compact && <a href={site.links.rss}>RSS</a>}
        {/* TODO: add Privacy and Terms pages. */}
        <Link to="/privacy">Privacy</Link>
        <Link to="/terms">Terms</Link>
      </div>
    </div>
  );

  if (compact) {
    return (
      <footer className="site-footer">
        <div className="container footer-compact">{legal}</div>
      </footer>
    );
  }

  return (
    <footer className="site-footer">
      <div className="container footer-full">
        <div className="footer-columns">
          <div className="footer-brand">
            <Logo small />
            <p>{site.description}</p>
          </div>
          <div className="footer-column">
            <h2 className="footer-heading">Read</h2>
            <Link to="/">All articles</Link>
            <Link to="/?category=guide">Guides</Link>
            <Link to="/?category=basic">Basics</Link>
          </div>
          <div className="footer-column">
            <h2 className="footer-heading">Follow</h2>
            <a href={site.links.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href={site.links.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href={site.links.rss}>RSS feed</a>
          </div>
          <div className="footer-column">
            <h2 className="footer-heading">Bulta</h2>
            <Link to="/about">About</Link>
            <Link to="/about#contact">Contact</Link>
            <a href="#subscribe">Newsletter</a>
          </div>
        </div>
        {legal}
      </div>
    </footer>
  );
}

export default Footer;
