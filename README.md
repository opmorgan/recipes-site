A simple website for family recipes, made with django.

## Dependencies
- System-wide: ```docker```, ```python3```, ```django```
- Installed in project's python virtual environment: ```django```, ```psycopg2```

## To set up testing environment
1. ```sudo docker compose up``` (Run the docker container)
2. ```source env/bin/activate``` (Enter python virutal environment)
3. ```python manage.py runserver```
4. Preview site in browser at localhost:8000

## To make model changes and migrations
1. Change models (models.py)
2. Run ```python manage.py makemigrations``` to create migrations for those changes
3. Run ```python manage.py migrate``` to apply those changes to the database.
