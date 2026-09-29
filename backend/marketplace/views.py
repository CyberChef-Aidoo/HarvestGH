from django.db.models import F, Q
from django.utils import timezone
from rest_framework import mixins, status, viewsets
from rest_framework.response import Response

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
from .serializers import (
    BuyerSerializer,
    ContactMessageSerializer,
    FarmerRegistrationSerializer,
    OrderSerializer,
    PageViewSerializer,
    ProductSerializer,
    CropSerializer,
    FAQSerializer,
    PartnerSerializer,
    PostSerializer,
    RoadmapStageSerializer,
    TeamMemberSerializer,
    TestimonialSerializer,
    TractionCounterSerializer,
)


class ReadOnlyContentViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    def get_queryset(self):
        return self.queryset.all()


class TractionCounterViewSet(ReadOnlyContentViewSet):
    queryset = TractionCounter.objects.all()
    serializer_class = TractionCounterSerializer


class PartnerViewSet(ReadOnlyContentViewSet):
    queryset = Partner.objects.all()
    serializer_class = PartnerSerializer


class TestimonialViewSet(ReadOnlyContentViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer


class PostViewSet(ReadOnlyContentViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class CropViewSet(ReadOnlyContentViewSet):
    queryset = Crop.objects.all()
    serializer_class = CropSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        if self.request.query_params.get("pilot") in {"1", "true", "yes"}:
            qs = qs.filter(pilot=True)
        return qs


class TeamMemberViewSet(ReadOnlyContentViewSet):
    queryset = TeamMember.objects.all()
    serializer_class = TeamMemberSerializer


class FAQViewSet(ReadOnlyContentViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer


class RoadmapStageViewSet(ReadOnlyContentViewSet):
    queryset = RoadmapStage.objects.all()
    serializer_class = RoadmapStageSerializer


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
        ref = (self.request.query_params.get("ref") or "").strip()
        phone = self.request.query_params.get("phone") or ""
        digits = "".join(c for c in phone if c.isdigit())[-9:]
        if not ref or len(digits) < 9:
            return Order.objects.none()
        return Order.objects.filter(order_ref__iexact=ref, buyer_phone__icontains=digits)


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
