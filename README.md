# Swaranbharat Exportsarathi — Website

Lean, static marketing site for **Swaranbharat Exportsarathi** — a Pune-based
merchant exporter of premium Indian dehydrated agri-products.

Built with **Vite + React + TypeScript + Tailwind CSS**. The production build
is 100% static HTML/CSS/JS — it runs on any basic shared host (Hostinger
Single / Premium, etc.). No Node.js required on the server.

## Quickstart

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # outputs to ./dist
npm run preview    # preview the built site locally
```

## Deploying to Hostinger (shared hosting)

1. Run `npm run build`. The static site is written to `dist/`.
2. In Hostinger's **File Manager**, open `public_html/` (or your domain folder).
3. Upload **the contents** of `dist/` (not the folder itself) to `public_html/`.
4. Visit your domain — the site should load immediately.

Routing uses `HashRouter`, so deep links like `/#/products` work without any
`.htaccess` rewrites.

### Contact form (optional)

The contact form uses [Web3Forms](https://web3forms.com) (free: 250
submissions/month). To enable real email delivery:

1. Get a free access key at https://web3forms.com/.
2. Create a `.env` file at the project root:
   ```
   VITE_WEB3FORMS_KEY=your-key-here
   ```
3. Rebuild (`npm run build`) and re-upload `dist/`.

Without a key, the form gracefully falls back to opening the user's mail
client with a prefilled email to `sales@swaranbharatexports.com`.

## Project layout

```
src/
  App.tsx            # routes
  main.tsx           # entry point (HashRouter)
  index.css          # Tailwind base + shared utility classes
  components/        # Header, Footer, ProductCard
  pages/             # Home, Products, About, Contact
  data/              # company profile + product catalog
public/
  logo.png
  products/*.jpg     # product photos
```

Edit `src/data/company.ts` and `src/data/products.ts` to update content — no
code changes needed.
