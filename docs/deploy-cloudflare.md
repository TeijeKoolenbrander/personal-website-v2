# Hosting on Cloudflare Pages: step-by-step guide

The site is a static site. Cloudflare Pages builds it from GitHub every time you push to `main`. It is free.

Build settings you will need:

| Setting | Value |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Production branch | `main` |
| Node version | 22 (the repo has a `.node-version` file saying `22`) |

Dashboard labels change now and then. Where a label below might differ, it says "verify in dashboard".

## Part A: Create the Pages project

1. Go to https://dash.cloudflare.com and sign up or log in.
2. Left menu: **Workers & Pages** -> **Create** -> **Pages** tab -> **Connect to Git**. (Verify in dashboard: Cloudflare sometimes nudges you towards "Workers"; make sure you pick Pages with Git.)
3. Click **Connect GitHub** and authorise Cloudflare. Choose **Only select repositories** and pick only `personal-website-v2`.
4. Select the repo and click **Begin setup**.
5. Fill in: Project name (for example `teijekoolenbrander`), Production branch `main`, Framework preset **Astro**, Build command `npm run build`, Build output directory `dist`.
6. Under **Environment variables (advanced)**, add `NODE_VERSION` = `22` as a fallback. The `.node-version` file should already do this, but the variable is a safe backup.
7. Click **Save and Deploy**. Wait a few minutes.
8. Open the `https://<project-name>.pages.dev` link. The site should load.

## Part B: Connect your domain

Your domain `teijekoolenbrander.com` is registered at GoDaddy. To use the bare domain (without www) with Pages, the domain's DNS must be run by Cloudflare. You keep the domain registered at GoDaddy; only the "nameservers" move.

### B1. Add the domain to Cloudflare

1. Cloudflare home -> **Add a domain** (older label: "Add a site"). Enter `teijekoolenbrander.com`.
2. Choose the **Free** plan.
3. Cloudflare scans your existing DNS records. **Check the list carefully.** If you use or plan to use `contact@teijekoolenbrander.com`, make sure every **MX** record and every **TXT** record (SPF, DKIM, DMARC, verification) from GoDaddy was copied. Compare against GoDaddy: My Products -> Domains -> `teijekoolenbrander.com` -> DNS. Add anything missing by hand. If you skip this, email can stop working.
4. Continue. Cloudflare shows **two nameservers** (like `xxx.ns.cloudflare.com`). Keep this page open.

### B2. Change the nameservers at GoDaddy

1. GoDaddy -> **My Products** -> Domains -> `teijekoolenbrander.com` -> **DNS** -> **Nameservers** -> **Change**.
2. Choose **I'll use my own nameservers**.
3. Paste both Cloudflare nameservers, save, and confirm.
4. Back in Cloudflare, click **Done / Check nameservers**. Activation takes minutes up to 24 hours; Cloudflare emails you when the domain is active.

If you have an old GoDaddy hosting plan or Website Builder site, it stops being used once DNS moves. That is fine.

### B3. Attach the domain to the Pages project

1. **Workers & Pages** -> your project -> **Custom domains** -> **Set up a custom domain**.
2. Add `www.teijekoolenbrander.com`, then confirm. Cloudflare creates the DNS record automatically.
3. Repeat with `teijekoolenbrander.com`.
4. Wait until both show **Active** (certificate issuing can take a few minutes).

### B4. Redirect the bare domain to www (301)

1. Cloudflare -> select `teijekoolenbrander.com` -> **Rules** -> **Redirect Rules** -> **Create rule**. (Verify in dashboard: there may also be a ready-made "Redirect from root to WWW" template under Rules; it does the same thing.)
2. Rule name: `Apex to www`.
3. **If incoming requests match** -> Custom filter expression -> Field **Hostname**, operator **equals**, value `teijekoolenbrander.com`.
4. **Then** -> Type **Dynamic**, Expression `concat("https://www.teijekoolenbrander.com", http.request.uri.path)`, Status code **301**, tick **Preserve query string**.
5. **Deploy**.

The apex DNS record must be proxied (orange cloud) for the rule to work. Adding the domain through Pages does this.

Note: a `_redirects` file on Pages cannot redirect based on the host name, which is why this is done in the dashboard.

### B5. Force HTTPS

1. Cloudflare -> `teijekoolenbrander.com` -> **SSL/TLS** -> **Overview**: set encryption mode to **Full** (or Full (strict)). Not "Flexible".
2. **SSL/TLS** -> **Edge Certificates** -> turn on **Always Use HTTPS**.

## Part C: Check that it works

- `http://teijekoolenbrander.com` ends up at `https://www.teijekoolenbrander.com/`.
- `http://www.teijekoolenbrander.com` ends up at `https://www.teijekoolenbrander.com/`.
- A made-up address such as `https://www.teijekoolenbrander.com/nope` shows the custom 404 page.
- Click through every page (home, projects, a project page, etc.).
- The padlock is shown in the browser address bar.
- Send a test email to `contact@teijekoolenbrander.com` if email is set up.

## Part D: Updating the site later

Commit and push to `main`. Cloudflare rebuilds and the site is live in a minute or two. Pushing any other branch (or opening a pull request) creates a preview URL, shown in the Cloudflare project under **Deployments**, so you can check changes before they go live. If a build fails, the live site stays on the last good version.

## Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| Build fails with a Node version error | Astro 7 needs Node 22.22 or newer. Set the variable `NODE_VERSION` = `22` (Project -> Settings -> Variables and Secrets) and retry the deploy. Verify in dashboard that the build system version is the latest (v3). |
| "Too many redirects" in the browser | SSL/TLS mode is Flexible. Set it to **Full** (SSL/TLS -> Overview). |
| Custom domain stuck on "Pending" | Nameservers not active yet, or a leftover DNS record at the same name. In Cloudflare DNS, delete old `A`/`CNAME` records for `www` or `@` that point to GoDaddy. |
| Email stopped working | MX/TXT records missing in Cloudflare DNS. Re-add them from GoDaddy's DNS list (B1 step 3). MX records must be "DNS only" (grey cloud). |
| Old site still shows | Wait for DNS (up to 24h) and hard refresh, or try a private window. |
| 404 page not showing | Check `dist/404.html` exists after a build; Pages serves it automatically. |

## Privacy reminder

Never paste passwords, recovery codes or API tokens into chat, issues or git commits. Log in to Cloudflare, GoDaddy and GitHub yourself, and turn on two-factor authentication on all three.
