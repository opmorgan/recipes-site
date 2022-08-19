from django.contrib import admin
from django.contrib.auth import get_user_model

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

    ## Autofill "author" with current username
    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "author":
            kwargs["queryset"] = get_user_model().objects.filter(
                username=request.user.username
            )
        return super(RecipeAdmin, self).formfield_for_foreignkey(
            db_field, request, **kwargs
        )

    def get_readonly_fields(self, request, obj=None):
        if obj is not None:
            return self.readonly_fields + ("author",)
        return self.readonly_fields

    def add_view(self, request, form_url="", extra_context=None):
        data = request.GET.copy()
        data["author"] = request.user
        request.GET = data
        return super(RecipeAdmin, self).add_view(
            request, form_url="", extra_context=extra_context
        )



admin.site.register(Recipe, RecipeAdmin)
admin.site.register(Ingredient)
admin.site.register(RecipeIngredient)
