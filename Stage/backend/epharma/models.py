from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.
class User(AbstractUser):
    nom = models.CharField(max_length=50)
    email = models.EmailField( max_length=254,unique=True)
    username = models.CharField( max_length=50)
    is_superuser = models.BooleanField(default=False)
    is_client = models.BooleanField(default=False)
    is_employe = models.BooleanField(default=False)
    is_vendeur = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


class Produits(models.Model):
    Nom = models.CharField( max_length=250 ,unique = True)
    Description =  models.CharField(max_length=250 ,null=True)
    Bv = models.IntegerField()
    Dollard = models.IntegerField()
    prix_distributeur = models.IntegerField()
    Prix_en_detail = models.IntegerField()

    def __str__(self):
        return self.Nom


    

class Vente(models.Model):
    produit = models.ForeignKey(Produits, on_delete=models.CASCADE)
    quantite = models.IntegerField()
    prixtotale = models.IntegerField()
    date = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.produit.Nom
    