# Page scenes

The animated scenes on `/the-message/mac/` (the hero and Sunday), `/gatherkit/` (the
check-in hero) and `/kora/` (the import hero, the inspector and duplicates), built with the
[Stageshow](LICENSE-stageshow) kit (MIT). `kit/` is the kit as it ships (version 1.1.1),
without its brand artwork. The scenes are in `src/`: `tm-*` for The Message, `gk-*` for
GatherKit, `ko-*` for Kora. Kora's scenes import the kit file by file through
`src/ko-kit.ts`, so their stylesheet carries only the parts they use; their photos are
Unsplash crops in `assets/img/kora/scene/`.

```bash
npm install
npm run build
```

The build writes `assets/js/the-message/stages.js`, `assets/js/gatherkit/stages.js` and
`assets/js/kora/stages.js`, each with its `stages.css`, which the pages load.
`npm run build:the-message`, `npm run build:gatherkit` and `npm run build:kora` build one
page's scenes.
Jekyll skips this folder because its name starts with an underscore.
