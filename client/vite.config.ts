import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  server: {
    port:3000,
    proxy: {
      '/v1': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/v1/, '/v1')
      }
    }
  },
  define: {
    'process.env': {
      VITE_API_KEY: process.env.VITE_API_KEY,
      VITE_AUTH_DOMAIN: process.env.VITE_AUTH_DOMAIN,
      VITE_DATABASE_URL: process.env.VITE_DATABASE_URL,
      VITE_PROJECT_ID: process.env.VITE_PROJECT_ID,
      VITE_STORAGE_BUCKET: process.env.VITE_STORAGE_BUCKET,
      VITE_MESSAGING_SENDERID: process.env.VITE_MESSAGING_SENDERID,
      VITE_APP_ID: process.env.VITE_APP_ID,
    }
  }
});
