from rest_framework import serializers
from .models import  Combo, ComboItem, DeliveryAddress, FoodCategory, Food, Offer,  Order, OrderItem
from zoneinfo import ZoneInfo

class DeliveryAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryAddress
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class FoodCategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = FoodCategory
        fields = '__all__'

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'

class ComboItemSerializer(serializers.ModelSerializer):    #used for post request only
    class Meta:
        model = ComboItem
        fields = '__all__'

class ComboItemSerializerGet(serializers.ModelSerializer):
    food = FoodSerializer()
    class Meta:
        model = ComboItem
        fields = ['food','quantity']

class ComboSerializer(serializers.ModelSerializer): #used for post request only
    class Meta:
        model = Combo
        fields = '__all__'


class ComboSerializerGet(serializers.BaseSerializer):

    def to_representation(self, instance):
        
        i = instance
        return {
            'id':i.id,
            'name':i.name,            
            'items':[
                {**FoodSerializer(citem.food, context=self.context).data,
                'quantity':citem.quantity }
                for citem in instance.items.all()
            ]
        }
    
class OrderHistorySerializer(serializers.Serializer):
    date = serializers.DateTimeField(default_timezone=ZoneInfo('Asia/Kathmandu'))

    def to_representation(self, instance):
        date = super().to_representation(instance)
        i = instance
        return {
            'id':i.id,
            'user':i.user.id,
            'note':i.note,
            'total':i.total,
            'date':date.get('date'),
            'cancelled':i.cancelled,
            'status':i.status,
            'food':[
                {**FoodSerializer(oitem.food, context=self.context).data,
                'quantity':oitem.quantity }
                for oitem in instance.food.all()
            ]
        }
    


class OfferSerializer(serializers.ModelSerializer):
    food = FoodSerializer(read_only=True)
    class Meta:
        model = Offer
        fields = '__all__'




