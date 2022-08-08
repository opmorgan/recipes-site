from django.db import models

# Create your models here.
from django.db import models
from django.contrib import admin
from django.conf import settings

class Ingredient(models.Model):
    """
    Each ingredient can map to many recipes.
    Each recipe can map to many ingredients.
    """
    name = models.CharField(max_length=400, default="egg")
    def __str__(self):
        return self.title

class Recipe(models.Model):
    title = models.CharField(max_length=400, default="Untitled")
    pub_date = models.DateTimeField('date published')
    description = models.CharField(max_length=3000, default="")
    introduction = models.CharField(max_length = 20000, default="")
    variations = models.CharField(max_length = 20000, default="")
    uploader = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title_image = models.ImageField()
    instructions = models.CharField(max_length = 20000, default="1. Churn the butter.")
    ingredients = models.ManyToManyField(Ingredient, through='RecipeIngredient')
    # TODO ingredients = models.ForeignKey(Ingredients, on_delete=models.CASCADE

    def __str__(self):
        return self.title

class RecipeIngredient(models.Model):
    recipe_id = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient_id = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    amount = models.FloatField()
    unit = models.CharField(max_length = 50, null=True)
    description = models.CharField(max_length = 400)

# class Profile(models.Model):
#
# class Tags(models.Model):
