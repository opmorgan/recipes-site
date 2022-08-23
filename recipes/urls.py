from django.urls import path

from . import views

app_name = 'recipes'
urlpatterns = [
        # /recipes/
        path('', views.RecipeIndexView.as_view(), name = 'recipe_index'),
        # /recipes/4/
        path('<int:pk>/', views.RecipeDetailView.as_view(), name='recipe_detail'),
        # /recipes/tags/
        path('tags/', views.TagIndexView.as_view(), name = 'tag_index'),
        # /recipes/tags/1
        path('tags/<int:pk>', views.TagDetailView.as_view(), name = 'tag_detail'),
]
