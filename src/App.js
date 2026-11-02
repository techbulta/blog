import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NewsletterBanner from './components/NewsletterBanner';
import Home from './pages/Home';
import Article from './pages/Article';
import About from './pages/About';
import { scrollToHash } from './utils/scroll';
import './App.css';

function Layout() {
  const { pathname, hash } = useLocation();
  const isArticle = pathname.startsWith('/article/');

  // Jump to #section links (or the top of the page) on navigation.
  useEffect(() => {
    if (hash) {
      scrollToHash(hash);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <NewsletterBanner variant={isArticle ? 'article' : 'home'} />
      </main>
      <Footer compact={isArticle} />
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Layout />
      </Router>
    </HelmetProvider>
  );
}

export default App;
