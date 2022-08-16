from dataclasses import fields
from rest_framework import serializers

from .models import Blog, Viewer, FoodCategory, Food,  Order



class FoodCategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = FoodCategory
        fields = '__all__'

class FoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Food
        fields = '__all__'








# class BlogModelSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Blog
#         fields = ['id','title','created']

# class ViewerSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Viewer
#         fields = '__all__'

# class BlogSerializer(serializers.Serializer):
#     id = serializers.PrimaryKeyRelatedField(read_only=True)
#     title = serializers.CharField(max_length=200)
#     viewers = serializers.HyperlinkedRelatedField(
#         queryset=Blog.objects.all(),
#         many=True,
#         view_name='viewer-detail'
#         )
#     text = serializers.CharField(allow_null=True)
#     created = serializers.DateTimeField(read_only=True)
#     # updated = serializers.DateTimeField(auto_now=True)

#     def create(self, validated_data):
#         print('inside create ',validated_data)
#         title = self.validated_data.get('title')
#         text = self.validated_data.get('text')          
#         blog = Blog.objects.create(title=title, text=text)
#         blog.save()
#         return blog

#     def update(self, instance, validated_data):
#         instance = Blog.objects.filter(pk=instance.pk).update(**validated_data)        
#         return instance
   
#     # custom validation
#     def validate(self, data): #for overall data it runs second
        
#         # do your validation here
#         return data

#     def validate_title(self, value):  #validate_<field_name>  -- it runs first
#         # do your validation here
#         return value

  
