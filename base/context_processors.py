from django.conf import settings # import the settings file

def site_title(request):
    # return the value you want as a dictionnary. you may add multiple values in there.
    return {'SITE_TITLE': "Honeybit.cooking",
            'SITE_TITLE_SHORT': "Honeybit"}
