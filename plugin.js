let { compile } = require('svelte/compiler');
let { readFile } = require('fs/promises');
let { join } = require('path');
let svelte = require('rollup-plugin-svelte');


let RE_SVELTE = /\.svelte$/i;

/** @type {() => import('vite').Plugin} */
module.exports = function sveltePlugin () {
  return {
    configureServer: [({ root, app }) => {
      app.use(async (ctx, next) => {
        if (!RE_SVELTE.test(ctx.path)) return next();

        let path = join(root, ctx.path);
        let code = await readFile(path, 'utf8');

        let compiled = compile(code, { dev: true });

        ctx.type = 'js';
        ctx.body = compiled.js.code;
      });
    }],
    rollupInputOptions: {
      plugins: [
        svelte({ emitCss: true, include: RE_SVELTE }),
      ],
    },
  };
};
