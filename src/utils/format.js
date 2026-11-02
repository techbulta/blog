const WORDS_PER_MINUTE = 230;

// "2025-10-26" -> "Oct 26, 2025". Parsed as a local date so it never shifts a day.
export function formatDate(isoDate) {
  const [year, month, day] = isoDate.slice(0, 10).split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function readingMinutes(markdown) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
