# Styling
- Style recipe detail page
- Recipe detail page: remove description (make optional, only use for index)
- Recipe detail page: remove bullet symbols, or make them prettier.
- Recipe detail page: Bold ingredient name.
- Recipe detail page: try putting ingredients on the left (with no bullet symbols)
- Style home page

# Features

## Home page
- Add filtering by tag, ingredients
- Add search function
- Add weight-volume conversion
- Add tool to halve/double recipes
- Add date last updated to homepage

## Index pages
- Add count to tag index display (e.g., breakfast [2]) [@Max]
- In tag index view, sort tags by number of recipes
- Sort recipe index by tag, with headers
- Add hit counter to recipes index, display hits after recipe name (maybe)
- Use slugs for tag, recipe (maybe) urls

## Recipe detail page/Recipe modelling
- Remodel "instructions" so that each step has a number which can be linked to an image for that step
- Associate each instructions with a set of recipe ingredients (so that mousing over an instruction step can highlight the ingredients)
- Add sections to recipe ingredients (e.g., wet bowl, dry bowl)
- Combine "Introduction" and "Variations" intro one field (maybe)
- Add optional equipment/hardware section
- Add "source" for recipes from external websites, cookbooks

## Recipe collections
- Tool for user to create recipe collections
- Subfolders for collections

## Print tools
- Tool to print current recipe
- Tool to print/export recipe collection as a cookbook (structured pdf, with title page and TOC, organized by structure of collection)

## Global
- Use current time zone to display published times
- Dark mode

# Optimizations
- Set up asgi

- [done] Make it so that recipe ingredients can be edited in Admin, by editing Recipe (need many-to-many mapping of ingredients-recipes): https://docs.djangoproject.com/en/4.1/intro/tutorial07/ https://docs.djangoproject.com/en/4.1/topics/db/examples/many_to_many/
- [done] Require unique name for Ingredient
- [done] format ingredient strings (in templates, unless the dx becomes too sad)
- [done] Add default for date
- [done] Make "uploader" field fill out automatically with current username
- [done] Fix admin entry for instructions: should be able to enter multiple lines (or, use tabular entry)
- [done] Add tags (Consider using django-taggit)
- [done] On recipe details page, add hyperlinks for tags
- [done] Create home page
- [done] Home page: Display recipes, tags
- [done] Figure out how to set homepage View without adding to "DIR" in settings [okay to add to view]
- [done] Move homepage to separate app? Or, figure out how to put in recipes app. (Ask Josh what is better) More general question: where should i put (1) the homepage template/views/url, and (2) base-level static stuff. In base/, in new apps homepage/ and layout/theme? [the way I had it was right!]
- [done] Show last updated in EST
