# Page scenes

The animated scenes on `/the-message/mac/` (the hero and Sunday) and `/gatherkit/` (the
check-in hero), built with the [Stageshow](LICENSE-stageshow) kit (MIT). `kit/` is the kit
as it ships, without its brand artwork. The scenes are in `src/`: `tm-*` for The Message,
`gk-*` for GatherKit.

```bash
npm install
npm run build
```

The build writes `assets/js/the-message/stages.js` and `assets/js/gatherkit/stages.js`, each
with its `stages.css`, which the pages load. `npm run build:the-message` and
`npm run build:gatherkit` build one page's scenes.
Jekyll skips this folder because its name starts with an underscore.
