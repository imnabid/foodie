# Generated by Django 4.0.6 on 2022-10-25 06:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_order_completed'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='note',
            field=models.TextField(blank=True, null=True),
        ),
    ]