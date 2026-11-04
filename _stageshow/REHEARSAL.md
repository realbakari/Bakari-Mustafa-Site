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
