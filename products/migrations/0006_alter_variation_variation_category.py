# Generated by Django 4.2.7 on 2024-04-21 20:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0005_alter_variation_variation_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='variation',
            name='variation_category',
            field=models.CharField(choices=[('color', 'color'), ('capacidad', 'capacidad'), ('modelo', 'modelo')], max_length=100),
        ),
    ]
