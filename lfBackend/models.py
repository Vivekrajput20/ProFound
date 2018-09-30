from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    name = models.CharField(blank=True, max_length=255)
    users = models.ManyToManyField(
        to='self',
        blank=True,
    )
    phone = models.CharField(
        max_length=15,
    )


class item(models.Model):
    username = models.ForeignKey(
        to=CustomUser,
        on_delete=models.CASCADE,
    )
    name = models.CharField(
        max_length=127,
    )
    lat = models.DecimalField(
        max_digits=50,
        decimal_places=25
    )
    long = models.DecimalField(
        max_digits=50,
        decimal_places=25
    )
    date_create = models.DateTimeField(
        auto_now_add=True, 
    )
    date_create = models.DateTimeField(
        auto_now_add=True,
        blank=True, 
    )
    details = models.TextField(
        blank=True,
    )
    upload = models.ImageField(
        upload_to='uploads/',
        blank=True,

        )
    radius = models.IntegerField()
