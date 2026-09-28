from rest_framework.routers import DefaultRouter

from .views import (
    BuyerViewSet,
    ContactMessageViewSet,
    CropViewSet,
    FAQViewSet,
    FarmerRegistrationViewSet,
    OrderViewSet,
    PageViewViewSet,
    ProductViewSet,
    PartnerViewSet,
    PostViewSet,
    RoadmapStageViewSet,
    TeamMemberViewSet,
    TestimonialViewSet,
    TractionCounterViewSet,
)

router = DefaultRouter()
router.register("products", ProductViewSet, basename="product")
router.register("orders", OrderViewSet, basename="order")
router.register("farmer-registrations", FarmerRegistrationViewSet, basename="farmer-registration")
router.register("buyers", BuyerViewSet, basename="buyer")
router.register("messages", ContactMessageViewSet, basename="message")
router.register("pageviews", PageViewViewSet, basename="pageview")
router.register("traction-counters", TractionCounterViewSet, basename="traction-counter")
router.register("partners", PartnerViewSet, basename="partner")
router.register("testimonials", TestimonialViewSet, basename="testimonial")
router.register("posts", PostViewSet, basename="post")
router.register("crops", CropViewSet, basename="crop")
router.register("team-members", TeamMemberViewSet, basename="team-member")
router.register("faqs", FAQViewSet, basename="faq")
router.register("roadmap-stages", RoadmapStageViewSet, basename="roadmap-stage")

urlpatterns = router.urls
