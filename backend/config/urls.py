from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static

from marketplace.admin_site import harvest_admin

urlpatterns = [
    path("admin/", harvest_admin.urls),
    path("api/v1/", include("marketplace.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
