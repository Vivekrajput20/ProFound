# Generated by Django 2.0.8 on 2018-09-29 21:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lfBackend', '0004_auto_20180929_0757'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='date_create',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
