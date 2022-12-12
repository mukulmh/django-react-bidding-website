from django.urls import path, include
from app_auth.views import UserProfileView, UserRegistrationView, UserLoginView, MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
# from rest_framework.routers import DefaultRouter
# router = DefaultRouter()
# router.register('register', UserRegistrationView,basename="register")

urlpatterns = [
    path('register/',UserRegistrationView.as_view(), name='register' ),
    # path('register/', include(router.urls)),
    path('login/',UserLoginView.as_view(), name='login' ),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/<int:id>/', UserProfileView.as_view(), name='profile'),
]
