from rest_framework import serializers

from . import models

# class ProductsSerializer(serializers.ModelSerializer):
    
#     class Meta:
#         model = models.Products
#         fields = "__all__"


class ProductSerializer(serializers.Serializer):
    
    stripe_token = serializers.CharField(max_length=256)
    