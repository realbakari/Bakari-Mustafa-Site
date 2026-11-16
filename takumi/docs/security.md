---
title: Security
permalink: /takumi/docs/security/
layout: takumi-docs
description: "Disk encryption and the recovery code, your one password, fingerprints, Secure Boot, the firewall, the lock screen, erasing a computer, and what goes online."
---

A Takumi computer keeps its disk encrypted, asks for one password, turns away connections nobody asked for, and sends nothing anywhere unless you turned on the thing that sends it. Most of this needs no setting at all.

What you can change lives in the Core. Press <kbd>Super</kbd>+<kbd>Space</kbd> and type `security` (or `password`, `fingerprint`, `secure boot`, `firewall`). In the empty Palette, **Settings** then **Privacy & security** lists the same things. A row only shows where it can work: the fingerprint rows need a fingerprint reader, Secure Boot needs a computer that has it, and the security chip needs one.

| | Mac | Windows | Takumi |
|---|---|---|---|
| Encrypted disk | FileVault | BitLocker | always on, from setup |
| If you forget the password | recovery key | BitLocker recovery key | the recovery code |
| Lock the screen | <kbd>Ctrl</kbd>+<kbd>Cmd</kbd>+<kbd>Q</kbd> | <kbd>Win</kbd>+<kbd>L</kbd> | <kbd>Super</kbd>+<kbd>L</kbd> |
| Unlock with your finger | Touch ID | Windows Hello | **Unlock with your finger** |
| Firewall | Network, Firewall | Windows Security, Firewall | `firewall` in the Palette |
| Start again like new | Erase All Content and Settings | Reset this PC | **Erase this computer** |

## Disk encryption

A computer installed from the Takumi setup disc has an encrypted disk: someone who takes the laptop gets nothing they can read. There is no switch for it, and nothing to set up. The disk opens with your password.

When the computer starts, the 匠 tile shows with a password field under it. Type your password and the desktop follows, without a second login. After you log out, the login screen asks as usual.

A keyboard plugged in later still types the password, and the keyboard layout is the one you chose in setup, so the password types the way it did when you made it.

> **Good to know.** Only the setup disc makes an encrypted disk. A computer that was installed without encryption cannot be encrypted afterwards.

## The recovery code

At the end of setup, Takumi shows a recovery code: 36 digits in six groups of six, and a code your phone's camera can keep. It is shown once and never saved on the computer. Setup asks for its last six digits before going on, to be sure you have it.

If you ever forget your password, type the recovery code in the password field when the computer starts, with its dashes or without. It opens the disk in place of your password.

Keep it away from the computer: whoever has it can read the disk.

### A new recovery code

Type `recovery code` in the Palette and press Enter on **New recovery code**. The Core asks for your password once, makes a new code and shows it on a card, hidden until you press Enter, beside a code for your phone's camera. The old code stops opening the disk at once.

Make a new one if you lost the old one, or if someone else may have seen it.

## One password

One password does everything: it opens the disk when the computer starts, signs you in, unlocks the lock screen, approves changes to the system, and opens the keyring where apps keep their own passwords (saved mail accounts, work networks, the assistant's key). No app asks for it again.

The login keyring is the one exception. After a start where you typed your password under the 匠 tile, nothing was typed at the login screen, so the keyring is still closed. It opens the first time you unlock the lock screen with your password; before that, an app that needs it may ask once.

## Change your password

Type `password` in the Palette and press Enter on **Change your password**. It is a conversation in the Core:

1. It asks for your password.
2. It asks for the new one, twice.
3. It changes it for your account, the disk and the login keyring in one go.

The recovery code keeps working.

- A wrong password shakes the field and is asked again, up to three times.
- The new password needs six characters or more, and has to differ from the old one. If the two new ones do not match, both are asked again.
- If the disk still opens with an older password (one changed before this feature existed), the Core says so and asks whether to change that too, with the disk's own password.
- If the login keyring was locked with a different password before Takumi opened it with yours, it keeps that one, and the Core says "The login keyring still opens with its earlier password".

> **Not yet.** An account without administrator rights cannot change its password from the Core yet.

## Ten wrong tries

Ten wrong passwords in a row, anywhere (the login screen, the lock screen, an approval), and the account waits two minutes before it takes another. The count starts again after a right one. The lock screen says "Locked for 2 minutes" instead of "Try again". The login screen only says the password did not work.

## The lock screen

Press <kbd>Super</kbd>+<kbd>L</kbd>, or type `lock` and press Enter on **Lock screen**. Each screen shows the sky, the time, the date and one field. Start typing: it goes straight to the field.

- If what you type comes out in capitals, "Caps Lock is on" takes the place of your name.
- Along the bottom: what is playing, with play and pause, the keyboard layout when you have more than one (press it to switch, so the password goes in the layout you made it in), and the battery.
- In the top left corner: how the computer is connected.
- A wrong password shakes the field and outlines it in red.

The screen also locks by itself after a while: after 10 minutes on battery and 20 minutes plugged in, to start with. Type `lock` or `awake` in the Palette to change the times, or to stay awake for an hour during a film. [Power and battery](/takumi/docs/power/) has the details.

## Fingerprints

On a computer with a fingerprint reader, type `fingerprint` and press Enter on **Unlock with your finger**. The row counts each touch ("Touch the sensor · 3 of 8"), asks for a longer touch or a centred finger when the reader wants one, and ends with "Your finger unlocks this computer now". A reader you swipe asks you to swipe. If nobody touches it for thirty seconds, nothing is saved. The first time, the Core asks for your password once, so the finger can answer approvals too.

Press Enter on the row again to add another finger.

Where your finger works:

- **The lock screen.** A dim finger mark sits under the field. A matching touch unlocks at once, and typing still works at the same time. A finger that does not match shakes the mark and says "Not recognised"; after three, the mark goes out and the field asks for your password until the next lock.
- **Approvals apps ask for**, such as opening a disk or updating firmware: the Core asks for a finger for ten seconds, then for your password.

Where it does not:

- The login screen after the computer starts, because your password also opens the keyring there.
- Takumi's own settings that need your password: they ask for the password in the Core.
- With the lid closed, since the lid covers the sensor.

**Stop unlocking with your finger** removes your fingerprints from the computer.

> **Tested in a virtual machine.** The virtual machine has no fingerprint reader, so only what Takumi says when one is missing has been seen there. Taking a finger has been tested against a stand-in reader, not a real one.

## Secure Boot

With Secure Boot on, the computer's firmware (its BIOS) starts only what this computer's own keys have signed. Something changed on the start-up files, or a program trying to start before Takumi, does not start.

Type `secure boot` in the Palette. The row says one of three things:

- **Secure Boot is on.** Nothing to do. Every new room is signed as it is made.
- **Turn on Secure Boot · Off · Enter shows how.** The firmware still holds its maker's keys, and Takumi cannot add its own until those are cleared. The row explains how: in the firmware's settings, under Secure Boot, choose "Reset to Setup Mode" or "Clear All Keys", keep Secure Boot on, then come back. It offers to restart straight into the firmware's settings.
- **Turn on Secure Boot · The firmware is ready for this computer's own keys.** One question, then Takumi makes keys for this computer, signs itself with them, and puts them in the firmware, keeping Microsoft's beside them. Microsoft's stay because Windows, graphics cards and other add-in cards carry programs only Microsoft signed. If Windows is on the computer and uses BitLocker, the row warns that Windows will ask for its recovery key once.

The keys are made on this computer and never leave it. If a computer refuses to start afterwards, the firmware's "Restore Factory Keys" puts the maker's keys back.

> **Not yet.** Secure Boot checks the start-up menu and each room's kernel (the heart of the system), but not every file used at start-up. A room made before you set up Secure Boot has no keys inside it: going back to it works, but a new kernel installed by hand inside it would not be signed, and the computer would refuse it.

## Open the disk by itself

On a computer with a security chip (a TPM 2.0) and Secure Boot on, the row **Open the disk by itself** lets the chip open the disk when the computer starts, so you do not type your password under the 匠 tile. Your password and the recovery code still work.

It asks for your password once. From then on:

- the login screen asks for your password, since nobody typed one at the start;
- if anyone changes how the computer starts (a USB stick, new Secure Boot keys, some firmware updates), the chip no longer recognises the start and the disk asks for your password, once. Press Enter on the row again to let the chip open it next time.

The row then says **The disk opens by itself**; Enter on it asks for the password at every start again.

> **Good to know.** The chip checks Secure Boot, which covers most of what starts, but not all of it. Someone with the laptop in hand, the right tools and the skill could still reach the disk while it opens by itself. Typing your password at every start is the stronger choice.

## The firewall

Takumi turns away connections that other devices start, and lets out everything this computer starts, as a Mac or a Windows PC does. A file share or remote login you never meant to offer cannot be reached from a café's Wi-Fi.

Type `firewall` in the Palette to see how it stands:

| Row | Enter |
|---|---|
| Firewall · On · 1 app allowed | nothing: the rows under it are what you can change |
| Firewall · Off · other devices can connect to this computer · Enter turns it on | turns it on |
| Firewall · On until the computer restarts · Enter keeps it on | makes it start with the computer |
| Firewall · Not set up · Enter sets it up | installs it, then turns it on |
| Allow LocalSend · Receives files from nearby devices · blocked now | asks, then lets it in |
| Block SSH · Lets other computers log in to this one · allowed now | blocks it again |
| Turn the firewall off | asks first |

### Which apps others may reach

Some apps only work if other devices can reach them. An app has a row when it is on this computer, or when it is already allowed:

| App | What other devices do with it |
|---|---|
| LocalSend | send you files from nearby phones and computers |
| SSH | log in to this computer from another one |
| Steam Remote Play | play your games on another screen |
| Sunshine | stream this computer's screen to another device |
| Remote help | see and use your screen, only while remote help is on |

Enter on **Allow LocalSend** asks "LocalSend receives files from nearby devices. Allow it?", then your password, then says "LocalSend may be reached through the firewall now". Typing the app's name finds its row from anywhere.

Turning the firewall off asks first: "Other devices on the network could then connect to anything this computer offers. Turn the firewall off?" The apps you allowed stay allowed for when it is on again.

> **Not yet.** The firewall is the same on every network: home cannot yet be more open than a café. Allowing an app from your own network only, and being asked when an app starts listening, are planned.

## Passwords the system asks for

When an app or a setting needs your password to change the system (opening a disk, updating firmware, installing software), the Core asks for it, in the same field the lock screen uses, above everything else. Nothing opens a terminal or a separate window. The question says what is being done: "Opening a disk needs your password", "Updating Takumi needs your password".

Enter sends it. Esc refuses. A wrong password shakes the field and asks again. The password goes straight to the part of the system that checks it: no other program can see it, and nothing writes it down.

## Erase this computer

Before you sell or give away the computer, type `erase` and press Enter on **Erase this computer**. It is a conversation in the Core: a yes, the word `erase` typed out, your password, and on an encrypted disk a password for the next start, twice. The computer restarts six seconds later.

At that next start, before anyone logs in, Takumi removes every account and its files, saved Wi-Fi networks, Bluetooth pairings, fingerprints, the recovery code and the security chip's key, and every older room. Then the computer asks who it is for, as a new one does. The new owner chooses their own password and gets their own recovery code.

Apps, Takumi itself, printers and hardware settings stay.

> **Good to know.** Erasing deletes files, it does not overwrite them. What was deleted stays on the disk under its old encryption key, out of reach of the new owner's password but not destroyed. To be certain nothing can be recovered, install again from the setup disc, which makes a new key.

There is nothing to go back to after an erase: the older rooms are gone.

## Privacy

Takumi does not report anything to anyone: there is no account, no usage data and no crash reports sent anywhere. Crash reports stay on the computer for you to read ([When something is wrong](/takumi/docs/troubleshooting/)). Dictation turns speech into text on the computer, and your voice never leaves it.

This is everything that goes online, and when:

| What | Asks | When |
|---|---|---|
| Looking for updates | the same package servers updates come from | once a day at most, only online and never on a connection marked as metered, such as a phone's hotspot |
| Wi-Fi sign-in pages | a check address, now and then | to tell whether the network wants you to sign in first |
| Weather in Today | [Open-Meteo](https://open-meteo.com) (no account, no key) | off until you turn it on; then at most every 30 minutes, only while Today or the Palette is open |
| Time zone by location | ipinfo.io, which sees your internet address and answers with a city | off until you turn it on; then each time a network comes up, at most every five minutes, and never while a VPN is on |
| "Find it online" in setup | ipinfo.io | once, and only when you press it |
| A town's time zone | Open-Meteo's place search | only when you type a town Takumi's own list does not have |
| The assistant | only the service you chose: Anthropic (directly or through Claude Code) or OpenAI | nothing until you choose one; then when you ask, and while you type a sentence of three words or more in the Palette, to show its plan |
| Getting apps | Flathub | when you get or update an app |
| Firmware | the firmware service, through fwupd | when you ask to update firmware |
| Internet speed | Cloudflare's speed test | only when you run it |
| The dictation model | a one-time download of 574 MB | when you set up dictation, after asking |

Weather can be turned off again with `weather` in the Palette, and Open-Meteo is not asked again.

## When it does not work

- **You forgot your password.** Type the recovery code under the 匠 tile when the computer starts. See [When something is wrong](/takumi/docs/troubleshooting/).
- **"Locked for 2 minutes".** Ten wrong passwords were typed. Wait two minutes and try again.
- **The disk asks for the password although it opens by itself.** Something changed in how the computer starts, such as Secure Boot's keys or a firmware update. Type your password, then press Enter on **Open the disk by itself** again.
- **Going back to an older room asks for the password at start.** A room made before you turned on **Open the disk by itself** does not ask the chip.
- **The fingerprint mark is missing on the lock screen.** It does not show with the lid closed, just after waking before the reader answers, or when no finger is saved.
- **The computer will not start after setting up Secure Boot.** Open the firmware's settings and choose "Restore Factory Keys".
- **An app other devices need cannot be reached.** Type the app's name and press Enter on its **Allow** row.

## From the command line

```bash
takumi password                          # change your password, for the account, the disk and the keyring
takumi disk recovery                     # a new recovery code; the old one stops working
takumi disk tpm                          # whether the disk opens by itself
takumi disk tpm on                       # let the security chip open it (needs Secure Boot)
takumi disk tpm off                      # ask for the password at every start again
takumi security fingerprint              # whether your finger unlocks this computer
takumi security fingerprint on           # add a finger
takumi security fingerprint off          # remove your fingerprints
takumi security secure-boot              # Secure Boot's state, and setting it up
takumi firewall                          # on or off, and which apps others may reach
takumi firewall allow LocalSend          # let an app in; asks first
takumi firewall deny LocalSend           # block it again
takumi firewall on                       # turn it on
takumi firewall off                      # turn it off; asks first
takumi lock                              # lock the screen
takumi settings erase                    # erase this computer
```

`takumi firewall --json` gives the firewall's state in a form scripts can read. Any other firewall profile works by its name at the command line, for example `takumi firewall allow "WWW Full"`.

The firewall underneath is [ufw](https://launchpad.net/ufw), fingerprints come through [fprintd](https://fprint.freedesktop.org/), and Secure Boot keys are made with [sbctl](https://github.com/Foxboron/sbctl).
