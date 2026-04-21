# Integration Setup — Zoho, MSG91 OTP, reCAPTCHA, WhatsApp

All of these are **optional for Phase 1** (the site runs fine without
them) but are needed for Phase 2 / 3 automation.

## 1. Zoho Mail (for info@ and sales@)

1. Sign up at https://www.zoho.com/mail → **Try now Free Forever
   Plan** (up to 5 users).
2. Add your domain `swaranbharatexports.com`.
3. Zoho gives you a TXT record like `zoho-verification=zb12345678`.
   Paste it into:
   Hostinger → **Domains → DNS / Nameservers → Manage DNS records →
   Add TXT** (or, if Cloudflare is in front, add it at Cloudflare).
4. Zoho gives you 2 MX records:
   ```
   mx.zoho.com      priority 10
   mx2.zoho.com     priority 20
   ```
   Delete any existing MX records (Hostinger sometimes adds its own),
   then add Zoho's.
5. Zoho SPF / DKIM: add the two TXT records Zoho provides (prevents
   your emails landing in spam).
6. Create mailboxes in Zoho → Admin Console → Users:
   - `info@swaranbharatexports.com`
   - `sales@swaranbharatexports.com`
   - `noreply@swaranbharatexports.com`
7. Test by sending mail to them.

**Phase 2 — auto-reply via SMTP:**
- Zoho Mail → Settings → Mail Accounts → find `noreply` → **Generate
  app-specific password**.
- Add to Hostinger env:
  ```
  SMTP_HOST=smtp.zoho.in
  SMTP_PORT=587
  SMTP_USER=noreply@swaranbharatexports.com
  SMTP_PASS=<app-password>
  SALES_TO=sales@swaranbharatexports.com
  ```

## 2. MSG91 (mobile OTP — India/international)

1. Sign up at https://msg91.com → get Auth Key (dashboard top-right).
2. Under **DLT Compliance** (mandatory for Indian telecom), register
   your business and get a Principal Entity ID (takes 2–3 working
   days).
3. Create an SMS **template** for OTP:
   ```
   Your Swaranbharat OTP is ##OTP##. Valid for 10 min. Do not share.
   ```
   Note the template ID.
4. Pricing: ~₹0.18 per SMS (India), ~₹2-5 international. Load credit.
5. Add to Hostinger env:
   ```
   MSG91_AUTH_KEY=<your-key>
   MSG91_TEMPLATE_ID=<template-id>
   MSG91_SENDER=SWBHRT
   ```
6. Devin wires `/api/otp/send` and `/api/otp/verify` endpoints in
   Phase 2.

## 3. Google reCAPTCHA v3 (invisible bot filter)

1. Go to https://www.google.com/recaptcha/admin/create.
2. Label: *Swaranbharat*. Type: **reCAPTCHA v3**.
3. Domains: `swaranbharatexports.com`, `www.swaranbharatexports.com`,
   `localhost`.
4. Accept ToS → Submit. Copy **Site Key** + **Secret Key**.
5. Add to Hostinger env:
   ```
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<site-key>
   RECAPTCHA_SECRET_KEY=<secret-key>
   ```
6. Threshold: reject requests with score `< 0.5`.

## 4. Zoho CRM (lead pipeline + scoring)

1. Sign up at https://www.zoho.com/crm → Free for up to 3 users.
2. Create a **Connected App** (Setup → Developer Space →
   Self-Client):
   - Client ID, Client Secret, Refresh Token.
   - Scope: `ZohoCRM.modules.leads.ALL,ZohoCRM.modules.contacts.ALL`.
3. Add to Hostinger env:
   ```
   ZOHO_CLIENT_ID=<id>
   ZOHO_CLIENT_SECRET=<secret>
   ZOHO_REFRESH_TOKEN=<token>
   ZOHO_API_DOMAIN=https://www.zohoapis.in
   ```
4. Devin wires `createLead()` + lead-scoring rules in Phase 3.

**Lead scoring rules (pre-wired):**
- +10 company email (not gmail/yahoo)
- +20 bulk quantity (≥ 500 kg)
- +15 monthly or long-term frequency
- +5 all optional fields filled
- +10 "I confirm I am a serious buyer" ticked
- Follow-up priority: score > 30 = genuine.

## 5. WhatsApp Business automation

### Option A — Interakt / AiSensy (recommended for non-devs)

1. Sign up at https://www.interakt.shop or https://www.aisensy.com.
2. Complete Meta Business verification (takes 1–3 days).
3. Add templates (pre-approved messages):
   - `welcome_buyer` — sent right after inquiry.
   - `sample_request` — sent when user requests sample.
   - `quote_ready` — when quotation is sent.
4. Generate API key. Add to Hostinger env:
   ```
   WHATSAPP_PROVIDER=interakt
   WHATSAPP_API_KEY=<key>
   WHATSAPP_FROM=+919096172205
   ```
5. Cost: ~₹2,500/month + ~₹0.25 per message.

### Option B — Meta Cloud API (free, more setup)

1. https://developers.facebook.com/apps/create → type "Business".
2. Add WhatsApp product → register your number → verify OTP.
3. Get Phone Number ID + Permanent Token (System User method).
4. Create message templates in Meta Business Manager.
5. Add to Hostinger env:
   ```
   WHATSAPP_PROVIDER=meta
   WHATSAPP_PHONE_NUMBER_ID=<id>
   WHATSAPP_ACCESS_TOKEN=<token>
   WHATSAPP_FROM=+919096172205
   ```
6. Cost: free for the first 1,000 service conversations / month.

## 6. Putting it all together (end-to-end flow, Phase 3)

```
User fills inquiry form
      ↓
Honeypot + rate-limit pass
      ↓
reCAPTCHA v3 score ≥ 0.5
      ↓
MSG91 mobile OTP verified
      ↓
Lead scored + persisted to CSV + pushed to Zoho CRM
      ↓
Parallel:
  (a) Auto-reply email via Zoho SMTP ("Thanks, we'll respond in 24 h")
  (b) Internal alert to sales@swaranbharatexports.com + your email
  (c) WhatsApp template message sent to the user
      ↓
You follow up → deal conversion
```

You will never be locked in to any one provider; each integration is
behind a small wrapper (`src/lib/integrations/*.ts`) that can be
swapped without touching page code.
