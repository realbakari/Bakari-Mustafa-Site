---
title: When something is wrong
permalink: /takumi/docs/troubleshooting/
layout: takumi-docs
description: "What to do when an app freezes, Wi-Fi or sound stops, an update goes wrong, you forget your password or the computer will not start."
---

When something is wrong, say so. Press <kbd>Super</kbd>+<kbd>Space</kbd> and type `something is wrong` (or `fix`, `broken`, `slow`). Enter on **Check this computer** looks at what usually goes wrong, fixes what is safe to fix, and tells you the rest in one sentence.

Most of the time that is all you need. The sections below cover the rest, starting with the most common.

| | Mac | Windows | Takumi |
|---|---|---|---|
| Force quit an app | <kbd>Cmd</kbd>+<kbd>Option</kbd>+<kbd>Esc</kbd> | Task Manager, End task | <kbd>Super</kbd>+<kbd>Alt</kbd>+<kbd>Escape</kbd> |
| See what is using the computer | Activity Monitor | Task Manager | `btop` in the Palette |
| Fix network problems | Wireless Diagnostics | Network troubleshooter | **Check this computer**, **Restart Wi-Fi** |
| Undo a bad update | restore from Time Machine | System Restore | **Go back to the previous system** |
| About this computer | About This Mac | Settings, System, About | **About this computer** |

## Check this computer

**Check this computer** is a conversation in the Core: one note per check while it works, then one sentence. It checks:

| Check | When it is fine | What it fixes by itself | What it tells you |
|---|---|---|---|
| Internet | "Online" | turns Wi-Fi on if it was left off | a sign-in page in the way, a network that does not answer, no network |
| Sound | "Sound works" | restarts the sound service if it stopped | no output at all, or sound muted |
| Space | "50 GB free" | under 5 GB free: removes old downloaded updates (asks for your password) | still under 5 GB: offers **Free up space** |
| Updates | "Updated 3 days ago" | | more than 30 days without an update |
| Services | "Every service is running" | | the ones that stopped, by name |
| Clock | "The clock is right" | sets the clock to follow the network (asks for your password) | |
| Battery | "The battery holds 80% of what it did when new" | | under 70%: it lasts less and can be replaced |
| This computer | "Takumi's fixes for this computer are in place, and no firmware is missing" | | fixes this system lacks, and firmware a device looked for and did not find |

The sentence is "All fine: …", "Fixed 1; the rest is fine", or "2 need you:" followed by the first of them. The Palette keeps a **Last check** row afterwards; Enter on it opens the full report.

## An app froze

Press <kbd>Super</kbd>+<kbd>Alt</kbd>+<kbd>Escape</kbd>. The Core opens with a row for each app that has a window: **Force quit Spotify**, and **Restart Spotify** beside it. Typing `quit`, `stuck`, `frozen` or `not responding` finds the same rows.

Enter asks in place first, because work you have not saved in that app is lost. The app is asked to stop, and made to stop if it is still there three seconds later. **Restart** then opens it again.

For a clean slate, **Close all windows** says how many are open, then asks each one to close, as its own close button would. An app with unsaved work asks about it in its own window and stays open.

## An app quit by itself

When an app crashes, the Core says so, for example "Files quit unexpectedly", with two buttons:

- **See why** opens a card: what quit and when, what happened in plain words ("It tried to use memory it does not have"), and where in the app it stopped.
- **Copy details** puts the whole report on the clipboard, ready to paste into a bug report or a message to someone helping you.

Typing `crash` finds **Why an app quit** at any time. Crash reports stay on this computer: nothing is sent anywhere.

## The desktop froze

If the Core, the background or the lock screen stop answering but your apps still work, type `restart desktop` (or `frozen`) and press Enter on **Restart the desktop**. It says "The desktop is restarting; it is back in a moment, with your apps still open", and it is.

## No Wi-Fi

1. Click the marks at the right of the Core, or press <kbd>Super</kbd>+<kbd>I</kbd>, and check that Wi-Fi is on.
2. If the Wi-Fi mark is in the accent colour and the network says "Connected · sign in to use the internet", a hotel or café page is waiting. Press Enter on the network, or type `hotel`, to open it.
3. Run **Check this computer**. It turns Wi-Fi on if it was off and says what else is in the way.
4. Type `wifi not working` and press Enter on **Restart Wi-Fi**. It restarts the Wi-Fi card's driver, asks for your password, and joins your network again: "Wi-Fi restarted (its driver was reloaded) and joined Corner Café".
5. If the computer has no Wi-Fi at all, type `wifi card` to see whether Takumi found the card and whether it has a driver. A missing piece of firmware shows in **Check this computer** as, for example, "The Wi-Fi is missing firmware", and the next update adds it.

To see whether the connection is slow, type `speed` and press Enter on **Test the internet speed**. It takes about 20 seconds and ends with a line such as "Download 94 Mbit/s · Upload 21 Mbit/s · 18 ms". [Wi-Fi](/takumi/docs/wifi/) has the rest.

> **Not yet.** Work and school networks that ask for a username and a certificate do not work yet.

## No sound

1. Press <kbd>Super</kbd>+<kbd>I</kbd> and check the volume is not muted.
2. Type `sound` and check where it goes: the speakers, headphones, a screen or a Bluetooth device. Enter on another output moves what is playing to it.
3. Run **Check this computer**. It restarts the sound service if it stopped.
4. Type `no sound` and press Enter on **Restart sound**. An app that was playing may need to start playing again.

If the headphones work but the laptop's speakers never do, the speakers may need firmware Linux does not have for that model yet. **Check this computer** says "The speakers are missing firmware" when it sees that. [Sound](/takumi/docs/sound/) has the rest.

## Bluetooth stopped working

Type `bluetooth not working` and press Enter on **Restart Bluetooth**. It restarts Bluetooth, asks for your password, and connects your trusted devices again: "Bluetooth restarted; AirPods connected again".

## After a bad update

An update never changes the system you are using: it prepares a new one beside it, and the next start tries it. If that new system does not reach your desktop, the computer goes back to the one you had by itself, and says so once when you log in: "Update undone: the desktop did not start; you are on Sun 8 Nov 09:30, nothing was lost."

If the update started but you do not like it, type `go back` and press Enter on **Go back to the previous system**. It asks first, then restarts into the system you had before. Your files are not touched: they are kept apart from the system and never go back with it.

**Show systems you can go back to** lists every one, with when it was made. Before trying something risky, **Save a restore point** keeps a copy of the system as it is now, under a name you choose ("Before trying Docker"). [Updates, rooms and rollback](/takumi/docs/updates/) has the details.

If an update stops because the disk is full, **Free up space** removes old downloads, older systems, software nothing uses and old logs, and empties the Trash only if you say so.

## You forgot your password

When the computer starts and the 匠 tile asks for your password, type the recovery code instead: the 36 digits setup showed you, with or without the dashes. It opens the disk and the desktop follows. Then make a new recovery code if you are not sure who has seen the old one ([Security](/takumi/docs/security/)).

> **Not yet.** Takumi has no row yet to choose a new password without the old one. **Change your password** asks for the current password first.

If you turned on **Open the disk by itself**, the disk opens without the recovery code, and the login screen asks for the password instead.

## Reset settings

If something looks or behaves wrongly after you changed it, put Takumi's settings back:

- Type `reset` and press Enter on **Reset settings to Takumi defaults**. Your own settings are kept beside the new ones as a backup copy, and what you chose for your screens, the time of day, text size and night light stays.
- To reset one thing only, use its own row: **Reset Terminal settings**, **Reset window and key settings**, **Reset System monitor settings**, **Reset app look settings**, **Reset Neovim settings** or **Reset Takumi settings**.

To start again like a new computer, see **Erase this computer** in [Security](/takumi/docs/security/).

## The computer will not start

- **An update was just installed.** Turn the computer off and on again. A system that does not reach the desktop is not tried twice: the next start is the last one that worked.
- **You want an older system.** Hold <kbd>Space</kbd> while the computer starts. A menu appears listing the systems you can start; choose one with the arrow keys and Enter.
- **The 匠 tile stays and nothing happens.** Press <kbd>Esc</kbd> to see the messages behind it. They are worth a photo if you ask someone for help.
- **The screen stays black or the graphics look wrong.** If the graphics driver cannot draw, Takumi starts again without it, without animations, and the Core says "Graphics are running without their driver". The next update that changes the driver tries it again.
- **The disk asks for a password it did not ask for before.** Something changed in how the computer starts, for example a firmware update. Type your password or the recovery code.
- **It will not start after turning on Secure Boot.** In the firmware's settings, choose "Restore Factory Keys".

## What hardware works

Takumi looks at what is in the computer and sets up what each part needs: drivers, firmware and settings for particular laptops and graphics cards. You do not install drivers yourself.

Type `computer`, `hardware` or `drivers` (or a part: `graphics`, `nvidia`, `camera`, `touchpad`). The Palette lists each part and how it is:

| It says | Means |
|---|---|
| works, or what its fix does | the part has its driver, and Takumi's fix for it is in place |
| NVIDIA's own driver, open nouveau driver | which driver the graphics run on |
| set up at the next update | Takumi has a fix for it that this system lacks |
| set up; in use after a restart | the fix is in place; restart to use it |
| works on some models, not supported yet | the plain truth for parts Linux does not fully support, such as many laptop cameras |
| no driver | nothing drives it, and Takumi knows no fix yet |

Enter on a part opens a card in plain sentences: what the fix does, and what does not work. When a fix is waiting, a row offers **Set up what this computer needs**, which asks first and then runs an update.

Takumi has fixes for NVIDIA, Intel and AMD graphics, Intel laptop sound and cameras, fingerprint readers, Synaptics touchpads, several Broadcom, Marvell and Realtek Wi-Fi chips, Framework, ASUS ROG and TUF, Dell XPS, Lenovo Yoga and Surface laptops, and Xbox controllers. Some things it says plainly it cannot fix: speakers on laptops Linux does not know yet, many laptop cameras, and Macs with a T2 chip.

A fix that turns out wrong is undone by going back to the previous system, like any update.

### Docks

A Thunderbolt or USB4 dock may wait for your permission before it works. The Core then says "CalDigit TS4 waits for your permission" and opens on **Allow this dock**. Allow only a dock you know: it reaches deep into the computer. Once allowed, it works whenever you plug it in again. Typing `dock` finds the row at any time.

> **Tested in a virtual machine.** None of the hardware fixes have run on a real computer yet. They have been tested against descriptions of real laptops and desktops, and in a virtual machine, which needs no fixes.

## Get logs to share

When you ask someone for help, these give them what they need:

- **Copy details** on a crash notice, or **Why an app quit**: the report of one crash, on the clipboard.
- **Collect a debug report**: Takumi's version, the systems you can go back to, the theme, the versions of the desktop's parts and the recent log, in one text file. It opens in a terminal window and prints the file's name, which starts with `debug-` and is in the hidden folder `~/.local/state/takumi` in your home folder.
- **Last check**: the report of **Check this computer**.

Read a report before you send it: logs can contain names of files and networks.

## About this computer

Type `about` and press Enter on **About this computer**. A card shows the model, Takumi's version and the system in use, the processor, memory, graphics, the disk and how much of it is free, the kernel, and how long the computer has been on.

## From the command line

```bash
takumi doctor                          # check this computer and fix what is safe
takumi doctor restart wifi             # or bluetooth, sound, desktop
takumi doctor speed                    # test the internet's speed
takumi app quit                        # the apps that have windows
takumi app quit spotify                # force it to quit
takumi app quit spotify --restart      # force it to quit and open it again
takumi app close-all                   # close every window; asks first
takumi debug crash                     # why the last app quit
takumi debug crash --copy              # the same, on the clipboard
takumi debug                           # collect a debug report into one file
takumi rollback                        # go back to the previous system; asks first
takumi room list                       # every system you can go back to
takumi room snapshot "Before trying Docker"   # save a restore point
takumi update clean                    # free up space
takumi settings reset                  # Takumi's settings back, keeping what you chose
takumi settings reset foot             # one app's settings only
takumi hardware                        # every part and how it is
takumi hardware dock                   # allow a dock that waits
takumi about                           # about this computer
```

`takumi hardware --json` and `takumi about --json` give the same facts in a form scripts can read.
