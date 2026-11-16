---
title: What Takumi is
permalink: /takumi/docs/
layout: takumi-docs
description: "Takumi OS is a desktop operating system for people who have used a Mac or a Windows PC for years and want something calmer, faster and more honest."
---

Takumi OS is a desktop operating system for someone who has used a Mac or a Windows PC for years, is tired of it, and wants a computer that is quieter, faster and more honest, without first learning how Linux works. It is built on Linux, but nothing on these pages asks you to open a terminal.

The whole system comes from one place and is designed as one thing: the installer, the login screen, the desktop, the settings, the updates and the assistant. Every part follows the same few ideas, so learning one part teaches you the rest.

> **Not yet.** Takumi is version 0.1.0, pre-alpha. It has been built and tested in a virtual machine, and it has not yet run on real hardware. Its source is public on [GitHub](https://github.com/realbakari/takumi-os); there is no setup disc to download yet. "Where it stands" below says exactly what works and what does not.

## Seven ideas

### Rooms: updates you can undo

The system you are using is never changed by an update. Takumi prepares a new copy of the system beside it, called a **room**, and the next start tries that copy. If it reaches your desktop, it becomes the one you use. If it does not, the next start brings back the system you had, and the Core tells you what happened in one sentence. Going back by choice is one row in the Palette and one restart. Your files are kept apart from the rooms, so they never go back with a room. See [Updates, rooms and rollback](/takumi/docs/updates/).

### The strip: windows side by side

Windows open next to each other on an endless strip and never cover one another. Opening a window never shrinks the one you were reading: you slide along the strip instead, the way you scroll a page. Another desktop is another strip, above or below. See [Windows on the strip](/takumi/docs/strip/).

### The Core: one place for everything

There is no menu bar, dock, start menu, settings app or pile of notifications. There is one small capsule at the bottom of the screen, the Core. It shows the time and how the computer is, widens when something needs saying, and grows into the **Palette** when you press <kbd>Super</kbd>+<kbd>Space</kbd>. Type an app, an open window, a setting (`bluetooth`), a sum or a sentence, and press Enter. Clicking the marks at its right, or <kbd>Super</kbd>+<kbd>I</kbd>, opens Quick settings; clicking the clock opens Today. See [The Core and the Palette](/takumi/docs/core/).

### Harmony keys: the shortcuts your hands know

<kbd>Super</kbd> is the key with the Windows logo, or Command on a Mac keyboard. In Takumi it is the Command key everywhere: <kbd>Super</kbd>+<kbd>C</kbd> copies and <kbd>Super</kbd>+<kbd>V</kbd> pastes in the browser, the editor and the terminal alike, and <kbd>Super</kbd>+<kbd>Z</kbd>, <kbd>A</kbd>, <kbd>S</kbd>, <kbd>F</kbd>, <kbd>W</kbd>, <kbd>T</kbd> and <kbd>N</kbd> mean what they mean on a Mac. This is set once, for the whole keyboard, so it holds in every app, including ones that know nothing about Takumi. If you came from Windows, <kbd>Ctrl</kbd> still works in most apps. See [Keys](/takumi/docs/keys/).

### Phase themes: a screen that follows the day

A theme is a set of colours with four phases: dawn, day, dusk and night. At dawn the colours warm, at night the backgrounds sink and the blues drop, slowly and by themselves. The background is painted from the theme: a sun that rises, crosses the sky and sets over a shore of standing stones, and a crescent moon at night. Fifty-five themes come with Takumi, light and dark, and each one is shown on the screen as you move through the list. See [Themes and the Sky](/takumi/docs/themes/).

### Intent: an assistant that asks first

Type a sentence such as "turn off bluetooth and dim the screen" and the assistant, Intent, does it with Takumi's own settings commands. It never gets a terminal or your files. Anything that is not a small, reversible change waits until you say yes, once, with every step named. It runs on Claude or OpenAI, and nothing is sent anywhere until you choose one. See [The assistant (Intent)](/takumi/docs/intent/).

### The takumi command: nothing hidden

Every row in the Palette is a command you can read and run yourself, such as `takumi wifi join "Corner Café"`. Each command describes itself in a few plain lines: what it does, how to use it, and how risky it is. The Palette and Intent are built from those same lines, so anything you can do with the mouse you can also script. You never need it. See [The takumi command](/takumi/docs/commands/).

## What Takumi is not

- **Not a system of choices.** One desktop, one way of arranging windows, one terminal, one way to update. The choice is in the apps you install, not in the parts underneath.
- **Not an experiment.** Takumi follows stable software and holds back the few parts whose changes could break it.
- **Not a copy of a Mac.** It borrows the Mac's key shortcuts because they are good, not the dock, the menu bar or the look of the windows.
- **Not built around a cloud account.** Nothing reports back to anyone. Weather, the time zone by location and the assistant go online only after you turn them on, and the assistant talks only to the service you chose. [Security](/takumi/docs/security/) lists everything that goes online, and when.

## The name

匠 (takumi) is the Japanese word for a master craftsman: someone whose tools are part of their hands, and whose work looks easy because every rough edge was taken off before anyone saw it. That is the standard Takumi holds itself to.

## Where it stands

Takumi is at version 0.1.0, pre-alpha. Everything below has been built and run in a virtual machine on a Mac. None of it has run on a real laptop or desktop yet.

**Works in the virtual machine:**

- the setup disc: language, keyboard, place, name and password, erasing a disk or going beside Windows, disk encryption with a recovery code, and one password from start to desktop
- the login screen, the desktop, the Core, the Palette, Quick settings, Today, the Lock and the start-up screen
- updates into a new room, going back by choice, and going back by itself when an update does not reach the desktop
- the fifty-five themes and their phases
- notices from apps, do not disturb, and what apps said earlier
- sound, displays, power and battery settings, screenshots and screen recording, clipboard history and emoji
- passwords the system asks for, typed in the Core instead of a terminal
- "something is wrong": the check that fixes what is safe

**Works against stand-ins, not the real thing:**

- Wi-Fi, on simulated radios: joining, hidden networks, sharing by a code, and hotel sign-in pages
- Bluetooth pairing, against a simulated Bluetooth service
- firmware updates, against a simulated firmware service
- the assistant, against simulated services: it has not yet been used with a real Claude or OpenAI account
- the fixes Takumi applies for particular laptops and graphics cards, against descriptions of real computers
- fingerprints, the security chip and Secure Boot: the virtual machine has none of these, so only what Takumi says when they are missing has been seen

**Not yet:**

- real hardware: a real Wi-Fi card, Bluetooth adapter, fingerprint reader or graphics card (laptops with Intel or AMD processors come first)
- a public download
- work and school Wi-Fi that asks for a username and a certificate

The goal for version 1.0 is that someone else can use Takumi every day for thirty days without opening a terminal.

## What you need

When there is a download, you will need:

- a computer that starts with UEFI, which is any PC from the last ten years
- a USB stick of 4 GB or more
- about twenty minutes
- either a whole disk Takumi may erase, or 40 GB of free space beside Windows

Installing needs no network: everything is on the USB stick. On a Mac with Apple silicon, Takumi runs in a virtual machine instead. [Installing](/takumi/docs/install/) has the steps.

## Where to start

- [Installing](/takumi/docs/install/): make the USB stick, answer five questions, keep the recovery code.
- [Your first hour](/takumi/docs/first-hour/): get online, find anything, get your apps, and the keys you already know.
- [The Core and the Palette](/takumi/docs/core/): the one place everything lives.
- [When something is wrong](/takumi/docs/troubleshooting/): what to type, and what to do when the computer will not start.
