# Design system: teijekoolenbrander.com

Source: the five mockups in `docs/ui/` (home, about, projects, companies, contact), plus the new project detail page specified here. Tokens live in `src/styles/tokens.css`; base styles in `src/styles/global.css`. Where this document and plan.md disagree on visual matters, this document wins.

## 1. Principles

1. **Black on white, nothing else.** One colour pair. No greys, no accent, no shadows, no gradients. Hierarchy comes from size, italic and rules.
2. **One typeface.** Newsreader, weight 400 only. Roman for content, italic for the secondary voice (subtitles, taglines, summaries, notes).
3. **Hairlines, not boxes.** 1px black rules divide content. Radius is 0 everywhere. The only round shapes are timeline dots and the vias in the line drawings.
4. **Big type, quiet chrome.** Page titles are large and tightly set; everything around them is 14-17px.
5. **Circuit meets wave.** The signature is the line drawings (traces with right-angle bends, vias, sine waves) that draw themselves once on load. Nothing else animates.
6. **Underline is the interaction.** Hover underlines (1px, 6px offset). Tiles and buttons get an inset 1px outline.
7. **Accessible by default.** 21:1 contrast, visible 2px focus ring, reduced-motion respected, 360px minimum width.

## 2. Colour

| Token | Value | Use |
|---|---|---|
| `--color-ink` / `--color-text` / `--color-rule` / `--color-focus` | `#000` | Text, rules, borders, outlines, SVG strokes and fills |
| `--color-paper` / `--color-bg` | `#fff` | Page background, button background, hollow dots and rings |

Contrast black on white: 21:1 (AA and AAA). There is no tinted text: secondary text is italic or smaller, never lighter. No `opacity` on text.

**Light only.** The mockups define no dark mode, so the site ships light-only (`color-scheme: light`). `tokens.css` contains a commented-out inverted palette (`ink: #fff`, `paper: #000`). To enable it, every SVG must use `currentColor` / `var(--color-paper)` and never a literal `#000` / `#fff`.

## 3. Typography

Family: `--font-serif` = `"Newsreader Variable", Georgia, "Times New Roman", serif`. Self-hosted via `@fontsource-variable/newsreader` (roman plus `wght-italic.css` for italic). The font is imported in the layout, not in CSS. Optional: the `opsz` variants give optical sizing as in the Google Fonts mockups (`opsz 6..72`); `font-optical-sizing: auto` is already set.

A second family exists only for `<code>`/`<pre>` in project Markdown: `--font-mono` (system monospace stack). Do not use it anywhere else.

Weight: 400 everywhere (all headings too). The only exception is `<strong>` inside project prose (500).

### Scale (rem; 1rem = 16px)

| Token | px | Role | Leading | Tracking |
|---|---|---|---|---|
| `--text-display` | 92 (fluid 52..92, `11vw`) | Home name h1 | 0.92 | -0.035em |
| `--text-title` | 84 (fluid 56..84, `10vw`) | Page h1 (About, Projects, Companies, Contact) | 0.9 | -0.035em |
| `--text-title-detail` | 64 (fluid 44..64, `8vw`) | Project detail h1 (long names) | 0.95 | -0.035em |
| `--text-40` | 40 | Company entry name (h2) | 1.05 | -0.02em |
| `--text-34` | 34 | Company row name on Home (h3) | 1.05 | -0.02em |
| `--text-30` | 30 | Section h2 | 1.15 | -0.01em |
| `--text-26` | 26 | Project tile name (h3) | 1.1 | 0 |
| `--text-24` | 24 | Project row name (h3); Contact email on desktop is fluid, see Contact | 1.15 | 0 |
| `--text-22` | 22 | Italic subtitle, home tagline | 1.3 | 0 |
| `--text-20` | 20 | Timeline title, social icon size | 1.3 | 0 |
| `--text-18` | 18 | Contact "Elsewhere" rows | 1.6 | 0 |
| `--text-17` | 17 | Long-form body (About, company description, project prose) | 1.75 | 0 |
| `--text-16` | 16 | Wordmark, nav, home intro (leading 1.75), filter buttons, buttons | 1.6 | 0 |
| `--text-15` | 15 | Labels, "All projects" links, row descriptions, timeline notes | 1.6 | 0 |
| `--text-14` | 14 | Meta (type, year), captions, tile meta | 1.6 | 0 |

Italic is used for: page subtitles (22), tagline (22), tile summary (15), timeline notes (15), captions (14), project detail summary (22), prose h3/h4, blockquotes. Never for h1/h2 titles, nav or buttons.

Fluid sizes replace the mockups' hard switch at 600px (plan section 7 default): they land on the mockup values at 600px and below (52 / 56) and on 92 / 84 at roughly 840px and up.

## 4. Spacing, layout, rules

Spacing tokens are named by pixel value: `--space-2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 40, 44, 48, 56, 72`. Use only these.

- **Container:** `--container: 960px` outer box, centred, including gutters (content width 888px at full size). The `.container` class in global.css does this. The header uses the same container so the wordmark aligns with page content.
- **Gutter:** `--gutter` 36px, 20px at 600px and below.
- **Vertical rhythm (page level):** header padding 22px; title block `44px top / 40px bottom` (Projects: 36px, followed by the filter row); content section bottom padding 56px (Home sections 52/48px); section header to content 20px; gap between title row and subtitle 20px.
- **Column gaps:** 24px (home hero, company rows), 32px (About, company entries), 40px (Contact).
- **Column ratios:** `--cols-split` 1fr : 1.3fr; `--cols-about` 0.85fr : 1.3fr; `--cols-contact` 1fr : 1.2fr. Always `minmax(0, ...)` to avoid overflow.
- **Rules:** `--rule` = `1px solid #000`. Lists use a top rule on each row plus a bottom rule on the list container (or last row). Radius `--radius: 0`. Shadows: none.
- **No footer** in v1. The last section's bottom padding (56px) ends the page.

## 5. Links, hover, focus

| State | Style |
|---|---|
| Default link | Colour inherits (black), no underline |
| Hover | `text-decoration: underline`, thickness 1px, offset 6px |
| Always-underlined link (`.link-underline`, prose links, Contact email, company website, About service links) | Same underline, always on |
| Current nav item | Underlined (and `aria-current="page"`) |
| Selected filter | Underlined (and `aria-pressed="true"`) |
| Tile, button hover | `outline: 1px solid #000; outline-offset: -5px` (inset), no underline on the tile itself; the tile's `h3` underlines |
| Row hover (project row, company row on Home) | Row does not underline; its `h3` underlines |
| **Focus-visible** | `outline: 2px solid #000; outline-offset: 3px` on every focusable element (2px offset for tiles and bordered buttons). Never remove it. The mockups use 1px; 2px is chosen so the ring is clearly visible against 1px rules |

External links: `target="_blank" rel="noopener noreferrer"` plus a visually hidden "(opens in new tab)". No external-link icon except the "View on GitHub" arrow described below.

## 6. Motion

All motion is CSS, runs once on load, and is decorative (`aria-hidden` SVGs).

- **Draw:** each drawn path has `class="ln draw"` and `pathLength="1"`; animation `stroke-dashoffset 1 -> 0`, `ease-in-out`, delay `0.2s`. Durations: Home hero 2.4s (`--draw-duration-home`), About / Projects / Companies / project detail 1.8s (default), Contact 1.6s (`--draw-duration-contact`). Override per path with inline `style="--draw-duration:2.4s; --draw-delay:.9s"`.
- **Stagger (as in mockups):** Home second wave delay 0.9s. Projects branches 0s / 0.5s / 0.8s. Contact arcs 1.2s / 1.4s / 1.6s.
- **Vias:** `class="via"` group fades in over 0.5s; on Home with delay 1.6s (set `--fade-delay` inline for others if needed).
- **Strokes:** 1px, round caps and joins, `currentColor`. Filled vias are `fill="currentColor"`; hollow rings are `class="ln"` with `fill: var(--color-paper)`.
- **No other animation:** no hover transitions, no scroll effects.
- **`prefers-reduced-motion: reduce`:** `.draw` renders fully drawn (`stroke-dashoffset: 0`), `.via` fully visible, all animation and transition durations collapse, smooth scroll off.
- Without CSS animation support the drawing must still show. Do not rely on JS.

## 7. Breakpoint: 600px

Single breakpoint, `max-width: 600px` (literal; custom properties don't work in media queries). Mobile-first: write base styles for narrow, add `min-width: 601px` rules, or write desktop-first with a `max-width: 600px` block; either is fine as long as 360px works.

| Element | Above 600px | 600px and below |
|---|---|---|
| Gutter | 36px | 20px |
| Home h1 / page h1 / detail h1 | fluid, up to 92 / 84 / 64 | floors 52 / 56 / 44 |
| Two-column grids (hero intro, About bio, Off the clock, Contact, company rows and entries) | 2 columns | 1 column, same gap |
| Home project tiles | 2x2 | 1 column |
| Project rows | icon / content / meta | icon (44px) + content; meta moves under the description (`grid-column: 2`) |
| Header | wordmark left, nav right, one row | nav wraps below the wordmark (`flex-wrap`), gap `6px 20px`, no hamburger |
| Title drawing (200x64) | right of h1, bottom-aligned | wraps below h1 (flex-wrap, 16px row gap) |
| Timeline | 72px label gutter | unchanged (works to 320px) |

Design check: everything must fit 360px (320px content width) with no horizontal scroll. Long strings (`email`, URLs, code) use `overflow-wrap: anywhere` / `break-word`.

## 8. Components

Dimensions are for desktop; mobile changes are listed in section 7.

### Header / nav
Flex row, `justify-content: space-between`, `align-items: baseline`, `flex-wrap: wrap`, gap `12px 24px`, padding `22px var(--gutter)` (within the container). Left: wordmark "Teije X. W. Koolenbrander", 16px, a link to `/`. Right: `<nav aria-label="Main">` with Home, About, Projects, Companies, Contact; 16px; flex-wrap, gap `6px 20px`. Active item underlined with `aria-current="page"`. On `/projects/<slug>/` the active item is **Projects**. No border under the header. First element on the page is a skip link (`.skip-link`).

### Page title (About, Projects, Companies, Contact)
Section padding `44px var(--gutter) 40px`. Row: flex, `space-between`, `align-items: flex-end`, `flex-wrap: wrap`, gap `16px 24px`. `h1` at `--text-title`, leading 0.9, tracking -0.035em. SVG drawing 200x64, `aria-hidden`. Below: italic subtitle 22px, margin-top 20px.

### Section header
Flex, `space-between`, `align-items: baseline`, margin-bottom 20px. `h2` 30px, tracking -0.01em, left. Optional link 15px, right ("All projects", "All companies").

### Project tile (Home)
Link block (`a.tile`). Flex column, `space-between`, gap 28px, min-height 190px, padding 20px, `border: 1px solid #000`, `margin: 0 -1px -1px 0` (borders collapse). Top row: 44px line icon left, "Type, Year" 14px right. Bottom: `h3` 26px/1.1, then italic summary 15px, margin-top 6px. Hover: inset outline, h3 underlined. Whole tile links to `/projects/<slug>/`. Grid: 2 columns, 1 at 600px.

### Project row (Projects)
Link block (`a.row`). Grid `52px minmax(0,1fr) auto`, gap 20px, `align-items: start`, padding 22px 0, `border-top: 1px solid #000`; list container has `border-bottom`. Content: `h3` 24px/1.15, description 15px/1.6 margin-top 6px. Meta right-aligned 14px/1.6: type, line break, year. Hover underlines the h3. Mobile: `44px 1fr`, meta in column 2 under the description, left-aligned. Links to `/projects/<slug>/`.

### Filter buttons
`role="group"` `aria-label="Filter projects by type"`. Flex-wrap, gap `6px 22px`, padding `0 var(--gutter) 18px`. Each is a `<button>`: no border, background or padding, 16px, `aria-pressed`. Selected and hover: underline. Focus ring as global. Hidden without JS.

### Company entry (Companies) and row (Home)
Entry (`article`): grid `--cols-split`, gap 32px, padding 36px 0, top rule; list has bottom rule. Left: 72x72 logo (outlined square with a line mark), `h2` 40px/1.05, tracking -0.02em, margin-top 20px. Right: description 17px/1.75, then a meta row 15px: "Founded YYYY". **No website link in v1** (description only), so omit the website part of the meta row; keep "Founded YYYY". Home row: link to `/companies/`, grid `--cols-split`, gap 24px, padding 24px 0, top rule (last row also bottom rule); `h3` 34px/1.05 left, summary 16px/1.7 right.

### Timeline (About)
`h2` 30px, margin-bottom 28px. Container `margin-left: 72px; border-left: 1px solid #000`. Item: relative, padding `0 0 28px 26px` (last item 0 bottom). Label absolutely positioned `left: -72px; top: 3px`, 15px. Dot: 7px circle, `top: 9px`, centred on the line (`left: -4px`, hollow item `left: -5px` to account for border). Filled dot = black; current ("Now") = white fill with 1px black border. Title 20px; italic note 15px, margin-top 2px.

### Buttons and links
Only one button style (`.btn`): white, 1px black border, no radius, padding 10px 20px, 16px. Hover: inset outline (1px, offset -5px). Used for "View on GitHub". Text links as in section 5.

### Tags (type and year)
No chips or pills. A "tag" is plain 14px text: "Software, 2026" (tile) or Type over Year (row). If an outlined tag is ever needed: 1px border, 0 radius, padding `2px 8px`, 14px.

### Line icons
Project icons are 44x44 viewBox, 1px strokes (`.ln`), `currentColor`. Set: window, chip, rings, chart, signal, layers. Icons are decorative (`aria-hidden`) and not animated.

## 9. Project detail page `/projects/<slug>/`

Same shell as every page: skip link, header (Projects active), container 960px, 36/20px gutters, no footer. Order top to bottom:

1. **Back link.** Section padding-top 44px. Text link "← All projects" to `/projects/`, 15px, hover underline. Margin-bottom 28px. The arrow is a text glyph with `aria-hidden="true"`.
2. **Title block.** Same row structure as the page title: flex, `space-between`, `align-items: flex-end`, wrap, gap `16px 24px`. `h1` = project title at `--text-title-detail` (64px desktop, 44px at 360px), leading 0.95, tracking -0.035em, max width so it wraps rather than collides with the icon (`flex: 1 1 20rem`). On the right, the project's line icon scaled to **64x64** (same height as the 200x64 drawings), `aria-hidden`, `align-self: flex-end`; the strokes use the `.draw` animation (1.8s) to match the other pages. On mobile the icon wraps below the h1, left-aligned.
3. **Summary.** Italic 22px/1.3, margin-top 20px, max-width 40rem.
4. **Meta bar.** margin-top 36px, `border-top` and `border-bottom` 1px black, padding 16px 0. Flex, wrap, `align-items: baseline`, gap `12px 40px`. Items, each with a 14px label above a 17px value: **Type** (Software / Hardware / Research), **Year**. At the right end (`margin-left: auto`; on mobile wraps to its own full-width line, left-aligned) sits the **"View on GitHub ↗"** link, using `.btn` styling, `target="_blank" rel="noopener noreferrer"`, with visually hidden " (opens in new tab)". The arrow `↗` is `aria-hidden`. Render only when `repo` exists; if no repo, the meta bar has just Type and Year. Use `<dl>` for Type/Year (`dt` label, `dd` value).
5. **Body.** margin-top 40px. Rendered Markdown in `<div class="prose">`: left-aligned, `max-width: 40rem` (640px), 17px/1.75, paragraph gap 18px.
   - `h2` 30px/1.15 tracking -0.01em, margin-top 48px; `h3` 24px italic, margin-top 32px; `h4` 18px italic. Heading to next block gap 12px. Headings stay weight 400.
   - Links always underlined (1px, 6px offset); external links open in a new tab with the hidden hint.
   - Lists: square bullets / decimal, indent 24px, item gap 6px.
   - Images: full prose width, 1px black border, margin 32px 0; optional figcaption italic 14px.
   - Blockquote: 1px left rule, 20px padding, italic. Code: mono 0.85em with 1px border; `pre` bordered, 14px, horizontal scroll. `hr`: 1px rule, 40px margin. Tables: 1px top rules, scroll horizontally.
   If the body is empty, skip this section; the page then ends after the meta bar.
6. **End bar.** margin-top 56px, `border-top: 1px solid #000`, padding-top 24px, bottom padding of page 56px. "← All projects" link again (16px). No next/previous navigation in v1.

Page `<title>`: "Project title - Teije Koolenbrander". The h1 is the only `h1`; body headings start at `h2`.

Mobile (360px): gutter 20px, h1 44px, icon below h1 at 56x56 if space is tight, meta bar items stack into two columns (Type, Year) and the GitHub button takes the full row below, prose full width, `pre` and tables scroll, images 100% width. No horizontal page scroll.

## 10. Contact page (no form)

The form is removed, so the layout becomes a single statement plus a list.

1. Header (Contact active) and page title block unchanged (drawing: trace ending in a ring with three radio arcs, subtitle "For work, collaborations, or to say hello.").
2. **Email block.** Section padding `0 var(--gutter) 40px`. Small label "Email" (15px), then the address `contact@teijekoolenbrander.com` as an always-underlined `mailto:` link at `--text-contact-email` (fluid 21px at 360px to 44px at 960px), leading 1.15, tracking -0.02em, `overflow-wrap: anywhere`, margin-top 6px. Below, one italic 17px line, margin-top 16px: "Email is the best way to reach me." (copy is a suggestion; the owner can change it).
3. **Elsewhere.** Section with a top rule (1px), padding `32px var(--gutter) 56px`, grid `--cols-about` (0.85fr : 1.3fr), gap 32px. Left: `h2` "Elsewhere" 30px/-0.01em. Right: the 5 social links as a list: each row is a flex link (20px Tabler inline SVG icon, 12px gap, 18px label), padding 10px 0, top rule 1px, with a bottom rule on the list. Hover underlines the label. Stacks to one column at 600px (heading then list, 20px gap).

This matches the About "Off the clock" pattern (rule, h2 left, content right), so the page feels composed: big email, then the rule and the list.

## 11. Accessibility checklist for the developer

- Text contrast 21:1; no text lighter than black.
- Focus-visible ring on all links, buttons and the skip link; never `outline: none`.
- Active nav and selected filter are conveyed by `aria-current` / `aria-pressed`, not only underline.
- Decorative SVGs `aria-hidden="true"` and `focusable="false"`; icon-only links have `aria-label`.
- Touch targets: filter buttons and nav links need at least 24px height (inline `padding-block: 4px`); social rows are 44px tall.
- Headings: one `h1` per page, no skipped levels.
- Reduced motion handled in `global.css`.
