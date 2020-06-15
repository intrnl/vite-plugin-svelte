let { compile, preprocess } = require('svelte/compiler');
let svelte = require('rollup-plugin-svelte');

let { readBody } = require('./utils');


let RE_SVELTE = /\.svelte$/i;


module.exports = function sveltePlugin (opts = {}) {
  let { preprocess: preprocessOpts, ...svelteOptions } = opts;

  return {
    configureServer: [({ app }) => {
      app.use(async (ctx, next) => {
        await next();

        if (RE_SVELTE.test(ctx.path) && ctx.body) {
          let code = await readBody(ctx.body);

          if (preprocessOpts) {
            let result = await preprocess(code, preprocessOpts);
            code = result.code;
          }

          let compiled = compile(code, {
            dev: true,
            ...svelteOptions,
          });

          ctx.type = 'js';
          ctx.body = compiled.js.code;
        }
      });
    }],
    rollupInputOptions: {
      plugins: [
        svelte({
          dev: false,
          ...svelteOptions,
          preprocess: preprocessOpts,
          emitCss: true,
          include: RE_SVELTE,
        }),
      ],
    },
  };
};
