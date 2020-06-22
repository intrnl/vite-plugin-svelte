# vite-plugin-svelte

Vite plugin for Svelte support.

Relies on [rollup-plugin-svelte](https://npm.im/rollup-plugin-svelte) when
building.

## Setup

- Install it with your package manager of choice
  - [npm](https://npmjs.com/get-npm): `npm i -D vite-plugin-svelte svelte@^3 svelte-hmr`
  - [pnpm](https://pnpm.js.org/en/installation): `pnpm i -D vite-plugin-svelte svelte@^3 svelte-hmr`
  - [yarn](https://classic.yarnpkg.com/en/docs/install/) `yarn add -D vite-plugin-svelte svelte@^3 svelte-hmr`
- Add it into your `vite.config.js` file  
  ```js
  import svelte from 'vite-plugin-svelte';

  export default {
    plugins: [
      svelte(),
    ],
  };
  ```

## Things to consider

- During development, preprocessors that expects filenames will not work.
