import { ArrowDownToLine, ChevronsUpDown, Pencil } from 'lucide-react'
import { Bar, Collapse, Menu, Popover, Stage, States, Text, type Act } from '../ko-kit'
import { PHOTO } from '../ko-shared'
import './ko-detail.css'

// Kora, describing an item: the inspector as one panel, pinned with one
// gutter at the top and sides and running off the bottom. The item's date is
// unknown and shows as a dash (Kora never guesses one), and consent is Not
// Recorded. The cursor opens the Consent pop-up and chooses Obtained; the
// value changes in place, and a beat later the change lands at the top of
// History below, with who made it and when. Plays once and holds: the still
// is the payoff.
//
// Real strings: the item's title, Date Created and its dash, Consent and its
// six values in the menu, History and the new entry. Older history is bars,
// running on past the stage's bottom edge.

type S = { menu: boolean; hover: number; consent: 'notRecorded' | 'obtained'; logged: boolean }

const initial: S = { menu: false, hover: 0, consent: 'notRecorded', logged: false }
const POSTER: S = { menu: false, hover: 3, consent: 'obtained', logged: true }

const CONSENT = ['Not Recorded', 'Not Required', 'Pending', 'Obtained', 'Refused', 'Withdrawn']
const TARGETS = CONSENT.map((_, i) => `consent-${i}`)
const MENU_W = 160
/** Older history, as placeholder lines: enough rows to run past the stage */
const OLDER: [number, number][] = [[210, 120], [170, 104], [196, 112], [150, 96], [184, 118]]

async function script(a: Act<S>) {
  await a.wait(900)

  // 1. Open the Consent menu
  a.mark('open')
  await a.move({ at: 'consent', x: 0.82, y: 0.55 })
  await a.wait(180)
  await a.click()
  await a.set({ menu: true, hover: 0 })
  await a.wait(500)

  // 2. Choose Obtained
  a.mark('choose')
  await a.move({ at: 'consent-3', x: 0.78, y: 0.55 })
  await a.set({ hover: 3 })
  await a.wait(260)
  await a.click()
  await a.set({ consent: 'obtained' })
  await a.wait(90)
  await a.set({ menu: false })

  // 3. The change is recorded, a beat after the value lands
  a.mark('logged')
  await a.wait(420)
  await a.set({ logged: true })
  void a.move('rest')
  await a.wait(2800)
}

export default function KoraDetail() {
  return (
    <Stage<S>
      width={520}
      height={440}
      compact={{ below: 520, width: 358, height: 420 }}
      accent="#b5482a"
      greys="cool"
      play="once"
      initial={initial}
      poster={POSTER}
      script={script}
      cursor={{ at: { wide: { x: 470, y: 120 }, compact: { x: 330, y: 120 } } }}
      className="kod"
    >
      {(s, rect) => {
        const at = rect('consent')
        return (
        <>
          <section className="kod-card">
              <div className="kod-item">
                <img className="kod-thumb" src={PHOTO('friends-close')} alt="" draggable={false} />
                <div className="kod-who">
                  <Text className="kod-title">Opening night</Text>
                  <Bar w={92} h={6} tone={2} />
                </div>
              </div>
              <div className="kod-field">
                <span className="kod-label">Date Created</span>
                <span className="kod-value">
                  <span className="kod-unknown">—</span>
                  <span className="kod-link">Set…</span>
                </span>
              </div>
              <div className="kod-field">
                <span className="kod-label">Consent</span>
                <span className="kod-popup" data-target="consent" data-open={s.menu || undefined}>
                  <States value={s.consent} align="start" states={{ notRecorded: 'Not Recorded', obtained: 'Obtained' }} />
                  <ChevronsUpDown size={12} strokeWidth={2} className="kod-chev" />
                </span>
              </div>
              <div className="kod-history">
              <span className="kod-heading">History</span>
              <Collapse open={s.logged} reveal="drop">
                <div className="kod-change">
                  <span className="kod-change__icon">
                    <Pencil size={14} strokeWidth={1.8} />
                  </span>
                  <div className="kod-change__text">
                    <Text wrap>Consent changed from “Not Recorded” to “Obtained”</Text>
                    <Text className="kod-meta">Amina Yusuf · now</Text>
                  </div>
                </div>
              </Collapse>
              {OLDER.map(([a, b], i) => (
                <div key={i} className="kod-change">
                  <span className="kod-change__icon">
                    <ArrowDownToLine size={14} strokeWidth={1.8} />
                  </span>
                  <div className="kod-change__text kod-change__text--bars">
                    <Bar w={a} h={6} tone={3} />
                    <Bar w={b} h={5} tone={2} />
                  </div>
                </div>
              ))}
              </div>
          </section>

          <Popover show={s.menu} origin="top right" className="kod-menu" style={{ left: at.x + at.width - MENU_W, top: at.y + at.height + 4, width: MENU_W }}>
            <Menu items={CONSENT} value={s.hover} targets={TARGETS} />
          </Popover>
          <span data-target="rest" className="kod-rest" />
        </>
        )
      }}
    </Stage>
  )
}
