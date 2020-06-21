import type { Plugin } from 'vite';


interface SveltePreprocessorResult {
  code: string,
  map?: object | string,
  dependencies?: string[],
}

type SveltePreprocessor = (opts: {
  content: string,
  attributes: Record<string, string | boolean>,
  filename?: string,
}) => SveltePreprocessorResult | Promise<SveltePreprocessorResult>;

type SvelteMarkupPreprocessor = (opts: {
  content: string,
  filename?: string,
}) => SveltePreprocessorResult | Promise<SveltePreprocessorResult>;

interface SveltePreprocessorGroup {
  markup?: SvelteMarkupPreprocessor,
  style?: SveltePreprocessor,
  script?: SveltePreprocessor,
}


interface SvelteHotOptions {
  noPreserveState?: boolean,
  noPreserveStateKey?: string,
  noReload?: boolean,
  optimistic?: boolean,
  acceptNamedExports?: boolean,
  acceptAccessors?: boolean,
  injectCss?: boolean,
  cssEjectDelay?: number,
}


interface SveltePluginOptions {
  dev?: boolean,
  immutable?: boolean,
  hydratable?: boolean,
  preprocess?: SveltePreprocessorGroup | SveltePreprocessorGroup[],
  hot?: boolean | SvelteHotOptions,
}

declare function sveltePlugin (options?: SveltePluginOptions): Plugin;

export = sveltePlugin;
