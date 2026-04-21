# Owner Guide — Running & Updating swaranbharatexports.com

This is **your** guide. It covers every task you'll need to do after
deployment, in plain language.

## 1. Where the site lives

- **Code** — GitHub repo (private). Any edit becomes a PR.
- **Host** — Hostinger Business (India server `145.79.58.134`),
  Node.js 22 runtime.
- **Domain** — swaranbharatexports.com (Hostinger DNS or Cloudflare in
  front).
- **Inquiry storage** — `/data/inquiries/*.csv` on the server (one
  file per user type + a master `all.csv` + a `inquiries.jsonl`
  append-only log).

## 2. Daily / weekly tasks

| You want to… | Do this |
|---|---|
| See new inquiries | SSH into the server → `cat data/inquiries/all.csv` or download the CSV and open in Excel / Google Sheets |
| Reply to a buyer | Email them directly, or use the WhatsApp link in the CSV's phone column |
| Back up inquiries | `scp user@145.79.58.134:~/app/data/inquiries/*.csv ./backups/` (cron job recommended — see DEPLOYMENT.md) |
| Check uptime | UptimeRobot / Better Uptime dashboard (set up in DEPLOYMENT.md step 6) |

## 3. Editing site content (no coding needed for most fields)

All content lives in `src/data/`:

| File | What it controls |
|---|---|
| `company.ts` | Phone, WhatsApp, email, office address, tagline, social-media URLs |
| `products.ts` | All 16 SKUs — name, description, specs, image path |
| `banners.ts` | Hero slider banners (5) + announcement marquee items |
| `certifications.ts` | Cert name, status (active / in-progress / planned), logo emoji |
| `testimonials.ts` | Customer quotes shown on Home / About |
| `faq.ts` | Chatbot knowledge base (add entries to expand answers) |

**To change content:**
1. Open the relevant `.ts` file in your editor (or directly in GitHub).
2. Edit the value (for example `phone: "+91 9096172205"` → your new
   number).
3. Commit + push → CI runs → deploy script pushes to Hostinger.
4. A Phase-2 admin panel will let you do this through a web UI
   instead of editing files.

## 4. Adding a new product

1. Drop a photo into `public/products/`. Keep it ~1600 px wide, JPG or
   WebP, under 300 KB. Creative-Commons / royalty-free only.
2. Add an entry in `src/data/products.ts`:
   ```ts
   {
     slug: "new-product",
     name: "New Product",
     category: "Powder",
     description: "Short pitch (one paragraph).",
     image: "/products/new-product.jpg",
     moq: "100 kg",
     shelfLife: "12 months",
     packaging: "25 kg HDPE bags",
   }
   ```
3. Commit and push. The product appears on the catalog + gets its own
   `/products/new-product` page automatically.

## 5. Adding a new certification

In `src/data/certifications.ts`:
```ts
{
  code: "FSSAI",
  name: "FSSAI License",
  description: "…",
  status: "active",        // or "in-progress" / "planned"
  logoEmoji: "🏛️",         // replace with <img> when you have a logo file
  documentUrl: "/certs/fssai.pdf",  // optional PDF in /public/certs/
}
```

## 6. Turning on maintenance mode

Whenever you need to take the site down for 5–60 minutes (DNS changes,
major update, etc.):

```bash
# on the Hostinger server
export MAINTENANCE_MODE=true
pm2 restart swaranbharat
```

Every page except `/api/health` now returns HTTP 503 and serves the
branded **"We'll be right back"** page. Flip back with:

```bash
export MAINTENANCE_MODE=false
pm2 restart swaranbharat
```

Zero downtime to toggle — the only "downtime" users see is the
maintenance page itself, which still shows your logo, WhatsApp, and
email so serious buyers can still reach you.

Tip: set `NEXT_PUBLIC_MAINTENANCE_ETA="15 minutes"` to show an
estimated return time on the page.

## 7. Monitoring uptime

1. Sign up free at https://uptimerobot.com.
2. Add monitor → HTTP(S) → URL = `https://swaranbharatexports.com/api/health`.
3. Interval = 5 minutes. Alert when status != 200.
4. Add your email + WhatsApp / Slack as alert contact.

## 8. Setting up email (Zoho)

See `docs/INTEGRATIONS.md` → "Zoho Mail" section. Short version:

1. Sign up at zoho.com/mail (free tier for up to 5 users).
2. Verify `swaranbharatexports.com` via TXT record.
3. Add MX records in Hostinger DNS (copy-paste from Zoho's setup
   wizard).
4. Create mailboxes: `info@`, `sales@`, `noreply@`.
5. Phase 2 auto-reply will use `noreply@` via SMTP.

## 9. Running load tests yourself

Install k6 (free, one-time): https://k6.io/docs/get-started/installation/

```bash
# smoke test (1 min, baseline sanity)
npm run test:load:smoke -- --env BASE_URL=https://swaranbharatexports.com

# stress test (10 min, finds breaking point)
npm run test:load:stress -- --env BASE_URL=https://swaranbharatexports.com

# worldwide test (k6 Cloud, 5 regions, needs free cloud account)
k6 cloud tests/load/worldwide.js --env BASE_URL=https://swaranbharatexports.com
```

Thresholds are pre-set: p95 < 500 ms, error rate < 1 %. Test fails if
the site misses them.

## 10. What you do vs what Devin (or a dev) does

| Activity | Your responsibility | Dev's responsibility |
|---|---|---|
| Register / renew domain | ✓ | — |
| Pay Hostinger renewal | ✓ | — |
| Reply to inquiries | ✓ | — |
| Approve PRs | ✓ | — |
| Update product catalog | ✓ (edit `.ts` files or use Phase-2 admin) | — |
| Security patches / dependency updates | — | ✓ |
| Integrations (Zoho / MSG91 / WhatsApp API) | ✓ (sign up, share API keys) | ✓ (wire them in) |
| Backups | Cron job documented in DEPLOYMENT.md | — |
| Performance tuning | — | ✓ |
