---
title: Backups and sharing
permalink: /takumi/docs/backups/
layout: takumi-docs
description: "Back up your home folder every hour to a USB disk or a cloud, restore a file or everything, and send files to phones and computers nearby with LocalSend."
---

Takumi can copy your home folder (your documents, pictures, music and settings) every hour to a USB disk or a cloud. Each backup is encrypted on this computer before it leaves, and kept the way a time machine keeps it: every hour of the last day, every day of the last month, and every week before that.

To start, press <kbd>Super</kbd>+<kbd>Space</kbd>, type `backup` and press Enter on **Set up backups**.

Backups are for your files. If an update goes wrong, that is undone by going back to an earlier system, which never touches your files: see [Updates, rooms and rollback](/takumi/docs/updates/).

| | Mac | Windows | Takumi |
|---|---|---|---|
| Back up every hour | Time Machine | File History | **Set up backups** |
| Back up to a cloud | iCloud (some folders) | OneDrive (some folders) | Google Drive, Dropbox, OneDrive, pCloud, Box |
| Get a file back | Time Machine, browse by date | File History, Restore | **Restore files from a backup**: one folder per backup, by date |
| Send to someone nearby | AirDrop | Nearby Sharing | **Send to…** (LocalSend) |

## Set up backups

Type `backup` (or `restore`, `time machine` or `file history`). Before backups are set up, the Palette offers each place they can go:

| The row | Enter |
|---|---|
| **Set up backups** | asks where, in the Core |
| Back up to T7 · Samsung PSSD T7 · 1 TB · Enter sets it up | one row for each plugged-in USB disk that can hold backups |
| Mac Backup cannot hold backups | a disk this computer cannot write to, and why |
| **Back up to Google Drive** (or Dropbox, OneDrive, pCloud, Box) | signs in through your browser |

Setup is a short conversation:

1. **A USB disk** is opened with no password. A disk formatted for a Mac, or locked with BitLocker, is refused with the reason. Disks formatted for Windows (exFAT, FAT, NTFS) and for Linux work.
2. **A cloud** opens its sign-in page in your browser. The Core says, for example, "Sign in to Google Drive in your browser, then allow rclone" ([rclone](https://rclone.org/) is the tool that talks to the cloud). Google Drive is asked only for the files the backups make, never the rest of your drive.
3. The backups go in a folder of their own, `Takumi Backups`, with this computer's name.
4. It ends on a card: **your backup key**, 32 digits in eight groups of four, hidden until you press Enter, beside a code your phone's camera can keep.
5. The first backup starts straight away.

The things it needs are installed the first time, after asking.

### Your backup key

The backups are encrypted, so nobody can read them without the key: not someone who finds the disk, and not the cloud. The card says it plainly: if this computer is lost, the key is the only way into your backups. Write it down or take a photo, and keep it away from the computer.

The computer keeps the key in your keyring (the place your passwords are kept, opened when you log in), so backups never ask you for it. If you lose the card, **New backup key** makes a new one, shown once on a new card; the old key stops opening your backups.

## When backups happen

A backup starts every hour, only while the computer is plugged in, and at most once an hour. A laptop on battery waits until it is on the charger. Plugging in the backup disk starts one too.

The backup disk does not need to stay plugged in. Takumi opens it when it needs it and closes it again, so you can unplug it between backups. If it has not been seen for seven days, the Core says "Backup disk not seen for 7 days · Plug in T7 to back up", once a week.

An hour with no changes leaves no new backup.

### Back up now

**Back up now** does not wait for anything, not even the charger. It says when it starts and when it is done: "Backed up to T7 · 41 GB of your home folder".

### Status

The `backup` row says when the last backup was and how big it is, for example "Backed up 3 min ago · 41 GB". If a backup fails, the row says why, in words, until a backup works: "T7 is full", "The key in your keyring does not open the backups on T7", "Google Drive could not be reached". The same trouble is said in the Core once a day.

## What is backed up

Your whole home folder, except what apps rebuild or download again: caches, the Trash, Steam games (your saves are kept), apps from Flathub (their settings are kept), and code projects' downloaded parts.

**Choose what is backed up** opens the list of folders that are left out. Each line is one folder, written from your home folder, and `*` stands for any name. You can also leave a folder out by putting an empty file named `.nobackup` in it.

## Restore files

**Restore files from a backup** opens your backups in Files. There is one folder for each backup, named by its date and time ("2026-11-09 14.00"), and each one holds your home folder as it was then. Find what you need and copy it back.

Backups are read-only, so nothing in them can be changed by accident. **Close your backups** closes them; they also close by themselves after four hours, or when you log out.

### Everything, on a new computer

After a new install or on a new computer, choose **Set up backups** and pick the same disk or cloud. When it already holds backups, the Core says whose they are ("T7 holds the backups of old-laptop. Go on with them here?") and asks for their backup key, from the card. A wrong key is asked again, three times. The backups then carry on where they were, and **Restore files from a backup** shows everything the old computer kept, so you can copy your whole home folder back. Saying no starts new backups beside the old ones.

### Turn backups off

**Turn backups off** stops them. The backups made so far stay on the disk or in the cloud.

## When it does not work

- **"cannot hold backups".** The disk is formatted for a Mac, is locked with BitLocker, or is new with nothing on it. Format it first: see [Drives and memory cards](/takumi/docs/drives/). Formatting erases it.
- **"T7 is full".** Use a bigger disk. Takumi does not yet delete the oldest weeks to make room.
- **Asked for your password after a start.** On an encrypted computer, the keyring is still locked after the one password at start, so the first backup asks once.
- **A NAS, Backblaze B2, S3 or another cloud that signs in with a password or key.** Set it up with `rclone config` in a terminal, and it shows as a **Back up to …** row. iCloud Drive is not offered.

> **Not yet.** Formatting a disk for backups from setup, making room on a full disk, backing up to more than one place, and backing up on battery without asking.

> **Tested in a virtual machine.** Backups have been tested against stand-ins, and in a virtual machine with a simulated USB disk. Real clouds and real disks over months of use have not been tried yet.

## Send files nearby

**Send to…** sends files to phones and computers near you, much like AirDrop, through [LocalSend](https://localsend.org/), a free app for Android, iPhone, Mac, Windows and Linux. Both sides need LocalSend open and the same Wi-Fi.

1. Copy files in Files (<kbd>Super</kbd>+<kbd>C</kbd>), or right-click them and choose **Scripts › Send to…**.
2. Type `send` (or `share` or `airdrop`) and press Enter on **Send to…**.
3. LocalSend opens with the files. Every phone or computer nearby with LocalSend open shows there; pick who gets them.

The first time, the Core asks: "Sending to phones and computers nearby uses LocalSend, a free app from Flathub (org.localsend.localsend_app). Get it? No password needed." If the firewall is on, it then asks to let LocalSend through.

### Receive files

**Receive from nearby** keeps LocalSend open in the background, so others can send to this computer. The Core says the name it shows to others: "Ready to receive: this computer shows as Quiet Fox in LocalSend nearby." What arrives is said in the Core, for example "Received beach.jpg · from Mira's iPhone", and pressing the notice opens it.

### Smaller to send

A photo from an iPhone is often a HEIC file many people cannot open, and a minute of 4K video is too big for email. With photos or videos copied in Files, type `shrink`, `smaller` or `email` for **Shrink 3 photos for email**, or right-click them in Files and choose **Scripts › Make smaller to send**. Each gets a smaller copy next to it, and the original is not touched:

- a photo becomes a JPEG, at most 2560 pixels on its long side and the right way up: "IMG_0042 (small).jpg";
- a video becomes an MP4 that every phone and mail app plays, at most 1080 pixels on its short side: "holiday (small).mp4".

At the end it says what it saved, for example "2 photos and a video are smaller: 16 MB became 2.2 MB, next to the originals". The first time, it offers to install what it needs.

For your own paired phone, there is also **Send to phone**: see [Your phone and VPNs](/takumi/docs/phone-and-vpn/).

> **Not yet.** Choosing who gets the files in the Core (LocalSend's own window does it), and receiving from login on: LocalSend runs from the first Send to… or Receive from nearby until it is closed or you log out. HDR video from a phone may look flat after shrinking.

## From the command line

```bash
takumi backup setup                  # or google-drive, dropbox, onedrive, pcloud, box
takumi backup now
takumi backup status
takumi backup restore                # your backups by date, in Files
takumi backup restore --close
takumi backup key                    # a new key on a card; the old one stops working
takumi backup off

takumi share ~/Pictures/beach.jpg    # LocalSend with these files, or the copied ones
takumi share --receive               # ready for what others send
takumi share shrink holiday.mov      # smaller copies to send
```

The backups are a [restic](https://restic.readthedocs.io/) repository, so they can also be read with restic itself and the backup key.
