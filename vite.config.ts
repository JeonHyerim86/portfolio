import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' keeps asset URLs relative so the build works on both
// GitHub Pages (project subpath) and Vercel without extra config.
export default defineConfig({
  base: './',
  plugins: [react()],
})
