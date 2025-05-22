from django.contrib import admin
from django.urls import path , include
from epharma import views
from epharma.views import ChatbotAPIView,IMCCalculatorAPIView,RegisterView, LoginView
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

router = routers.DefaultRouter()
router.register(r'vente',views.VoireVente,'vente')
router.register(r'produits',views.VoiresProduits,'produits')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api',include(router.urls)),
    path('api/stat',views.Staview.as_view(),name='stat'),
    path('api/token/',TokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/',TokenVerifyView.as_view(),name='token_verify'),

    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),

    path("api/chat/", ChatbotAPIView.as_view(), name="chatbot"),
    path('api/imc/', IMCCalculatorAPIView.as_view(), name='imc-calculator'),

] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
