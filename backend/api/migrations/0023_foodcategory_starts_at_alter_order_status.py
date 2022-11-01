# Generated by Django 4.0.6 on 2022-11-01 02:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_rename_completed_order_cancelled_order_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='foodcategory',
            name='starts_at',
            field=models.PositiveSmallIntegerField(blank=True, default=0, null=True),
        ),
        migrations.AlterField(
            model_name='order',
            name='status',
            field=models.CharField(choices=[('OT', 'ORDER TAKEN'), ('P', 'PREPARING'), ('S', 'SHIPPED'), ('D', 'DELIVERED')], default='OT', max_length=2),
        ),
    ]
