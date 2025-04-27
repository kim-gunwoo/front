import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
// import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './enviroment/',
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/app/setupTest.ts',
  },
  css: {
    // postcss: {
    //   plugins: [autoprefixer({})],
    // },
    postcss: './postcss.config.js',
  },
  server: {
    port: 4200,
  },
});
