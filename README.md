# AgroBridge — Next.js

Ghana's B2B agricultural marketplace. **Next.js 14** frontend and **Django** backend (admin + REST API), connecting verified FBO supply with recurring buyers in Greater Accra.

## Folder structure

```
HarvestGH/
├── backend/                # Django API + admin
│   └── marketplace/
├── public/                 # Static assets (images, logo)
│   └── images/
├── src/
│   ├── app/                # App Router pages
│   │   ├── page.tsx        # Home
│   │   ├── api/assistant/  # Server-only Anthropic proxy
│   │   ├── shop/
│   │   ├── checkout/
│   │   ├── about/
│   │   ├── contact/
│   │   ├── harvest-calendar/
│   │   ├── order-status/
│   │   ├── farmer-portal/
│   │   ├── register/farmer/
│   │   ├── register/buyer/
│   │   ├── privacy/ · terms/
│   │   ├── layout.tsx      # Root layout + next/font
│   │   └── globals.css     # Tailwind + design tokens
│   ├── components/         # Shared UI (Navbar, Footer, Icon, …)
│   └── lib/                # Config, Django API client, demo data, types
├── .env.local              # Local secrets (not committed)
└── package.json
```

## Fonts (uniform site-wide)

Loaded from the repository's self-hosted font files in `public/fonts`:

- **Display:** Plus Jakarta Sans (`font-display`) — headings, brand, prices
- **Body:** Inter (`font-body` / `font-sans`) — UI text, forms, nav

Do not import Google Fonts in page CSS. Use `font-display` / `font-body` Tailwind classes only.

## Setup

```bash
npm install
cp .env.example .env.local
# Set NEXT_PUBLIC_API_URL and optional ANTHROPIC_API_KEY (server-only)
npm run dev                  # http://localhost:3000
```

Django admin (add products + analytics):

```bash
cd backend
python -m venv .venv && .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_demo
python manage.py runserver
```

Admin: http://127.0.0.1:8000/admin/ · Analytics: http://127.0.0.1:8000/admin/analytics/

```bash
npm run build
npm start
```

## Editing content

Marketing content is managed in the Django admin. Start the backend, sign in at `/admin/`, and edit products, counters, partners, testimonials, posts, crops, team members, FAQs, and roadmap stages there. The frontend falls back to demo content only when the API is unavailable.

## Environment

See `.env.example`.

- `NEXT_PUBLIC_*` values are safe for the browser.
- `ANTHROPIC_API_KEY` is **server-only** (used by `/api/assistant`). Never prefix it with `NEXT_PUBLIC_`.

## Deploy

Vercel must build the **Next.js** app (not the legacy static HTML). In the Vercel project:

1. Framework preset: Next.js (`vercel.json` already sets this)
2. Root directory: the repo root that contains `package.json` / `src/`
3. Set env vars from `.env.example` (including server-only `ANTHROPIC_API_KEY` if used)
4. Redeploy so the Next.js build replaces any prior static output

See `DESIGN.md` for the design audit, image assignment, and rationale.

## Do not reintroduce

- Emoji in `src/` (use `src/components/Icon.tsx`)
- Glassmorphism, backdrop-blur nav, hero zoom / fade-up entrance animations
- Invented stats (especially “100%”, file counts, database table counts)
- Unverified social account URLs or letter-tile social icons
- Reusing `/images/market.jpg` as a section background
- Gradients as primary section backgrounds; card lift / `translate-y` hover
- Browser-exposed Anthropic keys (`NEXT_PUBLIC_ANTHROPIC_*`)
- Brand spelling other than **AgroBridge**
- Mixing display fonts (stick to Plus Jakarta Sans + Inter)
