# Rehearsal

Two scenes for `/the-message/mac/`, filmed with Stageshow's `film.mjs` on the local Jekyll page.

## Hero (`src/tm-hero`)

- **Gold copied:** `hero-demo` (structure, beats, targets), framed as `linear`'s wide hero on the page's white ground.
- **Story:** a sermon is open. The cursor clicks the reading "Revelation 10:1‑7." in paragraph 35, the Scripture panel slides in with the passage, it holds, and the Scripture button in the toolbar closes it. About 11 seconds.
- **Poster:** the panel open, with the reading highlighted beside the passage.
- **Real strings:** the title block, paragraph 35 as the API's transcript has it, the reading, and Revelation 10:1–3 (KJV). Everything else is placeholder lines.
- **Compact (358):** the reader alone, starting at paragraph 35, with the panel over its right side.

## Sunday (`src/tm-sunday`)

- **Gold copied:** `hero-demo` for the satellite coming forward and the keys; `static-card` for the satellite straddling the window's edge.
- **Story:** the projector is on from the first frame with "Opening Prayer". The right arrow steps to Revelation 10:1, 10:2, then a quote from The First Seal. Present starts the service again from the top. About 11 seconds.
- **Poster:** Revelation 10:1 on the projector beside the plan.
- **Compact (358):** the window off the bottom, the projector under the first item.

## Go Live (`src/tm-live`)

- **Gold copied:** `dark-hero` for a dark window on a light page (depth from surface steps, one lit colour: the live red) and the status that changes on its own control; `hero-demo` for the cursor's beats and named targets. Framed like `tm-sunday`: inset by one gutter, running off the bottom.
- **Story:** Starting Soon counts down; Go Live turns the button to End, starts the LIVE clock and turns the tally red; as the countdown reaches 0:00 a cut to Words fills the monitor with Revelation 5:1; Next steps it to 5:2. The reset is the operator's: End, Starting Soon, and ‹ back to the first verse. About 15 seconds.
- **Poster:** live at 12:34 with Revelation 5:1 on the monitor and Words on air.
- **Real strings:** the six scene names, the slate (Branham Tabernacle, We’ll begin shortly), Revelation 5:1–3 (KJV), the toolbar's Go Live, Record and This Mac / OBS. The settings column is lines, cut by the window's foot.
- **Compact (358):** the monitor alone under Go Live, with three scenes in a row beneath it; no words strip, so the cut is the payoff and Next is left out.

## Checked

- All three scenes at 1280 and 390, full loop, on the real page (`--select #tm-hero-stage`, `#tm-sunday-stage`, `#tm-live-stage`).
- Reduced motion at 1280: both posters.
- `tsc --noEmit` over `src/main.tsx`.
- Literata: the scenes mount once it loads (at most 1.5 s), which removed a reflow jump at 0.2 s.

## Not checked

- Touch devices and Safari; filmed in headless Chrome only.
- The page's dark theme with the scenes running (the scenes keep their light theme by design).
- `film.mjs` reports `kit override` lines for the kit's own phone styles, because the bundle puts the kit's CSS and the scenes' in one file. No scene draws a phone.

## GatherKit hero (`src/gk-hero`)

Filmed with `film.mjs` on a local page that loads the bundle, and on the Jekyll page.

- **Gold copied:** `hero-demo` for the beats and named targets, `static-card` for the satellite straddling the window's edge, framed like the Message hero on the page's white ground.
- **Story:** the check-in window for the Spring Fundraising Gala shows Ready to Check In. Amara Okafor's printed ticket is held up to the scanner. The window says Welcome, Amara, with the organiser's note that she's speaking at 8 pm. The count goes from 41 to 42 of 120, and she tops Recently Checked In. It holds, then the cursor presses Undo on her row. In the app, Undo also clears the welcome, so the reset has a cause. About 10 seconds.
- **Poster:** Welcome, Amara, with her row in the list and 42 of 120.
- **Real strings:** the window title, the event and its date, the count, the outcome, the alert, three names in the list, and the ticket's name, type and code. The other list rows and the ticket's date are bars. The QR code is real: it encodes `GK1:7QFM3K9TBW2H`, the payload a GatherKit ticket carries.
- **Compact (358):** the main pane alone, off the bottom. Undo Check-In under the welcome resets it, and there's no ticket.

### Checked

- Both widths, full loop, on the local page and at 1280 and 390 on `/gatherkit/`.
- `tsc --noEmit` over `src/gatherkit.tsx`.

### Not checked

- Touch devices and Safari; filmed in headless Chrome only.
- `film.mjs` reports these lines on purpose:
  - **`framing:` (window off centre).** The window sits right of centre to leave a wider left column for the ticket, which straddles its edge, as `framing.md` describes for a satellite.
  - **`lopsided:` on "Front Desk".** It's a text field, so its value is left-aligned, as in the app.
  - **`kit override`.** These lines come from the bundled kit CSS, as with The Message's scenes.
- The scan field is below the wide crop. The ticket being held up is what shows the scan.
- Go Live: `film.mjs` reports `vanishes with no exit` for the kit's `Swap`, which re-keys its incoming copy while a separate copy fades the old words out; nothing vanishes on screen.
- Go Live shows features first released in The Message 1.1.0.

## Kora (`src/ko-hero`, `src/ko-detail`, `src/ko-dupes`)

Filmed with `film.mjs` on a local page that loads the bundle, and on the Jekyll page.
Every string a scene shows is checked against Kora's source: the sidebar's All Assets, the
status bar's count and import summary (`ImportSummaryText`), the consent values
(`ConsentStatus+Presentation`), the history sentence (`ChangeDescription`) and the duplicate
sheet's title and explanation (`DuplicateCompareView`). The drop outline (3px accent, radius
10, inset 6), the placeholder tiles, the 8px thumbnail inset and the duration badge follow
Kora's AppKit grid. Photos are Unsplash crops; the names are made up.

### Hero (`src/ko-hero`)

- **Gold copied:** `upload` (a file dragged in, the list lighting up, the drag image and its
  hand-off), `finder` for the macOS window and sidebar, framed like the GatherKit hero: a
  satellite straddling the window's left edge over the sidebar's filler, the window running
  off the right.
- **Story:** a Finder window called Events holds a folder, Harmony Day 2026. It is dragged onto
  All Assets, which outlines itself as Kora's drop target. On the drop the activity button
  becomes a progress ring, two batches arrive at the top of the grid (newest imported first)
  as placeholders that fill in as their previews are made, the count rolls from 1,184 to
  1,220 items, and the status bar reads Imported 36 items · 2 duplicates skipped (Kora skips
  duplicates by default). The folder is still in Finder at the end. About 6 seconds, then it
  holds.
- **Plays once.** An import can't be undone with ⌘Z in Kora, so a loop would need a reset
  with no cause; the scene holds its payoff instead.
- **Poster:** the finished import, with the summary in the status bar.
- **Compact (358):** the library window alone in three columns; the import arrives without the
  drag, and the window keeps a landscape shape.

### Inspector (`src/ko-detail`)

- **Gold copied:** `stacked-cards` for the card on a quiet well, laid out as one panel pinned
  with one gutter and bled off the bottom (Kora's inspector is one panel), with a `Popover` and
  `Menu` for the pop-up button.
- **Story:** the item's date is unknown and shows as a dash. The cursor opens Consent and
  chooses Obtained; the value changes in place (the pop-up keeps one width), and a beat later
  the change lands at the top of History. Plays once and holds.
- **Real strings:** the title, Date Created and its dash, Consent and its six values, History
  and the new entry. Older history is bars, running past the stage.

### Duplicates (`src/ko-dupes`)

- **Gold copied:** `static-card` for a still with real words only on the decision.
- **A still:** Compare Possible Duplicates, the same photo twice at the thumbnail size Kora
  uses, and the two real choices. Cancel is left out so they carry the sheet.

### Checked

- All three scenes, full play, at 1280 and 390 on a local page that loads the bundle:
  `--gate` ends `rehearsal passed` for each.
- Reduced motion: each poster, which is also the page's fallback still
  (`assets/img/kora/hero.jpg`, `detail.jpg`, `duplicates.jpg`).
- The Jekyll page at 1280, 768 and 375 in light and dark site themes, with no horizontal
  scroll and no failed requests; the GatherKit and The Message scenes still mount and play
  with the kit at 1.1.1.
- `tsc --noEmit` over `src/kora.tsx`.

### Not checked

- Touch devices and Safari; filmed in headless Chrome only.
- `film.mjs` reports `settle snap` on the kit's `Count` strip after each roll: the strip
  re-seats inside its one-line window, which clips it, so nothing moves on screen.
- `film.mjs` marks the runs `inconclusive` for sampling gaps in headless Chrome, not for a
  finding.

## Takumi (`src/tk-hero`)

Filmed with `film.mjs` on the Jekyll page.

- **Gold copied:** `dark-hero` for a dark product on a light page (depth from surface steps, one lit
  colour per theme) and `hero-demo` for keys as the beats. No cursor: the story is the keyboard's.
- **Story:** the desktop in Ion, one window on the strip and the sky beside it. Super+Space grows the
  Core into the Palette, "theme" is typed and four themes rise from the field, the one in use
  nearest it. Up makes Sakura current and, after the shell's 350 ms dwell, Sakura takes the whole
  desktop: sky, window, Core and emblem. Up again: Ember. Super+Space closes the Palette, and
  closing puts the theme in use back, which is the loop's reset with its cause. About 12 seconds.
- **Poster:** Ember on the desktop with its row current.
- **Real strings:** Text Editor, notes.md, the clock, what is typed, each theme's title and line as
  `commands/palette/index` words them. The skies and row previews are the themes' own files
  (`themes/<name>/skies/default.jpg` and `sample.png`). Sizes follow `shell/Look/Style.qml`.
- **Compact (358):** the sky and the Core alone; no window, no kind label on the rows.

### Checked

- Both widths, full loop, `--gate` ends `rehearsal passed` at 1280 and 390.
- The theme change frame by frame: the new sky fades in over the old one, which stays whole.
- `tsc --noEmit` over `src/takumi.tsx`.

### Not checked

- Touch devices and Safari; filmed in headless Chrome only.
- Between a dark and a light theme the window and the Core pass through grey for about 0.4 s, as
  the shell's own colour animation does.
- `film.mjs` reports `steps in its box` on the Core as it grows by its width and height (it is
  sized by layout, as the shell sizes it), and a `manual` line for the typed field.
