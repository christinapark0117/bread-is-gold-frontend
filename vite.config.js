import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Rails API runs on 3000, so the frontend keeps using 3001.
    port: 3001,
    strictPort: true,
  },
  preview: {
    port: 3001,
  },
  test: {
    environment: 'jsdom',
  },
});
