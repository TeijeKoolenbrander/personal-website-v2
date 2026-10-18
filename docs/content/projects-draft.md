# Projects: draft copy

Status: DRAFT for owner review. Nothing here has been put into `src/`.
Facts come only from `docs/content/github-projects.md`. Slugs become the file names in `src/content/projects/`.

Order on the site: the schema sorts by `year` (newest first), then `order` ascending. All four are 2026, so `order` decides. I ordered by repo creation date, newest first: WeChat Mini Games (created 2026-10-14), Lucky Dice (2026-10-05), Live Chess Analysis (2026-05-16), CS-UY 6613 (2026-02-09). Note that this puts WeChat Mini Games ahead of Lucky Dice, which is the reverse of the order in the brief. See the questions at the end.

Icons available: window, chip, rings, chart, signal, layers.

---

## 1. `wechat-mini-games.md`

Frontmatter:

```yaml
---
title: "WeChat Mini Games"
type: software
year: 2026
summary: "Three group-chat games for WeChat, built with AI agents"
description: "Three complete social mini games for WeChat: a Three Kingdoms drafting game, a drawing telephone game and a daily scale-guessing game. Built in a studio run by AI agents, with me as founder."
icon: layers
featured: true
order: 1
repo: https://github.com/TeijeKoolenbrander/wechat-mini-programs-codebase
---
```

Character counts: title 17, summary 54, description 190.

Icon choice: `layers`, because it is a collection of several games in one repo.

Body:

```markdown
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
```

---

## 2. `lucky-dice.md`

Frontmatter:

```yaml
---
title: "Lucky Dice"
type: software
year: 2026
summary: "A dice cup for liar's dice, with weighted lucky modes"
description: "A WeChat dice cup for liar's dice with weighted lucky modes. Plain JavaScript with no dependencies, ported from a Mini Program to a Mini Game and tested over 200,000 simulated hands."
icon: rings
featured: true
order: 2
repo: https://github.com/TeijeKoolenbrander/lucky_dice
---
```

Character counts: title 10, summary 53, description 182.

Icon choice: `rings`, the closest to a dice cup or a rolling motion. No icon shows dice, so this is a loose fit.

Body:

```markdown
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
```

---

## 3. `live-chess-analysis.md`

Frontmatter:

```yaml
---
title: "Live Chess Analysis"
type: software
year: 2026
summary: "A local study tool that evaluates Chess.com games"
description: "A Chrome extension and a local Python backend that follow a Chess.com game, run Stockfish on each position and show the evaluation and best move. For study and review. Nothing leaves your machine."
icon: window
featured: true
order: 3
repo: https://github.com/TeijeKoolenbrander/Live-Chess-Analysis
---
```

Character counts: title 19, summary 49, description 196.

Icon choice: `window` (already used on the current file). It suits a browser extension.

Body:

```markdown
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
```

---

## 4. `cs-uy-6613.md`

Frontmatter:

```yaml
---
title: "CS-UY 6613 – Artificial Intelligence"
type: research
year: 2026
summary: "Coursework in computer vision, tracking and retrieval"
description: "Coursework for NYU Tandon's Artificial Intelligence course, Spring 2026: Gaussian covariance analysis, YOLOv8 video detection, a Kalman drone tracker and a RAGFlow architecture analysis."
icon: chart
featured: true
order: 4
repo: https://github.com/TeijeKoolenbrander/CS-UY6613
---
```

Character counts: title 36, summary 53, description 186.

Icon choice: `chart` (already used on the current file). It suits data and ML work.

Body:

```markdown
My assignments for CS-UY 6613 Artificial Intelligence at NYU Tandon, Spring 2026. The repo is built on the course template by the instructor, Pantelis Monogioudis. My work is in the `assignments/` folder.

## What it does

- **Assignment 1.** A notebook on low-rank structure in Gaussian covariances: empirical covariance, eigenvalues and matrix rank.
- **Assignment 2.** A car-parts detector. I fine-tuned YOLOv8n and ran it over a video to build a time-indexed list of detected parts, each with a timestamp, class, box and confidence.
- **Assignment 3.** A drone tracker. A YOLOv8 Nano detector feeds a constant-velocity Kalman filter that smooths the track and bridges 5 to 10 frames of missed detections. The write-up covers where it fails, such as sharp turns while hidden.
- **Assignment 4.** A written architecture analysis of RAGFlow, covering chunking, hybrid retrieval, indexing and memory design.

## How it's built

- Python and Jupyter notebooks, with NumPy, Matplotlib and pandas.
- PyTorch and Ultralytics YOLOv8 with OpenCV for detection.
- filterpy for the Kalman filter.
- The development environment (Docker, dev containers, uv) comes from the course template.
```

---

## Questions for the owner

1. Order: WeChat Mini Games first (newest repo), then Lucky Dice? Or Lucky Dice first, as listed in the brief? It is only the `order` value.
2. Lucky Dice: comfortable describing the third mode as "lets you set the result yourself"? Also, the README says v1.1 and the commits say v1.2. I left the version out.
3. WeChat Mini Games: OK to say "none of the three is released yet"? Update this line when one goes live. Also OK to name Claude Code in the body?
4. The Chinese glosses ("the general-drafting stand", "drawing telephone", "the group dial") and the romanised names are my own renderings. Please check them.
5. CS-UY 6613: confirm NYU Tandon and Spring 2026, and that crediting the instructor by name is fine.
6. Icons: no icon fits dice or games closely. `rings` and `layers` are the nearest. Should the developer add a new icon later?
