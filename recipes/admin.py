from django.contrib import admin
from django.contrib.auth import get_user_model

import nested_admin

from .models import Recipe, Ingredient, Tag, ServingUnit, RecipeServingUnit, Section, SectionIngredient

@admin.register(Ingredient)
class IngredientAdmin(nested_admin.NestedModelAdmin):
    search_fields = ['name']
    ordering = ['name']

class RecipeServingUnit_inline(nested_admin.NestedTabularInline):
    """ Create tabular form to manage recipe ingredient entry """
    model = RecipeServingUnit
    verbose_name_plural = "Makes (alternative to 'Servings')"
    extra = 1
    max_num = 1
    insert_after = "servings"
    autocomplete_fields = ['servingunit_id']

@admin.register(ServingUnit)
class ServingUnitAdmin(nested_admin.NestedModelAdmin):
    verbose_name = "test"
    search_fields = ['name']
    ordering = ['name']


class SectionIngredient_inline(nested_admin.NestedTabularInline):
    """ For nested-admin, needs to be defined above "Section_inline """
    """ Create tabular form to manage section ingredient entry """
    verbose_name_plural = "Ingredients"
    model = SectionIngredient
    min_num = 1
    extra = 0
    # autocomplete_fields = ['ingredient_id']
    sortable_field_name = "order"

class Section_inline(nested_admin.NestedTabularInline):
    verbose_name_plural = "Ingredient Sections (e.g., 'Bowl one')"
    model = Section
    min_num = 1
    extra = 0
    inlines = [SectionIngredient_inline]
    sortable_field_name = "order"
    insert_after = "directions"

class RecipeAdmin(nested_admin.NestedModelAdmin):
    inlines = (RecipeServingUnit_inline, Section_inline)
    readonly_fields = ("created_at","updated_at")

    fields = ("title", "description", "prep_time", "cook_time", "servings",
              "introduction", "variations", "title_image", "directions",
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
admin.site.register(Tag)

admin.site.register(Section)
admin.site.register(SectionIngredient)
