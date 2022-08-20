from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from . import views



urlpatterns = [
   path('categories/', views.FoodCategoriesList.as_view()),
   path('foods/',views.FoodList.as_view(), name='food-list'),
   path('login/', views.LoginView.as_view(), name='login'),
   path('register/',views.UserRegistrationView.as_view(),name='register'),
   path('verify-otp/',views.OTPVerificationView.as_view(),name='otp_verification'),
   path('orders/', views.OrderHistoryListView.as_view(),name='orders'),
]

#jwt authentication
urlpatterns += [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]