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
    variants = VariantSerializer(read_only=True, many=True)
    images = ImageSerializer(read_only=True, many=True)
    reviews = ReviewSerializer(read_only=True, many=True)

    class Meta:
        model = Product
        fields = '__all__'