from django.contrib import admin

from .models import Recipe, RecipeIngredient
# Register your models here.

# class RecipeIngredientInline(admin.StackedInline):
#     model = RecipeIngredient
#     extra = 3
#
# class RecipeAdmin(admin.ModelAdmin):
#     fieldsets = [
#         (None,               {'fields': ['title, title_image']}),
#         ('1-sentence description', {'fields': ['description']}),
#         ('Introduction and variations', {'fields': ['introduction', 'variations']}),
#         ('Instructions', {'fields': ['instructions']}),
#         ('Date information', {'fields': ['pub_date'],
#             'classes': ['collapse']}),
#     ]
#     inlines = [RecipeIngredientInline]

admin.site.register(Recipe)
