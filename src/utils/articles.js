// Fetch the list of all articles, newest first
export async function getArticles() {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/articles/articles.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    const articles = await response.json();
    return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    console.error('Error loading articles:', error);
    return [];
  }
}

// Fetch a single article's markdown content, without its frontmatter
export async function getArticleContent(slug) {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/articles/${slug}.md`);
    if (!response.ok) {
      throw new Error(`Failed to fetch article: ${slug}`);
    }
    const markdown = await response.text();
    return markdown.replace(/^---[\s\S]*?---\r?\n/, '');
  } catch (error) {
    console.error(`Error loading article ${slug}:`, error);
    return null;
  }
}

// Get article metadata by ID
export async function getArticleById(id) {
  const articles = await getArticles();
  return articles.find(article => article.id === parseInt(id));
}

// The hero article: the one flagged `featured`, otherwise the newest.
export function getFeaturedArticle(articles) {
  return articles.find(article => article.featured) || articles[0];
}

// Fetch the list of categories
export async function getCategories() {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL}/categories.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    const categories = await response.json();
    // Sort by order field
    return categories.sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error loading categories:', error);
    return [];
  }
}
