from django import forms
from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from.forms import CustomUserChangeForm, CustomUserCreationForm


from .models import customUser
class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = CustomUserChangeForm
    add_form = CustomUserCreationForm

    list_display = ('email','first_name','is_staff', 'is_active')
    list_filter = ('email','is_staff','is_active')
    fieldsets = (
        (None, {'fields': ('email','first_name','last_name', 'password')}),
        ('Permissions', {'fields': ('is_staff','is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name','last_name','password1', 'password2', 'is_staff', 'is_active'),
        }),
    )
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()

# admin.site.unregister(User)
admin.site.register(customUser, UserAdmin)
