const { build } = require('esbuild');

build({
  entryPoints: ['./tsc_build/index.js'],
  outfile: `./build/${process.env.IS_VERCEL ? 'index' : 'server'}.js`,
  platform: 'node',
  bundle: true,
  minify: true,
  sourcemap: true,
  sourcesContent: false,
});
