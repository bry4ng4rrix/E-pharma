from rest_framework import serializers
from .models import Produit, Vente , Produits

class ProduitSerializer(serializers.ModelSerializer):
     class Meta:
          model = Produit
          fields = '__all__'
class ProduitsSerializer(serializers.ModelSerializer):
     class Meta:
          model = Produits 
          fields = '__all__'


class VenteS(serializers.ModelSerializer):
    produit_nom = serializers.CharField(source='produit.Nom', read_only=True)

    class Meta:
        model = Vente
        fields = ['id', 'produit_nom', 'quantite', 'prixtotale', 'date']


class StatisticS(serializers.Serializer):
     produit = serializers.IntegerField()
     vente = serializers.IntegerField()
     user = serializers.IntegerField

