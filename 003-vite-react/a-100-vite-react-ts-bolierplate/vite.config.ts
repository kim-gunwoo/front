import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
// import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(
    {
    jsxImportSource: "@emotion/react",
    babel: {
      plugins: ["@emotion/babel-plugin"],
    }
  })],
  // tsconfig 경로 설정
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],  
  },
})

// export default defineConfig({
//   plugins: [react(), tsconfigPaths()],
// });