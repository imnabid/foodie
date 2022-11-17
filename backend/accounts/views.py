import os
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, OTPVerificationSerializer
from .otp import send_email
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated

class UpdateUserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):  
        patch_type = request.data.get('patch_type',None)
        change_password = False
        if patch_type == 'change_password':
            if request.data.get('new_password') == request.data.get('old_password'):
                return Response({'status':'Same password error'}, status=status.HTTP_403_FORBIDDEN)
            user = authenticate(username=request.user.username,
                         password=request.data.get('old_password')) 
            if user is None:
                return Response({'status':'Incorrect Password'}, status=status.HTTP_403_FORBIDDEN)
            

            change_password = True
        elif patch_type == 'change_image':
            os.remove(request.user.image.path)
        serializer = UserSerializer(request.user, data=request.data,
        partial=True, context={'change_password':change_password, 'request':request} )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'status':'update failed'}, status=status.HTTP_400_BAD_REQUEST)

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
                return Response({'status':'user already verified'},status=status.HTTP_400_BAD_REQUEST)
            if instance.otp == serializer.validated_data.get('otp'):
                instance.is_active = True
                instance.save()
            else:
                return Response({'status':"provided OTP didn't match"}, status=status.HTTP_400_BAD_REQUEST)
            return Response({'status':'Account verified successfully'})