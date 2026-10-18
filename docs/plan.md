# Teije Koolenbrander — Personal Website Specification

**Status:** v1.1 (2026-10-18). The owner's decisions are incorporated and the stack is approved. This file is the single source of truth for the project.
**Owner:** Teije Koolenbrander
**Source of truth for UI:** the HTML mockups in `docs/ui/`, plus `docs/design.md` (by the designer) for anything the mockups don't cover, such as the project detail page. Where this document and a mockup disagree, the mockup wins, except where an owner decision recorded here (section 11) says otherwise.

| Page | Mockup file |
|---|---|
| Home | `docs/ui/teije_koolenbrander_home_page_white_v3.html` |
| About | `docs/ui/teije_koolenbrander_about_page.html` |
| Projects | `docs/ui/teije_koolenbrander_projects_page.html` |
| Project detail | No mockup. Specified in `docs/design.md` using the same visual language |
| Companies | `docs/ui/teije_koolenbrander_companies_page.html` |
| Contact | `docs/ui/teije_koolenbrander_contact_page.html` (ignore its form and footer, see 3.6) |

> **Reading the mockups.** Each file starts with about 2,500 lines of design-tool boilerplate CSS (`--font-anthropic-sans`, `--gray-*`, `--clay`, etc.). This is identical in all five files and is **not** part of the design. The real page starts at `<div class="tk">` near the end of each file, with its own short `<style>` block. Also not part of the design: the centred URL strip at the top of each mockup (e.g. `teijekoolenbrander.com/about`, a fake browser address bar), the 12px rounded outer frame, and the 16px body padding. **The mockup footer (Now/Links links and social icons) and the Contact form are also excluded from v1** by owner decision.

### Source material: previous build

The owner has a previous build of this site (Next.js) at `C:\Users\teije\OneDrive\Desktop\8dou\personal_website`. It is **reference only**. Do not modify it, and do not copy its code or design. The social links and the two project repo URLs in this spec were taken from it (`content/links.ts`, `content/projects.ts`). Nothing else from it is imported. All v1 copy is placeholder (see section 5.6).

---

## 1. Overview

This is a personal portfolio site for Teije Koolenbrander, a computer engineer and former competitive swimmer who works on both software and hardware and has founded several companies. It shows who he is (About), what he has built (Projects, with a page per project), the companies he has started (Companies), and how to reach him (Contact). The audience is likely potential collaborators, clients, employers, investors and peers who want a quick, credible overview. The look is a deliberately minimal, black-on-white, editorial style: a serif typeface, thin 1px rules and animated line drawings that turn circuit traces into water waves.

**Canonical URL:** `https://www.teijekoolenbrander.com` (owned by the owner). The bare domain `teijekoolenbrander.com` and all `http://` requests redirect (301) to `https://www.teijekoolenbrander.com/...`, configured at the host (section 8.2).

---

## 2. Sitemap and routes

All routes use directory-style URLs with a trailing slash (built as `<route>/index.html`) so they work on Apache.

| Page | Route | Built file | In main nav | Design source |
|---|---|---|---|---|
| Home | `/` | `index.html` | Yes (1st) | Mockup |
| About | `/about/` | `about/index.html` | Yes (2nd) | Mockup |
| Projects | `/projects/` | `projects/index.html` | Yes (3rd) | Mockup |
| Project detail | `/projects/<slug>/` | `projects/<slug>/index.html` | No ("Projects" shown active) | `docs/design.md` |
| Companies | `/companies/` | `companies/index.html` | Yes (4th) | Mockup |
| Contact | `/contact/` | `contact/index.html` | Yes (5th) | Mockup (minus form) |
| 404 | (any unknown URL) | `404.html` | No | `docs/design.md` (plain page in the same style with a link home) |

`<slug>` is the project's content file name (e.g. `src/content/projects/live-chess-analysis.md` → `/projects/live-chess-analysis/`).

There are no `/now/` or `/links/` pages in v1.

### 2.1 Header (all pages)

- **Left:** wordmark text "Teije X. W. Koolenbrander", which links to `/`.
- **Right:** `<nav aria-label="Main">` with links in this order: **Home, About, Projects, Companies, Contact**.
- **Active page:** the link is underlined (1px, offset 6px) and has `aria-current="page"`. On project detail pages, "Projects" is underlined but uses `aria-current="true"` (it is a section, not the current page).
- **Hover:** links get the same underline.
- **Layout:** flex, `justify-content: space-between`, baseline aligned, `flex-wrap: wrap`. On narrow screens the nav wraps under the wordmark. **There is no hamburger or mobile menu in the mockups**, and none is planned. Five short links wrap without problems.
- Padding is 22px vertically and 36px horizontally (20px horizontally at 600px and below).

### 2.2 Footer

**No site footer in v1** (owner decision). The page ends after the last content section. A footer (Now/Links and social icons) is listed in section 10 as later work.

### 2.3 Social links (shared data)

Socials appear only where the mockup pages show them in page content: the Contact "Elsewhere" list (all five) and the About "Off the clock" paragraph (Spotify and NetEase). They are also used for JSON-LD `sameAs`. All come from **one shared data source** (`src/data/socials.ts`, section 5.4).

| Order | Label | URL | Icon (Tabler) |
|---|---|---|---|
| 1 | GitHub | `https://github.com/TeijeKoolenbrander/` | `brand-github` |
| 2 | LinkedIn | `https://www.linkedin.com/in/teije-koolenbrander-359759263/` | `brand-linkedin` |
| 3 | Instagram | `https://www.instagram.com/tkoolenbrander/` | `brand-instagram` |
| 4 | Spotify | `https://open.spotify.com/user/31iortitby7776a52zxl6zz4lnru` | `brand-spotify` |
| 5 | NetEase Cloud Music | `https://music.163.com/#/user/home?id=2139063693` | `music` (generic) |

- These URLs and this order are confirmed from the previous build. Spotify uses the clean profile URL, not the `?si=` share-link version.
- **External links open in a new tab** (`target="_blank" rel="noopener noreferrer"`). This applies to social links and the project "View on GitHub" link. Each new-tab link adds "(opens in new tab)" for screen readers, as visually hidden text. Internal links and the `mailto:` link stay in the same tab.

---

## 3. Page-by-page specification

Notation: font sizes in px are taken from the mockups. "(data)" means the content should come from a structured content source and not be hard-coded. All copy is placeholder for v1 (section 5.6).

### 3.1 Home `/`

| # | Section | Contents | Behaviour |
|---|---|---|---|
| 1 | Header | Shared header, "Home" active | — |
| 2 | Hero | `h1` "Teije / Koolenbrander" on two lines (92px, line-height 0.92, letter-spacing -0.035em; 52px at 600px and below). Below it, a two-column grid (1fr : 1.3fr, 24px gap, 32px top margin). Left: italic tagline "Computer engineer and ex-swimmer." (22px). Right: intro paragraph (16px, line-height 1.75): "I build things with code and circuits. Before that, I spent most of my mornings in the pool. Here you'll find what I've made and the companies I've started." | Grid collapses to one column at 600px and below |
| 3 | Signature illustration | Full-width inline SVG (viewBox 608×120). Circuit traces with right-angle bends and solder "vias" (filled dots plus one hollow ring) that turn into two sine-like waves. Decorative, `aria-hidden`. | On load, the lines draw themselves (stroke-dashoffset animation, 2.4s, 0.2s delay; the second wave starts at 0.9s) and the vias fade in at 1.6s. With `prefers-reduced-motion: reduce`, everything appears at once. |
| 4 | Projects preview | Section header: `h2` "Projects" (30px) on the left and the link "All projects" → `/projects/` on the right. Below it, a **2×2 grid of 4 project tiles** (data). Each tile has: a 44px line icon at top-left, "Type, Year" at top-right (14px, e.g. "Software, 2026"), and at the bottom the `h3` project name (26px) and an italic one-line summary (15px). Tiles have 1px black borders that collapse into a shared grid (−1px margins) and a minimum height of 190px. | Whole tile is a link to **`/projects/<slug>/`**. Hover shows an inset 1px outline (offset −5px) and underlines the `h3`. The 4 tiles are the projects with `featured: true`, newest first; if fewer than 4 are featured, fill with the newest non-featured ones. Grid becomes 1 column at 600px and below. |
| 5 | Companies preview | Section header: `h2` "Companies" with the link "All companies" → `/companies/`. Below it, **3 company rows** (data). Each row is a two-column grid (1fr : 1.3fr) with the `h3` company name (34px) on the left and a 1–2 sentence `summary` (16px) on the right. Rows have a 1px top border, and the last row also has a bottom border. | Whole row is a link to `/companies/`, as in the mockup. Hover underlines the name. Rows stack at 600px and below. |

### 3.2 About `/about/`

| # | Section | Contents | Behaviour |
|---|---|---|---|
| 1 | Header | "About" active | — |
| 2 | Page title block | `h1` "About" (84px; 56px at 600px and below). A small 200×64 line drawing sits right-aligned on the same row: a wave that becomes a circuit trace, with two vias. Below: italic subtitle "From the pool to the workbench." (22px). | Line draws on load (1.8s). Reduced motion is respected. Title and drawing wrap on narrow screens. |
| 3 | Photo + bio | Two columns (0.85fr : 1.3fr, 32px gap). Left: **photo placeholder**, 4:5 ratio with a 1px black border and the italic caption "Your photo, in black and white". Right: three bio paragraphs (17px, line-height 1.75): "I'm Teije, a computer engineer who likes working where software meets hardware." / "For years I swam competitively. Training taught me to show up early, notice small improvements, and keep going when progress is slow. I still work that way." / "These days I split my time between my own projects and the companies I've started." | Stacks at 600px and below. v1 ships the bordered placeholder; the portrait is deferred (5.6). The component must accept an optional image so swapping it in later needs no layout change. |
| 4 | Timeline "Along the way" | `h2` "Along the way". A vertical 1px line (indented 72px) with **5 milestones** (data). Each has a label in the left gutter (15px: "Now", "2024", "2023", "2021", "2010"), a 7px dot on the line, a title (20px) and an italic one-line note (15px). The current item ("Now") has a **hollow** dot. Past items have **filled** dots. Mockup items: Now – Building my own companies; 2024 – Graduated in computer engineering; 2023 – First hardware project; 2021 – Last competitive race; 2010 – Joined my first swim club. | Static. Use the mockup's titles and placeholder notes. |
| 5 | "Off the clock" | 1px top border. Two columns (0.85fr : 1.3fr): `h2` "Off the clock" on the left. On the right, a paragraph: "I still swim most weeks, without the stopwatch. The rest of the time there's usually music on. You can see what I'm listening to on Spotify and NetEase Cloud Music." The two service names are always-underlined inline links (URLs from the socials data, new tab). | Stacks at 600px and below. |

### 3.3 Projects `/projects/`

| # | Section | Contents | Behaviour |
|---|---|---|---|
| 1 | Header | "Projects" active | — |
| 2 | Page title block | `h1` "Projects", with a 200×64 drawing of a trace that branches into three lines with two vias. Italic subtitle: "Things I've designed, built, and shipped." | Line draws on load, staggered (0s / 0.5s / 0.8s delays). |
| 3 | Type filter | `role="group"`, `aria-label="Filter projects by type"`. Text buttons **All · Software · Hardware · Research** (16px, no border or background). | The selected button has `aria-pressed="true"` and is underlined. Hover underlines. Clicking hides the rows that don't match (All shows everything). **Progressive enhancement:** without JS all projects are visible and the filter group is hidden (rendered with `hidden`, removed by the script). No URL state for the filter. |
| 4 | Project list | **6 project rows** (data), sorted newest first (then by `order`). Each row is a grid (52px icon column, flexible content, auto-width meta column) with 20px gap, 22px vertical padding and a 1px top border. The list also has a bottom border. Row content: 44px line icon; `h3` project name (24px); `description` (15px, about two lines); meta on the right (14px, right-aligned) showing Type on one line and Year on the next. | Whole row is a link to **`/projects/<slug>/`**. Hover underlines the `h3`. At 600px and below the grid becomes 44px + 1fr and the meta moves under the description. |

Mockup data (types/years to reproduce with placeholder entries, see 5.1): Software 2026, Hardware 2025, Software 2025, Research 2024, Hardware 2024, Software 2023.

### 3.4 Project detail `/projects/<slug>/`

No mockup. **Layout and styling are specified by the designer in `docs/design.md`**, in the same visual language (serif, 1px rules, black on white, line icon). This section defines the required content and behaviour.

| # | Element | Source | Behaviour |
|---|---|---|---|
| 1 | Header | Shared header, "Projects" shown active (2.1) | — |
| 2 | Back link | Static text, e.g. "All projects", → `/projects/` | Internal link, same tab. Placed above the title. Hover underlines |
| 3 | Icon | `icon` | 44px line icon from `ProjectIcon` (designer may scale it up). `aria-hidden` |
| 4 | Title | `title` | The page's single `h1` |
| 5 | Meta | `type`, `year` | Same format as the Home tile: "Software, 2026" |
| 6 | Summary | `summary` | Italic lede |
| 7 | Description | Markdown body of the entry | Rendered with `render(entry)`. If the body is empty, fall back to the `description` field so the page is never blank. Prose styles (paragraphs, lists, links, inline code, `h2`/`h3`) per `docs/design.md` |
| 8 | GitHub link | `repo` | "View on GitHub", shown **only when `repo` is set**. Opens in a new tab with `rel="noopener noreferrer"` and visually hidden "(opens in new tab)" |

- Pages are generated at build time with `getStaticPaths()` from `getCollection('projects')`, with `params: { slug: entry.id }`. Adding a Markdown file adds a page.
- `<title>`: "{Project title} — Teije Koolenbrander". Meta description: `summary`. Canonical `https://www.teijekoolenbrander.com/projects/<slug>/`.
- No previous/next navigation in v1.

### 3.5 Companies `/companies/`

| # | Section | Contents | Behaviour |
|---|---|---|---|
| 1 | Header | "Companies" active | — |
| 2 | Page title block | `h1` "Companies", with a 200×64 drawing of a staircase trace rising to the right, with three vias and an end ring. Italic subtitle: "Companies I've founded and run." | Line draws on load. |
| 3 | Company list | **3 company entries** (data) as `<article>` elements. Each is a two-column grid (1fr : 1.3fr, 32px gap, 36px vertical padding) with a 1px top border, and the list has a bottom border. Left column: a 72×72 **logo placeholder** (square outline with a simple geometric line mark), then the `h2` company name (40px). Right column: a 2–3 sentence `description` (17px) and a meta row (15px) with "Founded YYYY". | **No links on company entries in v1.** The `CompanyEntry` component renders the website link (always-underlined, new tab) after "Founded YYYY" only if `website` is set; v1 content leaves it empty, so the link can be turned on later by adding one field. Entries stack at 600px and below. Sorted newest first (2025, 2024, 2023 in the mockup). |

Note that the Home page shows a **shorter** description for each company than the Companies page. The content model therefore has both `summary` and `description`.

### 3.6 Contact `/contact/`

| # | Section | Contents | Behaviour |
|---|---|---|---|
| 1 | Header | "Contact" active | — |
| 2 | Page title block | `h1` "Contact", with a 200×64 drawing of a trace that ends in a ring emitting three radio-wave arcs. Italic subtitle: "For work, collaborations, or to say hello." | The trace draws, then the arcs draw one after another (1.2s / 1.4s / 1.6s). |
| 3 | Details | Small label "Email" (15px). Below it, the address **contact@teijekoolenbrander.com** (24px, underlined, `word-break: break-all`), linked as `mailto:contact@teijekoolenbrander.com`. The value comes from `site.email`. Next, the label "Elsewhere" followed by a stacked list of the 5 social links (18px). Each row has a 20px Tabler icon and a text label, with 1px rules between rows and a rule at the bottom. | Hover underlines. Social data comes from `socials`, links open in a new tab. Plain `mailto:` link, no obfuscation. |

**No contact form** (owner decision): no form markup, no validation JS, no form service. With the form column gone, the layout of the details block on wide screens (e.g. single column, or email and "Elsewhere" side by side) is specified in `docs/design.md`.

### 3.7 404

Built from `src/pages/404.astro` to `dist/404.html`. Header (no nav item active), an `h1` (e.g. "Page not found"), one short line, and a link to `/`. Served by Apache via `ErrorDocument 404 /404.html` (8.2). `<meta name="robots" content="noindex">`, excluded from the sitemap. Styling per `docs/design.md`.

---

## 4. Shared components

| Component | Used on | Variants / props | Notes |
|---|---|---|---|
| `BaseLayout` | All | `title`, `description`, `ogImage?`, `currentNav`, `noindex?` | `<head>` meta, canonical, OG, font, skip link, header. No footer |
| `SiteHeader` | All | `current: 'home' \| 'about' \| 'projects' \| 'companies' \| 'contact' \| null`, `currentIsSection?` | Wordmark plus nav. Active link gets `aria-current="page"` (or `"true"` on project detail pages) |
| `SocialLinks` | Contact | `variant: 'list'` | Icon, label and rules between rows. New tab with hidden "(opens in new tab)" |
| `Icon` | Contact | `name` | Inline SVG copied from Tabler (MIT). Replaces the CDN webfont |
| `PageTitle` | About, Projects, Companies, Contact | `title`, `subtitle`, slot for the drawing | 84px `h1`, a right-aligned 200×64 drawing and an italic subtitle |
| `LineDrawing` / per-page SVG components | All main pages | `HeroTraceWave` (Home 608×120), `AboutMark`, `ProjectsMark`, `CompaniesMark`, `ContactMark` | Shared `.ln` stroke style and `.draw` animation. Always `aria-hidden`. Respect reduced motion |
| `SectionHeader` | Home | `title`, `linkText`, `href` | `h2` on the left and a text link on the right, baseline-aligned |
| `ProjectTile` | Home | `project` | Bordered card for the 2×2 grid, links to `/projects/<slug>/`. Hover shows the inset outline |
| `ProjectRow` | Projects | `project` | List row with icon, text and meta, links to `/projects/<slug>/`. Has `data-type` for filtering |
| `ProjectFilter` | Projects | `types[]` | `aria-pressed` toggle buttons plus a small inline script |
| `ProjectIcon` | Home, Projects, Project detail | `name`, `size?` | Library of 44×44 line icons drawn in the mockups: `window` (terminal window), `chip`, `rings` (concentric circles), `chart`, `signal` (wifi arcs), `layers` |
| `ProjectDetail` (or inline in `[slug].astro`) | Project detail | `project`, rendered body | Back link, icon, title, meta, summary, body, optional GitHub link |
| `CompanyRow` | Home | `company` | Compact row linking to `/companies/`, with name and summary |
| `CompanyEntry` | Companies | `company` | Full article with logo, name, description, founded year, and website link only if `website` is set |
| `CompanyLogo` | Companies | `logo?`, fallback `mark` | 72×72. Uses the real logo image if one is provided, otherwise a geometric placeholder mark (`circle-line`, `squares`, `triangle`) |
| `Timeline` / `TimelineItem` | About | `milestone`, `current` | Vertical rule, gutter label, hollow or filled dot |
| `TextLink` | Everywhere | `underline: 'hover' \| 'always'`, `external?` | Underline is 1px thick with a 6px offset. `external` adds new-tab attributes and hidden text |

Removed from v1: `SiteFooter`, `ContactForm`, `Button`, and the `icons` variant of `SocialLinks`.

---

## 5. Content model

Content lives in `src/content/` and is validated with Astro content collections (`src/content.config.ts`, Zod schemas from `astro/zod`). Projects and companies are one Markdown file each. Short lists such as milestones and socials are single YAML/TS files.

### 5.1 Project (`src/content/projects/*.md`)

| Field | Type | Required | Used on |
|---|---|---|---|
| `title` | string | yes | Tile, row, detail `h1` |
| `type` | enum `software \| hardware \| research` | yes | Tile meta, row meta, filter, detail meta (displayed capitalised) |
| `year` | number | yes | Meta. Sorting (newest first) |
| `summary` | string (one line, about 60 chars or fewer) | yes | Home tile, detail lede, detail meta description |
| `description` | string (about two lines, roughly 200 chars) | yes | Projects row. Fallback for the detail body |
| `icon` | enum of `ProjectIcon` names | yes | All three views |
| `featured` | boolean | no (default false) | Selects the 4 Home tiles (3.1) |
| `order` | number | no | Tie-breaker within a year |
| `repo` | URL | no | "View on GitHub" link on the detail page |
| `url` | URL | no | Live site. Not rendered in v1. Reserved so a "Visit site" link can be added later |
| *body* | Markdown | no | Longer description on the detail page |

**v1 entries (placeholder content, matching the mockup's 6 rows).** Two real projects with their real repo URLs, plus four placeholders. Placeholder entries use the mockup's copy ("Project name", "One line on what it does", "Two lines on the problem, what you built, and the tools you used.") and a short placeholder Markdown body. Placeholders have no `repo`, so the detail page is exercised both with and without the GitHub link.

| File | `title` | `type` | `year` | `icon` | `featured` | `repo` |
|---|---|---|---|---|---|---|
| `live-chess-analysis.md` | Live Chess Analysis | software | 2026 | `window` | yes | `https://github.com/TeijeKoolenbrander/Live-Chess-Analysis` |
| `cs-uy-6613.md` | CS-UY 6613 – Artificial Intelligence | research | 2026 | `chart` | yes | `https://github.com/TeijeKoolenbrander/CS-UY6613` |
| `placeholder-hardware-2025.md` | Project name | hardware | 2025 | `chip` | yes | — |
| `placeholder-software-2025.md` | Project name | software | 2025 | `layers` | yes | — |
| `placeholder-hardware-2024.md` | Project name | hardware | 2024 | `signal` | no | — |
| `placeholder-software-2023.md` | Project name | software | 2023 | `rings` | no | — |

The two real projects' summary, description, type and icon are placeholder guesses until real copy is written (5.6). The type mix keeps every filter value (Software, Hardware, Research) populated.

### 5.2 Company (`src/content/companies/*.md`)

| Field | Type | Required | Used on |
|---|---|---|---|
| `name` | string | yes | Home row, Companies entry |
| `summary` | string (1–2 sentences) | yes | Home row |
| `description` | string (2–3 sentences) | yes | Companies page |
| `founded` | number (year) | yes | "Founded 2025". Sorting, newest first |
| `website` | URL | no | **Left empty in v1.** When set, `CompanyEntry` shows it as a link (new tab) |
| `websiteLabel` | string | no | Display text, e.g. "companyname.com". If omitted, derived from `website` |
| `logo` | image (local, via `image()`) | no | Real logo |
| `mark` | enum `circle-line \| squares \| triangle` | no | Placeholder line mark used when there is no `logo` |

**v1 entries:** three placeholders matching the mockup: "Company name", founded 2025 (`circle-line`), 2024 (`squares`), 2023 (`triangle`), with the mockup's placeholder summary and description copy. No `website`, no `logo`.

### 5.3 Milestone (`src/content/milestones.yaml`, `file()` loader)

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | Required by the `file()` loader |
| `label` | string | yes | "Now" or a year |
| `title` | string | yes | "Graduated in computer engineering" |
| `note` | string | no | Italic one-liner |
| `current` | boolean | no | Renders the hollow dot. In the mockup this is only "Now" |
| `order` | number | yes | Display order, top to bottom |

v1 entries: the five mockup milestones with the mockup's placeholder notes.

### 5.4 Social link (`src/data/socials.ts`)

`{ id, label, url, icon }`. One plain typed TS array, which is simpler than a collection. Array order is display order everywhere (Contact, JSON-LD `sameAs`):

| `id` | `label` | `url` | `icon` |
|---|---|---|---|
| `github` | GitHub | `https://github.com/TeijeKoolenbrander/` | `brand-github` |
| `linkedin` | LinkedIn | `https://www.linkedin.com/in/teije-koolenbrander-359759263/` | `brand-linkedin` |
| `instagram` | Instagram | `https://www.instagram.com/tkoolenbrander/` | `brand-instagram` |
| `spotify` | Spotify | `https://open.spotify.com/user/31iortitby7776a52zxl6zz4lnru` | `brand-spotify` |
| `netease` | NetEase Cloud Music | `https://music.163.com/#/user/home?id=2139063693` | `music` |

### 5.5 Site settings (`src/data/site.ts`)

`{ name: "Teije Koolenbrander", wordmark: "Teije X. W. Koolenbrander", tagline, email: "contact@teijekoolenbrander.com", url: "https://www.teijekoolenbrander.com" }`.

`contact@teijekoolenbrander.com` is the **only** public email address. No other address may appear anywhere in the site or its source. `site.url` must equal `site` in `astro.config.mjs`.

Page-specific prose that appears only once (hero intro, About bio, "Off the clock", page subtitles) stays in the page files. It does not need a collection.

### 5.6 Placeholder content policy

**All text in v1 is placeholder.** Build with the mockup's copy and the placeholder entries above, so every page looks like its mockup. Real copy is written **after** the site is finished, and only content files and page prose should need to change (no component or layout changes). Deferred items are listed in section 11.2.

---

## 6. Visual design summary

`docs/design.md` (by the designer) is the detailed reference, including the project detail page and the 404. This is the summary.

- **Colour:** pure black `#000` on pure white `#fff`, with no other colours. **Light theme only**: no dark mode in the mockups.
- **Typeface:** **Newsreader** (serif, SIL Open Font License). The mockups use weight 400 roman and italic. All headings are weight 400. Italic carries the subtitles, taglines and secondary lines. Fallback: Georgia, "Times New Roman", serif.
  - **Plan:** self-host via `@fontsource-variable/newsreader` instead of the Google Fonts CDN.
- **Proprietary font flag:** the mockup boilerplate defines `anthropic-sans` / `anthropic-serif` (`--font-sans`). These are proprietary and **must not be used**. They only style the mockup's fake URL strip, which is not part of the site.
- **Type scale (px):** 92 (home name) · 84 (page h1) · 56 / 52 (mobile titles) · 40 · 34 · 30 (section h2) · 26 · 24 · 22 (italic subtitles) · 20 · 18 · 17 (body long-form) · 16 (body/nav) · 15 · 14 (meta). Large titles use tight leading (0.9–0.92) and negative tracking (−0.035em).
- **Lines and shapes:** 1px solid black rules and borders throughout. **Border radius 0** everywhere. The only round things are the timeline dots and the vias in the drawings.
- **Interaction language:** links underline on hover (1px, offset 6px). Cards (project tiles) show a 1px inset outline at −5px on hover. Focus uses a visible 1px outline at offset 3px.
- **Spacing:** page gutter of 36px (20px mobile). Sections have 40–56px vertical padding. Grid gaps are 24–40px. Column ratios are 1 : 1.3 (most splits) and 0.85 : 1.3 (About).
- **Motion:** SVG line-drawing (`stroke-dashoffset`, 1.6–2.4s ease-in-out) on page load, plus one fade. All CSS, no JS. Disabled under `prefers-reduced-motion`.
- **Icons:** the 5 Tabler glyphs used on Contact (`brand-github`, `brand-linkedin`, `brand-instagram`, `brand-spotify`, `music`) are inlined as SVG from `@tabler/icons` (MIT), replacing the mockup's jsDelivr webfont. All other icons, logo marks and illustrations are custom inline SVG Astro components.
- **No third-party requests:** Google Fonts and jsDelivr are both removed in the build.
- **Max width:** content container `max-width: 960px`, centred (final value per `docs/design.md`).

---

## 7. Responsive behaviour

The mockups define **one breakpoint, `max-width: 600px`**. At that width:

| Element | Desktop | 600px and below |
|---|---|---|
| Page gutter | 36px | 20px |
| Home name `h1` | 92px | 52px |
| Page title `h1` | 84px | 56px |
| Two-column grids (hero intro, About bio, Off the clock, company rows/entries) | 2 columns | 1 column |
| Home project tiles | 2×2 | 1 column |
| Project rows | icon / content / meta | icon / content, with meta under the description |
| Contact details | per `docs/design.md` | 1 column |
| Project detail | per `docs/design.md` | per `docs/design.md` |
| Header | wordmark and nav on one row | nav wraps below the wordmark (no hamburger) |
| Title drawings (200px) | right of `h1` | wrap below `h1` (flex-wrap) |

Defaults where the mockups are silent:
- Fluid type between breakpoints (`clamp()`) so the 92px/84px titles don't overflow between roughly 600 and 800px, e.g. `clamp(52px, 11vw, 92px)` for the home name.
- Above about 1000px, centre the content at the max width (section 6).
- The About timeline keeps its 72px gutter on mobile. This works down to 320px.
- Tap targets: all links and filter buttons have a hit area of at least 24×24px.

---

## 8. Tech stack — *Approved*

**Stack:** Astro 7 (static output) + TypeScript (strict), plain CSS with custom properties, Markdown/YAML content collections, `@astrojs/sitemap`. Hosted as plain files on **GoDaddy** web hosting.

Versions checked on 2026-10-18: `astro` 7.4.0 (needs Node ≥ 22.22), `@astrojs/sitemap` 3.7.4, `@fontsource-variable/newsreader` 5.3.0, `@tabler/icons` 3.49.0. Re-check with `npm view <pkg> version` at scaffold time.

**Why:**
- The site is almost entirely static content. Astro outputs plain HTML and CSS and ships **zero JS by default**. Only the Projects filter needs a few lines of inline script.
- Content collections give type-checked project and company data, so adding a project (and its detail page) means adding one Markdown file.
- Scoped component CSS plus a small set of custom properties fits the tiny two-colour design. No CSS framework.
- The output is a folder of static files, which is exactly what GoDaddy shared hosting serves. No server, database or CMS.

### 8.1 Build configuration (GoDaddy constraints)

The site must be **pure static output** (`dist/`) that can be uploaded as-is to GoDaddy web hosting over cPanel File Manager, FTP or SFTP.

- `output: 'static'` (Astro default). **No SSR adapter, no server islands, no on-demand routes, no serverless functions, no host-specific features** (no Netlify/Vercel/Cloudflare config files, redirects files or edge functions).
- `site: 'https://www.teijekoolenbrander.com'` (used by canonicals, sitemap, OG and JSON-LD).
- `build.format: 'directory'` (Astro default, set explicitly) so pages build as `about/index.html` and work on Apache without rewrites.
- `trailingSlash: 'always'`, so dev matches Apache's behaviour (Apache `mod_dir` redirects `/about` → `/about/`). All internal links are written with a trailing slash.
- Root-relative asset paths (`/_astro/...`); the site is deployed at the web root (`public_html/`), not a subfolder.

### 8.2 `.htaccess` (`public/.htaccess`)

Astro copies `public/` to the root of `dist/`, so this ends up as `dist/.htaccess` and is uploaded to `public_html/.htaccess`. It handles:

1. **Custom 404:** `ErrorDocument 404 /404.html`.
2. **HTTP → HTTPS and bare domain → www** in a single 301, e.g. with `mod_rewrite`: if `HTTPS` is off **or** the host is not `www.teijekoolenbrander.com`, redirect to `https://www.teijekoolenbrander.com%{REQUEST_URI}`.
3. Optional, low-risk extras: long cache headers for `/_astro/*` (hashed file names), short caching for HTML, and `Options -Indexes`.

Notes:
- The bare-domain redirect only works via `.htaccess` if `teijekoolenbrander.com` points at the same hosting account. Otherwise it is set up with GoDaddy's domain forwarding (301 to `https://www.teijekoolenbrander.com`). Either way it is configured at the host, not in Astro.
- HTTPS requires an SSL certificate on the GoDaddy plan for both `www` and the bare domain.
- Dotfiles are easy to miss: some FTP clients hide them. The deploy checklist must confirm `.htaccess` is on the server.
- The rules can't be tested with `astro preview`; they are verified on the live host in M9.

### 8.3 Deployment

Build locally (`npm run build`), then upload the **contents** of `dist/` (including `.htaccess`) to `public_html/`. The exact method (cPanel upload, FTP/SFTP client, or a scripted/CI FTP deploy) depends on the GoDaddy plan and access (Open Question 1). GoDaddy **Website Builder** plans cannot host custom code; a plan with cPanel (Web Hosting) or equivalent file access is required. There are no preview deploys; use `npm run preview` locally.

### 8.4 Folder structure

```
website/
├─ docs/
│  ├─ plan.md                 # this file
│  ├─ design.md               # by the designer
│  └─ ui/                     # original mockups (reference only)
├─ public/
│  ├─ .htaccess               # 404, HTTPS + www redirects (section 8.2)
│  ├─ favicon.svg
│  ├─ og-default.png          # Open Graph fallback image
│  └─ robots.txt
├─ src/
│  ├─ components/
│  │  ├─ layout/              # SiteHeader.astro
│  │  ├─ ui/                  # TextLink, SectionHeader, PageTitle, Icon, SocialLinks
│  │  ├─ projects/            # ProjectTile, ProjectRow, ProjectFilter, ProjectIcon, ProjectDetail
│  │  ├─ companies/           # CompanyRow, CompanyEntry, CompanyLogo
│  │  ├─ about/               # Timeline, TimelineItem
│  │  └─ drawings/            # HeroTraceWave, AboutMark, ProjectsMark, CompaniesMark, ContactMark
│  ├─ content/
│  │  ├─ projects/            # one .md per project (slug = file name)
│  │  ├─ companies/           # one .md per company
│  │  └─ milestones.yaml
│  ├─ data/
│  │  ├─ site.ts
│  │  └─ socials.ts
│  ├─ assets/                 # images processed by astro:assets (portrait, logos, later)
│  ├─ layouts/
│  │  └─ BaseLayout.astro
│  ├─ pages/
│  │  ├─ index.astro
│  │  ├─ about.astro
│  │  ├─ projects/
│  │  │  ├─ index.astro       # /projects/
│  │  │  └─ [slug].astro      # /projects/<slug>/ via getStaticPaths
│  │  ├─ companies.astro
│  │  ├─ contact.astro
│  │  └─ 404.astro
│  ├─ styles/                 # owned by the designer (tokens.css, global.css)
│  └─ content.config.ts
├─ astro.config.mjs
├─ tsconfig.json
└─ package.json
```

Conventions: components in PascalCase `.astro`. Content files in kebab-case slugs (`my-project.md`). Images go in `src/assets/` and are rendered with `<Image>` from `astro:assets`. No CSS framework. `src/styles/` and `docs/design.md` are maintained by the designer.

---

## 9. Non-functional requirements

### Accessibility (WCAG 2.1 AA)
- Semantic landmarks: `header`, `nav[aria-label="Main"]`, `main`. A skip-to-content link is the first focusable element.
- One `h1` per page, with headings in logical order. Keep the mockup's levels (Home tiles and rows use `h3` under `h2`; Companies entries use `h2`).
- Decorative SVGs have `aria-hidden="true"`. New-tab links announce "(opens in new tab)".
- `aria-current` on the active nav item. Filter buttons use `aria-pressed`.
- Visible focus on every interactive element (1px black outline, as in the mockups).
- Contrast: black on white passes everywhere.
- All animation respects `prefers-reduced-motion`. No content is hidden until an animation runs.
- The site works fully without JavaScript. Only filtering is lost (all projects shown).

### Performance
- Lighthouse 95+ in all four categories on mobile, for every page.
- Total JS: 0 KB on every page except Projects (under 2 KB, inline).
- Fonts: one self-hosted variable WOFF2 (roman, plus italic only if needed), preloaded, `font-display: swap`. No third-party requests.
- LCP under 1.5s and CLS under 0.05 on a mid-range phone over 4G. Images get explicit dimensions and lazy loading below the fold.

### SEO
- Unique `<title>` and `<meta name="description">` per page. Pattern: `"{Page} — Teije Koolenbrander"`, with Home just "Teije Koolenbrander" and project pages "{Project title} — Teije Koolenbrander".
- Canonical URLs on `https://www.teijekoolenbrander.com` with trailing slashes. `sitemap-index.xml` via `@astrojs/sitemap` (includes all project detail pages, excludes 404). `robots.txt` pointing to `https://www.teijekoolenbrander.com/sitemap-index.xml`.
- Open Graph and Twitter card tags (`og:title`, `og:description`, `og:image` as an absolute URL, `og:url`), with a default OG image.
- `Person` JSON-LD on Home: `name` "Teije Koolenbrander", `url` `https://www.teijekoolenbrander.com/`, `email` `mailto:contact@teijekoolenbrander.com`, and `sameAs` generated from `socials.ts` in order (GitHub, LinkedIn, Instagram, Spotify, NetEase Cloud Music).
- `lang="en"` on `<html>`.

### Privacy
- No analytics, trackers, cookies or third-party embeds.
- No Google Fonts or CDN requests.

### Maintainability
- `npm run build` must pass type checks (`astro check`) and content schema validation.
- Adding a project (with its detail page) or a company only requires adding a Markdown file.
- Replacing placeholder copy requires no component changes (5.6).

---

## 10. Out of scope / later

- **Site footer** (Now/Links text links and social icons from the mockups), and the **Now** and **Links** pages it would link to.
- **Contact form** (removed by owner decision; email link only).
- Company detail pages, and company website links (the `website` field exists; turning links on is a content change).
- Project "Visit site" links (the `url` field exists but is not rendered) and previous/next navigation between project pages.
- Blog or writing section.
- Dark mode.
- Multi-language support (e.g. Dutch or Chinese versions).
- CMS or admin UI. Content is edited as Markdown in the repo.
- Live "now playing" from Spotify or NetEase.
- Analytics.
- Filter state in the URL (`?type=hardware`) and filter counts.
- A downloadable CV.

---

## 11. Open questions and decisions

### 11.1 Open questions for the owner

1. **GoDaddy plan and deploy access.** Which GoDaddy product is it: cPanel Web Hosting (works) or Website Builder (cannot host custom code)? Is SSL active for both `www` and the bare domain? Does the bare domain point at the same hosting (so `.htaccess` can redirect it) or should GoDaddy domain forwarding be used? How should we upload: you upload `dist/` yourself, or you provide FTP/SFTP credentials (shared securely, never committed) for a manual or scripted deploy? *Blocks M9 only.*
2. **Favicon and share image.** *Default: we make a simple favicon in the site style (black line mark on white) and a default Open Graph image with your name.* Tell us only if you have your own.
3. **Analytics.** *Default: none.* Tell us only if you want privacy-friendly stats.
4. **Name display.** The header wordmark shows "Teije X. W. Koolenbrander", while page titles and SEO use "Teije Koolenbrander". *Default: keep both as in the mockup.*

### 11.2 Deferred — after build (not blockers)

Real content replaces placeholders after the site is finished (5.6):
- Real copy: Home intro and tagline, About bio, "Off the clock" text, page subtitles.
- Portrait for About (black and white, 4:5, ideally at least 1200×1500px).
- Timeline: confirm the milestones/years and write the real notes.
- Project details: the full project list, and for each project type, year, summary, description, icon, body text and repo; which 4 are featured on Home.
- Company details: names, summaries, descriptions, founding years, logos, and later whether to show website links.
- Whether to show NetEase's Chinese name (网易云音乐) alongside the English label.

### 11.3 Resolved (owner decisions, 2026-10-18)

| Topic | Decision |
|---|---|
| Stack | Astro (static) + TypeScript + plain CSS. Approved |
| Domain | `https://www.teijekoolenbrander.com` is canonical. Bare domain → www and HTTP → HTTPS via 301 at the host |
| Hosting | GoDaddy web hosting, pure static upload. Directory-style URLs. `public/.htaccess` for 404 and redirects |
| Contact form | Removed. Contact page shows email and socials only |
| Email | `contact@teijekoolenbrander.com`, the only public address. Plain `mailto:` link |
| Footer | Not in v1. No `/now/` or `/links/` pages |
| Project links | Tiles and rows open `/projects/<slug>/` detail pages, which link to the GitHub repo when present |
| Home projects | 4 tiles chosen by the `featured` flag (fallback: newest) |
| Company links | No links on company entries in v1. Optional `website` field kept. Home rows link to `/companies/` |
| Social links | Five profiles in the order of 2.3, external links open in a new tab |
| Content | All copy is placeholder for v1. Real copy after build |

---

## 12. Milestones

The build covers all pages in one pass, locally. Nothing is deployed until M9, which needs the owner's OK. Acceptance criteria are listed under each task. `docs/design.md` is the visual reference for every milestone.

### M0 — Project setup
- **M0.1** Scaffold Astro 7 + TypeScript (strict) in the repo root and init a git repo. Configure `astro.config.mjs` per 8.1 (`site`, `output: 'static'`, `build.format: 'directory'`, `trailingSlash: 'always'`, sitemap integration). No adapter.
  - *Done when:* `npm run dev` and `npm run build` work, `astro check` passes, `dist/` contains only static files, and the first commit exists.

### M1 — Layout and tokens
- **M1.1** Wire in the designer's `src/styles/` (tokens, global), self-hosted Newsreader, and base link and focus styles.
  - *Done when:* there are no requests to Google Fonts or jsDelivr, and the type matches the mockup.
- **M1.2** Build `BaseLayout` (head meta, canonical, skip link) and `SiteHeader`. Add `site.ts` and `socials.ts`.
  - *Done when:* nav order and active state match the mockup on every route, there is no footer, and canonicals use `https://www.teijekoolenbrander.com` with trailing slashes.
- **M1.3** Add the content collections (projects, companies, milestones) with schemas and the placeholder entries from section 5.
  - *Done when:* an invalid content file fails the build, and the 6 project, 3 company and 5 milestone entries load.

### M2 — Home
- **M2.1** Build the hero and `HeroTraceWave` with its animation and reduced-motion fallback.
  - *Done when:* it matches the mockup at 1280px and 375px, and the animation is disabled under reduced motion.
- **M2.2** Build `SectionHeader`, `ProjectTile`, `ProjectIcon`, `CompanyRow`.
  - *Done when:* Home shows 4 featured tiles linking to `/projects/<slug>/` and 3 company rows linking to `/companies/`, all from content files.

### M3 — Projects and project detail
- **M3.1** Build `PageTitle`, the `ProjectsMark` drawing, `ProjectRow` and the list sorted by year descending.
  - *Done when:* it matches the mockup, rows link to `/projects/<slug>/`, and the mobile layout moves the meta under the description.
- **M3.2** Build `ProjectFilter` with progressive enhancement.
  - *Done when:* `aria-pressed` toggles, filtering works by keyboard, and without JS all rows show and the filter is hidden.
- **M3.3** Build `src/pages/projects/[slug].astro` per 3.4 and `docs/design.md`.
  - *Done when:* one page per content file is generated as `dist/projects/<slug>/index.html`; each shows back link, icon, title, "Type, Year", summary and body (or `description` fallback); "View on GitHub" appears only for entries with `repo` and opens in a new tab with `rel="noopener noreferrer"`; "Projects" is shown active in the header.

### M4 — Companies
- **M4.1** Build `CompanyEntry`, `CompanyLogo` (placeholder marks plus optional real logo image) and the `CompaniesMark` drawing.
  - *Done when:* entries render from content sorted by founding year descending, show "Founded YYYY" with no link, and adding a `website` to an entry (tested locally, then reverted) renders the link without code changes.

### M5 — About
- **M5.1** Add the `AboutMark` drawing and the photo and bio section (bordered placeholder; optional image prop).
- **M5.2** Build `Timeline` from `milestones.yaml`, with a hollow dot for `current`.
  - *Done when:* it matches the mockup at desktop and mobile widths.
- **M5.3** Build "Off the clock" with Spotify and NetEase links taken from `socials.ts`.
  - *Done when:* both links open in a new tab and announce it to screen readers.

### M6 — Contact
- **M6.1** Add the `ContactMark` drawing, the email link (`mailto:contact@teijekoolenbrander.com`, from `site.email`), `Icon` and `SocialLinks` (list variant). Layout per `docs/design.md`.
  - *Done when:* there is no form and no JS on the page, and neither the mockup's placeholder address nor `teijekool@gmail.com` appears anywhere in `src/` or `dist/`.

### M7 — 404 and SEO
- **M7.1** Build `404.astro` and `public/.htaccess` (8.2).
  - *Done when:* `dist/404.html` and `dist/.htaccess` exist, and the 404 page is `noindex`.
- **M7.2** Add titles and meta descriptions, OG/Twitter tags, the default OG image, the favicon (OQ 2 default), `robots.txt`, the sitemap, and `Person` JSON-LD.
  - *Done when:* `sitemap-index.xml` lists every page including all project detail pages, all absolute URLs use `https://www.teijekoolenbrander.com`, and JSON-LD `sameAs` is generated from `socials.ts`.

### M8 — QA
- **M8.1** Accessibility pass: axe with zero violations, keyboard-only walkthrough, screen reader spot-check, 200% zoom and 320px width checks.
- **M8.2** Performance and SEO pass on `npm run preview`: Lighthouse 95+ on all pages on mobile, OG tags checked, JSON-LD validated, no third-party requests.
- **M8.3** Static-hosting check: serve `dist/` with a plain static server and click through every route and link with trailing slashes; no broken internal links.
  - *Done when:* all three passes are clean and every page matches its mockup (or `docs/design.md`) at 1280px and 375px.

### M9 — GoDaddy deploy (needs owner OK)
- **M9.1** With the owner's go-ahead and access from OQ 1, upload the contents of `dist/` (including `.htaccess`) to `public_html/`.
  - *Done when:* `https://www.teijekoolenbrander.com/` serves the site with a valid certificate; `http://teijekoolenbrander.com/about/`, `http://www.teijekoolenbrander.com/about/` and `https://teijekoolenbrander.com/about/` each 301 in one hop to `https://www.teijekoolenbrander.com/about/`; an unknown URL returns status 404 with the custom page; `/about` (no slash) reaches `/about/`.
- **M9.2** Write a short deploy checklist in the README (build, upload, confirm `.htaccess`, smoke-test the URLs above).

### After build
Replace placeholder content (11.2). Later features only if requested (section 10).
