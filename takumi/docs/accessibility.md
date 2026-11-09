---
title: Accessibility
permalink: /takumi/docs/accessibility/
layout: takumi-docs
description: "Takumi's accessibility settings: the screen reader, zoom, a bigger pointer, larger text, high contrast, sticky keys and turning animations off."
---

Takumi has six accessibility switches: the screen reader, a bigger pointer, sticky keys, high contrast, zoom and animations. Press <kbd>Super</kbd>+<kbd>U</kbd> (the key Windows opens its accessibility settings with) and the Core opens on all six. Typing `accessibility` in the Palette lists them too. <kbd>Enter</kbd> on a row turns it on, or off again.

| | Mac | Windows | Takumi |
|---|---|---|---|
| Accessibility settings | System Settings, Accessibility | `Win+U` | <kbd>Super</kbd>+<kbd>U</kbd> |
| Screen reader | VoiceOver, `Cmd+F5` | Narrator, `Win+Ctrl+Enter` | <kbd>Super</kbd>+<kbd>F5</kbd> or <kbd>Super</kbd>+<kbd>Ctrl</kbd>+<kbd>Enter</kbd> |
| Magnifier | Zoom | Magnifier, `Win+Plus` | <kbd>Super</kbd>+<kbd>Alt</kbd>+<kbd>=</kbd> |
| Larger text | Displays, Larger Text | Text size | `text` in the Palette, **Text bigger** |
| Reduce motion | Reduce motion | Animation effects | **Animations** |

> **Good to know.** The rows do not yet show whether a switch is on. <kbd>Enter</kbd> turns each one over, and a notice says which way it went.

## The screen reader

The screen reader speaks what is on the screen: apps, and the Core with every row and notice. Takumi uses [Orca](https://orca.gnome.org).

Press <kbd>Super</kbd>+<kbd>Ctrl</kbd>+<kbd>Enter</kbd> (the key Windows uses for Narrator) or <kbd>Super</kbd>+<kbd>F5</kbd> (the Mac's key for VoiceOver). Both work at the lock screen too. You can also choose **Screen reader** in the Palette.

Once it is on, the screen reader starts at once and at every login after that, until you turn it off. When it stops, you hear "Screen reader off".

Every part of the Core has a name and a role the screen reader reads, and each new notice is spoken as it arrives.

> **Tested in a virtual machine.** In the virtual machine there is no graphics chip, so the screen reader speaks for apps but the window manager cannot announce itself or pass keys to it there. On a computer with a graphics chip, both should work.

## Zoom

Zoom shows the screen larger in a strip along the top, a third of the screen's height. Windows move down under it, so you can still click them where they are. It follows the window you are in: when you move to another window, its middle comes into view.

| Keys | Does |
|---|---|
| <kbd>Super</kbd>+<kbd>Alt</kbd>+<kbd>=</kbd> | closer (1.5, 2, 3, 4, 6 and 8 times); turns zoom on when it is off |
| <kbd>Super</kbd>+<kbd>Alt</kbd>+<kbd>-</kbd> | farther; turns it off past 1.5 times |
| <kbd>Super</kbd>+<kbd>Alt</kbd>+<kbd>0</kbd> | off |
| <kbd>Super</kbd>+<kbd>Alt</kbd>+arrow keys | move what it shows, a quarter at a time |

**Zoom** in the Palette turns it on at two times, or off.

Zoom follows the window you are in rather than the pointer. If it shows a little off from the part you want (after you scrolled the windows by hand, for example), the arrow keys move it.

> **Not yet.** Zoom over the whole screen that follows the pointer, as on a Mac. It needs support in the window manager that is not there yet.

## Larger text and a larger screen

Type `text` in the Palette and choose **Text bigger** or **Text smaller**. The size changes at once in the Core and in your apps. Each row says the size it goes to.

To make everything larger, not only text, type `bigger` and choose **Make everything bigger**. That and the other screen settings are on the [Displays](/takumi/docs/displays/) page.

You can also choose a clearer font: type `fonts` ([Themes](/takumi/docs/themes/)).

## A bigger pointer

**Pointer size** makes the pointer twice its normal size (48 pixels instead of 24), everywhere. Most apps change at once; the few that draw their own pointer change the next time they open. Choose it again for the normal size.

## High contrast

**High contrast** switches to the clearest theme: Kuro (white on black) if your theme was dark, or Shiro (black on white) if it was light. Apps that support it take their own high-contrast look too. Your own theme is kept and comes back when you turn high contrast off. Choosing another theme while it is on ends it.

## Sticky keys

With sticky keys, you tap a key such as <kbd>Shift</kbd>, <kbd>Ctrl</kbd>, <kbd>Alt</kbd> or <kbd>Super</kbd>, let go, then press the next key, instead of holding both. <kbd>Shift</kbd> then <kbd>A</kbd> types a capital A; <kbd>Super</kbd> then <kbd>C</kbd> copies. Tap it twice and it stays down until you tap it once more. Holding keys still works as always.

Sticky keys work everywhere, at the login screen and the lock screen too. Because the setting belongs to the whole computer, **Sticky keys** asks for your password in the Core.

> **Good to know.** Turning the universal Command key off or on (`takumi keys harmony`) also turns sticky keys off; turn them on again after. With <kbd>Alt</kbd> and <kbd>Super</kbd> swapped on a PC keyboard, the left <kbd>Alt</kbd> is not sticky.

## Animations

**Animations** turns motion off, or on again. With it off, windows open and close at once, workspaces and columns jump instead of sliding, and the Core opens without growing. Themes and phases change in an instant instead of fading.

## Other things that help

- **Dictation**: press <kbd>Super</kbd>+<kbd>H</kbd>, speak, and press it again; your words are typed where you were. See [Language, time and Today](/takumi/docs/language-and-time/).
- **Night light**: warms the screen in the evening. It is in Quick settings (<kbd>Super</kbd>+<kbd>I</kbd>).
- **Keyboard and pointer**: type `keyboard` or `touchpad` for natural scrolling, tap to click, pointer speed and how fast a held key repeats.
- **Every key**: <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>/</kbd> shows the keys on screen. See [Keys](/takumi/docs/keys/).

> **Not yet.** Slow keys and bounce keys (for hands that press keys longer or twice by accident) are not built.

## From the command line

Each command turns its setting over when run alone, and takes `on` or `off` from a script.

```bash
takumi switch reader              # the screen reader; on or off
takumi switch zoom                # zoom; on, off, closer or farther
takumi switch zoom closer
takumi switch pointer bigger      # or normal
takumi switch contrast            # high contrast; on or off
takumi switch sticky              # sticky keys, with your password
takumi switch motion off          # animations off; on to bring them back
takumi display text bigger        # larger text; or smaller, 11, 13, 15, 17, 20
takumi font size 15               # the same text size, from 10 to 20
takumi keys pointer speed faster  # pointer speed
```
