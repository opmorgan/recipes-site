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
1. ```python manage.py createsuperuser``` (Create an admin user)
1. ```python manage.py runserver``` (Start the development server)
1. From the "frontend" directory, ```npm run dev``` (Run the vite server for reactive elements)
1. Preview site in browser at localhost:8000

## To make model changes and migrations
1. Change models (models.py)
2. Run ```python manage.py makemigrations``` to create migrations for those changes
3. Run ```python manage.py migrate``` to apply those changes to the database.
