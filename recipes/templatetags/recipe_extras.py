from django import template

register = template.Library()

def mycut(value, arg):
    """Removes all values of arg from the given string"""
    return value.replace(arg, '')

register.filter('mycut', mycut)

def in_category(things, category):
    return things.filter(category=category)

register.filter('in_category', in_category)
