# Generated by Django 4.1 on 2022-08-19 04:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0019_recipe_created_at_recipe_updated_at'),
    ]

    operations = [
        migrations.RenameField(
            model_name='recipe',
            old_name='uploader',
            new_name='author',
        ),
    ]