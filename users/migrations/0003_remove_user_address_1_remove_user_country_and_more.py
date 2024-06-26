# Generated by Django 4.2.7 on 2024-06-19 00:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_user_address_1_user_country'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='address_1',
        ),
        migrations.RemoveField(
            model_name='user',
            name='country',
        ),
        migrations.CreateModel(
            name='InformationUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('address_1', models.CharField(max_length=150)),
                ('country', models.CharField(blank=True, max_length=150, null=True)),
                ('postal_code', models.CharField(blank=True, max_length=10, null=True)),
                ('suburb', models.CharField(blank=True, max_length=100, null=True)),
                ('state_city', models.CharField(blank=True, max_length=150, null=True)),
                ('phone_number', models.CharField(blank=True, max_length=100, null=True)),
                ('email', models.CharField(blank=True, max_length=100, null=True)),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
