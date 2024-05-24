# Generated by Django 4.2.7 on 2024-05-18 22:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0024_alter_variation_variation_category'),
    ]

    operations = [
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Image', models.ImageField(default='placeholder.png', upload_to='')),
                ('id_product', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='images', to='products.product')),
            ],
        ),
    ]
