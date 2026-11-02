import React, { useState, useEffect, useRef, useId } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getArticles } from '../utils/articles';
import Logo from './Logo';
import { SearchIcon, MenuIcon, CloseIcon } from './icons';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Articles', to: '/' },
  { label: 'Topics', to: '/#topics' },
  { label: 'Videos', to: '/#videos' },
  { label: 'About', to: '/about' },
];

function isActive(link, location) {
  if (link.label === 'Articles') {
    return (location.pathname === '/' && !location.hash) || location.pathname.startsWith('/article/');
  }
  if (link.label === 'About') return location.pathname === '/about';
  return location.pathname === '/' && location.hash === link.to.slice(1);
}

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Close both panels whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search, location.hash]);

  const links = NAV_LINKS.map(link => (
    <Link
      key={link.label}
      to={link.to}
      className={`nav-link${isActive(link, location) ? ' active' : ''}`}
      aria-current={isActive(link, location) ? 'page' : undefined}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Main">
        <Link to="/" className="nav-logo" aria-label="Bulta home">
          <Logo />
        </Link>
        <div className="nav-links">{links}</div>
        <div className="nav-actions">
          <button
            type="button"
            className="icon-button"
            aria-label="Search articles"
            aria-expanded={searchOpen}
            aria-controls="site-search"
            onClick={() => { setSearchOpen(open => !open); setMenuOpen(false); }}
          >
            {searchOpen ? <CloseIcon /> : <SearchIcon />}
          </button>
          <a href="#subscribe" className="nav-subscribe">Subscribe</a>
          <button
            type="button"
            className="icon-button nav-menu-button"
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => { setMenuOpen(open => !open); setSearchOpen(false); }}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="mobile-menu container">
          {links}
          <a href="#subscribe" className="nav-link" onClick={() => setMenuOpen(false)}>Subscribe</a>
        </div>
      )}

      {searchOpen && <SearchPanel onClose={() => setSearchOpen(false)} />}
    </header>
  );
}

function SearchPanel({ onClose }) {
  const inputId = useId();
  const inputRef = useRef(null);
  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    inputRef.current?.focus();
    getArticles().then(setArticles);
  }, []);

  const trimmed = query.trim().toLowerCase();
  const results = trimmed
    ? articles.filter(article => article.title.toLowerCase().includes(trimmed))
    : [];

  return (
    <div
      id="site-search"
      className="search-panel container"
      role="search"
      onKeyDown={event => { if (event.key === 'Escape') onClose(); }}
    >
      <label htmlFor={inputId} className="visually-hidden">Search articles</label>
      <input
        id={inputId}
        ref={inputRef}
        type="search"
        className="search-input"
        placeholder="Search articles"
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      {trimmed && (
        results.length > 0 ? (
          <ul className="search-results">
            {results.map(article => (
              <li key={article.id}>
                <Link to={`/article/${article.id}`} className="search-result">{article.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="search-empty" aria-live="polite">No articles match "{query.trim()}".</p>
        )
      )}
    </div>
  );
}

export default Navbar;
