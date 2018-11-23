from django.db import models

# Create your models here.

class Addinfo(models.Model):
    env = models.CharField(u'环境',max_length=256)
    serverip = models.CharField(u"服务器信息",max_length=256)
    application = models.CharField(u'应用名',max_length=256)
    port = models.CharField(u'端口号', max_length=256)
    deployed = models.CharField(u'部署信息', max_length=256)
    databases = models.CharField(u'数据库连接', max_length=256)
    remarks = models.CharField(u'备注信息', max_length=2560, null=True)

    def __str__(self):
        return self.env
