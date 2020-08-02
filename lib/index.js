let path = require('path');

let { compile, preprocess, walk } = require('svelte/compiler');
let { createMakeHot } = require('svelte-hmr');
let rollupSveltePlugin = require('rollup-plugin-svelte');

let { push, componentize } = require('./utils');

let hotApiPath = path.dirname(require.resolve('svelte-hmr/runtime'));
let RE_SVELTE_EXT = /\.svelte$/i;
let makeHot = createMakeHot({
  walk,
  hotApi: '/@svelte-hmr/hot-api-esm.js',
  adapter: '/@svelte-hmr/proxy-adapter-dom.js',
});


/** @type {() => import('vite').Plugin} */
module.exports = function sveltePlugin (opts = {}) {
  let {
    preprocess: preprocessOpts,
    hot: hotOpts = true,
    ...svelteOptions
  } = opts;

  // incredibly dirty hack to make vite resolve the svelte field first before
  // any other field like module and main
  try {
    let { mainFields } = require('vite/dist/node/resolver');
    mainFields.unshift('svelte');
  } catch (e) {}

  return {
    // prod build
    rollupInputOptions: {
      plugins: [
        rollupSveltePlugin({
          dev: false,
          ...svelteOptions,
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

      push(config.optimizeDeps.exclude, [
        'svelte',
      ]);
      push(config.optimizeDeps.include, [
        'svelte/internal',
        'svelte/store',
        'svelte/animate',
        'svelte/easing',
        'svelte/motion',
        'svelte/transition',
      ]);
    }],
    alias: {
      '/@svelte-hmr/': hotApiPath,
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
          ...svelteOptions,
          filename,
          name: componentize(filename),
          format: 'esm',
          generate: 'dom',
        })

        let result = compiled.js.code;

        if (hotOpts) {
          result = makeHot(filename, result, {
            ...typeof hotOpts === 'object' && hotOpts !== null ? hotOpts : {},
            compatVite: true,
          }, compiled, code, true);
        }

        return { code: result };
      },
    }],
  };
};
