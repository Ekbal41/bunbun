# Bunbun.js

[![](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![npm](https://img.shields.io/npm/v/bunbunjs.svg)](https://www.npmjs.com/package/bunbunjs)
[![npm](https://img.shields.io/npm/l/bunbunjs.svg)](https://spdx.org/licenses/MIT)
[![npm](https://img.shields.io/npm/dt/bunbunjs.svg)](<[![npm](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/package/bunbunjs)>)

A fast, minimalist web framework for the [Bun JavaScript runtime](https://bun.sh/).

## Table of Contents

- [Install](#install)
- [Usage](#usage)
  - [Examples](#examples)
  - [Middleware](#middleware)
- [License](#license)

## Install

You must first install [Bun](https://bun.sh/) and use it to run your server.
To install Bunbun.js, in your project directory, run `bun add bunbunjs`

## Usage

```typescript
import Bunbun from "bunbunjs";

const app = new Bunbun();

app.get("/", (c) => {
  return c.text("Hello World");
});

const server = app.listen();
console.log(`Server listening on ${server.hostname}:${server.port}`);
```

### Examples

#### Named parameters

```typescript
// index.ts
app.get("/user/:user", (c) => {
  const user = await getUser(c.params.user);
  return c.json(user);
});
```

### Middleware

```typescript
// index.ts
import Bunbun from "bunbunjs";

const app = new Bunbun();

// Runs before the every routes
app.use((c) => {
  //do something
  return c;
});

// for single route
const auth = (c) => {
  // check if user is authenticated
  return c;
};

app.get("/", auth, (c) => {
  return c.text("Authenticated");
});

app.listen();
```

## License

MIT
