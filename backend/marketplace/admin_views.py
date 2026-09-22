from datetime import timedelta
from decimal import Decimal

from django.db.models import Count, Sum
from django.db.models.functions import TruncDate
from django.shortcuts import render
from django.utils import timezone

from .models import Buyer, ContactMessage, FarmerRegistration, Order, PageView, Product


def analytics_view(request):
    now = timezone.localtime()
    since = now - timedelta(days=30)
    paid = Order.objects.filter(payment_status=Order.PaymentStatus.PAID)
    recent_paid = paid.filter(created_at__gte=since)

    revenue = paid.aggregate(total=Sum("total_price"))["total"] or Decimal("0")
    revenue_30 = recent_paid.aggregate(total=Sum("total_price"))["total"] or Decimal("0")
    units_sold = Order.objects.exclude(order_status=Order.OrderStatus.CANCELLED).aggregate(
        total=Sum("quantity")
    )["total"] or 0

    daily = list(
        recent_paid.annotate(day=TruncDate("created_at"))
        .values("day")
        .annotate(revenue=Sum("total_price"), orders=Count("id"))
        .order_by("day")
    )
    # Fill missing days so the chart is continuous
    by_day = {row["day"]: row for row in daily}
    chart_days, chart_revenue, chart_orders = [], [], []
    for i in range(29, -1, -1):
        day = (now - timedelta(days=i)).date()
        row = by_day.get(day)
        chart_days.append(day.strftime("%d %b"))
        chart_revenue.append(float(row["revenue"]) if row else 0)
        chart_orders.append(row["orders"] if row else 0)

    top_products = list(
        Order.objects.exclude(order_status=Order.OrderStatus.CANCELLED)
        .values("product_name")
        .annotate(qty=Sum("quantity"), revenue=Sum("total_price"), orders=Count("id"))
        .order_by("-revenue")[:8]
    )

    status_counts = list(
        Order.objects.values("order_status").annotate(n=Count("id")).order_by("-n")
    )
    traffic = list(
        PageView.objects.filter(viewed_on__gte=since.date())
        .values("path")
        .annotate(hits=Sum("count"))
        .order_by("-hits")[:10]
    )

    from .admin import harvest_admin

    context = harvest_admin.each_context(request)
    context.update({
        "title": "Analytics",
        "kpis": [
            {"label": "Revenue (paid)", "value": f"GH₵{revenue:,.2f}", "hint": "All time"},
            {"label": "Last 30 days", "value": f"GH₵{revenue_30:,.2f}", "hint": "Paid orders"},
            {"label": "Orders", "value": Order.objects.count(), "hint": "All statuses"},
            {"label": "Units sold", "value": units_sold, "hint": "Excludes cancelled"},
            {"label": "Active listings", "value": Product.objects.filter(status="available").count(), "hint": "Available now"},
            {"label": "New buyers", "value": Buyer.objects.filter(created_at__gte=since).count(), "hint": "Last 30 days"},
            {
                "label": "Farmer signups",
                "value": FarmerRegistration.objects.filter(created_at__gte=since).count(),
                "hint": "Last 30 days",
            },
            {
                "label": "Unread messages",
                "value": ContactMessage.objects.filter(is_read=False).count(),
                "hint": "Contact form",
            },
        ],
        "chart_days": chart_days,
        "chart_revenue": chart_revenue,
        "chart_orders": chart_orders,
        "top_products": top_products,
        "status_counts": status_counts,
        "traffic": traffic,
        "recent_orders": Order.objects.select_related("product")[:10],
    })
    return render(request, "admin/analytics.html", context)
