from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('app_auth.urls')),
    path('api/product/', include('app_products.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
