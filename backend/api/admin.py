from django.contrib import admin

from api.models import Combo, ComboItem, DeliveryAddress, Food, FoodCategory, Offer, Order, OrderItem

admin.site.register(FoodCategory)

@admin.register(Food)
class FoodAdmin(admin.ModelAdmin):
    list_display = ['name','id', 'price', 'category']

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['id','user', 'food', 'quantity', 'total']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id','date','user', 'total']
    
@admin.register(Offer)
class OfferAdmin(admin.ModelAdmin):
    list_display = ['food', 'discount_percent']

@admin.register(ComboItem)
class ComboItemAdmin(admin.ModelAdmin):
    list_display = ['user','food', 'quantity']
@admin.register(Combo)
class ComboAdmin(admin.ModelAdmin):
    list_display = ['id','name','user']

@admin.register(DeliveryAddress)
class AddressAdmin(admin.ModelAdmin):
    list_display = ['id','user','full_name']