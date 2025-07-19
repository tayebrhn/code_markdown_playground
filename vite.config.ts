import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/code_markdown_playground/',
  plugins: [react()],
  define: {
    'process.env': {}
  },
  server: {
    port: 3000,
  },
})
