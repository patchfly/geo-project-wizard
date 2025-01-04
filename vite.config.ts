import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";

export default defineConfig(() => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    ...configDefaults,
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
  },
}));
