# Generated by Django 5.2.3 on 2025-07-05 01:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_usuarionotificacion_notificacion_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='movinventario',
            name='motivo',
            field=models.TextField(null=True, blank=True),
        ),
    ]
