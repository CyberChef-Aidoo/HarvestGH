from decimal import Decimal
from datetime import timedelta

from django.core.files.base import ContentFile
from django.core.management.base import BaseCommand
from django.utils import timezone

from marketplace.models import Order, PageView, Product


DEMO = [
    {
        "name": "Fresh Tomatoes — Grade A",
        "crop_type": "Tomato",
        "price": "120.00",
        "unit": "crate",
        "qty": 200,
        "sold": 45,
        "min_order": 5,
        "region": "Ashanti",
        "fbo": "Ejisu Farmers Cooperative",
        "phone": "0244123456",
        "desc": "Premium Grade A tomatoes, freshly harvested.",
        "image": "tomatoes.jpg",
    },
    {
        "name": "White Maize — Dried & Bagged",
        "crop_type": "Maize",
        "price": "85.00",
        "unit": "bag",
        "qty": 500,
        "sold": 120,
        "min_order": 2,
        "region": "Bono / Brong-Ahafo",
        "fbo": "Techiman FBO Group",
        "phone": "0244555666",
        "desc": "Certified dried white maize, 100kg bags.",
        "image": "maize.jpg",
    },
    {
        "name": "Sweet Mango — Kent Variety",
        "crop_type": "Mango",
        "price": "95.00",
        "unit": "box",
        "qty": 300,
        "sold": 80,
        "min_order": 3,
        "region": "Volta",
        "fbo": "Ho Farmers Association",
        "phone": "0244777888",
        "desc": "Premium Kent mangoes, export quality.",
        "image": "mango.jpg",
    },
    {
        "name": "Green Plantain — Apem",
        "crop_type": "Plantain",
        "price": "55.00",
        "unit": "bunch",
        "qty": 400,
        "sold": 95,
        "min_order": 4,
        "region": "Eastern",
        "fbo": "Suhum Plantain Growers FBO",
        "phone": "0244999000",
        "desc": "Fresh green Apem plantains.",
        "image": "plantain.jpg",
    },
    {
        "name": "Mixed Market Vegetables Bundle",
        "crop_type": "Vegetables",
        "price": "150.00",
        "unit": "bundle",
        "qty": 100,
        "sold": 20,
        "min_order": 1,
        "region": "Greater Accra",
        "fbo": "Accra Urban Farmers Coop",
        "phone": "0244000111",
        "desc": "Weekly bundle of fresh market vegetables.",
        "image": "market.jpg",
    },
    {
        "name": "Maize (Preorder) — October Harvest",
        "crop_type": "Maize",
        "price": "80.00",
        "unit": "bag",
        "qty": 1000,
        "sold": 200,
        "min_order": 5,
        "region": "Northern",
        "fbo": "Tamale Grain Farmers FBO",
        "phone": "0244222333",
        "desc": "Preorder next harvest season's white maize.",
        "image": "maize.jpg",
        "preorder": True,
        "available": "2026-10-15",
    },
    {
        "name": "Fresh Eggs — Large Grade A",
        "crop_type": "Poultry",
        "price": "45.00",
        "unit": "crate",
        "qty": 350,
        "sold": 60,
        "min_order": 2,
        "region": "Greater Accra",
        "fbo": "Dodowa Poultry Cooperative",
        "phone": "0244333444",
        "desc": "Farm-fresh large Grade A eggs, 30 per crate.",
        "image": "eggs.jpg",
    },
    {
        "name": "Live Broilers — 6 Weeks",
        "crop_type": "Poultry",
        "price": "65.00",
        "unit": "bird",
        "qty": 800,
        "sold": 140,
        "min_order": 10,
        "region": "Ashanti",
        "fbo": "Kumasi Broiler Growers FBO",
        "phone": "0244555777",
        "desc": "Healthy 6-week broilers, farm-raised.",
        "image": "poultry.jpg",
    },
    {
        "name": "Dressed Chicken — Whole",
        "crop_type": "Poultry",
        "price": "55.00",
        "unit": "bird",
        "qty": 220,
        "sold": 35,
        "min_order": 5,
        "region": "Central",
        "fbo": "Winneba Poultry Association",
        "phone": "0244888999",
        "desc": "Clean, dressed whole chicken ready for kitchens.",
        "image": "poultry.jpg",
    },
]


class Command(BaseCommand):
    help = "Seed demo products and a few sample orders for the admin analytics view."

    def handle(self, *args, **options):
        from pathlib import Path
        from django.conf import settings

        created = 0
        products = []
        image_roots = [
            Path(settings.BASE_DIR).parent / "public" / "images",
        ]

        for item in DEMO:
            obj, was_created = Product.objects.get_or_create(
                name=item["name"],
                defaults={
                    "crop_type": item["crop_type"],
                    "price_per_unit": Decimal(item["price"]),
                    "unit": item["unit"],
                    "quantity_available": item["qty"],
                    "sold_quantity": item["sold"],
                    "min_order": item["min_order"],
                    "region": item["region"],
                    "fbo_source": item["fbo"],
                    "farmer_phone": item["phone"],
                    "description": item["desc"],
                    "is_preorder": bool(item.get("preorder")),
                    "available_date": item.get("available"),
                    "status": Product.Status.AVAILABLE,
                },
            )
            if was_created:
                created += 1
                img_name = item["image"]
                for root in image_roots:
                    src = root / img_name
                    if src.exists():
                        obj.image.save(img_name, ContentFile(src.read_bytes()), save=True)
                        break
            products.append(obj)

        if products and not Order.objects.exists():
            tomato = products[0]
            maize = products[1]
            now = timezone.now()
            samples = [
                (tomato, 8, "paid", "delivered", 6),
                (tomato, 5, "paid", "dispatched", 3),
                (maize, 12, "paid", "confirmed", 1),
                (products[2], 4, "pending", "pending", 0),
            ]
            for i, (prod, qty, pay, ost, days_ago) in enumerate(samples, start=1):
                subtotal = prod.price_per_unit * qty
                delivery = Decimal("30.00")
                Order.objects.create(
                    order_ref=f"HGH-2026-{1000 + i}",
                    product=prod,
                    product_name=prod.name,
                    product_unit=prod.unit,
                    buyer_name=["Ama Boateng", "Kwame Mensah", "Akosua Darko", "Yaw Asante"][i - 1],
                    buyer_phone=["0244111222", "0244333444", "0244555666", "0244777888"][i - 1],
                    buyer_email="buyer@harvestgh.com",
                    quantity=qty,
                    price_per_unit=prod.price_per_unit,
                    subtotal=subtotal,
                    delivery_fee=delivery,
                    total_price=subtotal + delivery,
                    delivery_address="East Legon, Accra",
                    delivery_region="Greater Accra",
                    payment_status=pay,
                    payment_ref=f"PSK-{i}",
                    order_status=ost,
                    created_at=now - timedelta(days=days_ago),
                )
            # auto_now_add ignores created_at on insert in some Django versions — force timestamps
            for i, days_ago in enumerate([6, 3, 1, 0], start=1):
                Order.objects.filter(order_ref=f"HGH-2026-{1000 + i}").update(
                    created_at=now - timedelta(days=days_ago)
                )

        for path, hits in [("/", 42), ("/shop", 31), ("/about", 12), ("/contact", 8)]:
            PageView.objects.get_or_create(
                path=path,
                viewed_on=timezone.localdate(),
                defaults={"count": hits},
            )

        self.stdout.write(self.style.SUCCESS(f"Seeded {created} new products (total {Product.objects.count()})."))
