from django.contrib import admin
from django.urls import path , include
from epharma import views
from epharma.views import(
     ChatbotAPIView, IMCCalculatorAPIView, RegisterView, LoginView, 
        ProfileCreateView,  ProfileListView ,EmployerListView,
        EmployerSuprimeView,ProfileUpdateByMemberCodeEmailView,
        profilUpdate,Userprofile,LogoutView,FactureViews,
        MessageDetailView,SendMessage,MessageDetailView,
        DownlineView,UtilisateurParIdProfile,UserListAuth,Usersans,
        RequestRendezvousView
        )
from django.conf.urls.static import static
from rest_framework import routers
from django.conf import settings
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

router = routers.DefaultRouter()
router.register('/vente',views.VoireVente,'vente')
router.register('/produits',views.VoiresProduits,'produits')
router.register('/ajoutmembre',views.AjoutMembre,'ajoute_membre')
router.register('/rendevous',views.RendevousView,'rendevous')
router.register('/user',views.UserListView,'utilisateur')
router.register('/facture',views.FactureViews,'facture')
router.register('/userc',views.UserListAuth,'utilisateurconfirmed')
router.register('/users',views.Usersans,'utilisateursimple')
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
    path('profiles/update/', profilUpdate.as_view(), name='profile_update'),
    path('downline/', DownlineView.as_view(), name='downline'),
    path('utilisateur/<int:id>/', UtilisateurParIdProfile.as_view(), name='utilisateur_par_profil_id'),
    path('profiles/user/',Userprofile.as_view(),name='profile_user'),
    
    path('rendezvous/', RequestRendezvousView.as_view(), name='request-rendezvous'),
    
    path('profiles/<int:pk>', ProfileListView.as_view(), name='profile_list'),
    path('employer/', EmployerListView.as_view(), name='employer_list'),
    path('employer/supr/',EmployerSuprimeView.as_view(),name='employer_supre'),
    path('utilisateurs-par-grade/', views.UtilisateursParGradeView.as_view(), name='utilisateurs_par_grade'),
    path('ajouter-membre-sans-user/', views.AjouterMembreSansUserView.as_view(), name='ajouter_membre_sans_user'),

    path('get-messages/<expediteur_id>/<destinataire_id>/', MessageDetailView.as_view(), name='get_message'),
    path('send-message/', SendMessage.as_view(), name='SendMessage'),
    path('messages/<str:id_message>/', MessageDetailView.as_view(), name='message_detail'),

    path("api/chat/", ChatbotAPIView.as_view(), name="chatbot"),
    path('api/imc/', IMCCalculatorAPIView.as_view(), name='imc-calculator'),
    path('logout', LogoutView.as_view(), name='logout'),

    path('mesvente/', views.FactureParUserView.as_view(), name='factures_par_user'),

] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
