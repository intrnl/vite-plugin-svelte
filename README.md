# vite-plugin-svelte

[Svelte](https://svelte.dev) integration for [Vite](https://github.com/vitejs/vite), a fast web dev build tool.

## Setup

- Install it with your package manager of choice
  - [npm](https://npmjs.com/get-npm): `npm i -D vite-plugin-svelte svelte`
  - [pnpm](https://pnpm.js.org/en/installation): `pnpm i -D vite-plugin-svelte svelte`
  - [yarn](https://classic.yarnpkg.com/en/docs/install/) `yarn add -D vite-plugin-svelte svelte`
- Add it into your `vite.config.js` file  
  ```js
  import svelte from 'vite-plugin-svelte';

  export default {
    plugins: [
      svelte(),
    ],
  };
  ```

## Recommendations

- Dedupe `svelte` dependency  
  This can be done with the `rollupDedupe` option.
  ```js
  export default {
    // [...]
    rollupDedupe: ['svelte'],
  };
  ```
