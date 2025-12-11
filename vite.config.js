import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'recharts', replacement: path.resolve(__dirname, 'node_modules', 'recharts', 'es6', 'index.js') }
    ]
  },
  // Ensure Recharts and its helpers are pre-bundled by Vite and not externalized for SSR.
  optimizeDeps: {
    include: ['recharts', 'recharts-scale', 'react-is']
  },
  ssr: {
    noExternal: ['recharts', 'recharts-scale']
  }
})