# 🌾 HarvestGH — Complete Setup Guide

**Ghana's Agricultural Marketplace**
Built by Ibrahim Mohammed Lotsu · Ibratech & Graphix · ATU Accra

---

## 📁 What's in This Folder

| File | What It Does |
|------|-------------|
| `index.html` | Homepage with swipeable carousel |
| `listings.html` | Product shop — buyers browse and order |
| `checkout.html` | Order placement with Paystack payment |
| `order-status.html` | Buyers track their order |
| `register-farmer.html` | FBO/supplier registration |
| `register-buyer.html` | Buyer registration |
| `farmer-portal.html` | Farmers check listing status by phone |
| `agent-portal.html` | FBO agent dashboard |
| `admin.html` | **Your admin panel** — manage everything |
| `about.html` | About HarvestGH page |
| `contact.html` | Contact page with FAQ |
| `harvest-calendar.html` | Ghana crop season calendar |
| `fbo-flyer.html` | Printable flyer for FBO meetings |
| `flow-diagram.html` | Business flow diagram |
| `setup.html` | Step-by-step Supabase setup guide |
| `setup.sql` | Database schema — run once in Supabase |
| `chatbot.js` | AI chatbot widget (add to any page) |
| `404.html` | Page not found error page |
| `privacy.html` | Privacy policy |
| `terms.html` | Terms of service |
| `logo.png` | **← PUT YOUR LOGO HERE** |
| `ibrahim.jpg` | **← PUT YOUR PHOTO HERE** |

---

## 🔑 STEP 1 — Set Up Supabase (Your Database)

Supabase is the free database that stores all your products, orders, farmers, and buyers.

### Create Your Project

1. Go to **supabase.com** and create a free account
2. Click **"New Project"**
3. Project name: `harvestgh`
4. Database password: choose a strong password and **save it somewhere safe**
5. Region: choose **EU West** (closest to Ghana)
6. Click **"Create new project"** — wait 2 minutes

### Get Your Keys

1. In your Supabase project, click **Settings** (gear icon) in the left sidebar
2. Click **API**
3. You will see two things you need:
   - **Project URL** — looks like `https://abcdefghij.supabase.co`
   - **anon public key** — a long string starting with `eyJ...`
4. Copy both — you need them in the next step

### Run the Database Schema

1. In Supabase, click **SQL Editor** in the left sidebar
2. Click **"New query"**
3. Open `setup.sql` from this folder
4. Copy everything inside it
5. Paste into the SQL Editor
6. Click **"Run"** (green button)
7. You should see "Success. No rows returned" — that means it worked

### Set Up Storage Buckets

1. Still in Supabase, click **Storage** in the left sidebar
2. Click **"New bucket"**
3. Bucket name: `product-images` · Check **"Public bucket"** · Click Create
4. Click **"New bucket"** again
5. Bucket name: `crop-images` · Check **"Public bucket"** · Click Create

---

## 🔐 STEP 2 — Set Up Your Admin Login

This is how you log into `admin.html` to manage orders, products, and farmers.

### Create Your Admin User

1. In Supabase, click **Authentication** in the left sidebar
2. Click the **"Users"** tab
3. Click **"Add user"** (top right) → **"Create new user"**
4. Enter your email: e.g. `ibrahim@harvestgh.com` (or any email you want)
5. Enter a strong password: e.g. `HarvestGH2026!` (at least 8 characters, mix of letters, numbers, symbols)
6. Click **"Create user"**

### Test Your Login

1. Open `admin.html` in your browser
2. Enter the email and password you just created
3. Click **"Sign In"**
4. You should see your admin dashboard

> **Important:** Write down your admin email and password and keep them somewhere safe. If you forget, you can reset it in Supabase → Authentication → Users → click the user → "Send reset email".

---

## 🔑 STEP 3 — Add Your Keys to All Files

You need to put your Supabase URL and key into every HTML file.

### The Fast Way (VS Code)

1. Open the `harvestgh` folder in VS Code
2. Press **Ctrl + Shift + H** (Find & Replace in all files)
3. Search for: `YOUR_SUPABASE_URL_HERE`
4. Replace with: your actual Supabase URL (e.g. `https://abcdefghij.supabase.co`)
5. Click **"Replace All"**
6. Search for: `YOUR_SUPABASE_ANON_KEY_HERE`
7. Replace with: your actual anon key
8. Click **"Replace All"**

---

## 💳 STEP 4 — Set Up Paystack (Payments)

Paystack handles all buyer payments on HarvestGH.

### Create Your Paystack Account

1. Go to **paystack.com** and sign up with your Ghana phone number
2. Complete business verification (takes 1–3 days — you need: BVN or TIN, Ghana ID, bank account)
3. Once verified, go to **Settings → API Keys & Webhooks**
4. Copy your **Public Key** — it starts with `pk_live_...`
5. In your Supabase admin, go to your `site_settings` table
6. Find the row where `key = 'paystack_public_key'`
7. Update the `value` to your actual Paystack public key

> **While testing:** Paystack gives you test keys starting with `pk_test_...`. Use those first so no real money moves. Switch to live keys when you are ready to go live.

---

## 📱 STEP 5 — Set Up Hubtel (SMS Notifications)

Hubtel sends SMS to farmers and buyers when orders are placed or status changes.

### Create Your Hubtel Account

1. Go to **smsc.hubtel.com**
2. Register with your Ghana phone number and business name: HarvestGH
3. Verification takes 1–2 business days
4. Once approved, go to your Hubtel dashboard
5. Find your **Client ID** and **Client Secret**

### Add to Admin

Open `admin.html` and find these lines near the top of the `<script>` section:

```javascript
const HUBTEL_ID     = 'YOUR_HUBTEL_CLIENT_ID';
const HUBTEL_SECRET = 'YOUR_HUBTEL_CLIENT_SECRET';
const HUBTEL_FROM   = 'HarvestGH';
```

Replace `YOUR_HUBTEL_CLIENT_ID` and `YOUR_HUBTEL_CLIENT_SECRET` with your real values.

> **Cost:** Hubtel charges approximately GH₵0.04–0.06 per SMS to Ghanaian numbers.
> Set up Hubtel AFTER your first paid transaction — use that revenue to cover SMS costs.
> Until Hubtel is set up, SMS is simply skipped — orders still work normally.

---

## 🤖 STEP 6 — Set Up the AI Chatbot (Optional)

The chatbot uses Claude AI (by Anthropic) to answer buyer questions.

### Get Your Anthropic API Key

1. Go to **console.anthropic.com**
2. Create an account
3. Go to **API Keys** → **Create Key**
4. Copy the key — it starts with `sk-ant-...`

### Add to chatbot.js

Open `chatbot.js` and find this line:

```javascript
anthropicKey: 'YOUR_ANTHROPIC_API_KEY_HERE',
```

Replace with your actual key.

> **Cost:** Anthropic charges per token. For a chatbot answering 100 questions/day, this is approximately $1–2/month using Claude Haiku. Free tier available for getting started.
> If you don't add a key, the chatbot still works — it uses built-in FAQ answers for common questions and redirects to WhatsApp for anything it can't handle.

---

## 🖼️ STEP 7 — Add Your Logo and Photo

### Your Logo

1. Save your logo as **`logo.png`** (PNG with transparent background is best)
2. Recommended size: at least 200px wide, any height
3. Place it in the `harvestgh` folder alongside `index.html`
4. It will automatically appear in the navigation bar on all pages

### Your Profile Photo (for About page)

1. Save your photo as **`ibrahim.jpg`**
2. Recommended size: 400×500px or similar portrait size
3. Place it in the `harvestgh` folder
4. It will appear as your founder profile photo on the About page

---

## 🌐 STEP 8 — Go Live on Netlify

Netlify hosts your website for free.

### Deploy

1. Go to **netlify.com** and create a free account
2. On the dashboard, look for the box that says **"Drag and drop your site folder here"**
3. Drag your entire `harvestgh` folder into that box
4. Wait about 30 seconds
5. Netlify gives you a URL like `random-name-abc123.netlify.app`

### Set Your Custom URL

1. In Netlify, go to **Site settings → Domain management**
2. Click **"Change site name"**
3. Set it to: `harvestgh`
4. Your site will be at: `harvestgh.netlify.app`

### Set Up 404 Page

1. In Netlify, go to **Site settings → Build & deploy → Post processing**
2. Or just make sure `404.html` is in your folder — Netlify finds it automatically

---

## 📊 STEP 9 — Add Products and Go Live

Once everything is connected:

1. Open `admin.html` → log in
2. Go to **Products** → **Add Product**
3. Upload your first crop (e.g. Fresh Tomatoes from Ejisu FBO)
4. Fill in: name, price per unit, quantity, region, photo
5. Click **Save Product**
6. Open `listings.html` — your product should appear in the shop

---

## 📋 Quick Reference — All Credentials You Need

| What | Where to Get | Where to Put |
|------|-------------|-------------|
| Supabase URL | Supabase → Settings → API | All HTML files (find & replace) |
| Supabase Anon Key | Supabase → Settings → API | All HTML files (find & replace) |
| Admin email | You choose it | Supabase → Auth → Users |
| Admin password | You choose it | Supabase → Auth → Users |
| Paystack Public Key | Paystack → Settings → API | Supabase site_settings table |
| Hubtel Client ID | Hubtel dashboard | admin.html (top of script) |
| Hubtel Client Secret | Hubtel dashboard | admin.html (top of script) |
| Anthropic API Key | console.anthropic.com | chatbot.js (top of file) |

---

## ❓ Common Questions

**Q: I see "YOUR_SUPABASE_URL_HERE" on my website — what do I do?**
A: You have not replaced the placeholders with your real Supabase credentials. Follow Step 3 above.

**Q: Admin login says "Incorrect email or password"**
A: Make sure you created a user in Supabase → Authentication → Users with that exact email. Also make sure "Email" is enabled as a provider in Supabase → Authentication → Providers.

**Q: Products I upload in admin are not showing on the shop**
A: Check that the product status is set to "available" (not "hidden"). Also check your Supabase URL and key are correct in listings.html.

**Q: Paystack payment is not working**
A: Check that your Paystack public key is set in the site_settings table in Supabase. Also make sure your Paystack account is verified for live payments.

**Q: SMS is not being sent**
A: Hubtel is not configured yet (see Step 5). Orders still work — SMS is just skipped until you add Hubtel credentials.

**Q: The chatbot just keeps directing me to WhatsApp**
A: The Anthropic API key is not set in chatbot.js. The chatbot uses built-in FAQ answers for common questions. Add your API key for full AI responses.

**Q: My logo is not showing**
A: Make sure your logo file is named exactly `logo.png` (lowercase) and is in the same folder as `index.html`.

---

## 📞 Need Help?

Contact Ibrahim:
- **WhatsApp:** 0544823484
- **Instagram:** @ibrahimmoha23
- **TikTok:** @ibratech_2
- **Email:** lotsuibrahim2@gmail.com

---

*Built by Ibratech & Graphix · HarvestGH © 2026 · Accra, Ghana 🇬🇭*
