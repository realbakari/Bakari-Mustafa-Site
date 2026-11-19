import type { ReactNode } from 'react'
import { Bell, CalendarDays, Clock, Images, ListChecks, MessageCircle, NotebookText, Phone as PhoneIcon, RefreshCw, SquarePen, Sun, Tag, Users } from 'lucide-react'
import { Bar, Collapse, Count, Stage, Window, type Act, type Layout } from '../en-kit'
import { Face, useSiteTheme, type Person } from '../en-shared'
import './en-hero.css'

// Enishi, its hero: a conversation logged in one sentence. The Mac's
// Timeline is open. ⌃⌥M brings up the quick log over it; the sentence is
// typed, and Enishi reads it back as a person, a day and a follow-up. Return
// logs it: the conversation arrives at the top of November with Ada's face
// and the follow-up on it, the rows below make room, the count of
// conversations rolls from 4 to 5 and November's bar grows. It plays once and
// holds there: a logged conversation isn't taken back, so a loop would have
// no honest reset.
//
// Wide: the window inset one gutter top and left, running off the right and
// bottom, the sidebar as Enishi lists it. The quick log sits where macOS puts
// it, low and centred, over the older rows. Compact: the window without its
// sidebar, the quick log across its foot.
//
// Real strings: the sidebar, the title, the count line, the month, the
// sentence and what Enishi reads from it, the new row, and the two rows it
// pushes down. Notes and older months are lines. Icons: lucide, at one size
// and stroke, standing in for the app's SF Symbols. The faces are the app's
// stock sample people.

type S = { open: boolean; typed: string; read: boolean; logged: boolean }

const SENTENCE = 'coffee with Ada yesterday, follow up Friday: send the deck'
const initial: S = { open: false, typed: '', read: false, logged: false }
const POSTER: S = { open: false, typed: '', read: false, logged: true }

/** Conversations a month, December to November; logging adds one to November */
const MONTHS = ['D', 'J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N']
const BEFORE = [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 1]

async function script(a: Act<S>) {
  await a.wait(1100)
  // At the column's width the window has no room above it for keycaps
  if (a.layout === 'wide') await a.key('ctrl+alt+m')
  await a.set({ open: true })
  await a.wait(450)
  await a.type('typed', SENTENCE, { interval: 34 })
  await a.wait(350)
  a.mark('read')
  await a.set({ read: true })
  await a.wait(1700)
  if (a.layout === 'wide') await a.key('return')
  a.mark('logged')
  await a.set({ open: false })
  await a.wait(160)
  await a.set({ logged: true })
  await a.wait(600)
}

const NAV: [typeof Sun, string, number?][] = [
  [Sun, 'Today'],
  [NotebookText, 'Notes'],
  [Users, 'People'],
  [Images, 'Memories'],
  [RefreshCw, 'Reconnect', 1],
  [ListChecks, 'Follow-ups', 1],
  [Clock, 'Timeline'],
]

function Sidebar() {
  return (
    <nav className="enh-side">
      {NAV.map(([Icon, label, count]) => (
        <span key={label} className="enh-nav" data-on={label === 'Timeline' || undefined}>
          <Icon size={16} strokeWidth={1.7} />
          <span className="enh-nav__label">{label}</span>
          {count && <span className="enh-nav__count">{count}</span>}
        </span>
      ))}
      <span className="enh-side__head">Tags</span>
      {[58, 44, 52, 40, 46].map((w, i) => (
        <span key={i} className="enh-nav enh-nav--tag">
          <Tag size={16} strokeWidth={1.7} />
          <Bar w={w} h={6} tone={2} />
        </span>
      ))}
    </nav>
  )
}

function Chart({ logged }: { logged: boolean }) {
  const counts = BEFORE.map((n, i) => (logged && i === 11 ? n + 1 : n))
  const total = counts.reduce((x, y) => x + y, 0)
  return (
    <div className="enh-chart">
      <span className="enh-chart__line">
        <Count value={total} className="enh-chart__count" /> conversations in the last 12 months
      </span>
      <div className="enh-chart__bars">
        {counts.map((n, i) => (
          <span key={i} className="enh-chart__col">
            <span className="enh-chart__bar" data-some={n > 0 || undefined} style={{ height: n ? 4 + n * 13 : 3 }} />
            <span className="enh-chart__month">{MONTHS[i]}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function Entry({ icon: Icon, title, date, people, names, children }: { icon: typeof Sun; title: string; date: string; people: Person[]; names: string; children?: ReactNode }) {
  return (
    <div className="enh-entry">
      <span className="enh-entry__kind"><Icon size={13} strokeWidth={2} /></span>
      <div className="enh-entry__body">
        <span className="enh-entry__top">
          <span className="enh-entry__title">{title}</span>
          <span className="enh-entry__date">{date}</span>
        </span>
        <span className="enh-entry__who">
          <span className="enh-entry__faces">
            {people.map((p) => <Face key={p} who={p} size={18} />)}
          </span>
          {names}
        </span>
        {children}
      </div>
    </div>
  )
}

function Timeline({ logged, layout }: { logged: boolean; layout: Layout }) {
  return (
    <div className="enh-page">
      <Chart logged={logged} />
      <div className="enh-month">November 2026</div>
      <Collapse open={logged}>
        <Entry icon={Users} title="Coffee with Ada" date="18 Nov" people={['ada']} names="Ada">
          <span className="enh-follow">
            <Bell size={11} strokeWidth={2.2} />
            Send the deck · Friday
          </span>
        </Entry>
      </Collapse>
      <Entry icon={MessageCircle} title="Group thread about the hackathon" date="15 Nov" people={['sam', 'ada']} names="Sam and Ada">
        <span className="enh-note"><Bar w={layout === 'compact' ? 190 : 260} h={6} tone={2} /><Bar w={layout === 'compact' ? 120 : 170} h={6} tone={2} /></span>
      </Entry>
      <Entry icon={PhoneIcon} title="Venue options" date="8 Nov" people={['sam']} names="Sam">
        <span className="enh-note"><Bar w={layout === 'compact' ? 170 : 230} h={6} tone={2} /><Bar w={layout === 'compact' ? 100 : 140} h={6} tone={2} /></span>
      </Entry>
      <div className="enh-month">October 2026</div>
      <div className="enh-entry enh-entry--filler">
        <span className="enh-entry__kind" />
        <div className="enh-entry__body">
          <Bar w={150} h={8} tone={3} />
          <Bar w={90} h={6} tone={2} />
          <Bar w={220} h={6} tone={2} />
        </div>
      </div>
    </div>
  )
}

function QuickLog({ s }: { s: S }) {
  return (
    <div className="enh-quick" data-open={s.open || undefined} aria-hidden>
      <div className="enh-quick__line">
        <SquarePen size={18} strokeWidth={1.7} />
        <span className="enh-quick__text">
          {s.typed}
          <span className="enh-caret" data-typing={(s.open && !s.read) || undefined} />
        </span>
      </div>
      <Collapse open={s.read} solid>
        <div className="enh-quick__read">
          <span className="enh-chip"><Face who="ada" size={16} />Ada Lovelace</span>
          <span className="enh-chip"><CalendarDays size={13} strokeWidth={2} />Yesterday</span>
          <span className="enh-chip"><Bell size={13} strokeWidth={2} />Friday: send the deck</span>
        </div>
      </Collapse>
    </div>
  )
}

export default function EnishiHero() {
  const theme = useSiteTheme()
  return (
    <Stage<S>
      width={1000}
      height={540}
      compact={{ below: 820, width: 358, height: 420 }}
      accent={theme === 'dark' ? '#e0835f' : '#a9472b'}
      theme={theme}
      play="once"
      initial={initial}
      poster={POSTER}
      script={script}
      keys={{ wide: 'bottom-right', compact: 'bottom' }}
      className="enh"
    >
      {(s, _rect, layout) => (
        <>
          {layout === 'wide' ? (
            <Window className="enh-window" sidebar={<Sidebar />} sidebarWidth={210} sidebarStyle="floating" title="Timeline">
              <Timeline logged={s.logged} layout={layout} />
            </Window>
          ) : (
            <Window className="enh-window" title="Timeline">
              <Timeline logged={s.logged} layout={layout} />
            </Window>
          )}
          <QuickLog s={s} />
        </>
      )}
    </Stage>
  )
}
