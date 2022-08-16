from django.db import models
from django.contrib.auth import get_user_model

class FoodCategory(models.Model):
    category_name = models.CharField(max_length=200)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.category_name

class Food(models.Model):
    category = models.ForeignKey(FoodCategory, related_name='categories', on_delete=models.CASCADE)
    item_name = models.CharField(max_length=200, unique=True)
    price = models.DecimalField(decimal_places=2, max_digits=6)
    max_order = models.IntegerField(default=5)

    def __str__(self):
        return self.item_name

class Order(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    ordered_food = models.ForeignKey(Food, on_delete=models.CASCADE)
    ordered_date = models.DateTimeField(auto_now_add=True)
    ordered_quantity = models.IntegerField()
    price = models.DecimalField(decimal_places=2, max_digits=6)

    def __str__(self):
        return self.ordered_food.item_name
