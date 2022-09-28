from django.shortcuts import render
from django.http import HttpResponse
from django.views import generic
from django.utils import timezone

from recipes.models import Recipe, Tag


class HomeView(generic.ListView):
    template_name = 'base/home.html'
    queryset = Recipe

    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)

        n_recent_recipes = 10
        n_recent_tags = 10
        n_all_recipes = Recipe.objects.all().count()
        n_all_tags = Tag.objects.all().count()
        latest_recipes_list = Recipe.objects.filter(
                created_at__lte=timezone.now()).order_by('-created_at')[:n_recent_recipes]
        latest_tags_list = Tag.objects.filter(
                created_at__lte=timezone.now()).order_by('-created_at')[:n_recent_tags]
        latest_recipe =  Recipe.objects.filter(
                created_at__lte=timezone.now()).order_by('-created_at')[:1]


        context["latest_recipes_list"] = latest_recipes_list
        context["latest_tags_list"] = latest_tags_list
        context["latest_recipe"] = latest_recipe
        context["n_recent_recipes"] = n_recent_recipes
        context["n_recent_tags"] = n_recent_tags
        context["n_all_recipes"] = n_all_recipes
        context["n_all_tags"] = n_all_tags

        return context

