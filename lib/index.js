let { compile } = require('svelte/compiler');
let svelte = require('rollup-plugin-svelte');

let { readBody } = require('./utils');


let RE_SVELTE = /\.svelte$/i;


module.exports = function sveltePlugin (opts = {}) {
  return {
    configureServer: [({ app }) => {
      app.use(async (ctx, next) => {
        await next();

        if (RE_SVELTE.test(ctx.path) && ctx.body) {
          let code = await readBody(ctx.body);
          let compiled = compile(code, {
            dev: true,
            ...opts,
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
          ...opts,
          emitCss: true,
          include: RE_SVELTE,
        }),
      ],
    },
  };
};
