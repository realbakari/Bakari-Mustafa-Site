import { Bell, CalendarDays, ChevronLeft, Ellipsis, Mail, MessageCircle, SquarePen } from 'lucide-react'
import { Phone, Stage, type Act } from '../en-kit'
import { Face, useSiteTheme, type Person } from '../en-shared'
import './en-today.css'

// Enishi, Today on iPhone: who today is about, as faces, with what's due
// under them. A tap on Ada's face pushes her page (what she does, when you
// last spoke, what you said you'd do) and the back button brings Today
// back, which is the loop's reset.
//
// Wide and compact: the phone pinned a gutter from the top, running off the
// bottom, at the column's width.
//
// Real strings: the title and date, three first names, two follow-ups and a
// reconnect on Today; Ada's name, role, last contact, actions and her open
// follow-up on her page. Icons: lucide standing in for SF Symbols. The faces
// are the app's stock sample people.

type S = { person: boolean }

const initial: S = { person: false }
const REST = { wide: { x: 430, y: 380 }, compact: { x: 300, y: 390 } }

async function script(a: Act<S>) {
  await a.wait(1200)
  await a.move('face-ada')
  await a.click()
  await a.set({ person: true })
  await a.wait(3600)
  await a.move('back')
  await a.click()
  await a.set({ person: false })
  await a.wait(500)
  await a.move('rest')
  await a.wait(900)
}

function FaceStop({ who, name, badge, target }: { who: Person; name: string; badge?: 'due' | 'talk'; target?: string }) {
  return (
    <span className="ent-stop" data-target={target}>
      <span className="ent-ring" data-due={badge === 'due' || undefined}>
        <Face who={who} size={60} />
        {badge && (
          <span className="ent-badge" data-due={badge === 'due' || undefined}>
            {badge === 'due' ? <Bell size={11} strokeWidth={2.4} /> : <MessageCircle size={11} strokeWidth={2.4} />}
          </span>
        )}
      </span>
      <span className="ent-stop__name">{name}</span>
    </span>
  )
}

function Due({ title, when, who, late }: { title: string; when: string; who: string; late?: boolean }) {
  return (
    <div className="ent-due">
      <span className="ent-tick" />
      <span className="ent-due__body">
        <span className="ent-due__title">{title}</span>
        <span className="ent-due__meta"><span data-late={late || undefined}>{when}</span>{who && ` · ${who}`}</span>
      </span>
    </div>
  )
}

function Today() {
  return (
    <div className="ent-screen">
      <div className="ent-nav">
        <span />
        <span className="ent-glass"><SquarePen size={19} strokeWidth={1.9} /></span>
      </div>
      <div className="ent-large">Today</div>
      <div className="ent-date">Thursday 19 November</div>
      <div className="ent-faces">
        <FaceStop who="ada" name="Ada" badge="due" target="face-ada" />
        <FaceStop who="sam" name="Sam" />
        <FaceStop who="grace" name="Grace" badge="talk" />
      </div>
      <div className="ent-head"><span>Follow-ups</span><span className="ent-link">See All</span></div>
      <div className="ent-card">
        <Due title="Send the deck" when="Friday" who="Ada Lovelace" />
        <Due title="Book the venue" when="In 3 days" who="Sam Okafor" />
      </div>
      <div className="ent-head"><span>Reconnect</span><span className="ent-link">See All</span></div>
      <div className="ent-card">
        <div className="ent-person">
          <Face who="grace" size={34} />
          <span className="ent-due__body">
            <span className="ent-due__title">Grace Hopper</span>
            <span className="ent-due__meta">Last contact 4 months ago</span>
          </span>
          <span className="ent-link">Touched Base</span>
        </div>
      </div>
    </div>
  )
}

function Ada() {
  return (
    <div className="ent-screen ent-screen--person">
      <div className="ent-nav">
        <span className="ent-glass" data-target="back"><ChevronLeft size={22} strokeWidth={2.1} /></span>
        <span className="ent-glass ent-glass--pill">Edit<Ellipsis size={18} strokeWidth={2.2} /></span>
      </div>
      <div className="ent-hero">
        <Face who="ada" size={80} />
        <span className="ent-hero__name">Ada Lovelace</span>
        <span className="ent-hero__role">Founder · Analytical Engines</span>
        <span className="ent-hero__last">Last contact yesterday · in touch every month</span>
      </div>
      <div className="ent-actions">
        {([[SquarePen, 'Log'], [Mail, 'Email'], [CalendarDays, 'Plan']] as const).map(([Icon, label]) => (
          <span key={label} className="ent-action">
            <span className="ent-action__disc"><Icon size={19} strokeWidth={1.9} /></span>
            {label}
          </span>
        ))}
      </div>
      <div className="ent-head"><span>Open follow-ups</span></div>
      <div className="ent-card">
        <Due title="Send the deck" when="Friday" who="" />
      </div>
    </div>
  )
}

export default function EnishiToday() {
  const theme = useSiteTheme()
  return (
    <Stage<S>
      width={520}
      height={440}
      compact={{ below: 520, width: 358, height: 400 }}
      accent={theme === 'dark' ? '#e0835f' : '#a9472b'}
      theme={theme}
      initial={initial}
      poster={initial}
      script={script}
      cursor={{ at: REST, style: 'touch' }}
      className="ent"
    >
      {(s, _rect, layout) => (
        <>
          <Phone className="ent-phone" width={layout === 'compact' ? 310 : 340} dark={theme === 'dark'} time="9:41">
            <div className="ent-stack" data-person={s.person || undefined}>
              <div className="ent-layer ent-layer--today"><Today /></div>
              <div className="ent-layer ent-layer--person"><Ada /></div>
            </div>
          </Phone>
          <span data-target="rest" className="ent-rest" style={{ left: REST[layout].x, top: REST[layout].y }} />
        </>
      )}
    </Stage>
  )
}
