---
title: Getting Started with React
author: John Doe
date: 2025-10-15
excerpt: Learn the basics of React and how to build your first component. This comprehensive guide will walk you through everything you need to know.
---

React is a powerful JavaScript library for building user interfaces. In this article, we'll explore the fundamental concepts that make React so popular among developers.

## What is React?

React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".

## Key Concepts

### Components

Components are the building blocks of any React application. They let you split the UI into independent, reusable pieces.

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

### Props

Props (short for properties) are how you pass data from parent components to child components.

```javascript
function App() {
  return <Welcome name="Sarah" />;
}
```

### State

State is used to store data that can change over time. When state changes, React re-renders the component.

```javascript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

## Getting Started

To create a new React app, you can use Create React App:

```bash
npx create-react-app my-app
cd my-app
npm start
```

This will set up a modern React development environment with no configuration required.

## Component Lifecycle

React components go through several lifecycle phases:

1. **Mounting** - Component is being created and inserted into the DOM
2. **Updating** - Component is being re-rendered due to changes in props or state
3. **Unmounting** - Component is being removed from the DOM

## Hooks

React Hooks let you use state and other React features without writing a class:

- `useState` - Add state to function components
- `useEffect` - Perform side effects in function components
- `useContext` - Access context values
- `useRef` - Create mutable references

```javascript
import { useEffect } from 'react';

function Example() {
  useEffect(() => {
    document.title = 'You clicked';
  }, []);
}
```

## Conclusion

React makes it painless to create interactive UIs. Design simple views for each state in your application, and React will efficiently update and render just the right components when your data changes.
