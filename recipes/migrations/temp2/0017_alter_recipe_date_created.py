# Generated by Django 4.1 on 2022-08-19 02:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0016_remove_recipe_pub_date_recipe_date_created_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='date_created',
            field=models.DateTimeField(auto_now_add=True, verbose_name='Date created'),
        ),
    ]