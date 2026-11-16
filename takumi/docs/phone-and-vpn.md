---
title: Your phone and VPNs
permalink: /takumi/docs/phone-and-vpn/
layout: takumi-docs
description: "Pair your phone with KDE Connect to see its notifications, ring it and send it files, and connect to a work VPN, a VPN provider or Tailscale."
---

Your phone can join the Core: its notifications show on the computer, files and what you copied go across, and the computer can make it ring when you cannot find it. This works through [KDE Connect](https://kdeconnect.kde.org/), a free app for the phone, over your own Wi-Fi with nothing in between.

VPNs (from work, the one you pay for, or [Tailscale](https://tailscale.com/)) are rows in the Palette too. Press <kbd>Super</kbd>+<kbd>Space</kbd> and type `phone` or `vpn`.

| | Mac | Windows | Takumi |
|---|---|---|---|
| Phone on the computer | iPhone Continuity | Phone Link | **Connect your phone** (KDE Connect) |
| Find my phone | Find My | Phone Link | **Find my phone** |
| Add a VPN | Network, VPN | Network & internet, VPN | **Import a VPN…** |
| Connect to a VPN | the menu bar | Quick Settings, VPN | `vpn` in the Palette, Enter on it |

## Pair your phone

First, get KDE Connect on the phone: from Google Play or F-Droid on Android, or from the App Store on an iPhone. Open it, on the same Wi-Fi as the computer.

Then type `phone` and press Enter on **Connect your phone**:

1. The first time, Takumi installs KDE Connect on the computer. The Core asks for your password. From then on it starts with every login.
2. If the firewall is on, the Core asks to let KDE Connect through it.
3. "Open KDE Connect on your phone, on the same Wi-Fi as this computer." The phone shows up within seconds. With two phones nearby, the Core asks which.
4. The Core asks, for example, **"Does Pixel 8 show 1A2B3C4D? Tap Accept there"**. Both screens show the same code, so you know it is your phone and not someone else's. Tap Accept on the phone.

If the phone asks first, the Core says "Pixel 8 asks to pair. Does it show 1A2B3C4D?" If the codes differ, or you press Esc, nothing is paired.

## Use your phone

Once paired, type `phone` for its rows:

| The row | Does |
|---|---|
| Pixel 8 · Connected · battery 82%, charging | shows how the phone is |
| **Find my phone** | the phone rings loudly, even on silent, until you stop it on the phone |
| **Send to Pixel 8** · The 2 files you copied | sends the files you copied in Files |
| **Send the clipboard to Pixel 8** | what you copied, ready to paste on the phone |
| Pixel 8 is not connected | open KDE Connect on it, on the same Wi-Fi |
| **Forget Pixel 8** | asks first; it needs pairing again to connect |

In Files, you can also right-click files and choose **Scripts › Send to phone**.

The phone's notifications show in the Core as they arrive, like any app's, and wait in Earlier. Files the phone sends land in Downloads, and the Core says so.

### Android and iPhone

On Android, allow KDE Connect to read notifications when it asks, or they stay on the phone.

On an iPhone, KDE Connect sends files and the clipboard, but notifications stay on the phone, because iOS does not let an app read other apps' notifications. An iPhone answers **Find my phone** only while KDE Connect is open on it.

> **Not yet.** Texts and calls from the phone. KDE Connect can pass them; the Core does not show them yet. KDE Connect's own settings (which features run, sharing the clipboard every time you copy) are in its own app, KDE Connect.

To send files to phones and computers that are not paired with yours, including a friend's, use **Send to…** with LocalSend: see [Backups and sharing](/takumi/docs/backups/).

## VPNs

A VPN (virtual private network) carries your internet through another computer: your workplace's, so you can reach its systems from home, or a VPN provider's. Type `vpn`:

| The row | Enter |
|---|---|
| VPN Work · Connect | connects; asks for the password when it needs one |
| VPN Work · Connected · Enter to disconnect | disconnects |
| **Import a VPN…** | a file chooser, then what the VPN needs |
| **Set up Tailscale** | asks, installs it, then signs in |

The connected VPN comes first, then the most recently used. Three letters of a VPN's name find it. The rows update while they are on show, so "Connecting" turns into "Connected" in place.

### Add a VPN

Your workplace or VPN provider gives you a file: a WireGuard file ending in `.conf`, or an OpenVPN file ending in `.ovpn`. Choose **Import a VPN…** and pick the file.

1. An OpenVPN file made for a username and password asks for both: "Username for VPN Work", then "Password for VPN Work".
2. "Connect to VPN Work now?" Enter connects. Esc leaves it ready: "Added VPN Work. Type vpn to connect".

A VPN never connects by itself; you choose when. A name already taken gets a number ("Work 2").

### Connect and disconnect

Enter on **VPN Work · Connect**. If the password is wrong, the field shakes and asks again: "Username, or Enter to keep ada", then the password. Enter on a connected VPN disconnects it.

Your password is kept with the VPN, readable only by the system, and never passed on a command line.

### Forget a VPN

Type `forget` with `vpn`, and choose **Forget VPN Work**. It asks, then removes the VPN, its password and the certificates its file came with.

## Tailscale

[Tailscale](https://tailscale.com/) links this computer with your other devices, wherever they are, as if they were on one home network (Tailscale calls that your tailnet). You need a Tailscale account.

1. **Set up Tailscale** asks: "Tailscale links this computer with your other devices, wherever they are. Install it?" Then, with your password once, it installs Tailscale and starts it with the computer. After that, connecting, disconnecting and exit nodes need no password.
2. Signing in ends on a card: "Sign in to Tailscale", with a code your phone's camera can open the sign-in page from. The page also opens in your browser. Sign in there.
3. A notice says "Tailscale is on" when this computer has joined.

The Tailscale row then reads **Connected as laptop · Enter to disconnect**.

### Exit nodes

An exit node is one of your devices (or a provider such as Mullvad, through Tailscale) that your internet goes out through. Type `tailscale` or `exit` for the exit nodes your tailnet offers that are online, the one in use first. Mullvad's show as their city, such as **New York, NY, USA**.

Enter on one sends your internet through it, and printers, speakers and other devices on your home network keep working. Enter on the one in use stops it.

## When it does not work

- **The phone does not show up.** Open KDE Connect on the phone, and check the phone and the computer are on the same Wi-Fi. Guest and some office networks keep devices apart.
- **"Pixel 8 is not connected".** Open KDE Connect on it, on the same Wi-Fi.
- **The VPN says Takumi cannot answer what it asks.** Some OpenVPN setups ask for a one-time code or a key's own password. Those are not supported yet.
- **The username or password did not work.** The Core asks again. If it keeps failing, check with whoever gave you the file.

> **Not yet.** VPNs that come as settings rather than a file (such as Cisco AnyConnect and GlobalProtect), OpenVPN with one-time codes, Tailscale's file sending (Taildrop) and a list of your Tailscale devices, and a mark in the resting Core that a VPN is on.

> **Tested in a virtual machine.** Pairing a phone has been tested with real KDE Connect in a virtual machine and against stand-ins. VPNs and Tailscale have been tested against stand-ins only, not with a real VPN or a real Tailscale account.

## From the command line

```bash
takumi phone pair                       # pair, checking the code on both screens
takumi phone ring                       # find my phone
takumi phone send ~/Documents/ticket.pdf
takumi phone clipboard                  # what you copied, to the phone
takumi phone status                     # paired phones, connected, battery
takumi phone forget

takumi vpn list                         # your VPNs and Tailscale
takumi vpn import ~/Downloads/work.ovpn
takumi vpn on Work
takumi vpn off Work
takumi vpn forget "Old Work"
takumi vpn tailscale                    # set up, sign in, connect
takumi vpn tailscale off
takumi vpn tailscale exit nyc-1         # or exit off
```

With more than one phone paired, `ring`, `send`, `clipboard` and `forget` take `--to` and the phone's name.
