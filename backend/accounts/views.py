from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, OTPVerificationSerializer
from .otp import send_email

class UserRegistrationView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            instance = serializer.save()
            instance.is_active=False   #for otp
            instance.save()   
            send_email(instance.email, instance.otp)
            return Response({'message':'A OTP has been sent to the provided email'},status=status.HTTP_202_ACCEPTED)
 

class OTPVerificationView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = OTPVerificationSerializer(data=request.data)
        if(serializer.is_valid(raise_exception=True)):
            instance = get_object_or_404(get_user_model(),email=serializer.validated_data.get('email'))
            if instance.is_active:
                return Response({'status':'user already verified'})
            if instance.otp == serializer.validated_data.get('otp'):
                instance.is_active = True
                instance.save()
            else:
                return Response({'status':"provided OTP didn't match"})
            return Response({'status':'Account verified successfully'})