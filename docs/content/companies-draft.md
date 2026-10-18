# Companies copy: DRAFT

Status: draft for the developer to apply. Nothing in `src/` has been edited.
Facts used: one company, no name yet, founded 2026, builds software solutions (mainly SaaS for companies, plus WeChat mini programs and mini games). No clients, revenue or launches are claimed.

## 1. Display name for the unnamed company

**Chosen: "Software studio".**

It reads as a plain description, not a blank. It is calm and short enough for the 34px and 40px headings. The summary and description say the name is still to come, so the page stays honest without a "TBD" label.

Alternatives:
- "Software studio (name to come)": more explicit, but long in the 40px heading.
- "Unnamed studio": direct, but it draws attention to the gap.

## 2. Company entry

Create `src/content/companies/software-studio.md`. Delete the three placeholders (`placeholder-company-2025.md`, `placeholder-company-2024.md`, `placeholder-company-2023.md`), since there is only one company.

```md
---
name: "Software studio"
summary: "I build software solutions, mainly SaaS for companies. I also make WeChat mini programs and mini games."
description: "I started this company in 2026 to build software solutions. Most of the work is SaaS built for companies, along with WeChat mini programs and mini games. It doesn't have a name yet."
founded: 2026
mark: circle-line
---
```

Field notes:
- slug: `software-studio` (from the filename)
- website / websiteLabel: omitted (none)
- logo: omitted, so the placeholder mark is used
- mark: `circle-line` is optional in the schema. Keep it, or the developer can choose another. `squares` and `triangle` were only used by the deleted placeholders.
- Length: summary is 2 sentences, description is 3. Both are within the limits in `docs/content/inventory.md`.
- The placeholder asked for "one thing it has achieved so far" and for why he started it. Neither is known, so neither is invented. See the questions below.

## 3. Other company-related copy

| # | File:line | Current | New |
|---|-----------|---------|-----|
| a | `src/pages/companies.astro:13` (meta description) | The companies Teije Koolenbrander has founded and runs. | The software company Teije Koolenbrander founded in 2026: SaaS for businesses, and WeChat mini programs and mini games. |
| b | `src/pages/companies.astro:16` (subtitle) | `<PageTitle title="Companies" subtitle="Companies I've founded and run.">` | `<PageTitle title="Companies">` (subtitle removed, no replacement, as the owner asked) |
| c | `src/pages/index.astro:53` (Home heading and link) | `<SectionHeader title="Companies" linkText="All companies" href="/companies/" />` | Heading "Companies" unchanged. Link text becomes "Company page". |
| d | `src/data/site.ts:6` (`site.description`) | Teije Koolenbrander is a computer engineering student who builds software and hardware. See his projects and the companies he is involved in. | Teije Koolenbrander is a computer engineering student who builds software and hardware. See his projects and the software company he founded. |
| e | `src/content/milestones.yaml:3` (timeline, "Now") | Building my own companies | Building my own software company |

Notes:
- (a) is about 118 characters and (d) is about 141. Both are under the 155 limit.
- (a) The SEO title on `companies.astro:12`, "Companies — Teije Koolenbrander", stays as is.
- (b) The developer should check that `PageTitle` treats `subtitle` as optional and doesn't leave an empty element or gap when it is missing. This is a code question, so I haven't checked it.
- (c) "All companies" is wrong for a single entry. "Company page" is accurate and quiet. The Home heading "Companies" and the nav label "Companies" can both stay plural. They name the section, not the count, and they won't need changing if he starts a second company. `SiteHeader.astro:17` is unchanged.
- (e) This is not strictly in scope, but "my own companies" is plural and untrue now. Its note line, "One line about what you're focused on", is still a placeholder. Suggested note, using only known facts: "SaaS, WeChat mini programs and mini games." The developer can apply this or skip it.
- The Home lede at `index.astro:36` ("I build software and hardware...") doesn't mention companies and needs no change.

## Final (applied): WeChat first, SaaS second

Owner request: the company is mainly WeChat mini programs (and mini games), and also offers SaaS. This supersedes the SaaS-first wording above.

- `src/content/companies/software-studio.md` summary: "I build software solutions, mainly WeChat mini programs and mini games. I also offer SaaS solutions for companies."
- `src/content/companies/software-studio.md` description: "I started this company in 2026 to build software solutions. Most of the work is WeChat mini programs and mini games. I also offer SaaS solutions for companies. It doesn't have a name yet."
- `src/pages/companies.astro` meta description: "The software company Teije Koolenbrander founded in 2026: mainly WeChat mini programs and mini games, plus SaaS solutions for businesses." (136 characters)
- `src/content/milestones.yaml` "Now" note: "WeChat mini programs, mini games and SaaS."

Voice: kept first-person "I". "We" would suggest a team, and the open question about "studio" (below) is whether it is just him.

## Questions and facts needed from the owner

1. Does the company have a working name, or a target date for choosing one? The entry should be updated when it does.
2. Why did you start it? One sentence would improve the description. Nothing has been invented here.
3. Is there one thing it has done that you're happy to state, such as a product shipped or something live? The old placeholder asked for this. Don't claim clients or revenue unless they are real.
4. Should the entry link to the WeChat mini game and dice mini program projects, or stay separate? Are those projects made through the company or on your own?
5. Is "studio" the right word? It implies a small team or workshop. If it is just you, say so and I'll adjust the name and wording.
6. Do you want a website link or logo later? There is none for now.
