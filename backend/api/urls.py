from django.urls import path
from accounts.views import UserRegistrationView, OTPVerificationView
from . import views



urlpatterns = [
   path('categories/', views.FoodCategoriesList.as_view()),
   path('foods/',views.FoodList.as_view(), name='food-list'),
   path('login/', views.LoginView.as_view(), name='login'),
   path('orders/', views.OrderHistoryListView.as_view(),name='orders'),
]

#jwt authentication
urlpatterns += [
    path('register/',UserRegistrationView.as_view(),name='register'),
    path('verify-otp/',OTPVerificationView.as_view(),name='otp_verification'),
    
]