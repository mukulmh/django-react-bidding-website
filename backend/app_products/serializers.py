from rest_framework import serializers
from app_products.models import Bid, Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id','title', 'description', 'category', 'created_by', 'biding_price', 'ends_at']


class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields = ['id', 'amount', 'product', 'user']