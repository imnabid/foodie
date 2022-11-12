from rest_framework import serializers
from .models import  (
Combo, CarouselImage, ComboItem, DeliveryAddress,
FoodCategory, Food, Offer,  Order, OrderItem, BusinessInfo, Review)
from zoneinfo import ZoneInfo
from accounts.serializers import UserSerializer

class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ['user']
    def get_user(self, obj):
        data = UserSerializer(obj.user, context=self.context).data
        return {'name':data['username'], 'image':data['image']}

class DateSerializer(serializers.Serializer):
    start = serializers.DateField(input_formats=['%m/%d/%Y'])
    end = serializers.DateField(input_formats=['%m/%d/%Y'])

class DeliveryAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryAddress
        exclude = ['user']

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        exclude = ['user']


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        exclude = ['user']

class CarouselImgSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarouselImage
        fields = '__all__'

class BusinessInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusinessInfo
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
        fields = ['name', 'image', 'items']


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
class OrderItemHistorySerializer(serializers.ModelSerializer):
    food = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()
    class Meta:
        model = OrderItem
        fields = ['id','date','user', 'category', 'food', 'quantity','total']
    def get_user(self,obj):
        return obj.user.username
    def get_food(self, obj):
        return obj.food.name
    def get_category(self, obj):
        return obj.food.category.category_name

class OrderHistorySerializer(serializers.Serializer):
    date = serializers.DateTimeField(format='%Y-%m-%d %I:%M %p', default_timezone=ZoneInfo('Asia/Kathmandu'))

    def to_representation(self, instance):
        date = super().to_representation(instance)
        i = instance
        return {
            'id':i.id,
            'user':i.user.username,
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
class OwnerOrderListSerializer(serializers.Serializer):
    date = serializers.DateTimeField(format='%Y-%m-%d %I:%M %p', default_timezone=ZoneInfo('Asia/Kathmandu'))

    def to_representation(self, instance):
        date = super().to_representation(instance)
        i = instance
        address = DeliveryAddress.objects.get(user=i.user) 
        return {
            'id':i.id,
            'user':i.user.username,
            'note':i.note,
            'total':i.total,
            'date':date.get('date'),
            'cancelled':i.cancelled,
            'status':i.status,
            'food':[
                {**FoodSerializer(oitem.food, context=self.context).data,
                'quantity':oitem.quantity }
                for oitem in instance.food.all()
            ],
            'address':DeliveryAddressSerializer(address).data,
            'fee':BusinessInfo.objects.first().delivery_charge
        }
    
class OrderListSerializer(serializers.ModelSerializer):
    food = OrderHistorySerializer(read_only=True, many=True)
    class Meta:
        model = Order
        fields = '__all__'

class OfferSerializer(serializers.ModelSerializer):
    food = FoodSerializer(read_only=True)
    class Meta:
        model = Offer
        fields = '__all__'

class OfferSerializerPost(serializers.ModelSerializer):
    class Meta:
        model = Offer
        fields = '__all__'
    # def to_representation(self, instance):
    #     req = self.context['request']
    #     if(req.method == 'GET'):
    #         return {
    #             'id':instance.id,
    #             'discount_percent':instance.discount_percent,
    #             'food':FoodSerializer(instance.food, context={'request':req}).data,
    #         }

    #     return super().to_representation(instance)




