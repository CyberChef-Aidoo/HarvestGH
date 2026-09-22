# HarvestGH Django backend

REST API + Django admin for products, orders, registrations, and analytics.

## Setup

```bash
cd backend
python -m venv .venv
# Windows: .venv\Scripts\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
copy .env.example .env   # or cp .env.example .env
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_demo
python manage.py runserver
```

- Admin: http://127.0.0.1:8000/admin/
- Analytics: http://127.0.0.1:8000/admin/analytics/
- API: http://127.0.0.1:8000/api/v1/products/

Add products from **Marketplace → Products** (upload an image, set price/stock/region). Sales show on the analytics dashboard.

Point the Next.js app at this API with:

```
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```
