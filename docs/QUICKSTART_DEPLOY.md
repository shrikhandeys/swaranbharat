# Quickstart — Deploy Swaranbharat to Hostinger (plain-English, ~15 min)

Follow in order. Each step says **what to click** and **what to run**.
If a step fails, jump to the Troubleshooting section at the bottom.

---

## Step 0 — What you need in front of you

- [ ] Hostinger login (email + password) — https://hpanel.hostinger.com
- [ ] Domain registered: `swaranbharatexports.com` (yes)
- [ ] A laptop with internet
- [ ] 15 minutes

---

## Step 1 — Enable Node.js 22 on Hostinger (one-time)

1. Login to **hPanel** → pick hosting plan *Premium Web Hosting*.
2. Left menu → **Advanced → Node.js**.
3. Click **"Create application"**.
4. Fill in:
   - **Node.js version**: `22.x`
   - **Application mode**: `Production`
   - **Application root**: `app` (Hostinger prepends `/home/u……/`)
   - **Application URL**: `swaranbharatexports.com`
   - **Startup file**: leave blank for now (we'll set it after build)
5. Click **Create**. Hostinger creates the folder.

---

## Step 2 — Connect domain to hosting (one-time)

1. hPanel → **Domains → swaranbharatexports.com**.
2. If it says *"Parked / Not connected"* → click **Connect to hosting
   plan** → choose your Premium plan → **Confirm**.
3. Wait 5–15 minutes for DNS to update. You can continue the other
   steps meanwhile.

---

## Step 3 — Enable free SSL (HTTPS)

1. hPanel → **Security → SSL**.
2. Select `swaranbharatexports.com` → click **Install SSL** (free
   Let's Encrypt, ~2 minutes).
3. After it's green, toggle **Force HTTPS** ON.

---

## Step 4 — Get SSH access (one-time)

1. hPanel → **Advanced → SSH Access**.
2. Click **Enable SSH**.
3. Note the shown details:
   - Host: `145.79.58.134`
   - Port: `65002` (or whatever Hostinger shows — **not** 22)
   - Username: `u……`
   - Password: your hPanel password (or a dedicated one if set)

On your laptop open **Terminal** (Mac / Linux) or **PowerShell**
(Windows) and connect:

```bash
ssh -p 65002 u……@145.79.58.134
```

Enter password. You should see `u……@srv… $`.

---

## Step 5 — Clone the site & install it

Copy-paste these commands into the SSH terminal, one block at a time:

```bash
cd ~
rm -rf app                # remove the empty folder Hostinger made
git clone https://github.com/<YOUR-GITHUB-USERNAME>/swaranbharat-website.git app
cd app
```

> Don't have the GitHub URL yet? I'll send it the moment I push the PR.
> You can also download the code as a ZIP from GitHub, upload via
> Hostinger **File Manager**, and unzip there.

Install dependencies and build the production bundle:

```bash
npm ci
npm run build
```

Should end with `Compiled successfully` — around 60–90 seconds.

---

## Step 6 — Start the app with PM2 (keeps it running forever)

```bash
npm install -g pm2
pm2 start npm --name swaranbharat -- start
pm2 save
pm2 startup        # copy-paste the line it prints, then press Enter
```

Verify it's alive:
```bash
curl -f http://localhost:3000/api/health
# Expected: {"status":"ok", ...}
```

---

## Step 7 — Tell Hostinger to route traffic to port 3000

1. hPanel → **Advanced → Node.js** → open the app you created.
2. Set **Startup file** = `node_modules/next/dist/bin/next`
3. Arguments: `start -p 3000`
4. Save → click **Restart**.

(Alternative: Hostinger also supports running `npm start`; if the
above doesn't work, set startup to `npm` and arguments to
`run start`.)

---

## Step 8 — Test it in your browser

Open in your phone + laptop browsers:

- https://swaranbharatexports.com → should load the home page.
- https://swaranbharatexports.com/api/health → should show JSON with
  `"status":"ok"`.
- Padlock icon → click → certificate is valid Let's Encrypt.
- Submit a test inquiry from /contact → then SSH back in and run:
  ```bash
  cat ~/app/data/inquiries/buyer.csv
  ```
  Your test row should be the last line.

---

## Step 9 — (Optional, strongly recommended) Cloudflare for worldwide speed + DDoS protection

1. https://dash.cloudflare.com/sign-up → free plan.
2. Add site `swaranbharatexports.com` → Cloudflare scans DNS.
3. Toggle orange cloud **ON** for `@` and `www`.
4. Copy the 2 nameservers Cloudflare gives you (look like
   `eva.ns.cloudflare.com`, `rick.ns.cloudflare.com`).
5. hPanel → **Domains → Nameservers → Change** → paste them.
6. Wait 1–24 hours for propagation.
7. Cloudflare → **SSL/TLS** → set to **Full (strict)**.
8. Cloudflare → **Speed → Optimization** → turn on Auto Minify +
   Brotli.

Done. Now your site is cached on 300+ servers globally.

---

## Step 10 — Set up uptime monitoring (1 minute, free)

1. https://uptimerobot.com → sign up free.
2. **Add new monitor** → type `HTTP(S)`.
3. URL: `https://swaranbharatexports.com/api/health`
4. Interval: `5 minutes`.
5. Add alert contact: your email + phone (SMS on paid plan).

You'll get an email the moment the site goes down.

---

## Updating the site later

Whenever there's a new version (I push a PR, you merge it):

```bash
ssh -p 65002 u……@145.79.58.134
cd ~/app
git pull
npm ci
npm run build
pm2 restart swaranbharat
```

Takes ~60 seconds. Zero visitor impact because PM2 restart is quick
and Cloudflare is caching.

Better: use the **blue-green deploy** flow in `DEPLOYMENT.md`
(Section 5) — full zero-downtime.

---

## Taking the site offline for maintenance

```bash
pm2 set swaranbharat:MAINTENANCE_MODE true
pm2 restart swaranbharat
# … do your work …
pm2 set swaranbharat:MAINTENANCE_MODE false
pm2 restart swaranbharat
```

Visitors see the branded *"We'll be right back"* page with your
WhatsApp + email during maintenance.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `ssh: connection refused` | Wrong port — Hostinger uses port `65002`, not 22. |
| `npm ci` hangs | Check Node version: `node -v` should say `v22.…`. If not, run `nvm install 22 && nvm use 22`. |
| Browser shows Hostinger's default page | DNS hasn't propagated yet, wait 15–30 min. Or the Node.js app isn't started — `pm2 status`. |
| `502 Bad Gateway` | PM2 app crashed: `pm2 logs swaranbharat` → read last 20 lines → usually a missing env var. |
| SSL padlock missing | Re-install SSL from hPanel → Security → SSL. Toggle Force HTTPS off → on. |
| Inquiries not appearing in CSV | Permission issue: `cd ~/app && mkdir -p data/inquiries && chmod 755 data && chmod 755 data/inquiries`. |
| Site slow from abroad | Enable Cloudflare (Step 9). Mumbai server + Cloudflare POPs = sub-500ms globally. |

---

## TL;DR — 5 commands, copy-paste order

```bash
ssh -p 65002 u……@145.79.58.134                            # step 4
git clone https://github.com/<YOU>/swaranbharat-website.git ~/app && cd ~/app    # step 5
npm ci && npm run build                                     # step 5
npm install -g pm2 && pm2 start npm --name swaranbharat -- start && pm2 save    # step 6
curl -f http://localhost:3000/api/health                    # step 8
```

Then open https://swaranbharatexports.com in your browser — **done**.
