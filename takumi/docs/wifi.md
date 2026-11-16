---
title: Wi-Fi
permalink: /takumi/docs/wifi/
layout: takumi-docs
description: "Joining Wi-Fi networks in Takumi, wrong passwords, hidden networks, forgetting a network, sharing it by QR code, hotel sign-in pages and work or school networks."
---

Wi-Fi lives in the Core. There is no network menu and no settings window. Press <kbd>Super</kbd>+<kbd>Space</kbd> and type `wifi` (or `network`, or `internet`), or click the Wi-Fi mark at the right of the capsule. The Palette lists the networks nearby. <kbd>Enter</kbd> on one joins it, and if it needs a password, you type it right there.

The Wi-Fi switch and its arrow are also in Quick settings (<kbd>Super</kbd>+<kbd>I</kbd>).

| | Mac | Windows | Takumi |
|---|---|---|---|
| Join a network | the Wi-Fi menu in the menu bar | the network icon on the taskbar | `wifi` in the Palette, or click the Wi-Fi mark |
| Give a guest the Wi-Fi | share from a nearby iPhone | read the password out | <kbd>Enter</kbd> on your network: a code to scan |
| Forget a network | Wi-Fi settings, Forget This Network | Manage known networks, Forget | **Forget** and the network's name |

## The list of networks

The rows read upwards from where you type:

1. The network you are on: **Connected · Enter to share**.
2. Saved networks nearby, marked **Saved**. <kbd>Enter</kbd> joins without asking.
3. Every other network, strongest first, each saying what it needs: **Needs a password**, **Open, no password** or **Work or school sign-in**. A weak one adds "weak signal".
4. **Join a hidden network**, then **Turn Wi-Fi off** at the top.

Each network's icon shows its signal as three arcs, the missing ones dimmed. While the list is open, the computer looks for networks again every 20 seconds or so, and the row you moved to stays selected when the list updates.

Three letters of a network's name find it from anywhere in the Palette: `corner` finds "Corner Café".

## Join a network

1. <kbd>Enter</kbd> on the network. Only its row stays.
2. If it needs a password, the field asks for it ("Password for Corner Café"). What you type shows as dots; **Show**, at the right end of the field, shows the letters.
3. <kbd>Enter</kbd> joins. The row says "Joining Corner Café…" while a short line moves along the field.

When it works, the Core closes and says "Connected to Corner Café". The network is saved and joins by itself from now on.

<kbd>Esc</kbd> while it is joining closes the Core. Joining carries on, and a notice says how it ended.

### A wrong password

A wrong password is known in about ten seconds. The field shakes, turns red and empties, the row says "That password did not work", and it asks again. Nothing is saved until a password works.

If the network you are joining has changed its password, the saved one stops working and the Core asks for the new one.

### A hidden network

A hidden network does not show its name. Choose **Join a hidden network**, type its name, then its password. <kbd>Enter</kbd> with no password joins an open one.

## Share your network

<kbd>Enter</kbd> on the network you are on opens a card with a square code. A visitor points their phone's camera at it and joins without typing anything. The password is on the card too, hidden until you press <kbd>Enter</kbd>. <kbd>Esc</kbd> goes back. Typing `share wifi` finds the same card from anywhere.

The code is drawn dark on light whatever your theme, so any phone camera can read it. It works for hidden networks too.

## Sign-in pages

Hotel, café and airport networks often want you to accept terms on a web page before the internet works. Takumi notices within about ten seconds and opens that page in your browser, with a notice: "Sign in to Corner Café". It does this once per network per hour.

Until you sign in, the Wi-Fi mark in the capsule shows in the accent colour and the network's row says **Connected · sign in to use the internet**. <kbd>Enter</kbd> on it opens the page again. So does typing `hotel` and choosing **Open the Wi-Fi sign-in page**.

## Work and school networks

Networks such as eduroam, and many offices, sign you in with a username as well as a password. Their row says **Work or school sign-in**. <kbd>Enter</kbd> asks three things, one after another:

1. **Username**: at a school, this is usually your email address there.
2. **Password**, shown as dots.
3. **Server domain**: the name your IT department's Wi-Fi page gives for the network's server or its certificate, such as `radius.uni.example`. If your username has one (`ada@uni.example`), <kbd>Enter</kbd> on its own uses that.

Takumi checks that the network's server is really the one for that domain before it sends your password. That stops a network that only looks like eduroam from collecting it.

If it does not join, the row says why:

- **"eduroam's certificate is not for uni.example"**: the domain was wrong, and the Core asks for it again.
- **"That username or password did not work"**: it asks for both again, and <kbd>Enter</kbd> keeps the username.
- **"…is not from an authority this computer trusts: ask your IT department"**: the network uses a certificate of its own making, which Takumi cannot add yet (below).

> **Tested in a virtual machine.** Work and school sign-in has been tested in the virtual machine against a simulated network of this kind, not yet at a real school or office.

> **Not yet.** Networks whose IT department gives you a certificate file or an eduroam installer to download, networks that sign in with a certificate of your own instead of a password, and hidden work networks. Takumi cannot join these yet.

## Forget a network

Type `forget` (or `wifi`). Each saved network has a **Forget** row, for example **Forget Old Office**. It asks in place first: press <kbd>Enter</kbd> once to arm it and again to forget the network and its password.

## Turn Wi-Fi off

**Turn Wi-Fi off** is the top row of the list, and the Wi-Fi switch is in Quick settings. **Turn Wi-Fi on** brings it back.

## On the charger

While the computer is plugged in, the Wi-Fi card's power saving is off, so a call or a game does not stutter. On battery it is on again, to save power. There is nothing to choose.

## The Wi-Fi mark

| Mark in the capsule | Means |
|---|---|
| Wi-Fi with 1 to 3 arcs | joined, with that much signal |
| A socket | on a network cable |
| Wi-Fi, struck through | no network |
| Any of these in the accent colour | connected, but a sign-in page or a broken network is in the way |

## When it does not connect

- **"That password did not work"**: check the capitals and the network's name. Wi-Fi passwords are 8 to 63 characters.
- **Not nearby, or no answer in time**: the row says so in words. Move closer to the router and press <kbd>Enter</kbd> to try again; <kbd>Esc</kbd> goes back.
- **"Connected, but no internet"**: the network is there but the internet is not reaching it. Check whether a sign-in page wants you (type `hotel`), or restart the router.
- **"No Wi-Fi on this computer"**: the computer has no Wi-Fi card Takumi can use. Plug in a network cable or a USB Wi-Fi adapter.
- **Anything else**: type `something is wrong` in the Palette. Takumi checks Wi-Fi among other things, fixes what is safe and says what it did.

> **Not yet.** Passwords that start or end with a space do not work. Making a hotspot for other devices, and choosing between several Wi-Fi adapters, are not built.

> **Tested in a virtual machine.** Wi-Fi has been tested in the virtual machine on simulated radios, with home networks (WPA2 and WPA3), open, hidden and work networks and a fake sign-in page. It has not yet run on a real laptop's Wi-Fi card.

## Saved for everyone, or just for you

When an administrator of the computer joins a network, it is saved for everyone, so the computer is also online at the login screen. Anyone else's networks are saved just for them, without a password.

Your Wi-Fi password never appears where other people on the computer could see it, and a password that did not work is never kept.

## From the command line

```bash
takumi wifi list                       # nearby networks; --rescan to look again
takumi wifi join "Corner Café"         # join; asks for the password if needed
takumi wifi join eduroam               # also asks the username and server domain
takumi wifi join --hidden Studio       # a hidden network
takumi wifi forget "Old Office"        # forget a saved network
takumi wifi share                      # the password and a code a phone can scan
takumi wifi signin                     # open a hotel or café sign-in page
takumi switch wifi                     # turn Wi-Fi on or off
```
