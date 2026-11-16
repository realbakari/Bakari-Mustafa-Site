---
title: Themes and the Sky
permalink: /takumi/docs/themes/
layout: takumi-docs
description: "How Takumi's themes work: the four phases of the day, choosing a theme in the Palette, the Sky behind your windows, themes from your own pictures, fonts and text size."
---

A theme in Takumi is more than a wallpaper and an accent colour. One theme colours the capsule and the Palette, the terminal, the file manager's folders, ordinary apps, the ring around the window you are in, the login screen and the picture behind your windows, which Takumi calls the Sky. All of it changes together.

To try one, press <kbd>Super</kbd>+<kbd>Space</kbd>, type `theme` and move up and down the list. Each theme shows itself on the screen while it is selected. <kbd>Enter</kbd> keeps it, <kbd>Esc</kbd> puts yours back.

| | Mac | Windows | Takumi |
|---|---|---|---|
| Change the look | System Settings, Appearance and Wallpaper | Settings, Personalisation | `theme` in the Palette |
| Dark mode | Appearance: Dark | Choose your mode: Dark | pick a dark theme (most are), or keep the night colours |
| Warmer screen at night | Night Shift | Night light | **Night light** in Quick settings |
| Bigger text | Displays, Larger Text | Accessibility, Text size | `text` in the Palette, **Text bigger** |

## The four phases

Every theme has four phases: dawn, day, dusk and night. The look moves through them with the clock, so the screen you see late at night is not the screen you saw at midday. Dawn and dusk bring a warmer accent; night brings a deeper background, softer text and a quieter accent. A light theme still gets a gentle night, and a dark theme still gets a warm dawn.

The changes are quiet: when a phase begins, the colours fade across over about a second and a half. Nothing flashes.

The phases begin at these times unless you change them:

| Phase | Begins at |
|---|---|
| Dawn | 05:30 |
| Day | 08:00 |
| Dusk | 17:30 |
| Night | 20:30 |

### Keep one phase

If you want the night colours all day (the closest thing to a dark mode switch), type `phase` in the Palette. The rows are:

- **Phase dawn**, **Phase day**, **Phase dusk**, **Phase night**: each says "Pin the … sky" and keeps that phase until you change it.
- **Phase auto**: "Follow the clock" again.

> **Good to know.** The times live in a small text file, `~/.config/takumi/phase.toml`, under `[schedule]`. Change them there if your evenings start earlier or later. The night light follows the same times, so one file sets both.

## Choose a theme

1. Press <kbd>Super</kbd>+<kbd>Space</kbd> and type `theme`. You can also type part of a theme's name (`sakura`) or its mood (`light theme` finds the light ones).
2. Move with <kbd>↑</kbd> and <kbd>↓</kbd>. Each row shows a small picture of the theme, its name and a few words about its mood. The one you use now says **In use**.
3. While a row is selected, the whole shell and the Sky wear that theme so you can judge it in place.
4. <kbd>Enter</kbd> chooses it and recolours every app. <kbd>Esc</kbd> puts your own theme back.

Choosing a theme is the one change that is not quiet: the old Sky parts along its horizon and draws away to show the new one, with a line of the new accent colour along each edge. With animations turned off ([Accessibility](/takumi/docs/accessibility/)), every change is instant.

A notice confirms the new theme by name, for example "Theme Sakura".

## The themes

Fifty-five themes come with Takumi: nineteen light and thirty-six dark. Every one has its four phases and a picture for its row in the Palette.

### Takumi's own

These seventeen were made for Takumi. Each comes with its own painted picture for the Sky.

| Theme | Mood | Light or dark |
|---|---|---|
| Ion | electric blue on near-black, the default | dark |
| Ember | warm amber and rust | dark |
| Kiln | paper and clay in daylight | light |
| Void | monochrome near-black, one quiet accent | dark |
| Beni | safflower crimson on lacquer | dark |
| Fuji | wisteria at dusk | dark |
| Hinoki | pale cypress wood and moss | light |
| Kintsugi | charcoal mended with gold | dark |
| Kuro | high contrast on black, for the clearest reading | dark |
| Matcha | whisked green tea in a dark bowl | dark |
| Sakura | cherry blossom on a spring morning | light |
| Shiro | high contrast on white, for the clearest reading | light |
| Sumi | ink stone black, paper white and a vermilion seal | dark |
| Umi | the deep sea and its teal glow | dark |
| Washi | handmade paper, ink and indigo | light |
| Yoru | a clear night and its stars | dark |
| Yuki | fresh snow under a clear sky | light |

Kuro and Shiro are the clearest to read. High contrast in [Accessibility](/takumi/docs/accessibility/) switches to one of them for you.

### From community palettes

These thirty-eight follow colour palettes that other people made and shared, kept as their authors made them and given Takumi's four phases. A few colours sit a shade off their originals so that text stays easy to read in every phase.

| Theme | Mood | Light or dark |
|---|---|---|
| Ayu Dark | bright gold on near black | dark |
| Ayu Light | Ayu's orange on clean white | light |
| Ayu Mirage | Ayu softened onto blue-grey | dark |
| Catppuccin Frappé | muted pastels on slate | dark |
| Catppuccin Latte | pastel ink on cool paper | light |
| Catppuccin Macchiato | pastels, a little brighter than Mocha | dark |
| Catppuccin Mocha | soothing pastels on a deep blue-grey | dark |
| Dayfox | Nightfox's daylight sibling | light |
| Dracula | vivid purples and pinks after midnight | dark |
| Everforest Dark | soft greens of a forest at dusk | dark |
| Everforest Light | forest greens on sunlit paper | light |
| Flexoki Dark | inky, paper-born colour for reading | dark |
| Flexoki Light | ink on warm paper, made for reading | light |
| GitHub Dark | the colours of code review at night | dark |
| GitHub Light | the colours of code review | light |
| Gruvbox Dark | retro warmth: cream on brown-black | dark |
| Gruvbox Light | retro warmth on old paper | light |
| Iceberg | cool, quiet blues of deep water | dark |
| Kanagawa Wave | Hokusai's wave: ink, foam and indigo | dark |
| Kanagawa Dragon | Kanagawa in dark ink and ash | dark |
| Kanagawa Lotus | Kanagawa on aged rice paper | light |
| Light Owl | Night Owl's daytime twin | light |
| Melange | warm, earthy, easy on the eyes | dark |
| Night Owl | for those who code late into the night | dark |
| Nightfox | a fox's night: teal and soft blue | dark |
| Nord | arctic frost blues on polar night | dark |
| One Dark | the editor classic: calm blues on charcoal | dark |
| One Light | the editor classic in daylight | light |
| Oxocarbon | IBM Carbon's colours, cool and exact | dark |
| Poimandres | minimal, with mint and ice | dark |
| Rosé Pine | soho vibes: rose and gold on aubergine | dark |
| Rosé Pine Dawn | Rosé Pine on morning linen | light |
| Rosé Pine Moon | Rosé Pine under a paler moon | dark |
| Solarized Dark | precise, balanced colour on deep teal | dark |
| Solarized Light | Solarized on warm cream | light |
| Tokyo Night | neon city blues on midnight | dark |
| Tokyo Night Day | Tokyo Night's blues by daylight | light |
| Tokyo Night Storm | Tokyo Night under a softer, stormy sky | dark |

In every phase of every theme, ordinary text is checked to read clearly against its background.

## The Sky

The Sky is what sits behind your windows, on the lock screen and on the login screen. It belongs to the theme, so you do not choose a wallpaper separately.

- **Takumi's own themes** show their painted picture.
- **Every other theme** gets a landscape drawn from the theme's own colours and name. There are six kinds of scene: monoliths on a shore, mountain ridges, a plane of waves under a ringed planet, a pier on the coast, a bamboo grove in mist and layered dunes. Each theme gets its own.

The painted landscapes follow the clock. A disc in the theme's accent colour rises at the left at dawn, crosses the sky and sets behind the horizon at dusk. At night, on a dark theme, a crescent moon sits among stars with soft light in the sky. The disc moves on its own every five minutes. If you keep one phase, the disc stays where that phase puts it.

### Your own picture as the Sky

The way to put your own photo behind your windows is to make a theme from it (next section). The photo becomes that theme's Sky, and its colours become the theme.

## Make a theme from a picture

Type `picture` in the Palette and choose **Make a theme from a picture…**. A file chooser opens in your Pictures folder. Choose a photo, and a moment later the Palette opens on your new theme's row, showing it on the screen with the photo as the Sky. <kbd>Enter</kbd> uses it; <kbd>Esc</kbd> keeps yours.

**Make a theme from my background** does the same with the picture on the Sky now. It names the new theme after the one it came from ("Ion sky"). If the Sky is a painted landscape rather than a picture, it says so and points you to the first row.

What Takumi does with the picture:

- **Light or dark** follows how light the picture is overall: a snowy field gives a light theme, a city at night a dark one.
- **The background** takes the colour of the picture's largest area, calmed and made very dark or very light.
- **The accent** is the picture's most vivid colour. A black and white photo gets a quiet steel blue.
- **The phases**: dawn and dusk warm the accent from the picture's own reds and oranges, and night sinks the background and softens the text.
- Every colour is then made lighter or darker, never a different colour, until text reads clearly in every phase. A theme that does not pass that check is not written.

The new theme is named after the file: `Beach at dusk.jpg` becomes "Beach at dusk". Making it again from the same file gives "Beach at dusk 2". The copy of the photo the theme keeps is turned the way the camera held it, no larger than 4K, and has its camera details removed (on a phone photo, these include where it was taken). Your original file is not changed.

Themes made from a picture are slightly see-through: the terminal and ordinary app windows let the Sky show faintly behind them.

> **Good to know.** Your own themes are kept in `~/.config/takumi/themes/`, one folder each. A theme is only colours and pictures, never a program, so a theme folder someone gives you cannot run anything on your computer.

## Fonts and text size

Type `fonts` in the Palette. The first two rows show the fonts in use: **Interface font** (the Core, menus and apps) and **Code font** (the terminal, the editor and code). Below them is every font family on the computer, each row drawn in its own font. <kbd>Enter</kbd> on a family uses it: an ordinary font for the interface, a monospaced one (every letter the same width) for code. Three letters of a name find it ("plex", "fira").

Takumi starts with Inter for the interface and JetBrains Mono for code. Families that are not installed yet appear as **Get IBM Plex** and similar. <kbd>Enter</kbd> asks for your password in the Core and installs it. The list includes Noto, Inter, JetBrains Mono, IBM Plex, Fira, Source Sans and Source Code Pro, Cascadia Code, Hack, Roboto, Ubuntu, DejaVu, Open Sans, Iosevka and the Nerd Font builds of several code fonts.

For text size, type `text` and choose **Text bigger** or **Text smaller**. The size changes at once in the Core and your apps. To make everything bigger, not only text, see [Displays](/takumi/docs/displays/).

> **Good to know.** Ordinary apps change font at once. Terminals already open, some other apps and the browsers pick up a new font the next time they start.

## The browsers and the terminal prompt

Two rows carry the theme further. Both are in the Palette under `browser` and `prompt`.

**Colour the browsers with the theme.** Firefox, Chromium, Chrome and Brave take the theme's colours: in Firefox the tabs, toolbars, address bar, menus and sidebar, from its next start. Firefox then follows every theme change by itself. Chromium, Chrome and Brave need your password to set their colour (their setting is a file only the system may write), so they keep the old colour after you choose a new theme until you choose the row again; the theme's notice tells you when that is. Takumi adds its own lines to the browsers' files and keeps yours. `takumi theme browsers off` takes Takumi's lines away again.

**Terminal prompt in the theme's colours.** Gives the terminal a prompt (the text before what you type) in the theme's colours: the folder you are in, the branch if it is a code project, how long a slow command took, and a mark that turns red after a command fails. It installs a small program called Starship if it is missing. Choosing the row again turns it off and puts any prompt settings of your own back.

## When something does not look right

- **An app kept the old colours.** Most apps change at once. Firefox reads its colours when it starts, so close and open it again.
- **Chromium is still on the old colour.** Choose **Colour the browsers with the theme** again.
- **The look is stuck on one phase.** You may have pinned one. Choose **Phase auto** to follow the clock.
- **A font did not change in the terminal.** Open a new terminal window.

> **Not yet.** Apps built with Qt take your fonts but not the theme's colours or the text size. Video backgrounds, several pictures in one theme and sharing themes between computers are not built.

## From the command line

```bash
takumi theme list                         # every theme, Takumi's and yours
takumi theme set ember                    # choose a theme
takumi phase current                      # dawn, day, dusk or night
takumi phase set night                    # keep the night colours
takumi phase set auto                     # follow the clock again
takumi theme from ~/Pictures/beach.jpg    # a theme from a picture
takumi theme from ~/Pictures/beach.jpg "Beach house" --dark
takumi theme pick                         # choose the picture first
takumi theme check kiln                   # check each phase reads well
takumi theme browsers                     # colour the browsers; "off" to stop
takumi theme prompt on                    # the prompt in the theme's colours
takumi font list mono                     # fonts in use and on this computer
takumi font set ui "IBM Plex Sans"        # the interface font
takumi font set mono "Fira Code"          # the code font
takumi font get "IBM Plex"                # install a font family
takumi font size bigger                   # or a number from 10 to 20
```

`takumi theme from` with no picture uses the picture on the Sky now.
