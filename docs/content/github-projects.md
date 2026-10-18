# GitHub projects: research notes

Source: public GitHub REST API (no auth) and raw.githubusercontent.com, read on 2026-10-18.
User: [TeijeKoolenbrander](https://github.com/TeijeKoolenbrander). The account has **6 public repos**. None are GitHub forks, none have topics set, and none have a license.

Language percentages come from GitHub's `/languages` endpoint, which counts bytes of code.

---

## 1. lucky_dice

| Field | Value |
|---|---|
| Name / URL | `lucky_dice`: https://github.com/TeijeKoolenbrander/lucky_dice |
| Description | A "lucky" version of the chinese game 骰子 |
| Topics | none |
| Languages | JavaScript 100% |
| Created / last pushed | 2026-10-05 / 2026-10-14 (7 commits, all in October 2026) |
| Year to display | **2026** (creation year, and all work happened then) |
| Fork | No |
| License | None |
| Homepage | None |
| Hardware | No (phone software; uses phone vibration/haptics) |
| Suggested type | Software |

**Summary.** 骰盅 is a WeChat Mini Program that replaces the physical dice cup in the bar dice game 吹牛 / 大话骰 (liar's dice). You tap 摇 to shake, swipe up to look at your five dice and swipe down to hide them. The README says plainly that "the rolls are rigged". It has three modes, each opened from a different spot on the launch screen:
- **Lucky** (PLAY button): a good hand about 91% of the time, but bad rolls still happen.
- **Insane** (tap the title): always four or five of a kind, with 1s wild.
- **Cheat** (help link): a fair roll that you can secretly override. Long-press 摇 to arm it (double vibration), then tap a hidden 3x2 grid to pick the quantity and the face.

The repo contains three builds:
- `mini-program/`: the WeChat Mini Program (WXML pages `home` and `cup`). Roll logic lives in `core/` with no `wx.*` calls, and all tunable probabilities and timings live in `core/config.js`.
- `mini-game/`: the same app rebuilt as a WeChat Mini Game (小游戏). It is a single canvas with no WXML, and plays identically. `core/` is a copy, and a test fails if the two copies drift.
- `public/`: a separate copy meant to pass WeChat review. Per `public/CHANGES.txt`, every mode stays but becomes visible and explained, with nothing reachable only through a secret tap. The modes are renamed in the code (`lucky`, `crazy`, `controlled`), and the build adds help, modes and storage screens. Still open there: licensing (软著 / 版号), the name, the AppID, the privacy guide and submission.

**Notable tech.** WeChat Mini Program and Mini Game platforms, plain JavaScript with no dependencies and no build step, the Canvas render loop (mini game), `node:test` test suites, a stats tool (`npm run stats`) that prints each mode's distribution over 200k hands, and haptics and sounds.

**Write-up facts**
- A dice-cup app for liar's dice (吹牛 / 大话骰), built on WeChat's Mini Program platform.
- Three weighted roll modes: Lucky (good hand about 91% of the time), Insane (always 4 or 5 of a kind) and Cheat (secret manual override through a hidden 3x2 tap grid).
- Ported from a Mini Program (WXML pages) to a Mini Game (a single canvas with its own render loop and touch routing), with identical gameplay.
- Pure roll logic is kept apart from the UI, and the probabilities are checked statistically over 200,000 simulated hands.
- No dependencies and no build step. The test suite includes a smoke test that drives the game through a fake `wx` object.
- A third "public" build reworks the hidden modes into visible, explained modes so the app could pass WeChat review.

**To confirm**
- The README calls this a *private* app. Does the owner want it shown publicly, given that "rigged rolls / cheat mode" is the hook?
- Has any build been released (体验版 only, or live)? The repo shows no evidence that it was published.
- The README header says v1.1, but the commits mention v1.2. Which version should be shown?
- The same app also lives in `wechat-mini-programs-codebase` as `apps/cheatshaizi`. Show it as one project or two?

---

## 2. personal-website

| Field | Value |
|---|---|
| Name / URL | `personal-website`: https://github.com/TeijeKoolenbrander/personal-website |
| Description | Personal website |
| Topics | none |
| Languages | PowerShell 58.1%, TypeScript 37.8%, CSS 2.5%, MDX 0.9%, JavaScript 0.7% |
| Created / last pushed | 2026-07-09 / 2026-07-09 (3 commits: "000 foundation", "001 content model data layer", "002 footer") |
| Year to display | **2026** |
| Fork | No |
| License | None |
| Homepage | https://personal-website-teijekool-7750s-projects.vercel.app. **Not publicly viewable:** it redirects to Vercel SSO login (deployment protection is on). |
| Hardware | No |
| Suggested type | Software |
| README | None |

**Summary.** An early-stage personal site built with Next.js and TypeScript. It is a personal hub that presents Teije as a computer engineer and developer. `planning/SPEC.md` (draft v3, 2026-07-08) defines these routes: Home, About, Portfolio, Diary (blog, with MDX posts), Now, Links and Contact. It also sets a black-and-white design with a single blue accent and Times New Roman. The repo was built spec-first with GitHub Spec Kit (`.specify/`, `specs/000-...` to `specs/007-...`, `planning/features/000-011`). Only features 000 to 002 were committed: the foundation and design system, the content model and data layer, and the global nav and footer. Content is typed data in `content/*.ts` (site config, projects, links), validated with Zod schemas, and checked by a `content:check` script before every build. There is a sample diary post (lorem ipsum) and a `now.mdx`.

The PowerShell percentage comes from Spec Kit's helper scripts in `.specify/scripts/powershell`, not from site code.

**Notable tech.** Next.js 15 (App Router), React 19, TypeScript 5, Tailwind CSS 4, next-mdx-remote, gray-matter, Zod 4, next-themes (dark mode toggle), ESLint 9, tsx, Vercel hosting and GitHub Spec Kit (spec-driven development).

**Write-up facts**
- A personal site built with Next.js 15, React 19, TypeScript and Tailwind CSS 4, deployed on Vercel.
- Built spec-first with GitHub Spec Kit: each feature has a spec, plan, research, data model and task list before any code.
- Typed content layer: projects, links and site identity are TypeScript data validated by Zod schemas, with a pre-build content check.
- MDX-powered "diary" blog and a "Now" page, plus a light/dark theme toggle.
- Only 3 of 12 planned features were committed. It is an early-stage repo.

**To confirm**
- This repo is **Next.js**. The site in `C:\Users\teije\website` (the current project) is **Astro**. Is the GitHub repo an earlier attempt that this site replaces, or should it point to the new site's repo? This decides which repo URL and which tech to list.
- The Vercel URL sits behind SSO, so visitors can't open it. Don't link it as a live demo unless that changes.
- The repo's `content/projects.ts` describes Live Chess Analysis as "TypeScript, React". That is wrong: the repo is JavaScript (Chrome extension) plus Python (FastAPI). Don't copy that data over.

---

## 3. Live-Chess-Analysis

| Field | Value |
|---|---|
| Name / URL | `Live-Chess-Analysis`: https://github.com/TeijeKoolenbrander/Live-Chess-Analysis |
| Description | none (README title: "Chess Analysis") |
| Topics | none |
| Languages | JavaScript 47.6%, HTML 27.1%, Python 25.3% |
| Created / last pushed | 2026-05-16 / 2026-05-16 (1 commit, "Initial Version". Default branch is `master`) |
| Year to display | **2026** |
| Fork | No |
| License | None |
| Homepage | None |
| Hardware | No |
| Suggested type | Software |

**Summary.** A Chrome extension (Manifest V3) plus a local FastAPI backend. It captures live Chess.com games move by move, runs each position through the Stockfish engine, and shows the evaluation and the best-move suggestion in Chrome's side panel. The flow:
1. A content script reads Chess.com's move list from the page DOM.
2. A background service worker forwards each move to `localhost:8000`.
3. The backend replays the game with `python-chess`, has Stockfish evaluate the position (depth 15, 2 threads, 128 MB hash) and caches the result.
4. The side panel polls `/analysis/{game_id}` and renders the eval and the engine's recommended reply.

When a game ends, its PGN is saved to `pgns/`, and the toolbar popup lists the last 10 finished games. Everything runs locally and nothing is uploaded. The backend finds Stockfish through `$STOCKFISH_PATH`, then `./stockfish/`, then `PATH`. It also sets the Windows Proactor event loop so python-chess can spawn Stockfish on Windows. The README has a disclaimer: "built for educational purposes only. Do not use to analyze during live games."

**Notable tech.** Chrome Extensions MV3 (content script, service worker, Side Panel API, popup, storage), FastAPI, Uvicorn, Pydantic, python-chess, the Stockfish engine and the uv package manager. Python 3.10+ per the README (pyproject says >=3.8).

**Write-up facts**
- A Chrome MV3 extension plus a local Python (FastAPI) backend that analyses Chess.com games as they are played.
- Moves are scraped from the page DOM, streamed to the backend, replayed with python-chess and evaluated by Stockfish at depth 15.
- Live evaluation and best-move suggestions appear in Chrome's side panel within a second or two of each move (per the README).
- Saves a PGN of every finished game. The popup shows the last 10 games.
- Fully local: no data leaves the machine. The analysis cache is in-memory with thread-safe locking.
- Cross-platform Stockfish discovery, including a Windows event-loop fix.

**To confirm**
- **Framing matters.** Live engine help during rated Chess.com games breaks Chess.com's fair-play rules. The README disclaimer says not to use it during live games, yet the whole design captures *live* games. How should the site present it (for example as post-game or learning analysis)?
- The repo has no GitHub description. The owner may want to add one.
- The site data currently says "TypeScript, React", which is incorrect (see above).

---

## 4. CS-UY6613

| Field | Value |
|---|---|
| Name / URL | `CS-UY6613`: https://github.com/TeijeKoolenbrander/CS-UY6613 |
| Description | Artificial Intelligence Course. |
| Topics | none |
| Languages | Jupyter Notebook 97.1%, Python 2.5%, Makefile 0.4% |
| Created / last pushed | 2026-02-09 / 2026-04-14 |
| Year to display | **2026** (the repo was created in Feb 2026, and Teije's commits run Feb to Apr 2026) |
| Fork | Not a GitHub fork, but it **is built on the course's template repo**. 63 of 75 commits (Sep 2024 to Feb 2026) are by Pantelis Monogioudis, the course template author. Teije's 12 commits run 2026-02-09 to 2026-04-14. |
| License | None |
| Homepage | None |
| Hardware | No (software and ML. The template mentions ROS 2, but no robotics work by Teije is in the repo) |
| Suggested type | Research (coursework / ML). Software also fits. |

**Summary.** Coursework repo for NYU Tandon **CS-UY 6613 Artificial Intelligence**. The README and the Docker/devcontainer setup (PyTorch GPU/CPU and ROS 2 Jazzy containers, Quarto docs, uv) are the instructor's template. They are not Teije's work. Teije's own work is in `assignments/`:
- **Assignment 1:** dev environment setup (part A) and a notebook on low-rank structure in Gaussian covariances (part B: empirical covariance, eigenvalues and matrix rank, using NumPy and Matplotlib).
- **Assignment 2:** "Car Parts Video Detection Index". YOLOv8n was fine-tuned for 5 epochs on the Ultralytics Car Parts dataset and run over a YouTube video of a RAV4 to build a temporal index of detected car parts: timestamp, class, bounding box and confidence, stored as Parquet. It was published as the Hugging Face dataset `Koolenbrander/assignment-2`. The notebook also imports BentoML.
- **Assignment 3:** drone detection and tracking. YOLOv8 Nano was fine-tuned for 25+ epochs on a Roboflow drone dataset (640x640, confidence threshold 0.5). A linear Kalman filter (filterpy, constant-velocity model, state [u, v, u', v']) smooths the track and bridges gaps of 5 to 10 frames with missed detections. The README discusses failure cases (sharp turns while occluded, look-alike objects). Deliverables: two YouTube videos and the Hugging Face dataset `Koolenbrander/assignment-3`.
- **Assignment 4:** a written architectural analysis of **RAGFlow**: deep document understanding vs naive chunking, template vs semantic chunking, hybrid BM25 + dense retrieval, multi-stage retrieval, indexing and storage, query reformulation, knowledge representation, the ingestion pipeline, memory design and end-to-end decomposition.
- `project/` and `docs/` still hold only template placeholders.

**Notable tech.** Python, Jupyter, PyTorch, Ultralytics YOLOv8, OpenCV, filterpy (Kalman filter), Roboflow, Hugging Face Hub / Datasets, pandas, BentoML, NumPy, Matplotlib, Google Colab (assignment 3), Docker / VS Code Dev Containers and uv.

**Write-up facts**
- Coursework for NYU's CS-UY 6613 Artificial Intelligence (spring 2026).
- Fine-tuned YOLOv8n to detect car parts in video and published the detection index as a Hugging Face dataset.
- Built a drone tracker: a YOLOv8 Nano detector plus a constant-velocity Kalman filter that bridges 5 to 10 frames of missed detections.
- Wrote an architectural analysis of the RAGFlow retrieval-augmented generation system (chunking, hybrid retrieval, indexing, memory).
- Studied low-rank structure in Gaussian covariance matrices (eigenvalues and rank).

**To confirm**
- Course name, school and term: the "CS-UY" prefix and the template's link to aegean.ai point to NYU Tandon. Confirm "NYU, Spring 2026".
- Make clear that the dev-environment template and most of the commits are the instructor's. Only `assignments/` is Teije's work.
- Are the Hugging Face datasets and YouTube demo videos OK to link publicly?

---

## 5. wechat-mini-programs-codebase

| Field | Value |
|---|---|
| Name / URL | `wechat-mini-programs-codebase`: https://github.com/TeijeKoolenbrander/wechat-mini-programs-codebase |
| Description | none (README title: "WeChat Mini Program Studio") |
| Topics | none |
| Languages | JavaScript 100% |
| Created / last pushed | 2026-10-14 / 2026-10-17 (72 commits on `main`, all in October 2026. The earliest is "v1.0", dated 2026-10-05, carried over from lucky_dice) |
| Year to display | **2026** |
| Fork | No |
| License | None |
| Homepage | None |
| Hardware | No |
| Suggested type | Software |
| Size | Large: about 2,860 files on `main` |

**Summary.** A "studio" monorepo that builds WeChat mini programs (小程序) and mini games (小游戏). Its notable feature is the process: development is automated with **Claude Code and specialist subagents**. Claude Code acts as a CTO/orchestrator (`.claude/agents/cto.md`). It plans, delegates every task to subagents (market-researcher, opportunity-analyst, product-ux, frontend-ui, miniprogram-dev, minigame-dev, backend, qa, release), runs work in parallel and reviews the results. The pipeline runs idea → research → spec → build → QA → CTO review → release pack. The founder (Teije) chooses what to build and keeps the founder-only steps: credentials, uploads, spending, legal filings (认证, 备案, 软著) and merges to `main`. A git hook (`.claude/hooks/guard-main-push.js`) guards pushes to `main`, and `docs/constitution.md` sets the rules. Each app ends with a Founder Handoff document. There are dated market-research rounds in `research/` (2026-10-14 social mini games, 2026-10-15 new ideas).

Most games share one stack: a canvas mini game (`game/`) with WeChat Cloud Development cloud functions (`cloudfunctions/`), large `node:test` suites, a release-config tool that swaps the shared test AppID for the real AppID, and generated store screenshots and share cards.

**Games and sub-folders**

| Folder | Name | Type | Status (from the repo) | What it is |
|---|---|---|---|---|
| `apps/dianjiangtai` | 点将台 (store name `点将台·三国`) | Mini game + cloud functions + seed bank | On `main`. v1 signed off by the CTO 2026-10-15/16, QA passed. **Not released**: the founder steps (备案, cloud env, device pass, submission) are outstanding. The real AppID is already registered. | A Three Kingdoms (三国) drafting strategy game. You flip five command tokens that set the faction and era, then draft five generals into the roles of lord, strategist, vanguard, champion and defender, and the army fights twelve battles that are graded. A daily order is the same for everyone. Also has a free mode, a Sunday "识人" (spot the general) mode, battle replays, group and friend leaderboards, same-seed challenges and saveable battle-report images. v1 has 120 generals. Tests: 379 game and 182 cloud-function tests. Package 0.58 MiB. |
| `apps/chuanhua` | 传画接龙 | Mini game + 33 cloud functions | On `main`. CTO sign-off 2026-10-15/16, QA gate passed. Not released. | A group-chat drawing telephone game. Each player picks a prompt, then players take turns drawing and guessing as the chain passes along, and the whole garbled chain is revealed at the end ("月亮吃月饼" becomes "外星人在吃披萨"). Live rooms for 3 to 10 online players (about 3 minutes, per-turn timers) and an async "慢慢传" mode spread over days. Images and text are moderated before they are shown, with reports and takedown. Tests: 542 game and 402 cloud-function tests. |
| `apps/kedupan` | 群友刻度盘 | Mini game + cloud functions (24) | On `main`. Re-signed off 2026-10-16 after the typed-clue change. Not released. | A daily "scale" guessing game. Five cards a day: drag a needle between two ends (cold to hot, cheap to expensive) for everyday items such as hotpot or milk tea, then compare your placement with the whole country and with your group chat (a "默契" match score). Players can also set a clue and a position for the group to guess. Age rating moved from 8+ to 12+ after typed clues were added. Tests: 442 game and 223 cloud-function tests. |
| `apps/cheatshaizi` | 骰盅 | Mini program + mini game (+ `public/` build) | On `main`. A private tool, "not for public release". | The same dice-cup app as the `lucky_dice` repo, with hidden weighted and override modes. |
| branch `bibiyi/v1` | 比一比 | Mini game | **Not on `main`.** The branch has the spec, direction, decisions and `apps/bibiyi/content-src` with "241 sourced facts, double-verified". No game code found. | A higher-or-lower card game: guess whether the second number is more or less than the first, on one national daily deck. Keep the streak going; one miss ends the run. |
| branch `yuyirelen/v1` | 语义热冷 (working title) | Mini game | **Not on `main`.** Spec, direction and decisions only. No app folder. | A daily semantic word hunt (similar to Semantle): everyone hunts the same secret word, each guess shows how close it is in meaning, and the fewest guesses in the group wins. |

The README lists all six as "in build". In practice only dianjiangtai, chuanhua and kedupan have complete code on `main`. bibiyi and yuyirelen are at the spec or content stage on their branches. The repo also has many leftover `worktree-agent-*` branches from parallel subagent work.

**Notable tech.** WeChat Mini Game (canvas) and Mini Program platforms, WeChat Cloud Development (cloud functions, database, storage rules, scheduled cleanup and sweeper functions), open-data context (friend leaderboards), share cards, rewarded and interstitial ad hooks (流量主), content moderation (`onMediaCheck`), `node:test` and Claude Code subagent orchestration with hooks.

**Write-up facts**
- A monorepo "studio" for WeChat mini games, run by Claude Code as an AI "CTO" that orchestrates 9 specialist subagents from market research through to the release pack.
- Three complete social mini games with cloud backends, each QA-gated and signed off for release: 点将台 (Three Kingdoms drafting), 传画接龙 (drawing telephone) and 群友刻度盘 (daily scale-guessing).
- Each game ships with hundreds of automated tests (for example 传画接龙: 542 game tests and 402 cloud-function tests) and a release package well under WeChat's 4 MB limit.
- Built around group-chat play: daily shared puzzles, group and friend leaderboards, challenges and share cards.
- Compliance built in: pre-moderation and reporting of user content, privacy guides, user agreements and 备案 / 软著 preparation docs.
- A human-in-the-loop rule: credentials, spending, legal filings, releases and merges to `main` are reserved for the founder.

**To confirm**
- Are any of the games actually live on WeChat? The repo shows them as release-ready, but every handoff says none has been uploaded or released.
- The owner said "multiple WeChat mini games". Should bibiyi and yuyirelen (spec only, on branches) be mentioned, or only the three built games?
- Should the AI-agent workflow be the headline of the write-up, or the games themselves?
- The repo has no GitHub description. The owner may want to add one, and to clean up the `worktree-agent-*` branches before linking.

---

## Other public repos

| Name | Description | Language | Year | Fork | Notes |
|---|---|---|---|---|---|
| `AutoChip` (https://github.com/TeijeKoolenbrander/AutoChip) | none | none | 2026 (created 2026-10-12) | No | **Empty repo**: no commits, no files. Nothing to show yet. |

That is the complete list. The other five public repos are the priority repos above.

## Open questions for the owner (summary)

1. **personal-website:** the GitHub repo is Next.js, but this site is Astro. Which repo and tech belong on the Projects page? The Vercel URL is SSO-protected, so it is not a usable live link.
2. **Live-Chess-Analysis:** how to frame live-game engine assistance, given Chess.com's fair-play rules and the repo's own disclaimer. Also, the old site data says "TypeScript, React", which is wrong (it is JavaScript plus Python/FastAPI).
3. **lucky_dice:** comfortable showing a "rigged dice / cheat mode" app publicly? Which version (v1.1 or v1.2)? One project or merged with the WeChat studio entry?
4. **CS-UY6613:** confirm NYU Tandon, Spring 2026, and whether to link the Hugging Face datasets and YouTube demos. Credit the template to the instructor.
5. **WeChat studio:** is anything live yet? Include the spec-only games (比一比, 语义热冷)? Should the headline be the AI-agent workflow or the games?
6. **AutoChip:** it is empty. Is a project planned (the name suggests hardware or chips)?
7. No repo has a license, topics or (for 3 of them) a description. Optional cleanup before linking from the site.
