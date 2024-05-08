# Generated by Django 4.2.7 on 2024-05-03 03:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0009_variation_variation_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='variation',
            name='name',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='variation',
            name='variation_category',
            field=models.CharField(choices=[('modelo', 'modelo'), ('capacidad', 'capacidad'), ('color', 'color')], max_length=100, null=True),
        ),
    ]
