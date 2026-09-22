# agro Bridge — Next.js

Ghana's agricultural marketplace. **Next.js 14** frontend and **Django** backend (admin + REST API). Connecting farmers to customers.

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
│   │   ├── shop/           # Marketplace
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
│   ├── components/         # Shared UI (Navbar, Footer, …)
│   └── lib/                # Config, Django API client, demo data, types
├── .env.local              # Local secrets (not committed)
└── package.json
```

## Fonts (uniform site-wide)

Loaded once via `next/font` in `src/app/layout.tsx`:

- **Display:** Bricolage Grotesque (`font-display`) — headings, brand, prices
- **Body:** Figtree (`font-sans`) — all UI text, forms, nav

Do not import Google Fonts in page CSS. Use `font-display` / `font-sans` Tailwind classes only.

## Setup

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
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

## Environment

See `.env.example`. All `NEXT_PUBLIC_*` values are safe for the browser.

## Deploy

Vercel detects Next.js automatically. Set the same env vars in the Vercel project settings.
