---
title: The Core and the Palette
permalink: /takumi/docs/core/
layout: takumi-docs
description: "The capsule at the bottom of the screen: what its marks mean, how it grows into the Palette, and how to find apps, windows, settings, emoji, copies, sums and answers by typing."
---

The **Core** is the small capsule at the bottom centre of every screen. It is the only thing Takumi draws over your windows. At rest it shows where you are and what is on. When you ask, it grows into the **Palette**, the one place to open apps, change settings and run commands. Its marks grow it into Quick settings, and its clock into Today.

Press <kbd>Super</kbd>+<kbd>Space</kbd>, type a few letters of what you want, and press <kbd>Enter</kbd>. That is most of it.

| | Mac | Windows | Takumi |
|---|---|---|---|
| Search for anything | Spotlight (<kbd>Cmd</kbd>+<kbd>Space</kbd>) | Start (<kbd>Win</kbd>) | the Palette (<kbd>Super</kbd>+<kbd>Space</kbd>) |
| Status icons | the menu bar | the taskbar's corner | the right end of the capsule |
| Settings | System Settings | Settings | type what you want in the Palette |

## The capsule at rest

Each part of the capsule shows only when it has something to say. Rest the pointer on any part for a moment and a word above it says what it is ("Wired · Sound 40%", "Sunday 8 November 2026"). Moving along the capsule changes the word.

| Part | What it means | A press |
|---|---|---|
| The 匠 emblem | the way in | opens the Palette |
| The app you are in, and its window's title | where you are; "Search" when nothing is open | opens the Palette on that app |
| Small blocks | the columns of windows on this workspace, as wide as they are on screen, yours lit; shown with two or more | goes to that window |
| Numbered pills | workspaces: the one you are on (in the accent colour) and those with windows | goes there; the mouse wheel over them moves up and down |
| Three moving bars | music or video playing | plays or pauses |
| Date and time | | opens Today |
| App icons | apps running in the background | opens one; right-click for its menu |
| A red mark with a time | the screen is being recorded | stops the recording |
| A person | remote help is on; red while someone is connected | offers to stop it |
| A breathing microphone | dictation is listening | stops it and types what you said |
| Time left | a timer is running | opens Today |
| A camera or microphone in colour | an app is using the camera or microphone | opens the microphone's settings |
| A USB stick | a drive or memory card is open | offers to eject it |
| Short letters such as `US` or `DE` | the keyboard layout, shown with two or more | switches to the next |
| The status marks | the network, battery and sound, plus any mode you turned on | opens Quick settings |

The status marks also tell you about the computer:

- **Network**: Wi-Fi with one to three arcs lit for signal strength, a plug for a cable, or Wi-Fi struck through when there is no network. When something is in the way it says so in words, "Sign in", "No internet" or "Offline", in the accent colour.
- **Modes you turned on**: a struck-through bell for do not disturb (with a number for messages held back), a cup while the computer stays awake, a crescent for the night light, a struck microphone while it is muted, and a shield while a VPN is on.
- **A small dot** at the corner: updates are waiting, or one is ready and a restart will use it.
- **Battery**: drawn as a battery, filled in the accent colour while charging and in red at 15% or less.
- **Sound**: the speaker, or a struck speaker when muted. The mouse wheel over the status marks turns the sound up or down.

When a window fills the whole screen, the capsule slides below the edge and gives its space back. It comes back when you leave that window or press <kbd>Super</kbd>+<kbd>Space</kbd>.

## How it grows

The capsule is one shape that changes size. A thin line of light runs along its top edge each time it opens.

| It becomes | When |
|---|---|
| A **notice** | something happened: the volume changed, a screenshot was taken, an app sent a message. It widens for a moment and settles back |
| The **Palette** | <kbd>Super</kbd>+<kbd>Space</kbd>, or a press on the emblem |
| **Quick settings** | <kbd>Super</kbd>+<kbd>I</kbd>, or a press on the status marks |
| **Today** | a press on the clock |
| A **question** | the system needs your password to make a change. The Core asks in place, above everything else, instead of a separate window |

While it is open, the rest of the screen dims a little. Click anywhere outside it to close it. Notices, Quick settings and Today are on [Quick settings, Today and notices](/takumi/docs/quick-settings/).

## What the Palette finds

Type part of a name. Every word you type has to appear somewhere in a row, in any order and ignoring hyphens, so `wifi off` and `turn off wifi` both find **Turn Wi-Fi off**. Rows you choose often move up over time.

| Type | It finds |
|---|---|
| Part of an app's name: `fire` | the app (Firefox), ready to open |
| Part of a window's title or app | that open window; <kbd>Enter</kbd> goes to it |
| What you want: `bluetooth`, `bigger`, `shut down` | settings and actions in plain words |
| An app you do not have: `spotify` | **Get Spotify**, which installs it ([Apps](/takumi/docs/apps/)) |
| `wifi` or a network's name | nearby Wi-Fi networks ([Wi-Fi](/takumi/docs/wifi/)) |
| `theme`, or a theme's name | every theme, shown on the desktop while selected ([Themes](/takumi/docs/themes/)) |
| A sum: `12*7`, `(250+18)/4` | the answer; <kbd>Enter</kbd> copies it |
| `keys`, `screenshot`, `copy` | the key that does it |
| `clipboard`, `paste`, `copied` or `history` | what you copied, newest nearest the field (also <kbd>Super</kbd>+<kbd>P</kbd>) |
| `:` and a name: `:party` | emoji and symbols by name (also <kbd>Super</kbd>+<kbd>.</kbd>) |
| `earlier`, `notifications`, `missed` | what your apps said earlier |
| `time`, `timer 10 tea`, `remind me in 10 min to stretch`, `weather` | clocks, timers, reminders and the weather ([Language, time and Today](/takumi/docs/language-and-time/)) |
| A sentence of a few words | a row that asks the assistant ([The assistant](/takumi/docs/intent/)) |

The sum row understands digits and the signs `+ - * / % ^` and brackets. Emoji answer to everyday words too ("lol", "thanks", "party"), and any search of three letters or more shows the three best emoji at the bottom: `fire` finds 🔥 under Firefox. <kbd>Enter</kbd> on an emoji types it where you were and copies it.

The clipboard history only shows when you ask for it, so something you copied never turns up under another search. <kbd>Enter</kbd> on a copy pastes it into the app you were in. It keeps the last 200 copies, text and pictures, and never keeps a copy that a password manager marks as secret. **Clear the clipboard history** asks first.

> **Good to know.** The Palette does not search inside your files or folders. Use Files (<kbd>Super</kbd>+<kbd>E</kbd>) for that.

### Words that open a topic

Some words list everything about a topic instead of searching: `wifi`, `bluetooth`, `sound`, `display`, `keyboard`, `power`, `theme`, `app`, `security`, `backup`, `printer`, `drives`, `vpn`, `time`, `earlier`, `apps` and `settings`. Typing more words narrows the list. `settings` (or `preferences`, `control panel`, `options`) lists the topics themselves. `apps` shows every app as a grid of icons, A to Z: the arrow keys move through it, and typing on searches again.

### How rows look

Results stack upward from the field, with the best match nearest your hands, under the heading **Best match**. The rest are grouped by kind under small headings: Apps, Settings, Commands, Wi-Fi networks, Themes, Keys, Emoji and so on. Each row has an icon, its title with the letters you typed lit, and a line under it that tells similar rows apart. A row that changes something important carries **Asks first**. Hold <kbd>Alt</kbd> and each row shows a number: <kbd>Alt</kbd>+<kbd>1</kbd> to <kbd>9</kbd> runs that row straight away.

## The empty Palette

Open the Palette without typing and you see, from the field upward:

- **A row of app tiles**: the apps you open most, then **All apps**. At first it holds the everyday ones (Firefox, Files, Terminal, Text Editor, Writer, Celluloid) until your own use takes over. <kbd>↓</kbd> from the nearest row reaches it, and <kbd>←</kbd> <kbd>→</kbd> move along it.
- **Start here**, for your first week only: **Connect to Wi-Fi** (while you are offline), **Pick a look**, **Keys you already know**, **Get your apps** and **Set up the assistant**. Each row leaves once you have used it.
- **Earlier today**: the last three messages your apps sent.
- **Find your way**, at the top: **Settings**, which lists the topics (Wi-Fi, Bluetooth, Sound, Displays, Keyboard & mouse, Power & battery, Look, Apps, Privacy & security, Backups), and **Help**, which opens this guide in the browser.

With nothing found, the Palette says so and offers to ask the assistant instead.

## Rows that ask first

Nothing opens a terminal unless it has to. A row that could lose work or change something important asks right where it is: the first <kbd>Enter</kbd> arms it, and its line turns into "Press Enter again to shut down" in the accent colour. The second <kbd>Enter</kbd> runs it. Moving to another row disarms it.

Some rows hold a short **conversation** in the Core, such as joining a Wi-Fi network or making a new recovery code. Only that row stays, and a second field asks what is needed:

- A question: type the answer and press <kbd>Enter</kbd>. The question wraps onto up to four lines so it is always readable in full.
- A password: the field shows a lock, with **Show** at its end. What you type leaves the field the moment you press <kbd>Enter</kbd>, and is never searched.
- A yes or no: "Enter for yes · Esc for no". Saying no is a choice, not a failure: <kbd>Enter</kbd> starts it again.
- A wrong answer shakes the field, outlines it in red and empties it.

When it is done, the Core closes and says how it went in a notice. <kbd>Esc</kbd> with an empty field stops the conversation. <kbd>Esc</kbd> while it works closes the Core and lets it finish, and a notice says how it ended.

A **card** shows one thing in place of the rows, such as a code to scan for sharing your Wi-Fi. <kbd>Enter</kbd> shows or hides its secret, <kbd>Esc</kbd> goes back, and typing searches again.

## The assistant's plan

Type a sentence of three words or more and pause. After about half a second, a **Will run** line above the field shows the exact commands the assistant would run for it, before anything happens. <kbd>Enter</kbd> on the **Ask** row asks it to go ahead, and anything risky is asked in the Core first.

> **Not yet.** The assistant works with a Claude or OpenAI account you set up (**Set up the assistant**). It has been tested against stand-ins, not yet with a real account. More in [The assistant](/takumi/docs/intent/).

## Keys inside the Palette

| Keys | Does |
|---|---|
| <kbd>Enter</kbd> | Runs the selected row (a row that asks: the first arms it, the second runs it) |
| <kbd>Enter</kbd> with no rows | Asks the assistant |
| <kbd>Ctrl</kbd>+<kbd>Enter</kbd> | Runs the row and keeps the Palette open |
| <kbd>↑</kbd> / <kbd>↓</kbd> | Moves away from / towards the field; <kbd>↓</kbd> from the nearest row reaches the app tiles |
| <kbd>←</kbd> / <kbd>→</kbd> | Moves along the app tiles, or through the grid of every app |
| <kbd>Page Up</kbd> / <kbd>Page Down</kbd> | Six rows at a time |
| <kbd>Alt</kbd>+<kbd>1</kbd> to <kbd>9</kbd> | Runs that row |
| <kbd>Ctrl</kbd>+<kbd>U</kbd> | Clears the field |
| <kbd>Esc</kbd> | Clears the field; a second <kbd>Esc</kbd> closes the Palette |

Rows use <kbd>Alt</kbd> and a number because <kbd>Super</kbd>+<kbd>1</kbd> to <kbd>9</kbd> already go to workspaces. Other keys that open the Core on a topic: <kbd>Super</kbd>+<kbd>.</kbd> (emoji), <kbd>Super</kbd>+<kbd>P</kbd> (clipboard), <kbd>Super</kbd>+<kbd>U</kbd> (accessibility), <kbd>Super</kbd>+<kbd>Alt</kbd>+<kbd>Esc</kbd> (force quit), and the power key (shut down, restart, sleep, log out).

## With the mouse

- Click the emblem, or "Search" when nothing is open, to open the Palette.
- Click a row to run it, or a tile in the app row.
- Click anywhere outside the Core to close it.
- Click the clock for Today, and the status marks for Quick settings.
- Turn the wheel over the status marks to change the volume, and over the workspace numbers to move between workspaces.

## When it does not answer

If the Core stops responding, type `restart` in the Palette (if it opens) and choose **Restart the desktop**: the Core, the Sky and the lock screen restart, and your apps stay open. If the Palette will not open at all, open a terminal with <kbd>Super</kbd>+<kbd>Return</kbd> and run `takumi doctor restart desktop`, or log out and in again.

## From the command line

```bash
takumi intent ask 'turn off bluetooth and dim the screen to 30'   # ask the assistant
takumi intent --plan 'dim the screen to 30'                      # only show what it would run
takumi clipboard clear                                           # forget the clipboard history
takumi doctor restart desktop                                    # restart the Core, the Sky and the lock screen
```

You can add your own rows. Put any executable file in `~/.config/takumi/palette/`. The Palette runs it with what you typed as its first argument, and it prints one row per line as JSON, such as `{"id":"my:hello","title":"Say hello","run":["notify-send","Hello"]}`.

To stop the assistant's plan appearing on every pause, add `intent_preview = false` to `~/.config/takumi/shell.toml`.
