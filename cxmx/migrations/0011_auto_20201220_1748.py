# Generated by Django 3.1.2 on 2020-12-20 17:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('cxmx', '0010_auto_20201220_1428'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='sitecomment',
            options={'ordering': ['created_at']},
        ),
        migrations.AlterField(
            model_name='sitecomment',
            name='comments',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='site_comments', to='cxmx.site'),
        ),
        migrations.CreateModel(
            name='ClusterComment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True, verbose_name='Created at')),
                ('lastmodified_at', models.DateTimeField(auto_now=True, db_index=True, verbose_name='Last modified at')),
                ('title', models.TextField(max_length=100)),
                ('comment', models.TextField()),
                ('comments', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='cluster_comments', to='cxmx.cluster')),
                ('created_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='cxmx_clustercomment_created', to=settings.AUTH_USER_MODEL, verbose_name='Created by')),
                ('lastmodified_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='cxmx_clustercomment_lastmodified', to=settings.AUTH_USER_MODEL, verbose_name='Last modified by')),
            ],
            options={
                'ordering': ['created_at'],
                'abstract': False,
            },
        ),
    ]
