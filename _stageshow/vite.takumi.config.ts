import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The Takumi page's scenes: one script and one stylesheet in the site's
// assets, loaded by takumi.md. `npm run build` builds every page's scenes.
export default defineConfig({
  plugins: [react()],
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    outDir: '../assets/js/takumi',
    emptyOutDir: false,
    cssCodeSplit: false,
    lib: { entry: 'src/takumi.tsx', formats: ['iife'], name: 'TakumiStages', fileName: () => 'stages.js', cssFileName: 'stages' },
  },
})
