from django.db import models

# Create your models here.

class User(models.Model):
    name = models.CharField(max_length=128,unique=True)
    passwd = models.CharField(max_length=256)

    def __str__(self):
        return self.name
# Create your models here.
