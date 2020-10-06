from django.conf import settings
from django.contrib import auth, messages
from django.contrib.auth import views as django_views
from django.contrib.auth.decorators import login_required
from django.http import Http404, HttpResponseRedirect
from django.shortcuts import get_object_or_404, redirect
from django.template.response import TemplateResponse
from django.urls import reverse, reverse_lazy
from django.utils.translation import pgettext, ugettext_lazy as _
from django.views.decorators.http import require_POST
from django.contrib.auth.forms import PasswordResetForm 
from django.shortcuts import render
from django.core.mail import send_mail

#from dashboard.views import superuser_required

from .forms import (
    ChangePasswordForm, LoginForm, SignupForm,
    logout_on_password_change)

def login(request):
    if request.user.is_authenticated:
        return redirect('/dashboard')
    kwargs = {
        'template_name': 'account/login.html',
        'authentication_form': LoginForm}
    return django_views.LoginView.as_view(**kwargs)(request, **kwargs)

@login_required
def logout(request):
    kwargs = {
            'template_name' : 'account/logout.html',
            'next_page': '/'
        }
    return django_views.LogoutView.as_view(**kwargs)(request, **kwargs)

def signup(request):
    form = SignupForm(request.POST or None)
    if form.is_valid() and form.cleaned_data.get("password")== form.cleaned_data.get("password_confirm"):
            form.save()
            current_user = request.user.is_authenticated
            password=form.cleaned_data.get("password")
            email = form.cleaned_data.get("email")
            user = auth.authenticate(request=request, email=email, password=password)
            if current_user:
                return render(request, 'dashboard/profile.html')
            else:
                if user:
                    auth.login(request, user)
                    messages.success(request, _("Usuario creado"))
                    redirect_url = request.POST.get("next", settings.LOGIN_REDIRECT_URL)
                    return redirect(redirect_url)
    ctx = {
        "form": form,
        }

    return TemplateResponse(request, "account/signup.html", ctx)


def password_reset(request):
    kwargs = {
        'email_template_name': 'account/password_reset_email.html',
        'form_class': PasswordResetForm,
        'subject_template_name':'account/password_reset_subject.txt',
        'success_url': reverse_lazy('account:reset-password-done'),
        'template_name': 'account/password_reset.html'}
    return django_views.PasswordResetView.as_view(**kwargs)(request, **kwargs)


class PasswordResetConfirm(django_views.PasswordResetConfirmView):
    template_name = 'account/password_reset_from_key.html'
    success_url = reverse_lazy('account:reset-password-complete')
    token = None
    uidb64 = None


def password_reset_confirm(request, uidb64=None, token=None):
    kwargs = {
        'template_name': 'account/password_reset_from_key.html',
        'success_url': reverse_lazy('account:reset-password-complete'),
        'token': token,
        'uidb64': uidb64}
    return PasswordResetConfirm.as_view(**kwargs)(request, **kwargs)






