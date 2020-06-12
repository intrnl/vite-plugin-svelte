# vite-plugin-svelte

Vite plugin for Svelte support.

Relies on [rollup-plugin-svelte](https://npm.im/rollup-plugin-svelte) when
building.

## Setup

- Install it with your package manager of choice
  - [npm](https://npmjs.com/get-npm): `npm i vite-plugin-svelte`
  - [pnpm](https://pnpm.js.org/en/installation): `pnpm i vite-plugin-svelte`
  - [yarn](https://classic.yarnpkg.com/en/docs/install/) `yarn add vite-plugin-svelte`
- Add it into your `vite.config.js` file  
  ```js
  import svelte from 'vite-plugin-svelte';

  export default {
    plugins: [
      svelte(),
    ],
  };
  ```

## To-do

- Enable HMR support via [`svelte-hmr`](https://github.com/rixo/svelte-hmr)
