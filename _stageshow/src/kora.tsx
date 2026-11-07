import { createRoot } from 'react-dom/client'
import KoraDetail from './ko-detail'
import KoraDupes from './ko-dupes'
import KoraHero from './ko-hero'

// Mounts each scene into its slot on /kora/, replacing the still left there
// for browsers without JavaScript.
const scenes = { 'ko-hero-stage': KoraHero, 'ko-detail-stage': KoraDetail, 'ko-dupes-stage': KoraDupes }

for (const [id, Scene] of Object.entries(scenes)) {
  const slot = document.getElementById(id)
  if (slot) createRoot(slot).render(<Scene />)
}
