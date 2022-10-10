from django.http import Http404, HttpResponse
from django.shortcuts import get_object_or_404, render
from django.views import generic
from django.utils import timezone
from django import template

from .models import Recipe, Ingredient, RecipeIngredient, Tag, Section, SectionIngredient

# register = template.Library()

class RecipeIndexView(generic.ListView):
    template_name = 'recipes/recipe/index.html'
    queryset = Recipe

    def get_context_data(self, **kwargs):
        context = super(RecipeIndexView, self).get_context_data(**kwargs)

        n_recent_recipes = 10
        latest_recipes_list = Recipe.objects.filter(
                created_at__lte=timezone.now()).order_by('-created_at')[:n_recent_recipes]
        latest_recipe =  Recipe.objects.filter(
                created_at__lte=timezone.now()).order_by('-created_at')[:1]
        all_recipes_list = Recipe.objects.all()

        # TODO: add "updated" date, like homepage has
        context["latest_recipes_list"] = latest_recipes_list
        context["latest_recipe"] = latest_recipe
        context["n_recent_recipes"] = n_recent_recipes
        context["all_recipes_list"] = all_recipes_list

        return context



class TagIndexView(generic.ListView):
    template_name = 'recipes/tag/index.html'
    queryset = Recipe, Tag

    def get_context_data(self, **kwargs):
        context = super(TagIndexView, self).get_context_data(**kwargs)

        n_recent_tags = 10
        latest_tags_list = Tag.objects.filter(
                created_at__lte=timezone.now()).order_by('-created_at')[:n_recent_tags]
        latest_tag =  Tag.objects.filter(
                created_at__lte=timezone.now()).order_by('-created_at')[:1]
        all_tags_list = Tag.objects.all()

        # TODO: add "updated" date, like homepage has
        context["latest_tags_list"] = latest_tags_list
        context["latest_tag"] = latest_tag
        context["n_recent_tags"] = n_recent_tags
        context["all_tags_list"] = all_tags_list

        return context

class RecipeDetailView(generic.DetailView):
    template_name = 'recipes/recipe/detail.html'
    model = Recipe

    def get_context_data(self, **kwargs):
        context = super(RecipeDetailView, self).get_context_data(**kwargs)

        has_title_image = self.object.title_image is not None
        has_description = self.object.description is not None
        has_intro = self.object.introduction is not None or self.object.variations is not None
        has_prep = self.object.prep_time is not None or self.object.cook_time is not None
        has_servings = self.object.servings is not None
        has_makes = self.object.makes.exists()
        has_ingredients = self.object.ingredients.exists()
        has_directions = self.object.directions is not None
        has_tags = self.object.tags is not None

        ## has_ingredients: there is at least one section with at least one ingredient.
        ## section_ingredients returns an object with length = number of ingredients (in all sections?)
        # section_ingredients = Section.objects.filter(recipe_id=self.object, sectioningredient__isnull=False)
        # has_ingredients = section_ingredients.exists()

        ## has_multiple sections: the recipe has more than one section
        # has_multiple_sections = (self.object.sections.count() > 1)
        ## For now (until I fix sections)
        has_multiple_sections = 0 # Hack

        ## Author label is full name, if available, or else user id.
        # author_fullname = self.object.author.get_full_name()
        # author_label = author_fullname if author_fullname else self.object.author
        author_label = self.object.author.get_full_name() or self.object.author

        context["has_prep"] = has_prep
        context["has_description"] = has_description
        context["has_intro"] = has_intro
        context["has_servings"] = has_servings
        context["has_makes"] = has_makes
        context["has_ingredients"] = has_ingredients
        context["has_directions"] = has_directions
        context["has_multiple_sections"] = has_multiple_sections
        context["has_tags"] = has_tags
        context["author_label"] = author_label


        ## For testing:
        context["section_count"] = self.object.sections.count()
        section_test = self.object.sections.all()
        context["section_test"] = section_test
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
