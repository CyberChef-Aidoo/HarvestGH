from rest_framework.routers import DefaultRouter

from .views import (
    BuyerViewSet,
    ContactMessageViewSet,
    FarmerRegistrationViewSet,
    OrderViewSet,
    PageViewViewSet,
    ProductViewSet,
)

router = DefaultRouter()
router.register("products", ProductViewSet, basename="product")
router.register("orders", OrderViewSet, basename="order")
router.register("farmer-registrations", FarmerRegistrationViewSet, basename="farmer-registration")
router.register("buyers", BuyerViewSet, basename="buyer")
router.register("messages", ContactMessageViewSet, basename="message")
router.register("pageviews", PageViewViewSet, basename="pageview")

urlpatterns = router.urls
