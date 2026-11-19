import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The Enishi page's scenes: one script and one stylesheet in the site's assets,
// loaded by enishi.md. `npm run build` builds every page's scenes.
export default defineConfig({
  plugins: [react()],
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    outDir: '../assets/js/enishi',
    emptyOutDir: false,
    cssCodeSplit: false,
    lib: { entry: 'src/enishi.tsx', formats: ['iife'], name: 'EnishiStages', fileName: () => 'stages.js', cssFileName: 'stages' },
  },
})
