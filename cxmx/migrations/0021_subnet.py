# Generated by Django 3.1.2 on 2020-12-26 00:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cxmx', '0020_interface_subnet'),
    ]

    operations = [
        migrations.AddField(
            model_name='subnet',
            name='dhcp',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
    ]
