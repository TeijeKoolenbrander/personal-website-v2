# Teije Koolenbrander — Personal Website Specification

**Status:** v1.2 (2026-10-18). The stack is approved and the site is built. This file is the single source of truth for the project.
**Owner:** Teije Koolenbrander
**Source of truth for UI:** the HTML mockups in `docs/ui/`, plus `docs/design.md` (by the designer) for anything the mockups don't cover, such as the project detail page. Where this document and a mockup disagree, the mockup wins, except where an owner decision recorded here (section 11) says otherwise.

**Changelog**
- **v1.2 (2026-10-18):** Hosting moved from GoDaddy to **Cloudflare Pages**, with automatic deploys from GitHub `main` and DNS moved to Cloudflare. `.htaccess` is replaced by `public/_headers` plus Cloudflare Redirect Rules and "Always Use HTTPS". The GoDaddy guide, zip script and `npm run package` are removed. The real content is now recorded: 4 projects (new `coursework` type, plus `dice` and `gamepad` icons), 1 company, the About copy, a colour portrait and the 5-entry timeline. `docs/ui/` and `.claude/` are gitignored, and the repo is on GitHub.
- v1.1 (2026-10-18): Owner decisions incorporated and the stack approved (GoDaddy hosting).

| Page | Mockup file |
|---|---|
| Home | `docs/ui/teije_koolenbrander_home_page_white_v3.html` |
| About | `docs/ui/teije_koolenbrander_about_page.html` |
| Projects | `docs/ui/teije_koolenbrander_projects_page.html` |
| Project detail | No mockup. Specified in `docs/design.md` using the same visual language |
| Companies | `docs/ui/teije_koolenbrander_companies_page.html` |
| Contact | `docs/ui/teije_koolenbrander_contact_page.html` (ignore its form and footer, see 3.6) |

> **Mockups are local only.** `docs/ui/` is gitignored. It holds the owner's mockups and his original portrait photo, so it is not in the GitHub repo. Anyone working from a fresh clone needs the owner to supply these files.

> **Reading the mockups.** Each file starts with about 2,500 lines of design-tool boilerplate CSS (`--font-anthropic-sans`, `--gray-*`, `--clay`, etc.). This is identical in all five files and is **not** part of the design. The real page starts at `<div class="tk">` near the end of each file, with its own short `<style>` block. Also not part of the design: the centred URL strip at the top of each mockup (e.g. `teijekoolenbrander.com/about`, a fake browser address bar), the 12px rounded outer frame, and the 16px body padding. **The mockup footer (Now/Links links and social icons) and the Contact form are also excluded from v1** by owner decision.

### Source material: previous build

The owner has a previous build of this site (Next.js) at `C:\Users\teije\OneDrive\Desktop\8dou\personal_website`. It is **reference only**. Do not modify it, and do not copy its code or design. The social links in this spec were taken from it (`content/links.ts`). Nothing else from it is imported.

---

## 1. Overview

This is a personal portfolio site for Teije Koolenbrander, a computer engineering student at NYU Tandon (B.S. Computer Engineering, class of 2027) who builds software and hardware and founded a software studio in 2026. It shows who he is (About), what he has built (Projects, with a page per project), the company he has started (Companies), and how to reach him (Contact). The audience is likely potential collaborators, clients, employers, investors and peers who want a quick, credible overview. The look is a deliberately minimal, black-on-white, editorial style: a serif typeface, thin 1px rules and animated line drawings that turn circuit traces into water waves. The only colour on the site is the About portrait.

**Canonical URL:** `https://www.teijekoolenbrander.com` (owned by the owner). The bare domain `teijekoolenbrander.com` redirects (301) to `https://www.teijekoolenbrander.com/...`, and all `http://` requests are upgraded to HTTPS. Both are configured in Cloudflare, not in the repo (section 8.2).

---

## 2. Sitemap and routes

All routes use directory-style URLs with a trailing slash (built as `<route>/index.html`). Cloudflare Pages serves these directly and redirects `/about/index.html` to `/about/`.

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

Notation: font sizes in px are taken from the mockups. "(data)" means the content comes from a structured content source and is not hard-coded. Page prose that appears only once lives in the page files (5.5). The copy quoted below is the current text; the page file is authoritative if they differ.

### 3.1 Home `/`

| # | Section | Contents | Behaviour |
|---|---|---|---|
| 1 | Header | Shared header, "Home" active | — |
| 2 | Hero | `h1` "Teije / Koolenbrander" on two lines (92px, line-height 0.92, letter-spacing -0.035em; 52px at 600px and below). Below it, a two-column grid (1fr : 1.3fr, 24px gap, 32px top margin). Left: italic subheader **"B.S. Computer Engineering"** (22px, from `site.tagline`). Right: intro paragraph (16px, line-height 1.75): "I build software and hardware. Here you'll find exactly what I've been working on." | Grid collapses to one column at 600px and below |
| 3 | Signature illustration | Full-width inline SVG (viewBox 608×120). Circuit traces with right-angle bends and solder "vias" (filled dots plus one hollow ring) that turn into two sine-like waves. Decorative, `aria-hidden`. | On load, the lines draw themselves (stroke-dashoffset animation, 2.4s, 0.2s delay; the second wave starts at 0.9s) and the vias fade in at 1.6s. With `prefers-reduced-motion: reduce`, everything appears at once. |
| 4 | Projects preview | Section header: `h2` "Projects" (30px) on the left and the link "All projects" → `/projects/` on the right. Below it, a **2×2 grid of 4 project tiles** (data). Each tile has: a 44px line icon at top-left, "Type, Year" at top-right (14px, e.g. "Software, 2026"), and at the bottom the `h3` project name (26px) and an italic one-line summary (15px). Tiles have 1px black borders that collapse into a shared grid (−1px margins) and a minimum height of 190px. | Whole tile is a link to **`/projects/<slug>/`**. Hover shows an inset 1px outline (offset −5px) and underlines the `h3`. The 4 tiles are the projects with `featured: true`, newest first, then by `order`; if fewer than 4 are featured, fill with the newest non-featured ones. Currently all 4 projects are featured, so the tiles show the same order as the Projects list (5.1). Grid becomes 1 column at 600px and below. |
| 5 | Companies preview | Section header: `h2` "Companies" with the link "All companies" → `/companies/`. Below it, **one row per company** (data, newest first; currently 1). Each row is a two-column grid (1fr : 1.3fr) with the `h3` company name (34px) on the left and a 1–2 sentence `summary` (16px) on the right. Rows have a 1px top border, and the last row also has a bottom border. | Whole row is a link to `/companies/`, as in the mockup. Hover underlines the name. Rows stack at 600px and below. |

### 3.2 About `/about/`

| # | Section | Contents | Behaviour |
|---|---|---|---|
| 1 | Header | "About" active | — |
| 2 | Page title block | `h1` "About" (84px; 56px at 600px and below). A small 200×64 line drawing sits right-aligned on the same row: a wave that becomes a circuit trace, with two vias. Below: italic subtitle "From the pool to the workbench." (22px). | Line draws on load (1.8s). Reduced motion is respected. Title and drawing wrap on narrow screens. |
| 3 | Photo + bio | Two columns (0.85fr : 1.3fr, 32px gap). Left: the **colour portrait**, 4:5, with a 1px black border, rendered with `<Picture>` from `astro:assets` (see "Portrait" below). Right: three bio paragraphs (17px, line-height 1.75), which are the owner's real copy and live in `src/pages/about.astro`: NYU Tandon computer engineering student graduating in 2027; Dutch and Chinese, born in Shanghai, based in Beijing, New York and Singapore; always building software, hardware or both. | Stacks at 600px and below. The image has meaningful `alt` text and explicit dimensions, so it causes no layout shift. |
| 4 | Timeline "Along the way" | `h2` "Along the way". A vertical 1px line (indented 72px) with **5 milestones** (data, `milestones.yaml`). Each has a label in the left gutter (15px), a 7px dot on the line, a title (20px) and an italic one-line note (15px). The current item ("Now") has a **hollow** dot. Past items have **filled** dots. Entries: **Now** – Building my own company; **2027** – Computer Engineering, NYU Tandon; **2023** – First hardware project; **2021** – First coding project; **2005** – Born. | Static. |
| 5 | "Off the clock" | 1px top border. Two columns (0.85fr : 1.3fr): `h2` "Off the clock" on the left. On the right, a paragraph (real copy, in the page file) about former competitive swimming, basketball, small hardware projects and music, ending with links to Spotify and NetEase Cloud Music. The two service names are always-underlined inline links (URLs from the socials data, new tab). | Stacks at 600px and below. |

**Portrait.** A colour photo (not black and white), cropped 4:5 at 1148×1435px from the owner's original. The original is kept in `docs/ui/`, which is gitignored and never committed. `scripts/make-portrait.mjs` (run manually with `node scripts/make-portrait.mjs`) crops and resizes it into `src/assets/portrait.jpg`, which **is** committed. `<Picture>` then generates responsive AVIF/WebP/JPEG versions at build time. To replace the photo, update the original, re-run the script and commit the new `src/assets/portrait.jpg`.

### 3.3 Projects `/projects/`

| # | Section | Contents | Behaviour |
|---|---|---|---|
| 1 | Header | "Projects" active | — |
| 2 | Page title block | `h1` "Projects", with a 200×64 drawing of a trace that branches into three lines with two vias. Italic subtitle: "Things I've designed, built, and shipped." | Line draws on load, staggered (0s / 0.5s / 0.8s delays). |
| 3 | Type filter | `role="group"`, `aria-label="Filter projects by type"`. Text buttons (16px, no border or background): **All** followed by one button per type **that occurs in the project data**, generated at build time. Currently **All · Software · Coursework**. | The selected button has `aria-pressed="true"` and is underlined. Hover underlines. Clicking hides the rows that don't match (All shows everything). Adding a project with a new type (e.g. `hardware`) adds its button automatically. **Progressive enhancement:** without JS all projects are visible and the filter group is hidden (rendered with `hidden`, removed by the script). No URL state for the filter. |
| 4 | Project list | **One row per project** (data; currently 4), sorted newest first, then by `order`. Each row is a grid (52px icon column, flexible content, auto-width meta column) with 20px gap, 22px vertical padding and a 1px top border. The list also has a bottom border. Row content: 44px line icon; `h3` project name (24px); `description` (15px, about two lines); meta on the right (14px, right-aligned) showing Type on one line and Year on the next. | Whole row is a link to **`/projects/<slug>/`**. Hover underlines the `h3`. At 600px and below the grid becomes 44px + 1fr and the meta moves under the description. |

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
| 2 | Page title block | `h1` "Companies", with a 200×64 drawing of a staircase trace rising to the right, with three vias and an end ring. **No subtitle** (owner decision; `PageTitle`'s `subtitle` prop is optional). | Line draws on load. |
| 3 | Company list | **One entry per company** (data; currently 1) as `<article>` elements. Each is a two-column grid (1fr : 1.3fr, 32px gap, 36px vertical padding) with a 1px top border, and the list has a bottom border. Left column: a 72×72 **logo placeholder** (square outline with a simple geometric line mark), then the `h2` company name (40px). Right column: a 2–3 sentence `description` (17px) and a meta row (15px) with "Founded YYYY". | **No links on company entries in v1.** The `CompanyEntry` component renders the website link (always-underlined, new tab) after "Founded YYYY" only if `website` is set; current content leaves it empty, so the link can be turned on later by adding one field. Entries stack at 600px and below. Sorted newest first. |

Note that the Home page shows a **shorter** description for each company than the Companies page. The content model therefore has both `summary` and `description`.

### 3.6 Contact `/contact/`

| # | Section | Contents | Behaviour |
|---|---|---|---|
| 1 | Header | "Contact" active | — |
| 2 | Page title block | `h1` "Contact", with a 200×64 drawing of a trace that ends in a ring emitting three radio-wave arcs. Italic subtitle: "For work, collaborations, or to say hello." | The trace draws, then the arcs draw one after another (1.2s / 1.4s / 1.6s). |
| 3 | Details | Small label "Email" (15px). Below it, the address **contact@teijekoolenbrander.com** (24px, underlined, `word-break: break-all`), linked as `mailto:contact@teijekoolenbrander.com`. The value comes from `site.email`. Next, the label "Elsewhere" followed by a stacked list of the 5 social links (18px). Each row has a 20px Tabler icon and a text label, with 1px rules between rows and a rule at the bottom. | Hover underlines. Social data comes from `socials`, links open in a new tab. Plain `mailto:` link, no obfuscation. |

**No contact form** (owner decision): no form markup, no validation JS, no form service. With the form column gone, the layout of the details block on wide screens (e.g. single column, or email and "Elsewhere" side by side) is specified in `docs/design.md`.

The address is hosted on the owner's existing mail provider through the domain's **MX records**. These must be copied to Cloudflare DNS when the nameservers move, or mail to this address stops arriving (8.3, OQ 1).

### 3.7 404

Built from `src/pages/404.astro` to `dist/404.html`. Header (no nav item active), an `h1` (e.g. "Page not found"), one short line, and a link to `/`. **Cloudflare Pages serves `404.html` automatically** for any path that doesn't match a file. No config is needed. Because a top-level `404.html` exists, Pages does *not* fall back to its single-page-app behaviour of serving `/` for unknown paths. `<meta name="robots" content="noindex">`, excluded from the sitemap. Styling per `docs/design.md`.

---

## 4. Shared components

| Component | Used on | Variants / props | Notes |
|---|---|---|---|
| `BaseLayout` | All | `title`, `description`, `ogImage?`, `currentNav`, `noindex?` | `<head>` meta, canonical, OG, font, skip link, header. No footer |
| `SiteHeader` | All | `current: 'home' \| 'about' \| 'projects' \| 'companies' \| 'contact' \| null`, `currentIsSection?` | Wordmark plus nav. Active link gets `aria-current="page"` (or `"true"` on project detail pages) |
| `SocialLinks` | Contact | `variant: 'list'` | Icon, label and rules between rows. New tab with hidden "(opens in new tab)" |
| `Icon` | Contact | `name` | Inline SVG copied from Tabler (MIT). Replaces the CDN webfont |
| `PageTitle` | About, Projects, Companies, Contact | `title`, `subtitle?` (optional), slot for the drawing | 84px `h1`, a right-aligned 200×64 drawing and an italic subtitle. The subtitle element is not rendered when `subtitle` is omitted (Companies) |
| `LineDrawing` / per-page SVG components | All main pages | `HeroTraceWave` (Home 608×120), `AboutMark`, `ProjectsMark`, `CompaniesMark`, `ContactMark` | Shared `.ln` stroke style and `.draw` animation. Always `aria-hidden`. Respect reduced motion |
| `SectionHeader` | Home | `title`, `linkText`, `href` | `h2` on the left and a text link on the right, baseline-aligned |
| `ProjectTile` | Home | `project` | Bordered card for the 2×2 grid, links to `/projects/<slug>/`. Hover shows the inset outline |
| `ProjectRow` | Projects | `project` | List row with icon, text and meta, links to `/projects/<slug>/`. Has `data-type` for filtering |
| `ProjectFilter` | Projects | `types[]` | `types` is derived from the project data (unique types, in enum order). `aria-pressed` toggle buttons plus a small inline script |
| `ProjectIcon` | Home, Projects, Project detail | `name`, `size?` | Library of 44×44 line icons: `window` (terminal window), `chip`, `rings` (concentric circles), `chart`, `signal` (wifi arcs), `layers`, **`dice`**, **`gamepad`**. The name list is exported and reused by the content schema |
| `ProjectDetail` (or inline in `[slug].astro`) | Project detail | `project`, rendered body | Back link, icon, title, meta, summary, body, optional GitHub link |
| `CompanyRow` | Home | `company` | Compact row linking to `/companies/`, with name and summary |
| `CompanyEntry` | Companies | `company` | Full article with logo, name, description, founded year, and website link only if `website` is set |
| `CompanyLogo` | Companies | `logo?`, fallback `mark` | 72×72. Uses the real logo image if one is provided, otherwise a geometric placeholder mark (`circle-line`, `squares`, `triangle`) |
| `Timeline` / `TimelineItem` | About | `milestone`, `current` | Vertical rule, gutter label, hollow or filled dot |
| `TextLink` | Everywhere | `underline: 'hover' \| 'always'`, `external?` | Underline is 1px thick with a 6px offset. `external` adds new-tab attributes and hidden text |

The About portrait is rendered inline in `about.astro` with `<Picture>`. It is not a separate component.

Removed from v1: `SiteFooter`, `ContactForm`, `Button`, and the `icons` variant of `SocialLinks`.

---

## 5. Content model

Content lives in `src/content/` and is validated with Astro content collections (`src/content.config.ts`, Zod schemas from `astro/zod`). Projects and companies are one Markdown file each. Short lists such as milestones and socials are single YAML/TS files.

### 5.1 Project (`src/content/projects/*.md`)

| Field | Type | Required | Used on |
|---|---|---|---|
| `title` | string | yes | Tile, row, detail `h1` |
| `type` | enum `software \| hardware \| research \| coursework` | yes | Tile meta, row meta, filter, detail meta (displayed capitalised) |
| `year` | number | yes | Meta. Sorting (newest first) |
| `summary` | string (one line, about 60 chars or fewer) | yes | Home tile, detail lede, detail meta description |
| `description` | string (about two lines, roughly 200 chars) | yes | Projects row. Fallback for the detail body |
| `icon` | enum of `ProjectIcon` names (`window \| chip \| rings \| chart \| signal \| layers \| dice \| gamepad`) | yes | All three views |
| `featured` | boolean | no (default false) | Selects the 4 Home tiles (3.1) |
| `order` | number | no | Tie-breaker within a year (lower first) |
| `repo` | URL | no | "View on GitHub" link on the detail page |
| `url` | URL | no | Live site. Not rendered in v1. Reserved so a "Visit site" link can be added later |
| *body* | Markdown | no | Longer description on the detail page |

**Current entries (real content).** There are exactly 4 projects. All are featured, all are from 2026, and `order` sets the display order on Home and Projects:

| `order` | File | `title` | `type` | `year` | `icon` | `featured` | `repo` |
|---|---|---|---|---|---|---|---|
| 1 | `lucky-dice.md` | Lucky Dice | software | 2026 | `dice` | yes | `https://github.com/TeijeKoolenbrander/lucky_dice` |
| 2 | `live-chess-analysis.md` | Live Chess Analysis | software | 2026 | `window` | yes | `https://github.com/TeijeKoolenbrander/Live-Chess-Analysis` |
| 3 | `cs-uy-6613.md` | CS-UY 6613 – Artificial Intelligence | coursework | 2026 | `chart` | yes | `https://github.com/TeijeKoolenbrander/CS-UY6613` |
| 4 | `wechat-mini-games.md` | WeChat Mini Games | software | 2026 | `gamepad` | yes | `https://github.com/TeijeKoolenbrander/wechat-mini-programs-codebase` |

The filter therefore shows All / Software / Coursework. `hardware` and `research` stay in the enum for future projects. Their filter buttons appear automatically once a project uses them.

### 5.2 Company (`src/content/companies/*.md`)

| Field | Type | Required | Used on |
|---|---|---|---|
| `name` | string | yes | Home row, Companies entry |
| `summary` | string (1–2 sentences) | yes | Home row |
| `description` | string (2–3 sentences) | yes | Companies page |
| `founded` | number (year) | yes | "Founded 2026". Sorting, newest first |
| `website` | URL | no | **Empty for now.** When set, `CompanyEntry` shows it as a link (new tab) |
| `websiteLabel` | string | no | Display text, e.g. "companyname.com". If omitted, derived from `website` |
| `logo` | image (local, via `image()`) | no | Real logo |
| `mark` | enum `circle-line \| squares \| triangle` | no | Placeholder line mark used when there is no `logo` |

**Current entry (real content).** There is a single company:

| File | `name` | `founded` | `mark` | Content |
|---|---|---|---|---|
| `software-studio.md` | Software studio | 2026 | `circle-line` | Builds software, mainly WeChat mini programs and mini games, and also offers SaaS for companies. Not named yet. No `website`, no `logo` |

When the studio gets a name, update `name` (and `description`, which currently says it has no name yet). No code changes are needed.

### 5.3 Milestone (`src/content/milestones.yaml`, `file()` loader)

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | string | yes | Required by the `file()` loader |
| `label` | string | yes | "Now" or a year (quoted in YAML, e.g. `"2027"`) |
| `title` | string | yes | e.g. "Computer Engineering, NYU Tandon" |
| `note` | string | no | Italic one-liner |
| `current` | boolean | no | Renders the hollow dot. Only "Now" |
| `order` | number | yes | Display order, top to bottom |

Current entries (real content, top to bottom): `now` (Now, current), `graduation` (2027), `first-hardware` (2023), `first-code` (2021), `born` (2005). Titles are listed in 3.2.

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

`{ name: "Teije Koolenbrander", wordmark: "Teije X. W. Koolenbrander", tagline: "B.S. Computer Engineering", description, email: "contact@teijekoolenbrander.com", url: "https://www.teijekoolenbrander.com" }`. `description` is the default meta description: a computer engineering student who builds software and hardware, with links to his projects and the software company he founded.

`contact@teijekoolenbrander.com` is the **only** public email address. No other address may appear anywhere in the site or its source. `site.url` must equal `site` in `astro.config.mjs`.

Page-specific prose that appears only once (hero intro, About bio, "Off the clock", page subtitles) stays in the page files. It does not need a collection.

### 5.6 Content status

The site was built with placeholder copy first. **Real content is now in** for Home (subheader and intro), About (bio, "Off the clock", portrait, timeline), all 4 projects and the company. Further content changes should only touch content files, page prose and `src/assets/`, never components or layouts. The remaining content items are listed in section 11.2.

---

## 6. Visual design summary

`docs/design.md` (by the designer) is the detailed reference, including the project detail page and the 404. This is the summary.

- **Colour:** pure black `#000` on pure white `#fff`, with no other UI colours. **Light theme only**: no dark mode in the mockups. The About portrait is a colour photograph. It is the one intentional exception and is framed by the standard 1px black border.
- **Typeface:** **Newsreader** (serif, SIL Open Font License). The mockups use weight 400 roman and italic. All headings are weight 400. Italic carries the subtitles, taglines and secondary lines. Fallback: Georgia, "Times New Roman", serif.
  - **Plan:** self-host via `@fontsource-variable/newsreader` instead of the Google Fonts CDN.
- **Proprietary font flag:** the mockup boilerplate defines `anthropic-sans` / `anthropic-serif` (`--font-sans`). These are proprietary and **must not be used**. They only style the mockup's fake URL strip, which is not part of the site.
- **Type scale (px):** 92 (home name) · 84 (page h1) · 56 / 52 (mobile titles) · 40 · 34 · 30 (section h2) · 26 · 24 · 22 (italic subtitles) · 20 · 18 · 17 (body long-form) · 16 (body/nav) · 15 · 14 (meta). Large titles use tight leading (0.9–0.92) and negative tracking (−0.035em).
- **Lines and shapes:** 1px solid black rules and borders throughout. **Border radius 0** everywhere. The only round things are the timeline dots and the vias in the drawings.
- **Interaction language:** links underline on hover (1px, offset 6px). Cards (project tiles) show a 1px inset outline at −5px on hover. Focus uses a visible 1px outline at offset 3px.
- **Spacing:** page gutter of 36px (20px mobile). Sections have 40–56px vertical padding. Grid gaps are 24–40px. Column ratios are 1 : 1.3 (most splits) and 0.85 : 1.3 (About).
- **Motion:** SVG line-drawing (`stroke-dashoffset`, 1.6–2.4s ease-in-out) on page load, plus one fade. All CSS, no JS. Disabled under `prefers-reduced-motion`.
- **Icons:** the 5 Tabler glyphs used on Contact (`brand-github`, `brand-linkedin`, `brand-instagram`, `brand-spotify`, `music`) are inlined as SVG from `@tabler/icons` (MIT), replacing the mockup's jsDelivr webfont. All other icons (including `dice` and `gamepad`), logo marks and illustrations are custom inline SVG Astro components in the same 1px line style.
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

## 8. Tech stack and hosting — *Approved*

**Stack:** Astro 7 (static output) + TypeScript (strict), plain CSS with custom properties, Markdown/YAML content collections, `@astrojs/sitemap`. Hosted on **Cloudflare Pages** (free plan), deployed automatically from GitHub.

Versions checked on 2026-10-18: `astro` 7.4.0 (needs Node ≥ 22.22), `@astrojs/sitemap` 3.7.4, `@fontsource-variable/newsreader` 5.3.0, `@tabler/icons` 3.49.0. Re-check with `npm view <pkg> version` before upgrading.

**Why:**
- The site is almost entirely static content. Astro outputs plain HTML and CSS and ships **zero JS by default**. Only the Projects filter needs a few lines of inline script.
- Content collections give type-checked project and company data, so adding a project (and its detail page) means adding one Markdown file.
- Scoped component CSS plus a small set of custom properties fits the tiny two-colour design. No CSS framework.
- Cloudflare Pages serves a folder of static files from a global CDN for free, with HTTPS, Brotli, preview deploys and builds on every push. There is no manual upload step, no server, no database and no CMS.

### 8.1 Build configuration

The site is **pure static output** (`dist/`), built by Cloudflare Pages from the repo.

| Pages setting | Value |
|---|---|
| Repository | `https://github.com/TeijeKoolenbrander/personal-website-v2` |
| Production branch | `main` |
| Framework preset | Astro (or None; the commands below are what matter) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | From `.node-version` in the repo root (Node 22) |

- `output: 'static'` (Astro default). **No SSR adapter (`@astrojs/cloudflare` is not used), no server islands, no on-demand routes, no Pages Functions (`functions/` directory), no `_worker.js`, no `wrangler.toml`.** The only Cloudflare-specific file in the repo is `public/_headers` (8.2).
- `site: 'https://www.teijekoolenbrander.com'` (used by canonicals, sitemap, OG and JSON-LD).
- `build.format: 'directory'` (Astro default, set explicitly) so pages build as `about/index.html`.
- `trailingSlash: 'always'`. All internal links are written with a trailing slash, matching the canonical URLs.
- Root-relative asset paths (`/_astro/...`); the site is served at the domain root.
- **Node version:** the Pages v3 build image defaults to Node 22.16.0, which is **below Astro 7's minimum of 22.22**. Pages reads `.node-version` (or `.nvmrc`, or a `NODE_VERSION` env var). `.node-version` must resolve to Node 22.22 or later. If the build log shows an older 22.x with a bare `22`, pin the full version (e.g. `22.22.0`) instead. Pages ignores `package.json` `engines`.
- `npm run build` runs `astro check` and then `astro build`, so type or schema errors fail the Pages build and the previous deployment stays live.

### 8.2 Headers, redirects and HTTPS (`public/_headers` + Cloudflare dashboard)

This replaces the old `public/.htaccess`. Responsibilities are split between one file in the repo and two zone settings in the Cloudflare dashboard.

| Concern | Where | How |
|---|---|---|
| Custom 404 | Pages (automatic) | `dist/404.html` is served for unmatched paths. No config |
| `/x/index.html` → `/x/` | Pages (automatic) | Built-in redirect |
| HTTP → HTTPS | Dashboard: SSL/TLS → Edge Certificates → **Always Use HTTPS** = On | Zone setting, covers apex and www |
| Apex → www (301) | Dashboard: Rules → **Redirect Rule** | Wildcard pattern `https://teijekoolenbrander.com/*` → `https://www.teijekoolenbrander.com/${1}`, status **301**, **preserve query string** on |
| Caching and security headers | `public/_headers` (copied to `dist/_headers`) | See below |

**DNS for the redirect:** the apex needs a **proxied** (orange-cloud) DNS record so that requests reach Cloudflare and the Redirect Rule can run. Adding `teijekoolenbrander.com` as a second custom domain on the Pages project creates that record and a certificate for it. `www` is the primary custom domain.

**`public/_headers`** (Pages syntax: a URL pattern on its own line, indented `Name: value` lines below it, `#` comments, at most 100 rules and 2,000 characters per line):
- `/*`: security headers `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options: DENY` and a restrictive `Permissions-Policy`. **No Content-Security-Policy** in v1: the inline JSON-LD and the Projects filter script would need hashes, which is extra upkeep for little gain on a static site with no user input. This can be revisited later.
- HTML: short caching, with revalidation. Cloudflare's own advice is to keep custom caching minimal, since Pages already sends ETags and purges its edge cache on every deploy.
- `/_astro/*`: `Cache-Control: public, max-age=31536000, immutable`. The file names are content-hashed, so this is safe.
- **Watch out for overlapping rules.** A request that matches several rules receives the headers from all of them, and a header that appears twice has its values joined with commas. Because `/_astro/*` also matches `/*`, a `Cache-Control` set in both rules produces a conflicting merged value. Either keep `Cache-Control` out of `/*`, or detach it in the narrower rule with `! Cache-Control` before setting the new value. The same applies to `/favicon.svg` and `/og-default.png`.
- Recommended: a rule for `https://:project.pages.dev/*` that adds `X-Robots-Tag: noindex`, so the `*.pages.dev` copy and preview deploys aren't indexed as duplicates of the canonical site.

Optional, after the site has run on HTTPS without problems for a while: enable HSTS in the dashboard (start with a short max-age, without preload).

The headers and redirects can't be tested with `astro preview`. They are verified on the `*.pages.dev` URL and the live domain in M9.

### 8.3 Deployment and domain

**Deploys.** Every push to `main` triggers a Pages production build and deploy (`npm run build` → `dist`). Pushes to other branches and pull requests get **preview deployments** on `*.pages.dev` URLs. To roll back, redeploy an earlier build from the Pages dashboard. There is no manual upload, zip or FTP step. The full owner-facing guide is `docs/deploy-cloudflare.md` (maintained by devops).

**Domain and DNS.**
- `teijekoolenbrander.com` **stays registered at GoDaddy**. Only its **nameservers** change, to the two Cloudflare assigns when the zone is added (free plan). This is required because Pages can only serve an apex domain from a zone on Cloudflare in the same account as the Pages project.
- **Before** switching nameservers, check the records Cloudflare imported against GoDaddy's DNS zone. In particular, make sure the email records are copied exactly:
  - all **MX** records (same priorities),
  - the **SPF** TXT record, **DKIM** records (TXT or CNAME) and any **DMARC** TXT record,
  - any mail-related CNAMEs (e.g. `autodiscover`, `mail`),
  - and any verification TXT records.
  Mail records must be **DNS only (grey cloud)**. Cloudflare does not proxy mail.
- GoDaddy's old A/CNAME records for the web (parked page or old hosting) are dropped. Pages creates the `www` CNAME and the apex record when the custom domains are added. Add domains through the Pages dashboard first, since a manually created CNAME alone fails with a 522 error.
- After the switch: send a test email to `contact@teijekoolenbrander.com` from an outside account and confirm it arrives, and send a reply to confirm outgoing mail passes SPF/DKIM.
- GoDaddy web hosting (if there is a plan) is no longer used and can be cancelled once the site is live on Pages. The domain registration must **not** be cancelled.

**Git.** The code is on GitHub at `TeijeKoolenbrander/personal-website-v2`, committed under the owner's own identity. `docs/ui/` (mockups and the original portrait) and `.claude/` are gitignored. So are `dist/`, `node_modules/`, `.astro/` and `.env*`.

### 8.4 Folder structure

```
website/
├─ docs/
│  ├─ plan.md                 # this file
│  ├─ design.md               # by the designer
│  ├─ deploy-cloudflare.md    # Cloudflare Pages + DNS guide (devops)
│  └─ ui/                     # GITIGNORED: original mockups + original portrait (local only)
├─ public/
│  ├─ _headers                # Cloudflare Pages caching + security headers (section 8.2)
│  ├─ favicon.svg
│  ├─ og-default.png          # Open Graph fallback image
│  └─ robots.txt
├─ scripts/
│  └─ make-portrait.mjs       # docs/ui original → src/assets/portrait.jpg (4:5, 1148×1435)
├─ src/
│  ├─ assets/
│  │  └─ portrait.jpg         # committed, processed by <Picture>
│  ├─ components/
│  │  ├─ layout/              # SiteHeader.astro
│  │  ├─ ui/                  # TextLink, SectionHeader, PageTitle, Icon, SocialLinks
│  │  ├─ projects/            # ProjectTile, ProjectRow, ProjectFilter, ProjectIcon, ProjectDetail
│  │  ├─ companies/           # CompanyRow, CompanyEntry, CompanyLogo
│  │  ├─ about/               # Timeline, TimelineItem
│  │  └─ drawings/            # HeroTraceWave, AboutMark, ProjectsMark, CompaniesMark, ContactMark
│  ├─ content/
│  │  ├─ projects/            # lucky-dice, live-chess-analysis, cs-uy-6613, wechat-mini-games (.md)
│  │  ├─ companies/           # software-studio.md
│  │  └─ milestones.yaml
│  ├─ data/
│  │  ├─ site.ts
│  │  └─ socials.ts
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
├─ .gitignore                 # includes docs/ui/ and .claude/
├─ .node-version              # Node 22 for Cloudflare Pages builds (must resolve to ≥ 22.22)
├─ astro.config.mjs
├─ tsconfig.json
├─ package.json               # scripts: dev, build (astro check && astro build), preview. No "package"
└─ README.md
```

Removed in v1.2: `public/.htaccess`, the GoDaddy deploy guide, the zip/package script and the `npm run package` script.

Conventions: components in PascalCase `.astro`. Content files in kebab-case slugs (`my-project.md`). Images go in `src/assets/` and are rendered with `<Picture>` (portrait) or `<Image>` from `astro:assets`. Original or source images that shouldn't be published stay in gitignored `docs/ui/`. No CSS framework. `src/styles/` and `docs/design.md` are maintained by the designer.

---

## 9. Non-functional requirements

### Accessibility (WCAG 2.1 AA)
- Semantic landmarks: `header`, `nav[aria-label="Main"]`, `main`. A skip-to-content link is the first focusable element.
- One `h1` per page, with headings in logical order. Keep the mockup's levels (Home tiles and rows use `h3` under `h2`; Companies entries use `h2`).
- Decorative SVGs have `aria-hidden="true"`. The portrait has descriptive `alt` text. New-tab links announce "(opens in new tab)".
- `aria-current` on the active nav item. Filter buttons use `aria-pressed`.
- Visible focus on every interactive element (1px black outline, as in the mockups).
- Contrast: black on white passes everywhere.
- All animation respects `prefers-reduced-motion`. No content is hidden until an animation runs.
- The site works fully without JavaScript. Only filtering is lost (all projects shown).

### Performance
- Lighthouse 95+ in all four categories on mobile, for every page.
- Total JS: 0 KB on every page except Projects (under 2 KB, inline).
- Fonts: one self-hosted variable WOFF2 (roman, plus italic only if needed), preloaded, `font-display: swap`. No third-party requests.
- LCP under 1.5s and CLS under 0.05 on a mid-range phone over 4G. Images get explicit dimensions. The portrait is served as responsive AVIF/WebP via `<Picture>` with sensible `widths`/`sizes`.

### SEO
- Unique `<title>` and `<meta name="description">` per page. Pattern: `"{Page} — Teije Koolenbrander"`, with Home just "Teije Koolenbrander" and project pages "{Project title} — Teije Koolenbrander".
- Canonical URLs on `https://www.teijekoolenbrander.com` with trailing slashes. `sitemap-index.xml` via `@astrojs/sitemap` (includes all project detail pages, excludes 404). `robots.txt` pointing to `https://www.teijekoolenbrander.com/sitemap-index.xml`.
- `*.pages.dev` deployments carry `X-Robots-Tag: noindex` (8.2). The canonical tags point to www in any case.
- Open Graph and Twitter card tags (`og:title`, `og:description`, `og:image` as an absolute URL, `og:url`), with a default OG image.
- `Person` JSON-LD on Home: `name` "Teije Koolenbrander", `url` `https://www.teijekoolenbrander.com/`, `email` `mailto:contact@teijekoolenbrander.com`, and `sameAs` generated from `socials.ts` in order (GitHub, LinkedIn, Instagram, Spotify, NetEase Cloud Music).
- `lang="en"` on `<html>`.

### Privacy
- No analytics, trackers, cookies or third-party embeds. Cloudflare Web Analytics is **not** enabled (OQ 3).
- No Google Fonts or CDN requests.

### Maintainability
- `npm run build` must pass type checks (`astro check`) and content schema validation. The same command runs on Cloudflare Pages, so a broken build never replaces the live site.
- Adding a project (with its detail page) or a company only requires adding a Markdown file and pushing to `main`.
- Changing copy requires no component changes (5.6).

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
- Filter state in the URL (`?type=coursework`) and filter counts.
- A downloadable CV.
- Content-Security-Policy header and HSTS preload (8.2).

---

## 11. Open questions and decisions

### 11.1 Open questions and owner actions

1. **Owner action: move DNS to Cloudflare and verify the email MX records.** This blocks M9.2 and M9.3. In Cloudflare, add the `teijekoolenbrander.com` zone (free plan) and compare the imported records with GoDaddy's DNS zone, especially MX, SPF/DKIM/DMARC TXT and mail CNAMEs (8.3). Then change the nameservers at GoDaddy to the two Cloudflare provides. After activation, send a test email to and from `contact@teijekoolenbrander.com`. *Owner, because it needs the GoDaddy and Cloudflare logins. Never share credentials in the repo.*
2. **Owner action: Cloudflare account and GitHub connection.** Create the Cloudflare account (if needed), create the Pages project and authorise the Cloudflare GitHub app for `personal-website-v2` only. *Blocks M9.1.*
3. **Analytics.** *Default: none* (not even Cloudflare Web Analytics). Tell us only if you want privacy-friendly stats.
4. **Name display.** The header wordmark shows "Teije X. W. Koolenbrander", while page titles and SEO use "Teije Koolenbrander". *Default: keep both as in the mockup.*
5. **Favicon and share image.** We made a simple favicon in the site style and a default Open Graph image. Tell us only if you want your own.

### 11.2 Remaining content (not blockers)

- **Company name.** The studio is "Software studio" (unnamed) for now. When it has a name, update `software-studio.md`, and optionally add a `logo` and `website`.
- Project detail bodies: extend the Markdown bodies of the 4 projects if you want more than the description on each detail page.
- Whether to show NetEase's Chinese name (网易云音乐) alongside the English label.

Done since v1.1: the Home subheader and intro, the About bio and "Off the clock", the colour portrait, the 5 timeline entries, the 4 projects (which ones and their order, all featured) and the company.

### 11.3 Resolved (owner decisions)

| Topic | Decision |
|---|---|
| Stack | Astro (static) + TypeScript + plain CSS. Approved |
| Hosting | **Cloudflare Pages** (replaces GoDaddy, v1.2). Auto-deploys from `main` of `github.com/TeijeKoolenbrander/personal-website-v2`. Build `npm run build`, output `dist`, Node 22 via `.node-version`. No adapter, no Functions |
| Domain | `https://www.teijekoolenbrander.com` is canonical. The domain stays registered at GoDaddy, with DNS (nameservers) on Cloudflare. Apex → www is a 301 Cloudflare Redirect Rule; HTTP → HTTPS is "Always Use HTTPS" |
| Headers / 404 | `public/_headers` handles caching and security headers. Pages serves `404.html` automatically. `.htaccess` removed |
| Deploy tooling | GoDaddy guide, zip script and `npm run package` removed. Guide: `docs/deploy-cloudflare.md` |
| Contact form | Removed. Contact page shows email and socials only |
| Email | `contact@teijekoolenbrander.com`, the only public address. Plain `mailto:` link. MX records must move to Cloudflare DNS unchanged |
| Footer | Not in v1. No `/now/` or `/links/` pages |
| Project links | Tiles and rows open `/projects/<slug>/` detail pages, which link to the GitHub repo when present |
| Projects | Exactly 4, all featured, in order: Lucky Dice, Live Chess Analysis, CS-UY 6613, WeChat Mini Games. New `coursework` type; new `dice` and `gamepad` icons. Filter generated from data |
| Home projects | 4 tiles chosen by the `featured` flag (fallback: newest) |
| Home subheader | "B.S. Computer Engineering". The owner is described as a computer engineering student (NYU Tandon, class of 2027) |
| Companies | One company, "Software studio" (unnamed), founded 2026. No subtitle on the Companies page (`PageTitle` subtitle optional) |
| Company links | No links on company entries in v1. Optional `website` field kept. Home rows link to `/companies/` |
| Portrait | Colour photo, 4:5 at 1148×1435, made by `scripts/make-portrait.mjs` from a gitignored original in `docs/ui/`, rendered with `<Picture>` |
| Timeline | 5 entries: Now / 2027 / 2023 / 2021 / 2005 |
| Social links | Five profiles in the order of 2.3, external links open in a new tab |
| Git | Repo on GitHub under the owner's identity. `docs/ui/` and `.claude/` gitignored |

---

## 12. Milestones

M0–M8 are complete (built and verified locally). M9 replaces the earlier GoDaddy deploy milestone and needs the owner actions in 11.1. Acceptance criteria are listed under each task. `docs/design.md` is the visual reference for every milestone.

### M0 — Project setup (done)
- **M0.1** Scaffold Astro 7 + TypeScript (strict) in the repo root and init a git repo. Configure `astro.config.mjs` per 8.1 (`site`, `output: 'static'`, `build.format: 'directory'`, `trailingSlash: 'always'`, sitemap integration). No adapter. Add `.node-version` and `.gitignore` (including `docs/ui/` and `.claude/`).
  - *Done when:* `npm run dev` and `npm run build` work, `astro check` passes, `dist/` contains only static files, and the repo is pushed to `github.com/TeijeKoolenbrander/personal-website-v2` under the owner's identity with no files from `docs/ui/` in its history.

### M1 — Layout and tokens (done)
- **M1.1** Wire in the designer's `src/styles/` (tokens, global), self-hosted Newsreader, and base link and focus styles.
  - *Done when:* there are no requests to Google Fonts or jsDelivr, and the type matches the mockup.
- **M1.2** Build `BaseLayout` (head meta, canonical, skip link) and `SiteHeader`. Add `site.ts` and `socials.ts`.
  - *Done when:* nav order and active state match the mockup on every route, there is no footer, and canonicals use `https://www.teijekoolenbrander.com` with trailing slashes.
- **M1.3** Add the content collections (projects, companies, milestones) with schemas and the entries from section 5.
  - *Done when:* an invalid content file fails the build, and the 4 project, 1 company and 5 milestone entries load.

### M2 — Home (done)
- **M2.1** Build the hero and `HeroTraceWave` with its animation and reduced-motion fallback.
  - *Done when:* it matches the mockup at 1280px and 375px, the subheader reads "B.S. Computer Engineering", and the animation is disabled under reduced motion.
- **M2.2** Build `SectionHeader`, `ProjectTile`, `ProjectIcon` (including `dice` and `gamepad`), `CompanyRow`.
  - *Done when:* Home shows the 4 featured tiles in the order Lucky Dice, Live Chess Analysis, CS-UY 6613, WeChat Mini Games, each linking to `/projects/<slug>/`, and one company row linking to `/companies/`, all from content files.

### M3 — Projects and project detail (done)
- **M3.1** Build `PageTitle` (optional subtitle), the `ProjectsMark` drawing, `ProjectRow` and the list sorted by year descending, then `order`.
  - *Done when:* it matches the mockup, rows link to `/projects/<slug>/`, and the mobile layout moves the meta under the description.
- **M3.2** Build `ProjectFilter` with progressive enhancement and types derived from the data.
  - *Done when:* the buttons read All / Software / Coursework; `aria-pressed` toggles; filtering works by keyboard; without JS all rows show and the filter is hidden; and temporarily giving a project another type adds its button with no code change.
- **M3.3** Build `src/pages/projects/[slug].astro` per 3.4 and `docs/design.md`.
  - *Done when:* one page per content file is generated as `dist/projects/<slug>/index.html`; each shows back link, icon, title, "Type, Year", summary and body (or `description` fallback); "View on GitHub" appears only for entries with `repo` and opens in a new tab with `rel="noopener noreferrer"`; "Projects" is shown active in the header.

### M4 — Companies (done)
- **M4.1** Build `CompanyEntry`, `CompanyLogo` (placeholder marks plus optional real logo image) and the `CompaniesMark` drawing.
  - *Done when:* entries render from content sorted by founding year descending, show "Founded 2026" with no link, the page has no subtitle, and adding a `website` to an entry (tested locally, then reverted) renders the link without code changes.

### M5 — About (done)
- **M5.1** Add the `AboutMark` drawing and the photo and bio section with the colour portrait (`scripts/make-portrait.mjs` → `src/assets/portrait.jpg` → `<Picture>`).
  - *Done when:* the portrait is in colour, 4:5, bordered, with `alt` text and no layout shift, and the original photo is not in the repo.
- **M5.2** Build `Timeline` from `milestones.yaml`, with a hollow dot for `current`.
  - *Done when:* it shows Now / 2027 / 2023 / 2021 / 2005 and matches the mockup at desktop and mobile widths.
- **M5.3** Build "Off the clock" with Spotify and NetEase links taken from `socials.ts`.
  - *Done when:* both links open in a new tab and announce it to screen readers.

### M6 — Contact (done)
- **M6.1** Add the `ContactMark` drawing, the email link (`mailto:contact@teijekoolenbrander.com`, from `site.email`), `Icon` and `SocialLinks` (list variant). Layout per `docs/design.md`.
  - *Done when:* there is no form and no JS on the page, and neither the mockup's placeholder address nor `teijekool@gmail.com` appears anywhere in `src/` or `dist/`.

### M7 — 404, headers and SEO (done)
- **M7.1** Build `404.astro` and `public/_headers` (8.2). Remove `public/.htaccess`.
  - *Done when:* `dist/404.html` and `dist/_headers` exist, `dist/.htaccess` does not, the 404 page is `noindex`, and no URL that matches more than one `_headers` rule gets a duplicated `Cache-Control` value.
- **M7.2** Add titles and meta descriptions, OG/Twitter tags, the default OG image, the favicon, `robots.txt`, the sitemap, and `Person` JSON-LD.
  - *Done when:* `sitemap-index.xml` lists every page including all project detail pages, all absolute URLs use `https://www.teijekoolenbrander.com`, and JSON-LD `sameAs` is generated from `socials.ts`.

### M8 — QA (done)
- **M8.1** Accessibility pass: axe with zero violations, keyboard-only walkthrough, screen reader spot-check, 200% zoom and 320px width checks.
- **M8.2** Performance and SEO pass on `npm run preview`: Lighthouse 95+ on all pages on mobile, OG tags checked, JSON-LD validated, no third-party requests.
- **M8.3** Static-hosting check: serve `dist/` with a plain static server and click through every route and link with trailing slashes; no broken internal links.
  - *Done when:* all three passes are clean and every page matches its mockup (or `docs/design.md`) at 1280px and 375px.

### M9 — Cloudflare Pages deploy (needs the owner actions in 11.1)
- **M9.1** Create the Pages project connected to `TeijeKoolenbrander/personal-website-v2`, with production branch `main`, build command `npm run build` and output `dist` (8.1).
  - *Done when:* a push to `main` triggers a build that succeeds; the build log shows Node ≥ 22.22 (if not, fix `.node-version`); the `*.pages.dev` URL serves every route; `curl -I` shows the `_headers` values (security headers on HTML, `immutable` on `/_astro/*`, one non-duplicated `Cache-Control` per response, `X-Robots-Tag: noindex` on `*.pages.dev` if adopted); and a push to another branch creates a preview deployment, not a production one.
- **M9.2** Move DNS to Cloudflare (OQ 1, owner) with the email records copied first.
  - *Done when:* the zone is **Active** in Cloudflare; `dig MX teijekoolenbrander.com` (via Cloudflare's nameservers) returns the same MX hosts and priorities as GoDaddy did; SPF/DKIM/DMARC TXT records match; mail records are DNS-only; and a test email to `contact@teijekoolenbrander.com` arrives and a reply from it is delivered.
- **M9.3** Add custom domains `www.teijekoolenbrander.com` (primary) and `teijekoolenbrander.com` to the Pages project, turn on **Always Use HTTPS**, and create the apex → www **Redirect Rule** (301, preserve query string).
  - *Done when:*
    - `https://www.teijekoolenbrander.com/` serves the site with a valid certificate.
    - `https://teijekoolenbrander.com/about/?x=1` returns **301** to `https://www.teijekoolenbrander.com/about/?x=1`.
    - `http://www.teijekoolenbrander.com/about/` redirects to `https://www.teijekoolenbrander.com/about/`.
    - `http://teijekoolenbrander.com/about/` ends at `https://www.teijekoolenbrander.com/about/` (at most two hops, all 301/308, no loop).
    - An unknown URL (e.g. `/nope/`) returns status **404** with the custom page.
    - `/about` (no slash) reaches `/about/`.
    - Canonical tags and `sitemap-index.xml` on the live site use `https://www.teijekoolenbrander.com`.
- **M9.4** Clean-up. The deploy guide is `docs/deploy-cloudflare.md` and the README links to it (both maintained by devops).
  - *Done when:* the repo contains no `.htaccess`, GoDaddy guide, zip script or `package` npm script; the guide covers the Pages settings, DNS move and email record check, the redirect rule and HTTPS setting, and rollback. Any GoDaddy *hosting* plan can then be cancelled, while the domain registration is kept.

### After launch
Remaining content items (11.2). Later features only if requested (section 10).
