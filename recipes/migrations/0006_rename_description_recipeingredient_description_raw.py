# Generated by Django 4.1 on 2022-08-16 20:11

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0005_alter_recipeingredient_unit'),
    ]

    operations = [
        migrations.RenameField(
            model_name='recipeingredient',
            old_name='description',
            new_name='description_raw',
        ),
    ]
