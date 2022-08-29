# Styling
## Recipe detail page
- Recipe detail page: Try flex box for ingredients list, so that ingredient names are aligned
- Recipe detail page: create borders on ingredients/direction flex box object, not separators? See how this looks with tags
- Recipe detail page: add collapse button for introduction + variations, hide them by defulat

# Features

## Data entry
- Create user friendly form to enter new recipes

## Home page
- Add filtering by tag, ingredients
- Add search function
- Add weight-volume conversion
- Add tool to halve/double recipes
- Add date last updated to homepage?
- Add link to homepage on other pages (can put in footer, above date updated)

## Index pages
- Add count to tag index display (e.g., breakfast [2]) [@Max]
- In tag index view, sort tags by number of recipes
- Sort recipe index by tag, with headers
- Add hit counter to recipes index, display hits after recipe name (maybe)
- Use slugs for tag urls. consider for recipes, too.

## Recipe detail page/Recipe modelling
- Make more fields optional -- only require title
- Remodel "instructions" so that you can enter each step by line.
- Remodel "instructions" so that each step has a number which can be linked to an image for that step
- Associate each instructions with a set of recipe ingredients (so that mousing over an instruction step can highlight the ingredients)
- Add sections to recipe ingredients (e.g., wet bowl, dry bowl)
- Combine "Introduction" and "Variations" intro one field (maybe)
- Add optional equipment/hardware section
- Add "source" for recipes from external websites, cookbooks
- Rename "instructions" to "directions"
- Add labelled sections to ingredients lists. E.g., "Sauce", "bowl 1"
- Add attribute "category" to sort recipes on homepage. Each recipe will have one primary category, for sorting. Each category will also be a tag, which should automatically populate. For example, "breakfast."
- Make directions optional.

## Recipe collections
- Tool for user to create recipe collections (should be able to add with a button)
- Each collection should have a url for its index

## Print tools
- Tool to print current recipe
- Tool to print/export recipe collection as a cookbook (structured pdf, with title page and TOC, organized by structure of collection)

## Other tools
- Recipe scraper (try hhurev/recipe-scrapers) (see ios app "recipe keeper" for inspiration)
- Buttons to mark as "have made it", "want to make" (like youtube's "already watched", "want to watch"). And, if "have made it", "liked it" and "didn't like it."
- Donations button

## Global
- Use current time zone to display published times
- Dark mode
- Accessibility mode (large font, simple layout)

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
- [done] Recipe detail page: remove description (make optional, only use for index)
- [done] Recipe detail page: remove bullet symbols, or make them prettier.
- [done] Recipe detail page: Bold ingredient name.
- [done] Recipe detail page: try putting ingredients on the left (with no bullet symbols)
- [done] Recipe detail page: Add conditional to date: only show date updated if different from date published.
- [done] Recipe detail page: Reduce paragraph space between instructions and variations.
- [done] Add hyperlink to "see all" recipes, tags.
- [done] Style lists on index pages, homepage
- [done] Make sure each optional section tests for existence before printing (e.g., introduction, variations.)
- [done] Recipe detail page: Fix defaults for flex box ratio (ingredients/directions)
