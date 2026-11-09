---
title: Your first hour
permalink: /takumi/docs/first-hour/
layout: takumi-docs
description: "The first hour on Takumi in the order things come up: getting online, finding things, getting apps, the keys you know, windows, screenshots, a theme, and updates."
---

Takumi is built so that one hour is enough to feel at home. This page follows that hour in the order things usually come up, with the keys you know from a Mac or a Windows PC beside Takumi's. Nothing here needs a terminal.

`Super` is the key with the Windows logo on a PC keyboard, or <kbd>Command</kbd> on a Mac keyboard. Most of what follows starts with it.

## What is on the screen

Two things. The **Sky**, a painted picture behind everything that follows the time of day, and the **Core**, a small capsule at the bottom centre of the screen. At rest the Core shows the app you are in, the date and time, and small marks for the network, the battery and the sound. Everything else grows out of it: search, settings, the calendar and messages from your apps. There is no menu bar, dock or taskbar. [The Core and the Palette](/takumi/docs/core/) explains every part.

## Get online

Click the marks at the right end of the capsule, or press <kbd>Super</kbd>+<kbd>I</kbd>. That is **Quick settings**. Point at the **Wi-Fi** tile and click the arrow at its end (or right-click the tile) to list the networks around you. Pick yours, press <kbd>Enter</kbd> and type its password right there in the Core. A wrong password is known in about ten seconds: the field shakes, turns red and empties, ready for another try.

A hotel, café or airport network that wants you to sign in on a web page opens that page by itself. Later, <kbd>Enter</kbd> on the network you are on shows a code a visitor's phone camera can scan to join, with the password hidden until you press <kbd>Enter</kbd> again.

| | Mac | Windows | Takumi |
|---|---|---|---|
| Wi-Fi, Bluetooth, sound | Control Center | Quick Settings (<kbd>Win</kbd>+<kbd>A</kbd>) | <kbd>Super</kbd>+<kbd>I</kbd>, or click the marks |
| Give a guest the Wi-Fi | share from a nearby iPhone | read the password out | <kbd>Enter</kbd> on your network: a code to scan |

The arrow on the **Bluetooth** tile finds your headphones and pairs them. When a device shows a code, the Core shows it too ("Does your phone show 482913?") so you can check they match, as on a phone.

> **Tested in a virtual machine.** Wi-Fi has been tested on simulated networks, and Bluetooth against a stand-in for a real adapter. A real laptop's Wi-Fi card and Bluetooth have not been tried yet, nor work or school Wi-Fi that needs a username.

More in [Wi-Fi](/takumi/docs/wifi/) and [Bluetooth](/takumi/docs/bluetooth/).

## Find anything

<kbd>Super</kbd>+<kbd>Space</kbd> grows the capsule into the **Palette**, Takumi's search. Type part of a name and press <kbd>Enter</kbd>:

- an app: `fire` finds Firefox
- an open window, by its title or its app
- a setting: `bluetooth`, `night light`, `bigger`
- a sum: `12*7` shows the answer, and <kbd>Enter</kbd> copies it
- a sentence, such as `turn off bluetooth and dim the screen`, which goes to the assistant

When you do not know the word, open the empty Palette and press <kbd>Enter</kbd> on **Settings**. It lists the topics: Wi-Fi, Bluetooth, Sound, Displays, Keyboard & mouse, Power & battery, Look, Apps, Privacy & security and Backups. <kbd>Enter</kbd> on one shows everything about it. **Help**, beside it, opens this guide in the browser.

For your first week, the empty Palette also shows a few **Start here** rows: **Connect to Wi-Fi** (while you are offline), **Pick a look**, **Keys you already know**, **Get your apps** and **Set up the assistant**. Each leaves once you have used it.

<kbd>Esc</kbd> clears what you typed, and a second <kbd>Esc</kbd> closes the Palette.

| | Mac | Windows | Takumi |
|---|---|---|---|
| Open an app or a setting | <kbd>Cmd</kbd>+<kbd>Space</kbd>, then type | <kbd>Win</kbd>, then type | <kbd>Super</kbd>+<kbd>Space</kbd>, then type |
| Browse the settings | System Settings | Settings | **Settings** in the empty Palette |
| Browser, files, terminal | the Dock | the taskbar | <kbd>Super</kbd>+<kbd>B</kbd>, <kbd>Super</kbd>+<kbd>E</kbd>, <kbd>Super</kbd>+<kbd>Return</kbd> |
| What is using the computer | Activity Monitor | Task Manager | <kbd>Super</kbd>+<kbd>Space</kbd>, type `btop` |
| An app that has stopped answering | <kbd>Cmd</kbd>+<kbd>Option</kbd>+<kbd>Esc</kbd> | Task Manager | <kbd>Super</kbd>+<kbd>Alt</kbd>+<kbd>Esc</kbd> |

## Get your apps

Type the app's name in the Palette. When you do not have it yet, a row says **Get Spotify** (or Zoom, Slack, Steam and many more). <kbd>Enter</kbd> installs it from [Flathub](https://flathub.org/), the shared app store for Linux, for your account only and without a password.

Some services work best as a website in a window of its own. **Get Outlook**, **Get Word**, **Get WhatsApp**, **Get Gmail** and others make a web app like that, with its own icon, in a second or two.

The empty Palette also has a row of app tiles above the search field: the apps you open most, then **All apps**. Type `apps` to see every app as a grid of icons.

| | Mac | Windows | Takumi |
|---|---|---|---|
| Get an app | App Store | Microsoft Store | <kbd>Super</kbd>+<kbd>Space</kbd>, its name, <kbd>Enter</kbd> on **Get …** |
| See every app | Launchpad | Start, All apps | type `apps` |

More in [Apps, the Shelf and defaults](/takumi/docs/apps/).

## The keys your hands know

`Super` is Command. <kbd>Super</kbd>+<kbd>C</kbd>, <kbd>V</kbd>, <kbd>X</kbd>, <kbd>Z</kbd>, <kbd>A</kbd>, <kbd>S</kbd>, <kbd>F</kbd>, <kbd>W</kbd>, <kbd>T</kbd> and <kbd>N</kbd> mean the same thing in every app, the terminal included, where <kbd>Super</kbd>+<kbd>C</kbd> copies instead of stopping what is running. If you came from Windows, <kbd>Ctrl</kbd> still works in most apps; `Super` works in all of them.

| | Mac | Windows | Takumi |
|---|---|---|---|
| Copy, paste, cut, undo | <kbd>Cmd</kbd>+<kbd>C</kbd> <kbd>V</kbd> <kbd>X</kbd> <kbd>Z</kbd> | <kbd>Ctrl</kbd>+<kbd>C</kbd> <kbd>V</kbd> <kbd>X</kbd> <kbd>Z</kbd> | <kbd>Super</kbd>+<kbd>C</kbd> <kbd>V</kbd> <kbd>X</kbd> <kbd>Z</kbd> |
| Everything you copied | a clipboard app | <kbd>Win</kbd>+<kbd>V</kbd> | <kbd>Super</kbd>+<kbd>P</kbd>; <kbd>Enter</kbd> pastes it |
| Emoji | <kbd>Ctrl</kbd>+<kbd>Cmd</kbd>+<kbd>Space</kbd> | <kbd>Win</kbd>+<kbd>.</kbd> | <kbd>Super</kbd>+<kbd>.</kbd>; type a name, <kbd>Enter</kbd> types it |
| Close a tab, the window | <kbd>Cmd</kbd>+<kbd>W</kbd>, <kbd>Cmd</kbd>+<kbd>Q</kbd> | <kbd>Ctrl</kbd>+<kbd>W</kbd>, <kbd>Alt</kbd>+<kbd>F4</kbd> | <kbd>Super</kbd>+<kbd>W</kbd>, <kbd>Super</kbd>+<kbd>Q</kbd> |
| Lock the screen | <kbd>Ctrl</kbd>+<kbd>Cmd</kbd>+<kbd>Q</kbd> | <kbd>Win</kbd>+<kbd>L</kbd> | <kbd>Super</kbd>+<kbd>L</kbd> |

On a PC keyboard, the key beside the space bar is <kbd>Alt</kbd>, not the Windows key. If you would rather have Command there, as on a Mac, type `swap alt` in the Palette and choose **Swap Alt and Super**. Type `keys` in the Palette any time to see the keys worth knowing, or press <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>/</kbd> for a list of the main keys on screen. [Keys](/takumi/docs/keys/) has all of them.

## Windows sit side by side

Windows open next to each other on an endless strip and never cover one another. A new window opens to the right of the one you are in, and opening one never shrinks the one you were reading: you slide along the strip instead. The capsule shows the strip as small blocks, one per column, so you can see where you are.

| | Mac | Windows | Takumi |
|---|---|---|---|
| Go to another window | <kbd>Cmd</kbd>+<kbd>Tab</kbd> | <kbd>Alt</kbd>+<kbd>Tab</kbd> | <kbd>Super</kbd>+<kbd>Tab</kbd> (or <kbd>Alt</kbd>+<kbd>Tab</kbd>) for the last one, <kbd>Super</kbd>+<kbd>←</kbd> <kbd>→</kbd> along the strip |
| See everything | Mission Control | Task View | <kbd>Super</kbd>+<kbd>O</kbd> |
| Another desktop | <kbd>Ctrl</kbd>+<kbd>←</kbd> <kbd>→</kbd> | <kbd>Win</kbd>+<kbd>Ctrl</kbd>+<kbd>←</kbd> <kbd>→</kbd> | <kbd>Super</kbd>+<kbd>↑</kbd> <kbd>↓</kbd>, or <kbd>Super</kbd>+<kbd>1</kbd> to <kbd>9</kbd> |
| Make a window wider | drag its edge | <kbd>Win</kbd>+arrows | <kbd>Super</kbd>+<kbd>R</kbd> steps the width, <kbd>Super</kbd>+<kbd>M</kbd> fills the screen |

Hold <kbd>Super</kbd> and press <kbd>Tab</kbd> again to choose among recent windows. [Windows on the strip](/takumi/docs/strip/) explains stacking, floating windows and two screens.

## Screenshots and recording

The keys are the Mac's. The picture is saved in `Pictures/Screenshots`, copied so you can paste it straight away, and shown small in the capsule, where a press opens it.

| | Mac | Windows | Takumi |
|---|---|---|---|
| The screen, a part, a window | <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>3</kbd>, <kbd>4</kbd>, <kbd>5</kbd> | <kbd>Win</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> | <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>3</kbd>, <kbd>4</kbd>, <kbd>5</kbd> (<kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> for a part) |
| Record the screen | <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>5</kbd> | Snipping Tool | <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>6</kbd>, again to stop |
| Pick a colour, copy text off the screen | Digital Color Meter, Live Text | PowerToys | **Colour** and **Text** in Quick settings |

More in [Screenshots and recording](/takumi/docs/capture/).

## Make it yours

Press <kbd>Super</kbd>+<kbd>Space</kbd>, type `theme`, and move up and down the list: each of the fifty-five themes shows itself on the whole desktop while it is selected. <kbd>Enter</kbd> keeps one; <kbd>Esc</kbd> puts yours back. Most themes are dark, some are light (type `light theme` to see those). A theme follows the time of day by itself, warmer at dawn and dimmer at night, and the Sky moves with it.

| | Mac | Windows | Takumi |
|---|---|---|---|
| Dark mode | Appearance | Personalisation | pick a dark theme (most are); **Phase night** in the Palette keeps the night colours, **Phase auto** follows the clock again |
| Warmer screen at night | Night Shift | Night light | **Night light** in Quick settings |
| Quiet notifications | Focus | Do not disturb | **Do not disturb** in Quick settings |
| Calendar | the menu bar clock | the taskbar clock | click the time in the capsule: Today |

More in [Themes and the Sky](/takumi/docs/themes/) and [Quick settings, Today and notices](/takumi/docs/quick-settings/).

## When something is wrong

Press <kbd>Super</kbd>+<kbd>Space</kbd> and type `something is wrong`, then <kbd>Enter</kbd> on **Check this computer**. Takumi checks the internet, sound, free space, updates, its services, the clock and the battery. It fixes what is safe to fix (Wi-Fi left off, a sound service that stopped) and says what it did in one sentence, such as "All fine" or "2 need you", with the first of them.

When one thing stops working, `fix` or `restart` lists rows that restart only that: **Restart Wi-Fi**, **Restart Bluetooth**, **Restart sound** and **Restart the desktop**, which keeps your apps open. More in [When something is wrong](/takumi/docs/troubleshooting/).

## Updates, and the undo button

Takumi never updates or restarts the computer while you work. Press <kbd>Super</kbd>+<kbd>Space</kbd>, type `update` and choose **Update Takumi** when it suits you. Takumi asks once, prepares the new system in a "room" beside yours and says when a restart will use it. The system you are using is not touched until then.

If the new system does not start properly, the computer comes back to the previous one by itself. If it starts but you do not like it, **Go back to the previous system** in the Palette undoes the update.

| | Mac | Windows | Takumi |
|---|---|---|---|
| Update | Software Update | Windows Update | `update` in the Palette, when you choose |
| Undo an update | Time Machine | System Restore | **Go back to the previous system** |
| Shut down, restart, sleep, lock | the Apple menu | the Start menu | type `shut down`, `restart` or `sleep` in the Palette, or the power button in Quick settings; <kbd>Super</kbd>+<kbd>L</kbd> locks |
| Start over, or give it away | Erase All Content and Settings | Reset this PC | **Erase this computer** in the Palette ([what it erases](/takumi/docs/install/#erase-a-computer-to-start-again)) |

**Shut down**, **Restart** and **Log out** ask for a second <kbd>Enter</kbd> (or a second press) before they close your apps. More in [Updates, rooms and rollback](/takumi/docs/updates/).

## What feels different for a week

- Windows do not float or overlap. They sit side by side, and you move along them.
- There is no menu bar, dock or taskbar. The capsule shows where you are and what is on.
- An app comes from a row in the Palette, not a downloaded installer.
- Settings are found by typing what you want, not in a window of panels.

What feels better on day one: nothing phones home, nothing restarts your computer while you work, and the fans stay quiet.

## From the command line

Everything on this page is a Palette row, but if you like a terminal (<kbd>Super</kbd>+<kbd>Return</kbd>), these do the same:

```bash
takumi doctor              # check this computer and fix what is safe
takumi update              # prepare an update; yours is untouched until you restart
takumi rollback            # start the system from before your latest update
takumi room list           # every system you can go back to
takumi theme set ember     # switch theme by name
takumi phase set night     # keep the night colours; "auto" follows the clock again
takumi lock                # lock the screen
```

`takumi` on its own lists every group of commands. More in [The takumi command](/takumi/docs/commands/).
