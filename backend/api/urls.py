from django.urls import path
from accounts.views import UserRegistrationView, OTPVerificationView
from . import views



urlpatterns = [
   path('categories/', views.FoodCategoriesList.as_view()),
   path('offers/', views.OfferList.as_view()),
   path('foods/',views.FoodList.as_view(), name='food-list'),
   path('foods/<int:pk>/',views.CategoryFoodList.as_view(), name='category-food-list'),
   path('user-info/', views.LoggedInUserInfo.as_view(), name='user_info'),
   path('order-item/', views.OrderItemView.as_view(),name='order-item'),
   path('orders/', views.OrderView.as_view(),name='orders'),
   path('order-history/', views.OrderHistoryView.as_view(),name='order-history'),
   path('cancel-order/<int:pk>/', views.CancelOrderView.as_view(),name='cancel-order'),
   path('address/<int:pk>/', views.GetDeliveryAddress.as_view(),name='get-address'),
   path('address/', views.PostDeliveryAddress.as_view(),name='post-address'),
   path('update-address/<int:pk>/', views.UpdateDeliveryAddress.as_view(),name='update-address'),
   path('add-combo-item/', views.PostComboItem.as_view(),name='combo-item'),
   path('combo/', views.ComboList.as_view(),name='combo'),
   path('combos/<int:pk>/', views.UserComboList.as_view(),name='user-combo'),
   
]

#jwt authentication
urlpatterns += [
    path('register/',UserRegistrationView.as_view(),name='register'),
    path('verify-otp/',OTPVerificationView.as_view(),name='otp_verification'),
    
]