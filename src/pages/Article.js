import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getArticleById, getArticleContent } from '../utils/articles';
import './Article.css';

function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadArticle() {
      try {
        setLoading(true);
        const articleData = await getArticleById(id);

        if (!articleData) {
          setError(true);
          setLoading(false);
          return;
        }

        setArticle(articleData);
        const markdownContent = await getArticleContent(articleData.slug);

        if (!markdownContent) {
          setError(true);
          setLoading(false);
          return;
        }

        // Remove frontmatter from markdown content
        const contentWithoutFrontmatter = markdownContent.replace(/^---[\s\S]*?---\n/, '');
        setContent(contentWithoutFrontmatter);
        setLoading(false);
      } catch (err) {
        console.error('Error loading article:', err);
        setError(true);
        setLoading(false);
      }
    }

    loadArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="article-page">
        <div className="loading">Loading article...</div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="article-page">
        <div className="not-found">
          <h1>Article Not Found</h1>
          <p>Sorry, the article you're looking for doesn't exist.</p>
          <Link to="/" className="back-link">← Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="article-page">
      <Link to="/" className="back-link">← Back to Home</Link>

      <article className="article-content">
        <header className="article-header">
          <h1>{article.title}</h1>
          <div className="article-meta">
            <span className="author">{article.author}</span>
            <span className="date">{new Date(article.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</span>
          </div>
        </header>

        <div className="article-body markdown-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </article>

      <div className="article-footer">
        <Link to="/" className="back-link-bottom">← Back to All Articles</Link>
      </div>
    </div>
  );
}

export default Article;
