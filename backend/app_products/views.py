from rest_framework.response import Response
from rest_framework import status
from django.contrib import auth
from rest_framework.decorators import api_view
from .models import Bid, Product
from app_products.serializers import BidSerializer, ProductSerializer
from django.db.models import Count


# Create your views here.

@api_view(['GET','POST'])
def product_list(request):
    if request.method == 'GET':
        data = []
        products = Product.objects.all()
        for prod in products:
            product_data ={}
            
            product_data['id']= prod.id
            product_data['title']= prod.title
            product_data['created_by'] = prod.created_by_id
            product_data['starting_bid'] = prod.biding_price
            product_data['ends_at'] = prod.ends_at.strftime("%d-%m-%y %H:%M:%S")
            counts = Bid.objects.all().filter(product=prod.id).values('product').annotate(total=Count('user'))
            if counts:
                for count in counts:
                    product_data['total_bids'] = count['total']
                highest_bidder = Bid.objects.all().select_related('user').filter(product=prod.id).first()
                product_data['highest_bidder'] = highest_bidder.user.fullname
                product_data['highest_bid'] = highest_bidder.amount
            else:
                product_data['total_bids'] = 0
                product_data['highest_bidder'] = 'None'
                product_data['highest_bid'] = prod.biding_price
            data.append(product_data)
        # print(data)
        product = Product.objects.all()
        serializer = ProductSerializer(product, many=True)
        return Response(data)
    if request.method == 'POST':
        serializer= ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','PUT', 'DELETE'])
def product_details(request, id):
    try:
        product = Product.objects.get(pk = id)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = ProductSerializer(product)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def bid_list(request):
    if request.method == 'GET':
        bid = Bid.objects.all()
        serializer = BidSerializer(bid, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = BidSerializer(data=request.data)
        data = request.data
        bid = Bid.objects.filter(user_id = data['user'], product_id = data['product'])
        if bid.exists():
            # bid.delete()
            return Response("bid exists", status=status.HTTP_302_FOUND)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def bid_details(request, id):
    try:
        bid = Bid.objects.get(pk=id)
    except Bid.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = BidSerializer(bid)
        return Response(serializer.data)
    if request.method == 'PUT':
        serializer = BidSerializer(bid, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    if request.method == 'DELETE':
        bid.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
