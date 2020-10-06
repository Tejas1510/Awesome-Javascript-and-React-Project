from django import forms

from .models import User,Score


class PostForm(forms.ModelForm):

    class Meta:
        model = User
        fields = ('username',)