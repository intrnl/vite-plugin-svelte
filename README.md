# vite-plugin-svelte

Vite plugin for compiling Svelte components.

## Setup

- Install it with your package manager of choice
  - [npm](https://npmjs.com/get-npm): `npm i -D vite-plugin-svelte svelte svelte-hmr`
  - [pnpm](https://pnpm.js.org/en/installation): `pnpm i -D vite-plugin-svelte svelte svelte-hmr`
  - [yarn](https://classic.yarnpkg.com/en/docs/install/) `yarn add -D vite-plugin-svelte svelte svelte-hmr`
- Add it into your `vite.config.js` file  
  ```js
  import svelte from 'vite-plugin-svelte';

  export default {
    plugins: [
      svelte(),
    ],
  };
  ```
