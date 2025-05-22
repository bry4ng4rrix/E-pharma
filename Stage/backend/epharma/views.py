from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Vente,Produits
from django.contrib.auth import get_user_model
from .serializers import StatisticS,VenteS,ProduitsSerializer


from rest_framework import status
from .serializers import RegisterSerializer, LoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User


import google.generativeai as genai

from django.conf import settings

# gemini config

genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash')

# gemini view
MEDICAL_KEYWORDS = [
    "maladie", "fièvre", "symptômes", "grippe", "toux", "douleur", 
    "ordonnance", "médicament", "infection", "diabète", "tension", "asthme",
    "rhume", "santé", "mal", "migraine", "consultation"
]

class ChatbotAPIView(APIView):
    def post(self, request):
        user_message = request.data.get("message", "").lower()

        if not user_message:
            return Response({"error": "Message requis."}, status=400)

class IMCCalculatorAPIView(APIView):
    def post(self, request):
        try:
            # Récupérer les données du formulaire
            taille = float(request.data.get('taille', 0))  # en centimètres
            poids = float(request.data.get('poids', 0))    # en kilogrammes
            age = int(request.data.get('age', 0))

            if taille <= 0 or poids <= 0 or age <= 0:
                return Response({"error": "Veuillez fournir des valeurs valides pour la taille, le poids et l'âge."}, status=400)

            # Convertir la taille en mètres
            taille_m = taille / 100

            # Calculer l'IMC
            imc = poids / (taille_m ** 2)

            # Catégoriser l'IMC
            if imc < 18.5:
                categorie = "Maigreur"
            elif 18.5 <= imc < 25:
                categorie = "Poids normal"
            elif 25 <= imc < 30:
                categorie = "Surpoids"
            else:
                categorie = "Obésité"

            # Préparer le contexte pour Gemini avec une demande plus précise
            context = f"""Je suis un visiteur qui souhaite des conseils sur ma santé. Voici mes informations :
            Âge: {age} ans
            Taille: {taille} cm
            Poids: {poids} kg
            IMC: {imc:.2f}
            Catégorie: {categorie}

            Veuillez me donner des conseils nutritionnels et médicaux clairs et concis pour mon cas. 
            Format : 
            1. Alimentation (3-4 points essentiels)
            2. Activité physique (2 points)
            3. Précautions médicales (2 points)
            4. Someille (1 point)
            Utilisez un format à points pour une meilleure lisibilité.
            Évitez les longues phrases et restez concis.
            Les conseils doivent être simples et compréhensibles pour un utilisateur lambda."""

            # Obtenir les conseils de Gemini
            response = model.generate_content(context)
            conseils = response.text

            # Nettoyer et structurer les conseils
            conseils = conseils.split('\n')
            conseils = [c.strip() for c in conseils if c.strip()]
            conseils = '\n'.join(conseils[:10])  # Limiter à 10 lignes maximum

            return Response({
                'imc': round(imc, 2),
                'categorie': categorie,
                'conseils': conseils
            })

        except Exception as e:
            return Response({"error": str(e)}, status=400)

        # Vérifie si le message est médical
        if not any(word in user_message for word in MEDICAL_KEYWORDS):
            return Response({
                "response": "Je suis un assistant médical. Posez-moi des questions liées à la santé uniquement."
            })

        # Sinon, envoie la question à Gemini
        try:
            response = model.generate_content(user_message)
            return Response({"response": response.text})
        except Exception as e:
            return Response({"error": str(e)}, status=500)
# Create your views here.*




class VoireVente(viewsets.ModelViewSet):
    serializer_class = VenteS
    queryset = Vente.objects.all()

class Staview(APIView):
    def get(self,request):
        User = get_user_model()
        data = {
                "produit": Produits.objects.count(),
                "vente" : Vente.objects.count(),
                "user" : User.objects.count()
                }
        serializer = StatisticS(data)
        return Response(serializer.data)
    

class VoiresProduits(viewsets.ModelViewSet):
    serializer_class = ProduitsSerializer
    queryset = Produits.objects.all()
    





class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)