import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// The GatherKit page's scenes: one script and one stylesheet in the site's
// assets, loaded by gatherkit.md. `npm run build` builds every page's scenes.
export default defineConfig({
  plugins: [react()],
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    outDir: '../assets/js/gatherkit',
    emptyOutDir: false,
    cssCodeSplit: false,
    lib: { entry: 'src/gatherkit.tsx', formats: ['iife'], name: 'GatherKitStages', fileName: () => 'stages.js', cssFileName: 'stages' },
  },
})
