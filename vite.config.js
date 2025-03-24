import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', 
    proxy: {
      '/api/': {
        target: "https://chat-backend-hnzb.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    allowedHosts: ["chat-appplication-7rhx.onrender.com"], 
  },
});
