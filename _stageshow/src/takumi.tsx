import { createRoot } from 'react-dom/client'
import TakumiHero from './tk-hero'

// Mounts each scene into its slot on /takumi/, replacing the still left there
// for browsers without JavaScript.
const scenes = { 'tk-hero-stage': TakumiHero }

for (const [id, Scene] of Object.entries(scenes)) {
  const slot = document.getElementById(id)
  if (slot) createRoot(slot).render(<Scene />)
}
