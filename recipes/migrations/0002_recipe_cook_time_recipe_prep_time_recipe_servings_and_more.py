# Generated by Django 4.0.6 on 2022-08-15 23:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='cook_time',
            field=models.CharField(blank=True, default=None, max_length=3000, null=True, verbose_name='Cook time'),
        ),
        migrations.AddField(
            model_name='recipe',
            name='prep_time',
            field=models.CharField(blank=True, default=None, max_length=3000, null=True, verbose_name='Prep time'),
        ),
        migrations.AddField(
            model_name='recipe',
            name='servings',
            field=models.FloatField(blank=True, default=None, max_length=3000, null=True, verbose_name='Servings'),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='description',
            field=models.CharField(default='', max_length=3000, verbose_name='Description (1 sentence)'),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='introduction',
            field=models.CharField(blank=True, default=None, max_length=20000, null=True, verbose_name='Introduction'),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='pub_date',
            field=models.DateTimeField(verbose_name='Date published'),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='title',
            field=models.CharField(default='', max_length=400),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='variations',
            field=models.CharField(blank=True, default=None, max_length=20000, null=True, verbose_name='Variations'),
        ),
    ]