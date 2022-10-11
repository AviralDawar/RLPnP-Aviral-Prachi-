from django.db import models
from django.db.models.fields import NullBooleanField
from django_mysql.models import ListCharField
import random

def generateRandom():
    return 'temp'+str(random.randint(0,20))
# Create your models here.
class uploadFile(models.Model):
    docfile = models.FileField(upload_to='datasets/')

    class Meta:
        ordering = []
    
class RLInput(models.Model):
    file_name = models.CharField(default = 'projections.csv',max_length=30,blank=True)
    alias = models.CharField(default=generateRandom,max_length=30)
    states = models.CharField(max_length=20,blank=False)
    #ListCharField(base_field = models.CharField(default='S',max_length=20),size = 30,max_length = (30 * 21))
    attributes = ListCharField(
		base_field = models.CharField(max_length=15),
		size = 6,
		max_length = (6 * 16), null = True
		)
    bucket_size = models.IntegerField(default=200,blank=True)
    episodes = models.IntegerField(default=100,blank=True)
    epochs = models.IntegerField(default = 10, blank=True)
    total_available = models.IntegerField(default=1000,blank=True)
    
    class Meta:
        ordering = []
