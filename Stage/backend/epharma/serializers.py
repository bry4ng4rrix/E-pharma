from rest_framework import serializers
from epharma.models import  Vente , Produits
from django.contrib.auth.models import User
from django.contrib.auth import authenticate


class ProduitsSerializer(serializers.ModelSerializer):
     class Meta:
          model = Produits 
          fields = '__all__'


class VenteS(serializers.ModelSerializer):
    produit_nom = serializers.CharField(source='produits.Nom', read_only=True)

    class Meta:
        model = Vente
        fields = ['id', 'produit_nom', 'quantite', 'prixtotale', 'date']


class StatisticS(serializers.Serializer):
     produit = serializers.IntegerField()
     vente = serializers.IntegerField()
     user = serializers.IntegerField



class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        # Vérifier si l'utilisateur existe avec cet email
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError({
                'email': 'Aucun utilisateur trouvé avec cet email.'
            })

        # Vérifier le mot de passe
        user = authenticate(username=user.username, password=password)
        if user is None:
            raise serializers.ValidationError({
                'password': 'Mot de passe incorrect.'
            })

        if not user.is_active:
            raise serializers.ValidationError({
                'email': 'Ce compte est désactivé.'
            })
        

        return user