import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'webgl-vendor',
              test: /node_modules[\\/](three|@react-three|postprocessing|react-reconciler)[\\/]/,
              minSize: 20_000,
              maxSize: 280_000,
              priority: 20,
            },
          ],
        },
      },
    },
  },
})
