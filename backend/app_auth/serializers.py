from rest_framework import serializers
from app_auth.models import Account

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'


class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['email', 'phone', 'fullname']


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=100)
    class Meta:
        model = Account
        fields = ['email', 'password']