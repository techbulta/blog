---
title: Building RESTful APIs with Node.js
author: Sarah Williams
date: 2025-10-08
excerpt: Learn how to design and implement robust RESTful APIs using Node.js and Express framework.
---

Building APIs is a fundamental skill for modern web developers. In this guide, we'll create a RESTful API using Node.js and Express.

## What is a RESTful API?

REST (Representational State Transfer) is an architectural style for designing networked applications. RESTful APIs use HTTP requests to perform CRUD operations:

- **Create** - POST
- **Read** - GET
- **Update** - PUT/PATCH
- **Delete** - DELETE

## Setting Up Express

First, install Express:

```bash
npm install express
```

Create a basic server:

```javascript
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
```

## Creating Routes

Define routes for different HTTP methods:

```javascript
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
```

## Middleware

Add middleware for common tasks:

```javascript
// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
```

## Request Validation

Validate incoming data:

```javascript
const validateItem = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'Invalid name' });
  }

  if (!price || typeof price !== 'number') {
    return res.status(400).json({ error: 'Invalid price' });
  }

  next();
};

app.post('/api/items', validateItem, (req, res) => {
  // Handle valid request
});
```

## HTTP Status Codes

Use appropriate status codes:

- **200** - OK (successful GET, PUT, PATCH, DELETE)
- **201** - Created (successful POST)
- **204** - No Content (successful DELETE with no response body)
- **400** - Bad Request (validation error)
- **401** - Unauthorized (authentication required)
- **403** - Forbidden (insufficient permissions)
- **404** - Not Found (resource doesn't exist)
- **500** - Internal Server Error (server error)

## Best Practices

1. **Use proper HTTP status codes** for all responses
2. **Version your API** (e.g., `/api/v1/`)
3. **Implement error handling** middleware
4. **Use environment variables** for configuration
5. **Add request validation** for all endpoints
6. **Implement rate limiting** to prevent abuse
7. **Document your API** using tools like Swagger
8. **Use consistent naming** conventions
9. **Implement pagination** for large datasets
10. **Add authentication and authorization**

## Example with Database

Here's a more realistic example with a database:

```javascript
const express = require('express');
const app = express();

app.use(express.json());

// Simulated database
let items = [];
let nextId = 1;

app.get('/api/items', (req, res) => {
  res.json({ items });
});

app.post('/api/items', (req, res) => {
  const newItem = {
    id: nextId++,
    ...req.body,
    createdAt: new Date()
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
});
```

## Conclusion

RESTful APIs are the backbone of modern web applications. With Node.js and Express, you can build powerful, scalable APIs quickly and efficiently. Follow best practices, handle errors properly, and your API will be robust and maintainable.
