# vite-plugin-svelte

[Svelte](https://svelte.dev) integration for [Vite](https://github.com/vitejs/vite), a fast web dev build tool.

## Setup

- Add this plugin as a dev dependency
  - npm: `npm install --save-dev vite-plugin-svelte`
  - pnpm: `pnpm install --save-dev vite-plugin-svelte`
  - yarn: `yarn add --dev vite-plugin-svelte`
- Add `svelte` as a regular dependency
  - npm: `npm install svelte`
  - pnpm: `pnpm install svelte`
  - yarn: `yarn add svelte`
- Add it into your `vite.config.js` file  
  ```js
  import { svelte } from 'vite-plugin-svelte';

  export default {
    plugins: [
      // These options are optional, you don't have to configure them manually,
      // for the most part.
      svelte({
        // Svelte compiler options
        compilerOptions: {},
        // Svelte HMR options, pass false to disable
        hmrOptions: {},
        // Svelte preprocessors
        preprocess: [],
        // Plugin options
        pluginsOptions: {},
      }),
    ],
  };
  ```

## Recommendations

- Dedupe `svelte` dependency  
  This can be done with the `rollupDedupe` option.
  ```js
  export default {
    plugins: [
      // ...
    ],
    rollupDedupe: ['svelte'],
  };
  ```
