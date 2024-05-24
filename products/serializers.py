from rest_framework import serializers
from .models import Product, Reviews, Variation, Image

class ReviewSerializer(serializers.ModelSerializer):
    avatar = serializers.SerializerMethodField(source='user.avatar.url')
    user = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = Reviews
        fields = "__all__"

    def get_avatar(self, obj):
        return obj.user.avatar.url

class VariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Variation
        fields = "__all__"

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"

class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    variants = VariantSerializer(read_only=True, many=True)
    images = ImageSerializer(read_only=True, many=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'slug', 'description', 'price', 'rating', 'count_in_stock', 'category', 'image', 
                  'num_reviews', 'slug_url', 'num_images' , 'variants', 'images', 'reviews']

    def get_reviews(self, obj):
        reviews = obj.reviews_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data
    
