from django.contrib import admin
from .models import Produits,Vente,User,Profile,Rendevous,Message












admin.site.register(User)
admin.site.register(Profile)
admin.site.register(Produits)
admin.site.register(Vente)
admin.site.register(Rendevous)
admin.site.register(Message)
