import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/main.jsx'],
      refresh: true
    }),
    react()
  ],
  server: {
    port: 5173,
    open: true
  }
})