---
title: "WeChat Mini Games"
type: software
year: 2026
summary: "Three group-chat games for WeChat, built with AI agents"
description: "Three complete social mini games for WeChat: a Three Kingdoms drafting game, a drawing telephone game and a daily scale-guessing game. Built in a studio run by AI agents, with me as founder."
icon: gamepad
featured: true
order: 4
repo: https://github.com/TeijeKoolenbrander/wechat-mini-programs-codebase
---

A set of social mini games for WeChat, made to be played in group chats. Three are finished and tested. I built them in a studio where AI agents do the work and I make the product calls.

## What it does

- **点将台 (Dianjiangtai, "the general-drafting stand").** A Three Kingdoms strategy game. You draft five generals into set roles, then watch your army fight twelve graded battles. There is a daily order that is the same for everyone.
- **传画接龙 (Chuanhua Jielong, "drawing telephone").** Players take turns drawing and guessing along a chain, and the garbled result is revealed at the end. It plays live with 3 to 10 people, or slowly over several days.
- **群友刻度盘 (Qunyou Kedupan, "the group dial").** A daily guessing game. You place a needle on a scale, such as cold to hot or cheap to expensive, then compare your answer with the country and with your group chat.
- None of the three is released yet.

## How it's built

- The games are canvas mini games, with WeChat Cloud Development cloud functions behind them for rooms, leaderboards and moderation.
- Each game has large automated test suites. 传画接龙 alone has 542 game tests and 402 cloud-function tests.
- The studio is run by Claude Code, which plans the work and hands tasks to specialist subagents for research, design, development, QA and release.
- I act as founder. I choose what to build, write the specs, review QA and decide on releases. Credentials, spending, legal filings and merges to the main branch stay with me.
