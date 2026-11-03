import { createRoot } from 'react-dom/client'
import MessageHero from './tm-hero'
import MessageSunday from './tm-sunday'

// Mounts each scene into its slot on /the-message/mac/, replacing the
// screenshot left there for browsers without JavaScript.
const scenes = { 'tm-hero-stage': MessageHero, 'tm-sunday-stage': MessageSunday }

function mount() {
  for (const [id, Scene] of Object.entries(scenes)) {
    const slot = document.getElementById(id)
    if (slot) createRoot(slot).render(<Scene />)
  }
}

// The scenes set their reading text in Literata; mounting before it loads
// would reflow every line mid-animation. Wait for it, but not for long.
const literata = Promise.all([document.fonts.load('15px Literata'), document.fonts.load('italic 15px Literata'), document.fonts.load('600 17px Literata')])
Promise.race([literata, new Promise((resolve) => setTimeout(resolve, 1500))]).then(mount, mount)
