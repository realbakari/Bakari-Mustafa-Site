---
title: Printers and scanners
permalink: /takumi/docs/printers/
layout: takumi-docs
description: "Set up a printer on your network or by USB, see how it is, print a test page, and scan a page into Documents."
---

Printers and scanners live in the Core. Press <kbd>Super</kbd>+<kbd>Space</kbd> and type `printer` (or `print`, or `scan`). The Palette lists the printers already set up on this computer, the ones it can see on your network and by USB, and scanning when a scanner answers. There is no printer settings window.

Most printers made in the last ten years need no driver. Find yours in the list, press Enter, and it is ready.

| | Mac | Windows | Takumi |
|---|---|---|---|
| Add a printer | Printers & Scanners, + | Printers & scanners, Add device | `printer` in the Palette, Enter on **Add …** |
| Choose the printer apps use | Default printer | Set as default | Enter on a printer's row |
| See if it is out of paper | the printer's queue | the printer's queue | its row says so, and a notice tells you |
| Scan a page | Image Capture | Windows Scan | **Scan a document** |

## Add a printer

1. Turn the printer on and connect it to the same network as the computer, or plug it in with a USB cable.
2. Press <kbd>Super</kbd>+<kbd>Space</kbd> and type `printer`. "Looking for printers…" shows for a few seconds while Takumi looks.
3. Your printer appears as a row such as **Add EPSON ET-2850 Series**, with "On this network" or "Plugged in by USB" under it. Press Enter.
4. The Core says "Setting up …", then "… is ready to print".

The first printer you set up becomes the one apps print to.

Most printers made since about 2015 print without a driver (they understand standards called IPP Everywhere, AirPrint and Mopria). The computer asks the printer what it can do and needs nothing else.

### When a printer needs a driver

An older printer, or one plugged in by USB, may need a driver: a small piece of software that tells the computer how to talk to that model. The Core offers the closest one it has, in words, for example: "HP LaserJet 1020 needs a driver. Use “HP LaserJet 1020, hpcups 3.22.10”?" Enter takes it. Esc offers the next closest, up to three.

If there is none, the Core says the printer needs a driver this computer does not have. Printer drivers come in packages: `hplip` for HP printers, and `gutenprint` and `foomatic-db-engine` for many other makes.

### A printer that does not show up

A printer on another network, or one that does not announce itself, can be added by its address. Choose **Add a printer by its address** and type the address the printer shows on its own screen or settings page, such as `192.168.1.20`.

### Asked for your password

Usually nothing is asked. When the print system wants to be sure, the Core asks for your password in its own field, the same one the lock screen uses.

> **Good to know.** Only an administrator account can add or remove printers. On an account that is not an administrator, ask the person who set the computer up.

## How a printer is

Each printer set up here has a row that says how it is, in words: Ready, Printing, Out of paper, Paper is stuck, Out of ink (or toner, as the printer calls it), A cover is open, Offline, Paused or Stopped. "Ready · low on toner" means it still prints.

Pressing Enter on a row does what the row says:

| The row says | Enter |
|---|---|
| Ready · apps print to it | nothing: it is already the one apps use |
| … · Enter makes it the one apps print to | makes it the default |
| Offline · Enter starts it again | starts a stopped printer again, so waiting documents print |

You can also type the printer's name in the Palette to find its row.

## Notices

You do not need to keep the list open. Takumi follows what you print and tells you once:

- "Printed · Quarterly report.pdf · HP LaserJet M110w" when a document is done.
- "Could not print" when the printer gave up on a document. A document you cancelled says nothing.
- "HP LaserJet M110w is out of paper · add paper and it goes on by itself".
- "Paper is stuck in …", "A cover is open on …", "… is out of toner", "… is low on ink".
- "Office Color is offline · turn it on; your document waits for it", only while a document of yours is waiting for it.

Every printer is set up to keep trying while it is off or asleep, so a document waits and prints when the printer wakes, instead of everything stopping until someone starts it again.

## Test page and removing a printer

Type `test page` for **Print a test page on …** for each printer.

Type `remove printer` for **Remove …**. The Core asks before it removes the printer, together with any documents still waiting for it. You can set it up again later.

## Scanning

When a scanner answers (a network scanner, an all-in-one printer, or one plugged in by USB), the Palette offers two rows under `scan`:

- **Scan a document** scans one page at 300 dpi, in colour, into a PDF in your Documents folder, named like `Scan 2026-11-09 14-32-05.pdf`.
- **Scan a photo** makes a PNG picture instead, every detail kept.

The Core says "Scanned". Press the notice to open the file.

Network scanners work without a driver. Others work through SANE, the standard scanning software, when it knows the model.

## When it does not work

- **"No printers found".** Turn the printer on and check that it is on the same network, or plug it in. Then type `printer` again: the rows look again while they are on show.
- **"Printing is not set up".** The print system (CUPS) is missing. It is part of every Takumi install, so this means it was removed.
- **Two identical printers.** They show with the short tag each one announces, such as `[4C1A2B]`, which is all that tells them apart. The tag is often printed on the printer's network page.
- **"No scanner found".** Turn the scanner on and connect it to the network, or plug it in.
- **A document waits forever.** Look at the printer's row: Offline, Out of paper and Paper is stuck all hold documents until fixed. A Stopped printer needs Enter on its row.

> **Not yet.** Printing options such as two-sided, paper size and colour are chosen in each app's print dialog: there are no rows for them. Scanning several pages into one PDF, making scans searchable, and adding printers from an account that is not an administrator are planned.

> **Tested in a virtual machine.** Printing and scanning have been tested in a virtual machine with a simulated network printer and a simulated scanner, and against stand-ins. Real paper, a real USB printer that needs a driver, and a real network scanner have not been tried yet.

## From the command line

```bash
takumi printer                                   # the printers, how each is, the default
takumi printer add 192.168.1.20 "Office printer" # set one up from its address
takumi printer default "HP LaserJet M110w"       # the one apps print to
takumi printer test "HP LaserJet M110w"          # a test page
takumi printer resume "HP LaserJet M110w"        # start a stopped printer again
takumi printer remove "HP LaserJet M110w"        # asks first
takumi scan                                      # a PDF in Documents
takumi scan png                                  # a PNG instead
```

A printer's name can be written as it shows, or with underscores (`HP_LaserJet_M110w`), in any case. `takumi printer --json` gives the list in a form scripts can read.

[CUPS](https://openprinting.github.io/cups/) is the print system underneath, and [SANE](http://www.sane-project.org/) the scanning one.
