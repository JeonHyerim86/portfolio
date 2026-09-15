import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// base: './' keeps asset URLs relative so the build works on both
// GitHub Pages (project subpath) and Vercel without extra config.
// PostCSS 설정은 별도 파일 대신 여기에 인라인한다 (루트 정리).
export default defineConfig({
  base: './',
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss(), autoprefixer()],
    },
  },
})
