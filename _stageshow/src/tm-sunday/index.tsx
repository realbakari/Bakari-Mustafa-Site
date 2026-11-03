import { BookOpen, ListPlus, Play, Quote, Type, UserRound } from 'lucide-react'
import { Bar, Stage, Text, Window, type Act } from '../../kit'
import './tm-sunday.css'

// The Message for Mac, Sunday. The service is on the projector, the room's
// screen, straddling the Order of Service window. The right arrow steps from
// the opening heading through Revelation 10:1 and 10:2 to a quote from the
// sermon; Present starts again from the top, which is the loop's reset.
//
// Real strings: the plan's name and date, its four items, and each slide.
// The other plans in the sidebar are lines.
//
// Icons: lucide at one size and stroke, for the app's SF Symbols.

type S = { slide: number }

const initial: S = { slide: 0 }
const POSTER: S = { slide: 1 }

const SLIDES = [
  { text: 'Opening Prayer', heading: true },
  { text: 'And I saw another mighty angel come down from heaven, clothed with a cloud: and a rainbow was upon his head, and his face was as it were the sun, and his feet as pillars of fire:', caption: 'Revelation 10:1 · KJV' },
  { text: 'And he had in his hand a little book open: and he set his right foot upon the sea, and his left foot on the earth,', caption: 'Revelation 10:2 · KJV' },
  { text: '“It’s an eternal Book.”', caption: 'The First Seal ¶4 · 63-0318' },
]

const REST = { wide: { x: 470, y: 420 }, compact: { x: 300, y: 150 } }

async function script(a: Act<S>) {
  await a.wait(1600)
  for (const slide of [1, 2, 3]) {
    await a.key('right')
    await a.set({ slide })
    await a.wait(slide === 1 ? 2800 : 2300)
  }
  // Present again: the service starts over from its first item.
  await a.move({ at: 'present', x: 0.75, y: 0.6 })
  await a.wait(250)
  await a.click()
  await a.set({ slide: 0 })
  await a.move('rest')
  await a.wait(600)
}

const ITEMS = [
  { kind: 'heading', icon: <Type size={14} strokeWidth={1.6} />, title: 'Opening Prayer', selected: true },
  { kind: 'passage', icon: <BookOpen size={14} strokeWidth={1.6} />, title: 'Revelation 10:1–2 · KJV' },
  { kind: 'quote', icon: <Quote size={14} strokeWidth={1.6} />, title: '“It’s an eternal Book.”', meta: 'The First Seal ¶4' },
  { kind: 'heading', icon: <Type size={14} strokeWidth={1.6} />, title: 'The First Seal' },
] as const

function Plans() {
  return (
    <div className="tms-plans">
      <div className="tms-plan" data-selected>
        <Text className="tms-plan-title">Sunday Service</Text>
        <Text className="tms-plan-date">Sunday 8 November</Text>
      </div>
      {[[92, 70], [80, 64], [104, 58]].map(([a, b], i) => (
        <div key={i} className="tms-plan">
          <Bar w={a} h={6} tone={3} />
          <Bar w={b} h={5} tone={2} />
        </div>
      ))}
    </div>
  )
}

function Toolbar() {
  return (
    <div className="tms-tools">
      <span className="tms-tool"><ListPlus size={15} strokeWidth={1.6} /></span>
      <span className="tms-tool"><UserRound size={15} strokeWidth={1.6} /></span>
      <span className="tms-present" data-target="present">
        <Play size={12} strokeWidth={0} fill="currentColor" /> <span>Present</span>
      </span>
    </div>
  )
}

export default function MessageSunday() {
  return (
    <Stage
      width={1000}
      height={470}
      compact={{ below: 820, width: 358, height: 358 }}
      accent="#2f6fd6"
      initial={initial}
      poster={POSTER}
      script={script}
      cursor={{ at: REST }}
      keys={{ wide: 'bottom-left', compact: 'top' }}
      className="tms"
    >
      {(s, _rect, layout) => (
        <>
          <Window
            className="tms-window"
            sidebar={layout === 'wide' ? <Plans /> : undefined}
            sidebarWidth={186}
            title={layout === 'wide' ? 'Order of Service' : undefined}
            toolbar={<Toolbar />}
            body={{ 'data-crop': true }}
          >
            <div className="tms-plan-body">
              <div className="tms-heading">Sunday Service</div>
              <div className="tms-date">Sunday 8 November 2026</div>
              <div className="tms-items">
                {ITEMS.map((item) => (
                  <div key={item.title} className="tms-item" data-kind={item.kind} data-selected={'selected' in item || undefined}>
                    <span className="tms-item-icon">{item.icon}</span>
                    <div className="tms-item-text">
                      <Text className="tms-item-title">{item.title}</Text>
                      {'meta' in item && <Text className="tms-item-meta">{item.meta}</Text>}
                    </div>
                  </div>
                ))}
                {[[132, 0], [96, 70]].map(([a, b], i) => (
                  <div key={i} className="tms-item" data-filler>
                    <span className="tms-item-icon"><Bar w={14} h={14} r={4} tone={2} /></span>
                    <div className="tms-item-text">
                      <Bar w={a} h={7} tone={3} />
                      {b > 0 && <Bar w={b} h={5} tone={2} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Window>

          {/* The projector: the second display, showing what the room sees */}
          <div className="tms-screen">
            {SLIDES.map((slide, i) => (
              <div key={i} className="tms-slide" data-heading={slide.heading || undefined} data-on={s.slide === i || undefined}>
                <p className="tms-slide-text">{slide.text}</p>
                {slide.caption && <span className="tms-slide-caption">{slide.caption}</span>}
              </div>
            ))}
          </div>
          <span data-target="rest" className="tms-rest" style={{ left: REST[layout].x, top: REST[layout].y }} />
        </>
      )}
    </Stage>
  )
}
