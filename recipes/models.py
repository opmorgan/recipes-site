import datetime

from django.db import models
from django.contrib import admin
from django.conf import settings
from django.contrib.auth import get_user_model


class Ingredient(models.Model):
    """
    Each ingredient can map to many recipes.
    Each recipe can map to many ingredients.
    """
    ## Each ingredient must have a unique name
    name = models.CharField(max_length=400, default="", unique=True)
    def __str__(self):
        return self.name

class Recipe(models.Model):
    title = models.CharField(max_length=400, default="")
    created_at = models.DateTimeField('Date created', auto_now_add=True)
    updated_at = models.DateTimeField('Last updated', auto_now=True)
    description = models.CharField('Description (1 sentence)', max_length=3000, default="")
    prep_time = models.CharField('Prep time', max_length=3000, default=None, blank=True, null=True)
    cook_time = models.CharField('Cook time', max_length=3000, default=None, blank=True, null=True)
    servings = models.FloatField('Servings', max_length=3000, default=None, blank=True, null=True)
    introduction = models.CharField("Introduction", max_length = 20000, default=None, blank=True, null=True)
    variations = models.CharField('Variations', max_length = 20000, default=None, blank=True, null=True)
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    title_image = models.ImageField(default=None, blank=True, null=True)
    instructions = models.TextField(max_length = 20000, default="1. Churn the butter.")
    ingredients = models.ManyToManyField(Ingredient, through='RecipeIngredient')

    def print_created_at(self):
        return self.created_at.strftime('%B %d, %Y')

    @property
    def print_updated_at(self):
        return self.updated_at.strftime('%B %d, %Y, %-H:%M %p')

    def __str__(self):
        return self.title

class RecipeIngredient(models.Model):
    """ An ingredient, with an amount, used in one recipe """
    recipe_id = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient_id = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    amount = models.FloatField()
    unit = models.CharField(max_length = 50, null=True, blank=True)
    description = models.CharField(max_length = 400, default=None, null=True, blank=True) # e.g., "freshly squeezed"

# class Tags(models.Model):

