from django.contrib import admin
from django.contrib.auth import get_user_model

from .models import Recipe, RecipeIngredient, Ingredient, Tag, ServingUnit, RecipeServingUnit


class RecipeIngredient_inline(admin.TabularInline):
    """ Create tabular form to manage recipe ingredient entry """
    model = RecipeIngredient
    extra = 3
    insert_after = "instructions"
    autocomplete_fields = ['ingredient_id']

@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    search_fields = ['name']
    ordering = ['name']

class RecipeServingUnit_inline(admin.TabularInline):
    """ Create tabular form to manage recipe ingredient entry """
    model = RecipeServingUnit
    verbose_name = "Makes (alternative to 'Servings')"
    extra = 1
    max_num = 1
    insert_after = "servings"
    autocomplete_fields = ['servingunit_id']

@admin.register(ServingUnit)
class ServingUnitAdmin(admin.ModelAdmin):
    search_fields = ['name']
    ordering = ['name']

class RecipeAdmin(admin.ModelAdmin):
    inlines = (RecipeIngredient_inline, RecipeServingUnit_inline)
    readonly_fields = ("created_at","updated_at")

    fields = ("title", "description", "prep_time", "cook_time", "servings",
            "introduction", "variations", "title_image", "instructions",
            "tags", "created_at", "updated_at", "author")

    ## Point to template to control order of fields, including inlines
    change_form_template = 'admin/custom/change_form.html'

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

    class Media:
        css = {
                'all': (
                    'admin/css/admin.css',
                    )
                }


admin.site.register(Recipe, RecipeAdmin)
admin.site.register(RecipeIngredient)
admin.site.register(Tag)
