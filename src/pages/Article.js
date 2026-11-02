import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getArticles, getArticleContent } from '../utils/articles';
import { formatDate, readingMinutes } from '../utils/format';
import { slugify, textOf, stripTitleHeading, extractHeadings } from '../utils/markdown';
import { topicLabel, topicPath } from '../config/topics';
import { site } from '../config/site';
import ArticleCard from '../components/ArticleCard';
import BranchGraph from '../components/BranchGraph';
import CodeBlock from '../components/CodeBlock';
import Seo from '../components/Seo';
import { LinkIcon, LinkedInIcon, ShareIcon, CheckIcon, InfoIcon } from '../components/icons';
import './Article.css';

function Heading({ children }) {
  return <h2 id={slugify(textOf(children))}>{children}</h2>;
}

// A blockquote that starts with **Tip:** renders as the tip callout.
function isTip(node) {
  const paragraph = node?.children?.find(child => child.type === 'element');
  const first = paragraph?.children?.[0];
  return first?.tagName === 'strong' && /^tip:?$/i.test(first.children?.[0]?.value?.trim() || '');
}

const markdownComponents = {
  h1: Heading,
  h2: Heading,
  pre({ children }) {
    const code = React.Children.toArray(children)[0];
    const className = code?.props?.className || '';
    const language = className.replace(/^language-/, '');
    return <CodeBlock code={String(code?.props?.children ?? '').replace(/\n$/, '')} language={language} />;
  },
  table({ children }) {
    return (
      <div className="table-scroll">
        <table>{children}</table>
      </div>
    );
  },
  blockquote({ node, children }) {
    if (isTip(node)) {
      return (
        <div className="tip">
          <InfoIcon />
          <div>{children}</div>
        </div>
      );
    }
    return <blockquote>{children}</blockquote>;
  },
  a({ href, children }) {
    const external = /^https?:\/\//.test(href || '');
    return external
      ? <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
      : <a href={href}>{children}</a>;
  },
};

function Article() {
  const { id } = useParams();
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function loadArticle() {
      setLoading(true);
      setError(false);
      const all = await getArticles();
      const articleData = all.find(item => item.id === parseInt(id));
      const markdown = articleData && await getArticleContent(articleData.slug);

      if (!articleData || !markdown) {
        setError(true);
      } else {
        setArticles(all);
        setArticle(articleData);
        setContent(stripTitleHeading(markdown, articleData.title));
      }
      setLoading(false);
    }

    loadArticle();
  }, [id]);

  const headings = useMemo(() => extractHeadings(content), [content]);
  const activeId = useActiveHeading(headings);

  if (loading) {
    return <div className="article-status container">Loading article...</div>;
  }

  if (error || !article) {
    return (
      <div className="article-status container">
        <h1 className="article-title">Article not found</h1>
        <p className="article-lead">Sorry, the article you're looking for doesn't exist.</p>
        <Link to="/" className="button button--primary">Back to all articles</Link>
      </div>
    );
  }

  const primaryCategory = article.categories?.[0];
  const related = relatedArticles(article, articles);

  return (
    <div className="article-page">
      <Seo
        title={article.title}
        description={article.excerpt}
        path={`/article/${article.id}`}
        image={article.cover}
        type="article"
        publishedTime={article.timestamp || article.date}
      />
      <section className="article-header container">
        <div className="article-header-inner">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link to="/">Articles</Link>
            {primaryCategory && (
              <>
                <span aria-hidden="true">/</span>
                <Link to={topicPath(primaryCategory)}>{topicLabel(primaryCategory)}</Link>
              </>
            )}
          </nav>
          {article.categories?.length > 0 && (
            <div className="tags">
              {article.categories.map(category => <span key={category} className="tag">{category}</span>)}
            </div>
          )}
          <h1 className="article-title">{article.title}</h1>
          <p className="article-lead">{article.excerpt}</p>
          <div className="author-row">
            <div className="author-info">
              <span className="avatar" aria-hidden="true">{site.author.initial}</span>
              <div className="author-text">
                <span className="author-name">{site.author.name}</span>
                <span className="author-meta">
                  <time dateTime={article.date}>{formatDate(article.date)}</time> · {readingMinutes(content)} min read
                </span>
              </div>
            </div>
            <ShareButtons title={article.title} />
          </div>
        </div>
      </section>

      <CoverPanel article={article} />

      <section className="article-body container">
        {headings.length > 1 && (
          <aside className="toc" aria-label="On this page">
            <div className="toc-title">On this page</div>
            {headings.map(heading => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className={heading.id === activeId ? 'active' : undefined}
                aria-current={heading.id === activeId ? 'location' : undefined}
              >
                {heading.text}
              </a>
            ))}
          </aside>
        )}

        <article className="prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {content}
          </ReactMarkdown>

          <div className="author-card">
            <span className="avatar avatar--large" aria-hidden="true">{site.author.initial}</span>
            <div className="author-card-text">
              <div className="author-card-name">Written by {site.author.name}</div>
              <p>{site.author.bio}</p>
              <div className="author-card-links">
                <a href={site.links.youtube} target="_blank" rel="noopener noreferrer">YouTube</a>
                <a href={site.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={site.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </div>
          </div>
        </article>
      </section>

      {related.length > 0 && (
        <section className="related">
          <div className="related-inner container">
            <h2 className="related-title">Keep reading</h2>
            <div className="related-grid">
              {related.map(item => <ArticleCard key={item.id} article={item} compact />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function ShareButtons({ title }) {
  const [copied, setCopied] = useState(false);
  const url = window.location.href.split('#')[0];
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (error) {
        // The reader closed the share sheet.
      }
    } else {
      copyLink();
    }
  };

  return (
    <div className="share-buttons">
      <button type="button" className="icon-button" aria-label={copied ? 'Link copied' : 'Copy link'} onClick={copyLink}>
        {copied ? <CheckIcon /> : <LinkIcon />}
      </button>
      <a href={linkedInUrl} className="icon-button" aria-label="Share on LinkedIn" target="_blank" rel="noopener noreferrer">
        <LinkedInIcon />
      </a>
      <button type="button" className="icon-button" aria-label="Share" onClick={share}>
        <ShareIcon />
      </button>
      <span className="visually-hidden" aria-live="polite">{copied ? 'Link copied' : ''}</span>
    </div>
  );
}

// Ink panel with the article's cover image, or the branch diagram when
// the article sets "coverDiagram": "branches" in articles.json.
function CoverPanel({ article }) {
  if (!article.cover && article.coverDiagram !== 'branches') return null;

  return (
    <section className="cover container">
      <div className="cover-panel">
        {article.cover ? (
          <img src={article.cover} alt="" />
        ) : (
          <>
            <BranchGraph label="A main branch with feature, release and hotfix branches splitting off and merging back" />
            <div className="cover-legend">
              <span><span className="swatch swatch--main" />main</span>
              <span><span className="swatch swatch--feature" />feature/*</span>
              <span><span className="swatch swatch--experiment" />experiment</span>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

// Three other articles, those sharing a category first, then newest.
function relatedArticles(article, articles) {
  const shared = item => item.categories?.filter(cat => article.categories?.includes(cat)).length || 0;
  return articles
    .filter(item => item.id !== article.id)
    .sort((a, b) => shared(b) - shared(a) || new Date(b.date) - new Date(a.date))
    .slice(0, 3);
}

// Id of the last heading scrolled past, for the table of contents.
function useActiveHeading(headings) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (headings.length === 0) return undefined;
    let frame = null;

    const update = () => {
      frame = null;
      let current = headings[0].id;
      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (element && element.getBoundingClientRect().top <= 120) current = heading.id;
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [headings]);

  return activeId;
}

export default Article;
