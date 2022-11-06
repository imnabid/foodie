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
from .models import Combo,BusinessInfo, DeliveryAddress,CarouselImage, FoodCategory, Food, Offer, Order, OrderItem
from .serializers import (BusinessInfoSerializer,OfferSerializerPost,
ComboItemSerializer,CarouselImgSerializer, ComboSerializer, ComboSerializerGet,
DeliveryAddressSerializer, FoodSerializer, FoodCategorySerializer,
OfferSerializer, OrderHistorySerializer, OrderItemSerializer, OrderItemHistorySerializer, OrderSerializer)
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication,TokenAuthentication
from rest_framework.authtoken.models import Token
from .permissions import IsInstanceOfUser, IsStaff, IsStaffOrReadOnly
from oauth2_provider.contrib.rest_framework import OAuth2Authentication
from rest_framework.pagination import LimitOffsetPagination

class LoggedInUserInfo(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        serializer = UserSerializer(request.user, context={'request':request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class OrderHistoryView(generics.ListAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderItemHistorySerializer
    pagination_class = LimitOffsetPagination
    # permission_classes = [IsStaff]

class BusinessInfoView(APIView):
    permission_classes = [IsStaffOrReadOnly]

    def get(self, request, *args, **kwargs):
        queryset = BusinessInfo.objects.all().first()
        serializer = BusinessInfoSerializer(queryset)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, *args, **kwargs):
        instance = BusinessInfo.objects.all().first()          
        serializer = BusinessInfoSerializer(instance, data=request.data, partial=True )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'status':'update failed'}, status=status.HTTP_400_BAD_REQUEST)

class FoodCategoriesList(generics.ListCreateAPIView):
    queryset = FoodCategory.objects.all()
    serializer_class = FoodCategorySerializer
    permission_classes = [IsStaffOrReadOnly]

class DeleteCategory(APIView):
    permission_classes = [IsStaff]
    serializer_class = FoodCategorySerializer

    def delete(self, request, *args, **kwargs):
        id = kwargs.get('pk')
        instance = FoodCategory.objects.get(id=id)
        instance.delete()
        return Response({'status':'item deleted'},status=status.HTTP_200_OK)

class FoodList(generics.ListCreateAPIView):
    queryset = Food.objects.all()
    serializer_class = FoodSerializer
    permission_classes = [IsStaffOrReadOnly]

class DeleteFood(APIView):
    permission_classes = [IsStaff]
    serializer_class = FoodSerializer

    def delete(self, request, *args, **kwargs):
        id = kwargs.get('pk')
        instance = Food.objects.get(id=id)
        instance.delete()
        return Response({'status':'item deleted'},status=status.HTTP_200_OK)

class CategoryFoodList(APIView):
    def get(self, request, *args, **kwargs):
        id = kwargs.get('pk')
        queryset = Food.objects.filter(category__id=id)
        serializer = FoodSerializer(queryset, many=True, context={'request':request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class CarouselImages(generics.ListCreateAPIView):
    queryset = CarouselImage.objects.all()
    serializer_class = CarouselImgSerializer
    permission_classes = [IsStaffOrReadOnly]

class DeleteCarouselImage(APIView):
    permission_classes = [IsStaffOrReadOnly]

    def delete(self, request, *args, **kwargs):
        id = kwargs.get('pk')
        img = CarouselImage.objects.get(id=id)
        img.delete()
        return Response({'status':'item deleted'},status=status.HTTP_200_OK)


    
class OfferList(generics.ListCreateAPIView):
    queryset = Offer.objects.all()
    serializer_class = OfferSerializer
    permission_classes = [IsStaffOrReadOnly]

class OfferPost(APIView):
    permission_classes = [IsStaffOrReadOnly]

    def post(self, request, *args, **kwargs):
        serializer = OfferSerializerPost(data=request.data)
        if serializer.is_valid(raise_exception=True):            
            #serializer.save() returns the instance
            s = OfferSerializer(serializer.save(), context={'request':request}) 
            return Response(s.data,status=status.HTTP_200_OK)

class DeleteOffer(APIView):
    permission_classes = [IsStaff]

    def delete(self, request, *args, **kwargs):
        id = kwargs.get('pk')
        instance = Offer.objects.get(id=id)
        instance.delete()
        return Response({'status':'item deleted'},status=status.HTTP_200_OK)



class PostComboItem(generics.CreateAPIView):
    serializer_class = ComboItemSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        request.data['user'] = request.user.id
        return super().create(request, *args, **kwargs)   
    
class UserCombos(APIView):
    permission_classes = [IsAuthenticated, IsInstanceOfUser]

    def get(self, request, *args, **kwargs):
        queryset = Combo.objects.filter(user=request.user)
        serializer = ComboSerializerGet(queryset, many=True, context={'request':request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = ComboSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response({'status':'combo created successfully'}, status=status.HTTP_201_CREATED)
        
    def delete(self, request, *args, **kwargs):
        id = kwargs.get('pk')
        combo = Combo.objects.get(id=id)
        self.check_object_permissions(request, combo)
        for citem in combo.items.all():
            citem.delete()
        name = combo.name
        combo.delete()
        return Response({'status':f'combo:{name} deleted'},status=status.HTTP_200_OK)

class DeliveryAddressView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        address = DeliveryAddress.objects.get(user=request.user)
        serializer = DeliveryAddressSerializer(address)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        instance = get_object_or_404(DeliveryAddress, user=request.user)
        if instance:
            return Response({'status':'Address already Added!'}, status=status.HTTP_403_FORBIDDEN)
        serializer = DeliveryAddressSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response({'status':'address added'}, status=status.HTTP_201_CREATED)

    def patch(self, request, *args, **kwargs):
        instance = get_object_or_404(DeliveryAddress, user=request.user)
        serializer = DeliveryAddressSerializer(instance, data=request.data, partial=True )
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'status':'update failed'}, status=status.HTTP_400_BAD_REQUEST)

class OrderItemView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = OrderItemSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)

class UserOrders(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        orders = request.user.order_set.all().order_by('-date')
        if(orders):
            serialiazer = OrderHistorySerializer(orders, many=True, context={'request':request})
            return Response(serialiazer.data)
        return Response({'status':'No Order History'},status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(user=request.user)
            return Response({'status':'order successful'}, status=status.HTTP_200_OK)

class CancelOrderView(APIView):
    permission_classes = [IsInstanceOfUser]

    def get(self, request, *args, **kwargs):
        id = kwargs.get('pk')
        order = get_object_or_404(Order, id=id)
        self.check_object_permissions(request, order)
        order.cancelled = True;
        order.save()
        return Response({'status':'order cancelled'},status=status.HTTP_202_ACCEPTED)
