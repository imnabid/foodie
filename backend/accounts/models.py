from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from .otp import otp_generator


class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('email is required')
        if not username:
            raise ValueError("username is required")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        extra_fields.setdefault('is_active',True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(username=username, email=email, password=password, **extra_fields)


class User(AbstractUser):
    email = models.EmailField(
        _('email address'),
        max_length=150,
        unique=True,
        error_messages={
            "unique": _("A user with that email already exists."),
        },
        )
    address = models.CharField(
        _('address'),
        max_length=150,
        blank=True,
        null=True
        )
    otp = models.CharField(_('otp code'), blank=True, null=True,max_length=10)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    objects = UserManager()

# otp auto save
@receiver(post_save,  sender=User)
def save_otp(sender, instance, created, **kwargs):
    if created:
        instance.otp = otp_generator()
        instance.save()




