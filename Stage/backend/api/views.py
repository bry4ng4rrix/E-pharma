from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Produit,Vente,Produits
from django.contrib.auth import get_user_model
from .serializers import ProduitSerializer,StatisticS,VenteS,ProduitsSerializer

# Create your views here.*

class VoireProduit(viewsets.ModelViewSet):
    serializer_class = ProduitSerializer
    queryset = Produit.objects.all()


class VoireVente(viewsets.ModelViewSet):
    serializer_class = VenteS
    queryset = Vente.objects.all()

class Staview(APIView):
    def get(self,request):
        User = get_user_model()
        data = {
                "produit": Produit.objects.count(),
                "produit": Produits.objects.count(),
                "vente" : Vente.objects.count(),
                "user" : User.objects.count()
                }
        serializer = StatisticS(data)
        return Response(serializer.data)
    

class VoiresProduits(viewsets.ModelViewSet):
    serializer_class = ProduitsSerializer
    queryset = Produits.objects.all()
    
