import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.API_KEY": JSON.stringify(process.env.API_KEY),
  },
  server: {
    proxy: {
      "/api": {
        target: "https://upmeet.onrender.com",
        changeOrigin: true,
      
      
      },
    },
  },
});
