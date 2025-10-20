export const articles = [
  {
    id: 1,
    title: "Getting Started with React",
    author: "John Doe",
    date: "2025-10-15",
    excerpt: "Learn the basics of React and how to build your first component. This comprehensive guide will walk you through everything you need to know.",
    content: `React is a powerful JavaScript library for building user interfaces. In this article, we'll explore the fundamental concepts that make React so popular among developers.

## What is React?

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".

## Key Concepts

### Components
Components are the building blocks of any React application. They let you split the UI into independent, reusable pieces.

### Props
Props (short for properties) are how you pass data from parent components to child components.

### State
State is used to store data that can change over time. When state changes, React re-renders the component.

## Getting Started

To create a new React app, you can use Create React App:

\`\`\`bash
npx create-react-app my-app
cd my-app
npm start
\`\`\`

This will set up a modern React development environment with no configuration required.

## Conclusion

React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.`
  },
  {
    id: 2,
    title: "Understanding JavaScript Async/Await",
    author: "Jane Smith",
    date: "2025-10-12",
    excerpt: "Dive deep into asynchronous JavaScript and master the async/await syntax for cleaner code.",
    content: `Asynchronous programming is essential in modern JavaScript development. The async/await syntax makes working with promises much more intuitive and readable.

## What is Async/Await?

Async/await is syntactic sugar built on top of promises. It allows you to write asynchronous code that looks and behaves like synchronous code.

## The async Keyword

When you put the \`async\` keyword before a function declaration, it becomes an async function that always returns a promise.

\`\`\`javascript
async function fetchData() {
  return "Hello World";
}
\`\`\`

## The await Keyword

The \`await\` keyword can only be used inside async functions. It makes JavaScript wait until the promise settles and returns its result.

\`\`\`javascript
async function getData() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return data;
}
\`\`\`

## Error Handling

Use try/catch blocks to handle errors in async functions:

\`\`\`javascript
async function fetchUserData() {
  try {
    const response = await fetch('/api/user');
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
}
\`\`\`

## Best Practices

1. Always handle errors with try/catch
2. Avoid using async/await in loops unnecessarily
3. Use Promise.all() for parallel operations
4. Don't forget to await your promises

Mastering async/await will make your JavaScript code cleaner and more maintainable.`
  },
  {
    id: 3,
    title: "CSS Grid Layout: A Complete Guide",
    author: "Mike Johnson",
    date: "2025-10-10",
    excerpt: "Master CSS Grid and create complex, responsive layouts with ease using this powerful layout system.",
    content: `CSS Grid is a powerful layout system that makes it easy to create complex, responsive web layouts. Let's explore how to use it effectively.

## Introduction to CSS Grid

CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay content out in rows and columns, making it perfect for creating complex layouts.

## Basic Grid Setup

To create a grid container, use \`display: grid\`:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 200px;
  gap: 10px;
}
\`\`\`

## Grid Template Areas

You can name grid areas and reference them in your layout:

\`\`\`css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
\`\`\`

## Responsive Grids

Use \`auto-fit\` and \`minmax()\` to create responsive grids:

\`\`\`css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
\`\`\`

## Grid vs Flexbox

- Use Grid for two-dimensional layouts (rows AND columns)
- Use Flexbox for one-dimensional layouts (rows OR columns)

## Conclusion

CSS Grid is an incredibly powerful tool for creating layouts. Once you understand the basics, you'll find it indispensable for modern web design.`
  },
  {
    id: 4,
    title: "Building RESTful APIs with Node.js",
    author: "Sarah Williams",
    date: "2025-10-08",
    excerpt: "Learn how to design and implement robust RESTful APIs using Node.js and Express framework.",
    content: `Building APIs is a fundamental skill for modern web developers. In this guide, we'll create a RESTful API using Node.js and Express.

## What is a RESTful API?

REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use HTTP requests to perform CRUD operations.

## Setting Up Express

First, install Express:

\`\`\`bash
npm install express
\`\`\`

Create a basic server:

\`\`\`javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});
\`\`\`

## Creating Routes

Define routes for different HTTP methods:

\`\`\`javascript
// GET all items
app.get('/api/items', (req, res) => {
  res.json({ items: [] });
});

// GET single item
app.get('/api/items/:id', (req, res) => {
  const { id } = req.params;
  res.json({ id, name: 'Item' });
});

// POST new item
app.post('/api/items', (req, res) => {
  const newItem = req.body;
  res.status(201).json(newItem);
});

// PUT update item
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  res.json({ id, ...updates });
});

// DELETE item
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  res.status(204).send();
});
\`\`\`

## Best Practices

1. Use proper HTTP status codes
2. Version your API (e.g., /api/v1/)
3. Implement error handling middleware
4. Use environment variables for configuration
5. Add request validation
6. Implement rate limiting
7. Document your API

## Conclusion

RESTful APIs are the backbone of modern web applications. With Node.js and Express, you can build powerful, scalable APIs quickly and efficiently.`
  },
  {
    id: 5,
    title: "Introduction to TypeScript",
    author: "David Brown",
    date: "2025-10-05",
    excerpt: "Discover how TypeScript can help you write more reliable and maintainable JavaScript code with static typing.",
    content: `TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing and other features that make development more productive.

## Why TypeScript?

TypeScript helps catch errors early during development, improves code quality, and makes refactoring easier. It's become increasingly popular in the JavaScript ecosystem.

## Basic Types

TypeScript provides several basic types:

\`\`\`typescript
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];
let tuple: [string, number] = ["hello", 10];
\`\`\`

## Interfaces

Interfaces define the structure of objects:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // optional property
}

function greetUser(user: User) {
  console.log(\`Hello, \${user.name}!\`);
}
\`\`\`

## Type Inference

TypeScript can often infer types automatically:

\`\`\`typescript
let x = 3; // TypeScript infers x is a number
let y = "hello"; // TypeScript infers y is a string
\`\`\`

## Generics

Generics allow you to write reusable, type-safe code:

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
\`\`\`

## Classes

TypeScript enhances JavaScript classes with type annotations:

\`\`\`typescript
class Animal {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  public move(distance: number): void {
    console.log(\`\${this.name} moved \${distance}m.\`);
  }
}
\`\`\`

## Getting Started

Install TypeScript globally:

\`\`\`bash
npm install -g typescript
\`\`\`

Create a tsconfig.json file and start writing TypeScript!

## Conclusion

TypeScript is a powerful tool that enhances JavaScript development. Once you get used to it, you'll wonder how you ever lived without it.`
  }
];
