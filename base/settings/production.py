from .defaults import * # import the default settings file

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

STATIC_ROOT = env('STATIC_ROOT')
MEDIA_ROOT = env('MEDIA_ROOT')
