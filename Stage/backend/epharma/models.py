from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.utils import timezone
from django.db.models.signals import post_save

class UserManager(BaseUserManager):
    def _create_user(self,username,email,password,is_active,is_staff,is_superuser,**extra_fields):
        now = timezone.now()
        if not username:
            raise ValueError('Username Vide')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email,is_active=is_active,is_staff=is_staff,is_superuser=is_superuser,date_joined=now,**extra_fields)
        user.set_password(password)
        user.save(using= self._db)
        return user

    def create_user(self,username,email,password, **extra_fields):
        return self._create_user(username, email, password,is_active=True,is_staff=False,is_superuser=False,**extra_fields)
    def create_superuser(self,username,email,password,**extra_fields):
        user = self._create_user(username,email,password,is_active=True,is_staff=True,is_superuser=True,**extra_fields)
        user.save(using=self.db)
        return user

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=50 ,unique=True)
    email = models.EmailField(max_length=50 ,unique=True)
    first_name = models.CharField(max_length=50 ,unique=False)
    last_name = models.CharField(max_length=50 ,unique=False)
    image = models.ImageField(default="default.jpg",upload_to="uploads/")
    mobile = models.CharField(max_length=50)
    poste = models.CharField(max_length=50 ,null=True ,default='')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now())  
    def __str__(self):
        return self.email
    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username','first_name','last_name']



class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,null=True,blank=True) 
    member_code = models.IntegerField(unique=True)
    member_name = models.CharField(max_length=250,unique=True)
    depth = models.IntegerField()
    directline = models.IntegerField()
    sponsor = models.IntegerField()
    registration_date = models.DateTimeField(auto_now_add=True)
    grade =  models.IntegerField()
    gbv = models.IntegerField()
    cpbv = models.IntegerField()
    cnbv = models.IntegerField()
    pbv = models.IntegerField()
    tnbv = models.IntegerField()
    branch = models.CharField(max_length=50)

    
    def __str__(self):
        return self.member_name
    


class Rendevous(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True,blank=True) 
    date = models.DateField(auto_now_add=True)
    message = models.CharField(max_length=50)

    def __str__(self):
        return self.message




class Produits(models.Model):
    Nom = models.CharField( max_length=250 ,unique = True)
    Description =  models.CharField(max_length=250 ,null=True)
    Bv = models.IntegerField()
    Dollard = models.IntegerField()
    Prix_distributeur = models.IntegerField()
    Prix_en_detail = models.IntegerField()
    Nombre = models.IntegerField(default=0)

    def __str__(self):
        return self.Nom


    

class Vente(models.Model):
    vendeur = models.ForeignKey(Profile,on_delete=models.CASCADE)
    produit = models.CharField(max_length=50 ,default=0)
    quantite = models.IntegerField()
    prixtotale = models.IntegerField()
    date = models.DateField(auto_now_add=True)
    
    def __str__(self):
        return self.vendeur.member_name




class Message(models.Model):
    contenu = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_message',default='')
    expediteur = models.ForeignKey(User, on_delete=models.CASCADE, related_name='messages_envoyes')
    destinataire = models.ForeignKey(User, on_delete=models.CASCADE, related_name='messages_recus')
    date_envoi = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default = False)
    class Meta:
        ordering = ['date_envoi']
        verbose_name_plural = "Message"

    def __str__(self):
        return f"Message de {self.expediteur.username} à {self.destinataire.username}"

