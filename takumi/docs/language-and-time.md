---
title: Language, time and Today
permalink: /takumi/docs/language-and-time/
layout: takumi-docs
description: "Choosing the language your apps speak and how dates are written, typing other scripts, the time zone and clock, clocks for other cities, reminders, timers, the weather in Today and dictation."
---

Language, the clock and the small things around them all live in the Palette. Press <kbd>Super</kbd>+<kbd>Space</kbd> and type `language`, `time`, a city's name, `remind`, `timer` or `weather`. Click the time in the capsule to open Today: the month, with your other clocks, the weather and what is coming up beside it.

| | Mac | Windows | Takumi |
|---|---|---|---|
| Language and region | System Settings, General, Language & Region | Settings, Time & language | `language` and `formats` in the Palette |
| Time zone | Date & Time | Date & time | `zone` in the Palette |
| Clocks for other cities | the World Clock widget | extra clocks on the taskbar clock | a city's name in the Palette, Enter adds it to Today |
| Reminders and timers | Reminders, Clock | Clock app | `remind me in 10 min to stretch`, `timer 10 tea` |
| Typing by voice | Dictation | `Win+H` | <kbd>Super</kbd>+<kbd>H</kbd> |

## The language your apps speak

Type `language`. The first rows show the language in use and how dates and numbers are written, then the languages most people choose. A language's name finds it in English or in its own words: `german`, `deutsch`, `日本語`. Twenty-one are listed to start with, and every other language the computer can speak is a name away.

1. <kbd>Enter</kbd> on a language. If a name fits several ("Portuguese"), the Core asks which: type more, like a country.
2. The Core asks for your password once.
3. Takumi gets the language ready and, when Firefox and LibreOffice are installed, their language packs too.
4. The Core says your apps speak the new language from your next login. Log out and in again.

The language belongs to the computer, so the login screen and every account on it follow. Without the internet, the language still changes, and Firefox and LibreOffice follow once the computer is online again.

> **Not yet.** Takumi's own words (the Core, the lock screen, the setup screens and what the commands say) stay in English for now. Apps from Flathub keep the languages they were installed with for a while. Spelling dictionaries for other languages and a language for one account only are not built.

## Dates, numbers and paper

Dates, times, numbers, money, paper size and units change together, and can be set apart from the language: English menus with dates written as in Germany, for example. The **Formats** row shows how the last day of 2026, a number and the paper size would be written: "12/31/2026 · 1,234.56 · Letter paper".

Type `formats` and a country (`formats germany`), then <kbd>Enter</kbd> on **Formats: Germany**. Choosing a new language later keeps the formats you set apart. While they are set apart, a row **Formats like the language** puts them back.

## Typing other languages

Keyboards are in the Palette under `keyboard`. **Keyboards: English (US)** shows the ones you have; <kbd>Enter</kbd> asks which to add, by language or country (`French`). With more than one keyboard, a keyboard mark appears in the capsule; click it to move to the next. The computer keeps up to four keyboards and always at least one. The first one is the keyboard you type your password with when the computer starts and at the login screen, so removing it asks first.

Japanese, Korean and Chinese need an input method: a small program that turns what you type into the language's characters. Type `japanese`, `korean`, `chinese`, `pinyin` or `input`:

| Row | Switch with |
|---|---|
| **Type Japanese** | <kbd>Ctrl</kbd>+<kbd>Space</kbd>, or 半角/全角 on a Japanese keyboard |
| **Type Korean** | <kbd>Ctrl</kbd>+<kbd>Space</kbd>, or 한/영 on a Korean keyboard |
| **Type Chinese with Pinyin** | <kbd>Ctrl</kbd>+<kbd>Space</kbd> |
| **Type Chinese with Zhuyin (Bopomofo)** | <kbd>Ctrl</kbd>+<kbd>Space</kbd> |
| **Type Chinese with Cangjie** | <kbd>Ctrl</kbd>+<kbd>Space</kbd> |

<kbd>Enter</kbd> installs it with one password and starts it. <kbd>Ctrl</kbd>+<kbd>Space</kbd> then switches between your keyboard and the input method in every app at once, as on a Mac. <kbd>Super</kbd>+<kbd>Space</kbd> stays the Palette. To take one away, type `keyboard` and choose **Stop typing Japanese**.

> **Not yet.** There is no key yet for the next keyboard (use the mark in the capsule). Apps such as VS Code and Slack may not reach the input method. Vietnamese, Thai and the scripts of India have no input method yet.

## The time zone and the clock

Type `time`, `clock` or `zone`. The first row shows the time zone and the time: **Time zone: Lisbon**. <kbd>Enter</kbd> asks "Which city?". You can answer with a city (`São Paulo`), a country with one time zone (`Japan`) or a zone's own name (`Europe/Lisbon`). A town Takumi does not know by itself is looked up on [Open-Meteo](https://open-meteo.com)'s place search. A country with several time zones asks again with a city: "Brazil has several time zones: try Manaus or Sao Paulo".

When you travel, `zone tokyo` (or `travel tokyo`) shows **Set the time zone to Tokyo** with the time the clock would show.

### Set the time zone by location

The row **Set the time zone by location** is off until you turn it on, and asks first. When it is on, each time the computer joins a network it asks one service, [ipinfo.io](https://ipinfo.io), which time zone your internet address is in. ipinfo.io sees your internet address, as every website does; nothing else is sent. It never asks more than once every five minutes, and never while a VPN is on, because the answer would be the VPN's country. When the zone changes, a notice says so: "You're in Lisbon · clock set to 14:05".

### 12-hour or 24-hour

The row **Use the 12-hour clock** (or the 24-hour one) switches the format. Without a choice, the clock follows your language: US English reads the 12-hour clock.

> **Not yet.** Today follows the 12-hour clock, but the time in the capsule and on the lock screen still show the 24-hour clock.

## Clocks for other cities

Type a city or a country: `tokyo`. The row shows its time and how far ahead or behind it is: "Tokyo 23:05 · Japan · +9 h". <kbd>Enter</kbd> adds it to Today. Today shows three at most, under the date, with "+1" when it is already tomorrow there. To take one out, type `clock` and press <kbd>Enter</kbd> on its row.

## Reminders

Type the reminder as you would say it, in either order:

- `remind me in 10 min to stretch`
- `remind me at 15:00 to call Ana`
- `remind me tomorrow 9:00 dentist`
- `remind me to water the plants on friday`

The row repeats it back (**Remind me in 10 min: stretch**) and <kbd>Enter</kbd> sets it. If you leave out the time ("remind me to call the bank"), <kbd>Enter</kbd> asks when.

Takumi understands "in 10 min", "in an hour", "half an hour", "at 15:00", "3pm", "noon", "today", "tonight", "tomorrow" and the days of the week. A bare hour means the next time the clock shows it: at 10:00, "at 3" is 15:00. After a day, an hour from 1 to 7 is the afternoon: "tomorrow at 3" is 15:00.

When the moment comes, the Core says it, even with do not disturb on (you asked for it), and Today keeps it under Earlier. Press the notice within the minute for **Again in 10 min**. A reminder rings on time even if the computer was asleep. If the computer was off, the reminders you missed in the last 12 hours ring when you next log in.

Type `remind` to see what is coming. <kbd>Enter</kbd> on one cancels it, asking first.

> **Not yet.** Reminders that repeat ("every Monday").

## Timers

Type `timer 10 tea` or `25 min timer`. The row says when it will ring; <kbd>Enter</kbd> starts it. A number on its own is minutes. Running timers count down by the second in Today, under the month, and a mark shows in the capsule. When it is done, the Core says so with an alarm sound. Type `timer` to see running timers; <kbd>Enter</kbd> on one stops it.

## The weather

The weather is off until you turn it on, because turning it on means asking a service on the internet. Type `weather` and choose **Show the weather in Today**. Today then shows the place, the temperature, what the sky is doing and what comes later, beside the day's name: "Lisbon 19° · light rain · 24° later". "Rain later" means it is dry now but rain is likely within six hours.

The weather comes from [Open-Meteo](https://open-meteo.com), which needs no account. Takumi asks it at most every 30 minutes, and only while Today or the Palette is open. It is for the city the clock is set to, unless you choose another place: type `weather` and press <kbd>Enter</kbd> on the weather row. Degrees are Celsius, or Fahrenheit where your language uses them.

Without turning it on, **Weather in Lisbon now** asks once. `weather tokyo` asks about another place once and keeps nothing. **Hide the weather in Today** turns it off; Open-Meteo is not asked again.

## Dictation

Press <kbd>Super</kbd>+<kbd>H</kbd> (the key Windows uses for typing by voice), speak, and press it again. What you said is typed where you were, in any app. You can also type `dictate` in the Palette.

While it listens, the Core says "Listening…" with a level that moves as you speak, and the microphone's mark shows. After the second press it says "Writing it down…", then types the words. If it heard only a quiet room, nothing is typed and the Core says "Nothing heard". Dictation left running stops by itself after five minutes and types what it heard.

### The first time

The first press opens the Core on **Set up dictation**. It asks once, with the size, before downloading the speech model: for example "Download the speech model, 574 MB? It stays on this computer, and so does your voice." The model is chosen by how much memory the computer has (149 MB, 489 MB or 574 MB). If the download stops, the next try carries on from where it stopped.

### Your voice stays on the computer

The recording is held in memory, written down on this computer, and deleted at once. No text is kept. The only download is the speech model, once, and it is checked before it is used. The model finds the language you speak from your first words.

> **Not yet.** Holding the key down to talk, words appearing while you speak, spoken punctuation ("new line") and choosing the language in the Core. Dictation does not work on Arm computers, because the program it uses is not packaged for them. So far it is tested only against simulated tools.

## When something does not work

- **An app did not change language.** Apps read the language when they start. Log out and in again.
- **The clock is an hour out.** Check the time zone: type `zone`.
- **A reminder did not ring after a restart.** Reminders missed in the last 12 hours ring at your next login; older ones are dropped.
- **The weather line is gone.** A forecast older than three hours is not shown. It comes back once the computer is online and Today is open.
- **Dictation typed nothing.** It may have heard only a quiet room, or the press was shorter than half a second. Check which microphone is in use under `microphone` ([Sound](/takumi/docs/sound/)).

## From the command line

```bash
takumi language list portuguese        # every language, by name
takumi language set pt-BR              # the language, from your next login
takumi language formats de_DE.UTF-8    # dates, numbers and paper apart from it
takumi keys layout add fr azerty       # another keyboard
takumi keys input add japanese         # an input method
takumi clock                           # the time here and in your cities
takumi clock Tokyo                     # the time in one place
takumi clock zone Lisbon               # set the time zone
takumi clock auto on                   # the time zone by location
takumi clock format 12h                # or 24h
takumi clock add Tokyo                 # a clock in Today
takumi clock remove Tokyo
takumi remind in 10 min stretch        # a reminder
takumi remind tomorrow 9:00 dentist
takumi remind list                     # what is coming, with numbers
takumi remind cancel 3
takumi timer 25 min tea                # a timer
takumi timer stop                      # stop every running timer
takumi weather                         # the weather here
takumi weather Lisbon                  # once, somewhere else
takumi weather on                      # show it in Today; "off" to stop
takumi weather place Porto             # or "here"
takumi voice                           # start dictating; again to stop
takumi voice cancel                    # stop and type nothing
takumi voice setup small               # choose another speech model
```
