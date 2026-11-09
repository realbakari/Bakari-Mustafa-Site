---
title: Screenshots and recording
permalink: /takumi/docs/capture/
layout: takumi-docs
description: "Take a screenshot with the Mac's keys, mark it up, record the screen with sound and your camera, pick a colour, and copy text or a QR code off the screen."
---

Pictures, recordings, colours and words from the screen need no separate app on Takumi. Each one is a key, a row in the Palette and a button in Quick settings, and each ends with the Core saying what it did and offering to open it.

The keys are the Mac's: <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>3</kbd> for the whole screen, <kbd>4</kbd> for a part, <kbd>5</kbd> for a window. The picture is saved, copied so you can paste it straight away, and shown small in the capsule at the bottom of the screen.

| | Mac | Windows | Takumi |
|---|---|---|---|
| The whole screen | <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>3</kbd> | <kbd>Print Screen</kbd> | <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>3</kbd> or <kbd>Print</kbd> |
| A part of the screen | <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>4</kbd> | <kbd>Win</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> | <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>4</kbd> or <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> |
| A window | <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>4</kbd>, then <kbd>Space</kbd> | Snipping Tool | <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>5</kbd> |
| Record the screen | <kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>5</kbd> | Snipping Tool, or <kbd>Win</kbd>+<kbd>Alt</kbd>+<kbd>R</kbd> | <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>6</kbd>, again to stop |
| Draw on a screenshot | Markup | Snipping Tool | **Mark up**, or <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>7</kbd> |
| Pick a colour | Digital Color Meter | PowerToys | **Colour** in Quick settings |
| Copy text off the screen | Live Text | PowerToys | **Text** in Quick settings |

## Everything at a glance

| To | Keys | Palette | Quick settings |
|---|---|---|---|
| Picture a part | <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>4</kbd> or <kbd>S</kbd> | **Take a screenshot** | **Screenshot** |
| Picture the screen | <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>3</kbd>, <kbd>Print</kbd> | | |
| Picture a window | <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>5</kbd> | | |
| Picture a part, then mark it up | <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>7</kbd> | | |
| Mark up the last picture | **Mark up** on its notice | **Mark up the last screenshot** | |
| Record, or stop | <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>6</kbd> | **Record the screen** | **Record**, then **Stop** |
| Copy a colour | | **Pick a colour** | **Colour** |
| Copy the words in an area | | **Copy text from the screen** | **Text** |
| Read a QR code on the screen | | **Read a QR code on the screen** | |

In the Palette, `screenshot`, `record`, `colour`, `ocr` or `qr` find these rows.

## Screenshots

For a part of the screen, the screen dims and you drag over what you want, then let go. For a window, click it.

Every screenshot is saved in **Pictures › Screenshots** in your home folder, named by the date and time ("2026-11-09 10-00-00.png"), and copied, so <kbd>Super</kbd>+<kbd>V</kbd> pastes it into a message or a document straight away.

The Core then shows the picture, small, with "Screenshot copied · Saved in Pictures". Click it to open it in the image viewer, or click **Mark up** beside it to draw on it.

## Mark up a screenshot

**Mark up** opens the picture ready to draw on, with the arrow tool chosen. Beside it are boxes, circles, lines, words, numbered markers, a highlighter, blur (for hiding a name or a number) and crop.

- <kbd>Enter</kbd>, or <kbd>Esc</kbd> when no tool is in the middle of something, keeps your work: a marked-up copy is saved beside the picture ("2026-11-09 10-00-00 marked.png") and copied, ready to paste. The Core says "Marked up and copied", and a click opens the copy.
- The copy button in the window does the same, and the save button saves without copying.
- Closing the window keeps nothing.

The screenshot itself is never changed.

**Mark up the last screenshot** in the Palette opens the newest screenshot, never a marked-up copy. <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>7</kbd> takes a picture of a part and goes straight into marking it up.

## Record the screen

**Record the screen** in the Palette asks what to take in, one question at a time:

1. "Record the computer's sound?"
2. "And your microphone?"
3. "And your camera?"

Each yes adds one thing, and the first no ends the questions. So you get no sound, the computer's sound, the computer's sound and your microphone, or all three. The next time, the first question offers what you chose last ("Computer sound and microphone, like last time?"), and one <kbd>Enter</kbd> starts.

The Core then closes and says "Drag over what to record, or click a screen". Drag over an area, or click to record a whole screen. <kbd>Esc</kbd> gives up.

<kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>6</kbd> and **Record** in Quick settings ask nothing: they take in what you chose last, which starts as no sound.

### While it records

The capsule shows a red mark and how long it has been going, and the microphone's mark when it is recording your voice. To stop, do any of these:

- click the red mark
- press <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>6</kbd> again
- click **Stop** in Quick settings
- choose **Record the screen** in the Palette again

The Core says "Saving the recording" while it evens out the sound, then how long the recording was. Click it to open the file. Recordings are saved in **Videos › Recordings** in your home folder. One recording runs at a time.

The sound is evened out to the loudness podcasts and video sites use, as one change for the whole recording, so quiet and loud moments keep their difference. Silence is left as it is.

### Your camera

With the camera, a round bubble of you sits in the bottom-right corner of what is recorded, and is recorded with the rest. It shows you as a mirror does.

- Drag it anywhere inside the recorded area.
- Turn the mouse wheel over it, or click it and press <kbd>+</kbd> and <kbd>-</kbd>, to make it bigger or smaller.
- <kbd>Esc</kbd> hides it and lets the camera go.

It goes away when the recording stops.

### When something cannot be recorded

What cannot be taken in is said when the recording starts, never as a failure. A computer with no microphone records its own sound ("No microphone found, so the computer's sound only"). A computer with no camera records without the bubble. If the sound cannot be opened, the picture is still recorded.

> **Not yet.** Recording one window as it moves (a recording is of a screen or an area), trimming the ends of a recording, and setting how loud your voice is against the computer's sound. If you switch to other speakers or headphones while recording, the computer's sound stays with the ones in use when it started.

## Pick a colour

**Colour** in Quick settings, or **Pick a colour** in the Palette. Click anywhere on the screen. The colour's hex code (such as `#3a7bd5`) is copied, and the Core shows the colour itself beside it.

## Copy text from the screen

**Text** in Quick settings, or **Copy text from the screen** in the Palette. Drag over the words: a picture, a video, a page you cannot select. They are read and copied as text, and the Core shows their first words. "No words found there" means nothing readable was in the area.

> **Good to know.** Text is read in English. Other languages need their reading data installed and a setting changed, which is not yet offered in the Core.

## Read a QR code

**Read a QR code on the screen** in the Palette. Drag over the code. What it says is copied. When it is a web address, the Core says "Copied a link", and a click opens it. "No code found there" means none could be read in the area. Barcodes work too.

## Codes in messages

When an app's message holds a one-time code ("Your verification code is 482913"), its notice in the Core has a **Copy 482913** button, so the code is on the clipboard without opening the app. <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>Space</kbd> does the same from the keyboard. More in [Quick settings, Today and notices](/takumi/docs/quick-settings/#notices).

## When it does not work

- **Nothing happens on the screenshot keys**: check that another key of your own in `overrides.kdl` does not use them ([Keys](/takumi/docs/keys/#your-own-keys)).
- **A recording has no sound**: the sound is taken from the speakers or headphones in use when it started. Check which ones play in Quick settings, under **Volume**.
- **A scrolling screenshot of a long page** is not possible yet: no tool for it exists on this kind of desktop. Take several.

## From the command line

```bash
takumi screen shot                        # a part you drag over; also: window, screen
takumi screen shot window --markup        # a window, then mark it up
takumi screen markup                      # mark up the newest screenshot
takumi screen markup ~/Pictures/receipt.png   # mark up any picture
takumi screen record                      # record with what you chose last; again to stop
takumi screen record --sound both --camera    # computer sound, microphone and camera
takumi screen record screen --sound computer  # a whole screen, the computer's sound only
takumi screen record stop                 # stop recording
takumi screen colour                      # pick a colour
takumi screen text                        # copy the words in an area
takumi screen code                        # read a QR code
```

`--sound` takes `none`, `computer`, `mic` or `both`. Without `--sound` or `--camera`, a recording takes in what you chose last; `--camera` alone records no sound. Your last choice is kept in `~/.config/takumi/capture.toml`.
