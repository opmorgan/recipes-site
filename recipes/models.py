import datetime

from django.db import models
from django.contrib import admin
from django.conf import settings
from django.contrib.auth import get_user_model


class TagField(models.CharField):
    """ Field for tags -- forces all-lowercase """
    def __init__(self, *args, **kwargs):
        super(TagField, self).__init__(*args, **kwargs)

    # def to_python(self, value):
    #     return str(value).lower()
    def __str__(self):
        return self.name


class Tag(models.Model):
    name = TagField(max_length=35, unique=True)
    created_at = models.DateTimeField('Date created', auto_now_add=True)

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    """
    Each ingredient can map to many recipes.
    Each recipe can map to many ingredients.
    """
    ## Each ingredient must have a unique name
    name = models.CharField(max_length=400, default="", unique=True)
    def __str__(self):
        return self.name

class ServingUnit(models.Model):
    """
    E.g., "cookie" or "stock" (makes 5 cups stock)
    Each serving unit can map to many recipes.
    Each recipe can map to many serving units.
    """
    ## Each ingredient must have a unique name
    name = models.CharField(max_length=400, default="", unique=True)
    def __str__(self):
        return self.name


class Recipe(models.Model):
    title = models.CharField(max_length=400, default="")
    created_at = models.DateTimeField('Date created', auto_now_add=True)
    updated_at = models.DateTimeField('Last updated', auto_now=True)
    description = models.CharField('Description (1 sentence)', max_length=3000, default=None, blank=True, null=True)
    prep_time = models.CharField('Prep time', max_length=3000, default=None, blank=True, null=True)
    cook_time = models.CharField('Cook time', max_length=3000, default=None, blank=True, null=True)
    servings = models.FloatField('Servings', max_length=3000, default=None, blank=True, null=True)
    makes = models.ManyToManyField(ServingUnit, through='RecipeServingUnit')
    introduction = models.CharField("Introduction", max_length = 20000, default=None, blank=True, null=True)
    variations = models.CharField('Variations', max_length = 20000, default=None, blank=True, null=True)
    author = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    title_image = models.ImageField(default=None, blank=True, null=True, upload_to="title_images")
    instructions = models.TextField("Directions", max_length = 20000, default="1. Churn the butter.")
    ingredients = models.ManyToManyField(Ingredient, through='RecipeIngredient')
    tags = models.ManyToManyField(Tag, blank=True)

    @property
    def has_intro(self):
        return (self.introduction or self.variations)

    @property
    def has_prep(self):
        return (self.prep_time or self.cook_time)

    @property
    def print_updated_at(self):
        return self.updated_at.strftime('%B %d, %Y, %-H:%M %p')

    def print_created_at(self):
        return self.created_at.strftime('%B %d, %Y')

    def __str__(self):
        return self.title


class RecipeIngredient(models.Model):
    """ An ingredient, with an amount, used in one recipe """
    recipe_id = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    ingredient_id = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    amount = models.FloatField(default=None, null=True, blank=True)
    unit = models.CharField(max_length = 50, null=True, blank=True)
    description = models.CharField(max_length = 400, default=None, null=True, blank=True) # e.g., "freshly squeezed"

class RecipeServingUnit(models.Model):
    """ A serving unit, with an amount, used in one recipe """
    recipe_id = models.ForeignKey(Recipe, on_delete=models.CASCADE)
    servingunit_id = models.ForeignKey(ServingUnit, on_delete=models.CASCADE)
    amount = models.FloatField(default=None, null=True, blank=True)
    unit = models.CharField(max_length = 50, null=True, blank=True)



