from rest_framework import serializers

from .models import Buyer, ContactMessage, FarmerRegistration, Order, Product


class ProductSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    id = serializers.UUIDField(read_only=True)

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "crop_type",
            "price_per_unit",
            "unit",
            "quantity_available",
            "sold_quantity",
            "min_order",
            "region",
            "fbo_source",
            "farmer_phone",
            "status",
            "is_preorder",
            "available_date",
            "image_url",
            "description",
            "created_at",
        )

    def get_image_url(self, obj: Product) -> str:
        return obj.image_url


class OrderSerializer(serializers.ModelSerializer):
    product_id = serializers.UUIDField(write_only=True)
    order_status = serializers.CharField(read_only=True)

    class Meta:
        model = Order
        fields = (
            "id",
            "order_ref",
            "product_id",
            "product_name",
            "product_unit",
            "buyer_name",
            "buyer_phone",
            "buyer_email",
            "quantity",
            "price_per_unit",
            "subtotal",
            "delivery_fee",
            "total_price",
            "delivery_address",
            "delivery_region",
            "order_type",
            "payment_status",
            "payment_ref",
            "payment_method",
            "notes",
            "order_status",
            "created_at",
        )
        extra_kwargs = {
            "product_name": {"required": False},
            "product_unit": {"required": False, "allow_blank": True},
            "price_per_unit": {"required": False},
            "subtotal": {"required": False},
            "total_price": {"required": False},
            "buyer_email": {"required": False, "allow_blank": True, "allow_null": True},
            "notes": {"required": False, "allow_blank": True, "allow_null": True},
            "payment_ref": {"required": False, "allow_blank": True},
        }

    def validate_buyer_email(self, value):
        return value or ""

    def validate_notes(self, value):
        return value or ""

    def create(self, validated_data):
        from django.db import transaction

        product_id = validated_data.pop("product_id")
        with transaction.atomic():
            try:
                product = Product.objects.select_for_update().get(pk=product_id)
            except Product.DoesNotExist as exc:
                raise serializers.ValidationError({"product_id": "Product not found."}) from exc
            qty = int(validated_data["quantity"])
            remaining = product.remaining
            if remaining < qty and not product.is_preorder:
                raise serializers.ValidationError({"quantity": f"Only {remaining} units left."})

            validated_data.setdefault("product_name", product.name)
            validated_data.setdefault("product_unit", product.unit)
            validated_data.setdefault("price_per_unit", product.price_per_unit)
            price = validated_data["price_per_unit"]
            subtotal = validated_data.get("subtotal") or (price * qty)
            delivery = validated_data.get("delivery_fee") or 0
            validated_data["subtotal"] = subtotal
            validated_data["total_price"] = validated_data.get("total_price") or (subtotal + delivery)
            validated_data["product"] = product
            if not validated_data.get("buyer_email"):
                validated_data["buyer_email"] = ""
            if validated_data.get("notes") is None:
                validated_data["notes"] = ""

            order = Order.objects.create(**validated_data)
            product.sold_quantity = product.sold_quantity + qty
            product.sync_stock_status()
            product.save(update_fields=["sold_quantity", "status", "updated_at"])
            return order


class FarmerRegistrationSerializer(serializers.ModelSerializer):
    fbo_name = serializers.CharField(required=False, allow_blank=True, allow_null=True, default="")
    location = serializers.CharField(required=False, allow_blank=True, allow_null=True, default="")
    member_count = serializers.CharField(required=False, allow_blank=True, allow_null=True, default="")
    typical_quantity = serializers.CharField(required=False, allow_blank=True, allow_null=True, default="")
    notes = serializers.CharField(required=False, allow_blank=True, allow_null=True, default="")

    class Meta:
        model = FarmerRegistration
        fields = (
            "id",
            "registration_type",
            "fbo_name",
            "contact_name",
            "phone",
            "region",
            "location",
            "member_count",
            "crops",
            "typical_quantity",
            "notes",
            "status",
            "created_at",
        )
        read_only_fields = ("id", "status", "created_at")

    def validate_fbo_name(self, value):
        return value or ""

    def validate_location(self, value):
        return value or ""

    def validate_member_count(self, value):
        return value or ""

    def validate_typical_quantity(self, value):
        return value or ""

    def validate_notes(self, value):
        return value or ""


class BuyerSerializer(serializers.ModelSerializer):
    business_name = serializers.CharField(required=False, allow_blank=True, allow_null=True, default="")
    email = serializers.EmailField(required=False, allow_blank=True, allow_null=True, default="")
    notes = serializers.CharField(required=False, allow_blank=True, allow_null=True, default="")

    class Meta:
        model = Buyer
        fields = (
            "id",
            "name",
            "business_name",
            "phone",
            "email",
            "region",
            "buyer_type",
            "notes",
            "created_at",
        )
        read_only_fields = ("id", "created_at")

    def validate_business_name(self, value):
        return value or ""

    def validate_email(self, value):
        return value or ""

    def validate_notes(self, value):
        return value or ""


class ContactMessageSerializer(serializers.ModelSerializer):
    role = serializers.CharField(required=False, allow_blank=True, allow_null=True, default="")

    class Meta:
        model = ContactMessage
        fields = ("id", "name", "phone", "role", "subject", "message", "created_at")
        read_only_fields = ("id", "created_at")

    def validate_role(self, value):
        return value or ""


class PageViewSerializer(serializers.Serializer):
    path = serializers.CharField(max_length=255)
