# My Blog App

A modern, markdown-based blog built with React. Write your articles in markdown and publish them easily.

## Features

- 📝 Markdown-based article management
- 🎨 Clean, modern UI with responsive design
- 🚀 Fast loading with React
- 📱 Mobile-friendly
- 🎯 Easy to deploy and host
- ✨ Syntax highlighting for code blocks

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone this repository (or you're already in it!)

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
blog_app/
├── public/
│   └── articles/          # Your blog articles
│       ├── articles.json  # Article metadata index
│       └── *.md          # Markdown article files
├── src/
│   ├── components/       # React components
│   │   └── Navbar.js
│   ├── pages/           # Page components
│   │   ├── Home.js
│   │   ├── Article.js
│   │   └── About.js
│   ├── utils/           # Utility functions
│   │   └── articles.js  # Article loading utilities
│   └── App.js           # Main app component
└── package.json
```

## Adding New Articles

See [HOW_TO_ADD_ARTICLES.md](./HOW_TO_ADD_ARTICLES.md) for detailed instructions.

**Quick steps:**

1. Create a markdown file in `public/articles/`
2. Add metadata to `public/articles/articles.json`
3. Your article will appear automatically!

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm run build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner

## Deploying Your Blog

This blog is perfect for static hosting services:

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Vercel will automatically deploy on every push
4. Add your custom domain in Vercel settings

### Option 2: Netlify

1. Push your code to GitHub
2. Connect your repository to [Netlify](https://netlify.com)
3. Build command: `npm run build`
4. Publish directory: `build`
5. Add your custom domain in Netlify settings

### Option 3: GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/blog_app",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```
3. Run: `npm run deploy`

## Customization

### Colors & Theme

Edit the gradient colors in:
- `src/components/Navbar.css` (navigation bar)
- `src/pages/Home.css` (hero section)
- `src/pages/About.css` (about page accents)

### Site Title & About

- Navigation title: `src/components/Navbar.js`
- Hero section: `src/pages/Home.js`
- About page content: `src/pages/About.js`

### Styling

All component styles are in their respective `.css` files:
- Global styles: `src/index.css`
- App container: `src/App.css`
- Individual pages: `src/pages/*.css`

## Technologies Used

- [React](https://reactjs.org/) - UI framework
- [React Router](https://reactrouter.com/) - Routing
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering
- [remark-gfm](https://github.com/remarkjs/remark-gfm) - GitHub Flavored Markdown support

## Tips for Success

1. **Write articles in markdown** - It's simple and portable
2. **Use descriptive slugs** - Good for SEO and URLs
3. **Keep excerpts concise** - 2-3 sentences work best
4. **Test locally first** - Always preview before deploying
5. **Use version control** - Commit articles to git
6. **Deploy automatically** - Connect to Vercel/Netlify for auto-deployment

## License

This project is open source and available under the MIT License.

## Support

Need help? Check out:
- [React Documentation](https://reactjs.org/docs)
- [Markdown Guide](https://www.markdownguide.org/)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)

---

Happy blogging! 📝
