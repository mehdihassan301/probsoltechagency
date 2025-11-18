// vite.config.ts (or .js)
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'url';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
      }
    },

    build: {
      sourcemap: false,           // IMPORTANT: disable source maps in production
      minify: 'terser',           // use terser for better mangle options
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        },
        mangle: {
          // note: keep_classnames/keep_fnames false will mangle them; change if needed
        }
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // Put vendor libraries into a vendor chunk (so you don't obfuscate them)
              return 'vendor';
            }
          }
        }
      }
    }
  };
});
    }
  };
});
