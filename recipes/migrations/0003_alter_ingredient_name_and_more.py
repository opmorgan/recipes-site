# Generated by Django 4.0.6 on 2022-08-16 14:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0002_recipe_cook_time_recipe_prep_time_recipe_servings_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ingredient',
            name='name',
            field=models.CharField(default='Egg', max_length=400),
        ),
        migrations.AlterField(
            model_name='recipeingredient',
            name='description',
            field=models.CharField(blank=True, default=None, max_length=400, null=True),
        ),
        migrations.AlterField(
            model_name='recipeingredient',
            name='unit',
            field=models.CharField(blank=True, default=None, max_length=50, null=True),
        ),
    ]
