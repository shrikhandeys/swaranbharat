# Swaranbharat Exportsarathi — User Manual

This guide walks a visitor through every feature of the site.

## 1. Top bar — accessibility controls

The dark navy bar at the very top of every page offers:

- **A−, A, A+** — decrease / reset / increase body text size. Preference
  is saved in the browser and persists between visits.
- **Theme toggle** — cycle through *Normal*, *High contrast* (black /
  yellow), *Dark*, and *Night reading* (sepia). Helps users with low
  vision or who browse at night.
- **Skip to main content** — jumps focus past the header for keyboard
  and screen-reader users.
- **Translate this page** — Google Translate dropdown with 100+
  languages. Page is rewritten in-place; refresh to restore English.
- **Screen reader access** — standard WAI-ARIA landmarks are set so
  NVDA / JAWS / VoiceOver / TalkBack read the page correctly.

## 2. Main header

- **Logo** takes you home.
- **Menu**: Home, About, Products, Services, Certifications, Contact.
- **Request a Quote** button jumps to the inquiry form on /contact.
- On mobile, the menu collapses into a hamburger icon (tap to open).

## 3. Home page

- **Announcement marquee** at the top scrolls short updates (new
  arrivals, certifications, offers).
- **Hero slider** auto-rotates every 6 seconds through 5 banners.
  Controls:
  - Left / Right arrows to navigate manually
  - Pause / Play button
  - Keyboard: `←` and `→` arrow keys
  - Dots below the hero show current slide
- **Products showcase** previews our best-sellers; click any card to
  see details or jump to /products.
- **About preview**, **Stats counter**, **Testimonials**, and **CTA
  banner** round out the page.

## 4. Products

- `/products` — grid of all 16 dehydrated agri products.
- Each card shows image, name, short description, and a "View
  details" link.
- `/products/[slug]` — hero image, full description, specs (packaging,
  shelf life, incoterms, MOQ), and a **Request this product** button
  that pre-fills the inquiry form with the product name.

## 5. Contact & inquiry form

The multi-step form at `/contact#inquiry` does smart filtering by user
type:

1. **Basic info** — name, email, phone, country.
2. **User type** — Buyer, Supplier, Agent, Retail, Service, Investor,
   or Other. Subsequent fields change based on the choice.
   - *Buyer:* company, business type (Importer / Distributor / etc.),
     product interest, quantity, frequency, destination port.
   - *Supplier:* products offered, certifications, monthly capacity,
     location.
   - *Agent:* years of experience, region covered, previous clients.
3. **Message** and **"I confirm I am a genuine buyer"** checkbox.
4. **Submit** — the site validates every field, blocks bots via a
   hidden honeypot, rate-limits to 5 inquiries per hour per network,
   and writes the inquiry to category-specific CSV files the owner can
   download.

## 6. Floating widgets (bottom right)

- **WhatsApp button** — opens WhatsApp Web / app with a pre-filled
  inquiry message to +91 9096172205.
- **AI assistant** — rule-based chatbot answering FAQs about products,
  MOQ, samples, shipping, certifications, pricing, payment terms,
  office hours, and contact. Unknown questions are routed to WhatsApp
  / email.

## 7. Footer

- Company info, registrations, quick links, social media icons
  (Facebook, Instagram, LinkedIn, X, YouTube, Google Business), and
  full contact details with a Google Maps embed on /contact.

## 8. Maintenance mode

If the site is briefly offline for updates, you'll see a branded
"We'll be right back" page with direct WhatsApp and email contacts so
serious inquiries still reach us.

## 9. Keyboard shortcuts

- `Tab` / `Shift+Tab` — move between links and controls.
- `Enter` — activate the focused link / button.
- `←` / `→` — navigate the hero slider.
- `Esc` — close the chatbot dialog.

## 10. Supported browsers & devices

Chrome, Edge, Firefox, Safari — last 2 major versions. iOS 14+,
Android 7+. Minimum screen: 320 px. Works on slow 3G with graceful
image fallbacks and lazy-loaded widgets.
