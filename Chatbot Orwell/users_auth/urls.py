from django.conf.urls import url
from django.contrib.auth import views as django_views
from django.urls import path, re_path
from django.urls import reverse_lazy
from . import views

urlpatterns = [
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('signup/', views.signup, name='signup'),  
    path('password-reset/',
         django_views.PasswordResetView.as_view(
             subject_template_name = 'account/password_reset_subject.txt',
             success_url = reverse_lazy('account:password_reset_done'),
             template_name='account/password_reset.html',
             email_template_name='account/password_reset_email.html',
         ),
         name='password_reset'),
    path('password-reset/done/',
         django_views.PasswordResetDoneView.as_view(
             template_name='account/password_reset_done.html'
         ),
         name='password_reset_done'),
    path('password-reset/confirm/<uidb64>/<token>/', 
        django_views.PasswordResetConfirmView.as_view(
            success_url = reverse_lazy('account:password_reset_complete'),
            template_name='account/password_reset_confirm.html'
        ), 
        name='password_reset_confirm'),
    path('password-reset/complete', 
        django_views.PasswordResetCompleteView.as_view(
            template_name='account/password_reset_complete.html'
            ), 
            name='password_reset_complete'
        ),
]