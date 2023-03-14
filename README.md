A simple website for family recipes, made with django.

## Dependencies
- System-wide: ```docker```, ```docker-compose```, ```python3```, ```django```
- Python: See requirements.txt

## To set up development environment
1. Create file ```.env```, hidden from version control, which sets the variables ```POSTGRES_USER```, ```POSTGRES_PASSWORD```, ```POSTGRESS_DB```, and ```SECRET_KEY```
1. Run the docker container: ```sudo docker-compose up```.
1. Create python virtual environment: ```python -m venv env```
1. Enter python virtual environment: ```source env/bin/activate```
1. Install required python packages: ```pip install -r requirements.txt```
1. Make initial migrations: ```python manage.py migrate```
1. Create an admin user for the local database: ```python manage.py createsuperuser```
1. Start the development server: ```python manage.py runserver --settings base.settings.dev```
1. Run the vite development server for js componenents: From the "frontend" directory, ```npm run dev```
1. Preview site in browser at localhost:8000

## To make model changes and migrations
1. Change models (models.py)
1. Run ```python manage.py makemigrations``` to create migrations for those changes
1. Run ```python manage.py migrate``` to apply those changes to the database.

## To deploy changes to production
1. In a development environment, push changes to the dev branch. To push frontend changes, run ```npm run build``` and then push the automatically generated changes.
1. On the production server, check out the dev branch (``git checkout dev```) and pull the latest changes (```git pull```).
1. Enter python virtual environment: ```source env/bin/activate``
1. Run the production server: ```python3 manage.py runserver --settings base.settings.production```
1. Collect static files (so that nginx will manage them): ```python3 manage.py collectstatic --settings base.settings.production```
1. If models have changed, make migrations (see "To make model changes and migrations").
1. If everything looks good, check out the main branch on the production server (```git checkout main```) and merge changes from dev (```git merge dev```).
