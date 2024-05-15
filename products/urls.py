from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_products),
    path('all_products/', views.get_all_products),
    path('variations/', views.get_variations),
    path('get_variations_product/<int:pk>/', views.get_variations_product),
    path('search_products/', views.search_products),
    path('get/<str:slug_url>/', views.get_product),
    path('get/admin/<int:id>/', views.get_product_admin),
    path('post/', views.create_product),
    path('post/variation/', views.create_variation),
    path('edit/<int:pk>/', views.edit_product),
    path('delete/<int:pk>/', views.delete_product),
    path('get_categorie/<str:slug>/', views.get_categorie)
]
