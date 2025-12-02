import { defineConfig } from "vite";

export default defineConfig({
  define: {
    API_KEY: JSON.stringify(import.meta.env.VITE_API_KEY),
  },
  root: "./",
  build: {
    outDir: "dist",
  },
});
