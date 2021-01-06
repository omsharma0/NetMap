# Generated by Django 3.1.2 on 2021-01-03 02:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cxmx', '0023_auto_20210103_0205'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subnet',
            name='net',
            field=models.ForeignKey(default=1, null=True, on_delete=django.db.models.deletion.PROTECT, related_name='netSubnets', to='cxmx.net'),
        ),
    ]
