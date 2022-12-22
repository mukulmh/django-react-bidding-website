from rest_framework.response import Response
from rest_framework import status, viewsets
from django.contrib import auth
from rest_framework.views import APIView
from app_auth.serializers import UserSerializer, LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from app_auth.models import Account
from app_products.models import Bid, Product
from app_products.serializers import BidSerializer, ProductSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.db.models import Count
from rest_framework.parsers import MultiPartParser, FormParser



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['fullname'] = user.fullname
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
    

class UserRegistrationView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            token = MyTokenObtainPairSerializer.get_token(user)
            return Response(data={'refresh': str(token), 'access': str(token.access_token)}, status=status.HTTP_201_CREATED)
        
        default_errors = serializer.errors
        errors = []
        for field_errors in default_errors.items():
            errors.append(field_errors[1])
        return Response({'msg':errors}, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')

        user = auth.authenticate(email=email, password=password)
    
        if user is not None:
            token = MyTokenObtainPairSerializer.get_token(user)
            return Response(data={'refresh': str(token), 'access': str(token.access_token)}, status=status.HTTP_200_OK)

        return Response({'msg':'Email or password did not matched!'}, status=status.HTTP_401_UNAUTHORIZED)


class UserProfileView(APIView):
    def get_object(self, id):
        try:
            user = Account.objects.get(pk = id)
            return user
        except Account.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, id):
        try:
            user = Account.objects.get(pk = id)
        except Account.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        if user is not None:
            products = Product.objects.filter(created_by=id).all()
            product_serializer = ProductSerializer(products, many=True)
            bids = Bid.objects.all().select_related('product').filter(user=id)
            data=[]
            for bid in bids:
                bid_data={}
                counts = Bid.objects.all().filter(product=bid.product_id).values('product').annotate(total=Count('user'))
                for count in counts:
                    bid_data['bid_count'] = count['total']
                    
                bid_data['product_title'] = bid.product.title
                bid_data['biding_amount'] = bid.amount
                bid_data['starting_bid'] = bid.product.biding_price
                data.append(bid_data)
            # print(data)
            serializer = UserSerializer(user)
            context = {'user':serializer.data,'products':product_serializer.data,'bids':data}
            products = context['products']
            return Response(context, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)
