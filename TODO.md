- Add tags
- format ingredient strings (in views.py, rather than in templates)
- Fix admin entry for instructions: should be able to enter multiple lines (or, use tabular entry)
- Add field for equipment (frying pan, food processor, etc.)

- [done] Make it so that recipe ingredients can be edited in Admin, by editing Recipe (need many-to-many mapping of ingredients-recipes): https://docs.djangoproject.com/en/4.1/intro/tutorial07/ https://docs.djangoproject.com/en/4.1/topics/db/examples/many_to_many/
- [done] Require unique name for Ingredient
