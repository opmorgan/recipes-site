from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'recipes', views.RecipeViewSet)

app_name = 'api'
urlpatterns = [
        # /recipes/
        path('', include(router.urls)),
        #path('', views.RecipeIndexView.as_view(), name = 'recipe_index'),
        # /recipes/4/
        #path('<int:pk>/', views.RecipeDetailView.as_view(), name='recipe_detail'),
        # /recipes/tags/
        #path('tags/', views.TagIndexView.as_view(), name = 'tag_index'),
        # /recipes/tags/1
        #path('tags/<int:pk>', views.TagDetailView.as_view(), name = 'tag_detail'),
]
