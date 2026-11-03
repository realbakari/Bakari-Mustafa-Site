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

## Checked

- Both scenes at 1280 and 390, full loop, on the real page (`--select #tm-hero-stage`, `#tm-sunday-stage`).
- Reduced motion at 1280: both posters.
- `tsc --noEmit` over `src/main.tsx`.
- Literata: the scenes mount once it loads (at most 1.5 s), which removed a reflow jump at 0.2 s.

## Not checked

- Touch devices and Safari; filmed in headless Chrome only.
- The page's dark theme with the scenes running (the scenes keep their light theme by design).
- `film.mjs` reports `kit override` lines for the kit's own phone styles, because the bundle puts the kit's CSS and the scenes' in one file. No scene draws a phone.
