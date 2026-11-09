---
title: Installing
permalink: /takumi/docs/install/
layout: takumi-docs
description: "Install Takumi from the setup disc on a USB stick, beside Windows or on a whole disk, or on an existing Arch Linux system with one command, or try it in a virtual machine."
---

There are two ways to get Takumi onto a computer. The **setup disc** is for a new computer, or one you are ready to wipe: you write it to a USB stick, start the computer from it, answer five questions, and about twenty minutes later you have an encrypted disk and a desktop. The **one-line install** is for someone who already runs Arch Linux (the system Takumi is built on) and wants Takumi on top of it.

> **Not yet.** There is no setup disc to download yet. The one-line install works today and fetches Takumi's source from [GitHub](https://github.com/realbakari/takumi-os), but Takumi is pre-alpha (0.1.0) and tested only in a virtual machine: try it on a computer you don't depend on.

## What you need

- A computer that starts with UEFI. Any PC from the last ten years does.
- A USB stick of 4 GB or more. Writing the setup disc to it erases it.
- A disk of at least 30 GB for Takumi. To keep Windows, 40 GB of free space beside it is a comfortable amount.
- About twenty minutes.
- No network. Every package Takumi installs is on the stick.

> **Tested in a virtual machine.** The setup disc has been built and installed on an ARM virtual machine. The version for ordinary PCs (x86_64) is checked by tests but has not been built and started on a real PC from a real USB stick yet. The stick's boot program is not signed for Secure Boot, so for now Secure Boot has to be turned off in the computer's firmware settings to start from it.

## Make the USB stick

The setup disc is one file, `takumi-<version>-x86_64.iso`, with a `.sha256` file beside it that lets you check the download arrived whole.

Write the `.iso` file to the stick with a writing tool. On a Mac or a Windows PC, [balenaEtcher](https://etcher.balena.io/) works. On Windows, [Rufus](https://rufus.ie/) works too, in "DD image" mode. Copying the file onto the stick in Finder or File Explorer does not work: it has to be written by one of these tools.

## Start from it

Plug in the stick, turn the computer on and press its boot-menu key straight away. It is usually one of these:

| Computer | Boot-menu key |
|---|---|
| Most Dell and Lenovo laptops | <kbd>F12</kbd> |
| HP | <kbd>F9</kbd> |
| Many others | <kbd>Esc</kbd> or <kbd>F2</kbd> |

Choose the USB stick. The 匠 tile appears on a dark screen, then setup: the tile above a pane of glass on a night sky. <kbd>Enter</kbd> goes on and <kbd>Esc</kbd> goes back from anywhere, and five dots under the glass show how far you are.

## The five questions

1. **Which language?** The language your apps and your desktop will speak. Setup guesses from the language the computer itself is set to. Type a language or a country to find yours. Picking one also moves the next two questions to where most of its speakers are (French gives the French keyboard and Paris), unless you chose those already. Setup's own words stay in English, and it says so.
2. **Which keyboard is this?** This comes before anything that matters is typed, such as your password. Type a language or a country to find yours. The keyboard changes as soon as you pick it, so you can try it in the field under the list. <kbd>Enter</kbd> picks the row you are on; <kbd>Enter</kbd> again goes on. A keyboard that types no Latin letters (Russian or Greek, for example) is put second, after US English, with Left <kbd>Alt</kbd> + Right <kbd>Alt</kbd> switching between them: a password is always typed in Latin letters.
3. **Where are you?** Type your city, or one near it in the same time zone. The time there shows under the list, and the sky turns to that time of day. With a network cable plugged in, **Find it online** asks the ipinfo.io service where your network is. It asks once, only when you press it, and the line under the list says so before it does. Nothing else in setup uses the network.
4. **Who is this computer for?** **For me**, or **For someone else** (see below). For you: your name, then a password, twice. Your account and the computer are named from your first name, so `Ana López` gives the account `ana` and the computer `ana-takumi`, shown under the name. The password needs six characters or more. You also type it when the computer starts, because it unlocks the disk.
5. **Where should Takumi go?** Every disk except the stick, with its size and what is on it now, such as "Windows is on it" or "Empty". The disk you choose says, in red, what erasing it takes away. **Erase and install** turns red and waits five seconds for a second press. A disk under 30 GB is listed but cannot be chosen. On a laptop running on battery under 20%, setup waits for the charger.

Then **Installing Takumi** shows what it is doing in words, with a line that fills. If the install stops, setup shows where it stopped, the last lines of its log, and **Try again**.

## Beside Windows

Takumi can share a disk with Windows without touching it. It never shrinks or moves a Windows partition (a partition is a section of the disk). Windows does that itself, safely, so you make the room first:

1. In Windows, open **Disk Management**.
2. Right-click the C: drive and choose **Shrink Volume**.
3. Free 40 GB or more.

Start from the stick again. A disk with Windows and at least 30 GB of free space beside it now offers **Beside Windows** first: Takumi goes into the free space and Windows stays as it is. If Windows has no room yet, the page says how to make some instead.

From then on, a menu shows for three seconds at every start, with Takumi first and Windows below it.

> **Good to know.** If Windows uses BitLocker (its own disk encryption), it stays encrypted, but Windows asks once for its BitLocker recovery key the next time it starts, because the program that starts it has changed. Setup tells you this before anything happens. Have the key ready: it is usually in your Microsoft account.

Installing beside macOS is not supported.

## Your recovery code

Takumi always encrypts the disk: someone who takes the computer cannot read your files without your password. So that you are never locked out, setup ends with **Keep your recovery code**: 36 digits in six groups of six, and a code your phone's camera can keep.

If you ever forget your password, type the recovery code where the computer asks for the password when it starts, with its dashes or without. Write the code down or photograph it, and keep it away from the computer. Setup asks for its last six digits before it goes on, to make sure you kept it.

To make a new code later, press <kbd>Super</kbd>+<kbd>Space</kbd>, type `recovery code` and choose **New recovery code**. It asks for your password, then shows the new code on a card, hidden until you press <kbd>Enter</kbd>. The old code stops working.

## The first start

At **Takumi is ready**, take the stick out and restart. The computer asks for your password once, under the 匠 tile, and then your desktop opens without a second login. After you log out, the login screen asks for it as usual.

[Your first hour](/takumi/docs/first-hour/) takes it from there.

## Set it up for someone else

To prepare a computer for a parent, a friend or someone at work, choose **For someone else** on "Who is this computer for?" and type a password for now, twice. Takumi installs with no account and no recovery code yet. **Takumi is ready for its owner** then tells you to turn the computer off and hand it over with that password.

When its owner first turns it on, the computer asks for that password once. Then they see the setup screen themselves: their language, keyboard and city (already set to what you chose), and **Whose computer is this?**, with their own name and password. Their password replaces yours on the disk, and they get their own recovery code, which nobody else has seen. Then **Welcome**, and **Start** opens their desktop.

## Erase a computer to start again

To sell or give away a computer, or to start over, press <kbd>Super</kbd>+<kbd>Space</kbd>, type `erase` and choose **Erase this computer**. It asks you to type the word `erase`, then your password, then a password for the next start, twice. Then the computer restarts, and before anyone logs in it removes:

- every account and its files
- saved Wi-Fi networks and Bluetooth pairings
- fingerprints
- older systems kept for undoing updates
- the logs

The computer then asks who it is for, as above, and its new owner chooses their own password and gets a new recovery code. Your old password, recovery code and security chip no longer open the disk.

What it does not do: the apps and Takumi itself stay, and so do printers. Deleted files are removed, not overwritten, and the disk keeps its own encryption key, so someone with special tools and the old way into the disk could in principle find pieces of them. To be certain nothing can be recovered, install Takumi again from the setup disc instead: that gives the disk a new key.

## Try it in a virtual machine

A virtual machine is a computer running in a window on the one you have, which is a safe way to look at Takumi without changing anything.

On a Mac with Apple silicon, use [UTM](https://mac.getutm.app/):

1. Make a new Linux virtual machine from `takumi-<version>-aarch64.iso`.
2. Give it a 40 GB disk.
3. Start it and install as above, choosing the virtual disk.
4. When the install is done, remove the disc from the virtual machine's settings, then start it again.

> **Good to know.** In a virtual machine without 3D graphics, Takumi draws everything in software, turns animations off, and uses <kbd>Alt</kbd> wherever this guide says <kbd>Super</kbd> for the Core and windows, because the Mac keeps <kbd>Command</kbd>+<kbd>Space</kbd> for itself. So <kbd>Alt</kbd>+<kbd>Space</kbd> opens the Core and <kbd>Alt</kbd>+<kbd>L</kbd> locks. On a real computer none of this applies.

## Install on an existing Arch Linux system

If your computer already runs Arch Linux, one command turns it into Takumi. Open a terminal and run it as your own user, not as root (the administrator account):

```bash
curl -fsSL https://www.bakarimustafa.com/takumi/install.sh | bash
```

It downloads the Takumi source into `~/.local/share/takumi` in your home folder and runs the installer from there. It refuses to run as root, and refuses a system that is not Arch Linux. If `git` is missing, it installs it first. It asks for your password once, near the start, and uses it where it must.

### What each step does

The installer runs ten steps in order and stops at the first one that fails, naming it.

| Step | What it does |
|---|---|
| Preflight | Checks this is Arch, that the internet answers, and that there are 10 GB free; asks for your password once |
| Packages | Brings the whole system up to date, then installs Takumi's packages. A package the repositories do not have is skipped with a warning |
| System | Puts Takumi's system settings in place and turns on the services a desktop needs: the keyboard layer, networking, Bluetooth, the clock, compressed memory, and printing and power modes when they are installed |
| Firewall | Turns the firewall on: nothing from outside comes in unless you allow an app. If this computer already lets people in over SSH (remote login), that stays open so nobody is cut off |
| Security | Sets up signing in: the lock screen, your login keyring opening at the login screen, and a two-minute wait after ten wrong passwords |
| Boot | Takumi's start-up screen with the 匠 tile, no boot menu, and a quiet start without scrolling text |
| Session | The Takumi session and Takumi's login screen. If another login manager is already in charge, it is left alone and you pick the Takumi session there |
| Your home | Copies the settings Takumi starts with into your home, and puts this guide on the computer for the Palette's **Help** row |
| Rooms | Turns on undoable updates when the disk uses Btrfs and the computer starts with systemd-boot. Otherwise it says that updates on this computer happen in place and cannot be undone |
| Done | Prints a summary, including whether updates can be undone here |

When it finishes, log out, pick the **Takumi** session at the login screen, and press <kbd>Super</kbd>+<kbd>Space</kbd>. Everything it did is written to `~/.local/state/takumi/install.log`.

### Run it again

Every step can be run more than once without harm. Running the command again fetches the newest source and goes through the steps again, which also repairs a step that failed halfway.

> **Good to know.** The one-line install does not encrypt your disk: only the setup disc makes encrypted disks. Turning an existing Arch system into the first "room" for undoable updates is written but has not been tried on real hardware.

## When the install does not finish

- **From the setup disc**: setup shows where it stopped and the last lines of its log. **Try again** starts that part again. A copy of the log is kept on the new disk at `/var/log/takumi-setup.log`. Neither log holds your password or your recovery code.
- **One-line install**: the installer names the step that failed and the log file. Fix what it says (often the network or free space) and run the command again.
- **The computer does not start from the stick**: check that the stick was written with one of the tools above, try the boot-menu key again, and turn off Secure Boot in the firmware settings.

## From the command line

Each of these is also a row in the Palette.

```bash
takumi disk recovery     # a new recovery code; the old one stops working
takumi password          # change your password for logging in and for the disk together
takumi disk tpm on       # let the security chip open the disk at start (needs Secure Boot on)
takumi disk tpm off      # back to typing your password at start
takumi settings erase    # erase this computer for a new owner
```
