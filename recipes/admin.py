from django.contrib import admin

from .models import Recipe, RecipeIngredient, Ingredient
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

class RecipeIngredient_inline(admin.TabularInline):
    """ Create tabular form to manage recipe ingredient entry """
    model = RecipeIngredient
    extra = 3

class RecipeAdmin(admin.ModelAdmin):
    inlines = (RecipeIngredient_inline,)
    readonly_fields = ("created_at","updated_at")


admin.site.register(Recipe, RecipeAdmin)
admin.site.register(Ingredient)
admin.site.register(RecipeIngredient)
