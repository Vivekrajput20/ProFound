# Generated by Django 2.0.8 on 2018-09-29 07:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lfBackend', '0003_auto_20180929_0704'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='lat',
            field=models.DecimalField(decimal_places=10, max_digits=25),
        ),
        migrations.AlterField(
            model_name='item',
            name='long',
            field=models.DecimalField(decimal_places=10, max_digits=25),
        ),
    ]