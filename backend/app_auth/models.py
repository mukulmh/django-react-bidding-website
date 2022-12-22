from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


class MyAccoutManager(BaseUserManager):
    def create_user(self, email, phone, fullname, image, password=None):
        if not email:
            raise ValueError("User must have an email.")
        if not phone:
            raise ValueError("User must have a phone no.")

        user = self.model(
            email = email,
            phone = phone,
            fullname = fullname,
            image = image,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, phone, fullname, image, password=None):
        user = self.create_user(
            email = email,
            phone = phone,
            fullname = fullname,
            password = password,
            image = image,
        )

        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True

        user.save(using=self._db)
        return user

class Account(AbstractBaseUser):
    email = models.EmailField(max_length=100, unique=True)
    phone = models.CharField(max_length=20, unique=True)
    fullname = models.CharField(max_length=255)
    date_joined = models.DateTimeField(verbose_name='date_joined',auto_now_add=True)
    last_login = models.DateTimeField(verbose_name='last_login',auto_now=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    image = models.ImageField(upload_to='user_images', null=True, default='media/user_images/user.png')


    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['phone','fullname', 'image']

    objects = MyAccoutManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin
    
    def has_module_perms(self, app_label):
        return True
