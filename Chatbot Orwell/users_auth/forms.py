from django import forms
from django.conf import settings
from django.contrib.auth import forms as django_forms, update_session_auth_hash
from django.utils.translation import pgettext, pgettext_lazy
from .models import User
from dashboard.models import Reporte

class ChangePasswordForm(django_forms.PasswordChangeForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['new_password1'].user = self.user
        self.fields['old_password'].widget.attrs['placeholder'] = ''
        self.fields['new_password1'].widget.attrs['placeholder'] = ''
        del self.fields['new_password2']

class ReporteForm(forms.ModelForm):
    class Meta:
        model = Reporte
        fields = ['problema', 'modelopc', 'cliente', 'fecha', 'hora']

def logout_on_password_change(request, user):
    if (update_session_auth_hash is not None and
            not settings.LOGOUT_ON_PASSWORD_CHANGE):
        update_session_auth_hash(request, user)

class LoginForm(django_forms.AuthenticationForm):
    username = forms.EmailField(  
        label=pgettext('Form field', 'Email'), max_length=75)
    def __init__(self, request=None, *args, **kwargs):
        self.error_messages['invalid_login']='Usuario o contraseña incorrecta. Vuelve a intentarlo o haz clic en Contraseña olvidada para cambiarla. '
        super().__init__(request=request, *args, **kwargs)
        if request:
            email = request.GET.get('email')
            if email:
                self.fields['username'].initial = email

class SignupForm(forms.ModelForm):
    password = forms.CharField(
        widget=forms.PasswordInput, label=pgettext("Password", "Password")
    )
    password_confirm = forms.CharField(
        widget=forms.PasswordInput, label=pgettext("Confirmación  password", "Password_confim")
    )
    email = forms.EmailField(
        label=pgettext("Email", "Email"),
        error_messages={
            'unique': pgettext_lazy(
                'Error en el registro',
                'El correo ya esta en uso.')},
    )
    first_name = forms.CharField(
        label=pgettext('Nombre', 'Nombre'),
        widget=forms.TextInput(attrs={'class': "validate"}))
 
    last_name = forms.CharField(
        label=pgettext('Apellido materno', 'Apellido materno'),
        widget=forms.TextInput(attrs={'class': "validate"}))

    user_type = forms.ChoiceField(
        choices=(
        ('administrador', 'Administrador'),
        ('staff', 'Tecnico'),
    ))    
        
    class Meta:
        model = User
        fields = ('email','first_name','last_name')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self._meta.model.USERNAME_FIELD in self.fields:
            self.fields[self._meta.model.USERNAME_FIELD].widget.attrs.update(
                {'autofocus': ''})

    def save(self, request=None, commit=True,):
        user = super().save(commit=False)
        password = self.cleaned_data['password']
        if(password == self.cleaned_data['password_confirm']):
            user.set_password(password)
        else:
            raise forms.ValidationError(
                "password and confirm_password does not match"
            )
        
        user_type = self.cleaned_data['user_type']
        if(user_type== "administrador"):
            user.is_admin = True
            user.is_superuser= True
        elif(user_type== "staff"):
            user.is_staff = True
        if commit:
            user.save()
        return user

