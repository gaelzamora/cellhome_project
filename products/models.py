from django.db import models
from users.models import User

class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=100, blank=True)
    slug = models.SlugField(max_length=50, null=True, blank=True)
    image = models.ImageField(default='placeholder.png')
    category = models.CharField(max_length=100, blank=True)
    description = models.CharField(max_length=100, blank=True)
    rating = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    num_reviews = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    count_in_stock = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)

class Reviews(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    rating = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    description = models.CharField(max_length=100, blank=True)
    created = models.DateTimeField(auto_now_add=True)

class VariationManager(models.Model):
    def colors(self):
        return super(VariationManager, self).filter(variation_category='color', is_active=True)
    def tallas(self):
        return super(VariationManager, self).filter(variation_category='capacidad', is_active=True)
    
variation_category_choice = {
    #Fundas y accesorios
    ('modelo', 'modelo'),
    #Equipo de celulares
    ('color', 'color'),
    ('capacidad', 'capacidad')
}

class Variation(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    variation_category = models.CharField(max_length=100, choices=variation_category_choice)
