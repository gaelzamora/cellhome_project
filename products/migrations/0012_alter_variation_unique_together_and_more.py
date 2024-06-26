# Generated by Django 4.2.7 on 2024-05-03 03:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0011_alter_variation_variation_category_and_more'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='variation',
            unique_together=set(),
        ),
        migrations.AlterField(
            model_name='variation',
            name='variation_category',
            field=models.CharField(choices=[('modelo', 'modelo'), ('color', 'color'), ('capacidad', 'capacidad')], max_length=100, null=True),
        ),
    ]
