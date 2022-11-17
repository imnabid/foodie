from django.urls import path
from accounts.views import UserRegistrationView, OTPVerificationView
from . import views



urlpatterns = [
   path('categories/', views.FoodCategoriesList.as_view()),
   path('categories/<int:pk>/', views.DeleteCategory.as_view(),name='delete-category'),
   path('category-foods/<int:pk>/',views.CategoryFoodList.as_view(), name='category-food-list'),
   path('foods/',views.FoodList.as_view(), name='food-list'),
   path('foods/<int:pk>/',views.DeleteFood.as_view(), name='delete-food'),
   path('offers/', views.OfferList.as_view(),name='offers'),
   path('post-offers/', views.OfferPost.as_view(),name='offer-post'),
   path('offers/<int:pk>/', views.DeleteOffer.as_view(),name='delete-offer'),
   path('images/', views.CarouselImages.as_view(), name='carousel-images'),
   path('business-info/', views.BusinessInfoView.as_view(), name='business-info'),
   path('history/', views.OrderHistoryView.as_view(), name='order-history'),
   path('history-date/', views.OrderHistoryDateSearch.as_view(), name='order-history-with-date'),
   path('images/<int:pk>/', views.DeleteCarouselImage.as_view(), name='delete-carousel-image'),
   path('user-info/', views.LoggedInUserInfo.as_view(), name='user_info'),
   path('add-order-item/', views.OrderItemView.as_view(),name='order-item'),
   path('orders/', views.UserOrders.as_view(),name='user-orders'),
   path('order-status/<int:pk>/', views.ChangeOrderStatus.as_view(),name='change-order-status'),
   path('cancel-order/<int:pk>/', views.CancelOrderView.as_view(),name='cancel-order'),
   path('address/', views.DeliveryAddressView.as_view(),name='get-post-address'),
   path('add-combo-item/', views.PostComboItem.as_view(),name='combo-item'),
   path('combo/', views.UserCombos.as_view(),name='combo'),
   path('delete-combo/<int:pk>/', views.UserCombos.as_view(),name='user-combo'),
   path('user-review/', views.UserReview.as_view(),name='user-review'),
   path('reviews/', views.UserReviews.as_view(),name='user-reviews'),
   path('reviews/<int:pk>/', views.ShowUserReview.as_view(),name='show-at-home'),
   path('weekly-summary/', views.SalesOverview.as_view(),name='weekly-sales'),
   path('forgot-password/', views.ForgotPassword.as_view(),name='forgot-password'),


   
]

#jwt authentication
urlpatterns += [
    path('register/',UserRegistrationView.as_view(),name='register'),
    path('verify-otp/',OTPVerificationView.as_view(),name='otp_verification'),
    
]