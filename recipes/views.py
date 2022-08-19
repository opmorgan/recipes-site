from django.http import Http404, HttpResponse
from django.shortcuts import get_object_or_404, render
from django.views import generic
from django.utils import timezone

from .models import Recipe, Ingredient, RecipeIngredient

class IndexView(generic.ListView):
    template_name = 'recipes/index.html'
    context_object_name = 'latest_recipe_list'

    def get_queryset(self):
        """ Return ten most recent recipes """
        return Recipe.objects.filter(
                created_at__lte=timezone.now()).order_by('-created_at')[:10]
        ## Tests: should return a list
        ## should not return recipes from future
        ## should return 10 most recent recipes

class DetailView(generic.DetailView):
    template_name = 'recipes/detail.html'
    model = Recipe
