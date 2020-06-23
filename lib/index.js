let { compile, preprocess, walk } = require('svelte/compiler');
let { createMakeHot } = require('svelte-hmr');
let rollupSveltePlugin = require('rollup-plugin-svelte');

let { readBody, push, componentize } = require('./utils');

let RE_SVELTE_EXT = /\.svelte$/i;
let makeHot = createMakeHot({ walk });


module.exports = function sveltePlugin (opts = {}) {
  let {
    preprocess: preprocessOpts,
    hot: hotOpts = true,
    ...svelteOptions
  } = opts;

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
    configureServer: [({ app, config }) => {
      // optimized deps
      let prevOptimizeDeps = config.optimizeDeps || {};

      config.optimizeDeps = {
        ...prevOptimizeDeps,
        include: prevOptimizeDeps.include || [],
        exclude: prevOptimizeDeps.exclude || [],
      };

      push(config.optimizeDeps.exclude, [
        'svelte',
        'svelte-hmr',
      ]);
      push(config.optimizeDeps.include, [
        'svelte/internal',
        'svelte/store',
        'svelte/animate',
        'svelte/easing',
        'svelte/motion',
        'svelte/transition',
        'svelte-hmr/runtime/hot-api-esm',
        'svelte-hmr/runtime/proxy-adapter-dom',
      ]);

      // middleware
      app.use(async (ctx, next) => {
        await next();

        if (!RE_SVELTE_EXT.test(ctx.path) || !ctx.body) return;

        let code = await readBody(ctx.body);
        
        if (preprocessOpts) {
          let result = await preprocess(code, preprocessOpts, {
            filename: ctx.path
          });
          code = result.code;
        }

        let compiled = compile(code, {
          dev: true,
          ...svelteOptions,
          filename: ctx.path,
          name: componentize(ctx.path),
          format: 'esm',
          generate: 'dom',
        });

        let result = compiled.js.code;

        if (hotOpts) {
          result = makeHot(ctx.path, result, {
            ...typeof hotOpts === 'object' && hotOpts !== null ? hotOpts : {},
            compatVite: true,
          }, compiled, code, true);
        }

        ctx.type = 'js';
        ctx.body = result;
      });
    }],
  };
};
