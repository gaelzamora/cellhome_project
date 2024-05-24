from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Product, Variation, Image
from .serializers import ProductSerializer, VariantSerializer, ImageSerializer
from django.utils.text import slugify

@api_view(['GET'])
def search_products(request):
    query = request.query_params.get('query')
    if query is None:
        query = ''
    product = Product.objects.filter(name__icontains=query)
    serializer = ProductSerializer(product, many=True)
    return Response({'products': serializer.data})

@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def get_all_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_product(request, slug_url):
    products = Product.objects.get(slug_url=slug_url)
    serializer = ProductSerializer(products, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def get_product_admin(request, id):
    product = Product.objects.get(id=id)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def create_product(request):
    if request.user.is_staff:
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            category = serializer.validated_data['category']
            s='buy-'+category
            slug = slugify(s)

            name = serializer.validated_data['name']
            slug_url = slugify(name)

            if serializer.Meta.model.objects.filter(slug_url=slug_url).exists():
                return Response(serializer.data, status.HTTP_400_BAD_REQUEST)

            if serializer.Meta.model.objects.filter(slug=slug).exists():
                return Response(serializer.data, status.HTTP_400_BAD_REQUEST)
        
            serializer.save(user=request.user, slug=slug, slug_url=slug_url)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(serializer.data, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def create_variation(request):
    if request.user.is_staff:
        serializer = VariantSerializer(data=request.data)
        if serializer.is_valid():
            pk = serializer.validated_data['id_product']
            
            name = serializer.validated_data['name']

            if serializer.Meta.model.objects.filter(name=name).exists():
                return Response(serializer.data, status.HTTP_400_BAD_REQUEST)

            serializer.save(user=request.user, id_product=pk, name=name)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(serializer.data, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['POST'])
def create_image(request):
    if request.user.is_staff:
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            pk = serializer.validated_data['id_product']

            serializer.save(user=request.user, id_product=pk)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(serializer.data, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['PUT'])
def edit_product(request, pk):
    product = Product.objects.get(pk=pk)
    if request.user.is_staff:
        serializer = ProductSerializer(product,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response(serializer.data, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['DELETE'])
def delete_product(request, pk):
    product = Product.objects.get(pk=pk)
    if request.user.is_staff:
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['DELETE'])
def delete_image(request, pk):
    image = Image.objects.get(pk=pk)
    if request.user.is_staff:
        image.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['DELETE'])
def delete_variant(request, pk):
    variant = Variation.objects.get(pk=pk)
    if request.user.is_staff:
        variant.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def get_categorie(request, slug):
    products = Product.objects.filter(slug=slug)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)