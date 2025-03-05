import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "tailwindcss";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwind()],
  json: {
    namedExports: true,
  },
  server: {
    proxy: {
      "/api": 'http://localhost:3000'
    }
  }
});
