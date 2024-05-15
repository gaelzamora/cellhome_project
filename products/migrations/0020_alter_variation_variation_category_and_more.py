# Generated by Django 4.2.7 on 2024-05-03 03:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0019_alter_variation_variation_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='variation',
            name='variation_category',
            field=models.CharField(choices=[('capacidad', 'capacidad'), ('color', 'color'), ('modelo', 'modelo')], max_length=100, null=True),
        ),
        migrations.AlterUniqueTogether(
            name='variation',
            unique_together={('product', 'name')},
        ),
    ]