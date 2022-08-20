from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .forms import UserChangeForm, UserCreationForm
from .models import User

class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ('username','email','is_staff', 'is_verified')
    list_filter = ('is_staff','is_active')
    fieldsets = (
        ('User Info', {'fields': ('username','email','first_name','last_name', 'password')}),
        ('Verification', {'fields': ('otp','is_verified')}),
        ('Permissions', {'fields': ('is_staff','is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name','last_name','password1', 'password2', 'is_staff', 'is_active'),
        }),
    )
    search_fields = ('username',)
    ordering = ('username',)
    filter_horizontal = ()
    
admin.site.register(User, UserAdmin)
