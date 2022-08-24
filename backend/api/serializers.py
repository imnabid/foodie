from dataclasses import fields
from rest_framework import serializers
from .models import FoodCategory, Food,  Order
from accounts.models import User


class OTPVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=10)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email', 'password','first_name','last_name','address']

    def create(self, validated_data):
        User = self.Meta.model
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

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



