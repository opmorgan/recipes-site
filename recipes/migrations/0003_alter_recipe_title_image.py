# Generated by Django 4.1 on 2022-09-02 00:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0002_rename_text_tag_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='title_image',
            field=models.ImageField(blank=True, default=None, null=True, upload_to='images/'),
        ),
    ]
