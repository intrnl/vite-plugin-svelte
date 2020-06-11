let { compile } = require('svelte/compiler');
let svelte = require('rollup-plugin-svelte');

let { readBody } = require('./utils');


let RE_SVELTE = /\.svelte$/i;


/** @type {() => import('vite').Plugin} */
module.exports = function sveltePlugin () {
  return {
    configureServer: [({ app }) => {
      app.use(async (ctx, next) => {
        await next();

        if (RE_SVELTE.test(ctx.path)) {
          let code = await readBody(ctx.body);
          if (!code) return;

          let compiled = compile(code, { dev: true });

          ctx.type = 'js';
          ctx.body = compiled.js.code;
        }
      });
    }],
    rollupInputOptions: {
      plugins: [
        svelte({ dev: false, emitCss: true, include: RE_SVELTE }),
      ],
    },
  };
};
