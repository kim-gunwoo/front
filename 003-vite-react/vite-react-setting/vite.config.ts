import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import * path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  server: {
    port: 3000,
  },
  // resolve: {
  //   alias: [
  //     { find: "@", replacement: path.resolve(__dirname, "src") },
  //   ],
  // },
});
