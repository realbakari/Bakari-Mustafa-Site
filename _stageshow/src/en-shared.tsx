import { useEffect, useState } from 'react'

// Pieces shared by Enishi's scenes: the sample people's faces, and the page's
// light or dark theme, which the scenes follow.

/** The sample people's photos (stock), cropped small. Served from the site's assets. */
export const FACE = { ada: '/assets/img/enishi/scene/ada.jpg', grace: '/assets/img/enishi/scene/grace.jpg', sam: '/assets/img/enishi/scene/sam.jpg' }
export type Person = keyof typeof FACE

/** A round photo of one of the sample people. */
export function Face({ who, size, className }: { who: Person; size: number; className?: string }) {
  return <img className={`en-face${className ? ` ${className}` : ''}`} src={FACE[who]} width={size} height={size} alt="" draggable={false} />
}

/** The site's theme: the body carries data-theme="dark" when the reader has chosen dark. */
export function useSiteTheme(): 'light' | 'dark' {
  const read = (): 'light' | 'dark' => (typeof document !== 'undefined' && document.body.getAttribute('data-theme') === 'dark' ? 'dark' : 'light')
  const [theme, setTheme] = useState(read)
  useEffect(() => {
    const watch = new MutationObserver(() => setTheme(read()))
    watch.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] })
    return () => watch.disconnect()
  }, [])
  return theme
}
