import { defineConfig, type PluginOption } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

interface RollupOutputOptions {
  manualChunks?: (id: string) => string | void;
  entryFileNames?: string | ((chunkInfo: { name: string }) => string);
  assetFileNames?: string | ((assetInfo: { name?: string }) => string);
}

export default defineConfig(({ command }) => {
  const plugins: PluginOption[] = [
    injectHTML() as PluginOption,
    FullReload(['./src/**/**.html']) as PluginOption,
    SortCss({
      sort: 'mobile-first',
    }) as PluginOption,
  ];

  const rollupOptions: {
    input: string[];
    output: RollupOutputOptions;
  } = {
    input: glob.sync('./src/*.html'),
    output: {
      manualChunks(id: string) {
        if (id.includes('node_modules')) {
          return 'vendor';
        }
      },
      entryFileNames: (chunkInfo: { name: string }) => {
        if (chunkInfo.name === 'commonHelpers') {
          return 'commonHelpers.js';
        }
        return '[name].js';
      },
      assetFileNames: (assetInfo: { name?: string }) => {
        if (assetInfo.name && assetInfo.name.endsWith('.html')) {
          return '[name].[ext]';
        }
        return 'assets/[name]-[hash][extname]';
      },
    },
  };

  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    build: {
      sourcemap: true,
      rollupOptions,
      outDir: '../dist',
      emptyOutDir: true,
    },
    plugins,
  };
});