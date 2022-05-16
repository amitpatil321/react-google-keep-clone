import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgLoader from "vite-svg-loader";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgLoader({
      defaultImport: "url", // or 'raw'
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
