# Generated by Django 4.1 on 2022-08-22 01:33

from django.db import migrations
import recipes.models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0025_remove_test_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='test',
            name='name',
            field=recipes.models.NameField(default='Henry', max_length=200),
        ),
    ]
