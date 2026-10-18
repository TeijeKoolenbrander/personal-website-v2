---
title: "Lucky Dice"
type: software
year: 2026
summary: "A dice cup for liar's dice, with weighted lucky modes"
description: "A WeChat dice cup for liar's dice with weighted lucky modes. Plain JavaScript with no dependencies, ported from a Mini Program to a Mini Game and tested over 200,000 simulated hands."
icon: dice
featured: true
order: 1
repo: https://github.com/TeijeKoolenbrander/lucky_dice
---

Lucky Dice (骰盅) is a WeChat Mini Program that replaces the physical dice cup in liar's dice (吹牛 / 大话骰). It is a party app, and the rolls are weighted on purpose.

## What it does

- Tap to shake. Swipe up to look at your five dice and swipe down to hide them.
- **Lucky** mode gives a good hand about 91% of the time. Bad rolls still happen.
- **Insane** mode always gives four or five of a kind, with 1s wild.
- A third mode rolls fairly and lets you set the result yourself, through a hidden tap grid.
- It uses the phone's vibration and sound.

## How it's built

- Plain JavaScript. No dependencies and no build step.
- The roll logic is kept apart from the screens, and every probability and timing sits in one config file.
- The same app also exists as a WeChat Mini Game, drawn on a single canvas. It plays the same, and a test fails if the two copies of the logic drift apart.
- A script prints each mode's distribution over 200,000 simulated hands, so the odds are measured, not guessed.
- A separate build makes every mode visible and explained, so the app could pass WeChat review. It has not been submitted.
