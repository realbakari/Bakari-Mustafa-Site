---
title: The takumi command
permalink: /takumi/docs/commands/
layout: takumi-docs
description: "Every takumi command by group: how the command line is laid out, how each command describes itself, risk tiers and passwords."
---

Everything Takumi can do is a command you can run yourself. You never need to: every command is also a row in the Palette, and the Palette runs the command when you press Enter. But if you like a terminal, or want to script your computer, nothing is hidden from you.

Open a terminal with <kbd>Super</kbd>+<kbd>Return</kbd>.

## How a command is written

A command is two words after `takumi`: a group, then a name.

```bash
takumi wifi join "Corner Café"
takumi theme set ember
takumi audio volume 40
```

Some groups are a command by themselves, such as `takumi update` or `takumi doctor`. `tk` is a shorter name for `takumi`, so `tk wifi list` works too.

## Finding your way

```bash
takumi                     # every group, with what it is for
takumi wifi                # the commands in one group
takumi wifi join --help    # one command: what it does, how to use it, examples, its risk tier
takumi --version           # Takumi's version
```

`-h` works in place of `--help`. `takumi --manifest` prints every command as JSON, which is what the Palette and the assistant read.

## Every command describes itself

The first lines of each command say what it is: one line saying what it does, how to use it, an example or two, and how risky it is. Help comes from those lines, and so does the Palette's row for it, the words that find the row, and what the assistant knows about the command. A command without them is not a command, so the help is never missing or out of date.

A few commands are hidden: they are run by Takumi itself (the login screen, the Core's notices, the password helper) rather than by people. They do not show in the listings or the Palette.

## Risk tiers

Every command declares one of three tiers:

| Tier | Means | In the Palette |
|---|---|---|
| 0 | reversible, only on this computer, no password | runs on Enter |
| 1 | installs software or changes a system service | asks first, in place |
| 2 | touches the system itself, the disk or how the computer starts | asks first, in place |

The assistant follows the same rule: it runs tier 0 on its own and asks once before anything higher ([The assistant](/takumi/docs/intent/)).

## Passwords

A command that changes the system asks for your password. In the Palette it asks in the Core, never in a terminal; at the command line it asks in the terminal. Help says "(needs sudo)" beside the risk tier for these commands, and the group listings mark them "(sudo)". The command asks for it itself: there is no need to type `sudo` in front.

## From the Palette to the command

Every row in the Palette is one of these commands. The row's label is the command's own plain title: **Change your password** is `takumi password`, **Check this computer** is `takumi doctor`, **Go back to the previous system** is `takumi rollback`. Most run as a short conversation in the Core. A few that need a terminal, such as **Collect a debug report**, open one.

The groups and commands below are read from Takumi itself.

{% include takumi-commands.html %}
