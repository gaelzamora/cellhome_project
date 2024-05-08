from rest_framework import serializers
from .models import Product, Reviews, Variation

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

class ProductSerializer(serializers.ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Product
        fields = "__all__"

    def get_reviews(self, obj):
        reviews = obj.reviews_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data
    
    def get_variants(self, obj):
        variants = obj.revies_set.all()
        serializer = VariantSerializer(variants, many=True)
        return serializer.data
    
