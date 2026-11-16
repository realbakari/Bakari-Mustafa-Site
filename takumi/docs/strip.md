---
title: Windows on the strip
permalink: /takumi/docs/strip/
layout: takumi-docs
description: "How windows sit side by side on an endless strip: moving along it, widths, stacking, floating windows, the overview, workspaces, two screens, and the mouse and touchpad."
---

On Takumi, windows never cover one another. Each one opens to the right of the window you are in, on an endless horizontal **strip**, and you slide along the strip to reach the others. Opening a window never shrinks the one you were reading, and nothing hides behind anything else.

Press <kbd>Super</kbd>+<kbd>←</kbd> and <kbd>Super</kbd>+<kbd>→</kbd> to move along the strip, and <kbd>Super</kbd>+<kbd>O</kbd> to see everything at once.

| | Mac | Windows | Takumi |
|---|---|---|---|
| Go to the last window | <kbd>Cmd</kbd>+<kbd>Tab</kbd> | <kbd>Alt</kbd>+<kbd>Tab</kbd> | <kbd>Super</kbd>+<kbd>Tab</kbd> or <kbd>Alt</kbd>+<kbd>Tab</kbd> |
| See every window | Mission Control | Task View | <kbd>Super</kbd>+<kbd>O</kbd> |
| Another desktop | <kbd>Ctrl</kbd>+<kbd>←</kbd> <kbd>→</kbd> | <kbd>Win</kbd>+<kbd>Ctrl</kbd>+<kbd>←</kbd> <kbd>→</kbd> | <kbd>Super</kbd>+<kbd>↑</kbd> <kbd>↓</kbd>, or <kbd>Super</kbd>+<kbd>1</kbd> to <kbd>9</kbd> |
| Fill the screen | the green button | Maximise | <kbd>Super</kbd>+<kbd>M</kbd> |
| Close the window | <kbd>Cmd</kbd>+<kbd>Q</kbd> | <kbd>Alt</kbd>+<kbd>F4</kbd> | <kbd>Super</kbd>+<kbd>Q</kbd> |

The strip is drawn by [niri](https://github.com/YaLTeR/niri), the program that arranges Takumi's windows.

## How the strip works

- Each screen shows its own strip: a row of **columns** that goes on as far as you need.
- A column holds one window, or several stacked one above the other.
- A new window opens to the right of the one you are in, at half the screen's width. Firefox opens at two thirds. Nothing else moves, and nothing overlaps.
- The window you are in is always fully on screen. Its neighbours peek in from the sides when there is room.
- A single window on its own sits in the middle of the screen.
- The capsule at the bottom of the screen shows the strip as small blocks, one per column, as wide as each column is, with yours lit. Click a block to go to that window.

What you never have to do: choose where a window splits, resize a neighbour by accident, or lose a window behind another.

## Move along the strip

| Keys | Does |
|---|---|
| <kbd>Super</kbd>+<kbd>←</kbd> / <kbd>→</kbd> | Goes to the window on the left / right |
| <kbd>Super</kbd>+<kbd>Home</kbd> / <kbd>End</kbd> | Goes to the first / last window on the strip |
| <kbd>Super</kbd>+<kbd>Tab</kbd> | Goes back to the last window you used, on any workspace |
| <kbd>Super</kbd>+<kbd>`</kbd> | Goes to the same app's other window |

<kbd>Super</kbd>+<kbd>Tab</kbd> works like <kbd>Cmd</kbd>+<kbd>Tab</kbd>: tap it once for the last window, or keep holding <kbd>Super</kbd> and press <kbd>Tab</kbd> again to choose among recent ones, with <kbd>Shift</kbd> to go back. <kbd>Alt</kbd>+<kbd>Tab</kbd> does the same, for hands that come from Windows. <kbd>Super</kbd>+<kbd>`</kbd> (the key above <kbd>Tab</kbd>) does it among one app's windows.

You can also type part of a window's title or its app's name in the Palette (<kbd>Super</kbd>+<kbd>Space</kbd>) and press <kbd>Enter</kbd> to go to it.

## Move a window

| Keys | Does |
|---|---|
| <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>←</kbd> / <kbd>→</kbd> | Moves the column left / right along the strip |
| <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>↑</kbd> / <kbd>↓</kbd> | Moves the window up / down in its column, then to the workspace above / below |
| <kbd>Super</kbd>+<kbd>Ctrl</kbd>+<kbd>1</kbd> to <kbd>5</kbd> | Moves the column to workspace 1 to 5 |

Moving to a workspace uses <kbd>Ctrl</kbd> rather than <kbd>Shift</kbd>, because <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>3</kbd>, <kbd>4</kbd> and <kbd>5</kbd> are the screenshot keys.

## Widths

| Keys | Does |
|---|---|
| <kbd>Super</kbd>+<kbd>R</kbd> | Steps the column through a third, half and two thirds of the screen |
| <kbd>Super</kbd>+<kbd>-</kbd> / <kbd>=</kbd> | Makes the column a tenth narrower / wider |
| <kbd>Super</kbd>+<kbd>M</kbd> | Fills the screen's width with the column; again to go back |
| <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd> | Full screen, with nothing else showing |
| <kbd>Super</kbd>+<kbd>Ctrl</kbd>+<kbd>C</kbd> | Centres the column, with its neighbours peeking in |

When a window fills the screen, the Core slides below the edge and gives its space back, and returns when you leave it.

## Stack windows in a column

A column can hold several windows one above the other, for example a chat above a terminal.

| Keys | Does |
|---|---|
| <kbd>Super</kbd>+<kbd>[</kbd> | Takes the window to the right into this column, under the others |
| <kbd>Super</kbd>+<kbd>]</kbd> | Takes the window you are in out of the column, into a column of its own |
| <kbd>Super</kbd>+<kbd>↑</kbd> / <kbd>↓</kbd> | Goes to the window above / below in the column |

Stacking uses the brackets because <kbd>Super</kbd>+<kbd>,</kbd> is the Preferences key in every app ([Keys](/takumi/docs/keys/)).

## Floating windows

Sometimes a window should sit above the strip, like a small calculator or a video.

| Keys | Does |
|---|---|
| <kbd>Super</kbd>+<kbd>Ctrl</kbd>+<kbd>↑</kbd> | Lifts the window off the strip to float above it; again to put it back |
| <kbd>Super</kbd>+<kbd>Ctrl</kbd>+<kbd>↓</kbd> | Moves the keyboard between the floating windows and the strip |

A browser's picture-in-picture video floats by itself in the bottom-right corner, small, without taking the keyboard from what you are doing.

## See everything

<kbd>Super</kbd>+<kbd>O</kbd> opens the **overview**: every workspace and every window, zoomed out, against the Sky. Click a window to go to it, or press <kbd>Super</kbd>+<kbd>O</kbd> again to come back.

## Workspaces

Workspaces are like separate desktops: more strips, stacked one above the other. You might keep work on one and music and chat on another.

| Keys | Does |
|---|---|
| <kbd>Super</kbd>+<kbd>↑</kbd> / <kbd>↓</kbd> | Goes up / down in the column; at its top or bottom, to the workspace above / below |
| <kbd>Super</kbd>+<kbd>1</kbd> to <kbd>9</kbd> | Goes to workspace 1 to 9 |
| <kbd>Super</kbd>+<kbd>Ctrl</kbd>+<kbd>1</kbd> to <kbd>5</kbd> | Moves the column to workspace 1 to 5 |

The capsule numbers the workspace you are on (in the accent colour) and every workspace with windows. Click a number to go there, or turn the mouse wheel over the numbers. A workspace with nothing on it disappears when you leave it, and there is always an empty one below the last.

## Two screens

Each screen has its own strip and its own workspaces, and its own Core.

| Keys | Does |
|---|---|
| <kbd>Super</kbd>+<kbd>Ctrl</kbd>+<kbd>←</kbd> / <kbd>→</kbd> | Goes to the screen on that side |
| <kbd>Super</kbd>+<kbd>Shift</kbd>+<kbd>Ctrl</kbd>+<kbd>←</kbd> / <kbd>→</kbd> | Moves the column to the screen on that side |

To arrange screens, mirror one on a projector, or change their size, see [Displays](/takumi/docs/displays/).

## The mouse and the touchpad

- Moving the pointer onto a window that is already fully on screen gives it the keyboard. It never scrolls the strip by itself, so the pointer passing over a neighbour does not move anything.
- When you change windows with the keys, the pointer comes along to the window you went to.
- <kbd>Super</kbd> and the mouse wheel: up and down go between workspaces; sideways (on a mouse whose wheel tilts) moves along the strip.
- On a touchpad, a three-finger swipe sideways moves along the strip.
- Click a block in the capsule to go to that column, or a workspace number to go to that workspace.

The touchpad taps to click, scrolls the way the page moves (as on a Mac or a Windows laptop), ignores your palm while you type, and clicks with two fingers for the right button and three for the middle. To change natural scrolling, tap to click or the pointer's speed, see [Keys](/takumi/docs/keys/#the-pointer-and-the-touchpad).

## Close windows

<kbd>Super</kbd>+<kbd>Q</kbd> closes the window you are in. To clear the desk, type `close all` in the Palette and choose **Close all windows**: it says how many first, then asks each window to close as its own close button would. An app with unsaved work asks about it in its own window and stays open.

An app that has stopped answering: <kbd>Super</kbd>+<kbd>Alt</kbd>+<kbd>Esc</kbd> lists the apps with windows, each with **Force quit** and **Restart**.

## Your own changes

Takumi's window settings are in `~/.config/niri/takumi/defaults.kdl`. Changes of your own go in `~/.config/niri/takumi/overrides.kdl`, which starts empty, is read last (so it wins), and is never overwritten. The format is niri's own, described in [niri's documentation](https://github.com/YaLTeR/niri/wiki). The colours of the focus ring and shadows come from your theme.

> **Good to know.** In a virtual machine without 3D graphics, every <kbd>Super</kbd> key on this page uses <kbd>Alt</kbd> instead, and windows do not animate.

## From the command line

```bash
takumi app quit Spotify            # force a stuck app to quit
takumi app quit firefox --restart  # quit it and open it again
takumi app close-all               # close every window, asking first
takumi settings reset              # put Takumi's settings back; overrides.kdl is kept
```
