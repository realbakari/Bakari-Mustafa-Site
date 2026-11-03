# The Message for Mac: page scenes

The two animated scenes on `/the-message/mac/`, the hero and Sunday, built with the
[Stageshow](LICENSE-stageshow) kit (MIT). `kit/` is the kit as it ships, without its
brand artwork. The scenes are in `src/`.

```bash
npm install
npm run build
```

The build writes `assets/js/the-message/stages.js` and `stages.css`, which the page loads.
Jekyll skips this folder because its name starts with an underscore.
