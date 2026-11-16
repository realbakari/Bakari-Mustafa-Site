---
title: Updates, rooms and rollback
permalink: /takumi/docs/updates/
layout: takumi-docs
description: "How Takumi updates without touching the system you use, how it comes back by itself when an update does not start, and how to go back by choice."
---

Takumi never changes the system you are using while you use it. An update builds a complete new copy of the system beside yours, and the next restart moves you into it. If the new one does not start properly, the computer comes back to the one you had by itself. Your files are never part of this: they stay where they are whichever system you start.

To update, press <kbd>Super</kbd>+<kbd>Space</kbd>, type `update` and press Enter on **Update Takumi**. Updates never install or restart the computer on their own.

| | Mac | Windows | Takumi |
|---|---|---|---|
| Update | Software Update | Windows Update | **Update Takumi** in the Palette, when you choose |
| Restarts on its own | sometimes, overnight | sometimes, with a warning | never |
| A bad update | wait for a fix | uninstall the update, System Restore | comes back by itself; **Go back to the previous system** |
| A restore point | Time Machine | System Restore | **Save a restore point** |
| Firmware (BIOS) | with macOS updates | Windows Update or the maker's app | **Update firmware** |

## Rooms

Takumi calls each copy of the system a room. A room is the whole system: the programs, the settings that belong to the computer, and the core of the system (the kernel). Your home folder, with your files and your own settings, is not inside any room. Every room shares it.

Rooms take less space than you might expect. A new room starts as a copy of the one you are using that shares everything with it, and only what the update changes takes new space.

### An update's life

| Step | What happens | What you see |
|---|---|---|
| 1. You choose to update | Takumi asks once, and asks for your password | "Update Takumi" in the Core |
| 2. The next room is built | a copy of your room is made, and the update is installed into the copy | you keep working; the room you use is not touched |
| 3. It is ready | the new room is set to be tried at the next start, once | **Restart to use the update** |
| 4. You restart, when it suits you | the computer starts the new room | the login screen and your desktop as usual |
| 5a. Your desktop appears | the new room becomes the one the computer starts from now on | nothing more |
| 5b. It does not | the computer restarts into the room you had | after you log in, the Core says the update was undone and nothing was lost |

The new room gets one try. If it reaches your desktop, it is kept. If it fails to start, or starts but never shows the desktop, the very next start is the room you had before, without you doing anything. After you log in, the Core says so once, for example "Update undone, nothing lost", with the reason and the date of the system you are back on.

Wi-Fi networks, Bluetooth pairings, passwords, the computer's name, the time zone and printers are carried into the new room, including changes you make between preparing the update and restarting.

## Updating

When updates are waiting, the Palette row says how many and names the ones a person knows, for example: **Update Takumi** · 42 waiting · Firefox and Linux among them · yours is not touched until you restart. Press Enter. The Core asks first, then asks for your password.

The computer does not go to sleep by itself while an update is being prepared (closing the lid still sleeps it). When it is done, the row becomes **Restart to use the update**. Restart then, or tomorrow: the system you use now stays one restart away.

When no updates are waiting, the row says **Takumi is up to date** and when it last looked; Enter looks again. **Look for updates** looks without changing anything.

### When it looks

Takumi looks for updates by itself once a day, only when the computer is online and not on a connection that charges by the amount used, such as a phone's hotspot. Looking changes nothing on the computer and asks no password. When updates are waiting, the Core says "Updates are ready: 42 · Press to update", once a day at most. Do not disturb holds it like any other message.

### Prepare updates on the charger

If you would rather the next room was built in the background, turn on **Prepare updates on the charger**. Every half hour, if updates are waiting, the computer is plugged in, online on a connection that is not metered and has enough free space, Takumi builds the next room. If you unplug, it stops and tries again later. When it is done, the Core says "Update ready · restart to use it". It still never restarts on its own.

### How much space

An update needs 8 GB free on the disk. If there is not enough, the Core says so and offers **Free up space** in the same conversation.

**Free up space** (type `free up space` or `clean`) says what can go, asks once and asks for your password once, then says how much came back, for example "4.2 GB freed". It removes:

- old downloaded copies of programs, keeping the two newest of each,
- older rooms (see Pruning, below),
- programs that nothing uses any more,
- old system logs,
- the Trash, only if you say yes a second time, since what is in it cannot be brought back.

### When an update fails

Nothing changes on the system you use. The Core says why in one sentence, and offers the fix where there is one:

| The Core says | What to do |
|---|---|
| Another program is installing software right now. | wait; or "Unlock it and try again?" when nothing else is installing |
| There is not enough space on the disk for the update. | "Free up space now?" |
| The keys that check the downloads are out of date. | "Try again?": the keys are renewed first |
| A download arrived damaged and was thrown away. | "Try again?" |
| The download servers did not answer. | "Try again?" |
| Some packages in the update do not fit together yet. | try again in a day or two |

## Going back by choice

If an update changes something you do not like, type `go back` and press Enter on **Go back to the previous system**. The Core asks first ("Go back to the system from …?"), then restarts into it. It starts your newest restore point if you saved one, and otherwise the newest room that worked before this one. Your files stay as they are: only the system goes back.

**Show systems you can go back to** lists every room with when it was made, whether it worked, whether it is pinned, and which one is in use and which starts next. To start a particular room, or to come forward again after going back, use `takumi room use` from the command line (below).

You can also choose a room as the computer starts: hold <kbd>Space</kbd> while it starts, and a menu lists the rooms.

### Restore points

Before you try something you may want to undo, choose **Save a restore point**. It asks for a name, such as "Before trying Docker" (Enter alone names it by the date), asks for your password, then says "Restore point saved: Before trying Docker". A restore point is a room like any other, and **Go back to the previous system** starts the newest one.

### Pinning and pruning

Old rooms are deleted after every good update. Takumi always keeps the room in use, the one the computer starts by default, the newest three rooms that worked (restore points count among them), and any room you pinned. So three updates after you save a restore point, it is gone unless you pin it. Pinning keeps a room for good; it is done from the command line.

## Firmware

Firmware is the software inside the computer itself and its devices: the BIOS or UEFI that starts the computer, a dock, a touchpad. Takumi updates it through [fwupd](https://fwupd.org/), which gets firmware from the makers that publish it there.

Type `firmware`, `bios` or `uefi`. The Palette lists the devices that can be updated, and **Update firmware**:

1. It works only on the charger. On battery it stops before doing anything, because firmware must never run out of power halfway.
2. It never runs at the same time as a system update.
3. It asks one question that names every device, for example "Update the firmware of System Firmware, Dock? Keep the computer on and plugged in until it is done."
4. It asks for your password.
5. It says "Firmware updated: System Firmware, Dock.", or "Restart when it suits you to finish" when a device puts the update in place at the next start. Then the start shows "Putting the update in place" and how far it is.

If it fails, the devices keep the firmware they had.

> **Tested in a virtual machine.** Rooms, updates, the automatic return from a failed update, going back and pruning have been tested in a virtual machine. Restore points and firmware updates have been tested against stand-ins only. None of it has been tried on a range of real computers yet.

## For Arch users: `pacman -Syu`

Takumi is built on Arch Linux, and `sudo pacman -Syu` still works. It updates the room you are running, in place, the way Arch users expect. Takumi says once that `takumi update` would have prepared a room you can undo, and never stops you. The room keeps starting with its own new kernel.

The difference: an update in place cannot be undone by going back, because there is no new room to leave. `takumi update` runs the same `pacman -Syu`, inside a copy of the system, with the safety net described above.

## From the command line

```bash
takumi update                     # prepare a new room with the latest software
takumi update check               # look for updates now
takumi update prepare on          # prepare on the charger: on, off or status
takumi update clean               # free up space
takumi rollback                   # go back to the previous system (asks, then restarts)
takumi room list                  # every room: when, state, pinned, kernel
takumi room use <room>            # start this room from now on
takumi room pin <room>            # never delete it (--unpin to undo)
takumi room prune                 # delete old rooms now
takumi room snapshot "Before trying Docker"   # save a restore point
takumi firmware                   # update firmware, on the charger
```

A room's name is when it was made, such as `20261108-093000`, as `takumi room list` shows it.
