import os
from django.db import models
from django.contrib.auth import get_user_model
from django.dispatch import receiver
from django.db.models.signals import pre_save, pre_delete, post_save, post_delete
from django.db.models import Min
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

class DeliveryAddress(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    full_name = models.CharField(max_length=200)
    mobile = models.CharField(max_length=15)
    city = models.CharField(max_length=200)
    street = models.CharField(max_length=200)
    landmark = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Delivery Addresses'
    def __str__(self):
        return f'{self.full_name} {self.city}'

class CarouselImage(models.Model):
    image = models.ImageField(upload_to='carousel')

class BusinessInfo(models.Model):
    service_hrs = models.CharField(max_length=20)
    contact = models.CharField(max_length=10)
    address = models.CharField(max_length=200)
    email = models.EmailField()
    delivery_charge = models.PositiveSmallIntegerField(default=0)
    fb = models.CharField(max_length=200, null=True, blank=True) 
    insta = models.CharField(max_length=200, null=True, blank=True) 

class FoodCategory(models.Model):
    category_name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='categories', blank=True, null=True)
    description = models.TextField(blank=True)
    starts_at = models.PositiveSmallIntegerField(default=0)

    class Meta:
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.category_name

class Food(models.Model):
    category = models.ForeignKey(FoodCategory, related_name='categories', on_delete=models.CASCADE)
    name = models.CharField(max_length=200, unique=True)
    image = models.ImageField(upload_to='foods', blank=True, null=True)
    price = models.PositiveSmallIntegerField(default=0)
    max_order = models.IntegerField(default=5)
    

    def __str__(self):
        return self.name
        

@receiver(post_delete, sender=FoodCategory)
@receiver(post_delete, sender=CarouselImage)
@receiver(post_delete, sender=get_user_model())
def handle_image_delete(instance, *args, **kwargs):
    os.remove(instance.image.path)

@receiver(post_save, sender=Food)
def handle_starts_at_create(instance,created, *args, **kwargs):
    if(created):
        category = instance.category
        foods = Food.objects.filter(category=category).aggregate(min=Min('price'))
        category.starts_at = foods.get('min',0)
        category.save()
        instance.save()
@receiver(post_delete, sender=Food)
def handle_starts_at_delete(instance, *args, **kwargs):
    category = instance.category
    foods = Food.objects.filter(category=category).aggregate(min=Min('price'))
    if(foods.get('min') is None):
        category.starts_at = 0
    else:
        category.starts_at = foods.get('min',0)
    os.remove(instance.image.path)
    category.save()


class Offer(models.Model):
    food = models.OneToOneField(Food, on_delete=models.CASCADE)
    price_before = models.PositiveSmallIntegerField(default=0)
    discount_percent = models.PositiveSmallIntegerField(default=0)

    def __str__(self):
        return self.food.name
@receiver(pre_save, sender=Offer)
def handle_offer_addition(instance,*args, **kwargs):
    price_before = instance.food.price
    instance.food.price -= price_before * instance.discount_percent/100           
    instance.price_before = price_before
    instance.food.save()


@receiver(pre_delete, sender=Offer)
def handle_offer_deletion(instance, *args, **kwargs):
    instance.food.price = instance.price_before 
    instance.food.save()


class ComboItem(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    quantity = models.SmallIntegerField(default=1)
    def __str__(self):
        return f'{self.food.name}x{self.quantity}'

class Combo(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    items = models.ManyToManyField(ComboItem)

    def __str__(self):
        return self.name
@receiver(pre_delete, sender=Combo)
def handle_combo_deletion(instance, *args, **kwargs):
    for comboItem in instance.items.all():
        comboItem.delete()
    

class OrderItem(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    food = models.ForeignKey(Food, on_delete=models.CASCADE)
    quantity = models.SmallIntegerField()
    date = models.DateField(auto_now_add=True)
    total = models.PositiveSmallIntegerField()

    def __str__(self):
        return f'{self.food.name}x{self.quantity}'


class Order(models.Model):
    ORDER_STATUS = [
        ('OT','ORDER TAKEN'),
        ('P','PREPARING'),
        ('S','SHIPPED'),
        ('D','DELIVERED')
    ]
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    note = models.TextField(blank=True, null=True)
    food = models.ManyToManyField(OrderItem)
    date = models.DateTimeField(auto_now_add=True)
    total = models.PositiveSmallIntegerField(default=0)
    status = models.CharField(max_length=2, choices=ORDER_STATUS, default='OT')
    cancelled = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user.username} {self.total}'
@receiver(pre_delete, sender=Order)
def handle_order_deletion(instance, *args, **kwargs):
    for orderItem in instance.food.all():
        orderItem.delete()
    
@receiver(post_save, sender=Order)
def handle_websocket_order_list(instance,created, *args, **kwargs):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)('order-list',{
        'type':'order.list',
        'status':instance.status
    })

class Review(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    message = models.TextField(blank=True, null=True)
    rate = models.PositiveSmallIntegerField(default=1)
    approved = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.user.username