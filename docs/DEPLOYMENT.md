# Deployment Guide — Hostinger + Cloudflare + SSL

Step-by-step playbook to get the site live at
https://swaranbharatexports.com with SSL, worldwide CDN, and
zero-downtime deploys.

## Prerequisites

- Hostinger Business plan with Node.js 22 enabled
- Domain `swaranbharatexports.com` pointing to `145.79.58.134`
- GitHub repo access
- (Optional) Cloudflare free account

## 1. First-time server setup (SSH)

```bash
ssh u123456@145.79.58.134                  # use your Hostinger creds
cd ~
git clone https://github.com/<you>/swaranbharat-website.git app
cd app
npm ci --production=false
npm run build
```

Install PM2 (process manager, keeps the app alive + restarts on
crashes):

```bash
npm install -g pm2
pm2 start npm --name swaranbharat -- start
pm2 save
pm2 startup          # follow the printed command to auto-start on reboot
```

## 2. Hostinger Node.js app config

In the Hostinger control panel → **Advanced → Node.js**:

- Application root: `/home/u123456/app`
- Startup file: `node_modules/next/dist/bin/next` (or `npm start`)
- Node version: **22**
- Application URL: swaranbharatexports.com
- Port: 3000 (forwarded to 80/443 by Hostinger)
- Save → **"Run NPM install"** → **Start**.

## 3. Enable SSL

Hostinger → **Security → SSL** → select `swaranbharatexports.com` →
**Install SSL (Let's Encrypt, free)** → wait 5 minutes → toggle
**Force HTTPS** on.

Confirm headers:
```bash
curl -I https://swaranbharatexports.com/
# Expect:
#  HTTP/2 200
#  strict-transport-security: max-age=63072000; includeSubDomains; preload
#  x-content-type-options: nosniff
#  x-frame-options: DENY
#  referrer-policy: strict-origin-when-cross-origin
#  content-security-policy: default-src 'self'; …
```

## 4. Cloudflare in front (free CDN + DDoS + WAF)

1. Sign up at https://cloudflare.com → **Add site** →
   `swaranbharatexports.com` → free plan.
2. Cloudflare scans DNS → it auto-imports your A record
   (`145.79.58.134`) and any MX records from Hostinger. Toggle the
   orange cloud **on** for the root + `www`.
3. Copy the two Cloudflare nameservers (e.g. `eva.ns.cloudflare.com`,
   `rick.ns.cloudflare.com`).
4. In Hostinger → **Domains → Nameservers → Change** → paste the
   Cloudflare values. Propagation: 1–24 hours.
5. Cloudflare → **SSL/TLS** → set encryption mode to **Full (strict)**.
6. Cloudflare → **Speed → Optimization** → enable Auto Minify (JS,
   CSS, HTML) and Brotli.
7. Cloudflare → **Caching → Configuration** → Caching level: Standard.
   Browser cache TTL: 1 month.
8. (Optional) Cloudflare → **Security → WAF** → enable the free
   managed rulesets for OWASP core + high-risk bots.

Result: every HTML/asset hop is cached at 300+ edge POPs worldwide.
India visitors hit Hostinger directly; others hit the nearest
Cloudflare POP.

## 5. Zero-downtime deploys (blue-green pattern)

Two PM2 apps on different ports, flipped via Hostinger's port setting.

```bash
# ~/app (blue, port 3000) is currently live
cd ~
git clone https://github.com/<you>/swaranbharat-website.git app-green
cd app-green
npm ci && npm run build
PORT=3001 pm2 start npm --name swaranbharat-green -- start

# Health-check the new build before switching
curl -f http://localhost:3001/api/health || { echo "new build unhealthy"; exit 1; }

# Flip: change Hostinger port from 3000 → 3001 and save
# (or swap reverse-proxy target if you run Nginx)

# Stop the old app
pm2 delete swaranbharat
mv app app-blue-old && mv app-green app
pm2 save
```

Users never see a 502 during the swap because the green app was
already warmed up and health-checked.

## 6. Uptime monitoring

- UptimeRobot (free, 50 monitors, 5-min checks)
  - Monitor type: HTTPS
  - URL: `https://swaranbharatexports.com/api/health`
  - Alert contacts: email + WhatsApp
- Or Cloudflare Health Checks (free for Pro, but Cloudflare's free
  Analytics → Reliability tab gives you enough).

## 7. Backups (CSV inquiries + code)

Code is already in git. CSV inquiries need a cron job:

```bash
# on server:
crontab -e
# add:
0 */6 * * * tar -czf /home/u123456/backups/inquiries-$(date +\%F-\%H).tar.gz /home/u123456/app/data/inquiries
```

Copy backups offsite weekly to Google Drive / Dropbox via `rclone`.

## 8. Maintenance mode

```bash
# start maintenance
pm2 set swaranbharat:MAINTENANCE_MODE true
pm2 set swaranbharat:NEXT_PUBLIC_MAINTENANCE_ETA "15 minutes"
pm2 restart swaranbharat

# end maintenance
pm2 set swaranbharat:MAINTENANCE_MODE false
pm2 restart swaranbharat
```

Users see a branded 503 page with logo, ETA, WhatsApp, and email.

## 9. Rollback if something breaks

```bash
cd ~
pm2 stop swaranbharat
mv app app-broken && mv app-blue-old app
pm2 restart swaranbharat
```

## 10. Post-deploy checklist

- [ ] `curl -I https://swaranbharatexports.com/` shows HTTP/2 200 +
      all security headers.
- [ ] `curl https://swaranbharatexports.com/api/health` returns
      `{"status":"ok", …}`.
- [ ] Hero slider loads + rotates.
- [ ] Inquiry form submission writes to `data/inquiries/buyer.csv`.
- [ ] WhatsApp button opens wa.me with prefilled message.
- [ ] Chatbot answers "MOQ" question.
- [ ] `https://www.ssllabs.com/ssltest/analyze.html?d=swaranbharatexports.com`
      scores **A** or better.
- [ ] Lighthouse on Moto G4 / Slow 4G scores ≥ 90 on Performance.
- [ ] `npm run test:load:smoke -- --env BASE_URL=https://swaranbharatexports.com`
      passes.
