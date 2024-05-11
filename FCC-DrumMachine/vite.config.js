import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      'fcc': {
        target: 'https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js',
        changeOrigin: true,
        rewire: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [ react() ],
})
