import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The Kora page's scenes: one script and one stylesheet in the site's assets,
// loaded by kora.md. `npm run build` builds every page's scenes.
export default defineConfig({
  plugins: [react()],
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    outDir: '../assets/js/kora',
    emptyOutDir: false,
    cssCodeSplit: false,
    lib: { entry: 'src/kora.tsx', formats: ['iife'], name: 'KoraStages', fileName: () => 'stages.js', cssFileName: 'stages' },
  },
})
