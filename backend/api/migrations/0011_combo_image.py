# Generated by Django 4.0.6 on 2022-10-19 12:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_remove_combo_foods_comboitem_combo_items'),
    ]

    operations = [
        migrations.AddField(
            model_name='combo',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
    ]
