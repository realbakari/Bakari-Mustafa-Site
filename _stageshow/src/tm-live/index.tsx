import { ChevronLeft, ChevronRight, Circle, Clock, EyeOff, Heart, PanelBottom, PauseCircle, Quote, Radio, Square, Video } from 'lucide-react'
import { Bar, Count, Stage, Swap, Text, Window, type Act } from '../../kit'
import './tm-live.css'

// The Message for Mac, Go Live. The studio window: scenes down the left, the
// programme monitor in the middle with the projector's words beneath it.
// Starting Soon counts down; Go Live turns the tally red and starts the clock;
// a cut to Words fills the picture with Revelation 5:1; Next steps it to 5:2.
// The reset is the operator's own: End, back to Starting Soon, and the words
// stepped back to the first verse, each a click.
//
// Real strings: the scene names, the slate, the two verses on the monitor and
// the button. The settings column is lines, cropped by the stage.
//
// Icons: lucide at one size and stroke, for the app's SF Symbols.

type S = { live: boolean; t: number; scene: 'soon' | 'words'; cd: number; slide: number }

const initial: S = { live: false, t: 0, scene: 'soon', cd: 4, slide: 0 }
const POSTER: S = { live: true, t: 754, scene: 'words', cd: 0, slide: 0 }

const VERSES = [
  { text: 'And I saw in the right hand of him that sat on the throne a book written within and on the backside, sealed with seven seals.', ref: 'Revelation 5:1 · KJV' },
  { text: 'And I saw a strong angel proclaiming with a loud voice, Who is worthy to open the book, and to loose the seals thereof?', ref: 'Revelation 5:2 · KJV' },
  { text: 'And no man in heaven, nor in earth, neither under the earth, was able to open the book, neither to look thereon.', ref: 'Revelation 5:3 · KJV' },
]

const SCENES = [
  { id: 'camera', title: 'Camera', icon: <Video size={13} strokeWidth={1.7} /> },
  { id: 'band', title: 'Camera + Words', icon: <PanelBottom size={13} strokeWidth={1.7} /> },
  { id: 'words', title: 'Words', icon: <Quote size={13} strokeWidth={1.7} /> },
  { id: 'soon', title: 'Starting Soon', icon: <Clock size={13} strokeWidth={1.7} /> },
  { id: 'brb', title: 'Be Right Back', icon: <PauseCircle size={13} strokeWidth={1.7} /> },
  { id: 'thanks', title: 'Thank You', icon: <Heart size={13} strokeWidth={1.7} /> },
] as const

const REST = { wide: { x: 1010 / 2, y: 452 }, compact: { x: 330, y: 280 } }

const clock = (n: number) => `${Math.floor(n / 60)}:${String(Math.round(n) % 60).padStart(2, '0')}`

async function script(a: Act<S>) {
  // One tick a second: the countdown runs down, and the live clock up once live.
  const tick = (ms = 1000) => a.wait(ms).then(() => a.put((s) => ({ cd: Math.max(0, s.cd - 1), t: s.live ? s.t + 1 : s.t })))

  await tick(900)
  a.mark('golive')
  await a.move({ at: 'golive', x: 0.55, y: 0.55 })
  await a.wait(150)
  await a.click()
  await a.set({ live: true })
  await tick()
  await tick()
  // The countdown reaches 0:00 as the cut lands.
  await tick(700)
  a.mark('cut')
  await a.move({ at: 'scene-words', x: 0.4, y: 0.5 })
  await a.click()
  await a.set({ scene: 'words' })
  await tick()
  await tick()
  await tick(500)
  // The phone column has no words strip: the cut is its payoff.
  if (a.layout === 'wide') {
    a.mark('next')
    await a.move({ at: 'next', x: 0.5, y: 0.5 })
    await a.wait(120)
    await a.click()
    await a.set({ slide: 1 })
  }
  await tick()
  await tick()
  await tick()
  // The operator's reset: end the broadcast, back to the slate, words back to the top.
  await a.move({ at: 'golive', x: 0.55, y: 0.55 })
  await a.click()
  await a.set({ live: false })
  await a.wait(500)
  await a.move({ at: 'scene-soon', x: 0.4, y: 0.5 })
  await a.click()
  await a.set({ scene: 'soon', cd: 4 })
  if (a.layout === 'wide') {
    await a.wait(350)
    await a.move({ at: 'prev', x: 0.5, y: 0.5 })
    await a.click()
    await a.set({ slide: 0 })
  }
  await a.move('rest')
  await a.wait(900)
  await a.snap({ t: 0 })
}

function Toolbar({ live }: { live: boolean }) {
  return (
    <div className="tml-tools">
      <span className="tml-record">
        <Circle size={12} strokeWidth={2} /> <span>Record</span>
      </span>
      <span className="tml-golive" data-target="golive" data-live={live || undefined}>
        <Swap id={live ? 'end' : 'go'} className="tml-golive-face">
          {live ? (
            <span className="tml-face"><Square size={10} strokeWidth={0} fill="currentColor" /> End</span>
          ) : (
            <span className="tml-face"><Radio size={14} strokeWidth={1.8} /> Go Live</span>
          )}
        </Swap>
      </span>
    </div>
  )
}

function Engine() {
  return (
    <span className="tml-engine">
      <span data-on>This Mac</span>
      <span>OBS</span>
    </span>
  )
}

function Rail({ s }: { s: S }) {
  return (
    <div className="tml-rail">
      <div className="tml-label">Scenes</div>
      {SCENES.map((scene, i) => {
        const on = s.scene === scene.id
        return (
          <div key={scene.id} className="tml-scene" data-scene={scene.id} data-target={`scene-${scene.id}`} data-on={on || undefined} data-live={(on && s.live) || undefined}>
            <span className="tml-thumb">{scene.icon}</span>
            <Text className="tml-scene-title">{scene.title}</Text>
            <span className="tml-key">{i + 1}</span>
          </div>
        )
      })}
    </div>
  )
}

function Monitor({ s }: { s: S }) {
  return (
    <div className="tml-monitor" data-live={s.live || undefined}>
      <div className="tml-card" data-on={s.scene === 'soon' || undefined}>
        <span className="tml-church">Branham Tabernacle</span>
        <span className="tml-slate-title">We’ll begin shortly</span>
        <Count className="tml-countdown" value={s.cd} format={clock} />
        <i className="tml-rule" />
      </div>
      <div className="tml-card tml-card--words" data-on={s.scene === 'words' || undefined}>
        {VERSES.slice(0, 2).map((v, i) => (
          <div key={i} className="tml-verse" data-on={s.slide === i || undefined}>
            <p className="tml-verse-text">{v.text}</p>
            <span className="tml-verse-ref">{v.ref}</span>
          </div>
        ))}
      </div>
      <span className="tml-badge tml-badge--program">PROGRAM</span>
      <span className="tml-badge tml-badge--live">
        LIVE <Count value={s.t} format={clock} duration={300} />
      </span>
      <span className="tml-scene-chip">
        <Swap id={s.scene}>{s.scene === 'words' ? 'Words' : 'Starting Soon'}</Swap>
      </span>
    </div>
  )
}

function Strip({ s }: { s: S }) {
  const now = VERSES[s.slide]!, next = VERSES[s.slide + 1]!
  return (
    <div className="tml-strip">
      <div className="tml-col">
        <span className="tml-label">On Screen</span>
        <Swap id={s.slide} className="tml-swap"><Text className="tml-strip-text">{now.text}</Text></Swap>
        <Swap id={`r${s.slide}`} className="tml-swap"><Text className="tml-strip-ref">{now.ref}</Text></Swap>
      </div>
      <div className="tml-col tml-col--next">
        <span className="tml-label">Next</span>
        <Swap id={s.slide} className="tml-swap"><Text className="tml-strip-text">{next.text}</Text></Swap>
        <Swap id={`r${s.slide}`} className="tml-swap"><Text className="tml-strip-ref">{next.ref}</Text></Swap>
      </div>
      <div className="tml-step">
        <span className="tml-btn" data-target="prev"><ChevronLeft size={16} strokeWidth={1.9} /></span>
        <span className="tml-btn"><EyeOff size={14} strokeWidth={1.7} /></span>
        <span className="tml-btn" data-target="next"><ChevronRight size={16} strokeWidth={1.9} /></span>
      </div>
    </div>
  )
}

function Inspector() {
  return (
    <div className="tml-inspector">
      <span className="tml-tabs"><span data-on>Output</span><span>Sources</span><span>Graphics</span></span>
      <div className="tml-group">
        {[[70, 48], [56, 64], [64, 40]].map(([a, b], i) => (
          <div key={i} className="tml-field"><Bar w={a} h={7} tone={3} /><Bar w={b} h={7} tone={2} /></div>
        ))}
      </div>
      <div className="tml-group">
        {[[60, 44], [72, 36]].map(([a, b], i) => (
          <div key={i} className="tml-field"><Bar w={a} h={7} tone={3} /><Bar w={b} h={7} tone={2} /></div>
        ))}
      </div>
    </div>
  )
}

export default function MessageLive() {
  return (
    <Stage
      width={1000}
      height={470}
      compact={{ below: 820, width: 358, height: 304 }}
      theme="dark"
      accent="#e5484d"
      initial={initial}
      poster={POSTER}
      script={script}
      cursor={{ at: REST }}
      className="tml"
    >
      {(s, _rect, layout) => (
        <>
          <Window
            className="tml-window"
            title={layout === 'wide' ? 'Go Live' : undefined}
            lead={layout === 'wide' ? <Engine /> : undefined}
            toolbar={<Toolbar live={s.live} />}
            body={{ 'data-crop': true }}
          >
            <div className="tml-body">
              <Rail s={s} />
              <div className="tml-center">
                <Monitor s={s} />
                <Strip s={s} />
              </div>
              {layout === 'wide' && <Inspector />}
            </div>
          </Window>
          <span data-target="rest" className="tml-rest" style={{ left: REST[layout].x, top: REST[layout].y }} />
        </>
      )}
    </Stage>
  )
}
