# Generated by Django 4.1 on 2022-09-27 04:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0007_alter_recipe_tags'),
    ]

    operations = [
        migrations.CreateModel(
            name='ServingUnit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', max_length=400, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='RecipeServingUnit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.FloatField(blank=True, default=None, null=True)),
                ('unit', models.CharField(blank=True, max_length=50, null=True)),
                ('description', models.CharField(blank=True, default=None, max_length=400, null=True)),
                ('recipe_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='recipes.recipe')),
                ('servingunit_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='recipes.servingunit')),
            ],
        ),
        migrations.AddField(
            model_name='recipe',
            name='makes',
            field=models.ManyToManyField(through='recipes.RecipeServingUnit', to='recipes.servingunit'),
        ),
    ]
