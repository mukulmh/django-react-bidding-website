from django.urls import path
from app_products.views import *

urlpatterns=[
    path('item/', product_list, name='product'),
    path('item/<id>/', product_details, name='product_details'),
    path('bid/', bid_list, name='bid'),
    path('bid/<id>/', bid_details, name='bid_details'),
]