from django.db import models
from users.models import User
from products.models import Product
import shortuuid

# Create your models here.

def generate_num_order():
    return shortuuid.ShortUUID().random(length=15)

class Order(models.Model):
    num_order = models.CharField(max_length=15, unique=True, default=generate_num_order)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    total_price = models.CharField(max_length=250, blank=True)
    is_delivered = models.BooleanField(default=False)
    delivered_at = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Orderitem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(null=True, blank=True, default=0)
    price = models.CharField(max_length=250, blank=True)

class ShippingAddress(models.Model):
    order = models.OneToOneField(Order, on_delete=models.CASCADE, null=True, blank=True)
    email = models.EmailField(max_length=100, blank=True)
    phone_number = models.CharField(max_length=100, blank=True)
    address_1 = models.CharField(max_length=250, blank=True)
    suburb = models.CharField(max_length=250, blank=True)
    city_state = models.CharField(max_length=250, blank=True)
    country = models.CharField(max_length=100, blank=True)
    postal_code = models.CharField(max_length=100, blank=True)