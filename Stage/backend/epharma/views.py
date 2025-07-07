from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets , generics ,parsers
from django.db.models import Q
from .models import Vente,Produits,User,Profile,Message
from django.contrib.auth import get_user_model
from .serializers import *
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import views, status , permissions
from django.core.exceptions import ValidationError
#############
#test 
#
#
from rest_framework.decorators import api_view
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny ,IsAuthenticated

from rest_framework.generics import ListAPIView
from .serializers import FactureparUserSerializer


#
#
#############






import google.generativeai as genai

from django.conf import settings

# gemini config

genai.configure(api_key=settings.GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash')




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
        if not any(word in user_message for word in MEDICAL_KEYWORDS):
            return Response({
                "response": "Je suis un assistant médical. Posez-moi des questions liées à la santé uniquement."
            })


        prompt = f"en phrase de 7 ligne et de ne pas metre en liste  {user_message}"

        try:
            response = model.generate_content(prompt)
            return Response({"response": response.text})
        except Exception as e:
            return Response({"error": str(e)}, status=500)

##################
from rest_framework import views, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from .serializers import UserRegisterSerializer, UserLoginSerializer, ProfileSerializer

class RegisterView(views.APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'email': user.email,
                    "username": user.username,
                    "is_active": user.is_active,
                    "is_staff":user.is_staff,
                    "is_superuser":user.is_superuser,
                }
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(views.APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            
            # Déterminer la redirection en fonction du rôle
            if user.is_superuser or user.is_staff:
                redirect_url = '/admin'
            else:
                redirect_url = '/'
            
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'email': user.email,
                    "username": user.username,
                    "is_active": user.is_active,
                    "is_staff": user.is_staff,
                    "is_superuser": user.is_superuser,
                    "redirect_url": redirect_url
                }
            }, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProfileCreateView(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ProfileSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            profile = serializer.save()
            return Response({
                'member_code': profile.member_code,
                'member_name': profile.member_name,
                'depth': profile.depth,
                'directline': profile.directline,
                'sponsor': profile.sponsor,
                'grade': profile.grade,
                'gbv': profile.gbv,
                'cpbv': profile.cpbv,
                'cnbv': profile.cnbv,
                'pbv': profile.pbv,
                'tnbv': profile.tnbv,
                'branch': profile.branch,
                'registration_date': profile.registration_date,
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class profilUpdate(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """Récupère le profil de l'utilisateur connecté, ou lève une erreur si inexistant."""
        try:
            return Profile.objects.get(user=self.request.user)
        except Profile.DoesNotExist:
            raise ValidationError({"detail": "Aucun profil trouvé pour cet utilisateur."})

    def partial_update(self, request, *args, **kwargs):
        """Permet la mise à jour partielle (PATCH)."""
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class Userprofile(generics.RetrieveUpdateAPIView):
    serializer_class = UserprofileSerialiser
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """Retourne directement l'utilisateur connecté."""
        user = self.request.user
        if user is None:
            raise ValidationError({"detail": "Aucun utilisateur connecté."})
        return user

    def partial_update(self, request, *args, **kwargs):
        """Permet la mise à jour partielle (PATCH)."""
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)



################


class UserListView(viewsets.ModelViewSet):
    serializer_class = UserSerialiser
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    pagination_class = None


class UserListAuth(viewsets.ModelViewSet):
    serializer_class = UserSerialiser
    queryset = User.objects.filter(confirmed=False)

class Usersans(viewsets.ModelViewSet):
    serializer_class = UserSerialiser
    queryset = User.objects.all()


class EmployerListView(generics.ListAPIView):
    serializer_class = EmployerSerialiser
    permission_classes = [IsAuthenticated]
    queryset = User.objects.filter(is_staff=True)
    pagination_class = None



class EmployerSuprimeView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self,request,*args, **kwargs):
        serializers = EmployerSerialiser(data=request.data)

        if serializers.is_valid():
            user_id = serializers.validated_data['id']

            try :
                user = User.objects.get(pk=user_id)
                user.delete()
                return Response({"message": "Supression success"}, status=status.HTTP_200_OK)
            except User.DoesNotExist:
                return Response({"error" : "Utilisateur n'existe pas"},status=status.HTTP_404_NOT_FOUND)
        return Response(serializers.errors,status=status.HTTP400_BAD_REQUEST)





class ProfileListView(generics.ListAPIView,generics.DestroyAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    queryset = Profile.objects.all()
    pagination_class = None  # Retire la pagination pour avoir tous les résultats




class AjoutMembre(viewsets.ModelViewSet):
    serializer_class = AjoutMembreSerializer
    queryset = Profile.objects.all()
    permission_classes = [IsAuthenticated]

class VoireVente(viewsets.ModelViewSet):
    serializer_class = VenteS
    queryset = Vente.objects.all()

class Staview(APIView):
    def get(self,request):
        User = get_user_model()
        data = {
                "produit": Produits.objects.count(),
                "vente" : Vente.objects.count(),
                "user" : User.objects.filter(is_staff=True).count(),
                "profile": Profile.objects.count()
                }
        serializer = StatisticS(data)
        return Response(serializer.data)
    

class VoiresProduits(viewsets.ModelViewSet):
    serializer_class = ProduitsSerializer
    queryset = Produits.objects.all()

class FactureViews(viewsets.ModelViewSet):
    serializer_class = FactureSerializer
    queryset = Vente.objects.all()

class FactureParUserView(ListAPIView):
    serializer_class = FactureparUserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        try:
            profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            return Vente.objects.none()
        return Vente.objects.filter(vendeur=profile)


class DownlineView(ListAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        try:
            profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            return Profile.objects.none()
        
        return Profile.objects.filter(directline=profile.member_code)

class UtilisateurParIdProfile(APIView):
    def get(self ,request,id):
        try:
            profile = Profile.objects.get(id=id)
            user = profile.user
            if not user:
                return Response({"error": "Ce profil n'est lié à aucun utilisateur."}, status=404)

            serializer = UserSerialiser(user)
            return Response(serializer.data, status=200)


        except Profile.DoesNotExist:
            return Response({"error": "Profil non trouvé."}, status=404)
    def patch(self, request, id):
        try:
            profile = Profile.objects.get(id=id)
            user = profile.user
            if not user:
                return Response({"error": "Ce profil n'est lié à aucun utilisateur."}, status=404)

            serializer = UserSerialiser(user, data=request.data, partial=True)  # PATCH = mise à jour partielle
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=200)
            return Response(serializer.errors, status=400)

        except Profile.DoesNotExist:
            return Response({"error": "Profil non trouvé."}, status=404)



class MessageDetailView(generics.ListAPIView):
    """
    Vue pour récupérer les messages entre deux utilisateurs.
    """
    serializer_class = MessageSerializer

    def get_queryset(self):
        expediteur_id = self.kwargs['expediteur_id']
        destinataire_id = self.kwargs['destinataire_id']
        
        user = self.request.user
        if str(user.id) not in [expediteur_id, destinataire_id]:
            return Message.objects.none()
            
        messages = Message.objects.filter(
            (Q(expediteur_id=expediteur_id) & Q(destinataire_id=destinataire_id)) |
            (Q(expediteur_id=destinataire_id) & Q(destinataire_id=expediteur_id))
        ).order_by('date_envoi')
        
        messages.filter(destinataire=user, is_read=False).update(is_read=True)
        
        return messages


class SendMessage(generics.CreateAPIView):
    """
    Vue pour envoyer un message à un autre utilisateur.
    """
    serializer_class = MessageSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]

    def perform_create(self, serializer):
        instance = serializer.save(expediteur=self.request.user)
        destinataire = instance.destinataire
        
    

class RendevousView(viewsets.ModelViewSet):
    serializer_class = RendevousSerialiser
    queryset = Rendevous.objects.all()
    pagination_class = None
    
class UserConfirmed(viewsets.ModelViewSet):
    serializer_class = UserSerialiser
    permission_classes = [IsAuthenticated]
    queryset_classes = User.objects.filter(confirmed=False)



class RequestRendezvousView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Récupérer l'utilisateur connecté
        user = request.user

        # Préparer les données pour le rendez-vous
        data = request.data.copy()
        data['user'] = user.id  # Associer l'utilisateur connecté

        # Créer le rendez-vous
        serializer = RendevousSerialiser(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Demande de rendez-vous envoyée avec succès.",
                "rendezvous": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)







    

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
       
# Create your views here.*

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class ProfileUpdateByMemberCodeEmailView(APIView):
    """
    PATCH: Met à jour un profil en filtrant par member_code et email (dans le body)
    """
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        member_code = request.data.get('member_code')
        email = request.data.get('email')
        if not member_code or not email:
            return Response({"detail": "member_code et email sont requis."}, status=400)
        try:
            profile = Profile.objects.get(member_code=member_code)
        except Profile.DoesNotExist:
            return Response({"detail": "Aucun profil trouvé avec ce member_code."}, status=404)
        if not profile.user or profile.user.email != email:
            return Response({"detail": "L'email ne correspond pas à l'utilisateur lié à ce member_code."}, status=400)
        serializer = ProfileSerializer(profile, data=request.data, partial=True, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

from .models import Profile
from .serializers import ProfileSerializer

class AjouterMembreSansUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data.copy()
        data['user'] = None  # On laisse user à null
        serializer = ProfileSerializer(data=data)
        if serializer.is_valid():
            profile = Profile.objects.create(
                user=None,
                member_code=data.get('member_code'),
                member_name=data.get('member_name'),
                depth=data.get('depth', '0'),
                directline=data.get('directline', ''),
                sponsor=data.get('sponsor', ''),
                grade=data.get('grade', ''),
                gbv=data.get('gbv', '0'),
                cpbv=data.get('cpbv', '0'),
                cnbv=data.get('cnbv', '0'),
                pbv=data.get('pbv', '0'),
                tnbv=data.get('tnbv', '0'),
                branch=data.get('branch', ''),
            )
            return Response(ProfileSerializer(profile).data, status=201)
        return Response(serializer.errors, status=400)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Profile
from .serializers import ProfileSerializer

class UtilisateursParGradeView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        grade = request.query_params.get('grade')
        if not grade:
            return Response({"error": "Le paramètre 'grade' est requis."}, status=400)
        profils = Profile.objects.filter(grade=grade)
        serializer = ProfileSerializer(profils, many=True)
        return Response(serializer.data)


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": "Successfully logged out."}, status=status.HTTP_205_RESET_CONTENT)

