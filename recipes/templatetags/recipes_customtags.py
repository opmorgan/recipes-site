from django import template

register = template.Library()

# https://stackoverflow.com/questions/12238939/sorting-objects-in-template
@register.filter
def sort_by(queryset, order):
    return queryset.order_by(order)
