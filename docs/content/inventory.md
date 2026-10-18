# Copy inventory and known facts

Status: fact-gathering only. No final copy written. No site files edited.
Privacy: the only public email is `contact@teijekoolenbrander.com`. No other address is reproduced in this file.

Paths below are relative to `C:\Users\teije\website` unless marked OLD.
OLD = `C:\Users\teije\OneDrive\Desktop\8dou\personal_website` (read-only previous build).

---

# (A) Copy slots by page

Layout notes: the site uses one serif face (Newsreader), line art, 1px rules, no photography except the About portrait. Short lines fit best. Length limits marked "plan" come from `docs/plan.md` section 5; "layout" limits are inferred from the component.

## Global (every page)

| Slot | File | Current text | Notes |
|---|---|---|---|
| Header wordmark | `src/data/site.ts:3` | "Teije X. W. Koolenbrander" | Owner's own choice (OLD CONTENT.md:14). Fine as is. |
| Site name (SEO, OG, JSON-LD) | `src/data/site.ts:2` | "Teije Koolenbrander" | Fine. |
| Tagline | `src/data/site.ts:4` | "Computer engineer and ex-swimmer." | Shown on Home as an italic 22px line. Owner's version was "Computer Engineer & Ex-Swimmer". Confirm. |
| Site description (Home meta description + JSON-LD basis) | `src/data/site.ts:5-6` | "Teije Koolenbrander is a computer engineer and former competitive swimmer who builds software and hardware and has founded several companies." | 142 chars, under the 155 limit. Claims "founded several companies": unverified. |
| Public email | `src/data/site.ts:7` | contact@teijekoolenbrander.com | Structural. Correct. |
| Domain | `src/data/site.ts:8` | https://www.teijekoolenbrander.com | Structural. |
| Nav labels | `src/components/layout/SiteHeader.astro:14-18` | Home, About, Projects, Companies, Contact | Structural. Fine. |
| Skip link | `src/layouts/BaseLayout.astro:65` | "Skip to content" | Structural. Fine. |
| Social labels and URLs | `src/data/socials.ts:12-16` | GitHub, LinkedIn, Instagram, Spotify, NetEase Cloud Music | Structural. URLs match owner's list. Open question: add 网易云音乐 beside the NetEase label (`docs/plan.md:478`). |
| Default OG image | `public/og-default.png` (referenced `BaseLayout.astro:26`) | not supplied by owner; plan says we make one with the name | Image, not copy. |
| OG image alt | `src/layouts/BaseLayout.astro:56` | "Teije Koolenbrander, computer engineer" | Code-level string. Fine unless the OG image shows more. |
| Twitter and OG title/description | `BaseLayout.astro:48-60` | reuse each page's `title` and `description` | No separate OG fields exist. The page title and description double as OG copy. |
| JSON-LD jobTitle | `src/pages/index.astro:20` | "Computer engineer" | Code-level. Check it is still accurate. |

SEO limits for every page: title 60 chars or fewer, meta description 155 chars or fewer. Page titles follow "Page — Teije Koolenbrander" (the pattern uses 21 chars of suffix, leaving about 39 for the page part).

## Home (`src/pages/index.astro`)

| Slot | Line | Current text | Limit / note |
|---|---|---|---|
| SEO title | 26 | "Teije Koolenbrander" | 60 max. Could add the role. |
| Meta description | 27 | `site.description` (see above) | 155 max. Also used as OG description. |
| H1 | 32 | "Teije / Koolenbrander" (two lines, forced break) | Name. Structural. |
| Tagline | 34 (`site.tagline`) | "Computer engineer and ex-swimmer." | One short line, italic 22px, left column of a split grid. |
| Lede paragraph | 36-37 | "I build things with code and circuits. Before that, I spent most of my mornings in the pool. Here you'll find what I've made and the companies I've started." | Right column, about 2-4 lines. Aim for 25-45 words. Contains unverified claims (circuits, mornings in the pool, "companies I've started"). |
| Section header: Projects | 47 | "Projects" + link "All projects" | Structural. |
| Section header: Companies | 54 | "Companies" + link "All companies" | Structural. |
| Project tiles (4) | via `getHomeProjects(4)` | uses each project's title, type, year, summary, icon | Selected from `featured: true` first. See Projects fields below. |
| Company rows | via `getCompanies()` | uses each company's name and summary | See Companies fields below. |

## About (`src/pages/about.astro`)

| Slot | Line | Current text | Limit / note |
|---|---|---|---|
| SEO title | 16 | "About — Teije Koolenbrander" | 60 max. |
| Meta description | 17 | "Teije Koolenbrander is a computer engineer and former competitive swimmer who works where software meets hardware." | 155 max. 113 chars now. |
| Page title | 20 | "About" | Structural. |
| Subtitle | 20 | "From the pool to the workbench." | One line, large italic. |
| Portrait | 25-26 | Placeholder box "Your photo, in black and white" | 4:5 ratio, black and white, 1200x1500 px minimum (`docs/plan.md:474`). Needs a file from the owner. |
| Portrait alt text | not in code yet | none (box has no image) | Needs writing once the photo exists. Must describe the photo, so we need to know what it shows. |
| Bio paragraph 1 | 28 | "I'm Teije, a computer engineer who likes working where software meets hardware." | Left text column, 17px. |
| Bio paragraph 2 | 30-31 | "For years I swam competitively. Training taught me to show up early, notice small improvements, and keep going when progress is slow. I still work that way." | Unverified claims. |
| Bio paragraph 3 | 33 | "These days I split my time between my own projects and the companies I've started." | Unverified. |
| Bio length | | currently 3 short paragraphs | Layout accepts more. Keep to roughly 120-250 words in 3-5 paragraphs. |
| Section heading | 38 | "Along the way" | Fine unless the owner wants another. |
| Timeline (5 entries) | `src/content/milestones.yaml` | see below | Each: `label` (a year or "Now"), `title` (one line, 20px), `note` (one italic line, 15px). |
| "Off the clock" heading | 44 | "Off the clock" | Specified in `docs/plan.md:102`. Fine. |
| "Off the clock" text | 46-51 | "I still swim most weeks, without the stopwatch. The rest of the time there's usually music on. You can see what I'm listening to on Spotify and NetEase Cloud Music." | Right column. The two service names are inline links (keep them). One short paragraph. "Swim most weeks" is unverified. |

Timeline placeholders (`src/content/milestones.yaml`):

| Order | Label | Title | Note |
|---|---|---|---|
| 1 (current, hollow dot) | Now | Building my own companies | "One line about what you're focused on" |
| 2 | 2024 | Graduated in computer engineering | "One line about your studies" |
| 3 | 2023 | First hardware project | "One line about what you built" |
| 4 | 2021 | Last competitive race | "One line about leaving the pool" |
| 5 | 2010 | Joined my first swim club | "One line about where it started" |

All five titles and years are mockup guesses, not owner facts. Every `note` is a placeholder. The number of entries can change.

## Projects list (`src/pages/projects/index.astro`)

| Slot | Line | Current text | Limit / note |
|---|---|---|---|
| SEO title | 14 | "Projects — Teije Koolenbrander" | |
| Meta description | 15 | "Software projects and coursework by Teije Koolenbrander, including WeChat mini games and live Chess.com analysis." | 155 max. Updated 2026-10-18. |
| Page title | 18 | "Projects" | Structural. |
| Subtitle | 18 | "Things I've designed, built, and shipped." | One line. |
| Filter labels | `ProjectFilter.astro` | All, Software, Hardware, Research (derived from `type`) | Structural. |
| Hidden heading | 23 | "All projects" | Screen-reader only. Fine. |

## Project data (one file per project in `src/content/projects/`)

Fields per project and limits:

| Field | Limit / use |
|---|---|
| `title` | Shown as tile heading (26px), row heading (24px) and detail H1. Keep short. |
| `type` | `software`, `hardware` or `research`. Capitalised on screen. |
| `year` | Number. Sorts newest first. |
| `summary` | One line, about 60 chars or fewer (plan). Home tile (italic 15px), detail lede, detail meta description (so it must also read as a standalone sentence, 155 max). |
| `description` | About two lines, roughly 200 chars (plan). Projects list row. Detail page falls back to it if there is no body. |
| `icon` | One of `window`, `chip`, `rings`, `chart`, `signal`, `layers`. |
| `featured` | true/false. 4 are shown on Home. Featured first, then newest others. |
| `order` | Optional tie-breaker within a year. |
| `repo` | Optional GitHub URL. Shows "View on GitHub". |
| `url` | Optional live site. Not displayed in v1. |
| body (Markdown) | Optional. Detail page long text. Current body is placeholder headings "What it does" and "How it's built". |
| Detail SEO | Title is built as "{title} — Teije Koolenbrander" (title plus 21 chars must stay under 60, so project titles of about 39 chars or fewer). Description is `summary`. |

Current entries:

| File | Title | Type | Year | Icon | Featured | Repo | summary / description |
|---|---|---|---|---|---|---|---|
| `cs-uy-6613.md` | CS-UY 6613 – Artificial Intelligence | research | 2026 | chart | yes | https://github.com/TeijeKoolenbrander/CS-UY6613 | summary "One line on what it does"; description "Two lines on the problem, what you built, and the tools you used to build it."; body: "Coursework from NYU's CS-UY 6613 Artificial Intelligence course. A fuller write-up is coming soon." plus placeholder "What it does" and "How it's built" sections |
| `live-chess-analysis.md` | Live Chess Analysis | software | 2026 | window | yes | https://github.com/TeijeKoolenbrander/Live-Chess-Analysis | same placeholder summary/description; body "A live chess analysis tool. A fuller write-up is coming soon." plus placeholder sections |
| `placeholder-hardware-2025.md` | Project name | hardware | 2025 | chip | yes | none | placeholder; body "A hardware project from 2025..." |
| `placeholder-software-2025.md` | Project name | software | 2025 | layers | yes | none | placeholder; body "A software project from 2025..." |
| `placeholder-hardware-2024.md` | Project name | hardware | 2024 | signal | no | none | placeholder; body "A hardware project from 2024..." |
| `placeholder-software-2023.md` | Project name | software | 2023 | rings | no | none | placeholder; body "A software project from 2023..." |

Decision needed on the four placeholder projects: write them, or delete them. The owner's old content sheet lists only two projects.

## Project detail (`src/pages/projects/[slug].astro`)

| Slot | Line | Current text | Note |
|---|---|---|---|
| SEO title | 19 | "{title} — Teije Koolenbrander" | From project data. |
| Meta description | 20 | `summary` | From project data. |
| Back links | 25, 58 | "All projects" | Structural. |
| Meta bar labels | 36, 40 | "Type", "Year" | Structural. |
| GitHub button | 47 | "View on GitHub" | Structural. |
| H1, lede, body | 28, 31, 54 | project `title`, `summary`, body or `description` | From data. |
| Icon | 29 | project `icon` | From data. |

## Companies page (`src/pages/companies.astro`)

| Slot | Line | Current text | Limit / note |
|---|---|---|---|
| SEO title | 12 | "Companies — Teije Koolenbrander" | |
| Meta description | 13 | "The companies Teije Koolenbrander has founded and runs." | 155 max. Short. Asserts "founded and runs": unverified. |
| Page title | 16 | "Companies" | Structural. |
| Subtitle | 16 | "Companies I've founded and run." | One line. |

## Company data (`src/content/companies/*.md`)

| Field | Limit / use |
|---|---|
| `name` | Home row heading (34px), Companies heading (40px). Keep short. |
| `summary` | 1-2 sentences (plan). Home row only. Right column, 16px. |
| `description` | 2-3 sentences (plan). Companies page, 17px. Placeholder asks to "mention one thing it has achieved so far". |
| `founded` | Year. Shown "Founded {year}". Sorts newest first. |
| `website` | Optional URL. Plan says left empty in v1. If set, shows a link. |
| `websiteLabel` | Optional display text, otherwise derived from the URL. |
| `logo` | Optional local image, 72x72, square crop. If absent, a line-art mark is used. |
| `mark` | Placeholder mark: `circle-line`, `squares` or `triangle`. |
| Logo alt | Built in code as "{name} logo" when a logo exists. No copy needed. |

Current entries (all three identical text apart from year and mark):

| File | name | founded | mark |
|---|---|---|---|
| `placeholder-company-2025.md` | "Company name" | 2025 | circle-line |
| `placeholder-company-2024.md` | "Company name" | 2024 | squares |
| `placeholder-company-2023.md` | "Company name" | 2023 | triangle |

Placeholder summary: "A sentence or two about what the company does, who it's for, and why you started it." Placeholder description: "Two or three sentences about what the company does, who it's for, and why you started it. Mention one thing it has achieved so far." The only company the old sources name is Hirvo (a side project). Years, count and the other names are unknown.

## Contact (`src/pages/contact.astro`)

| Slot | Line | Current text | Limit / note |
|---|---|---|---|
| SEO title | 10 | "Contact — Teije Koolenbrander" | |
| Meta description | 11 | "Get in touch with Teije Koolenbrander for work, collaborations, or to say hello." | 155 max. |
| Page title | 14 | "Contact" | Structural. |
| Subtitle | 14 | "For work, collaborations, or to say hello." | One line. |
| Email label | 19 | "Email" | Structural. |
| Email address | 20 | `site.email` | Structural. Correct public address. |
| Note | 21 | "Email is the best way to reach me." | Italic, 17px, one line. Owner asked about this line: confirm or rewrite (optionally add a reply-time promise only if true). |
| Section heading | 26 | "Elsewhere" | Fine. |
| Social link list | `SocialLinks.astro` | GitHub, LinkedIn, Instagram, Spotify, NetEase | Structural. |

## 404 (`src/pages/404.astro`)

| Slot | Line | Current text | Note |
|---|---|---|---|
| SEO title | 5 | "Page not found — Teije Koolenbrander" | Noindex page. |
| Meta description | 5 | "This page could not be found." | Noindex. |
| H1 | 7 | "Page not found" | Fine. |
| Sub | 8 | "The page you're looking for doesn't exist or has moved." | Fine. Optional: make it more in voice. |
| Link | 9 | "Back to the home page" | Fine. |

## Not on the site (from the old plan, not in this build)

The old build had Diary, Now and Links pages. The new Astro site has none of them. The facts from the old Now page are kept in (B) and may feed the "Now" timeline entry.

---

# (B) Known facts, with sources

Facts are the owner's own words unless marked "inferred" or "placeholder".

## Identity
- Name as it should appear: "Teije X. W. Koolenbrander" (OLD `planning/CONTENT.md:14`; OLD `content/site.ts:5`).
- Stage name: "same as name" (OLD `CONTENT.md:15`).
- Tagline: "Computer Engineer & Ex-Swimmer" (OLD `CONTENT.md:16`; `content/site.ts:6`). New site has "Computer engineer and ex-swimmer." (`src/data/site.ts:4`).
- Short bio, owner's wording: "I'm Teije Koolenbrander, a computer engineering student and swimmer passionate about building software, solving problems, and continuously improving both technically and personally." (OLD `CONTENT.md:17`). Note it says "student" and "swimmer", and uses "passionate", which our voice rules ban.
- Domain: teijekoolenbrander.com (OLD `CONTENT.md:19`; `SPEC.md:194`).
- Public email: the old sheet named a different address than today's. Current rule, per the manager: contact@teijekoolenbrander.com only. The old address is not copied here.

## Studies and location
- "computer engineering student" (OLD `CONTENT.md:17`).
- Coursework from CS-UY 6613 Artificial Intelligence (OLD `CONTENT.md:88-89`; OLD `content/projects.ts:19-20`). The new site's body text says "NYU's CS-UY 6613" (`src/content/projects/cs-uy-6613.md:12`). The "NYU" link is an inference from the course code; the owner never wrote "NYU" in the old sources.
- The new site's timeline says "Graduated in computer engineering" in 2024 (`milestones.yaml:7-11`). This is a mockup placeholder and conflicts with "student" in the owner's own bio. Needs confirming.
- Location, university name, degree, languages: not stated anywhere. The NetEase profile (Chinese music service) and the Chinese name 网易云音乐 in OLD `CONTENT.md:29` hint at a link to China or Chinese, but that is an inference, not a fact.

## Work and companies
- "Right now I'm focused on an internship at 8 Dou and building a side project for Hirvo." (OLD `content/now.mdx:5`; OLD `CONTENT.md:133`). Dated 2026-07-08 (OLD `CONTENT.md:129`).
- 8 Dou: internship, current as of July 2026. No role, dates or description.
- Hirvo: a "side project", per the owner. No description, founding year or role. (Hirvo also appears as the domain of a private email address, which we do not use.)
- The new site calls Teije a founder of "companies" (plural, three placeholder entries). The owner's own words say only "a side project for Hirvo". Whether Hirvo is a company and whether there are others is unconfirmed.

## Projects
- Live Chess Analysis, 2026: "Live analysis of chess positions — for "analyzing" live in chess 😉" (OLD `CONTENT.md:76-77`). Repo https://github.com/TeijeKoolenbrander/Live-Chess-Analysis (OLD `CONTENT.md:82`). Role and tech tags left TODO by the owner. The old data file guessed "Solo developer", TypeScript and React (OLD `content/projects.ts:12-14`), explicitly as sample values, so not facts.
- CS-UY 6613 Artificial Intelligence, 2026: "Coursework for the Artificial Intelligence class (CS-UY 6613)" (OLD `CONTENT.md:88-89`). Repo https://github.com/TeijeKoolenbrander/CS-UY6613 (OLD `CONTENT.md:94`). Role and tech TODO. Old data guessed Student and Python (sample values).
- "Feature on Home?" for both: TODO in the owner's sheet (OLD `CONTENT.md:85, 97`). The new build features both.
- Owner's tone in the project line: playful, a pun with a wink emoji.

## Swimming and personal
- Swimming: the owner's tagline says ex-swimmer; the bio says "swimmer" (OLD `CONTENT.md:17`). Nothing about clubs, events, level or years. All specific swimming claims on the site (joined a club in 2010, last race 2021, mornings in the pool, swims most weeks) are mockup placeholders, not owner facts.
- Music: owner has Spotify and NetEase Cloud Music profiles, "kept as profile links only — no music section" (OLD `CONTENT.md:27`; SPEC `v3 change` lines 10-13). No hobbies beyond that are stated.
- Hobbies other than swimming and music: none stated.

## Profiles (owner's own list, OLD `CONTENT.md:28-41`)
- Spotify, NetEase Cloud Music (网易云音乐), GitHub https://github.com/TeijeKoolenbrander/, LinkedIn https://www.linkedin.com/in/teije-koolenbrander-359759263/, Instagram https://www.instagram.com/tkoolenbrander/.
- None: X/Twitter, YouTube, TikTok, Bilibili, other (OLD `CONTENT.md:37-41`).
- Same URLs are already in `src/data/socials.ts`.

## Tone, voice and design preferences
- Overall feel: "professional" (OLD `CONTENT.md:161`).
- Palette: black and white with a blue accent; Times New Roman (OLD `CONTENT.md:158-160`). The new build uses Newsreader instead (`BaseLayout.astro:2-3`), so the font preference changed or was overridden; not a copy issue.
- Site should "feel like a person, not a product" (OLD `SPEC.md:21`). Goals: a stranger knows within about 10 seconds that Teije is a developer/computer engineer (OLD `SPEC.md:35-38`).
- Wants it "typographic and restrained" (OLD `SPEC.md:78`; `features/003-home.md:21`), "a genuine sense of the person, not a résumé" (OLD `features/004-about.md:24`).
- Audience: potential employers and clients; peers, friends and curious visitors (OLD `SPEC.md:45-48`).
- Analytics: none; privacy by default (OLD `SPEC.md:209`).

## What the owner does NOT want
- No music section or embeds (OLD `SPEC.md:10-13, 252-253`).
- No CV page, comments, newsletter, gallery, RSS, e-commerce (OLD `SPEC.md:29-33`).
- No contact form; email plus social links only (OLD `SPEC.md:112`).
- Old long-bio and "what I'm about" were never written (still lorem ipsum, OLD `CONTENT.md:50-65`). Portrait is "yes", file "TBD" (OLD `CONTENT.md:67, 150`).
- No explicit banned-words list from the owner. "Passionate" appears in his own short bio, but our brief bans it, so we should check he is happy to drop it.

---

# Final copy: Home

Applied 2026-10-18. Alternative subheader: "BSc Computer Engineering".

- Subheader (`src/data/site.ts` `tagline`): B.S. Computer Engineering
- Intro (`src/pages/index.astro` lede): I build software and hardware. Here you'll find exactly what I've been working on. (Owner-written wording, supplied by Teije 2026-10-18.)
- Meta description (`src/data/site.ts` `description`): Teije Koolenbrander is a computer engineering student who builds software and hardware. See his projects and the companies he is involved in.
- Owner confirmed 2026-10-18: keep "B.S." in the subheader (the "BSc" alternative is dropped). Describe him as a computer engineering student, not "a computer engineer". The meta description above is the updated version (143 characters).
- Also updated to match: Person JSON-LD `jobTitle` in `src/pages/index.astro` is now "Computer Engineering Student". The og:image alt in `src/layouts/BaseLayout.astro` now reads "Teije Koolenbrander, computer engineering student".

---

# Final copy: About

Applied 2026-10-18. Facts supplied by Teije.

- Intro (`src/pages/about.astro`, three paragraphs):
  1. I'm Teije, a computer engineering student at NYU Tandon. I graduate in 2027.
  2. I'm Dutch and Chinese, and I was born in Shanghai. Today I'm based in Beijing, New York and Singapore.
  3. I'm always building something. Sometimes it's software, sometimes it's hardware, and sometimes it's both.
- Meta description: Teije Koolenbrander is a computer engineering student at NYU Tandon (Class of 2027) who is always building something.
- Subtitle: From the pool to the workbench.
- Off the clock: I used to swim competitively. These days I play basketball and work on small hardware projects. There's usually music on too. You can see what I'm listening to on Spotify and NetEase. (Links kept.)
- Timeline (`src/content/milestones.yaml`, newest first, order 1 to 5). Owner-supplied facts, applied 2026-10-18. The swim entries and all placeholders are removed.
  - Now (current): "Building my own company" / "WeChat mini programs, mini games and SaaS." (company unnamed for now)
  - 2027: "Computer Engineering, NYU Tandon" / "Expected graduation, class of 2027."
  - 2023: "First hardware project" / "A wristband that queues my playlist based on my heart rate."
  - 2021: "First coding project" / "A tic-tac-toe game."
  - 2005: "Born" / "Shanghai."
- Note: the About subtitle "From the pool to the workbench." and the "Off the clock" swimming line still mention swimming. The timeline no longer does. Owner may want to review.

---

# Final copy: Projects page

Applied 2026-10-18. The site has 4 projects (Lucky Dice, Live Chess Analysis, CS-UY 6613 Artificial Intelligence, WeChat Mini Games). Types shown: Software and Coursework.

- Meta description (`src/pages/projects/index.astro`): Software projects and coursework by Teije Koolenbrander, including WeChat mini games and Chess.com game analysis. (113 characters)
- Subtitle (unchanged): Things I've designed, built, and shipped.
- Page title (unchanged): Projects
- Filter labels are derived from project `type`, so they now show All, Software, Coursework.

---

# (C) Gaps: questions for the owner

Short answers are fine. "Skip" is a valid answer for anything optional.

## Whole site
1. Do you want the tagline to stay "Computer engineer and ex-swimmer"? Or do you want a different line?
2. What is the one thing a visitor should remember about you after ten seconds?
3. Are you a student right now, or did you graduate? (Your old bio says student; the timeline says "Graduated 2024".) Which school, which degree, and when did or will you finish?
4. Which city or country are you based in? Should the site say so, or leave it out?
5. Which languages do you speak or write? Do you want them mentioned?
6. Are there words you never want on the site? Is "passionate" really OK to drop?
7. Do you want 网易云音乐 shown next to "NetEase Cloud Music"?

## Home
8. Is the line "I build things with code and circuits" true? Do you build hardware? What do you actually build?
9. "I spent most of my mornings in the pool": true, or should it say something else?
10. Do you want the home intro to mention 8 Dou or Hirvo, or keep it general?

## About
11. In a few sentences each, how did you get into computer engineering, and into swimming?
12. What did you swim (events, level, club or country), and until when? Is 2021 your last race? Is 2010 the year you joined your first club?
13. What did swimming teach you that you still use? (The current text says "show up early, notice small improvements." Is that how you would say it?)
14. What is your internship at 8 Dou? Give the role, dates, city and one thing you did there. Is it fine to name them publicly?
15. What do you want on the timeline? For each entry give a year and one line: studies, first hardware project, leaving the pool, joining the swim club, and "Now". Add or drop entries as you like.
16. "Off the clock": do you still swim most weeks? What else do you do outside work (sports, reading, building, travel)? Anything you want left out?
17. Which photo will you use for the portrait, in black and white and 4:5? Please send the file. What are you wearing and doing in it, and where? (We need this for the alt text.)

## Projects
18. Live Chess Analysis: what does it do, in one sentence a non-engineer would get? What is it built with? Is it solo work? Is it live anywhere?
19. CS-UY 6613 Artificial Intelligence: is it NYU? What did you build, in one sentence? What tools or language? Can the code be public?
20. Do you want both of these featured on the home page?
21. Do you have other projects, hardware especially, with a name, a year, one sentence and a repo or link? If not, should we delete the four "Project name" placeholders?
22. For each project, is it Software, Hardware, or Research?
23. Do you want a longer write-up for each project (what it does, how it's built, what you learned)? If so, give us a few bullet points per project.

## Companies
24. What are your companies called? Is Hirvo a company or a side project?
25. For each one: what does it do, who is it for, why did you start it, and what is one thing it has achieved (a number, a customer, a launch)?
26. For each: the year it was founded, your role, and whether it is still running?
27. Does each have a website you want linked? Do you have logos (square, ideally 144x144 or bigger)?
28. How many companies should the page show? (Currently three.)

## Contact
29. Is "Email is the best way to reach me." right as written? Do you want to add a reply time (only if true), or what to write about?
30. Who should write to you (employers, clients, collaborators, students)? Is the subtitle "For work, collaborations, or to say hello." fine?

## 404
31. Do you want a lighter tone on the 404 page, or keep it plain?

## Images and sharing
32. Do you have a share image (the preview when someone posts the link)? If not, we use a simple one with your name.
