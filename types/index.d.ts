import type { Plugin } from 'vite';
import type { CompileOptions } from 'svelte/types/compiler/interfaces';
import type { PreprocessorGroup } from 'svelte/types/compiler/preprocess';


/** See https://github.com/rixo/svelte-hmr#options for more details. */
interface HMROptions {
	noReload?: boolean,
	noPreserveState?: boolean,
	noPreserveStateKey?: string,
	optimistic?: boolean,
	acceptNamedExports?: boolean,
	acceptAccessors?: boolean,
	injectCss?: boolean,
	cssEjectDelay?: number,
}

interface PluginOptions {
	resolveSvelteField?: boolean,
	hotApiMount?: string,
}

interface SvelteOptions {
	compilerOptions?: CompileOptions,
	preprocess?: PreprocessorGroup | PreprocessorGroup[],
	hmrOptions?: false | HMROptions,
	pluginOptions?: PluginOptions,
}

export function svelte (options?: SvelteOptions): Plugin;
