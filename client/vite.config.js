import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root: "./", // Ensure Vite starts from the correct directory
  plugins: [react()],
});
