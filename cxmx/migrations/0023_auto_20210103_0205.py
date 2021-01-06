# Generated by Django 3.1.2 on 2021-01-03 02:05

from django.db import migrations
import netfields.fields


class Migration(migrations.Migration):

    dependencies = [
        ('cxmx', '0022_auto_20210103_0131'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subnet',
            name='ipV4Net',
            field=netfields.fields.CidrAddressField(max_length=43, unique=True),
        ),
        migrations.AlterField(
            model_name='subnet',
            name='ipv6Net',
            field=netfields.fields.CidrAddressField(blank=True, max_length=43, null=True, unique=True),
        ),
    ]
