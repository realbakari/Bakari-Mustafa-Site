---
title: Lumen – Support
permalink: "/lumen/support/"
layout: page
hide_title: true
comments: false
excerpt: "Help for Lumen for iPhone: getting started, camera controls, the editor and Looks, the Lock Screen camera, Siri and Shortcuts, recording to a drive, and common questions."
description: "Support and documentation for Lumen, a camera, RAW developer and photo editor for iPhone. How to use the camera, the editor, Looks, the Lock Screen and Control Centre camera, Siri and Shortcuts, and recording video to an external drive."
image: "/assets/img/lumen/icon.png"
---

<link rel="stylesheet" href="/assets/css/lumen.css?v=2">

<div class="lu lu-doc">

<div class="lu-doc-head">
  <p class="lu-crumb"><a href="/lumen/">Lumen</a> › Support</p>
  <h1>Lumen Support</h1>
  <p class="lu-lede">How to get the most from Lumen's camera, editor and Looks, and answers to common questions. Can't find what you need? Email <a class="lu-link" href="mailto:{{ site.data.lumen.support_email }}">{{ site.data.lumen.support_email }}</a>.</p>
</div>

<nav class="lu-toc" aria-label="On this page">
  <h2>On this page</h2>
  <ol>
    <li><a href="#getting-started">Getting started</a></li>
    <li><a href="#camera">Camera controls</a></li>
    <li><a href="#video">Video</a></li>
    <li><a href="#editor">The editor</a></li>
    <li><a href="#looks">Looks and Recipes</a></li>
    <li><a href="#library">Library and culling</a></li>
    <li><a href="#lock-screen">Lock Screen and Control Centre</a></li>
    <li><a href="#siri">Siri and Shortcuts</a></li>
    <li><a href="#drive">Recording to an external drive</a></li>
    <li><a href="#faq">Common questions</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</nav>

<div class="lu-prose" markdown="1">

## Getting started {#getting-started}

Lumen needs an iPhone with iOS {{ site.data.lumen.minimum_ios }} or later. It opens at the camera.

1. **Allow the camera.** The first time, iOS asks whether Lumen may use the camera. For video, it also asks for the microphone.
2. **Allow Photos.** Lumen saves everything you shoot to Apple Photos, and its library and editor work on your Photos library. Choose **Allow Full Access** so Lumen can show your library, develop RAW files and attach Looks to your captures. With limited access, Lumen still saves your photos but can only see the ones you've chosen.
3. **Take a photo.** Press the shutter, or a volume button. The thumbnail in the corner opens the library; choose a photo and tap **Edit** to open the editor.

Lumen has no account and needs no internet connection. Everything it does happens on your iPhone.

<p class="lu-note">Lumen only offers what your iPhone's cameras can really do. If a control described here doesn't appear, the current lens or your iPhone model doesn't support it.</p>

## Camera controls {#camera}

### Lenses and zoom

Tap a lens in the lens pill to switch between your iPhone's back cameras, and pinch to zoom on the current lens. The switch at the end of the pill turns to the front camera and back. Macro appears when the ultra-wide camera can focus closely. Selfies are mirrored, like the preview.

### Exposure, focus and white balance

The control deck has a chip for each setting: **Shutter**, **ISO**, **EV** (exposure compensation), **Focus** and **WB** (white balance). Each starts on **Auto**.

- **Set one, and Lumen meters the other.** Fix the shutter speed and Lumen picks the ISO (shutter priority), or fix the ISO and it picks the shutter speed (ISO priority). Fix both for full manual. There is no mode switch: the mode follows which chips you've set.
- **Back to auto.** Tap **AUTO** beside a chip's value.
- **Focus.** Tap the viewfinder to focus there, or set focus by hand from the Focus chip, from Near to Far.
- **White balance.** Choose a preset, lock the current balance, or set the temperature in kelvin with a tint.
- **Grey card.** In the white balance panel, tap **Grey Card**, then tap something neutral grey or white in the viewfinder. Lumen measures it and sets the white balance until it reads neutral.
- **Exposure spot.** In camera settings you can separate metering from focus. A sun marker then sets where exposure is measured: drag it anywhere, and a tap only focuses.

Manual settings go back to auto each time you open Lumen, so a setting left from last time never spoils a new shot.

### Format, size and frame

Tap the format badge in the status strip to choose:

- **Format:** RAW, RAW + HEIF, RAW + JPEG, HEIF or JPEG. Where your iPhone offers both ProRAW and Bayer RAW, you can choose which.
- **Size:** 12, 24 or 48 MP, where the current lens offers them.
- **Frame:** 4:3, 3:2, 16:9 or 1:1. Lumen keeps the whole sensor frame and saves the crop as an edit, so you can undo it later in the editor or in Photos.
- **HDR:** on by default. Single shots and timer shots on automatic exposure are saved as HDR photos. Bursts, brackets and shots with a fixed shutter speed or ISO are saved in standard range.

### Drive, timer and flash

The drive menu offers single shots, bursts, 3 and 10 second timers, and exposure brackets. In camera settings, **Merge brackets to HDR** combines each bracket into a new HDR photo; you can also merge later from the library. The flash menu (Off, Auto, On) appears for lenses that have a flash. Bursts and brackets never use the flash.

### Viewfinder aids

Tap the gear in the status strip for camera settings. Under **Viewfinder** you can turn on the **Histogram**, **Clipping** warnings, **Focus peaking**, **Zebras** (with an adjustable threshold), a **Level** and composition grids. Your choices are remembered.

Camera settings also hold **Develop RAW at capture**, which develops RAW photos in the background after they're saved, and **Save location**, which is off by default.

### Camera Control

On iPhones with Camera Control, Lumen adds three controls to it: **Exposure**, **Look** and **Look Intensity**. Light-press Camera Control to see them and slide to adjust.

## Video {#video}

Switch to **Video** to record. In the format menu choose the resolution (4K or 1080p), the frame rate (24 to 60 fps, plus 120 and 240 fps in 1080p where your iPhone offers them) and the codec: HEVC, or ProRes in Apple Log on iPhones that support it.

- **Looks in video.** With **Instant Grade**, the Look is recorded into the clip, matching the viewfinder. Otherwise the clip is recorded clean and the Look is kept with it. Above 120 fps the Look is always kept separately.
- **Pause.** During a take, the Pause button holds the recording; Resume carries on in the same file.
- **Sound.** Left and right meters show the level. Ride the gain from −12 to +12 dB from the meter's menu, even mid-take.
- **Exposure.** Lumen keeps a 180° shutter automatically. In camera settings you can add a **Waveform** and **False colour**, which also work in Apple Log.
- **Video light.** The light toggle appears for lenses with a torch.

## The editor {#editor}

Open a photo in the library and tap **Edit**. The tools run along the bottom:

| Tool | What it does |
|---|---|
| Looks | Apply a Look and set its strength. See [Looks and Recipes](#looks). |
| Develop | How a RAW file is developed: **Natural** (the default: no added sharpening or local tone mapping, light noise reduction), **Apple** or **RAW**. |
| Light | Exposure, contrast, highlights, shadows and more. |
| Colour | White balance (presets, Auto, or **Pick** a neutral spot), vibrance and saturation. |
| Crop | Crop, straighten, rotate, flip, perspective and automatic upright. |
| Heal | Heal and clone spots, or paint over something to remove it. |
| Curves | RGB, luminance, red, green and blue curves. |
| HSL | Hue, saturation and luminance for eight colour bands. |
| Grade | Three-way colour grading for shadows, midtones and highlights. |
| Masks | Linear, radial, brightness and colour-range masks, and masks for the subject, a person or the sky, each with its own adjustments. |
| Detail | Sharpening and noise reduction. |
| Effects | Grain, vignette and other finishing touches. |
| Optics | Distortion, vignetting and colour fringing. |

For HSL and curves, you can drag directly on the photo to adjust the colour or tone under your finger. Any slider accepts a typed value.

Undo and redo sit under the photo, and the history lets you jump back to any step. Press and hold the photo to see the original, or use the compare button for a side-by-side view. Tap **Done** to save. Lumen saves the edit in Photos as a non-destructive edit; the original is never changed, and you can reopen the edit in Lumen later or revert it in Photos.

**Export** from the editor or the library as JPEG, HEIF, PNG, 16-bit TIFF or AVIF, in sRGB or Display P3, with HDR where the format supports it. You can add a text watermark and choose how much metadata to keep, including removing the location.

## Looks and Recipes {#looks}

Lumen has 48 original Looks in eight families: **Everyday**, **Portrait**, **Colour**, **Outdoor**, **Urban**, **Analog**, **Cinema** and **Mono**. Each tile previews the Look on your photo. Filter by family at the top of the panel, and use the strength slider to go from none to the full Look.

**In the camera.** Tap the Look button in the status strip to choose a Look (you can search by name, family or subject), or swipe across the viewfinder to move between your favourites. What you see in the viewfinder is what you get. The photo is saved first, then Lumen develops it with the Look as an edit you can change or remove later. This needs full Photos access.

**Your own Looks.** In the editor's Looks panel, tap **Add**, then **Save as Look** to turn the current edit into a Look you can reuse with a strength slider. Exposure, white balance and detail stay with the photo, not the Look.

**Recipes.** **Save as Recipe** keeps a Look with its strength plus your adjustments. Applying a Recipe replaces the creative part of an edit and leaves the crop, masks and development as they were. You can rename, duplicate, reorder, share and delete your Looks and Recipes, and import Looks shared as `.lumenlook` files.

**LUTs.** Bring in your own 3D `.cube` LUTs with **Add › Import LUT…**, or open a `.cube` file from Files or Mail in Lumen. Each becomes a Look with a strength slider. From the Look's menu, choose whether the LUT expects a Rec.709 or an Apple Log image.

**Many photos at once.** In the library, select photos to apply a Look or Recipe to all of them, or copy an edit from one photo and paste it onto others, choosing which parts to paste.

## Library and culling {#library}

Lumen's library is your Apple Photos library. Browse by album, scroll by date, search by name, date and kind, and filter by RAW, favourites, edited photos, flags, ratings and labels. Bursts and brackets are grouped in stacks.

Tap **Cull** to go through photos full screen: swipe up to pick and down to reject, give one to five stars, add a colour label or favourite, and see the exposure, lens and camera for each shot. Compare two photos side by side, or survey up to twelve. Deleting rejected photos always goes through iOS's confirmation, and they wait in Recently Deleted.

## Lock Screen and Control Centre camera {#lock-screen}

Lumen adds a **Lumen Camera** control you can place in Control Centre, on the Lock Screen and on the Action button.

- **Control Centre:** open Control Centre, tap **+**, then **Add a Control**, and choose **Lumen Camera**.
- **Lock Screen:** touch and hold the Lock Screen, tap **Customise**, choose the Lock Screen, and replace one of the controls at the bottom with **Lumen Camera**.
- **Action button** (on iPhones that have one): go to *Settings › Action Button*, choose **Controls**, and pick **Lumen Camera**.

Press the control while your iPhone is unlocked and Lumen opens at the camera. Press it while locked and Lumen's Lock Screen camera opens without unlocking. It has a viewfinder, the lens row, the front and back switch, tap to focus, and the shutter and volume buttons. It takes HEIF photos with HDR, up to 24 MP. Looks, RAW and video aren't available on the Lock Screen; tap **Open Lumen** to unlock and carry on in the app.

Photos taken while locked are kept safely on your iPhone and moved into Photos the next time you open Lumen. Lumen then shows "Added 2 photos from the Lock Screen camera" (with however many you took).

## Siri and Shortcuts {#siri}

Lumen's actions are ready in Siri, Spotlight and the Shortcuts app without any setup. Say, for example:

- "Open the Lumen camera"
- "Open Lumen in video mode"
- "Shoot with Golden in Lumen"
- "Set the Lumen camera Look to Mono"
- "Turn off the Lumen camera Look"
- "Apply Coast to my latest photo in Lumen"
- "Open my Lumen library"

In the Shortcuts app you'll find these actions, plus **Apply Look to images**, which applies a Look to photos you pass in. Any of them can go on the Action button through a shortcut, or into an automation.

## Recording to an external drive {#drive}

On iPhones that can record to external storage, Lumen can record video straight to a drive connected by USB-C.

1. Connect the drive. It needs a file system iOS can write to, such as APFS or exFAT.
2. Switch to **Video**, tap the format badge, and under **Record to** choose the drive. The list shows each drive's free space and how much recording time it holds at the current format.
3. The first time, iOS asks whether Lumen may use the drive. Allow it.
4. Record as usual. The time left in the viewfinder now counts the drive's space.

Takes recorded to a drive go into the drive's DCIM folder and stay there; they are not added to Photos. Open them in the Files app or on a computer.

If the drive is missing, not allowed or has too little room, Lumen records to your iPhone and says why. If the drive is unplugged or fills up during a take, Lumen keeps recording on your iPhone and shows a notice. The part on your iPhone is saved to Photos, and the drive keeps what was recorded up to about the last second before it went.

## Common questions {#faq}

<details markdown="1">
<summary>Does Lumen change my original photos?</summary>

No. Edits, crops from the camera's frame setting, and Looks attached at capture are all saved in Photos as non-destructive edits. You can open them again in Lumen, or revert to the original in Photos (*Edit › Revert*).
</details>

<details markdown="1">
<summary>Why didn't a Look get attached to a photo I took?</summary>

Attaching a Look after capture needs full access to your Photos library. The photo itself is always saved. Allow full access in *Settings › Apps › Lumen › Photos*, then apply the Look in the editor.
</details>

<details markdown="1">
<summary>Why don't I see a control, lens or format?</summary>

Lumen asks your iPhone what each camera can do and shows only that. 48 MP, ProRAW, ProRes, Apple Log, 120 and 240 fps, Camera Control, external recording and some lenses are only on certain iPhone models, and some options change with the lens you're using.
</details>

<details markdown="1">
<summary>The flash or video light didn't fire.</summary>

When your iPhone is very warm, iOS can hold back the flash and the light to protect it. Let it cool and try again. Bursts and brackets never use the flash.
</details>

<details markdown="1">
<summary>Why are some of my photos not HDR?</summary>

The camera only makes HDR photos for single and timer shots on automatic exposure. Bursts, brackets and shots with a fixed shutter speed or ISO are standard range. Check that HDR is on in the format menu.
</details>

<details markdown="1">
<summary>Where are the photos I took from the Lock Screen?</summary>

Open Lumen. They're moved into Photos as soon as the app opens, and Lumen tells you how many were added.
</details>

<details markdown="1">
<summary>Does Lumen need an internet connection or an account?</summary>

Neither. Lumen makes no network requests. If you use iCloud Photos, iOS may download a photo's original from iCloud when you open it, as it does for any app.
</details>

<details markdown="1">
<summary>Do my edits and Looks sync to my other devices?</summary>

Edits are saved in Photos, so with iCloud Photos they travel with your photos. Your own Looks and Recipes are stored in Lumen on this iPhone; share them as files to move them to another device.
</details>

<details markdown="1">
<summary>Does Lumen save my location?</summary>

Only if you turn on **Save location** in camera settings. It's off by default. When it's on, the location is written into the photo's metadata, and you can remove it when you export. See the [privacy policy](/lumen/privacy/).
</details>

<details markdown="1">
<summary>Why did my manual settings go back to auto?</summary>

On purpose: shutter, ISO, focus and white balance return to auto each time you open Lumen, so a setting left from last time never ruins the next shot. Format, size, frame and viewfinder aids are remembered.
</details>

## Contact {#contact}

For help, bug reports or ideas, email [{{ site.data.lumen.support_email }}](mailto:{{ site.data.lumen.support_email }}). Please include your iPhone model, iOS version and what happened, and a screenshot if you can.

</div>

<p class="lu-doc-foot"><a href="/lumen/">Lumen</a> · <a href="/lumen/privacy/">Privacy policy</a></p>

</div>
