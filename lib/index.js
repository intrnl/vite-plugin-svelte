let { compile, preprocess, walk } = require('svelte/compiler');
let { createMakeHot } = require('svelte-hmr');
let rollupSveltePlugin = require('rollup-plugin-svelte');

let { readBody } = require('./utils');

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
    configureServer: [({ app }) => {
      app.use(async (ctx, next) => {
        await next();

        if (!RE_SVELTE_EXT.test(ctx.path) || !ctx.body) return;

        let code = await readBody(ctx.body);
        
        if (preprocessOpts) {
          let result = await preprocess(code, preprocessOpts);
          code = result.code;
        }

        let compiled = compile(code, {
          dev: true,
          ...svelteOptions,
          format: 'esm',
          generate: 'dom',
        });

        let result = compiled.js.code

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
