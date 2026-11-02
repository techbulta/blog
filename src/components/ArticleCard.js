import React from 'react';
import { Link } from 'react-router-dom';
import { topicLabel } from '../config/topics';
import { formatDate } from '../utils/format';
import './ArticleCard.css';

// The whole card is one link. `compact` drops the thumbnail and excerpt
// (used for "Keep reading" on the article page).
function ArticleCard({ article, compact = false }) {
  const topic = article.categories?.length ? topicLabel(article.categories[0]) : null;

  return (
    <Link to={`/article/${article.id}`} className={`article-card${compact ? ' article-card--compact' : ''}`}>
      {!compact && (
        <div className="article-card-thumb" aria-hidden="true">
          {article.cover ? <img src={article.cover} alt="" loading="lazy" /> : article.glyph}
        </div>
      )}
      {topic && <div className="eyebrow eyebrow--sm">{topic}</div>}
      <h3 className="article-card-title">{article.title}</h3>
      {!compact && <p className="article-card-excerpt">{article.excerpt}</p>}
      <div className="article-card-date">{formatDate(article.date)}</div>
    </Link>
  );
}

export default ArticleCard;
