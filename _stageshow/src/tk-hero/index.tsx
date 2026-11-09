import type { CSSProperties } from 'react'
import { FileText, Volume2, Wifi } from 'lucide-react'
import { Bar, Stage, type Act, type Layout } from '../tk-kit'
import './tk-hero.css'

// Takumi, its hero: a desktop on the strip. Super+Space grows the Core, the
// capsule at the bottom, into the Palette. "theme" is typed and the themes
// rise from the field, the one in use nearest it. Moving up the list, each
// theme takes over the whole desktop after a short dwell, as the shell does
// (shell/Core/Open.qml: previewDwell): the sky, the windows, the Core and the
// emblem. Super+Space again closes the Palette, and closing puts the theme in
// use back. That is the loop's reset, with its cause on screen.
//
// Wide: the screen fills the stage. The focused window is ringed in the
// accent and runs off the left and top edges (the strip goes on to the left;
// the Core's map shows the column before it), and the sky shows to its right,
// where the theme's own picture is. Windows stop above the Core, as its
// exclusive zone makes them.
// Compact: the sky and the Palette alone; the windows are left out.
//
// Real strings: the app and file in the Core, the clock, what is typed, and
// each theme row's title and line, as commands/palette/index words them
// ("Theme Ion", "In use · electric blue on near-black, the default"). The
// skies and previews are the themes' own files. Everything else is bars.

type ThemeName = 'ion' | 'sakura' | 'ember' | 'umi'
type S = { open: boolean; q: string; sel: number; theme: ThemeName }

type Palette = { accent: string; background: string; surface: string; foreground: string; mode: 'dark' | 'light' }
const THEMES: Record<ThemeName, Palette & { title: string; about: string }> = {
  ion: { title: 'Ion', about: 'electric blue on near-black, the default', accent: '#5ad7ff', background: '#0b0f14', surface: '#111821', foreground: '#d9e2ec', mode: 'dark' },
  sakura: { title: 'Sakura', about: 'cherry blossom on a spring morning', accent: '#c94a72', background: '#fbf3f4', surface: '#f1e4e6', foreground: '#3a2a30', mode: 'light' },
  ember: { title: 'Ember', about: 'warm amber and rust', accent: '#ff9a3c', background: '#15100c', surface: '#1f1813', foreground: '#f1e3d3', mode: 'dark' },
  umi: { title: 'Umi', about: 'the deep sea and its teal glow', accent: '#3fc1c9', background: '#08131c', surface: '#0d1c28', foreground: '#d4e3ee', mode: 'dark' },
}
const IN_USE: ThemeName = 'ion'

// Top to bottom, as the Palette ranks them: the theme in use scores highest,
// so it sits nearest the field and starts selected.
const ROWS: ThemeName[] = ['umi', 'ember', 'sakura', 'ion']
const START = ROWS.indexOf(IN_USE)

const SKY = (t: ThemeName) => `/assets/img/takumi/skies/${t}.jpg`
const SAMPLE = (t: ThemeName) => `/assets/img/takumi/samples/${t}.jpg`

const initial: S = { open: false, q: '', sel: START, theme: IN_USE }
const POSTER: S = { open: true, q: 'theme', sel: ROWS.indexOf('ember'), theme: 'ember' }

// The shell shows a theme after the row has been current this long
const DWELL = 350

async function script(a: Act<S>) {
  await a.wait(900)

  // 1. Super+Space: the capsule grows into the Palette
  a.mark('open')
  await a.key('super+space')
  await a.set({ open: true })
  await a.wait(420)

  // 2. "theme": the themes rise from the field
  a.mark('type')
  await a.type('q', 'theme', { interval: 70 })
  await a.wait(1100)

  // 3. Up: Sakura is current, and after the dwell it is on the whole desktop
  a.mark('sakura')
  await a.key('up')
  await a.set({ sel: ROWS.indexOf('sakura') })
  await a.wait(DWELL)
  await a.set({ theme: 'sakura' })
  await a.wait(1700)

  // 4. Up again: Ember
  a.mark('ember')
  await a.key('up')
  await a.set({ sel: ROWS.indexOf('ember') })
  await a.wait(DWELL)
  await a.set({ theme: 'ember' })
  await a.wait(2300)

  // 5. Super+Space closes the Palette, and closing puts Ion back
  a.mark('close')
  await a.key('super+space')
  await a.set({ open: false, theme: IN_USE })
  await a.wait(900)
  a.snap({ q: '', sel: START })
  await a.wait(500)
}

const vars = (p: Palette): CSSProperties =>
  ({
    '--tk-accent': p.accent,
    '--tk-bg': p.background,
    '--tk-surface': p.surface,
    '--tk-fg': p.foreground,
    '--tk-ink': p.mode === 'dark' ? p.background : '#ffffff',
  }) as CSSProperties

export default function TakumiHero() {
  return (
    <Stage<S>
      width={1000}
      height={580}
      compact={{ below: 720, width: 358, height: 400 }}
      theme="dark"
      play="loop"
      keys={{ wide: 'top', compact: 'top' }}
      initial={initial}
      poster={POSTER}
      script={script}
      className="tkh"
    >
      {(s, _rect, layout) => <Screen s={s} layout={layout} />}
    </Stage>
  )
}

function Screen({ s, layout }: { s: S; layout: Layout }) {
  const wide = layout === 'wide'
  const t = THEMES[s.theme]
  const rows = s.q.length >= 3 ? ROWS : []
  return (
    <div className="tkh-screen" data-mode={t.mode} style={vars(t)}>
      {(Object.keys(THEMES) as ThemeName[]).map((name) => (
        <img key={name} className="tkh-sky" data-on={name === s.theme || undefined} src={SKY(name)} alt="" draggable={false} />
      ))}

      {wide && (
        <div className="tkh-strip">
          <EditorWindow />
        </div>
      )}

      <div className="tkh-core" data-open={s.open || undefined} data-rows={rows.length} style={{ ['--rows' as string]: rows.length }}>
        <div className="tkh-rest" aria-hidden={s.open}>
          <Emblem size={26} />
          <span className="tkh-rest__app">
            <FileText size={16} strokeWidth={1.75} />
            <span className="tkh-rest__name">Text Editor</span>
            {wide && <span className="tkh-rest__title">notes.md</span>}
          </span>
          {wide && (
            <span className="tkh-map" aria-hidden>
              <span />
              <span data-on />
            </span>
          )}
          <span className="tkh-rest__time">
            {wide && <span className="tkh-rest__date">Mon 9 Nov</span>}
            <span>10:34</span>
          </span>
          <span className="tkh-rest__marks">
            <Wifi size={16} strokeWidth={1.75} />
            <Volume2 size={16} strokeWidth={1.75} />
          </span>
        </div>

        <div className="tkh-open" aria-hidden={!s.open}>
          <div className="tkh-rows">
            {ROWS.map((name, i) => {
              const th = THEMES[name]
              const shown = rows.includes(name)
              return (
                <div
                  key={name}
                  className="tkh-row"
                  data-shown={shown || undefined}
                  data-sel={(shown && s.sel === i) || undefined}
                  style={{ ['--i' as string]: ROWS.length - 1 - i }}
                >
                  <span className="tkh-row__rail" />
                  <span className="tkh-row__slot">
                    <img src={SAMPLE(name)} alt="" draggable={false} />
                  </span>
                  <span className="tkh-row__text">
                    <span className="tkh-row__title">Theme {th.title}</span>
                    <span className="tkh-row__sub">{name === IN_USE ? `In use · ${th.about}` : th.about}</span>
                  </span>
                  <span className="tkh-row__kind">Theme</span>
                </div>
              )
            })}
          </div>
          <div className="tkh-field">
            <Emblem size={16} />
            <span className="tkh-field__text">
              {s.q}
              <span className="tkh-caret" data-typing={(s.open && s.q.length < 5) || undefined} />
            </span>
            <span className="tkh-field__esc">Esc</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Emblem({ size }: { size: number }) {
  return (
    <span className="tkh-emblem" style={{ width: size, height: size, borderRadius: size * 0.28, fontSize: size * 0.74 }} aria-hidden>
      匠
    </span>
  )
}

const line = (w: number | string, extra?: CSSProperties) => <Bar w={w} h={6} r={3} className="tkh-line" style={extra} />

function EditorWindow() {
  const para = [
    [92, 100, 86, 64],
    [100, 94, 72],
    [88, 100, 96, 58],
    [100, 82],
  ]
  return (
    <div className="tkh-win tkh-win--editor" data-focus>
      <div className="tkh-win__bar">
        <span className="tkh-win__title">{line(72)}</span>
      </div>
      <div className="tkh-win__body tkh-doc">
        <span className="tkh-doc__head">{line('42%', { height: 9, borderRadius: 4 })}</span>
        {para.map((ws, p) => (
          <span key={p} className="tkh-doc__para">
            {ws.map((w, i) => (
              <span key={i}>{line(`${w}%`)}</span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}
