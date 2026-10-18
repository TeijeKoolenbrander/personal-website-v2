# teijekoolenbrander.com

Personal website. Astro (static output), TypeScript (strict), plain CSS. Spec: `docs/plan.md`, visual spec: `docs/design.md`.

**Hosted on Cloudflare Pages**, deployed automatically from the `main` branch of the GitHub repo
(`TeijeKoolenbrander/personal-website-v2`). Live at https://www.teijekoolenbrander.com.

Requires Node 22.22 or newer (`.node-version` pins `22`).

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # astro check + static build into dist/
npm run preview   # serve dist/ locally
```

## Editing content

- Projects: one Markdown file each in `src/content/projects/` (adds a `/projects/<slug>/` page).
- Companies: one Markdown file each in `src/content/companies/`. Add `website` to show a link.
- Timeline: `src/content/milestones.yaml`.
- Socials and email: `src/data/socials.ts`, `src/data/site.ts`.
- Placeholder text marked `TODO:` still needs real copy.

## Deployment

Push to `main`, then Cloudflare builds (`npm run build`, output directory `dist`), then the site is live.
Other branches get preview URLs. Headers and caching live in `public/_headers`.

Setup and domain guide: [docs/deploy-cloudflare.md](docs/deploy-cloudflare.md).
