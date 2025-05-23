from rest_framework import viewsets
from rest_framework import filters
from .models import Produits
from .serializers import ProduitsSerializer

class ProduitsViewSet(viewsets.ModelViewSet):
    queryset = Produits.objects.all()
    serializer_class = ProduitsSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['Nom', 'Description']
