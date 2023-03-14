A simple website for family recipes, made with django.

## Dependencies
- System-wide: ```docker```, ```docker-compose```, ```python3```, ```django```
- Python: See requirements.txt

## To set up development environment
1. Create file ```.env```, hidden from version control, which sets the variables ```POSTGRES_USER```, ```POSTGRES_PASSWORD```, ```POSTGRESS_DB```, and ```SECRET_KEY```
1. ```sudo docker-compose up``` (Run the docker container)
1. ```python -m venv env``` (Create python virtual environment)
1. ```source env/bin/activate``` (Enter python virtual environment)
1. ```pip install -r requirements.txt``` (Install required python packages)
1. ```python manage.py migrate``` (Make initial migrations)
1. ```python manage.py createsuperuser``` (Create an admin user)
1. ```python manage.py runserver --settings base.settings.dev``` (Start the development server)
1. From the "frontend" directory, ```npm run dev``` (Run the vite development server for reactive elements)
1. Preview site in browser at localhost:8000

## To make model changes and migrations
1. Change models (models.py)
1. Run ```python manage.py makemigrations``` to create migrations for those changes
1. Run ```python manage.py migrate``` to apply those changes to the database.

## To deploy changes to production
1. In a development environment, push changes to the dev branch.
1. To push frontend changes from a development environment, run ```npm run build`` and then push the automatically generated changes to dev.
1. Pull changes from the dev branch on the production server.
1. Enter python virtual environment: ```source env/bin/activate```.
1. Run the production server: ```python3 manage.py runserver --settings base.settings.production```.
1. Collect static files (so that nginx will manage them): ```python3 manage.py collectstatic --settings base.settings.production```.
1. If models have changed, make migrations (see "To make model changes and migrations").
1. If everything looks good, checkout the main branch on the production server and ```git merge dev```.
