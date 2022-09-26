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

        context["latest_recipe_list"] = Recipe.objects.filter(
                created_at__lte=timezone.now()).order_by('-created_at')[:10]
        context["latest_tag_list"] = Tag.objects.filter(
                created_at__lte=timezone.now()).order_by('-created_at')[:10]
        context["latest_recipe"] = Recipe.objects.filter(
                created_at__lte=timezone.now()).order_by('-created_at')[:1]

        return context

