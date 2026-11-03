import { createRoot } from 'react-dom/client'
import GatherKitHero from './gk-hero'

// Mounts each scene into its slot on /gatherkit/, replacing the screenshot
// left there for browsers without JavaScript.
const scenes = { 'gk-hero-stage': GatherKitHero }

for (const [id, Scene] of Object.entries(scenes)) {
  const slot = document.getElementById(id)
  if (slot) createRoot(slot).render(<Scene />)
}
