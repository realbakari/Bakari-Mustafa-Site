---
title: Bluetooth
permalink: /takumi/docs/bluetooth/
layout: takumi-docs
description: "Connecting headphones, keyboards, mice, speakers and controllers to Takumi over Bluetooth: pairing with a code, connecting, forgetting, turning Bluetooth off and what to do when a device will not pair."
---

Headphones, keyboards, mice, speakers and game controllers connect from the Core. Pairing works the way a phone does: the computer shows the code it expects and asks whether the device shows the same.

Press <kbd>Super</kbd>+<kbd>Space</kbd> and type `bluetooth` (or `headphones`, `airpods`, `speaker` or `pair`). Put your device in pairing mode, then press <kbd>Enter</kbd> on its row.

| | Mac | Windows | Takumi |
|---|---|---|---|
| Bluetooth on or off | Control Center | Quick Settings (`Win+A`) | Quick settings (<kbd>Super</kbd>+<kbd>I</kbd>) |
| Pair a device | System Settings, Bluetooth | Settings, Bluetooth & devices, Add device | `pair` in the Palette, <kbd>Enter</kbd> on it |
| Remove a device | Forget This Device | Remove device | `forget` and its name |

> **Good to know.** Bluetooth in Takumi has been built and tested against a simulated Bluetooth adapter, not yet with a real one. What this page describes is what the code does; it has not yet been tried with real headphones or keyboards.

## Where it lives

**Quick settings** (<kbd>Super</kbd>+<kbd>I</kbd>, or click the marks at the right of the capsule) has the Bluetooth switch. It says what is connected, such as "WH-1000XM4 and 1 more". The arrow at its end opens the device rows.

**The Palette** lists, in this order:

1. **Connected** devices, with the battery when the device reports one: "Connected · battery 80%".
2. **Paired** devices that are not connected now: "Paired · Enter connects".
3. **Nearby** devices you have not paired: "Nearby · Enter pairs".

A device's name finds it from anywhere in the Palette. While the rows are on show, the computer looks for devices and the list updates by itself ("Looking for devices…"). It stops looking when you close the Palette.

Nearby devices that have no name, only an address, are left out. They are usually someone else's watch or a television across the street.

## Pair a device

1. Put the device in pairing mode. For most headphones, you hold the power or Bluetooth button until a light flashes; the device's manual says how.
2. Type `pair` in the Palette, and wait for the device to show under **Nearby**.
3. <kbd>Enter</kbd> on it. The row says "Pairing with WH-1000XM4…".

What happens next depends on the device:

- **Headphones, speakers, mice** usually pair without a code.
- **A phone or another computer** shows six digits. The Core asks "Does Pixel 8 show 482913?". <kbd>Enter</kbd> for yes, <kbd>Esc</kbd> for no.
- **A keyboard** needs digits typed on it. The Core says "Type 482913 on Keyboard K380, then press its Enter key".
- **An older device that wants a PIN** gets a field to type it in. It is often 0000.

The device is then trusted, so it reconnects by itself from now on, and connected. The Core says "Paired and connected to WH-1000XM4". If it does not connect at once, it connects whenever it is on and nearby.

## Connect and disconnect

<kbd>Enter</kbd> on a **Paired** device connects it. <kbd>Enter</kbd> on a **Connected** device disconnects it. A notice says each time.

A trusted device connects by itself when it is on and in range, and again after the link drops. Headphones that are on when you log in connect at login.

## Headphones and sound

When headphones or a headset connect, sound moves to them, as on a phone. When they go away, what was playing pauses instead of carrying on out of the speakers.

Headphones play music in high quality, and switch to headset mode (the microphone works, but sound is call quality) only while an app uses their microphone. When the call ends, music quality comes back by itself.

To see how good the sound is, type `bluetooth sound` and choose **Bluetooth sound quality**: for example "AirPods Pro · AAC · good quality". More about outputs, volume and microphones is on the [Sound](/takumi/docs/sound/) page.

## Game controllers

Xbox controllers pair like any device: hold the pairing button on top until the Xbox button blinks fast, then type `pair` in the Palette. They also work by cable. Microsoft's Xbox Wireless Adapter (the USB stick) is not supported. More about games is on the [Apps](/takumi/docs/apps/) page.

## Forget a device

Type `forget`, or `forget` and the device's name. Each paired device has a **Forget** row ("It will need pairing again"). It asks first; <kbd>Enter</kbd> again forgets it, and a notice says "Forgot WH-1000XM4 · pair it again to use it". To use it again, pair it from the start.

## Turn Bluetooth off

Use the Bluetooth switch in Quick settings, or choose **Turn Bluetooth off** in the Palette. It disconnects everything. **Turn Bluetooth on** brings it back, and trusted devices reconnect when they are on and nearby.

## When it does not work

- **The device does not show under Nearby.** Put it in pairing mode again; many devices leave it after a minute or so. Keep it close to the computer. If it is connected to a phone, turn Bluetooth off on the phone, because many headphones talk to one device at a time.
- **"Not paired: the codes did not match, or you said no".** Check the digits on both screens and try again.
- **"WH-1000XM4 did not pair: put it in pairing mode and try again".** The device left pairing mode or did not answer. Start again from step 1.
- **"WH-1000XM4 is no longer nearby".** It went out of range or turned off during pairing.
- **"WH-1000XM4 did not connect: is it on, nearby and not in use by another device?".** Turn it off and on, or disconnect it from the other device.
- **A device that used to work will not connect.** Forget it, then pair it again.
- **"No Bluetooth here".** The computer has no Bluetooth adapter, or its Bluetooth service is off. A USB Bluetooth adapter adds one.
- **The microphone sounds poor on a call.** That is headset mode, which every Bluetooth headset uses while its microphone is on. A wired or USB headset sounds better on calls.

## From the command line

The rows in the Palette run these. They take the device's address (six pairs of letters and digits, such as `AA:BB:CC:11:22:33`), not its name.

```bash
takumi switch bluetooth                       # turn Bluetooth on or off
takumi bluetooth pair AA:BB:CC:11:22:33       # pair, checking the code, then connect
takumi bluetooth connect AA:BB:CC:11:22:33    # connect a paired device
takumi bluetooth disconnect AA:BB:CC:11:22:33
takumi bluetooth forget AA:BB:CC:11:22:33     # forget a paired device
takumi audio codec                            # how a headset's sound travels
```
