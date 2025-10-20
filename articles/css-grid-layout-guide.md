---
title: CSS Grid Layout: A Complete Guide
author: Mike Johnson
date: 2025-10-10
excerpt: Master CSS Grid and create complex, responsive layouts with ease using this powerful layout system.
---

CSS Grid is a powerful layout system that makes it easy to create complex, responsive web layouts. Let's explore how to use it effectively.

## Introduction to CSS Grid

CSS Grid Layout is a two-dimensional layout system for the web. It lets you lay content out in rows and columns, making it perfect for creating complex layouts.

## Basic Grid Setup

To create a grid container, use `display: grid`:

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px 200px;
  gap: 10px;
}
```

## Grid Template Columns and Rows

Define your grid structure using various units:

```css
.container {
  /* Fixed widths */
  grid-template-columns: 200px 200px 200px;

  /* Fractional units */
  grid-template-columns: 1fr 2fr 1fr;

  /* Mix of units */
  grid-template-columns: 200px 1fr auto;

  /* Repeat function */
  grid-template-columns: repeat(3, 1fr);
}
```

## Grid Template Areas

You can name grid areas and reference them in your layout:

```css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  gap: 10px;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

## Responsive Grids

Use `auto-fit` and `minmax()` to create responsive grids:

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
```

This creates a grid that automatically adjusts the number of columns based on available space.

## Grid Gap

Control spacing between grid items:

```css
.container {
  gap: 20px; /* Both row and column gap */
  row-gap: 20px; /* Only row gap */
  column-gap: 10px; /* Only column gap */
}
```

## Positioning Items

Place items explicitly in the grid:

```css
.item {
  grid-column: 1 / 3; /* Span from column 1 to 3 */
  grid-row: 1 / 2; /* Span from row 1 to 2 */

  /* Or use shorthand */
  grid-area: 1 / 1 / 2 / 3; /* row-start / col-start / row-end / col-end */
}
```

## Grid vs Flexbox

When to use which:

- **Use Grid** for two-dimensional layouts (rows AND columns)
- **Use Flexbox** for one-dimensional layouts (rows OR columns)
- **Use both** - they work great together!

## Practical Example

Here's a complete responsive layout:

```css
.page {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 200px;
  gap: 20px;
  padding: 20px;
}

.featured {
  grid-column: 1 / -1; /* Span all columns */
  grid-row: span 2; /* Span 2 rows */
}
```

## Conclusion

CSS Grid is an incredibly powerful tool for creating layouts. Once you understand the basics, you'll find it indispensable for modern web design. It provides precise control over both rows and columns, making complex layouts simple to implement.
