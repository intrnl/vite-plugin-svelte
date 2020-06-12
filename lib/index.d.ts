import { Plugin } from 'vite';


interface SveltePluginOptions {
  dev?: boolean;
  immutable?: boolean;
  hydratable?: boolean;
}

declare function sveltePlugin (options?: SveltePluginOptions): Plugin;

export = sveltePlugin;
