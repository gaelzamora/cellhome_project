# Generated by Django 4.2.7 on 2024-06-17 19:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0004_order_num_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='shippingaddress',
            name='state',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]