from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.conf import settings

from accounts.serializers import UserSerializer
from .models import FoodCategory, Food
from .serializers import (FoodSerializer, FoodCategorySerializer, OrderSerializer)
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication,TokenAuthentication
from rest_framework.authtoken.models import Token
from .permissions import IsPaymentSuccessful, IsStaffOrReadOnly
from oauth2_provider.contrib.rest_framework import OAuth2Authentication


class LoggedInUserInfo(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        serializer = UserSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class OrderHistoryListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsPaymentSuccessful] #not implemented for now

    def get(self, request, *args, **kwargs):
        orders = request.user.order_set.all().order_by('-created')
        if(orders):
            serialiazer = OrderSerializer(orders, many=True)
            return Response(serialiazer.data)
        return Response({'status':'No Order History'})
    
    def post(self, request, *args, **kwargs):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'status':'successful'})


class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if not user:
            return Response({'error': 'Invalid Credentials'},status=status.HTTP_404_NOT_FOUND)
        if user.is_verified==True:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({'token': token.key, 'username':user.get_username()},status=status.HTTP_200_OK)
        return Response({'error':'the account is not verified'},status=status.HTTP_403_FORBIDDEN)




class FoodCategoriesList(generics.ListCreateAPIView):
    queryset = FoodCategory.objects.all()
    serializer_class = FoodCategorySerializer
    authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    
class FoodList(generics.ListCreateAPIView):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsStaffOrReadOnly]

    


