from django.urls import path

from . import views

app_name = 'recipes'
urlpatterns = [
        # /recipes/
        path('', views.IndexView.as_view(), name = 'index'),
        # /recipes/4/
        path('<int:pk>/', views.DetailView.as_view(), name='detail'),
]