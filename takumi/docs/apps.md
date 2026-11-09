---
title: Apps, the Shelf and defaults
permalink: /takumi/docs/apps/
layout: takumi-docs
description: "The apps Takumi comes with, getting more by name from the Palette, removing them, choosing default apps, web apps, Windows programs, Steam and setting up for coding."
---

Takumi has no app store window, no uninstaller and no default apps page. Apps come and go in the Palette like everything else: press <kbd>Super</kbd>+<kbd>Space</kbd> and type what you want.

To get an app you do not have, type its name. If Takumi knows it, the row says **Get Spotify** (or Zoom, Slack, Visual Studio Code and many more). <kbd>Enter</kbd> installs it just for you, without a password.

| | Mac | Windows | Takumi |
|---|---|---|---|
| Open an app | `Cmd+Space`, then type | `Win`, then type | <kbd>Super</kbd>+<kbd>Space</kbd>, then type |
| Get an app | App Store | Microsoft Store | its name in the Palette, **Get …** |
| Remove an app | drag to the Bin | Settings, Apps | `remove` and its name |
| Default apps | Finder, Get Info, Open with | Settings, Default apps | `default` in the Palette |
| Force a stuck app to quit | `Cmd+Option+Esc` | Task Manager | <kbd>Super</kbd>+<kbd>Alt</kbd>+<kbd>Esc</kbd> |

## What comes installed

| For | App |
|---|---|
| The web | Firefox |
| Files and folders | Files |
| Documents, spreadsheets, slides | LibreOffice (Writer, Calc, Impress) |
| Plain text and code | Text Editor, and Neovim in the terminal |
| PDFs | Papers |
| Pictures, including iPhone photos | Image Viewer |
| Video and music | Celluloid |
| The terminal | Foot |
| What fills the disk | Disk Usage Analyzer |

Word, Excel and PowerPoint files open in LibreOffice. To see every app, type `apps` in the Palette: a grid of icons from A to Z. The arrow keys move through it and <kbd>Enter</kbd> opens one.

The empty Palette also shows a row of app tiles: the ones you open most, and the everyday ones until your own use takes over.

Three keys open the app you chose for each:

| Keys | Opens |
|---|---|
| <kbd>Super</kbd>+<kbd>B</kbd> | the browser |
| <kbd>Super</kbd>+<kbd>E</kbd> | Files |
| <kbd>Super</kbd>+<kbd>Return</kbd> | the terminal |

## Get apps by name: the Shelf

The Shelf is Takumi's list of apps people ask for by name. Most come from [Flathub](https://flathub.org), a large shared catalogue of apps for Linux. They install into your own account: no password, and nothing changes for anyone else on the computer.

Type part of the app's name and press <kbd>Enter</kbd> on its **Get** row. The row says where the app comes from ("from Flathub, just for you"). Once it is installed, the row leaves the Shelf and the app shows like any other.

The Shelf includes:

- **Everyday**: Spotify, Zoom, Slack, Discord, Telegram, Signal, Element, Thunderbird, Obsidian, Dropbox, LocalSend.
- **Browsers**: Chromium, Google Chrome, Brave, Microsoft Edge.
- **Passwords**: Bitwarden, 1Password.
- **Making things**: GIMP, Inkscape, Krita, Blender, Kdenlive, Audacity, OBS Studio, VLC, Visual Studio Code.
- **Games**: Heroic, Lutris, RetroArch, Moonlight, Prism Launcher (for Minecraft), Sunshine, Bottles.
- **Tools**: Mission Center, which shows what is using the computer.

Type `games` to list every game launcher, streamer and cloud gaming service on the Shelf.

> **Good to know.** An app that is not on the Shelf can still come from Flathub or from the system's own packages. See "Optional software" below for the command.

## Web apps

A web app is a website in a window of its own, with its own icon. It shows in the Palette and the apps grid like any app, and its name shows in the capsule while you use it. The Shelf has the ones people coming from a Mac or a Windows PC ask for:

| Rows | What they are |
|---|---|
| **Get Outlook**, **Get Word**, **Get Excel**, **Get PowerPoint**, **Get Teams** | Microsoft 365 (type `office` or `microsoft` to list all five) |
| **Get WhatsApp** | WhatsApp on the web |
| **Get Gmail**, **Get Google Calendar** | Google |
| **Get Notion**, **Get Figma** | Notion and Figma |
| **Get Discord (web)** | Discord in the browser, beside the Discord app |
| **Get ChatGPT**, **Get Claude** | the two assistants' websites |
| **Get GeForce NOW**, **Get Xbox Cloud Gaming** | games streamed from the cloud |

<kbd>Enter</kbd> makes the web app in a second or two. It takes the site's own icon, or the first letter of its name on a colour when the site has none.

A web app opens in a Chromium-family browser (Chromium, Google Chrome, Brave, Microsoft Edge or Vivaldi): your default browser if it is one of these, otherwise the first one installed. It shares that browser's sign-ins, so signing in to Microsoft in Outlook signs Word in too. Firefox cannot open a site as an app. If Firefox is your only browser, the Core offers Chromium from Flathub, just for you.

To make a web app from any other site, use the command at the end of this page.

## Remove an app

Type `remove`, `uninstall` or `delete`, with a name to narrow it (`remove spotify`). <kbd>Enter</kbd> asks in the Core first and says what stays.

| Row says | What goes |
|---|---|
| Web app | its window and icon; what you signed in to stays in the browser |
| From Flathub, just for you | the app; its settings stay in your home folder |
| Installed apart from Takumi | the app and what only it needed, with your password |
| **Remove Windows** | Windows and its disk, with everything in it; your `Windows` folder stays |

Apps that come with Takumi cannot be removed, because every update would bring them back. An app another app needs stays too, and the Core says so.

## Default apps

Type `default`. The Palette lists each kind of app and the one that opens it:

| Row | Opens |
|---|---|
| **Browser: Firefox** | web links and pages, and <kbd>Super</kbd>+<kbd>B</kbd> |
| **Mail: none chosen** | email links |
| **Terminal: Foot** | <kbd>Super</kbd>+<kbd>Return</kbd> and terminal apps |
| **Editor: Text Editor** | text and code files |
| **PDFs: Papers** | PDF documents |
| **Images: Image Viewer** | pictures and photos |
| **Video: Celluloid** | films and clips |
| **Music: Celluloid** | songs and recordings |
| **Files: Files** | folders, and <kbd>Super</kbd>+<kbd>E</kbd> |

<kbd>Enter</kbd> on one lists the installed apps that can do that job, the one in use first. <kbd>Enter</kbd> on another app makes it the default, and the Core says so: "Browser: Chromium · web links and pages open there now". The kind's own word works from anywhere: `browser`, `pdf`, `terminal`, `photos`, `default editor`.

The browser, mail, editor and video lists end with a row that looks on the Shelf for another one (**Get another browser**, **Get a mail app**). An app's name with `default` shows every kind it can be: `make chrome default`.

Mail starts with nothing chosen. Get a mail app such as Thunderbird, then choose it here.

> **Not yet.** A web app cannot yet be the mail app, so email links cannot open Gmail or Outlook on the web. Other file types (archives, documents) are chosen in Files, with Open With.

## Apps that open at login

Type `login` (or `startup`). The rows list the apps that open when you log in; <kbd>Enter</kbd> on one stops it. `login Spotify` offers **Open Spotify at login**.

## An app that is stuck

Press <kbd>Super</kbd>+<kbd>Alt</kbd>+<kbd>Esc</kbd>, or type `force quit`. Each app with a window has a **Force quit** row and a **Restart** row, which quits it and opens it again. Unsaved work in it is lost. **Close all windows** closes every window, as each close button would, and asks first.

## Windows programs

For a program that only runs on Windows, type `windows` and choose **Set up Windows**. Takumi runs Windows 11 in a window of its own.

1. The Core checks that the computer can run it: a processor that supports virtual machines, 8 GB of memory and 40 GB free in your home folder. If not, it says which, in words.
2. It asks one question sized to your computer, for example: set up Windows 11 with 8 GB of memory, 4 cores and a 64 GB disk? It downloads about 7 GB from Microsoft, then installs itself in 20 to 40 minutes.
3. It asks for your password once, to add what it needs.
4. The row shows the download, then "Windows 11 is installing itself". You can close the Core; a notice says when Windows is ready.

A **Windows** app then appears. Opening it starts Windows (about a minute) and shows it full screen with sound and a shared clipboard. Closing the window shuts Windows down, so it uses no memory while you are not using it: save your work in Windows first. The `Windows` folder in your home is the Shared folder on Windows' desktop.

Windows needs a licence of your own. Without one it runs unactivated.

> **Not yet.** Windows in a window is written but has not yet run: the virtual machine Takumi is tested in cannot run a virtual machine of its own. For one older Windows program, **Get Bottles** on the Shelf may be enough.

## Steam and games

Type `steam` and choose **Get Steam**. The Core looks at your graphics chip and asks once, naming what it will add: Steam, the graphics drivers games need, game mode (which asks the computer for full speed while a game runs) and a performance overlay that shows the frame rate. It needs your password and brings the system up to date in the same step.

To use game mode and the overlay in a game, open the game's Properties in Steam and set its launch options to:

```
gamemoderun mangohud %command%
```

Steam runs only on Intel and AMD computers. On an Arm computer the row says so and points to RetroArch and Moonlight.

Xbox controllers work by cable, and pair over Bluetooth like any device: hold the pairing button on top until the Xbox button blinks fast, then type `pair` in the Palette. Microsoft's Xbox Wireless Adapter (the USB stick) is not supported.

For games from Epic, GOG and Amazon, get **Heroic**; for other stores, **Lutris**; for classic consoles, **RetroArch**. **Sunshine** streams this computer's games to Moonlight on another device; type `allow sunshine` so the firewall lets it in.

> **Tested in a virtual machine.** Steam's setup is checked against simulated graphics chips. Game mode and the overlay are set per game today, not for every game at once.

## Optional software

`takumi install` adds software by name that is not on the Shelf: a package from the system's own collection, installed for everyone, with your password. A few names do more than one thing:

| Name | What it does |
|---|---|
| `docker` | sets up containers (below) |
| `agents` | installs the three coding agents |
| `backup` | the backup tool |
| `gaming` | Steam, as **Get Steam** |
| `windows` | Windows in a window, as **Set up Windows** |

## For coding

A few rows set up a computer for writing code. Each is a conversation in the Core:

- **Set up a language for coding**: Node.js, Python, Ruby, Go, Rust or Java into your home folder without a password, through [mise](https://mise.jdx.dev); PHP from the system's packages, with your password.
- **Set up containers**: Podman, running as you, with the `docker` and `docker compose` commands working through it.
- **Set up Git and GitHub**: your name and email for Git, then an offer to sign in to GitHub through the browser, with the one-time code shown large and as a square your phone can scan.
- **Open Claude Code**, **Open Codex**, **Open OpenCode**: a coding agent in a terminal, in the `Work` folder in your home. The first time, the Core asks before installing it. Each agent asks you to sign in the first time it runs.

## From the command line

```bash
takumi app default                         # every kind and its app
takumi app default browser chromium        # choose a default
takumi app open browser                    # open the app of a kind
takumi app open terminal btop              # a terminal app, in your terminal
takumi app get org.videolan.VLC VLC        # an app from Flathub, just for you
takumi app web https://web.whatsapp.com WhatsApp   # a web app from any site
takumi app web-remove whatsapp             # remove a web app
takumi app remove com.spotify.Client       # remove an app, asking first
takumi app login Spotify on                # open an app at login
takumi app quit Spotify                    # force an app to quit
takumi app quit firefox --restart          # quit it and open it again
takumi install windows --memory 8          # Windows in a window
takumi install gaming                      # Steam and its drivers
takumi install docker                      # optional software by name
takumi dev python                          # a language for coding
takumi dev containers                      # Podman, with docker working
takumi dev git                             # Git and GitHub
takumi agent open claude                   # or codex, opencode
takumi install agents                      # all three agents
```

The kinds for `takumi app default` and `takumi app open` are `browser`, `mail`, `terminal`, `editor`, `pdf`, `images`, `video`, `music` and `files`.
