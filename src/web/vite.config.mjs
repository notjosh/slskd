import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// TODO: Use this for Semantic UI...but Vite-ify
// const CracoLessPlugin = require('@semantic-ui-react/craco-less');

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [react()],
  server: {
    port: 3_000,
  },
  test: {
    environment: 'jsdom',
    globals: true,
  },
});
