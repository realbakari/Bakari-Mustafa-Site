---
title: Displays
permalink: /takumi/docs/displays/
layout: takumi-docs
description: "Make everything bigger or smaller, change brightness, turn and arrange screens, show your screen on a projector, and warm it at night."
---

Everything about your screens lives in the Core, the search bar at the bottom of the screen. Press <kbd>Super</kbd>+<kbd>Space</kbd> and type `display`, or a plainer word for what you want: `bigger`, `text`, `brightness`, `resolution`, `refresh`, `night light` or `projector`. The Palette lists only what makes sense for the screens you have now.

Any change that could leave the screen hard to read goes back by itself after ten seconds unless you keep it. So you can try a size without worrying about being stuck with it.

| | Mac | Windows | Takumi |
|---|---|---|---|
| Make everything bigger | Displays, "Larger Text" | Display, Scale | `bigger` in the Palette |
| Brightness | the brightness keys | the brightness keys, Quick Settings | the brightness keys, or Brightness in Quick settings |
| Two screens side by side | Displays, Arrange | Display, Rearrange | "on the right", "on the left", "above", "below" in the Palette |
| Show your screen on a projector | Mirror Displays | `Win+P`, Duplicate | **Show this screen on the projector** |
| Warmer screen at night | Night Shift | Night light | Night light in Quick settings |

## Make everything bigger or smaller

Type `bigger` and press Enter on **Make everything bigger (125%)**, or `smaller` for **Make everything smaller (100%)**. The number in brackets is the size you will get. This changes the whole screen at once: windows, text, the Core.

The steps are 100, 125, 150, 175, 200, 250 and 300%. The top steps are for the sharp screens on many laptops and for 4K monitors, where 100% makes everything tiny.

With two screens, each row names the screen it is about, so you can make the laptop bigger and leave the monitor alone.

## Text size

If the layout is fine but the letters are small, change only the text. **Text bigger (15)** and **Text smaller (11)** step through the sizes 11, 13, 15, 17 and 20. Every computer starts at 13. The change reaches the Core and most of your apps.

Text size changes at once, with a notice, and does not count down: you can always read your way back.

## Brightness

The brightness keys on your keyboard work as you expect, and they work on most external monitors too, not only on a laptop's own screen. Each press moves five points. Hold <kbd>Alt</kbd> with a brightness key to move one point at a time, which helps in a dark room.

In the Palette, type `brightness` for **Brightness 25%**, **50%**, **75%** and **100%**, and **A little brighter** and **A little dimmer**, one point at a time. Quick settings (<kbd>Super</kbd>+<kbd>I</kbd>) has a Brightness slider.

An external monitor is dimmed through DDC/CI, a way for the computer to talk to the monitor over the cable. Most monitors understand it. If yours does not, its brightness rows do not appear and you use the monitor's own buttons. With a laptop, external monitors follow the laptop screen.

## Resolution and refresh rate

Most people never need these. Takumi uses a screen's own size and rate unless you change them, and offers a fix when something is off:

- **Smoother motion: 165 Hz** (with your screen's number) appears when the screen can draw the picture more often than it does now. Higher is smoother scrolling and moving.
- **Back to its full resolution (2560 × 1600)** appears when the screen is not showing its own size, which can make it look soft.

Type `resolution` for the other sizes the screen can show (**Resolution 1920 × 1080**) or `refresh` for its other rates (**Refresh rate 60 Hz**). Each one goes back after ten seconds unless you keep it.

## Turn a screen

**Turn the screen** turns it a quarter, for a monitor stood on its side. Press it again for the next quarter.

## Two screens

Plug in a second screen and it is used straight away, next to the first. To tell Takumi where it stands on your desk, type the monitor's name or `arrange` and pick one of the rows, for example **DELL U2720Q on the right**, **on the left**, **above** or **below**. The pointer then crosses from one screen to the other at the edge you would expect. Above and below line up the left edges of the two screens.

### Monitors are remembered by what they are

Takumi remembers each monitor by its make, model and serial number, not by the socket it is plugged into. Your office monitor keeps its size and place whether it is in the left port, the right port or a dock, and a different monitor in that same port starts fresh. When a monitor is unplugged, what was kept for it waits until it comes back.

A laptop's own screen, a monitor that does not report what it is, and two identical monitors that report the same details are remembered by their port instead.

### A laptop with the lid open on a stand

With a monitor plugged into a laptop, **Use only the external screen** turns the laptop's own screen off. **Use the laptop screen again** turns it back on. Closing the lid turns the laptop screen off by itself.

If you unplug the monitor while the laptop screen is off, the laptop screen comes back on by itself with a notice, so you are never left with no screen. When you log out, or start the computer again, the laptop screen starts on.

## Show your screen on a projector

For a talk, a class or a film on the television, the other screen can show exactly what the laptop shows. With two screens connected, type `projector`, `mirror` or `present` and press Enter on **Show this screen on the projector**. The Core says what is being copied and where. Press Enter on **Stop showing this screen on the projector** to give each screen its own picture again. Unplugging the projector ends it by itself, with a notice.

With two screens, Quick settings also has a **Mirror** tile, and the display key on many laptops (the one with a little screen on it) turns mirroring on and off. The copy is scaled to fit the other screen, and the keyboard stays with your slides. On a desktop with two monitors and no built-in screen, the first screen is the one copied.

## The ten-second undo

A screen set to the wrong size or turned the wrong way can hide the very button that puts it right. So every change to a screen's size, resolution, refresh rate, turn or place, and turning the laptop screen off or on, works like this:

1. The change shows at once.
2. The Core asks "Keep this?" and counts down from ten seconds.
3. Enter keeps it. Esc, or doing nothing at all, puts the screen back the way it was.

A change you keep is remembered and used the next time you log in. Text size and the night light do not count down, because you can always read your way back.

## Night light

The night light warms the screen's colours in the evening, which is easier on the eyes. Turn it on or off with the **Night light** tile in Quick settings (<kbd>Super</kbd>+<kbd>I</kbd>). In the Palette, type `night light` for three choices:

- **Night light on**: warm all day.
- **Night light off**.
- **Night light from 17:30 to 05:30**: warm from dusk to dawn. The times are the same dusk and dawn the Sky (the picture behind your windows) and your theme follow.

Your choice comes back each time you log in.

## When it does not work

- **The screen came out wrong.** Do nothing. It goes back in ten seconds.
- **No brightness rows for an external monitor.** The monitor does not take brightness over the cable, or DDC/CI is switched off in its own menu. Use its buttons, or turn DDC/CI on in its menu.
- **No "Use the laptop screen again" row.** It is not offered while the lid is closed. Open the lid.
- **A third screen.** The rows place the second screen. Place a third from the command line (below).

> **Not yet.** Arranging screens by dragging them with the mouse, placing a screen anywhere other than beside, above or below the first, and keeping the laptop screen off from one login to the next.

> **Tested in a virtual machine.** Displays have been tested in a virtual machine and against a stand-in for real screens. They have not yet been tried on a range of real laptops and monitors.

## From the command line

```bash
takumi display scale bigger            # or smaller, or a percent such as 150
takumi display text bigger             # or smaller, or 11, 13, 15, 17, 20
takumi display brightness 30           # or up, down; add --fine for one point
takumi display mode smoother           # or native, 1920x1080, 1920x1080@60
takumi display rotate
takumi display arrange left            # right, left, above or below
takumi display builtin off             # on, or status
takumi display mirror on               # off, toggle or status
takumi display nightlight schedule     # on, off or schedule
takumi switch nightlight               # on when it is off, off when it is on
```

`scale`, `mode`, `rotate` and `arrange` take the name of a screen as a last word when you have more than one. Changes to a screen ask "Keep this?" here too.
