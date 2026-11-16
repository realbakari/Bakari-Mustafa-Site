---
title: The assistant (Intent)
permalink: /takumi/docs/intent/
layout: takumi-docs
description: "Intent, Takumi's assistant: choosing Claude or OpenAI, what it may do on its own, what it asks first, and what is written down."
---

Intent is Takumi's assistant. You type a sentence in the Palette, such as "turn off bluetooth and dim the screen to 30", and it does the work with Takumi's own commands: the same ones behind every row in the Palette. It has no terminal, no access to your files and no web browsing. Anything more than a small, reversible change waits until you say yes, once, with every step named.

Intent needs a model to think with: Claude, through Claude Code and your Claude account or through an Anthropic API key, or OpenAI's GPT, through an OpenAI API key. Nothing is sent anywhere until you choose one, and you never have to.

> **Not yet.** Intent has been tested against simulated services only. It has not yet been used with a real Claude or OpenAI account.

## Set it up

Press <kbd>Super</kbd>+<kbd>Space</kbd> and type `assistant`. Three rows appear, and the one in use says "In use":

| Row | Uses |
|---|---|
| **Use Claude for the assistant** | Claude Code, signed in with your Claude account, so a Claude subscription works without a key |
| **Use an Anthropic API key for the assistant** | Claude, paid for by your Anthropic API key |
| **Use OpenAI for the assistant** | GPT, paid for by your OpenAI API key |

Each one is a conversation in the Core. During your first week, the empty Palette also shows **Set up the assistant**, which leads to the same rows.

### With your Claude account

If Claude Code is not on the computer, the Core asks "Install it from Anthropic?" and runs Anthropic's own installer, which needs no password. If Claude Code is not signed in, one question offers to sign in: a terminal window opens and your browser does the rest. This is the only time a terminal appears.

### With an API key

The Core asks for the key as a secret, so it is not shown as you type. Takumi checks it by asking the service which models it can use, which costs nothing. A key that does not work shakes the field and is asked for again. With OpenAI, Takumi picks the newest general GPT model your key can use.

Keys are kept in the login keyring, the same locked store apps use for their passwords ([Security](/takumi/docs/security/)). A key never appears in a log or in the transcript.

## Ask it something

Type a sentence with a space in it. A row appears at the bottom of the Palette: your sentence, with "Ask Intent" under it.

After three words and a short pause, a **Will run** line above the field shows the exact commands Intent would run first, before you press anything. Then press Enter on **Ask Intent**, or press Enter when nothing else matches.

What happens next, in the Core:

1. The row says "Thinking…", then names each command as it starts.
2. Small, reversible commands run at once, and Intent reads what they say. If one of them needs to ask you something, it asks you, right there: "Keep this?" after the screen changes, or a Wi-Fi password. Your answer goes to the command, never to the model.
3. If Intent wants anything riskier, it waits until it is done thinking, then asks one question that names every command: "Run takumi install docker, then takumi power restart?" Enter runs them in that order. Esc runs none.
4. The Core closes with a sentence or two saying what happened: "Bluetooth is off. Installed Docker; it works for you after you log out and back in."

If something goes wrong, the row says so in words: the assistant is not set up, the key was refused, there is no internet, or the model declined.

## What it may do without asking

Every Takumi command declares how risky it is, on a scale of three, and the Palette uses the same scale to decide whether a row runs on Enter or asks first. Intent follows the same rule.

| Tier | Means | For example | Intent |
|---|---|---|---|
| 0 | reversible, only on this computer, no password | changing the theme, turning Bluetooth off, the volume | runs it at once |
| 1 | installs software or changes a system service; needs your password | installing Docker, turning Harmony keys off | asks first, once |
| 2 | touches the system itself, the disk or how the computer starts | updating, going back to an earlier system, deleting old ones | asks first, once |

A tier 1 or 2 command never runs while the model is still working. It is set aside, and all of them are put to you in one question at the end. If you say yes and one of them fails, the rest do not run. When a command needs your password, the Core asks for it as it always does: the model never sees it.

Some commands are never available to Intent at all: the ones that show a Wi-Fi password or a recovery code, since those are meant for your eyes only.

## What the model sees

The model sees your sentence, the list of Takumi's commands, and what the tier 0 commands it ran printed (colours removed, at most 4 KB each). It does not see your files, your clipboard or anything you typed elsewhere, unless one of those commands shows them.

Each request starts fresh: Intent remembers nothing from one request to the next. It goes back and forth with the model eight times at most.

## What is written down

Every request leaves a record in a file on your computer that you own:

```
~/.local/state/takumi/intent/transcript.jsonl
```

One line per event, each with the time: what you asked, which service and model answered, each command that ran and whether it worked, what you were asked and what you answered, and the last words, or why it stopped. Never a key, and never what a command printed. Showing the plan writes nothing. (`~` is your home folder.)

## Turn it off

Until you choose a service, Intent sends nothing: a sentence in the Palette only says the assistant is not set up.

Once it is set up, each **Will run** preview asks the model while you type. To stop that, and send only when you press Enter, add this line to `~/.config/takumi/shell.toml`:

```
intent_preview = false
```

To stop using the assistant altogether, delete `~/.config/takumi/intent.toml`, the file that holds your choice. Intent then counts as not set up again.

> **Not yet.** There is no row in the Palette to turn the assistant off or to forget a saved key. Removing the file above stops it; a saved key stays in the login keyring.

## Other agents

Coding agents such as Claude Code can reach Takumi's commands too, under the same rule: tier 0 runs, anything riskier is refused with the exact command that would need your approval, so the agent can show it to you.

Choosing Claude for the assistant also teaches a Claude Code session you open yourself to change the computer through `takumi` commands, to ask before anything risky, and to leave system files alone.

## When it does not work

- **"The assistant is not set up".** Type `assistant` in the Palette and choose a service.
- **The key or the sign-in was refused.** Press Enter on the row you chose again: it asks for a new key, or offers to sign in to Claude Code again.
- **No internet.** Intent needs one. The rest of the Palette does not.
- **The model declined.** It would not do what was asked. Try asking for one thing at a time, or use the Palette's own rows.
- **A command asks a question and nothing answers.** That happens only outside the Core, at the command line or in another agent: a screen change then undoes itself, as it does when nobody presses Keep.
- **With Claude Code, the question about risky commands comes late.** It waits until Claude Code has finished.

## From the command line

```bash
takumi intent 'turn off bluetooth and dim the screen to 30'   # ask; the same as takumi intent ask
takumi intent --plan 'dim the screen to 30'                   # only print the commands it would run first
takumi intent setup claude                                    # set it up: claude, anthropic or openai
takumi intent model                                           # the model in use
takumi intent model default                                   # back to the service's own model
takumi mcp serve                                              # Takumi's commands as tools for other agents
```

`takumi intent model` also takes a model's name, to choose another one.

`takumi mcp serve` speaks the [Model Context Protocol](https://modelcontextprotocol.io/specification) on standard input and output. For a client that reads this form, such as [Claude Code](https://code.claude.com/docs/en/cli-reference):

```json
{"mcpServers": {"takumi": {"command": "takumi", "args": ["mcp", "serve"]}}}
```

Tier 0 commands run and their output is the result. Tier 1 and 2 commands answer "needs the person's approval" with the exact `takumi` line, and run nothing. What the server ran or was asked for goes in the same transcript.
