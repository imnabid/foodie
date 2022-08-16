from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from accounts.models import customUser

class CustomUserCreationForm(UserCreationForm):

    class Meta(UserCreationForm):
        model = customUser
        fields = ('email',)

class CustomUserChangeForm(UserChangeForm):

    class Meta(UserChangeForm):
        model = customUser
        fields = ('email',)