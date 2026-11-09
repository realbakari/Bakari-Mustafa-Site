import type { ReactNode } from 'react'
import { Clock, Download, Folder, Heart, History, Images, Layers, LayoutGrid, List, MessageSquareWarning, PanelRight, Trash2 } from 'lucide-react'
import { Bar, Collapse, Count, Stage, States, Text, Window, type Act, type Layout } from '../ko-kit'
import { DragImage, NO_GHOST, Thumb, doc, photo, type Ghost, type Item } from '../ko-shared'
import './ko-hero.css'

// Kora, its hero: a folder of event photos is dragged from a Finder window
// onto the library. The grid outlines itself as Kora's drop target, and on
// the drop the import starts: the activity button becomes a progress ring,
// the new items arrive at the top of All Assets (newest imported first) as
// placeholders that fill in as their previews are made, the count rolls, and
// the status bar reports the result. The folder is still in Finder at the
// end: Kora reads the files where they are. It plays once and holds there; an
// import isn't undone with ⌘Z in Kora, so a loop would have no honest reset.
//
// Wide: the Finder window is the satellite, straddling the library window's
// left edge over the sidebar's filler. The library window keeps one gutter on
// the top and bottom and runs off the right edge; its search field and the
// status bar's size slider are left out rather than sliced. Compact: the
// library window alone, three columns; the import arrives without the drag.
//
// Real strings: the Finder window's title and the folder's name, All Assets,
// the item count and the import summary, worded as Kora words them. The
// sidebar is bars. Icons: lucide at one size and stroke, standing in for SF
// Symbols. Photos: Unsplash.

type S = { ghost: Ghost; importing: boolean; progress: number; batch: number; ready: number; count: number; notice: boolean }

const BEFORE = 1184
const IMPORTED = 36
const initial: S = { ghost: NO_GHOST, importing: false, progress: 0, batch: 0, ready: 0, count: BEFORE, notice: false }
const POSTER: S = { ghost: NO_GHOST, importing: false, progress: 1, batch: 2, ready: 2, count: BEFORE + IMPORTED, notice: true }

const FOLDER = 'Harmony Day 2026'
const SUMMARY = `Imported ${IMPORTED} items · 2 duplicates skipped`

type Geo = {
  win: { x: number; y: number; w: number; h: number }
  side: number
  cols: number
  /** Toolbar space past the stage edge, so the controls end inside the crop */
  hidden: number
  rest: { x: number; y: number }
}

const GEO: Record<Layout, Geo> = {
  wide: { win: { x: 170, y: 40, w: 1068, h: 460 }, side: 200, cols: 6, hidden: 245, rest: { x: 122, y: 490 } },
  // No cursor in compact: it rests off stage
  compact: { win: { x: 16, y: 16, w: 400, h: 340 }, side: 0, cols: 3, hidden: 64, rest: { x: 420, y: 520 } },
}

// Newest imported first: the second batch lands above the first.
const NEW_1: Item[] = [photo('classroom', 3, 2), photo('friends-close', 4, 5), photo('concert', 3, 2), doc('programme'), photo('board', 1, 1), photo('friends', 3, 2)]
const NEW_2: Item[] = [photo('concert-phone', 16, 9, '1:24'), photo('friends', 3, 2), photo('concert-lights', 4, 5), photo('sunset', 4, 5), photo('classroom', 3, 2), photo('concert', 3, 2)]
const OLD: Item[][] = [
  [photo('library', 3, 2), doc('news'), photo('wave', 3, 2), photo('bubble', 4, 3), photo('bridge', 3, 2), photo('ripple', 4, 3)],
  [photo('shelves', 4, 5), doc('report'), photo('ripple', 4, 3), photo('wave-tall', 3, 4), photo('library', 3, 2), photo('bubble', 4, 3)],
  [photo('board', 1, 1), photo('wave', 3, 2), doc('news'), photo('library', 3, 2), photo('bubble', 4, 3), photo('wave', 3, 2)],
]

async function script(a: Act<S>) {
  if (a.layout === 'wide') {
    await a.wait(700)

    // 1. Take the folder by its icon in Finder
    a.mark('grab')
    const icon = a.rect('src-icon')
    const file = a.rect('src-file')
    const grab = { x: icon.x + icon.width / 2, y: icon.y + icon.height * 0.58 }
    await a.move(grab)
    await a.wait(240)
    const off = { x: grab.x - file.x, y: grab.y - file.y }

    // 2. Carry it onto the grid, which outlines itself as a drop target
    a.mark('drag')
    const grid = a.rect('drop')
    await a.drag({ x: grid.x + grid.width * 0.36, y: grid.y + grid.height * 0.42 }, (at) => {
      a.put({ ghost: { on: true, dropped: false, off, at } })
    }, { duration: 1300, cursor: 'preserve' })

    // 3. The drop starts the import; the cursor clears the way
    a.mark('drop')
    await a.set((s) => ({ importing: true, ghost: { ...s.ghost, dropped: true } }))
    void a.move('rest')
  } else {
    // Compact: the import starts on its own beat
    await a.wait(1100)
    a.mark('drop')
    await a.set({ importing: true })
  }
  await a.wait(450)

  // 4. Two batches arrive at the top as placeholders, then fill in
  a.mark('batch-1')
  await a.set({ batch: 1, progress: 0.5, count: BEFORE + IMPORTED / 2 })
  await a.wait(650)
  await a.set({ ready: 1 })
  await a.wait(900)
  a.mark('batch-2')
  await a.set({ batch: 2, progress: 1, count: BEFORE + IMPORTED })
  await a.wait(650)
  await a.set({ ready: 2 })
  await a.wait(800)

  // 5. Done: the ring gives way to the activity button and the summary shows
  a.mark('done')
  await a.set({ importing: false, notice: true })
  await a.wait(2600)
}

export default function KoraHero() {
  return (
    <Stage<S>
      width={1000}
      height={540}
      compact={{ below: 820, width: 358, height: 372 }}
      accent="#b5482a"
      greys="cool"
      play="once"
      initial={initial}
      poster={POSTER}
      script={script}
      cursor={{ at: { wide: GEO.wide.rest, compact: GEO.compact.rest } }}
      className="koh"
    >
      {(s, _rect, layout) => {
        const g = GEO[layout]
        const wide = layout === 'wide'
        const lifted = s.ghost.on && !s.ghost.dropped
        const cols = (row: Item[]) => row.slice(0, g.cols)
        return (
          <>
            <Window
              className="koh-window"
              style={{ left: g.win.x, top: g.win.y, width: g.win.w, height: g.win.h }}
              title="All Assets"
              sidebar={wide ? <Sidebar /> : undefined}
              sidebarWidth={wide ? g.side : undefined}
              toolbar={<Toolbar importing={s.importing} progress={s.progress} hidden={g.hidden} />}
              body={{ className: 'koh-body', 'data-crop': true }}
            >
              <div className="koh-grid" data-target="drop" data-drop data-crop style={{ ['--cols' as string]: g.cols }}>
                <div className="koh-track">
                  <Collapse open={s.batch >= 2}>
                    <GridRow items={cols(NEW_2)} ready={s.ready >= 2} />
                  </Collapse>
                  <Collapse open={s.batch >= 1}>
                    <GridRow items={cols(NEW_1)} ready={s.ready >= 1} />
                  </Collapse>
                  {OLD.map((row, i) => (
                    <GridRow key={i} items={cols(row)} ready />
                  ))}
                </div>
                <span className="koh-drop" aria-hidden />
              </div>
              <div className="koh-status">
                <Count className="koh-count" value={s.count} duration={650} format={(n) => `${Math.round(n).toLocaleString('en-US')} items`} />
                <span className="koh-notice" data-on={s.notice || undefined}>
                  <span className="koh-notice__rule" />
                  <span>{SUMMARY}</span>
                </span>
              </div>
            </Window>

            {wide && (
              <Window className="koh-finder" title="Events" body={{ className: 'koh-finder__body' }}>
                <div className="ko-file" data-target="src-file" data-lifted={lifted || undefined}>
                  <span className="ko-file__icon" data-target="src-icon">
                    <FolderIcon />
                  </span>
                  <span className="ko-file__name">{FOLDER}</span>
                </div>
                <div className="ko-file">
                  <span className="ko-file__icon">
                    <FolderIcon />
                  </span>
                  <Bar w={70} h={6} tone={3} className="ko-file__bar" />
                </div>
              </Window>
            )}

            <span data-target="rest" className="ko-rest" style={{ left: g.rest.x, top: g.rest.y }} />

            <DragImage ghost={s.ghost} className="ko-drag">
              <span className="ko-file__icon">
                <FolderIcon />
              </span>
              <span className="ko-drag__name">{FOLDER}</span>
            </DragImage>
          </>
        )
      }}
    </Stage>
  )
}

function GridRow({ items, ready }: { items: Item[]; ready: boolean }) {
  return (
    <div className="koh-row">
      {items.map((item, i) => (
        <div key={i} className="koh-slot" style={{ ['--i' as string]: i }}>
          <Thumb item={item} ready={ready} />
        </div>
      ))}
    </div>
  )
}

function Toolbar({ importing, progress, hidden }: { importing: boolean; progress: number; hidden: number }) {
  const ic = { size: 15, strokeWidth: 1.7 }
  return (
    <span className="koh-tools" style={{ marginRight: hidden }}>
      <span className="koh-group">
        <span className="koh-btn" data-on>
          <LayoutGrid {...ic} />
        </span>
        <span className="koh-btn">
          <List {...ic} />
        </span>
      </span>
      <span className="koh-group">
        <span className="koh-btn">
          <States
            value={importing ? 'ring' : 'idle'}
            states={{
              idle: <History {...ic} />,
              ring: <Ring value={progress} />,
            }}
          />
        </span>
        <span className="koh-btn">
          <Download {...ic} />
        </span>
        <span className="koh-btn">
          <PanelRight {...ic} />
        </span>
      </span>
    </span>
  )
}

/** Kora's import progress ring: one track and one arc with round caps. */
function Ring({ value }: { value: number }) {
  const r = 6
  const c = 2 * Math.PI * r
  return (
    <svg className="koh-ring" width="16" height="16" viewBox="0 0 16 16" aria-hidden>
      <circle cx="8" cy="8" r={r} className="koh-ring__track" />
      <circle cx="8" cy="8" r={r} className="koh-ring__arc" strokeDasharray={c} strokeDashoffset={c * (1 - Math.max(0.04, value))} />
    </svg>
  )
}

function Sidebar() {
  const ic = { size: 15, strokeWidth: 1.7 }
  const item = (icon: ReactNode, label: ReactNode, current?: boolean) => (
    <div className="koh-side__item" data-current={current || undefined}>
      <span className="koh-side__icon">{icon}</span>
      {label}
    </div>
  )
  return (
    <div className="koh-side">
      <Bar w={40} h={5} tone={3} className="koh-side__label" />
      {item(<Images {...ic} />, <Text>All Assets</Text>, true)}
      {item(<Clock {...ic} />, <Bar w={78} h={6} tone={3} />)}
      {item(<Heart {...ic} />, <Bar w={52} h={6} tone={3} />)}
      {item(<MessageSquareWarning {...ic} />, <Bar w={70} h={6} tone={3} />)}
      {item(<Trash2 {...ic} />, <Bar w={34} h={6} tone={3} />)}
      <Bar w={84} h={5} tone={3} className="koh-side__label" />
      {item(<Layers {...ic} />, <Bar w={96} h={6} tone={3} />)}
      {item(<Layers {...ic} />, <Bar w={64} h={6} tone={3} />)}
      {item(<Layers {...ic} />, <Bar w={82} h={6} tone={3} />)}
    </div>
  )
}

/** A Finder folder icon. */
function FolderIcon() {
  return <Folder size={52} strokeWidth={0.9} className="ko-folder" />
}
