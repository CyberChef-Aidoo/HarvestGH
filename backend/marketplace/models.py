import uuid

from django.conf import settings
from django.db import models
from django.utils import timezone


class Product(models.Model):
    class Status(models.TextChoices):
        AVAILABLE = "available", "Available"
        SOLD_OUT = "sold_out", "Sold out"
        OUT_OF_STOCK = "out_of_stock", "Out of stock"
        HIDDEN = "hidden", "Hidden"
        PREORDER = "preorder", "Preorder"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200)
    crop_type = models.CharField(max_length=80)
    description = models.TextField(blank=True)
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    unit = models.CharField(max_length=40, default="crate")
    quantity_available = models.PositiveIntegerField(default=0)
    sold_quantity = models.PositiveIntegerField(default=0)
    min_order = models.PositiveIntegerField(default=1)
    region = models.CharField(max_length=80)
    fbo_source = models.CharField("FBO / farm source", max_length=160, blank=True)
    farmer_phone = models.CharField(
        max_length=20,
        blank=True,
        help_text="Phone used by farmers to look up this listing.",
    )
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.AVAILABLE)
    is_preorder = models.BooleanField(default=False)
    available_date = models.DateField(null=True, blank=True)
    image = models.ImageField(upload_to="products/", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name

    @property
    def remaining(self) -> int:
        return max(0, int(self.quantity_available) - int(self.sold_quantity))

    @property
    def image_url(self) -> str:
        if self.image:
            return f"{settings.PUBLIC_BASE_URL}{self.image.url}"
        return ""

    def sync_stock_status(self):
        if self.status == self.Status.HIDDEN:
            return
        if self.remaining <= 0 and not self.is_preorder:
            self.status = self.Status.SOLD_OUT


class Order(models.Model):
    class PaymentStatus(models.TextChoices):
        PENDING = "pending", "Pending"
        PAID = "paid", "Paid"
        REFUNDED = "refunded", "Refunded"
        FAILED = "failed", "Failed"

    class OrderStatus(models.TextChoices):
        PENDING = "pending", "Pending"
        CONFIRMED = "confirmed", "Confirmed"
        PROCESSING = "processing", "Processing"
        DISPATCHED = "dispatched", "Dispatched"
        DELIVERED = "delivered", "Delivered"
        CANCELLED = "cancelled", "Cancelled"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order_ref = models.CharField(max_length=32, unique=True, db_index=True)
    product = models.ForeignKey(
        Product, on_delete=models.SET_NULL, null=True, blank=True, related_name="orders"
    )
    product_name = models.CharField(max_length=200)
    product_unit = models.CharField(max_length=40, blank=True)
    buyer_name = models.CharField(max_length=160)
    buyer_phone = models.CharField(max_length=20, db_index=True)
    buyer_email = models.EmailField(blank=True)
    quantity = models.PositiveIntegerField()
    price_per_unit = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=12, decimal_places=2)
    delivery_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    total_price = models.DecimalField(max_digits=12, decimal_places=2)
    delivery_address = models.TextField()
    delivery_region = models.CharField(max_length=80)
    order_type = models.CharField(max_length=20, default="direct")
    payment_status = models.CharField(
        max_length=20, choices=PaymentStatus.choices, default=PaymentStatus.PENDING
    )
    payment_ref = models.CharField(max_length=80, blank=True)
    payment_method = models.CharField(max_length=40, default="paystack")
    notes = models.TextField(blank=True)
    order_status = models.CharField(
        max_length=20, choices=OrderStatus.choices, default=OrderStatus.PENDING
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.order_ref


class FarmerRegistration(models.Model):
    class RegistrationType(models.TextChoices):
        FBO = "fbo", "FBO / Farmer group"
        INDIVIDUAL = "individual", "Individual farmer"

    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        AVAILABLE = "available", "Available"
        MATCHED = "matched", "Matched"
        SOLD = "sold", "Sold"
        MANAGED = "managed", "Managed"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    registration_type = models.CharField(
        max_length=20, choices=RegistrationType.choices, default=RegistrationType.FBO
    )
    fbo_name = models.CharField(max_length=160, blank=True)
    contact_name = models.CharField(max_length=160)
    phone = models.CharField(max_length=20, db_index=True)
    region = models.CharField(max_length=80)
    location = models.CharField(max_length=160, blank=True)
    member_count = models.CharField(max_length=40, blank=True)
    crops = models.CharField(max_length=400, blank=True)
    typical_quantity = models.CharField(max_length=120, blank=True)
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Farmer registration"

    def __str__(self):
        return self.fbo_name or self.contact_name


class Buyer(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=160)
    business_name = models.CharField(max_length=160, blank=True)
    phone = models.CharField(max_length=20, db_index=True)
    email = models.EmailField(blank=True)
    region = models.CharField(max_length=80)
    buyer_type = models.CharField(max_length=80)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name_plural = "Buyers"

    def __str__(self):
        return self.business_name or self.name


class ContactMessage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=160)
    phone = models.CharField(max_length=20)
    role = models.CharField(max_length=80, blank=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.subject} — {self.name}"


class PageView(models.Model):
    path = models.CharField(max_length=255, db_index=True)
    viewed_on = models.DateField(default=timezone.localdate, db_index=True)
    count = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ("path", "viewed_on")
        ordering = ["-viewed_on", "-count"]

    def __str__(self):
        return f"{self.path} ({self.viewed_on})"


class TractionCounter(models.Model):
    label = models.CharField(max_length=120)
    value = models.CharField(max_length=80, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.label


class Partner(models.Model):
    class Category(models.TextChoices):
        FBO = "fbo", "FBO"
        LOGISTICS = "logistics", "Logistics"
        PAYMENT = "payment", "Payment"
        ANCHOR_BUYER = "anchor_buyer", "Anchor buyer"

    name = models.CharField(max_length=160)
    logo = models.ImageField(upload_to="partners/", blank=True)
    category = models.CharField(max_length=30, choices=Category.choices)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return self.name


class Testimonial(models.Model):
    class Audience(models.TextChoices):
        FARMER = "farmer", "Farmer"
        BUYER = "buyer", "Buyer"

    name = models.CharField(max_length=160)
    role = models.CharField(max_length=160, blank=True)
    organisation = models.CharField(max_length=160, blank=True)
    location = models.CharField(max_length=160, blank=True)
    crop = models.CharField(max_length=100, blank=True)
    photo = models.ImageField(upload_to="testimonials/", blank=True)
    quote = models.TextField()
    audience = models.CharField(max_length=20, choices=Audience.choices)

    class Meta:
        ordering = ["id"]

    def __str__(self):
        return self.name


class Post(models.Model):
    title = models.CharField(max_length=220)
    slug = models.SlugField(unique=True)
    date = models.DateField(default=timezone.localdate)
    category = models.CharField(max_length=80)
    featured_image = models.ImageField(upload_to="posts/", blank=True)
    excerpt = models.TextField()
    body = models.TextField()
    author = models.CharField(max_length=160)

    class Meta:
        ordering = ["-date", "-id"]

    def __str__(self):
        return self.title


class Crop(models.Model):
    name = models.CharField(max_length=120)
    availability_window_start = models.CharField(max_length=40)
    availability_window_end = models.CharField(max_length=40)
    grade_notes = models.TextField(blank=True)
    pilot = models.BooleanField(default=False)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class TeamMember(models.Model):
    name = models.CharField(max_length=160)
    role = models.CharField(max_length=160)
    background = models.CharField(max_length=240)
    photo = models.ImageField(upload_to="team/", blank=True)
    linkedin_url = models.URLField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "name"]

    def __str__(self):
        return self.name


class FAQ(models.Model):
    question = models.CharField(max_length=220)
    answer = models.TextField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.question


class RoadmapStage(models.Model):
    label = models.CharField(max_length=120)
    period = models.CharField(max_length=80)
    is_current = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return self.label
