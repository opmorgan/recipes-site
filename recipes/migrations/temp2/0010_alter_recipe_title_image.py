# Generated by Django 4.1 on 2022-08-19 00:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0009_recipeingredient_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='title_image',
            field=models.ImageField(null=True, upload_to=''),
        ),
    ]
