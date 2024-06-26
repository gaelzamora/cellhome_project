from django.db import models
from django.forms import ValidationError
from users.models import User

class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100, blank=True)
    slug = models.SlugField(max_length=50, null=True, blank=True)
    slug_url = models.SlugField(max_length=50, null=True, blank=True)
    image = models.ImageField(default='placeholder.png')
    category = models.CharField(max_length=100, blank=True)
    description = models.CharField(max_length=100, blank=True)
    rating = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    num_reviews = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    count_in_stock = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    num_images = models.IntegerField(default=0)

class Image(models.Model):
    id_product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images', null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    image = models.ImageField(default='placeholder.png')

class Reviews(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True, related_name='reviews')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    rating = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    description = models.CharField(max_length=100, blank=True)
    created = models.DateTimeField(auto_now_add=True)

class Variation(models.Model):
    id_product = models.ForeignKey(Product, on_delete=models.SET_NULL, related_name='variants', null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    variation_category = models.CharField(max_length=100, null=True)
    name = models.CharField(max_length=255, null=True)
    sku = models.CharField(max_length=50, null=True)
    stock = models.IntegerField(default=0)
    image = models.ImageField(blank=True, null=True)