import React, { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { getArticles, getArticleContent, getFeaturedArticle } from '../utils/articles';
import { readingMinutes } from '../utils/format';
import { scrollToHash } from '../utils/scroll';
import { TOPICS, topicLabel, topicPath } from '../config/topics';
import { site } from '../config/site';
import ArticleCard from '../components/ArticleCard';
import Seo, { websiteStructuredData } from '../components/Seo';
import BranchGraph from '../components/BranchGraph';
import { ArrowRightIcon, PlayIcon, YouTubeIcon } from '../components/icons';
import './Home.css';

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredMinutes, setFeaturedMinutes] = useState(null);
  const [searchParams] = useSearchParams();
  const { hash } = useLocation();
  const categoryFilter = searchParams.get('category')?.toLowerCase() || null;

  useEffect(() => {
    getArticles().then(data => {
      setArticles(data);
      setLoading(false);
    });
  }, []);

  const featured = getFeaturedArticle(articles);

  useEffect(() => {
    if (!featured) return;
    getArticleContent(featured.slug).then(markdown => {
      if (markdown) setFeaturedMinutes(readingMinutes(markdown));
    });
  }, [featured]);

  // #topics / #videos links arrive before the articles load; scroll once they render.
  useEffect(() => {
    if (!loading && hash) scrollToHash(hash);
  }, [loading, hash]);

  if (loading) {
    return <div className="home-loading container">Loading articles...</div>;
  }

  const filtered = categoryFilter
    ? articles.filter(article =>
        article.categories?.some(cat => cat.toLowerCase() === categoryFilter))
    : articles;
  const activeTopic = TOPICS.find(topic => topic.value === categoryFilter);
  const listHeading = categoryFilter
    ? `${activeTopic ? activeTopic.label : topicLabel(categoryFilter)} articles`
    : 'Latest articles';

  return (
    <div className="home">
      <Seo structuredData={websiteStructuredData} />
      <section className="hero container">
        <div className="hero-copy">
          <div className="eyebrow">Development · DevOps · AI</div>
          <h1 className="hero-title">Practical engineering, explained simply.</h1>
          <p className="hero-lead">
            Clear guides on the tools and ideas developers use every day, from Git workflows to AI,
            written by a working tech lead.
          </p>
          <div className="hero-actions">
            {articles[0] && (
              <Link to={`/article/${articles[0].id}`} className="button button--primary">
                Read the latest guide <ArrowRightIcon />
              </Link>
            )}
            <a href={site.links.youtube} className="button button--outline" target="_blank" rel="noopener noreferrer">
              <PlayIcon /> Watch on YouTube
            </a>
          </div>
        </div>

        {featured && <FeaturedCard article={featured} minutes={featuredMinutes} />}
      </section>

      <section id="topics" className="topics container" aria-label="Browse topics">
        <span className="topics-label">Browse topics</span>
        {TOPICS.map(topic => {
          const active = topic.value === categoryFilter;
          return (
            <Link
              key={topic.label}
              to={topic.value ? topicPath(topic.value) : '/'}
              className={`chip${active ? ' chip--active' : ''}`}
              aria-current={active ? 'page' : undefined}
            >
              {topic.label}
            </Link>
          );
        })}
      </section>

      <section className="latest container">
        <div className="latest-header">
          <h2 className="section-title">{listHeading}</h2>
          <Link to="/" className="latest-all">View all articles →</Link>
        </div>
        {filtered.length === 0 ? (
          <p className="latest-empty">No articles found in this topic yet.</p>
        ) : (
          <div className="article-grid">
            {filtered.map(article => <ArticleCard key={article.id} article={article} />)}
          </div>
        )}
      </section>

      <section id="videos" className="videos">
        <div className="videos-inner container">
          <div className="videos-copy">
            <div className="eyebrow">Prefer watching?</div>
            <h2 className="section-title">Learn it on video at @techbulta</h2>
            <p>
              Walkthroughs and explainers on the same topics, for when seeing it done is faster than
              reading about it.
            </p>
            <div className="videos-action">
              <a href={site.links.youtube} className="button button--dark" target="_blank" rel="noopener noreferrer">
                <YouTubeIcon /> Visit the channel
              </a>
            </div>
          </div>
          <div className="videos-grid">
            {site.videos.map(video => (
              <a
                key={video.title}
                href={video.id ? `https://www.youtube.com/watch?v=${video.id}` : site.links.youtube}
                className="video-thumb"
                target="_blank"
                rel="noopener noreferrer"
              >
                {video.id ? (
                  <img src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt={video.title} loading="lazy" />
                ) : (
                  video.title
                )}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function FeaturedCard({ article, minutes }) {
  const type = article.categories?.[0];
  const meta = [type, minutes && `${minutes} min read`].filter(Boolean).join(' · ');

  return (
    <Link to={`/article/${article.id}`} className="featured-card" aria-label={`Featured: ${article.title}`}>
      <div className="featured-terminal" aria-hidden="true">
        <span className="featured-dot" />
        <span className="featured-dot" />
        <span className="featured-dot" />
        <span className="featured-prompt">~/bulta $ git log --graph</span>
      </div>
      {article.cover ? <img className="featured-cover" src={article.cover} alt="" /> : <BranchGraph small />}
      <div className="featured-body">
        <div className="featured-meta">
          <span className="badge-featured">Featured</span>
          {meta && <span className="featured-type">{meta}</span>}
        </div>
        <div className="featured-title">{article.title}</div>
        <div className="featured-excerpt">{article.excerpt}</div>
      </div>
    </Link>
  );
}

export default Home;
