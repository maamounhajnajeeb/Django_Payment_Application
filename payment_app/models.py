from django.db import models

from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    pass

    def __str__(self) -> str:
        return self.first_name


class Products(models.Model):
    product = models.CharField(max_length=32)
    quantity = models.SmallIntegerField()
    price = models.SmallIntegerField()
    
    def __str__(self) -> str:
        return f"{self.product}: {self.price}, our quantity: {self.quantity}"
    