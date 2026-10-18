# Deploying the site to GoDaddy (step by step)

This guide puts the finished website on your GoDaddy hosting. You do not need to be technical. Go slowly and tick each step off.

Important rules:
- **Never paste your FTP or GoDaddy password into a chat, an email, or any file in this project.** Never commit it to git.
- Only upload when you are ready for the site to go live. The upload replaces what visitors see.

---

## Step 1. Check that your GoDaddy plan can host this site

The site is a folder of plain files. It needs a plan where you can put files on a server yourself.

1. Sign in at godaddy.com and open **My Products**.
2. Find your hosting product next to `teijekoolenbrander.com`.

| What you see | Meaning |
|---|---|
| **Web Hosting** (Economy, Deluxe, Ultimate, or "Linux Hosting") with a **cPanel Admin** button | Works. Continue with this guide. |
| **Websites + Marketing**, **Website Builder**, or "GoDaddy Studio" (you design the site inside GoDaddy's editor) | Does **not** work. It cannot host custom files. You need to buy a Web Hosting (cPanel) plan, or ask your manager about other hosting. |

Tip: click **Manage** on the hosting product. If you see a **cPanel Admin** button, you are fine.

---

## Step 2. Build the site on your computer

1. Open a terminal in the `website` folder (`C:\Users\teije\website`).
2. Run:
   ```
   npm run build
   ```
3. When it finishes without errors, a folder called `dist` contains the finished site. It must contain `index.html`, `404.html`, and a hidden file called `.htaccess`.

Shortcut that also makes a ready-to-upload zip file:
```
node scripts/zip-dist.mjs
```
This builds the site and creates `deploy\site.zip`. The zip holds the **contents** of `dist` (so `index.html` is at the top level of the zip, not inside a folder). Nothing is uploaded by this command.

---

## Step 3. Upload with cPanel File Manager (recommended)

1. In GoDaddy **My Products**, click **Manage** on your hosting, then **cPanel Admin**.
2. Open **File Manager**.
3. Click **Settings** (top right) and tick **Show Hidden Files (dotfiles)**. Click **Save**. This is needed so you can see and replace `.htaccess`.
4. Open the folder `public_html`. This is the folder visitors see. If it contains placeholder files (for example a GoDaddy "coming soon" `index.html` or `default.html`), delete them. Do **not** delete `.htaccess` if you did not create it and are unsure; it is replaced by ours in the next steps, so deleting it is fine too.
5. Click **Upload** and choose `deploy\site.zip` from your computer. Wait until the bar shows 100%, then click **Go Back**.
6. Right-click `site.zip` in `public_html` and choose **Extract**. Extract to `/public_html` (the default). Click **Extract File(s)**, then **Close**.
7. Check the result inside `public_html`. You should see directly in it:
   - `index.html`, `404.html`, `robots.txt`, `sitemap-index.xml`
   - folders `_astro`, `about`, `companies`, `contact`, `projects`
   - the hidden file `.htaccess`
   
   If you see a single folder (like `dist` or `site`) containing all of that, the files are one level too deep. Move everything out of that folder into `public_html`, or delete and redo the extract.
8. Delete `site.zip` from `public_html` (right-click, **Delete**).

### Alternative: FTP/SFTP with FileZilla

1. Install FileZilla Client (filezilla-project.org, the free "Client").
2. In cPanel, open **FTP Accounts** to find or create an FTP account. Note the host name, user name and (if SFTP is offered) the port. Set the password yourself; do not share it with anyone.
3. In FileZilla, enter the host, user name, password and port, then **Quickconnect**. Prefer SFTP (port 22) or FTP with TLS if GoDaddy offers it.
4. In FileZilla, open **Server > Force showing hidden files**, so `.htaccess` is visible.
5. On the right (server side) open `public_html`. On the left (your computer) open `C:\Users\teije\website\dist`.
6. Select **everything inside** `dist` (press Ctrl+A in the left pane, which includes `.htaccess`) and drag it into `public_html`. Do not drag the `dist` folder itself.
7. Wait for the queue to finish with no failed transfers. Confirm `.htaccess` is listed on the server side.

---

## Step 4. Make sure HTTPS (SSL) works for both addresses

The site forces HTTPS, so a certificate must exist for **both** `www.teijekoolenbrander.com` and `teijekoolenbrander.com`.

1. In GoDaddy **My Products**, look at your hosting. Many Web Hosting plans include a free SSL certificate; if there is an **SSL Certificates** entry, open it.
2. Check the certificate covers both names (`teijekoolenbrander.com` and `www.teijekoolenbrander.com`). In cPanel you can also open **SSL/TLS Status** (or "AutoSSL"), tick both names and click **Run AutoSSL**.
3. If no certificate is included, GoDaddy sells one. Ask your manager before buying.
4. Certificates can take from a few minutes up to a few hours to appear.

---

## Step 5. Point the domain at the hosting (only if it is not already)

If the domain was bought at GoDaddy and the hosting is on the same GoDaddy account, this is usually already done. Check anyway:

1. GoDaddy **My Products > Domains**, click `teijekoolenbrander.com`, then **DNS** (Manage DNS).
2. Look for these records:
   - **A** record, name `@`, value = the IP address of your hosting (in cPanel, the right-hand sidebar shows "Shared IP Address").
   - **CNAME** record, name `www`, value `@` (or `teijekoolenbrander.com`).
3. If they point somewhere else (for example a parking page or an old site), edit them to match. Do not delete records you do not recognize, such as `MX` (email) and `TXT` records; they keep your email working.
4. DNS changes can take from minutes up to 24 hours to spread.

If the domain is registered at a different company, make the same A and CNAME changes there (or ask your manager).

---

## Step 6. Check that it worked

Use a normal browser window, ideally also a private/incognito window and your phone, so you do not see old cached pages.

1. **One redirect to the right address.** Open `http://teijekoolenbrander.com`. You should end up at `https://www.teijekoolenbrander.com/`. (Developers can confirm it is a single redirect with `curl -I http://teijekoolenbrander.com`, which should show one `301` to `https://www.teijekoolenbrander.com/`.) Also try `https://teijekoolenbrander.com` and `http://www.teijekoolenbrander.com`; both must land on `https://www.teijekoolenbrander.com/`.
2. **Custom 404 page.** Open `https://www.teijekoolenbrander.com/this-page-does-not-exist/`. You should see the site's own "page not found" page with the normal header, not a plain GoDaddy error.
3. **All pages load.** Click through: Home, About, Projects (and each project), Companies, Contact. Check that images and fonts look right.
4. **Padlock.** The address bar shows a padlock with no warning on every page.
5. Optional: open `https://www.teijekoolenbrander.com/sitemap-index.xml` and `/robots.txt`; both should show text.

### If something is wrong

| Problem | Likely fix |
|---|---|
| Plain GoDaddy page or old content | Files are in the wrong folder or an old `index.html` is still there. Re-check Step 3.7. |
| Site has no styling | The `_astro` folder is missing. Re-upload. |
| No redirects, plain 404 page | `.htaccess` is missing. Turn on hidden files and re-upload it. |
| Browser warns "Not secure" | Certificate missing or not yet issued (Step 4). Wait and retry. |
| Bare domain does not redirect | The domain does not point to the hosting (Step 5). Alternatively, set up GoDaddy domain forwarding (301) from `teijekoolenbrander.com` to `https://www.teijekoolenbrander.com`. |
| "Too many redirects" | Ask your manager. Do not keep editing `.htaccess` by hand. |

---

## Updating the site later

1. Make your changes, then run `node scripts/zip-dist.mjs` (or `npm run build`).
2. In cPanel File Manager (hidden files shown), open `public_html` and **delete the old site files** (all the files and folders listed in Step 3.7, including the old `.htaccess`). Do not delete other things you may need, such as a `cgi-bin` folder or email-related folders.
3. Upload and extract the new `site.zip` exactly as in Step 3, then delete the zip.
4. Run the checks in Step 6 again.

Why delete first: the build gives CSS and image files new names each time. Leaving the old ones just wastes space, and removed pages would still stay online.

---

## What to keep private

- FTP and GoDaddy passwords: keep them in a password manager. Never put them in chat, email, code or git.
- `deploy/` (the zip) is generated and is not committed to git.
