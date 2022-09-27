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

    def get_context_data(self, **kwargs):
        context = super(RecipeDetailView, self).get_context_data(**kwargs)


        has_title_image = self.object.title_image is not None
        has_intro = self.object.introduction is not None or self.object.variations is not None
        has_prep = self.object.prep_time is not None or self.object.cook_time is not None
        has_servings = self.object.servings is not None
        has_ingredients = self.object.ingredients.exists()
        has_directions = self.object.instructions is not None
        has_tags = self.object.tags is not None

        if self.object.author.get_full_name():
            author_label = self.object.author.get_full_name()
        else: author_label = self.object.author

        context["has_prep"] = has_prep
        context["has_intro"] = has_intro
        context["has_servings"] = has_servings
        context["has_ingredients"] = has_ingredients
        context["has_directions"] = has_directions
        context["has_tags"] = has_directions
        context["author_label"] = author_label
        return context

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
