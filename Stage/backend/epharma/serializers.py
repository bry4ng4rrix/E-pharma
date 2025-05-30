from rest_framework import serializers
from epharma.models import  Vente , Produits ,User,Profile

import uuid

################
#
#
#
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer 

from django.contrib.auth import authenticate
#
#
#
###############


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    password1 = serializers.CharField(write_only=True, required=True)
    member_code = serializers.CharField(max_length=50, required=True)

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'email', 'member_code', 'password', 'password1')

    def validate(self, data):
        # Check if passwords match
        if data.get('password') != data.get('password1'):
            raise serializers.ValidationError({"password1": "Les deux mots de passe ne correspondent pas"})

        # Check for unique email
        if User.objects.filter(email=data.get('email')).exists():
            raise serializers.ValidationError({"email": "Cette adresse email est déjà utilisée"})

        # Check for unique member_code
        if Profile.objects.filter(member_code=data.get('member_code')).exists():
            raise serializers.ValidationError({"member_code": "Ce code membre est déjà utilisé"})

        return data

    def create(self, validated_data):
        # Remove password1 from validated data as it's not needed for user creation
        validated_data.pop('password1')

        # Extract profile-related fields
        profile_data = {
            'member_code': validated_data.pop('member_code'),
            'member_name': f"{validated_data['first_name']} {validated_data['last_name']}",
            'depth': '0',
            'directline': '',
            'sponsor': '',
            'grade': '',
            'gbv': '0',
            'cpbv': '0',
            'cnbv': '0',
            'pbv': '0',
            'tnbv': '0',
            'branch': '',
        }

        # Generate a unique username based on email or member_code
        username = validated_data['email'].split('@')[0] + '_' + str(uuid.uuid4())[:8]
        while User.objects.filter(username=username).exists():
            username = validated_data['email'].split('@')[0] + '_' + str(uuid.uuid4())[:8]

        # Create user with minimal required fields
        user = User.objects.create_user(
            username=username,
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            mobile=''
        )

        # Create profile
        Profile.objects.create(user=user, **profile_data)

        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')
        
        user = authenticate(email=email, password=password)
        if not user:
            try:
                User.objects.get(email=email)
                raise serializers.ValidationError({"password": "Mot de passe incorrect"})
            except User.DoesNotExist:
                raise serializers.ValidationError({"email": "Adresse email non reconnue"})
        if not user.is_active:
            raise serializers.ValidationError("Ce compte a été désactivé")
            
        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('member_code', 'member_name', 'depth', 'directline', 'sponsor', 
                  'grade', 'gbv', 'cpbv', 'cnbv', 'pbv', 'tnbv', 'branch')
        extra_kwargs = {
            'member_code': {'required': True},
            'member_name': {'required': True},
            'depth': {'required': False, 'default': '0'},
            'directline': {'required': False, 'default': ''},
            'sponsor': {'required': False, 'default': ''},
            'grade': {'required': False, 'default': ''},
            'gbv': {'required': False, 'default': '0'},
            'cpbv': {'required': False, 'default': '0'},
            'cnbv': {'required': False, 'default': '0'},
            'pbv': {'required': False, 'default': '0'},
            'tnbv': {'required': False, 'default': '0'},
            'branch': {'required': False, 'default': ''},
        }

    def validate(self, data):
        # Check for unique member_code
        if Profile.objects.filter(member_code=data.get('member_code')).exists():
            raise serializers.ValidationError({"member_code": "Ce code membre est déjà utilisé"})

        # Check for unique member_name
        if Profile.objects.filter(member_name=data.get('member_name')).exists():
            raise serializers.ValidationError({"member_name": "Ce nom de membre est déjà utilisé"})

        return data

    def create(self, validated_data):
        # The user is set from the authenticated user in the view
        user = self.context['request'].user
        if Profile.objects.filter(user=user).exists():
            raise serializers.ValidationError({"user": "Un profil existe déjà pour cet utilisateur"})
        
        return Profile.objects.create(user=user, **validated_data)
    



    ###########################

    
class ProduitsSerializer(serializers.ModelSerializer):
     class Meta:
          model = Produits 
          fields = '__all__'


class VenteS(serializers.ModelSerializer):
    produit_nom = serializers.CharField(source='Produits.Nom', read_only=True)

    class Meta:
        model = Vente
        fields = ['id', 'produit_nom', 'quantite', 'prixtotale', 'date']


class StatisticS(serializers.Serializer):
     produit = serializers.IntegerField()
     vente = serializers.IntegerField()
     user = serializers.IntegerField()
     profile = serializers.IntegerField()

class MembreSerialiser(serializers.ModelSerializer):
    model = Profile
    fields = '__all__'


