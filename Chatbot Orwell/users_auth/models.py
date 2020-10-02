from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin)
from django.utils import timezone
from django.utils.translation import pgettext_lazy
from django.contrib.auth.hashers import make_password
from uuid import uuid4

class UserManager(BaseUserManager):

    def create_user(
        self, email, password=None, is_staff=False, is_active=True, **extra_fields
    ):
        email = UserManager.normalize_email(email)
        extra_fields.pop("username", None)

        user = self.model(
            email=email, is_active=is_active, is_staff=is_staff, **extra_fields
        )
        if password:
            user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        return self.create_user(
            email, password, is_staff=True, is_superuser=True, **extra_fields
        )

    def staff(self):
        return self.get_queryset().filter(is_staff=True)

def get_token():
    return str(uuid4())

class User(PermissionsMixin, AbstractBaseUser):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=256)
    last_name = models.CharField(max_length=256)    
    """Permisos"""
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    token = models.UUIDField(default=get_token, editable=False, unique=True)
    date_joined = models.DateTimeField(default=timezone.now, editable=False)
    USERNAME_FIELD = 'email'
    objects = UserManager()
    
    class Meta:
        ordering = ['id']
        permissions = (
            (
                'manage_staff', pgettext_lazy(
                    'Permission description', 'Manage staff.')),
            )
        

