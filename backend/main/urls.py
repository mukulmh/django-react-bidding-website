from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('app_auth.urls')),
    path('api/product/', include('app_products.urls')),
]
