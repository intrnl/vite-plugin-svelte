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
