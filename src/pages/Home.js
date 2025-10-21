import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getArticles } from '../utils/articles';
import coverImage from '../assets/cover_image.jpg';
import './Home.css';

function Home() {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');

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

  useEffect(() => {
    if (categoryFilter) {
      // Filter articles by category
      const filtered = articles.filter(article =>
        article.categories &&
        article.categories.some(cat => cat.toLowerCase() === categoryFilter.toLowerCase())
      );
      setFilteredArticles(filtered);
    } else {
      setFilteredArticles(articles);
    }
  }, [articles, categoryFilter]);

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
        <h2>
          {categoryFilter
            ? `${categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)} Articles`
            : 'Latest Articles'}
        </h2>
        {filteredArticles.length === 0 ? (
          <div className="no-articles">
            <p>No articles found in this category.</p>
          </div>
        ) : (
          <div className="articles-grid">
            {filteredArticles.map(article => (
            <article key={article.id} className="article-card">
              <div className="article-header">
                <h3>{article.title}</h3>
                <div className="article-meta">
                  <span className="author">{article.author}</span>
                  <span className="date">{new Date(article.date).toLocaleDateString()}</span>
                </div>
              </div>
              {article.categories && article.categories.length > 0 && (
                <div className="categories">
                  {article.categories.map(category => (
                    <Link
                      key={category}
                      to={`/?category=${category.toLowerCase()}`}
                      className="category-badge"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
              <p className="excerpt">{article.excerpt}</p>
              <Link to={`/article/${article.id}`} className="read-more">
                Read More →
              </Link>
            </article>
          ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
