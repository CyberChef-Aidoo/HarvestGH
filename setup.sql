-- ═══════════════════════════════════════════════════════════════
-- HARVESTGH DATABASE SETUP — Complete Version
-- Run this entire script in Supabase SQL Editor → New query → Run
-- ═══════════════════════════════════════════════════════════════

-- 1. CROPS TABLE (admin-managed crop catalogue)
create table if not exists crops (
  id         uuid default gen_random_uuid() primary key,
  name       text not null unique,
  image_url  text,
  color      text default '#1a6b3c',
  active     boolean default true,
  sort_order int  default 0,
  created_at timestamptz default now()
);

-- 2. PRODUCTS TABLE (what Ibrahim puts on sale)
create table if not exists products (
  id               uuid default gen_random_uuid() primary key,
  name             text not null,
  description      text,
  image_url        text,
  crop_type        text not null,
  price_per_unit   decimal(10,2) not null,
  unit             text not null default 'bag'
                   check (unit in ('bag','crate','bunch','kg','box','tray','carton')),
  quantity_available decimal(10,2) not null,
  min_order        decimal(10,2) default 1,
  sold_quantity    decimal(10,2) default 0,
  region           text,
  fbo_source       text,
  is_preorder      boolean default false,
  available_date   date,
  status           text default 'available'
                   check (status in ('available','low_stock','out_of_stock','preorder','hidden')),
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- 3. ORDERS TABLE (buyer purchases)
create table if not exists orders (
  id               uuid default gen_random_uuid() primary key,
  order_ref        text unique not null,
  product_id       uuid references products(id),
  product_name     text not null,
  product_unit     text not null,
  buyer_name       text not null,
  buyer_phone      text not null,
  buyer_email      text,
  quantity         decimal(10,2) not null,
  price_per_unit   decimal(10,2) not null,
  subtotal         decimal(10,2) not null,
  delivery_fee     decimal(10,2) default 0,
  total_price      decimal(10,2) not null,
  delivery_address text,
  delivery_region  text,
  order_type       text default 'direct'
                   check (order_type in ('direct','preorder')),
  payment_status   text default 'pending'
                   check (payment_status in ('pending','paid','failed','refunded')),
  payment_ref      text,
  payment_method   text,
  order_status     text default 'pending'
                   check (order_status in ('pending','confirmed','processing','dispatched','delivered','cancelled')),
  notes            text,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

-- 4. AGENTS TABLE (FBO leaders who register farmers)
create table if not exists agents (
  id              uuid default gen_random_uuid() primary key,
  full_name       text not null,
  phone           text not null unique,
  agent_code      text unique not null,
  region          text not null,
  fbo_name        text,
  commission_rate decimal(5,2) default 1.0,
  status          text default 'active' check (status in ('active','inactive')),
  notes           text,
  created_at      timestamptz default now()
);

-- 5. FARMERS TABLE
create table if not exists farmers (
  id              uuid default gen_random_uuid() primary key,
  full_name       text not null,
  phone           text not null,
  region          text not null,
  account_type    text not null check (account_type in ('self','managed')),
  crop_type       text not null,
  quantity        text,
  price_per_unit  text,
  pickup_location text,
  notes           text,
  agent_id        uuid references agents(id),
  status          text default 'active' check (status in ('active','matched','sold')),
  created_at      timestamptz default now()
);

-- 6. BUYERS TABLE (registered buyers)
create table if not exists buyers (
  id              uuid default gen_random_uuid() primary key,
  full_name       text not null,
  phone           text not null,
  business_name   text,
  region          text not null,
  crop_needed     text not null,
  quantity_needed text not null,
  frequency       text,
  created_at      timestamptz default now()
);

-- 7. MATCHES TABLE (historical farmer-buyer connections)
create table if not exists matches (
  id           uuid default gen_random_uuid() primary key,
  listing_id   uuid,
  farmer_id    uuid,
  buyer_id     uuid,
  farmer_name  text,
  buyer_name   text,
  farmer_phone text,
  buyer_phone  text,
  crop_type    text,
  quantity     text,
  status       text default 'confirmed',
  notes        text,
  created_at   timestamptz default now()
);

-- 8. SITE SETTINGS TABLE
create table if not exists site_settings (
  key        text primary key,
  value      text,
  updated_at timestamptz default now()
);

-- 9. CONTACT MESSAGES TABLE
create table if not exists contact_messages (
  id       uuid default gen_random_uuid() primary key,
  name     text,
  phone    text,
  role     text,
  subject  text,
  message  text,
  sent_at  timestamptz default now()
);

-- ══════════════════════════════════════════════════
-- DEFAULT DATA
-- ══════════════════════════════════════════════════

-- Default site settings
insert into site_settings (key, value) values
  ('contact_phone',  '0544823484'),
  ('whatsapp',       '233544823484'),
  ('tagline',        'Ghana''s Fresh Farm Marketplace'),
  ('hero_subtitle',  'Order fresh produce directly from verified farms across Ghana. Delivered to your door.'),
  ('delivery_fee_accra',   '30'),
  ('delivery_fee_ashanti', '50'),
  ('delivery_fee_other',   '70'),
  ('paystack_public_key',  'pk_test_YOUR_PAYSTACK_PUBLIC_KEY_HERE')
on conflict (key) do nothing;

-- Default crops catalogue
insert into crops (name, image_url, color, sort_order) values
  ('Tomato',    'https://images.unsplash.com/photo-1546094096-0df4bcabd337?w=600&fit=crop&q=80', '#c0392b', 1),
  ('Maize',     'https://images.unsplash.com/photo-1601593346740-925612772716?w=600&fit=crop&q=80', '#f39c12', 2),
  ('Yam',       'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=600&fit=crop&q=80', '#8b5e3c', 3),
  ('Cassava',   'https://images.unsplash.com/photo-1591990219956-87c86fd7e17f?w=600&fit=crop&q=80', '#d4a017', 4),
  ('Mango',     'https://images.unsplash.com/photo-1553279768-865429fa0078?w=600&fit=crop&q=80', '#e67e22', 5),
  ('Rice',      'https://images.unsplash.com/photo-1536304993881-ff86e59fafb1?w=600&fit=crop&q=80', '#7f8c8d', 6),
  ('Groundnut', 'https://images.unsplash.com/photo-1567892320421-55f4dc97f71b?w=600&fit=crop&q=80', '#c8a96e', 7),
  ('Plantain',  'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=600&fit=crop&q=80', '#c8a020', 8),
  ('Pepper',    'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&fit=crop&q=80', '#e74c3c', 9),
  ('Onion',     'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&fit=crop&q=80', '#9b59b6', 10)
on conflict (name) do nothing;

-- ══════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ══════════════════════════════════════════════════

alter table crops            enable row level security;
alter table products         enable row level security;
alter table orders           enable row level security;
alter table agents           enable row level security;
alter table farmers          enable row level security;
alter table buyers           enable row level security;
alter table matches          enable row level security;
alter table site_settings    enable row level security;
alter table contact_messages enable row level security;

-- CROPS
create policy "crops_public_read"   on crops for select using (active = true);
create policy "crops_admin_all"     on crops for all to authenticated using (true) with check (true);

-- PRODUCTS: public read available, admin manages all
create policy "products_public_read"
  on products for select using (status != 'hidden');
create policy "products_admin_all"
  on products for all to authenticated using (true) with check (true);

-- ORDERS: anyone can place an order (insert), admin manages all
create policy "orders_public_insert"
  on orders for insert with check (true);
create policy "orders_public_read_own"
  on orders for select using (true);
create policy "orders_admin_all"
  on orders for all to authenticated using (true) with check (true);

-- AGENTS: admin manages, agents read own
create policy "agents_admin_all"
  on agents for all to authenticated using (true) with check (true);
create policy "agents_public_read"
  on agents for select using (status = 'active');

-- FARMERS
create policy "farmers_public_insert" on farmers for insert with check (true);
create policy "farmers_admin_all"     on farmers for all to authenticated using (true) with check (true);

-- BUYERS
create policy "buyers_public_insert" on buyers for insert with check (true);
create policy "buyers_admin_all"     on buyers for all to authenticated using (true) with check (true);

-- MATCHES: admin only
create policy "matches_admin_all"
  on matches for all to authenticated using (true) with check (true);

-- SITE SETTINGS: public read, admin write
create policy "settings_public_read" on site_settings for select using (true);
create policy "settings_admin_all"   on site_settings for all to authenticated using (true) with check (true);

-- CONTACT MESSAGES: anyone inserts, admin reads
create policy "contact_public_insert"
  on contact_messages for insert with check (true);
create policy "contact_admin_read"
  on contact_messages for select to authenticated using (true);

-- ══════════════════════════════════════════════════
-- STORAGE (run this as a separate query)
-- ══════════════════════════════════════════════════
-- insert into storage.buckets (id, name, public)
--   values ('product-images', 'product-images', true)
-- on conflict do nothing;
--
-- insert into storage.buckets (id, name, public)
--   values ('crop-images', 'crop-images', true)
-- on conflict do nothing;
