from datetime import datetime
from unicodedata import category
from django.shortcuts import get_object_or_404
from requests import delete
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.conf import settings

from accounts.serializers import UserSerializer
from .models import Combo, DeliveryAddress, FoodCategory, Food, Offer, Order, OrderItem
from .serializers import (ComboItemSerializer, ComboSerializer, ComboSerializerGet, DeliveryAddressSerializer, FoodSerializer, FoodCategorySerializer, OfferSerializer, OrderHistorySerializer, OrderItemSerializer, OrderSerializer)
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


class OrderHistoryView(APIView):
    permission_classes = [IsAuthenticated] #not implemented for now

    def get(self, request, *args, **kwargs):
        orders = request.user.order_set.all().order_by('-date')
        if(orders):
            serialiazer = OrderHistorySerializer(orders, many=True, context={'request':request})
            return Response(serialiazer.data)
        return Response({'status':'No Order History'},status=status.HTTP_404_NOT_FOUND)
    


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
    permission_classes = [IsStaffOrReadOnly]

    
class OfferList(generics.ListCreateAPIView):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer
    permission_classes = [IsStaffOrReadOnly]

    
class FoodList(generics.ListCreateAPIView):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsStaffOrReadOnly]


class CategoryFoodList(APIView):
    def get(self, request, *args, **kwargs):
        id = kwargs.get('pk')
        queryset = Food.objects.filter(category__id=id)
        serializer = FoodSerializer(queryset, many=True, context={'request':request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class PostComboItem(generics.CreateAPIView):
    serializer_class = ComboItemSerializer
    permission_classes = [IsAuthenticated]

class ComboList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        queryset = Combo.objects.all()
        serializer = ComboSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = ComboSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'status':'combo created successfully'}, status=status.HTTP_201_CREATED)
        
class UserComboList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        id = kwargs.get('pk')
        queryset = Combo.objects.filter(user__id=id)
        serializer = ComboSerializerGet(queryset, many=True, context={'request':request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def delete(self, request, *args, **kwargs):
        id = kwargs.get('pk')
        combo = Combo.objects.get(id=id)
        for citem in combo.items.all():
            citem.delete()
        name = combo.name
        combo.delete()
        return Response({'status':f'combo:{name} deleted'},status=status.HTTP_200_OK)

class GetDeliveryAddress(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        id = kwargs.get('pk')
        address = DeliveryAddress.objects.get(user__id=id)
        serializer = DeliveryAddressSerializer(address)
        return Response(serializer.data, status=status.HTTP_200_OK)


class PostDeliveryAddress(generics.CreateAPIView):
    serializer_class = DeliveryAddressSerializer
    permission_classes = [IsAuthenticated]

class UpdateDeliveryAddress(generics.UpdateAPIView):
    queryset = DeliveryAddress.objects.all()
    serializer_class = DeliveryAddressSerializer
    lookup_field = 'pk'
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'status':'update failed'}, status=status.HTTP_400_BAD_REQUEST)

class OrderItemView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = OrderItemSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

class OrderView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'status':'order successful'}, status=status.HTTP_200_OK)

class CancelOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        id = kwargs.get('pk')
        order = get_object_or_404(Order, id=id)
        order.cancelled = True;
        order.save()
        return Response({'status':'order cancelled'},status=status.HTTP_202_ACCEPTED)
