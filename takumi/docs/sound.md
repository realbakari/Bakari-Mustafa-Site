---
title: Sound
permalink: /takumi/docs/sound/
layout: takumi-docs
description: "Sound in Takumi: choosing where sound plays, moving what is playing, each app's own volume, the microphone and its mark, media keys, sound quality, laptop speaker tuning and fixing sound that does not work."
---

Sound lives in the Core. Press <kbd>Super</kbd>+<kbd>Space</kbd> and type `sound` (or `volume`, `headphones`, `microphone`, `media` or `speakers`), or click the speaker mark in the capsule. The Palette lists where sound goes, where it comes from, what is playing and how it sounds. A right click on the speaker mark mutes.

The volume slider is also in Quick settings (<kbd>Super</kbd>+<kbd>I</kbd>).

| | Mac | Windows | Takumi |
|---|---|---|---|
| Volume and output | Control Center, Sound | Quick Settings (`Win+A`), Sound | `sound` in the Palette, or click the speaker |
| Each app's volume | not built in | Volume mixer | the app's row under `sound` |
| Microphone | System Settings, Sound, Input | Settings, Sound, Input | `microphone` in the Palette |
| Who is using the microphone | the orange dot | the microphone icon on the taskbar | a microphone mark in the capsule |

## What you see

The rows read upwards from where you type:

1. **The output in use**: "Speakers · Sound goes here · 60%". Every other output says "Enter to send sound here": headphones, HDMI, a Bluetooth headset. A Bluetooth one also says how good its sound is ("AAC, good quality").
2. **Mute** or **Unmute**, and **Volume 25%**, **50%**, **75%** and **100%**.
3. **Each app playing now**, with its own volume: "Firefox · 75%", with what it plays under it.
4. **The microphone in use**, the other microphones ("Enter to use this microphone") and **Mute the microphone**.
5. **Who is recording**, at the top: "Zoom is using the microphone".
6. With two or more media apps open, **which one the media keys control**.
7. On a laptop, **the speaker tuning**.
8. **Sound: Balanced** and **Sound: Studio quality**, the one in use saying so.

The rows update every few seconds while they are open. Devices have plain names: Speakers, Headphones, HDMI, Line out, Bluetooth with the headset's name, Built-in microphone, Headset microphone. Three letters of a device or app find it (`hdm` finds HDMI), and every word counts (`volume 75`).

## Choose where sound plays

<kbd>Enter</kbd> on another output makes it the one in use, and moves everything that is playing to it at once: the song you were listening to follows you to the headphones. Recordings stay where they are. The Core says "HDMI 1 · Sound goes here".

<kbd>Shift</kbd>+<kbd>Mute</kbd> goes to the next output, in a fixed order, so pressing it again goes round them all. The Core names each one: "Sound: AirPods Pro".

What happens by itself:

- **Headphones or a headset that connect** (Bluetooth or USB) become the output, as on a phone. A USB headset's microphone becomes the microphone in use too.
- **A monitor or television plugged in by HDMI** does not take the sound. It stays where it was until you choose HDMI.
- **When headphones go away**, what was playing pauses instead of carrying on out of the speakers.

## Each app's own volume

Each app that is playing has its own row: "Firefox · 75%", and under it what it plays and what <kbd>Enter</kbd> does next ("Lo-fi beats · Enter for 50%"). <kbd>Enter</kbd> steps the app's volume down: 100, 75, 50, 25, mute, then back to 100. The main volume is not touched.

## The volume keys

None of these keys use <kbd>Super</kbd>. They work at the lock screen too.

| Keys | Does |
|---|---|
| <kbd>Volume up</kbd>, <kbd>Volume down</kbd> | 5% at a time; the Core shows the level |
| <kbd>Alt</kbd> with either | 1% at a time |
| <kbd>Shift</kbd> with either | all the way up, or silent |
| <kbd>Mute</kbd> | mute or unmute |
| <kbd>Shift</kbd>+<kbd>Mute</kbd> | the next output |
| <kbd>Microphone</kbd>, or <kbd>Alt</kbd>+<kbd>Mute</kbd> | mute or unmute the microphone: "Microphone off" |
| <kbd>Shift</kbd>+<kbd>Microphone</kbd> | the next microphone |
| <kbd>Alt</kbd>+<kbd>Microphone</kbd> | the microphone rows: who is listening |

Turning the volume up or down also unmutes: changing the level means you want to hear it. <kbd>Alt</kbd>+<kbd>Mute</kbd> is there for keyboards without a microphone key.

## The microphone

Type `microphone`. The microphone in use comes first; <kbd>Enter</kbd> on another uses it. **Mute the microphone** mutes it (and **Unmute the microphone** turns it back on). On laptops where the microphone key has a light linked to the sound chip, the light follows.

### The in-use mark

While any app records from the microphone, a microphone mark in the accent colour sits in the capsule. Click it to open the microphone rows, where the top row says who is listening: "Zoom is using the microphone". While an app uses the camera, a camera mark shows beside it.

> **Good to know.** A screen recording that takes the computer's own sound does not count as the microphone. An app that opens the camera directly, without asking through the system, is not seen; most browsers ask through the system.

## Media keys

| Keys | Does |
|---|---|
| <kbd>Play</kbd> | play or pause |
| <kbd>Next</kbd>, <kbd>Previous</kbd> | the next or the previous track |
| <kbd>Alt</kbd>+<kbd>Next</kbd>, <kbd>Alt</kbd>+<kbd>Previous</kbd> | ten seconds on, or back |
| <kbd>Alt</kbd>+<kbd>Play</kbd> | pause every app that is playing |
| <kbd>Shift</kbd>+<kbd>Play</kbd>, <kbd>Shift</kbd>+<kbd>Next</kbd> | the media keys move to the next app |
| <kbd>Shift</kbd>+<kbd>Previous</kbd> | the media keys move to the previous app |

The media keys reach one app at a time. With two or more media apps open, the Palette shows which one: "Media keys: Spotify · The media keys control it", and <kbd>Enter</kbd> on another app's row moves them there. The choice is remembered. If that app is closed, the keys reach another window of the same app, then whichever media app is open.

What is playing also shows at the bottom of the lock screen, with play and pause.

## Bluetooth headphones

A headset plays music in high quality, and switches to headset mode (the microphone works, but the sound is call quality) only while an app records from it. When the call ends, it goes back to music quality by itself.

Choose **Bluetooth sound quality** in the Palette to see how the sound travels: "AirPods Pro · AAC · good quality".

| Says | Means |
|---|---|
| very high quality | LDAC or aptX HD |
| high quality | aptX or LC3 |
| good quality | AAC or SBC XQ |
| standard quality | SBC |
| call quality, while an app uses the microphone | headset mode |

Which of these you get depends on the headphones. Pairing and connecting are on the [Bluetooth](/takumi/docs/bluetooth/) page.

## Sound quality

Every computer starts on **Sound: Balanced**: everything is mixed at one rate with a longer buffer, which uses less battery and does not crackle. **Sound: Studio quality** plays each song at its own sample rate with a shorter delay, for high-resolution music, recording and playing instruments. <kbd>Enter</kbd> on either changes it at once, without stopping what is playing, and it stays.

## Speaker tuning

Laptop speakers are small. Played as they are, they sound thin and distort when turned up. The speaker tuning adjusts them: a little less of the bass they cannot play, more body, clearer voices, and never a level that distorts. Headphones on the same socket are left alone; the tuning is on only while the speakers themselves play.

- If Takumi knows your laptop model, its tuning is on from the start, and the row reads **Speakers tuned for this laptop**. <kbd>Enter</kbd> lets you hear the speakers as they are; that choice is yours alone.
- On any other laptop, **Tune the speakers** tries a general tuning for laptop speakers. Once it is on, <kbd>Enter</kbd> on the row turns it off again.

> **Not yet.** Only the general tuning comes with Takumi so far; tunings measured for particular laptop models will be added as hardware is tested. Balance between left and right, choosing a headset's mode by hand, and a test sound are not built.

> **Tested in a virtual machine.** Sound has been tested in the virtual machine with simulated outputs, songs and calls. Real Bluetooth headsets and real laptop speakers have not yet been checked.

## When there is no sound

1. **Check the output.** Type `sound`. The top row is where sound goes now. If it is HDMI or headphones you are not wearing, <kbd>Enter</kbd> on **Speakers**.
2. **Check mute.** The row says **Unmute** while the sound is muted. Pressing <kbd>Volume up</kbd> also unmutes.
3. **Check the app's own volume.** An app's row may say it is muted or low. <kbd>Enter</kbd> steps it back up.
4. **Ask Takumi.** Type `something is wrong`. It checks sound among other things, fixes what is safe and says what it did in one sentence. If the sound rows say "Sound is not running", this is the place to start.

### When others cannot hear you

- Type `microphone` and check that the right microphone is in use, and that the row does not say **Unmute the microphone**.
- Press the <kbd>Microphone</kbd> key (or <kbd>Alt</kbd>+<kbd>Mute</kbd>) if the Core said "Microphone off".
- On a Bluetooth headset, the microphone works only in headset mode, which turns on by itself when an app records. If it does not, disconnect and connect the headset.

### Crackling sound

Choose **Sound: Balanced**. Studio quality uses a much shorter buffer, which a busy computer may not keep up with.

## From the command line

```bash
takumi audio output Headphones          # send sound to an output; "next" goes round them
takumi audio input "Headset microphone" # use a microphone; or "next"
takumi audio volume 30                  # 0 to 100, up, down, mute or unmute
takumi audio volume up --fine           # 1% at a time; --max or --min for the ends
takumi audio mic mute                   # mute, unmute or toggle
takumi audio app 57 50                  # one app's volume, by its stream number
takumi audio player spotify             # which app the media keys control; next, previous
takumi audio media play-pause           # next, previous, forward, back, pause-all
takumi audio codec                      # how a Bluetooth headset's sound travels
takumi audio quality studio             # or balanced; alone, the one in use
takumi audio tuning on                  # tune the built-in speakers
takumi audio tuning off                 # hear them as they are
takumi audio tuning list                # the tunings there are
```
