from django.db import models
from app_auth.models import Account

# Create your models here.

CATEGORY = (('Household','Household'), ('Electronics','Electronics'), ('Others','Others'))

class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(max_length=255)
    image = models.ImageField(upload_to='pics')
    biding_price = models.FloatField()
    category = models.CharField(max_length=255, choices=CATEGORY)
    created_by = models.ForeignKey(Account, on_delete=models.CASCADE)
    ends_at = models.DateTimeField(null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return self.title

class Bid(models.Model):
    amount = models.FloatField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.id