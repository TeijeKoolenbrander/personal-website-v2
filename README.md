# teijekoolenbrander.com

Personal website. Astro (static output), TypeScript (strict), plain CSS. Spec: `docs/plan.md`, visual spec: `docs/design.md`.

Requires Node 22.22 or newer.

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

## Deploy (GoDaddy)

Run `npm run build`, then upload the **contents** of `dist/` (including the hidden `.htaccess`) to `public_html/`.
The HTTPS and www redirects in `.htaccess` only work on the live Apache host, not in `npm run preview`.
