---
title: "Live Chess Analysis"
type: software
year: 2026
summary: "A local study tool that evaluates Chess.com games"
description: "A Chrome extension and a local Python backend that follow a Chess.com game, run Stockfish on each position and show the evaluation and best move. For study and review. Nothing leaves your machine."
icon: window
featured: true
order: 2
repo: https://github.com/TeijeKoolenbrander/Live-Chess-Analysis
---

A Chrome extension and a small Python backend that follow a Chess.com game and show what the engine thinks of each position. I made it to study and review games.

It is for analysis and study only. Don't use it to get help during a live game.

## What it does

- Reads the moves from a Chess.com game as they are played.
- Shows the evaluation and the engine's best move in Chrome's side panel, usually within a second or two of each move.
- Saves a PGN of every finished game. The toolbar popup lists the last 10.
- Runs fully on your own machine. Nothing is uploaded.

## How it's built

- A Manifest V3 Chrome extension: a content script, a background service worker, a side panel and a popup.
- A local FastAPI backend replays each game with python-chess and asks Stockfish to evaluate the position at depth 15. Results are cached in memory.
- The backend finds Stockfish from an environment variable, a local folder or the system path. It includes a fix so Stockfish starts correctly on Windows.
- Python packages are managed with uv.
