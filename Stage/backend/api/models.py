from django.db import models

# Create your models here.


class Produit(models.Model):
    Nom = models.CharField(max_length=50,unique=True ,null=False)
    Descri = models.CharField(max_length=250)
    Date_depots = models.DateField(auto_now=False, auto_now_add=False)
    Date_expi = models.DateField(auto_now=False, auto_now_add=False)
    Nombre = models.IntegerField()
    Prix = models.IntegerField()

    def __str__(self):
        return self.Nom
    

class Vente(models.Model):
    produit = models.ForeignKey(Produit, on_delete=models.CASCADE)
    quantite = models.IntegerField()
    prixtotale = models.IntegerField()
    date = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.produit.Nom
    
class Produits(models.Model):
    Nom = models.CharField( max_length=250 ,unique = True)
    Description =  models.CharField(max_length=250 ,null=True)
    Bv = models.IntegerField()
    Dollard = models.IntegerField()
    prix_distributeur = models.IntegerField()
    Prix_en_detail = models.IntegerField()

    def __str__(self):
        return self.Nom
    
    

   


    


