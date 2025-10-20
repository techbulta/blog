# How to Add New Articles to Your Blog

This guide explains how to add new blog articles using markdown files.

## Quick Start

To add a new article, you need to do two things:
1. Create a markdown file in `public/articles/`
2. Add an entry to `public/articles/articles.json`

## Step-by-Step Guide

### 1. Create a Markdown File

Create a new `.md` file in the `public/articles/` directory. The filename should be in kebab-case (lowercase with hyphens).

Example: `my-new-article.md`

```markdown
---
title: Your Article Title
author: Your Name
date: 2025-10-19
excerpt: A brief summary of your article that will appear on the home page.
---

Your article content starts here...

## Section Heading

Write your content using standard markdown syntax.

### Subsection

- Bullet points work
- As expected

Code blocks are supported:

\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

And more markdown features!
```

### 2. Update the Articles Index

Open `public/articles/articles.json` and add a new entry for your article:

```json
{
  "id": 6,
  "slug": "my-new-article",
  "title": "Your Article Title",
  "author": "Your Name",
  "date": "2025-10-19",
  "excerpt": "A brief summary of your article that will appear on the home page."
}
```

**Important:**
- The `id` must be unique and incrementing
- The `slug` must match your markdown filename (without the `.md` extension)
- The `date` should be in YYYY-MM-DD format

### 3. Test Your Article

1. The development server will automatically reload
2. Visit http://localhost:3000 to see your new article on the home page
3. Click on it to read the full article

## Markdown Syntax Guide

### Headings
```markdown
## Heading 2
### Heading 3
```

### Text Formatting
```markdown
**Bold text**
*Italic text*
`inline code`
```

### Links
```markdown
[Link text](https://example.com)
```

### Images
```markdown
![Alt text](image-url.jpg)
```

### Lists
```markdown
- Unordered list item
- Another item

1. Ordered list item
2. Another item
```

### Code Blocks
````markdown
```javascript
const greeting = "Hello";
console.log(greeting);
```
````

### Blockquotes
```markdown
> This is a blockquote
```

### Tables
```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

## Publishing Your Blog

When you're ready to publish:

1. **Build the production version:**
   ```bash
   npm run build
   ```

2. **Deploy to your hosting service** (Vercel, Netlify, etc.)
   - Simply push your changes to GitHub
   - Your hosting service will automatically rebuild and deploy

3. **Your new article will be live!**

## Tips

- Keep your markdown filenames and slugs consistent
- Use descriptive excerpts (2-3 sentences)
- Test locally before deploying
- Add images to the `public/images/` folder and reference them as `/images/your-image.jpg`
- Keep article IDs sequential to avoid conflicts

## Example Article Structure

Here's a complete example of a well-structured article:

```markdown
---
title: Getting Started with Web Development
author: Jane Doe
date: 2025-10-19
excerpt: A beginner-friendly guide to starting your journey in web development. Learn about HTML, CSS, and JavaScript basics.
---

Web development is an exciting field that combines creativity with technical skills. In this article, we'll explore the fundamentals you need to get started.

## What You'll Need

Before diving into web development, you'll need:

- A text editor (VS Code, Sublime Text, etc.)
- A web browser (Chrome, Firefox, etc.)
- Basic understanding of how websites work

## The Three Pillars

### HTML - Structure

HTML provides the structure of your webpage.

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Hello, World!</h1>
  </body>
</html>
\`\`\`

### CSS - Styling

CSS makes your pages beautiful.

\`\`\`css
h1 {
  color: blue;
  font-size: 2rem;
}
\`\`\`

### JavaScript - Interactivity

JavaScript adds interactivity to your pages.

\`\`\`javascript
document.querySelector('h1').addEventListener('click', () => {
  alert('Hello!');
});
\`\`\`

## Conclusion

You're now ready to start your web development journey! Practice regularly and build projects to improve your skills.
```

## Troubleshooting

**Article not showing up?**
- Check that you added the entry to `articles.json`
- Verify the slug matches the filename
- Make sure the ID is unique

**Markdown not rendering correctly?**
- Check your frontmatter syntax (must be between `---`)
- Ensure proper markdown formatting
- Look at existing articles for reference

**Need help?**
- Refer to the existing articles in `public/articles/` as examples
- Check the [Markdown Guide](https://www.markdownguide.org/) for syntax help
