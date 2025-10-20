---
title: Introduction to TypeScript
author: David Brown
date: 2025-10-05
excerpt: Discover how TypeScript can help you write more reliable and maintainable JavaScript code with static typing.
---

TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds optional static typing and other features that make development more productive.

## Why TypeScript?

TypeScript helps catch errors early during development, improves code quality, and makes refactoring easier. It's become increasingly popular in the JavaScript ecosystem.

### Benefits

- **Type Safety** - Catch errors at compile time
- **Better IDE Support** - Improved autocomplete and refactoring
- **Enhanced Readability** - Types serve as documentation
- **Modern Features** - Access to latest JavaScript features
- **Gradual Adoption** - Can be introduced incrementally

## Basic Types

TypeScript provides several basic types:

```typescript
// Primitives
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";

// Arrays
let list: number[] = [1, 2, 3];
let names: Array<string> = ["Alice", "Bob"];

// Tuple
let tuple: [string, number] = ["hello", 10];

// Enum
enum Color {
  Red,
  Green,
  Blue
}
let c: Color = Color.Green;

// Any (avoid when possible)
let notSure: any = 4;

// Void
function warnUser(): void {
  console.log("Warning!");
}

// Null and Undefined
let u: undefined = undefined;
let n: null = null;
```

## Interfaces

Interfaces define the structure of objects:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // optional property
  readonly createdAt: Date; // readonly property
}

function greetUser(user: User): string {
  return `Hello, ${user.name}!`;
}

const user: User = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  createdAt: new Date()
};
```

## Type Inference

TypeScript can often infer types automatically:

```typescript
let x = 3; // TypeScript infers x is a number
let y = "hello"; // TypeScript infers y is a string

function add(a: number, b: number) {
  return a + b; // Return type inferred as number
}
```

## Union Types

Variables can have multiple types:

```typescript
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}

printId(101); // OK
printId("202"); // OK
```

## Type Aliases

Create custom type names:

```typescript
type ID = number | string;
type User = {
  id: ID;
  name: string;
};

function getUser(id: ID): User {
  // Implementation
}
```

## Generics

Generics allow you to write reusable, type-safe code:

```typescript
function identity<T>(arg: T): T {
  return arg;
}

let output1 = identity<string>("myString");
let output2 = identity<number>(100);

// Generic interfaces
interface Box<T> {
  value: T;
}

let stringBox: Box<string> = { value: "hello" };
let numberBox: Box<number> = { value: 42 };
```

## Classes

TypeScript enhances JavaScript classes with type annotations:

```typescript
class Animal {
  private name: string;
  protected age: number;
  public species: string;

  constructor(name: string, age: number, species: string) {
    this.name = name;
    this.age = age;
    this.species = species;
  }

  public move(distance: number): void {
    console.log(`${this.name} moved ${distance}m.`);
  }

  protected getAge(): number {
    return this.age;
  }
}

class Dog extends Animal {
  constructor(name: string, age: number) {
    super(name, age, "Dog");
  }

  bark(): void {
    console.log("Woof! Woof!");
  }
}
```

## Utility Types

TypeScript provides built-in utility types:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// Partial - all properties optional
type PartialUser = Partial<User>;

// Required - all properties required
type RequiredUser = Required<User>;

// Pick - select specific properties
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit - exclude specific properties
type UserWithoutEmail = Omit<User, 'email'>;

// Readonly - make all properties readonly
type ReadonlyUser = Readonly<User>;
```

## Getting Started

Install TypeScript globally:

```bash
npm install -g typescript
```

Create a `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

Compile TypeScript files:

```bash
tsc myfile.ts
```

## Best Practices

1. **Enable strict mode** in tsconfig.json
2. **Avoid `any`** when possible - use `unknown` instead
3. **Use interfaces** for object shapes
4. **Leverage type inference** - don't over-annotate
5. **Use union types** instead of any
6. **Make use of utility types** for transformations
7. **Document with JSDoc** for better IDE support

## Conclusion

TypeScript is a powerful tool that enhances JavaScript development. Once you get used to it, you'll wonder how you ever lived without it. The initial learning curve pays off with fewer bugs, better code quality, and improved developer experience.
