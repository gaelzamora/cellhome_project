from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_products),
    path('search_products/', views.search_products),
    path('get/<str:slug>/', views.get_product),
    path('get/admin/<int:id>/', views.get_product_admin),
    path('post/', views.create_product),
    path('edit/<int:pk>/', views.edit_product),
    path('delete/<int:pk>/', views.delete_product),
    path('get_categorie/<str:categorie>/', views.get_categorie)
]
