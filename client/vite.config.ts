import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/auth": {
        target: "http://localhost:5000",
      },
      "/api/users": {
        target: "http://localhost:5000",
      },
      "/api/eventAttendance": {
        target: "http://localhost:5000",
      },
      "/api/events": {
        target: "http://localhost:5000",
      },
      "/api/invitation": {
        target: "http://localhost:5000",
      },
    },
  },
});
