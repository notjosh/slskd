import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
  },
  css: {
    preprocessorOptions: {
      less: {
        math: 'always',
      },
    },
  },
  plugins: [react()],
  resolve: {
    // semantic-ui theming requires the import path of theme.config to be rewritten to our local theme.config file
    alias: {
      '../../theme.config': path.resolve(
        __dirname,
        './src/semantic-ui/theme.config',
      ),
      '../../themes/default/assets/images': path.resolve(
        __dirname,
        'node_modules/semantic-ui-less/themes/default/assets/images',
      ),
      'semantic-ui/site': path.resolve(__dirname, './src/semantic-ui/site'),
    },
  },
  server: {
    port: 3_000,
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
