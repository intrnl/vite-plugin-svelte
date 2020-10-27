import * as path from 'path';

import { compile, preprocess, walk } from 'svelte/compiler';
import { createMakeHot } from 'svelte-hmr';

import rollupSveltePlugin from 'rollup-plugin-svelte';

import { push, componentize } from './utils.js';

let hotApiPath = path.dirname(require.resolve('svelte-hmr/runtime'));
let RE_SVELTE_EXT = /\.svelte$/i;


/** @type {() => import('vite').Plugin} */
export function svelte (opts = {}) {
	let {
		compilerOptions,
		preprocess: preprocessOpts,
		hmrOptions = {},
		pluginOptions = {},
	} = opts;

	let {
		resolveSvelteField = true,
		hotApiMount = '/@@svelte-hmr'
	} = pluginOptions;

	// Force the path to end with a slash, making it a directory, needed for
	// the aliasing to work.
	hotApiMount = path.join(hotApiMount, '/');

	let makeHot = hmrOptions && createMakeHot({
		walk,
		hotApi: path.join(hotApiMount, 'hot-api-esm.js'),
		adapter: path.join(hotApiMount, 'proxy-adapter-dom.js'),
	});

	// incredibly dirty hack to make vite resolve the svelte field first before
	// any other field like module and main
	if (resolveSvelteField) {
		try {
			let { mainFields } = require('vite/dist/node/resolver');
			mainFields.unshift('svelte');
		} catch {}
	}

	return {
		// prod build
		rollupInputOptions: {
			plugins: [
				rollupSveltePlugin({
					dev: false,
					...compilerOptions,
					preprocess: preprocessOpts,
					include: RE_SVELTE_EXT,
					format: 'esm',
					generate: 'dom',
					emitCss: true,
				}),
			],
		},
		// dev
		configureServer: [({ config }) => {
			// optimized deps
			let prevOptimizeDeps = config.optimizeDeps || {};

			config.optimizeDeps = {
				...prevOptimizeDeps,
				include: prevOptimizeDeps.include || [],
				exclude: prevOptimizeDeps.exclude || [],
			};

			push(config.optimizeDeps.include, [
				'svelte',
				'svelte/internal',
				'svelte/store',
				'svelte/animate',
				'svelte/easing',
				'svelte/motion',
				'svelte/transition',
			]);
		}],
		alias: {
			[hotApiMount]: hotApiPath,
		},
		transforms: [{
			test: (ctx) => !ctx.isBuild && RE_SVELTE_EXT.test(ctx.path),
			transform: async ({ path: filename, code }) => {
				if (preprocessOpts) {
					let result = await preprocess(code, preprocessOpts, { filename });
					code = result.code;
				}

				let compiled = compile(code, {
					dev: true,
					...compilerOptions,
					filename,
					name: componentize(filename),
					format: 'esm',
					generate: 'dom',
				})

				let result = compiled.js.code;

				if (hmrOptions) {
					result = makeHot(filename, result, {
						...hmrOptions,
						compatVite: true,
					}, compiled, code, true);
				}

				return { code: result };
			},
		}],
	};
}
