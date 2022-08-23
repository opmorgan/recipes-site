from django.http import Http404, HttpResponse
from django.shortcuts import get_object_or_404, render
from django.views import generic
from django.utils import timezone
from django import template

from .models import Recipe, Ingredient, RecipeIngredient, Tag

register = template.Library()

class RecipeIndexView(generic.ListView):
    template_name = 'recipes/recipe_index.html'
    context_object_name = 'latest_recipe_list'

    def get_queryset(self):
        """ Return ten most recent recipes """
        return Recipe.objects.filter(
                created_at__lte=timezone.now()).order_by('-created_at')[:10]
        ## Tests: should return a list
        ## should not return recipes from future
        ## should return 10 most recent recipes

class TagIndexView(generic.ListView):
    template_name = 'recipes/tag_index.html'
    context_object_name = 'latest_tag_list'

    def get_queryset(self):
        """ Return ten most recent tags """
        return Tag.objects.filter(
                created_at__lte=timezone.now()).order_by('-created_at')[:10]
        ## Tests: should return a list
        ## should not return tags from future
        ## should return 10 most recent tags

class RecipeDetailView(generic.DetailView):
    template_name = 'recipes/recipe_detail.html'
    model = Recipe


class TagDetailView(generic.DetailView):
    template_name = 'recipes/tag_detail.html'
    model = Tag

    # @register.filter
    # def is_tagged(recipes, tag):
    #     return recipes.filter(tag=tag)

    # @register.filter
    # def in_category(things, category):
    #     return things.filter(category=category)

    # @register.filter
    # def lower(value):
    #     return value.lower()

