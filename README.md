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

    // This is optional, and is only beneficial during development
    optimizeDeps: {
      include: [
        'svelte/internal',
        // 'svelte/store',
        // 'svelte/animate',
        // 'svelte/easing',
        // 'svelte/motion',
        // 'svelte/transition',
      ],
    },
  };
  ```

## Things to consider

- During development, preprocessors that expects filenames will not work.

## To-do

- Enable HMR support via [`svelte-hmr`](https://github.com/rixo/svelte-hmr)
