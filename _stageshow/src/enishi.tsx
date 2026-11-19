import { createRoot } from 'react-dom/client'
import EnishiHero from './en-hero'
import EnishiToday from './en-today'

// Mounts each scene into its slot on /enishi/, replacing the still left there
// for browsers without JavaScript.
const scenes = { 'en-hero-stage': EnishiHero, 'en-today-stage': EnishiToday }

for (const [id, Scene] of Object.entries(scenes)) {
  const slot = document.getElementById(id)
  if (slot) createRoot(slot).render(<Scene />)
}
