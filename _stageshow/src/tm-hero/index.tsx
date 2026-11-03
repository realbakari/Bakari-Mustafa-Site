import { BookOpen, Bookmark, Clock, Ellipsis, Highlighter, LibraryBig, Play, Type } from 'lucide-react'
import { Bar, Segmented, Stage, Text, Window, type Act } from '../../kit'
import './tm-hero.css'

// The Message for Mac, its hero. A sermon is open; its reading "Revelation
// 10:1-7." is a link. One click opens the Scripture panel with the passage
// beside the sermon, the thing the app is for. The panel holds, then the
// Scripture button in the toolbar closes it: a caused reset.
//
// Real strings: the sermon's title block, paragraph 35 as the transcript has
// it, the reading, and the passage in the panel (KJV). The sidebar's series
// and the neighbouring paragraphs are lines.
//
// Icons: lucide at one size and stroke, standing in for SF Symbols the app
// uses (books, bookmark, clock, highlighter, play, book, ellipsis, textformat).

type S = { panel: boolean; visited: boolean }

const initial: S = { panel: false, visited: false }
const POSTER: S = { panel: true, visited: true }

const REST = { wide: { x: 760, y: 470 }, compact: { x: 300, y: 300 } }

async function script(a: Act<S>) {
  await a.wait(900)
  await a.move({ at: 'reading', x: 0.55, y: 0.75 })
  await a.wait(250)
  await a.click()
  await a.set({ panel: true, visited: true })
  await a.move('rest-open')
  await a.wait(3400)

  // Close it the way the app does: the Scripture button in the toolbar.
  await a.move({ at: 'scripture', x: 0.5, y: 0.5 })
  await a.wait(250)
  await a.click()
  await a.set({ panel: false, visited: false })
  await a.wait(500)
  await a.move('rest')
  await a.wait(900)
}

const PARAGRAPH_35 = [
  'See, takes the Book of Seals and breaks them and shows the seventh angel, for this alone—the mysteries of God—is the ministry of the seventh angel! Now, we have just come through the Church Ages with even history to prove that. It is the angel’s message of the seventh church. All right, reveals all the mysteries that’s been in the past—all the things in the past. ',
  'That’s to be.',
]

function Sidebar() {
  const library = [
    { icon: <LibraryBig size={15} strokeWidth={1.6} />, label: 'All Sermons', selected: true },
    { icon: <Bookmark size={15} strokeWidth={1.6} />, label: 'Saved' },
    { icon: <Clock size={15} strokeWidth={1.6} />, label: 'History' },
    { icon: <Highlighter size={15} strokeWidth={1.6} />, label: 'Highlights' },
  ]
  return (
    <div className="tmh-side">
      <div className="tmh-side-label">Library</div>
      {library.map((item) => (
        <div key={item.label} className="tmh-side-row" data-selected={item.selected || undefined}>
          <span className="tmh-side-icon">{item.icon}</span>
          <Text>{item.label}</Text>
        </div>
      ))}
      <div className="tmh-side-label">Series</div>
      {[78, 104, 92, 66, 98, 84, 72].map((w, i) => (
        <div key={i} className="tmh-side-row">
          <Bar w={w} h={6} tone={2} />
        </div>
      ))}
    </div>
  )
}

function Toolbar({ panel }: { panel: boolean }) {
  return (
    <div className="tmh-tools">
      <span className="tmh-tool"><Play size={15} strokeWidth={1.6} /></span>
      <span className="tmh-tool"><Bookmark size={15} strokeWidth={1.6} /></span>
      <span className="tmh-tool" data-target="scripture" data-on={panel || undefined}><BookOpen size={15} strokeWidth={1.6} /></span>
      <span className="tmh-tool"><Ellipsis size={15} strokeWidth={1.6} /></span>
      <span className="tmh-tool tmh-tool--text"><Type size={14} strokeWidth={1.6} /></span>
    </div>
  )
}

function Panel() {
  return (
    <aside className="tmh-panel">
      <div className="tmh-panel-head">
        <span className="tmh-panel-ref">Revelation 10:1–7</span>
        <span className="tmh-panel-tr">KJV</span>
      </div>
      <p className="tmh-panel-text">
        <sup>1</sup>And I saw another mighty angel come down from heaven, clothed with a cloud: and a rainbow was upon his head, and his face was as it were the sun, and his feet as pillars of fire:
        {' '}<sup>2</sup>And he had in his hand a little book open: and he set his right foot upon the sea, and his left foot on the earth,
        {' '}<sup>3</sup>And cried with a loud voice, as when a lion roareth: and when he had cried, seven thunders uttered their voices.
      </p>
      <span className="tmh-panel-open"><BookOpen size={14} strokeWidth={1.6} /> Open in Bible</span>
      <div className="tmh-panel-rule" />
      <div className="tmh-side-label tmh-panel-label">In This Sermon</div>
      <div className="tmh-panel-cite" data-on>Revelation 10:1–7</div>
      {[112, 86, 128, 98, 74, 104].map((w, i) => (
        <div key={i} className="tmh-panel-cite"><Bar w={w} h={6} tone={3} /></div>
      ))}
    </aside>
  )
}

export default function MessageHero() {
  return (
    <Stage
      width={1000}
      height={540}
      compact={{ below: 820, width: 358, height: 340 }}
      accent="#2f6fd6"
      initial={initial}
      poster={POSTER}
      script={script}
      cursor={{ at: REST }}
      className="tmh"
    >
      {(s, _rect, layout) => {
        const compact = layout === 'compact'
        const reader = (
          <div className="tmh-reader" data-panel={s.panel || undefined}>
            <div className="tmh-column">
              {/* The phone column starts at the paragraph the story is about */}
              {!compact && (
                <>
                  <div className="tmh-title">The First Seal</div>
                  <div className="tmh-code">63-0318</div>
                  <div className="tmh-place">Jeffersonville Indiana U.S.A.</div>
                  <div className="tmh-para tmh-para--filler">
                    <span className="tmh-num">34</span>
                    <Bar w={380} h={7} tone={2} />
                    <Bar w={430} h={7} tone={2} />
                    <Bar w={300} h={7} tone={2} />
                  </div>
                </>
              )}
              <div className="tmh-para">
                <span className="tmh-num">35</span>
                {PARAGRAPH_35[0]}
                <span className="tmh-link" data-target="reading" data-cursor="hand" data-visited={s.visited || undefined}>Revelation 10:1‑7.</span>{' '}
                {PARAGRAPH_35[1]}
              </div>
              <div className="tmh-para tmh-para--filler">
                <span className="tmh-num">36</span>
                <Bar w={compact ? 230 : 360} h={7} tone={2} />
                <Bar w={compact ? 240 : 380} h={7} tone={2} />
              </div>
            </div>
            <Panel />
          </div>
        )
        return (
          <>
            {compact ? (
              <Window className="tmh-window" toolbar={<Toolbar panel={s.panel} />} title="" body={{ 'data-crop': true }}>
                {reader}
              </Window>
            ) : (
              <Window
                className="tmh-window"
                sidebar={<Sidebar />}
                sidebarWidth={196}
                lead={<Segmented className="tmh-seg" items={['Sermons', 'Bible']} value={0} />}
                toolbar={<Toolbar panel={s.panel} />}
                body={{ 'data-crop': true }}
              >
                {reader}
              </Window>
            )}
            <span data-target="rest" className="tmh-rest" style={{ left: REST[layout].x, top: REST[layout].y }} />
            <span data-target="rest-open" className="tmh-rest" style={compact ? { left: 40, top: 310 } : { left: 360, top: 470 }} />
          </>
        )
      }}
    </Stage>
  )
}
