from django.contrib import admin
from django.urls import path
from django.utils.html import format_html

from .admin_views import analytics_view
from .models import (
    Buyer,
    ContactMessage,
    Crop,
    FAQ,
    FarmerRegistration,
    Order,
    PageView,
    Partner,
    Post,
    Product,
    RoadmapStage,
    TeamMember,
    Testimonial,
    TractionCounter,
)


class HarvestAdminSite(admin.AdminSite):
    site_header = "AgroBridge Admin"
    site_title = "AgroBridge"
    index_title = "Marketplace operations"

    def get_urls(self):
        urls = super().get_urls()
        extra = [
            path("analytics/", self.admin_view(analytics_view), name="analytics"),
        ]
        return extra + urls

    def each_context(self, request):
        ctx = super().each_context(request)
        ctx["analytics_url"] = "analytics/"
        return ctx


harvest_admin = HarvestAdminSite(name="harvest_admin")


@admin.register(Product, site=harvest_admin)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "thumb",
        "name",
        "crop_type",
        "price_per_unit",
        "remaining_display",
        "sold_quantity",
        "status",
        "region",
        "is_preorder",
    )
    list_display_links = ("name",)
    list_filter = ("status", "crop_type", "region", "is_preorder")
    search_fields = ("name", "crop_type", "region", "fbo_source", "farmer_phone")
    list_editable = ("status",)
    readonly_fields = ("remaining_display", "created_at", "updated_at", "image_preview")
    ordering = ("-created_at",)
    fieldsets = (
        ("Basics", {"fields": ("name", "crop_type", "description", "region", "fbo_source", "farmer_phone")}),
        ("Pricing", {"fields": ("price_per_unit", "unit", "min_order")}),
        ("Inventory", {"fields": ("quantity_available", "sold_quantity", "remaining_display", "status", "is_preorder", "available_date")}),
        ("Media", {"fields": ("image", "image_preview")}),
        ("Timestamps", {"fields": ("created_at", "updated_at"), "classes": ("collapse",)}),
    )

    @admin.display(description="")
    def thumb(self, obj: Product):
        if obj.image:
            return format_html(
                '<img src="{}" style="width:42px;height:42px;object-fit:cover;border-radius:6px" />',
                obj.image.url,
            )
        return "—"

    @admin.display(description="In stock")
    def remaining_display(self, obj: Product):
        return obj.remaining

    @admin.display(description="Preview")
    def image_preview(self, obj: Product):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-width:280px;border-radius:10px" />',
                obj.image.url,
            )
        return "No image uploaded yet."

    def save_model(self, request, obj, form, change):
        obj.sync_stock_status()
        super().save_model(request, obj, form, change)


@admin.action(description="Mark as confirmed")
def mark_confirmed(modeladmin, request, queryset):
    queryset.update(order_status=Order.OrderStatus.CONFIRMED)


@admin.action(description="Mark as dispatched")
def mark_dispatched(modeladmin, request, queryset):
    queryset.update(order_status=Order.OrderStatus.DISPATCHED)


@admin.action(description="Mark as delivered")
def mark_delivered(modeladmin, request, queryset):
    queryset.update(order_status=Order.OrderStatus.DELIVERED, payment_status=Order.PaymentStatus.PAID)


@admin.register(Order, site=harvest_admin)
class OrderAdmin(admin.ModelAdmin):
    list_display = (
        "order_ref",
        "product_name",
        "buyer_name",
        "quantity",
        "total_price",
        "payment_status",
        "order_status",
        "delivery_region",
        "created_at",
    )
    list_filter = ("order_status", "payment_status", "delivery_region", "order_type")
    search_fields = ("order_ref", "buyer_name", "buyer_phone", "product_name", "payment_ref")
    readonly_fields = (
        "order_ref",
        "product",
        "product_name",
        "product_unit",
        "quantity",
        "price_per_unit",
        "subtotal",
        "delivery_fee",
        "total_price",
        "payment_ref",
        "created_at",
        "updated_at",
    )
    actions = [mark_confirmed, mark_dispatched, mark_delivered]
    date_hierarchy = "created_at"
    fieldsets = (
        ("Order", {"fields": ("order_ref", "product", "product_name", "product_unit", "order_type", "order_status")}),
        ("Buyer", {"fields": ("buyer_name", "buyer_phone", "buyer_email", "delivery_address", "delivery_region", "notes")}),
        ("Money", {"fields": ("quantity", "price_per_unit", "subtotal", "delivery_fee", "total_price")}),
        ("Payment", {"fields": ("payment_status", "payment_method", "payment_ref")}),
        ("Timestamps", {"fields": ("created_at", "updated_at"), "classes": ("collapse",)}),
    )


@admin.register(FarmerRegistration, site=harvest_admin)
class FarmerRegistrationAdmin(admin.ModelAdmin):
    list_display = ("contact_name", "fbo_name", "phone", "region", "crops", "status", "created_at")
    list_filter = ("status", "registration_type", "region")
    search_fields = ("contact_name", "fbo_name", "phone", "crops")
    list_editable = ("status",)


@admin.register(Buyer, site=harvest_admin)
class BuyerAdmin(admin.ModelAdmin):
    list_display = ("name", "business_name", "phone", "region", "buyer_type", "created_at")
    list_filter = ("buyer_type", "region")
    search_fields = ("name", "business_name", "phone", "email")


@admin.register(ContactMessage, site=harvest_admin)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("subject", "name", "phone", "is_read", "created_at")
    list_filter = ("is_read",)
    search_fields = ("name", "phone", "subject", "message")
    list_editable = ("is_read",)


@admin.register(PageView, site=harvest_admin)
class PageViewAdmin(admin.ModelAdmin):
    list_display = ("path", "viewed_on", "count")
    list_filter = ("viewed_on",)
    search_fields = ("path",)
    date_hierarchy = "viewed_on"


@admin.register(TractionCounter, site=harvest_admin)
class TractionCounterAdmin(admin.ModelAdmin):
    list_display = ("label", "value", "updated_at")
    search_fields = ("label", "value")


@admin.register(Partner, site=harvest_admin)
class PartnerAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "order")
    list_filter = ("category",)
    search_fields = ("name",)
    list_editable = ("order",)


@admin.register(Testimonial, site=harvest_admin)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("name", "organisation", "audience", "location")
    list_filter = ("audience",)
    search_fields = ("name", "organisation", "quote")


@admin.register(Post, site=harvest_admin)
class PostAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "date", "author")
    list_filter = ("category", "date")
    search_fields = ("title", "excerpt", "body", "author")
    prepopulated_fields = {"slug": ("title",)}


@admin.register(Crop, site=harvest_admin)
class CropAdmin(admin.ModelAdmin):
    list_display = ("name", "availability_window_start", "availability_window_end", "pilot")
    list_filter = ("pilot",)
    search_fields = ("name", "grade_notes")


@admin.register(TeamMember, site=harvest_admin)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "order")
    search_fields = ("name", "role", "background")
    list_editable = ("order",)


@admin.register(FAQ, site=harvest_admin)
class FAQAdmin(admin.ModelAdmin):
    list_display = ("question", "order")
    search_fields = ("question", "answer")
    list_editable = ("order",)


@admin.register(RoadmapStage, site=harvest_admin)
class RoadmapStageAdmin(admin.ModelAdmin):
    list_display = ("label", "period", "is_current", "order")
    list_filter = ("is_current",)
    search_fields = ("label", "period")
    list_editable = ("is_current", "order")
