from django.db.models import F, Q
from django.utils import timezone
from rest_framework import mixins, status, viewsets
from rest_framework.response import Response

from .models import Buyer, ContactMessage, FarmerRegistration, Order, PageView, Product
from .serializers import (
    BuyerSerializer,
    ContactMessageSerializer,
    FarmerRegistrationSerializer,
    OrderSerializer,
    PageViewSerializer,
    ProductSerializer,
)


class ProductViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    serializer_class = ProductSerializer

    def get_queryset(self):
        qs = Product.objects.exclude(status=Product.Status.HIDDEN)
        params = self.request.query_params
        crop = params.get("crop")
        region = params.get("region")
        preorder = params.get("preorder")
        status_filter = params.get("status")
        search = params.get("search") or params.get("q")
        phone = params.get("phone")
        if crop:
            qs = qs.filter(crop_type__iexact=crop)
        if region:
            qs = qs.filter(region__iexact=region)
        if preorder in {"1", "true", "yes"}:
            qs = qs.filter(is_preorder=True)
        if status_filter:
            qs = qs.filter(status=status_filter)
        if search:
            qs = qs.filter(
                Q(name__icontains=search)
                | Q(crop_type__icontains=search)
                | Q(region__icontains=search)
                | Q(fbo_source__icontains=search)
            )
        if phone:
            digits = "".join(c for c in phone if c.isdigit())[-9:]
            if digits:
                qs = qs.filter(farmer_phone__icontains=digits)
        return qs.distinct()


class OrderViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    def get_queryset(self):
        qs = Order.objects.all()
        ref = self.request.query_params.get("ref")
        phone = self.request.query_params.get("phone")
        if ref:
            qs = qs.filter(order_ref__iexact=ref.strip())
        if phone:
            digits = "".join(c for c in phone if c.isdigit())[-9:]
            if digits:
                qs = qs.filter(buyer_phone__icontains=digits)
        if not ref and not phone:
            return Order.objects.none()
        return qs


class FarmerRegistrationViewSet(mixins.CreateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet):
    serializer_class = FarmerRegistrationSerializer
    queryset = FarmerRegistration.objects.all()

    def get_queryset(self):
        phone = self.request.query_params.get("phone")
        if not phone:
            return FarmerRegistration.objects.none()
        digits = "".join(c for c in phone if c.isdigit())[-9:]
        if not digits:
            return FarmerRegistration.objects.none()
        return FarmerRegistration.objects.filter(phone__icontains=digits)


class BuyerViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = BuyerSerializer
    queryset = Buyer.objects.all()


class ContactMessageViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = ContactMessageSerializer
    queryset = ContactMessage.objects.all()


class PageViewViewSet(viewsets.ViewSet):
    def create(self, request):
        ser = PageViewSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        path = ser.validated_data["path"][:255]
        today = timezone.localdate()
        obj, created = PageView.objects.get_or_create(path=path, viewed_on=today, defaults={"count": 1})
        if not created:
            PageView.objects.filter(pk=obj.pk).update(count=F("count") + 1)
        return Response({"ok": True}, status=status.HTTP_201_CREATED)
