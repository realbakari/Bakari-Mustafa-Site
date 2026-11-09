---
title: Drives and memory cards
permalink: /takumi/docs/drives/
layout: takumi-docs
description: "Plug in a USB drive or memory card, open it, eject it, erase it for Mac and Windows, write a disk image, check disk health and add a cloud folder."
---

USB sticks, memory cards and external disks open by themselves when you plug them in, as they do on a Mac or a Windows PC. The Core says which one came and how much room is left, and pressing the notice opens it in Files.

Everything else is a row in the Palette. Press <kbd>Super</kbd>+<kbd>Space</kbd> and type `drive`, `usb`, `eject`, `sd card` or the drive's name.

| | Mac | Windows | Takumi |
|---|---|---|---|
| Open a drive | it appears on the desktop | it appears in This PC | the notice, or Enter on its row |
| Take it out safely | Eject in Finder | Safely Remove Hardware | **Eject SanDisk 64 GB** in the Palette |
| Erase a drive | Disk Utility, Erase | Format… | `format` in the Palette |
| What fills my disk | Storage settings | Storage settings | **What fills my disk** |

## Plug in a drive

Plug in a stick and the Core says, for example, **SanDisk 64 GB · 41 GB free · press to open**. The name is the brand and the size printed on it, not the slightly smaller number of bytes it really holds. A card in a reader that has no brand of its own is called "SD card 32 GB".

Drives that were already plugged in when you logged in are opened too, without a notice.

The drive is open in Files, in its sidebar, until you eject it. In the Palette, type `drive` to see every drive and part:

| The row | Says | Enter |
|---|---|---|
| SanDisk 64 GB | 41 GB free · Enter opens it | opens it in Files |
| Photos on WD 2 TB | Not open · Enter opens it | opens it; a drive with several parts names each by its label |
| SD card 32 GB | Locked · Enter asks for its password | asks in the Core, then opens it |
| Kingston 16 GB | Nothing Takumi can read · Enter shows how to erase it for use | shows the ways to erase it |

### Locked drives

A drive encrypted with a password (on Linux, or with BitLocker on Windows where it can be read) says **SanDisk 64 GB is locked · type its name in the Core to unlock it**. Type its name, press Enter, and type its password. A wrong password is asked again.

### Drives Takumi cannot read

A drive in a format Takumi does not read says why, for example "it is formatted for a Mac (APFS), which Takumi cannot read". A blank drive says **Kingston 16 GB has nothing Takumi can read · type format in the Core to erase it for use**.

## Eject a drive

Before you pull a drive out, type `eject` and press Enter on **Eject SanDisk 64 GB**. Takumi finishes writing anything still on its way, closes the drive, locks it again if it was encrypted, and turns it off so its light goes out. The Core says "You can take out SanDisk".

If an app still has a file open on it, nothing is turned off and the Core says "Something is still using SanDisk 64 GB. Close what is open from it, then eject again".

If you pull a drive out without ejecting it, you get a reminder: **SanDisk 64 GB was taken out while open · eject it first next time, so nothing is lost**. Ejecting it from Files instead of the Palette is fine too, and gets no reminder.

## Erase a drive

Type `format` (or `erase`) and pick one of three ways for each drive:

| The row | Becomes | Good for |
|---|---|---|
| **Format SanDisk 64 GB for Mac, Windows and Linux** | exFAT | almost everything: files of any size, read by Mac, Windows and Linux |
| **Format SanDisk 64 GB for cameras and TVs** | FAT32 | older cameras, televisions, car radios; no single file over 4 GB |
| **Format SanDisk 64 GB for Linux only** | ext4 | a drive used only with Linux computers; it keeps file owners and permissions |

If you are not sure, choose the first one.

Erasing asks twice. First the Core names the drive, its size and what is on it, for example: "Erase SanDisk 64 GB? Everything on it goes: DCIM, Notes.txt and Taxes 2025.pdf. It becomes exFAT, for Mac, Windows and Linux." Press Enter, then "Press Enter again to erase SanDisk 64 GB", within five seconds.

Only USB drives and memory cards can be erased this way, never the disk the computer runs from. The drive keeps its old name if it suits the new format, or else takes the brand's name.

## Write a disk image to a USB stick

To make an installer stick, or put a system on a Raspberry Pi's memory card, type `usb`, `image`, `iso` or `flash` and choose **Write a disk image to a USB stick**. It writes `.img` and `.iso` files, and compressed ones ending in `.img.xz`, `.img.zst` or `.img.gz`, without unpacking them first.

Which image it writes:

- one you copied in Files (the row then reads **Write raspios.img.xz to a USB stick**),
- one you right-clicked in Files and chose **Scripts › Write to a USB stick**,
- otherwise the newest image in Downloads, which the Core asks about.

With several sticks plugged in, the Core asks which. Because this erases the stick, you type the drive's name to go on, not only press Enter: "Everything on Kingston 16 GB is erased and raspios.img.xz is written there. Type Kingston to go on". A wrong name is asked again. Your password is asked once, in the Core, and the notice shows how far it has got. At the end: "raspios.img.xz is on Kingston 16 GB. You can take it out".

An image bigger than the drive is refused before anything is erased. The disk the computer runs from is never offered.

## Check a disk's health

Type `drive health`, `ssd` or `smart` and choose **Check drive health**. Each disk inside the computer reports how it is, in words, such as **Samsung SSD 980 1TB · Healthy · 2% worn · 1,200 hours**. A disk that is wearing out says "Wearing out: replace it soon"; one that is failing says "Failing: copy what matters off it now".

Your password is asked in the Core, and the first time Takumi offers to install the small tool that reads the disks (smartmontools). Most USB drives, and the disks of a virtual machine, do not report their health.

## What fills my disk

**What fills my disk** says how much space is free on this computer and opens Disk Usage, a map of what takes the space, when Disk Usage is installed.

## OneDrive, Google Drive and Dropbox

Type the cloud's name or `cloud` and choose **Add OneDrive**, **Add Google Drive** or **Add Dropbox**. The cloud becomes a folder in your home (`OneDrive`, `Google Drive` or `Dropbox`) with a place in Files' sidebar, from every login on.

The first time, the Core offers to install what it needs, then opens the cloud's sign-in page in your browser: "Sign in to Dropbox in your browser, then allow rclone". [rclone](https://rclone.org/) is the tool that connects the folder to the cloud.

Files come down when you open them and are kept on this computer, up to 10 GB for each cloud, the longest unused going first. What you change or add is sent back. It needs the internet: offline, the folder may not list.

To stop, type `disconnect` and choose **Disconnect OneDrive**. The folder and its sidebar place go; the files stay in the cloud. The Core then asks whether to sign out and free the copies kept on this computer. Changes not yet sent are lost if you say yes; saying no keeps them, and adding the cloud again sends them. If you already have a folder of your own with that name and files in it, Takumi never covers it: the Core asks you to move them first.

## When it does not work

- **Nothing happens when I plug it in.** Type `drive`. "No drive plugged in" means the computer does not see it: try another port or cable.
- **It is formatted for a Mac.** Takumi cannot read APFS. Copy the files off on a Mac, or erase the drive (which deletes them).
- **"Something is still using…"** Close any window or app showing a file from the drive, then eject again.
- **A CD or DVD.** Ejecting does not open a disc tray.

> **Not yet.** Ejecting from the notice (it only offers to open), renaming a drive, checking a drive for errors, partitions, a speed test, iCloud Drive, and keeping a cloud's files on this computer before you open them.

> **Tested in a virtual machine.** Drives have been tested in a virtual machine with a simulated USB stick plugged in and pulled out, and against stand-ins. Real memory cards in a real reader, BitLocker drives and disk health on real disks have not been tried yet.

## From the command line

```bash
takumi drive                              # what is plugged in, how full, where it is open
takumi drive open SanDisk                 # open it in Files
takumi drive eject SanDisk                # close it and turn it off
takumi drive format SanDisk exfat         # erase it: exfat, fat32 or ext4 (asks twice)
takumi drive write raspios.img.xz SanDisk # write an image (you type its name)
takumi drive health                       # each disk's health
takumi drive cloud add onedrive           # onedrive, google or dropbox
takumi drive cloud remove dropbox
takumi drive cloud list
```

A drive's name can be its brand (`SanDisk`), its whole name (`SanDisk 64 GB`), a label (`Photos`) or a device name such as `sdb1`, in any case. At a terminal, `format` wants the word `erase` typed to go on. `takumi drive --json` gives the list in a form scripts can read.
