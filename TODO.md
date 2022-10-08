# CI/CD
- Set up pg database on vultr vps (with user, password)
- write yaml commands
- nginx: set up reverse proxy that will transfer requests from public url to local port

# Styling
- Style prep time
## Index pages
- [!!!] Index pages (tag index, tag detail): show recipe description
## Recipe detail page
- Recipe detail page: show description (if no intro is present?)
- Recipe detail page: Try flex box for ingredients list, so that ingredient names are aligned
- Recipe detail page: set formatting of title image flexbox when there is no intro, but there is a prep time (image should be flush with bottom of prep time)
- Make date published/updated a flex box, so that "Published..." stays on one line and "Updated..." stays on another by default. Same with prep time/cook time.
- Recipe detail page: add collapse button for introduction + variations, hide them by default
- Recipe detail page: put "servings" to the right of the ingredients box, flush right in vertical line with the headers.

# Features

## Data entry
- Create user friendly form to enter new recipes

## Home page
- Add filtering by tag, ingredients
- Add search function

## Index pages
- Add count to tag index display (e.g., breakfast [2]) [@Max]
- In tag index view, sort tags by number of recipes
- Sort recipe index by tag, with headers
- Add hit counter to recipes index, display hits after recipe name (maybe)
- Use slugs for tag urls. consider for recipes, too.

## Recipe detail page/Recipe modeling
- Add optional equipment/hardware section
- Add "source" for recipes from external websites, cookbooks
- [!!!] Add labeled sections to ingredients lists. E.g., "Sauce", "bowl 1"
- Add attribute "category" to sort recipes on homepage. Each recipe will have one primary category, for sorting. Each category will also be a tag, which should automatically populate. For example, "breakfast." (Or, just use "Tags", and sort by Tag categories on homepage?)
- Make directions optional (once data entry form has a field showing example entry text)
- Change "prep time" and "cook time" to just "time"

### Images
- In data entry form, include an "Add image tool" item
- "Add image" creates a file in a storage location, resizes it
(Before data entry form is live)
First pass
- Use django admin
Second pass
- Use django image file uploads, with custom url.
- Then, manually point to django image urls in markdown.
Third pass
- Create storage tool (Down the line, can use Cloudinary, an image processing pipeline and CDN). CDNs are SAASes, with lean servers. You can upload an image, stored in multiple servers, which can be accessed quickly. So, the user can see the image very quickly. And, if the service has a processing pipeline, you can manipulate the imagers (e.g., enforcing size).
- Then, point to image urls from storage tool in directions markdown

### Directions - use markdown
- Allow markdown input in directions
- use a django markdown interpreter in views.py/templates to render directions
- Enable markdown decorators for ingredients, images.

## Recipe collections
- Tool for user to create recipe collections (should be able to add with a button)
- Each collection should have a url for its index

## Print tools
- Tool to print current recipe
- Tool to print/export recipe collection as a cookbook (structured pdf, with title page and TOC, organized by structure of collection)

## Global
- Use current time zone to display published times
- Dark mode
- Accessibility mode (large font, simple layout)

## Other tools and features
- Recipe scraper (try hhurev/recipe-scrapers) (see ios app "recipe keeper" for inspiration)
- Buttons to mark as "have made it", "want to make" (like youtube's "already watched", "want to watch"). And, if "have made it", "liked it" and "didn't like it."
- Donations button
- Comments
- Weight-volume conversion
- Tool to halve/double recipes

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
- [done] Recipe detail page: create borders on ingredients/direction flex box object, not separators? See how this looks with tags
- [done] Recipe detail page: show author in date published, modified.
- [done] Add link to homepage on other pages (can put in footer, above date updated)
- [done] Add date last updated to homepage
- [done] Make title images render in a nice way
- [done] Add default font
- [done] Define common colors in base/style.css (background, plate, lines)
- [done] Recipes with no title do not render, because partials/recipe_image.html expects an image
- [done] Admin: entry field for ingredient name should accept typing with autosuggestions (instead of dropdown)
- [done] Recipe detail page: render "tbsp" as "Tbsp"
- [done] Pluralizations (leaf, pinch)
- [done] Rename "instructions" to "directions"
