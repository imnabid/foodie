from datetime import datetime, timedelta
import pprint          
from django.shortcuts import get_object_or_404
from requests import delete
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.conf import settings

from accounts.serializers import UserSerializer
from .models import (Review, Combo,BusinessInfo, DeliveryAddress,
CarouselImage, FoodCategory, Food, Offer, Order, OrderItem)

from .serializers import (BusinessInfoSerializer,OfferSerializerPost,
OwnerOrderListSerializer,ComboItemSerializer,CarouselImgSerializer,
ComboSerializer, ComboSerializerGet,DeliveryAddressSerializer,
FoodSerializer, FoodCategorySerializer,DateSerializer,OfferSerializer,
OrderHistorySerializer, OrderItemSerializer, OrderItemHistorySerializer,
OrderSerializer, ReviewSerializer)
from accounts.models import User

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, BasicAuthentication,TokenAuthentication
from rest_framework.authtoken.models import Token
from .permissions import (IsInstanceOfUser, IsStaff, IsStaffOrReadOnly,
IsAuthenticatedOrReadOnly)
from oauth2_provider.contrib.rest_framework import OAuth2Authentication
from rest_framework.pagination import LimitOffsetPagination
from accounts.otp import send_email, otp_generator


class LoggedInUserInfo(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        serializer = UserSerializer(request.user, context={'request':request})
        return Response(serializer.data, status=status.HTTP_200_OK)

class ForgotPassword(APIView):

    def post(self, request, *args, **kwargs):
        otp = request.data.get('otp',None)
        user = get_object_or_404(User, email=request.data['email'])
        if otp is None:
            email = request.data['email']            
            otp_code = otp_generator()
            user.otp = otp_code
            user.save()
            send_email(email, otp_code)
            return Response({'status':'OTP code sent to your email'}, status=
            status.HTTP_200_OK
            )
        else:
            if user.otp == otp:
                password = request.data['password']
                user.set_password(password)
                user.save()
                return Response({'status':'password changed'})
            return Response({'status':'OTP didnt match'}, status=
            status.HTTP_403_FORBIDDEN
            )




class UserReviews(APIView): #for homepage and owner page
    permission_classes = [IsStaffOrReadOnly]
    def get(self, request, *args, **kwargs):
        if request.user and request.user.is_staff:
            queryset = Review.objects.all().order_by('-created')
        else:
            queryset = Review.objects.filter(approved=True)
        serializer = ReviewSerializer(queryset, many=True, context={'request':request})
        if serializer.data:
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'status':'No reviews found'}, status=status.HTTP_404_NOT_FOUND)

class ShowUserReview(APIView):
    permission_classes = [IsStaff]
    def patch(self, request, *args, **kwargs):
        id = kwargs.get('pk')
        instance = Review.objects.get(id=id)
        serializer = ReviewSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'status':'The review will be posted at home'}, status=status.HTTP_200_OK)

class UserReview(APIView): #post user review and get own review for my orders page
    permission_classes = [IsAuthenticated]
    def get(self, request, *args, **kwargs):
        instance = get_object_or_404(Review, user=request.user)
        serializer = ReviewSerializer(instance, context={'request':request})
        if serializer.data is None:
            return Response({'status':'No review from the user'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        try:            
            instance = Review.objects.get(user=request.user)
            if instance:
                serializer = ReviewSerializer(instance, data=request.data, partial=True)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response({'status':'Review submitted'}, status=status.HTTP_200_OK)
        except:
            serializer = ReviewSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(user=request.user)
                return Response({'status':'Review submitted'}, status=status.HTTP_200_OK)

class OrderHistoryView(generics.ListAPIView):
    queryset = OrderItem.objects.filter(order__status='D', order__cancelled=False)
    serializer_class = OrderItemHistorySerializer
    pagination_class = LimitOffsetPagination
    permission_classes = [IsStaff]

class OrderHistoryDateSearch(generics.GenericAPIView):
    pagination_class = LimitOffsetPagination
    permission_classes = [IsStaff]

    def post(self, request, *args, **kwargs):      
        serializer = DateSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            start = serializer.validated_data.get('start')
            end = serializer.validated_data.get('end')
        queryset = OrderItem.objects.filter(order__status='D', order__cancelled=False,
        date__range=(start,end))
        page = self.paginate_queryset(queryset)
        if page is not None:
            s = OrderItemHistorySerializer(page, many=True)
            return self.get_paginated_response(s.data)
        return Response({'status':'not working'})


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
        address = get_object_or_404(DeliveryAddress, user=request.user)
        serializer = DeliveryAddressSerializer(address)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        try:
            instance = get_object_or_404(DeliveryAddress, user=request.user)
            if instance:
                return Response({'status':'Address already Added!'}, status=status.HTTP_403_FORBIDDEN)
        except:
            serializer = DeliveryAddressSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save(user=request.user)
                return Response(serializer.data, status=status.HTTP_201_CREATED)

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

class ChangeOrderStatus(APIView):
    permission_classes = [IsStaff]
    
    def patch(self, request, *args, **kwargs):
        id = kwargs.get('pk')
        instance = Order.objects.get(id=id)        
        serializer = OrderSerializer(instance, data=request.data, partial=True )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'status':'update failed'}, status=status.HTTP_400_BAD_REQUEST)


# class OrderList(generics.ListAPIView):
#     queryset = Order.objects.filter(cancelled=False).order_by('-date')
#     serializer_class = OwnerOrderListSerializer
#     permission_classes = [IsStaff]


class SalesOverview(APIView):
    permission_classes=[IsStaff]

    def get(self, request, *args, **kwargs):
        week_ago = datetime.today() - timedelta(days=7)
        items = OrderItem.objects.filter(order__status='D', date__gte=week_ago)

        weekly_sales = [
            items.filter(date__week_day=1).count(),
            items.filter(date__week_day=2).count(),
            items.filter(date__week_day=3).count(),
            items.filter(date__week_day=4).count(),
            items.filter(date__week_day=5).count(),
            items.filter(date__week_day=6).count(),
            items.filter(date__week_day=7).count(),
        ]
        categories = [{'name':c.category_name,'sales':0, 'total':0} 
        for c in FoodCategory.objects.all()]

        total_sales = 0
        total_orders = 0
        total_amount = 0

        for item in items:
            name = item.food.category.category_name
            for c in categories:
                if c['name'] == name:
                    c['sales'] += item.quantity
                    c['total'] += item.total
            total_sales += item.quantity
            total_amount += item.total
            total_orders += 1
        data = {
            'total_sales':total_sales,
            'total_earning':total_amount,
            'total_orders':total_orders,
            'categories':categories,
            'weekly_sales':weekly_sales

        }
        return Response(data, status=status.HTTP_200_OK)











class CancelOrderView(APIView):
    permission_classes = [IsInstanceOfUser]

    def get(self, request, *args, **kwargs):
        id = kwargs.get('pk')
        order = get_object_or_404(Order, id=id)
        self.check_object_permissions(request, order)
        order.cancelled = True;
        order.save()
        return Response({'status':'order cancelled'},status=status.HTTP_202_ACCEPTED)
