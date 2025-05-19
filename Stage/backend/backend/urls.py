from django.contrib import admin
from django.urls import path , include
from api import views
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings

router = routers.DefaultRouter()
router.register(r'/produit',views.VoireProduit,'produit')
router.register(r'/vente',views.VoireVente,'vente')
router.register(r'/produits',views.VoiresProduits,'produits')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api',include(router.urls)),
    path('api/stat',views.Staview.as_view(),name='stat'),
] + static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)
