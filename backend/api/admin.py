from django.contrib import admin

from api.models import Food, FoodCategory, Order

admin.site.register(FoodCategory)

@admin.register(Food)
class FoodAdmin(admin.ModelAdmin):
    list_display = ['item_name', 'price', 'category']

@admin.register(Order)
class FoodAdmin(admin.ModelAdmin):
    list_display = ['ordered_food', 'user', 'ordered_quantity']