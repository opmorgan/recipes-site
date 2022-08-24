from django.shortcuts import render
from django.http import HttpResponse
from django.views import generic
from django.utils import timezone

from recipes.models import Recipe

class HomeView(generic.ListView):
    template_name = 'base/home.html'
    model = Recipe

