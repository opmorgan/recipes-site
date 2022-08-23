from django.http import Http404, HttpResponse
from django.shortcuts import get_object_or_404, render
from django.views import generic
from django.utils import timezone
from django import template

from .models import Recipe, Ingredient, RecipeIngredient, Tag

# register = template.Library()

class RecipeIndexView(generic.ListView):
    template_name = 'recipes/recipe/index.html'
    context_object_name = 'latest_recipe_list'

    def get_queryset(self):
        """ Return ten most recent recipes """
        return Recipe.objects.filter(
                created_at__lte=timezone.now()).order_by('-created_at')[:10]
        ## Tests: should return a list
        ## should not return recipes from future
        ## should return 10 most recent recipes

class TagIndexView(generic.ListView):
    template_name = 'recipes/tag/index.html'
    context_object_name = 'latest_tag_list'

    def get_queryset(self):
        """ Return ten most recent tags """
        return Tag.objects.filter(
                created_at__lte=timezone.now()).order_by('-created_at')[:10]
        ## Tests: should return a list
        ## should not return tags from future
        ## should return 10 most recent tags

class RecipeDetailView(generic.DetailView):
    template_name = 'recipes/recipe/detail.html'
    model = Recipe


class TagDetailView(generic.DetailView):
    template_name = 'recipes/tag/detail.html'
    model = Tag

    def get_context_data(self, **kwargs):
        context = super(TagDetailView, self).get_context_data(**kwargs)
        # Object is accessible through self.object or self.get_object()
        recipes_list = Recipe.objects.filter(tags=(self.object))
        # Then return
        context["recipes"] = recipes_list
        return context
