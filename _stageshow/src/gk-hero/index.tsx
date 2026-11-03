import { Camera, Check, ChevronDown, MessageSquareWarning, Monitor, ScanBarcode, ScanQrCode, Undo2 } from 'lucide-react'
import { Bar, Collapse, Count, Row, Stage, Text, Window, type Act } from '../../kit'
import { QR } from '../gk-qr'
import './gk-hero.css'

// GatherKit, its hero: the check-in window at the door. Amara's ticket is
// scanned, the window welcomes her with the note her organiser left, the count
// goes up and she tops the Recently Checked In list. It holds, then the cursor
// presses her row's Undo, which in the app also clears the welcome: a caused
// reset back to Ready to Check In.
//
// Wide: the ticket straddles the window's left edge, over the outcome panel's
// empty margin, and the window runs off the bottom past the scan field.
// Compact: the main pane alone, off the bottom the same way; Undo Check-In
// under the welcome resets it.
//
// Real strings: the window title, the event, the count, the outcome, the alert,
// three names in the list, the ticket's name, type and code. The rest is bars.
// Icons: lucide at one size and stroke, standing in for the app's SF Symbols.

type S = { scanned: boolean; lifted: boolean }

const initial: S = { scanned: false, lifted: false }
const POSTER: S = { scanned: true, lifted: false }

const EXPECTED = 120
const BEFORE = 41

const REST = { wide: { x: 660, y: 250 }, compact: { x: 300, y: 130 } }

async function script(a: Act<S>) {
  const layout = a.layout
  await a.wait(900)
  if (layout === 'wide') {
    // The ticket is held up to the scanner
    await a.set({ lifted: true })
    await a.wait(380)
  }
  a.mark('scan')
  await a.set({ scanned: true, lifted: false })
  await a.wait(3600)

  await a.move({ at: layout === 'compact' ? 'undo-checkin' : 'undo', x: layout === 'compact' ? 0.93 : 0.75, y: 0.65 })
  await a.wait(250)
  await a.click()
  await a.set({ scanned: false })
  await a.wait(300)
  await a.move('rest')
  await a.wait(500)
}

function Ticket() {
  return (
    <div className="gkh-ticket" aria-hidden>
      <div className="gkh-ticket-top">
        <div className="gkh-ticket-event">
          <span className="gkh-ticket-eyebrow">Fundraising</span>
          <span className="gkh-ticket-title">Spring Fundraising Gala</span>
          <Bar w={92} h={6} tone={2} />
        </div>
        <div className="gkh-ticket-code">
          <svg viewBox={`-1 -1 ${QR.size + 2} ${QR.size + 2}`} className="gkh-qr" shapeRendering="crispEdges">
            <path d={QR.path} />
          </svg>
          <span>7QFM-3K9T-BW2H</span>
        </div>
      </div>
      <div className="gkh-ticket-admit">
        <span className="gkh-ticket-eyebrow gkh-ticket-eyebrow--ink">Admit</span>
        <span className="gkh-ticket-name">Amara Okafor</span>
        <span className="gkh-ticket-type">VIP · plus 1 guest</span>
      </div>
    </div>
  )
}

function Toolbar({ compact }: { compact: boolean }) {
  return (
    <div className="gkh-tools">
      {!compact && <span className="gkh-station">Front Desk</span>}
      {!compact && (
        <span className="gkh-tool gkh-tool--menu">
          <Monitor size={16} strokeWidth={1.7} />
          <ChevronDown size={12} strokeWidth={2.2} />
        </span>
      )}
      <span className="gkh-tool"><Camera size={16} strokeWidth={1.7} /></span>
    </div>
  )
}

function Header({ scanned }: { scanned: boolean }) {
  const count = scanned ? BEFORE + 1 : BEFORE
  return (
    <div className="gkh-header">
      <div className="gkh-event">
        <span className="gkh-event-name">Spring Fundraising Gala</span>
        <span className="gkh-event-date">20 Nov 2026, 6:30 – 10:30 pm</span>
      </div>
      <div className="gkh-progress">
        <span className="gkh-progress-label">
          <Count value={count} className="gkh-count" /> of {EXPECTED} checked in
        </span>
        <span className="gkh-progress-track">
          <span className="gkh-progress-fill" style={{ width: `${(count / EXPECTED) * 100}%` }} />
        </span>
      </div>
    </div>
  )
}

function Outcome({ scanned }: { scanned: boolean }) {
  return (
    <div className="gkh-outcome">
      <div className="gkh-state" data-on={!scanned || undefined}>
        <ScanQrCode className="gkh-ready-icon" size={56} strokeWidth={1.1} />
        <span className="gkh-headline">Ready to Check In</span>
        <span className="gkh-ready-text">Scan a ticket with a barcode scanner or the camera, type a ticket code, or find someone by name.</span>
      </div>
      <div className="gkh-state" data-on={scanned || undefined}>
        <span className="gkh-welcome-icon"><Check size={30} strokeWidth={2.6} /></span>
        <span className="gkh-headline">Welcome, Amara</span>
        <span className="gkh-detail">Amara Okafor · VIP · + 1 guest</span>
        <span className="gkh-alert">
          <MessageSquareWarning size={16} strokeWidth={1.8} />
          Speaking at 8 pm: seat at table 1
        </span>
        <span className="gkh-undo-button" data-target="undo-checkin">
          <Undo2 size={14} strokeWidth={1.9} /> Undo Check-In
        </span>
      </div>
    </div>
  )
}

function Recent({ scanned }: { scanned: boolean }) {
  return (
    <div className="gkh-lookup">
      <span className="gkh-find">Find by name or email</span>
      <div className="gkh-section">Recently Checked In</div>
      <Collapse open={scanned}>
        <Row pad={10} className="gkh-row" title={<Text>Amara Okafor</Text>} subtitle={<Text>6:52 pm · Front Desk</Text>}>
          <span className="gkh-row-undo" data-target="undo">Undo</span>
        </Row>
      </Collapse>
      <Row pad={10} className="gkh-row" title={<Text>Ethan Kim</Text>} subtitle={<Text>6:49 pm · Front Desk</Text>}>
        <span className="gkh-row-undo">Undo</span>
      </Row>
      <Row pad={10} className="gkh-row" title={<Text>Mia Patel</Text>} subtitle={<Text>6:47 pm · Door 2</Text>}>
        <span className="gkh-row-undo">Undo</span>
      </Row>
      {[[74, 96], [88, 84], [66, 92], [82, 78], [70, 90]].map(([a, b], i) => (
        <Row key={i} pad={10} className="gkh-row" title={<Bar w={a} h={7} tone={3} />} subtitle={<Bar w={b} h={6} tone={2} />} />
      ))}
    </div>
  )
}

export default function GatherKitHero() {
  return (
    <Stage
      width={1000}
      height={540}
      compact={{ below: 820, width: 358, height: 340 }}
      accent="#2f7bf5"
      greys="cool"
      initial={initial}
      poster={POSTER}
      script={script}
      cursor={{ at: REST }}
      className="gkh"
    >
      {(s, _rect, layout) => {
        const compact = layout === 'compact'
        return (
          <>
            <Window className="gkh-window" title={compact ? 'Check-In' : 'Check-In — Spring Fundraising Gala'} toolbar={<Toolbar compact={compact} />} body={{ 'data-crop': true }}>
              <div className="gkh-body">
                <div className="gkh-main">
                  <Header scanned={s.scanned} />
                  <Outcome scanned={s.scanned} />
                  <div className="gkh-scan">
                    <ScanBarcode size={18} strokeWidth={1.6} />
                    <span className="gkh-scan-text">Scan or type a ticket code</span>
                  </div>
                </div>
                {!compact && <Recent scanned={s.scanned} />}
              </div>
            </Window>
            {!compact && (
              <div className="gkh-ticket-slot" data-lifted={s.lifted || undefined}>
                <Ticket />
              </div>
            )}
            <span data-target="rest" className="gkh-rest" style={{ left: REST[layout].x, top: REST[layout].y }} />
          </>
        )
      }}
    </Stage>
  )
}
