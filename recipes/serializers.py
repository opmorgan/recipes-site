from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Ingredient, Section, Recipe

# class UserSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = User
#         fields = ['url', 'username', 'email', 'groups']
#
# class GroupSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Group
#         fields = ['url', 'name']

class IngredientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['name']

class SectionSerializer(serializers.HyperlinkedModelSerializer):
    ingredients = IngredientSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Section
        fields = ['name, ingredients']

class RecipeSerializer(serializers.HyperlinkedModelSerializer):
    sections = SectionSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = Recipe
        fields = ['title', 'created_at', 'updated_at', 'description',
                  'prep_time', 'cook_time', 'servings', 'makes',
                  'introduction', 'variations', 'author', 'title_image',
                  'directions', 'tags', 'sections']
