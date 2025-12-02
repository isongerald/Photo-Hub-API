import { defineConfig } from "vite";

export default defineConfig({
  define: {
    API_KEY: JSON.stringify(process.env.API_KEY),
  },
  root: "./",
  build: {
    outDir: "dist",
  },
});
