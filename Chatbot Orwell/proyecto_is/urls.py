from django.urls import path
from users_auth.urls import urlpatterns as account_urls
from dashboard.urls import urlpatterns as dashboard_urls
from django.conf.urls import include
from . import views
from django.conf.urls import url
from dashboard.views import ReportCreate

urlpatterns = [
    path('', views.index, name='index'),
    path('chatbot/', views.chatear, name='chatear'),
    path('equipo/', views.equipo, name='equipo'),
    path('acercaDe/', views.acerca, name='acerca'),
    path('contactanos/', views.contactanos, name='contactanos'),
    path('createCita', ReportCreate.as_view(), name='createCita'),
    path('account/',include((account_urls, 'account'), namespace='account')),    
    path('dashboard/',include((dashboard_urls, 'dashboard'), namespace='dashboard')),
    url(r'^api/chatterbot/', views.ChatterBotApiView.as_view(), name='chatterbot'),
    url(r'^api/chatterbotAdmin/', views.ChatterBotApiViewAdmin.as_view(), name='chatterbotadmin'),
]
