from django.urls import path
from . import views

urlpatterns = [
   path('categories/', views.FoodCategoriesList.as_view()),
   path('foods/',views.FoodList.as_view(), name='food-list'),
   path('login/', views.LoginView.as_view(), name='login'),
]