# Agro Bridge design notes

## Audit table (Phase 1)

| file | element | generic pattern | replacement |
|------|---------|-----------------|-------------|
| `page.tsx` | hero | Full-bleed photo + dark gradient + heroZoom + fadeUp | Editorial split: text left, flush tomatoes photo right, no motion |
| `page.tsx` | PROOF strip | 50+ / 10+ / 16 / 100% Escrow | Single verifiable fee line (delivery + 1–2% platform fee) |
| `page.tsx` | about teaser | “Built for Ghana's Farmers and Buyers” | Concrete FBO / escrow / delivery mechanics |
| `page.tsx` | CTA | “Ready to buy or sell?” + reused market.jpg gradient | Flat green; “Register your FBO” / “Browse this week's listings” |
| `about/page.tsx` | NUMBERS | “18 Platform files” / “9 Supabase tables” | Removed; before/with comparison instead |
| `about/page.tsx` | WHAT_WE_DO | 4-up “We Connect…” / “Four things. Done well.” | Narrative + before/with columns |
| `about/page.tsx` | founder | Sticky card + nested quote boxes | One column text + photo + single pull quote |
| `about/page.tsx` | CTA copy | “farm-to-market revolution” | Role CTAs without superlatives |
| Surfaces | cards / buttons | `rounded-2xl`, lift shadow, `translate-y` hover | 6px controls / 10px cards; border colour hover only |
| `Navbar` | scroll | Glassmorphism (`backdrop-blur`) | Solid cream + 1px border always |
| `Footer` | social | Letter tiles + unverified social URLs | Removed inventeds; WhatsApp contact only |
| `Chatbot` | chrome | “1” badge, “Online — responds instantly”, bounce dots, 6 pills | “Ask Agro Bridge”, static Typing…, 3 job pills |
| Imagery | market.jpg | Hero + CTA + page headers | Page headers flat green; hero uses tomatoes.jpg; market.jpg fallback/OG only |
| `HowItWorks` | process band | (already distinctive) | Kept as only dark process band |

## Design rationale

Agro Bridge should read as a Ghanaian agricultural marketplace: escrow, FBO group registration, Paystack/MoMo, and published regional delivery fees. The home page now opens with an editorial split (no cinematic zoom), states fees that can be checked in code, and keeps a single dark process band (`HowItWorks`). About leads with operations and the founder story instead of engineering vanity metrics. Typography is Bricolage Grotesque + Figtree; colour stays cream / deep green / gold / charcoal; motion and glass are gone.

## Image assignment

| asset | use |
|-------|-----|
| `tomatoes.jpg` | Home hero (right column) |
| `farmland.jpg` | About mission column |
| `ibrahim.jpg` | About founder |
| Product photos (maize, mango, plantain, eggs, poultry, …) | Shop / featured cards |
| `market.jpg` | OG meta + `onError` fallback only — not a page section background |

## Vercel redeploy

The repo includes `vercel.json` with `"framework": "nextjs"`. Confirm the Vercel project root is the directory with `package.json` / `src/`, not a legacy static HTML folder. Set env from `.env.example` (`ANTHROPIC_API_KEY` server-only). Redeploy so the Next.js build replaces any prior static HarvestGH output.
