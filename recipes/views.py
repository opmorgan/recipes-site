from django.shortcuts import render
from django.views import generic
from django.utils import timezone

from .models import Recipe, Ingredient, RecipeIngredient

class IndexView(generic.ListView):
    template_name = 'recipes/index.html'
    context_object_name = 'latest_recipe_list'

    def get_queryset(self):
        """ Return ten most recent recipes """
        return Recipe.objects.filter(
                pub_date__lte=timezone.now()).order_by('-pub_date')[:10]
        ## Tests: should return a list
        ## should not return recipes from future
        ## should return 10 most recent recipes

class DetailView(generic.DetailView):
    model = Recipe
    template_name = 'recipes/detail.html'
