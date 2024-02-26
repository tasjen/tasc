const { build } = require('esbuild');

build({
  entryPoints: ['./src/index.ts'],
  outfile: './build/index.js',
  platform: 'node',
  bundle: true,
  minify: true,
  sourcemap: true,
  sourcesContent: false,
});
