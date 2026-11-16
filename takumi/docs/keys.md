---
title: Keys
permalink: /takumi/docs/keys/
layout: takumi-docs
description: "Super works like Command in every app. Every Takumi key, grouped, plus laptop keys, keyboard layouts, input methods, the pointer and the top row."
---

On Takumi, `Super` works like the Mac's Command key, in every app. `Super` is the key with the Windows logo on a PC keyboard, or <kbd>Command</kbd> on a Mac keyboard. <kbd>Super</kbd>+<kbd>C</kbd> copies and <kbd>Super</kbd>+<kbd>V</kbd> pastes in the browser, in a document and in the terminal alike.

To see the keys worth knowing, type `keys` in the Palette (<kbd>Super</kbd>+<kbd>Space</kbd>). Typing what a key does, such as `screenshot` or `emoji`, shows its key too. <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>/</kbd> shows a list of the main keys on screen.

## Harmony: one Command key

Takumi calls this **Harmony**. A Mac's editing keys all sit under one thumb, and they mean the same in every app. On a PC they are spread between <kbd>Ctrl</kbd>, which a terminal uses to stop programs, and the Windows key, which does very little. Harmony gives `Super` the Mac's job everywhere, so the keys your hands already know work on day one.

The terminal is where it matters most. <kbd>Ctrl</kbd>+<kbd>C</kbd> in a terminal stops whatever is running, so a copy key that sent it would be a trap. <kbd>Super</kbd>+<kbd>C</kbd> sends a real "copy" instead, which the terminal copies with, and <kbd>Ctrl</kbd>+<kbd>C</kbd> keeps its terminal meaning.

Harmony works below every app, using [keyd](https://github.com/rvaiya/keyd), so it needs nothing from the app.

## Editing keys

| Keys | Does |
|---|---|
| <kbd>Super</kbd>+<kbd>C</kbd> | Copy |
| <kbd>Super</kbd>+<kbd>V</kbd> | Paste |
| <kbd>Super</kbd>+<kbd>X</kbd> | Cut |
| <kbd>Super</kbd>+<kbd>Z</kbd> | Undo |
| <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>Z</kbd> | Redo |
| <kbd>Super</kbd>+<kbd>A</kbd> | Select all |
| <kbd>Super</kbd>+<kbd>S</kbd> | Save |
| <kbd>Super</kbd>+<kbd>F</kbd> | Find |
| <kbd>Super</kbd>+<kbd>W</kbd> | Close the tab |
| <kbd>Super</kbd>+<kbd>T</kbd> | New tab |
| <kbd>Super</kbd>+<kbd>N</kbd> | New window |
| <kbd>Super</kbd>+<kbd>,</kbd> | The app's preferences |
| <kbd>Super</kbd>+<kbd>P</kbd> | Everything you copied; <kbd>Enter</kbd> pastes one |
| <kbd>Super</kbd>+<kbd>.</kbd> or <kbd>Super</kbd>+<kbd>;</kbd> or <kbd>Super</kbd>+<kbd>Ctrl</kbd>+<kbd>Space</kbd> | Emoji and symbols by name; <kbd>Enter</kbd> types one |
| <kbd>Super</kbd>+<kbd>H</kbd> | Dictate: speak, then press again and what you said is typed |

### Ctrl, for people from Windows

<kbd>Ctrl</kbd>+<kbd>C</kbd>, <kbd>Ctrl</kbd>+<kbd>V</kbd> and the rest still work in most apps, exactly as they did on Windows. `Super` works in all of them, the terminal included. Use whichever your hands reach for; there is nothing to switch.

### Alt and Super on a PC keyboard

On a Mac keyboard, Command sits beside the space bar. On a PC keyboard, that place is <kbd>Alt</kbd>'s, with the Windows key further out. To have the Command key where a Mac has it, type `swap alt` (or `windows key`, `command key`) in the Palette and choose **Swap Alt and Super**. The left <kbd>Alt</kbd> then works as `Super`, with every key on this page, and the left Windows key works as <kbd>Alt</kbd>. The right <kbd>Alt</kbd> stays as it is, since many layouts use it to type accented letters. **Put Alt and Super back** undoes it. Both ask for your password in the Core.

## Apps and the Core

| Keys | Does |
|---|---|
| <kbd>Super</kbd>+<kbd>Space</kbd> | The Palette: find anything |
| <kbd>Super</kbd>+<kbd>I</kbd> | Quick settings: Wi-Fi, Bluetooth, sound, night light |
| <kbd>Super</kbd>+<kbd>Return</kbd> | A new terminal |
| <kbd>Super</kbd>+<kbd>B</kbd> | The browser |
| <kbd>Super</kbd>+<kbd>E</kbd> | Files |
| <kbd>Super</kbd>+<kbd>L</kbd> | Lock the screen |
| <kbd>Super</kbd>+<kbd>U</kbd> | Accessibility: screen reader, pointer size, sticky keys, contrast |
| <kbd>Super</kbd>+<kbd>Alt</kbd>+<kbd>Esc</kbd> | Force quit an app that has stopped answering |
| <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>/</kbd> | Show the main keys on screen |

<kbd>Super</kbd>+<kbd>B</kbd>, <kbd>E</kbd> and <kbd>Return</kbd> open the apps you chose as your browser, file manager and terminal ([Apps, the Shelf and defaults](/takumi/docs/apps/)).

## Notices

| Keys | Does |
|---|---|
| <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>Space</kbd> | Acts on the notice showing: copies its code, or does what a click does |
| <kbd>Super</kbd>+<kbd>Esc</kbd> | Puts every notice away |
| <kbd>Super</kbd>+<kbd>Alt</kbd>+<kbd>Page Down</kbd> / <kbd>Page Up</kbd> | The next waiting notice / the one before |

More in [Quick settings, Today and notices](/takumi/docs/quick-settings/#notices).

## Windows

| Keys | Does |
|---|---|
| <kbd>Super</kbd>+<kbd>←</kbd> / <kbd>→</kbd> | Along the strip |
| <kbd>Super</kbd>+<kbd>↑</kbd> / <kbd>↓</kbd> | Up and down a column, then between workspaces |
| <kbd>Super</kbd>+<kbd>Home</kbd> / <kbd>End</kbd> | The first / last window on the strip |
| <kbd>Super</kbd>+<kbd>Tab</kbd> (or <kbd>Alt</kbd>+<kbd>Tab</kbd>) | The last window; keep holding to choose among recent ones |
| <kbd>Super</kbd>+<kbd>`</kbd> | The same app's other windows |
| <kbd>Super</kbd>+<kbd>Shift</kbd>+arrows | Move the column, or the window |
| <kbd>Super</kbd>+<kbd>1</kbd> to <kbd>9</kbd> | Go to a workspace |
| <kbd>Super</kbd>+<kbd>Ctrl</kbd>+<kbd>1</kbd> to <kbd>5</kbd> | Move the column to a workspace |
| <kbd>Super</kbd>+<kbd>O</kbd> | See everything |
| <kbd>Super</kbd>+<kbd>R</kbd> | Step the width: a third, a half, two thirds |
| <kbd>Super</kbd>+<kbd>-</kbd> / <kbd>=</kbd> | Narrower / wider |
| <kbd>Super</kbd>+<kbd>M</kbd> | Fill the screen's width |
| <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> | Full screen |
| <kbd>Super</kbd>+<kbd>Ctrl</kbd>+<kbd>C</kbd> | Centre the column |
| <kbd>Super</kbd>+<kbd>[</kbd> / <kbd>]</kbd> | Stack the next window into this column / take this one out |
| <kbd>Super</kbd>+<kbd>Ctrl</kbd>+<kbd>↑</kbd> | Float the window above the strip, and back |
| <kbd>Super</kbd>+<kbd>Ctrl</kbd>+<kbd>↓</kbd> | Between floating windows and the strip |
| <kbd>Super</kbd>+<kbd>Ctrl</kbd>+<kbd>←</kbd> / <kbd>→</kbd> | Go to the screen on that side |
| <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>Ctrl</kbd>+<kbd>←</kbd> / <kbd>→</kbd> | Move the column to the screen on that side |
| <kbd>Super</kbd>+<kbd>Q</kbd> | Close the window |

[Windows on the strip](/takumi/docs/strip/) explains each of these.

<kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>Ctrl</kbd>+<kbd>Q</kbd> ends the whole session at once. It is a way out when nothing else answers; your apps are not asked to close first, so **Log out** in Quick settings is the gentle way.

## Screenshots and recording

| Keys | Does |
|---|---|
| <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>3</kbd> or <kbd>Print</kbd> | A picture of the whole screen |
| <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>4</kbd> or <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> | A picture of a part you drag over |
| <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>5</kbd> | A picture of a window |
| <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>6</kbd> | Record the screen; again to stop |
| <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>7</kbd> | A picture of a part, opened straight away to mark up |

More in [Screenshots and recording](/takumi/docs/capture/).

## Zoom and accessibility

| Keys | Does |
|---|---|
| <kbd>Super</kbd>+<kbd>Alt</kbd>+<kbd>=</kbd> / <kbd>-</kbd> / <kbd>0</kbd> | Zoom in, out, off |
| <kbd>Super</kbd>+<kbd>Alt</kbd>+arrows | Move what the zoom shows |
| <kbd>Super</kbd>+<kbd>Ctrl</kbd>+<kbd>Enter</kbd> or <kbd>Super</kbd>+<kbd>F5</kbd> | Screen reader on or off, the lock screen included |
| <kbd>Super</kbd>+<kbd>U</kbd> | Accessibility settings in the Core |

More in [Accessibility](/takumi/docs/accessibility/).

## Sound, media and brightness keys

The keys printed on your keyboard do what their pictures say, and the Core shows a meter. Most work on the lock screen too.

| Keys | Does |
|---|---|
| Volume up / down | 5% at a time |
| <kbd>Alt</kbd> + volume up / down | 1% at a time |
| <kbd>Shift</kbd> + volume up / down | All the way up / down |
| Mute | Mutes the sound |
| <kbd>Shift</kbd> + Mute | Sends the sound to the next speakers or headphones |
| <kbd>Alt</kbd> + Mute, or the microphone key | Mutes or unmutes the microphone |
| <kbd>Shift</kbd> + microphone key | Switches to the next microphone |
| <kbd>Alt</kbd> + microphone key | Opens the microphone's settings in the Core |
| Play / pause, next, previous | Controls the player you chose |
| <kbd>Alt</kbd> + next / previous | Skips ten seconds forward / back |
| <kbd>Alt</kbd> + play | Pauses everything that is playing |
| <kbd>Shift</kbd> + play | Chooses which app the media keys control |
| Brightness up / down | 5% at a time; with <kbd>Alt</kbd>, 1% |
| The display key | Shows your screen on a projector, or stops |
| The power key | Opens the Core on shut down, restart, sleep and log out |

More in [Sound](/takumi/docs/sound/) and [Displays](/takumi/docs/displays/).

## Laptop keys

- **The keyboard light keys** make the keys brighter or dimmer, and the Core shows "Keyboard light" with a meter. A laptop with a single light key goes round its steps and then off. After the laptop wakes from sleep, the light comes back as you left it.
- **The touchpad key** turns the touchpad off, so your palm never moves the pointer while you type, and on again. The Core says "Touchpad off" and how to get it back. On a laptop without the key, type `touchpad` in the Palette for the same switch.
- **The microphone key** mutes the microphone in use, a headset's too, and the light on the key shows whether it is muted, whatever muted it.

Many laptops change the keyboard light themselves and never tell the system. Their light changes as it always did, without a notice.

> **Not yet.** On a laptop without a light on the microphone key, nothing on screen says the microphone was muted by the key. The struck microphone in the capsule and the **Microphone** tile in Quick settings show it.

### The top row

On many keyboards the top row does brightness, sound and media first, and F1 to F12 with <kbd>Fn</kbd>. Type `function keys` or `media keys` in the Palette for **Top row: F1 to F12 first** or **Top row: media keys first**, whichever is not on now. It asks for your password.

This works on Apple keyboards and on Lenovo and Huawei laptops. Other keyboards decide this in their own firmware, and the row says so: **Top row: the keyboard decides**. Press its Fn lock (<kbd>Fn</kbd>+<kbd>Esc</kbd> on many laptops), or look in the computer's firmware settings.

## The pointer and the touchpad

Type what you want in the Palette. Each row offers the opposite of what is on now, and takes effect at once.

| Type | Row |
|---|---|
| `natural scrolling`, `scroll direction` | **Turn natural scrolling off** (or on) |
| `tap to click` | **Turn tap to click off** (or on) |
| `pointer speed`, `mouse speed` | **Pointer speed: faster**, **Pointer speed: slower**, with "Now 4 of 8" |
| `key repeat` | **Key repeat: faster**, **Key repeat: slower**, with "Now 4 of 6" |

Natural scrolling (two fingers move the page the way they go, as on a Mac) is on for the touchpad from the start; a mouse wheel keeps scrolling the usual way. Tap to click is on too. Two fingers pressing the touchpad give the right button, three the middle.

## Keyboard layouts

The keyboards you type with belong to the computer: the login screen, the password prompt when it starts, and every account use the same list. Type `keyboard` in the Palette:

| Row | Does |
|---|---|
| **Keyboards: English (US), German** | <kbd>Enter</kbd> asks which keyboard to add |
| **Switch to German** | switches now |
| **Add the French keyboard** | adds it at the end |
| **Remove the German keyboard** | removes it, after asking |

Type a language or a country to find its keyboards: `keyboard french` lists French, French (AZERTY) and French (Switzerland). Adding one asks for your password in the Core. With two or more, the capsule shows the layout in short letters, and a click on them switches to the next.

A computer keeps up to four keyboards. The first is the one you type your password with when the computer starts and at the login screen, so removing it asks first and says which keyboard takes its place.

> **Not yet.** There is no key for switching keyboards yet. Click the letters in the capsule, or use **Switch to …** in the Palette.

### Japanese, Korean and Chinese

These need an input method, which turns what you type into the language's characters. Type `japanese`, `korean`, `chinese`, `pinyin` or `input` in the Palette:

| Row | Switches with |
|---|---|
| **Type Japanese** | <kbd>Ctrl</kbd>+<kbd>Space</kbd>, or 半角/全角 on a Japanese keyboard |
| **Type Korean** | <kbd>Ctrl</kbd>+<kbd>Space</kbd>, or 한/영 on a Korean keyboard |
| **Type Chinese with Pinyin** | <kbd>Ctrl</kbd>+<kbd>Space</kbd> |
| **Type Chinese with Zhuyin (Bopomofo)** | <kbd>Ctrl</kbd>+<kbd>Space</kbd> |
| **Type Chinese with Cangjie** | <kbd>Ctrl</kbd>+<kbd>Space</kbd> |

<kbd>Enter</kbd> installs what it needs, with your password once, and starts it. <kbd>Ctrl</kbd>+<kbd>Space</kbd> then switches between your keyboard and the input method in every app at once. <kbd>Super</kbd>+<kbd>Space</kbd> stays the Palette's. **Stop typing Japanese** (and so on) removes it, after asking.

> **Not yet.** Apps built on Electron, such as VS Code and Slack, need a setting of their own before they can use an input method. Vietnamese, Thai and the languages of India are not offered yet.

## Turn Harmony off

If you would rather `Super` did only window and Core keys, Harmony can be turned off from the command line (below). <kbd>Super</kbd>+<kbd>C</kbd> and the other editing keys then do nothing special, and <kbd>Ctrl</kbd> is your editing key.

## Your own keys

Takumi's window and Core keys are in `~/.config/niri/takumi/defaults.kdl`. Keys of your own go in `~/.config/niri/takumi/overrides.kdl`, which is read last and never overwritten. The format is described in [niri's documentation](https://github.com/YaLTeR/niri/wiki/Configuration:-Key-Bindings). Leave <kbd>Super</kbd>+<kbd>C</kbd>, <kbd>V</kbd>, <kbd>X</kbd>, <kbd>Z</kbd>, <kbd>A</kbd>, <kbd>S</kbd>, <kbd>F</kbd>, <kbd>W</kbd>, <kbd>T</kbd>, <kbd>N</kbd> and <kbd>,</kbd> free: Harmony uses them.

> **Good to know.** In a virtual machine without 3D graphics, the window and Core keys use <kbd>Alt</kbd> instead of <kbd>Super</kbd> (<kbd>Alt</kbd>+<kbd>Space</kbd> opens the Core), because the Mac keeps <kbd>Command</kbd>+<kbd>Space</kbd> for itself.

## From the command line

```bash
takumi keys harmony off              # Super stops being the Command key
takumi keys harmony on               # and back
takumi keys harmony swap on          # left Alt and the Windows key trade places
takumi keys harmony swap off         # put them back
takumi keys layout                   # your keyboards
takumi keys layout add fr azerty     # add a keyboard
takumi keys layout remove de         # remove one, never the last
takumi keys layout next              # switch to the next
takumi keys input add japanese       # type Japanese; also korean, pinyin, zhuyin, cangjie
takumi keys input toggle             # the input method on or off
takumi keys pointer                  # natural scrolling, tap to click, speeds
takumi keys pointer natural off      # natural scrolling off
takumi keys pointer speed faster     # the pointer faster
takumi keys pointer repeat slower    # a held key repeats more slowly
takumi keys fn fkeys                 # F1 to F12 first; "media" for media keys first
takumi keys backlight cycle          # the keyboard light round its steps
takumi switch touchpad               # the touchpad off or on
```
