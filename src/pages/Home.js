import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../utils/articles';
import coverImage from '../assets/cover_image.jpg';
import './Home.css';

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      const data = await getArticles();
      // Sort articles by date, most recent first
      const sortedArticles = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setArticles(sortedArticles);
      setLoading(false);
    }
    loadArticles();
  }, []);

  if (loading) {
    return (
      <div className="home">
        <div className="loading">Loading articles...</div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="hero" style={{ '--cover-image': `url(${coverImage})` }}>
        <div className="hero-content">
          <h1>Welcome to Bulta's Blog</h1>
          <p>Explore articles about Development, DevOps and AI</p>
        </div>
      </div>

      <div className="articles-container">
        <h2>Latest Articles</h2>
        <div className="articles-grid">
          {articles.map(article => (
            <article key={article.id} className="article-card">
              <div className="article-header">
                <h3>{article.title}</h3>
                <div className="article-meta">
                  <span className="author">{article.author}</span>
                  <span className="date">{new Date(article.date).toLocaleDateString()}</span>
                </div>
              </div>
              <p className="excerpt">{article.excerpt}</p>
              <Link to={`/article/${article.id}`} className="read-more">
                Read More →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
