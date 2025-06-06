from django.contrib import admin
from django.urls import path , include
from epharma import views
from epharma.views import ChatbotAPIView, IMCCalculatorAPIView, RegisterView, LoginView, ProfileCreateView,  ProfileListView , VoireUtilisateur
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

router = routers.DefaultRouter()
router.register('/vente',views.VoireVente,'vente')
router.register('/produits',views.VoiresProduits,'produits')
router.register('/membre',views.VoireMembre,'voire_membre')
router.register('/ajoutmembre',views.AjoutMembre,'ajoute_membre')
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api',include(router.urls)),
    path('api/stat',views.Staview.as_view(),name='stat'),
    path('api/token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/',TokenVerifyView.as_view(),name='token_verify'),

    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/create/', ProfileCreateView.as_view(), name='profile_create'),
    path('profiles/', ProfileListView.as_view(), name='profile_list'),
    path('utilisateur/', VoireUtilisateur.as_view(), name='utilisateur_list'),
    path('utilisateurs-par-grade/', views.UtilisateursParGradeView.as_view(), name='utilisateurs_par_grade'),
    path('ajouter-membre-sans-user/', views.AjouterMembreSansUserView.as_view(), name='ajouter_membre_sans_user'),

    path("api/chat/", ChatbotAPIView.as_view(), name="chatbot"),
    path('api/imc/', IMCCalculatorAPIView.as_view(), name='imc-calculator'),

] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
