# Generated by Django 4.2.7 on 2024-06-16 00:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0032_alter_reviews_product'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reviews',
            name='product',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='reviews', to='products.product'),
        ),
    ]
