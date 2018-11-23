from django.db import models

# Create your models here.

class Addweb(models.Model):
    name = models.CharField(u'名称',max_length=50)
    description = models.CharField(u"描述",max_length=50)
    url = models.CharField(u'网址',max_length=128)

    def __str__(self):
        return self.name