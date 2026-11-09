import { useLayoutEffect, useRef, type ReactNode } from 'react'
import type { Point } from './ko-kit'

// Pieces shared by Kora's scenes: grid thumbnails as Kora draws them, the
// first page of a document, and the drag image for a folder from the desktop.

/** Photos from Unsplash, cropped small. Served from the site's assets. */
export const PHOTO = (name: string) => `/assets/img/kora/scene/${name}.jpg`

export type Item =
  | { kind: 'photo'; src: string; w: number; h: number; duration?: string }
  | { kind: 'doc'; tone: 'news' | 'programme' | 'report' }

/** The photo's own proportions, so the grid fits it without cropping. */
export const photo = (name: string, w: number, h: number, duration?: string): Item => ({ kind: 'photo', src: PHOTO(name), w, h, duration })
export const doc = (tone: 'news' | 'programme' | 'report'): Item => ({ kind: 'doc', tone })

/**
 * One grid cell as Kora draws it: the thumbnail aspect-fitted inside an 8px
 * inset, rounded 4px with a hairline, never cropped. While the preview is
 * being made the cell shows a quiet placeholder of the full inset.
 */
export function Thumb({ item, ready = true }: { item: Item; ready?: boolean }) {
  return (
    <div className="ko-cell" data-ready={ready || undefined}>
      <span className="ko-cell__placeholder" />
      <span className="ko-cell__fit">
        {item.kind === 'photo' ? (
          <span className="ko-cell__img" style={{ aspectRatio: `${item.w} / ${item.h}`, [item.w >= item.h ? 'width' : 'height']: '100%' }}>
            <img src={item.src} alt="" draggable={false} />
            {item.duration && <span className="ko-cell__duration">{item.duration}</span>}
          </span>
        ) : (
          <DocPage tone={item.tone} />
        )}
      </span>
    </div>
  )
}

/** The first page of a PDF, as its thumbnail: a masthead, a picture, text lines. */
export function DocPage({ tone }: { tone: 'news' | 'programme' | 'report' }) {
  return (
    <span className="ko-doc" data-tone={tone}>
      <span className="ko-doc__mast" />
      <span className="ko-doc__title" />
      <span className="ko-doc__title ko-doc__title--short" />
      <span className="ko-doc__pic" />
      <span className="ko-doc__cols">
        {[0, 1].map((c) => (
          <span key={c} className="ko-doc__col">
            {[92, 100, 84, 96, 70, 100, 88].map((w, i) => (
              <span key={i} className="ko-doc__line" style={{ width: `${w - c * 6}%` }} />
            ))}
          </span>
        ))}
      </span>
    </span>
  )
}

export type Ghost = { on: boolean; dropped: boolean; off: Point; at: Point }
export const NO_GHOST: Ghost = { on: false, dropped: false, off: { x: 0, y: 0 }, at: { x: 0, y: 0 } }

/** The drag image follows the cursor on the drag's own frame callback, and
 *  lights whatever [data-drop] it is over. */
export function DragImage({ ghost, className, children }: { ghost: Ghost; className: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const over = useRef<HTMLElement | null>(null)
  const following = ghost.on && !ghost.dropped
  const { x: ox, y: oy } = ghost.off
  const { x, y } = ghost.at
  useLayoutEffect(() => {
    const root = ref.current?.closest<HTMLElement>('.ss-stage')
    let next: HTMLElement | null = null
    if (following && root) {
      const box = root.getBoundingClientRect()
      const scale = box.width / root.offsetWidth || 1
      const hit = document.elementFromPoint(box.left + x * scale, box.top + y * scale)?.closest<HTMLElement>('[data-drop]') ?? null
      if (hit && root.contains(hit)) next = hit
    }
    if (next !== over.current) {
      over.current?.removeAttribute('data-over')
      next?.setAttribute('data-over', '')
      over.current = next
    }
  }, [following, x, y])
  useLayoutEffect(() => () => over.current?.removeAttribute('data-over'), [])
  return (
    <div ref={ref} className={className} data-show={following || undefined} data-dropped={ghost.dropped || undefined} style={{ transform: `translate(${x - ox}px, ${y - oy}px)` }} aria-hidden>
      <div className={`${className}__inner`} style={{ transformOrigin: `${ox}px ${oy}px` }}>
        {children}
      </div>
    </div>
  )
}
