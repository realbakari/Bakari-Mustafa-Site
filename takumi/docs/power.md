---
title: Power and battery
permalink: /takumi/docs/power/
layout: takumi-docs
description: "Shut down, restart, sleep and lock; the battery, power modes, when the screen locks and sleeps, the lid, hibernation, staying awake and the 80% charge limit."
---

Power lives in the Core. Press <kbd>Super</kbd>+<kbd>Space</kbd> and type `power`, or a plainer word: `battery`, `lid`, `sleep`, `lock`, `awake` or `hibernate`. The Palette lists the battery, the power mode, staying awake, when the screen locks and the computer sleeps, what the lid does and hibernation.

To shut down, restart or sleep, type `shut down`, `restart` or `sleep`, or press the power button on the computer: it opens the Core on these choices. <kbd>Super</kbd>+<kbd>L</kbd> locks the screen.

| | Mac | Windows | Takumi |
|---|---|---|---|
| Shut down, restart, sleep | the Apple menu | the Start menu, Power | type `shut down`, `restart` or `sleep`, or the power button |
| Lock the screen | `Ctrl+Cmd+Q` | `Win+L` | <kbd>Super</kbd>+<kbd>L</kbd> |
| Battery saving | Low Power Mode | Battery saver | **Power saver** |
| Keep it awake for a film | an app such as Amphetamine | Power settings | **Stay awake for an hour** |
| Hibernate | (not offered) | Hibernate | **Hibernate**, once turned on |
| Charge to 80% only | Optimised Battery Charging | some makers' apps | **Keep the battery at 80%** |

## Shut down, restart, sleep, log out

In Quick settings (<kbd>Super</kbd>+<kbd>I</kbd>), and as rows in the Palette:

- **Sleep**: locks the screen, then sleeps. Everything stays open, and comes back when you press a key or open the lid.
- **Restart**: closes every app and starts the computer again.
- **Shut down**: closes every app and turns the computer off.
- **Log out**: closes every app and ends your session, back to the login screen.

Restart, shut down and log out ask first. Each app is asked to close, as if you pressed its own close button. If an app has unsaved work, it asks you in its own window ("Save changes?"), and nothing turns off: that window comes to the front, and the Core says, for example, "Text Editor still open · Save or close it, then shut down again". Answer it, then shut down again.

## The battery

On a laptop, the Palette's battery row says how it is: "Battery 83% · On battery · 2 h 10 min left", "Charging", or "Full, plugged in".

Below 15% the Core says "Battery low · 14% left". Below 5% it says "Plug in now · the computer sleeps at 3%", and at 3% the computer goes to sleep so nothing is lost. If hibernation is on, it hibernates instead, which keeps your work even if the battery then runs out completely. Each warning shows once each time the battery falls below its level.

### Battery health

Type `something is wrong` in the Palette for Takumi's check-up. On a laptop it includes the battery: "The battery holds 80% of what it did when new". Under 70%, it says the battery lasts less than it did and can be replaced.

### Keep the battery at 80%

A battery that sits at 100% on a charger all day wears out sooner. On a laptop that can hold its charge lower, **Keep the battery at 80%** stops charging at 80% and, where the laptop allows, starts again only below 75%. The row then reads **Battery kept at 80%**, and Enter on it lets the battery charge to 100% again, for a day out. The battery row says "Charging to 80%", then "Plugged in · kept at 80% so it lasts".

This is for a laptop that is mostly plugged in. Laptops that cannot hold their battery below full do not show the row.

## Power modes

The modes this computer offers are rows of their own, and a tile in Quick settings:

- **Power saver**: the battery lasts longer, and the computer is a little slower.
- **Balanced**.
- **Performance**: fastest, and louder and warmer.

The one in use says so.

## On battery and plugged in

A laptop keeps two sets of choices: one for when it runs on battery and one for when it is plugged in. Each set has a power mode and the minutes before the screen locks and the computer sleeps. When you choose a mode or minutes, it changes the set for the power you are on now, and the notice says so ("Power saver · used on battery from now on"). Plug in or unplug, and the computer changes sets by itself within two minutes.

What a new computer starts with:

| | On battery | Plugged in |
|---|---|---|
| Power mode | Power saver | Balanced |
| Lock the screen after | 10 minutes | 20 minutes |
| Sleep after | 30 minutes | never |

A minute after the screen locks, the screens turn off. The screen also locks just before the computer sleeps, however it goes to sleep.

## When it locks and sleeps

The rows **Lock the screen after 10 min** and **Sleep after 30 min** show the times for the power you are on now. Press Enter and type the minutes in place. 0 means never.

## Stay awake

For a film, a presentation or a long download, **Stay awake for an hour** stops the screen locking and the computer sleeping. The row then reads **Awake until 14:30 · Enter to stop**. Quick settings has a **Stay awake** tile that does the same.

## Closing the lid

On a laptop, the Palette offers what closing the lid does:

- **Sleep when the lid closes**: the first choice.
- **Keep running when the lid closes**: the screen locks while music and downloads carry on.
- **Hibernate when the lid closes**: once hibernation is on.

A choice made on battery holds when plugged in too, unless you make a separate choice while plugged in; a choice made while plugged in holds only then. With a second screen connected, closing the lid never sleeps the computer, whatever the choice, so a laptop on a desk with a monitor keeps working.

Changing what the lid does, sleep, hibernation or the charge limit changes the computer for everyone who uses it, so the Core asks for your password first.

## Hibernation

Sleep keeps your work in memory, which needs a little power: a laptop asleep in a bag is empty after a day or two. Hibernation writes the memory to the disk and turns the computer off completely. At the next start, everything comes back as it was, behind the locked screen.

Hibernation starts off. **Turn on hibernation** shows how much disk it uses: as much as the computer's memory, so 16 GB on a computer with 16 GB, plus 8 GB more kept free for updates. If the disk is too full, it says so in numbers. On an encrypted disk, the hibernation file is encrypted too: the start asks for your password, then wakes.

Once it is on, the Palette offers:

- **Hibernate**: now.
- **Sleep, then hibernate after 2 hours**: every way of sleeping (the lid, the minutes after no use, and the Sleep row) turns into hibernation after two hours asleep, so the battery lasts for days.
- **Turn off hibernation**: gives the space back. Lid and sleep choices that used hibernation go back to plain sleep.

Ask for hibernation on a computer that cannot hibernate and it says why. The reasons are a disk not set up by Takumi's installer, Secure Boot locking the system down, or start options that turn hibernation off.

### Hibernation and updates

When an update is waiting for a restart, hibernating does not start the update: waking brings back exactly what you had. The update is tried at the next real restart, as planned. See [Updates, rooms and rollback](/takumi/docs/updates/).

## When it does not work

- **"Save or close it, then shut down again".** An app has unsaved work. Answer its window, then try again.
- **No battery rows.** The computer has no battery (a desktop, or a virtual machine).
- **No Keep the battery at 80% row.** This laptop cannot hold its battery below full.
- **Hibernation is not available.** The row says why.
- **"Hibernation is off, so closing the lid does nothing".** The lid was set to hibernate and hibernation was turned off. Choose another lid choice.

> **Not yet.** A charge limit other than 80%, the charge limit in Quick settings, and hiding Sleep on a computer whose sleep does not work. Older systems kept from before hibernation was turned on start without it.

> **Tested in a virtual machine.** Power has been tested in a virtual machine, which has no battery and no lid, and against stand-ins for both. It has not yet been tried on a range of real laptops.

## From the command line

```bash
takumi power off                          # shut down (closes apps first)
takumi power restart
takumi power sleep                        # lock, then sleep
takumi power logout
takumi lock                               # lock the screen
takumi power profile power-saver          # or balanced, performance
takumi power awake 60                     # minutes; stop ends it
takumi power when lock 15                 # lock or sleep, minutes, then battery or power
takumi power lid nothing on-charger       # sleep, hibernate or nothing
takumi power hibernate on                 # on, off or now
takumi power hibernate-after 2            # hours, or never
takumi power charge-limit 80              # or 100
```

`takumi power when` without minutes asks for them. `takumi power lid` without `on-charger` sets the choice for battery. Commands that change the computer for everyone ask for your password.
