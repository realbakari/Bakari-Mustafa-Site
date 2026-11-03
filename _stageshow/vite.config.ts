import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// One script and one stylesheet in the site's assets, loaded by
// the-message/mac.md. Run `npm run build` here after changing a scene.
export default defineConfig({
  plugins: [react()],
  define: { 'process.env.NODE_ENV': '"production"' },
  build: {
    outDir: '../assets/js/the-message',
    emptyOutDir: false,
    cssCodeSplit: false,
    lib: { entry: 'src/main.tsx', formats: ['iife'], name: 'TheMessageStages', fileName: () => 'stages.js', cssFileName: 'stages' },
  },
})
