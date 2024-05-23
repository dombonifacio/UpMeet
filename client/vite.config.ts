import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.API_KEY": JSON.stringify(process.env.API_KEY),
  },
  server: {
    proxy: {
      "/api/auth": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/api/users": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/api/eventAttendance": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/api/events": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
      "/api/invitation": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
