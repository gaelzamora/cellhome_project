from django.urls import path
from . import views

urlpatterns = [
    path('search/', views.search),
    path('', views.get_products),
    path('search_products/', views.search_products),
    path('get/<str:slug_url>/', views.get_product),
    path('get/admin/<int:id>/', views.get_product_admin),
    path('post/', views.create_product),
    path('post/variation/', views.create_variation),
    path('post/image/', views.create_image),
    path('edit/<int:pk>/', views.edit_product),
    path('delete/<int:pk>/', views.delete_product),
    path('delete_image/<int:pk>/', views.delete_image),
    path('delete_variant/<int:pk>/', views.delete_variant),
    path('get_categorie/<str:slug>/', views.get_categorie)
]
