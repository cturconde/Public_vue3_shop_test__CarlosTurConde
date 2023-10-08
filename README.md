# Public Technical_test CarlosTurConde

## Task:

FUNCTIONAL:
· List the products.
· Display detailed information about a product on a landing page.
· Add products to the shopping cart.
· Increase, decrease, or remove products from the cart.
· Persistent cart. If the page is reloaded or another section is accessed, the added products should not be lost.
· Total number of products in the cart.
· Total amount of products in the cart.
· Option to clear the entire cart.
· Highlight the product with the lowest price.
· Add a text filter by product name. The API allows for this type of query, see documentation.
· Add pagination. The API allows for this type of query, see documentation.

TECHNICAL:
· Development with Vue version 3.
· Use of ECMAScript 6 or later.
· Inclusion of a Readme.md file with instructions to start the application.
· Use of the Composition API instead of the Options API.
· Proper design of the DOM and its components.
· Declaration of variables, functions, etc. 
· Implementation of unit tests or end-to-end tests.
· Use of clean code and best practices.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).


## Project Setup

```sh
 cd projectfolder
  npm install
  npm audit fix
  npm run format
  npm run dev

Dependecies if not installed:
    npm install element-plus --save
    npm install bootstrap@5.3.0
    npm install --save-dev sass
    npm install cypress -D
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npx cypress open
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
