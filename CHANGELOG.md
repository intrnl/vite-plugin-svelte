# 3.0.1

- Something seems to be wrong with how npm@7 tries to pack the packages,
  so this is a republish to see if it had fixed itself.  
  (still have no clue on what's causing this)

# 3.0.0

- Changed how the plugin is exported, now you have to do:
  ```js
  import { svelte } from 'vite-plugin-svelte';

  export default {
    plugins: [
      svelte(),
    ],
  };
  ```
- Changed how the plugin options are done to fit the [new normalized options](https://github.com/sveltejs/svelte/issues/1101#issuecomment-708104278), while
  the plugin still won't read the `svelte.config.js` for you, atleast you can
  manually require it yourself  
  ```js
  export default {
    plugins: [
      svelte({
        compilerOptions: {
          dev: true,
        },
      }),
    ],
  };
  ```
- Added a way to change where the HMR API runtime gets mounted, the default is
  `/@@svelte-hmr`, but you can change that by doing the following:  
  ```js
  export default {
    plugins: [
      svelte({
        pluginOptions: {
          hotApiMount: '/@@svelte-hmr',
        },
      }),
    ],
  };
  ```

# 2.4.0

- Add `svelte` in optimizeDeps

# 2.3.0

- Added an incredibly dirty hack to make Vite resolve `svelte` field first
  before any other fields like `module` and `main`
- **2.3.1**: Add option to disable `svelte` field resolution

# 2.2.0

- Remove TypeScript transformation  
  We need access to ESBuild AST in order to prevent any necessary imports from
  being omitted, let's just say it's impossible to do at the moment.

# ~~2.1.0~~

- ~~Added TypeScript transformation~~  
  ~~Disabled by default, uses Vite's ESBuild instance.~~
- ~~**2.1.1**: Add missing TypeScript option in config (2.1.1)~~

# 2.0.0

- `svelte-hmr` is no longer a peer dependency  
  Hard to declare whether this should be a breaking change or not

# 1.3.0

- Use `Plugin#transforms` to transform components during dev.

# 1.2.0

- Add filenames during development
- **1.2.1**: Fix typo in `componentize` function

# 1.1.0

- Add Svelte to list of optimized deps automatically

# 1.0.0

- Add HMR support
