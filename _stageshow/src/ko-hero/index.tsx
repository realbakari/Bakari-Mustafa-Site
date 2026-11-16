import { Bar, Collapse, Count, Stage, States, Text, Window, type Act, type Layout } from '../ko-kit'
import type { IconName } from '../ko-icons'
import { DragImage, Icon, NO_GHOST, Thumb, doc, photo, type Ghost, type Item } from '../ko-shared'
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
// library window alone, three columns; the import arrives without the drag;
// the toolbar keeps the view switch and the import activity, and the status
// bar the import summary.
//
// Real strings: the Finder window's title and the folder's name, the sidebar
// as Kora lists it (Library, Organise, Discover, Create), the toolbar's title
// and count, the status bar's count and import summary, worded as Kora words
// them. Icons: the Hugeicons Kora draws, monochrome, secondary in the sidebar.
// The library's other counts are made up, like its photos (Unsplash).

type S = { ghost: Ghost; importing: boolean; progress: number; batch: number; ready: number; added: number; notice: boolean }

/** All Assets, Recently Added and Untagged before the import; each gains what it brings */
const BEFORE = { all: 1184, recent: 112, untagged: 208 }
const IMPORTED = 36
const initial: S = { ghost: NO_GHOST, importing: false, progress: 0, batch: 0, ready: 0, added: 0, notice: false }
const POSTER: S = { ghost: NO_GHOST, importing: false, progress: 1, batch: 2, ready: 2, added: IMPORTED, notice: true }

const FOLDER = 'Harmony Day 2026'
const SUMMARY = `Imported ${IMPORTED} items · 2 duplicates skipped`
const items = (n: number) => `${Math.round(n).toLocaleString('en-US')} items`
const badge = (n: number) => Math.round(n).toLocaleString('en-US')

type Geo = {
  win: { x: number; y: number; w: number; h: number }
  side: number
  cols: number
  /** Toolbar space past the stage edge, so the controls end inside the crop */
  hidden: number
  rest: { x: number; y: number }
}

const GEO: Record<Layout, Geo> = {
  wide: { win: { x: 170, y: 40, w: 1068, h: 460 }, side: 196, cols: 6, hidden: 245, rest: { x: 122, y: 490 } },
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
  await a.set({ batch: 1, progress: 0.5, added: IMPORTED / 2 })
  await a.wait(650)
  await a.set({ ready: 1 })
  await a.wait(900)
  a.mark('batch-2')
  await a.set({ batch: 2, progress: 1, added: IMPORTED })
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
              lead={
                <span className="koh-heading">
                  <Text className="koh-heading__title">All Assets</Text>
                  <Count className="koh-heading__count" value={BEFORE.all + s.added} duration={650} format={items} />
                </span>
              }
              sidebar={wide ? <Sidebar added={s.added} /> : undefined}
              sidebarWidth={wide ? g.side : undefined}
              toolbar={<Toolbar importing={s.importing} progress={s.progress} hidden={g.hidden} wide={wide} />}
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
                {wide && <Count className="koh-count" value={BEFORE.all + s.added} duration={650} format={items} />}
                <span className="koh-notice" data-on={s.notice || undefined}>
                  {wide && <span className="koh-notice__rule" />}
                  <Done />
                  <span>{SUMMARY}</span>
                  {wide && <span className="koh-notice__link">Details…</span>}
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

function Toolbar({ importing, progress, hidden, wide }: { importing: boolean; progress: number; hidden: number; wide: boolean }) {
  const activity = (
    <span className="koh-btn">
      <States
        value={importing ? 'ring' : 'idle'}
        states={{
          idle: <Icon name="TimeHalfPass" />,
          ring: <Ring value={progress} />,
        }}
      />
    </span>
  )
  const views = (
    <span className="koh-group">
      <span className="koh-btn" data-on>
        <Icon name="GridView" />
      </span>
      <span className="koh-btn">
        <Icon name="LeftToRightListBullet" />
      </span>
    </span>
  )
  // Compact: the view switch and the import activity, which the story needs
  if (!wide) {
    return (
      <span className="koh-tools" style={{ marginRight: hidden }}>
        {views}
        <span className="koh-group">{activity}</span>
      </span>
    )
  }
  return (
    <span className="koh-tools" style={{ marginRight: hidden }}>
      {views}
      <span className="koh-group">
        <span className="koh-btn koh-btn--menu">
          <Icon name="ArrowUpDown" />
          <Icon name="ArrowDown01" size={10} />
        </span>
      </span>
      <span className="koh-group">
        <span className="koh-btn koh-btn--menu">
          <Icon name="FilterHorizontal" />
          <Icon name="ArrowDown01" size={10} />
        </span>
      </span>
      <span className="koh-group">
        {activity}
        <span className="koh-btn">
          <Icon name="Download04" />
        </span>
        <span className="koh-btn">
          <Icon name="SidebarRight" />
        </span>
      </span>
    </span>
  )
}

/** A finished import's mark in the status bar: Kora's filled check, in green. */
function Done() {
  return (
    <svg className="koh-done" width="14" height="14" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="10" fill="currentColor" />
      <path d="M7.5 12.5L10.5 15.5L16.5 9" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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

type Row = { icon: IconName; label: string; count?: number; current?: boolean }

/** Kora's sidebar: four sections in a fixed order, counts as quiet badges. */
function Sidebar({ added }: { added: number }) {
  const sections: [string, Row[]][] = [
    ['Library', [
      { icon: 'Images', label: 'All Assets', count: BEFORE.all + added, current: true },
      { icon: 'Clock01', label: 'Recently Added', count: BEFORE.recent + added },
      { icon: 'Favourite', label: 'Favorites', count: 64 },
      { icon: 'Tag02', label: 'Untagged', count: BEFORE.untagged + added },
      { icon: 'MessageNotification01', label: 'Needs Review', count: 3 },
      { icon: 'Delete02', label: 'Trash' },
    ]],
    ['Organise', [
      { icon: 'Layers01', label: 'Collections' },
      { icon: 'Calendar03', label: 'Events' },
      { icon: 'UserMultiple', label: 'People' },
      { icon: 'Building03', label: 'Organisations' },
      { icon: 'Tag01', label: 'Tags' },
    ]],
    ['Discover', [{ icon: 'TimelineList', label: 'Timeline' }]],
  ]
  return (
    <div className="koh-side">
      {sections.map(([title, rows]) => (
        <div key={title} className="koh-side__section">
          <Text className="koh-side__label">{title}</Text>
          {rows.map((row) => (
            <div key={row.label} className="koh-side__item" data-current={row.current || undefined}>
              <span className="koh-side__icon">
                <Icon name={row.icon} />
              </span>
              <Text className="koh-side__name">{row.label}</Text>
              {row.count !== undefined && (
                <Count className="koh-side__count" value={row.count} duration={650} format={badge} />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

/** A Finder folder: macOS's own icon, not Kora's, so it keeps Finder's blue. */
function FolderIcon() {
  return (
    <svg className="ko-folder" width="54" height="44" viewBox="0 0 54 44" aria-hidden>
      <path d="M2 6.5A3.5 3.5 0 0 1 5.5 3H19l4 4h25.5A3.5 3.5 0 0 1 52 10.5V38a3.5 3.5 0 0 1-3.5 3.5h-43A3.5 3.5 0 0 1 2 38z" fill="#4fa3e8" />
      <path d="M2 13.5A3 3 0 0 1 5 10.5h44a3 3 0 0 1 3 3V38a3.5 3.5 0 0 1-3.5 3.5h-43A3.5 3.5 0 0 1 2 38z" fill="#7cc0f5" />
    </svg>
  )
}
