from rest_framework import serializers
from .models import User


class OTPVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=10)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email', 'password','first_name','image','last_name','address','is_staff')
        extra_kwargs = {'password':{'write_only':True}, 'id':{'read_only':True},'is_staff':{'read_only':True}}

    def create(self, validated_data):
        print('inside create')
        User = self.Meta.model
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user
    def update(self, instance, validated_data):
        if self.context.get('change_password'):
            password = self.context.get('request').data.get('new_password')
            instance.set_password(password)
            instance.save()
            return instance
        instance.image = validated_data.get('image', instance.image)
        instance.save()
        return instance