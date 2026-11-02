// Topic chips on the home page. `value` is the category name used in
// articles.json and in the ?category= URL parameter (lowercase).
export const TOPICS = [
  { label: 'All', value: null },
  { label: 'Development', value: 'software engineering' },
  { label: 'DevOps', value: 'devops' },
  { label: 'AI', value: 'ai' },
  { label: 'Basics', value: 'basic' },
  { label: 'Guides', value: 'guide' },
];

// Display label for a category from the article data, e.g. "Basic" -> "Basics".
export function topicLabel(category) {
  const topic = TOPICS.find(t => t.value === category.toLowerCase());
  return topic ? topic.label : category;
}

export function topicPath(category) {
  return `/?category=${encodeURIComponent(category.toLowerCase())}`;
}
