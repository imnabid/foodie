from rest_framework import serializers
from .models import User


class OTPVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=10)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email', 'password','first_name','last_name','address')
        extra_kwargs = {'password':{'write_only':True}, 'id':{'read_only':True}}

    def create(self, validated_data):
        User = self.Meta.model
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user