# Testing Guide

## Test pyramid

| Level | Tool | Speed | What it covers |
|---|---|---|---|
| Unit | Vitest + React Testing Library | < 5 s | Component render, FAQ matcher, API handler, validation |
| E2E | Playwright (Chromium · Firefox · WebKit · mobile Chrome · mobile Safari) | ~2 min | Real browser: home, hero slider, inquiry form, API, widgets, security headers |
| Load | k6 (smoke / spike / stress / worldwide) | 1–15 min | p95 latency, throughput, global POP performance |
| Security | `npm audit`, CSP verification in E2E, SSL Labs | instant | Known CVEs + misconfigured headers |

## Running locally

```bash
npm install
npm run lint          # ESLint + Next rules
npm run typecheck     # tsc --noEmit
npm run test          # Vitest unit tests (21 cases)
npm run test:e2e      # Playwright (needs `npx playwright install` once)
npm run build         # Production build
npm run test:load:smoke -- --env BASE_URL=http://localhost:3000
```

`npm run test:all` runs lint + typecheck + unit + build in sequence.

## Browser / OS support matrix

Automated Playwright projects:
- Desktop Chrome / Edge / Chromium
- Desktop Firefox (latest + ESR)
- Desktop Safari (WebKit — covers macOS Safari)
- Mobile Chrome (Pixel 7 viewport)
- Mobile Safari (iPhone 14 viewport)

Manual smoke-test matrix (do after every major deploy):

| OS | Browser | Pages to check |
|---|---|---|
| Windows 11 | Chrome, Edge, Firefox | Home, Products, Contact form |
| macOS | Safari, Chrome | Hero slider, Chatbot, Translate |
| iPhone (iOS 17) | Safari, Chrome | WhatsApp button, mobile menu, scrolling |
| iPad | Safari | Tablet landscape layout |
| Android | Chrome, Samsung Internet | Inquiry form, Hero slider |
| Linux | Firefox | Full flow |

## Performance budget

Automated in CI via Lighthouse (planned):
- Performance ≥ 90 on Moto G4 / Slow 4G
- First Contentful Paint < 1.8 s
- Largest Contentful Paint < 2.5 s
- Total Blocking Time < 200 ms
- Cumulative Layout Shift < 0.1

Load-test thresholds:
- Smoke: p95 < 500 ms, error rate < 1 %
- Spike: p95 < 1.5 s during 500-RPS surge, error rate < 5 %
- Stress: survive 1 000 RPS, error rate < 10 %
- Worldwide: p99 < 3 s from Mumbai, Frankfurt, Virginia, Singapore,
  Sydney

## Accessibility checklist

- WCAG 2.1 AA target.
- Keyboard-only navigation verified on home + contact.
- Screen-reader labels on every interactive control.
- Contrast ≥ 4.5:1 on body, ≥ 3:1 on large text.
- Font size adjustable A− / A / A+ with persistence.
- Skip-to-content link as first tab stop.
- Prefers-reduced-motion respected on the hero slider.

## Security checks

- `npm audit --audit-level=high` in CI.
- CSP verified by E2E (`home.spec.ts` → "sends strict security headers").
- SSL Labs → A grade target after deploy.
- Honeypot + 5-req/hour rate-limit verified in unit + E2E tests.

## What to do when a test fails

1. **CI build fails:** read the log, reproduce locally with
   `npm run test` or `npm run test:e2e`.
2. **Playwright flake:** re-run — the config retries twice on CI. If
   it persists, add `test.slow()` or increase the specific
   `expect(...).toBeVisible({ timeout })`.
3. **Load test fails:** check server CPU / RAM on Hostinger, enable
   Cloudflare caching, or upgrade Node.js plan.
4. **Security-header regression:** `next.config.mjs` is the single
   source — don't override per-route.
