import { defineConfig, type PluginOption } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  
  return {
    // Вказуємо базовий шлях для продакшена
    base: isProduction ? './' : '/',
    
    // Коренева папка проекту
    root: 'src',
    
    // Налаштування збірки
    build: {
      sourcemap: isProduction ? false : true, // Вимкнути sourcemap для продакшена
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          assetFileNames: 'assets/[name]-[hash][extname]',
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          manualChunks(id: string) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          }
        }
      }
    },
    
    // Плагіни
    plugins: [
      injectHTML(),
      FullReload(['./src/**/**.html']),
      SortCss({ sort: 'mobile-first' })
    ],
    
    // Додаткові налаштування для Vercel
    server: {
      port: 3000,
      strictPort: true
    },
    
    // Оптимізація для продакшена
    esbuild: {
      drop: isProduction ? ['console', 'debugger'] : []
    }
  };
});