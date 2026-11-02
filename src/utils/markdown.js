import { Children, isValidElement } from 'react';

// "GitHub Flow: Speed & Simplicity" -> "github-flow-speed-simplicity" (keeps Sinhala letters).
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}

// Plain text of rendered heading children (they may contain <code>, <strong>, ...).
export function textOf(children) {
  return Children.toArray(children)
    .map(child => (isValidElement(child) ? textOf(child.props.children) : String(child)))
    .join('');
}

// Remove a leading # or ## heading when it repeats the article title.
export function stripTitleHeading(markdown, title) {
  const match = markdown.match(/^\s*#{1,2}\s+(.+?)\s*\r?\n/);
  if (match && slugify(match[1]) === slugify(title)) {
    return markdown.slice(match[0].length);
  }
  return markdown;
}

// Table of contents entries for every # and ## heading (# is rendered as h2,
// so the article title stays the only h1). Skips fenced code blocks.
export function extractHeadings(markdown) {
  const headings = [];
  let inFence = false;
  for (const line of markdown.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    const match = !inFence && line.match(/^#{1,2}\s+(.+?)\s*#*\s*$/);
    if (match) {
      const text = match[1].replace(/[*_`]/g, '');
      headings.push({ id: slugify(text), text });
    }
  }
  return headings;
}
