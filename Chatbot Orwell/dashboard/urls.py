from django.urls import path
from . import views

urlpatterns = [
    path('', views.profile, name='profile'),
    path('trainbot/', views.trainbot, name='trainbot'),
    path('perfil/', views.perfil, name='perfil'),
    path('changePassword',views.change_password, name='change_password'),
    path('reportes/', views.reportes, name='reportes'),
    path('reporteAtendido/<slug:identificador>', views.resolverReporte, name='reporteAtendido'),
    path('reporte/<slug:identificador>', views.reporte, name='reporte'),
    path('conversaciones/', views.conversaciones, name='conversaciones'),
    path('conversacion/<slug:identificador>', views.conversacion, name='conversacion'),
    path('user/<slug:identificador>', views.del_user, name='deleteUser'),
    path('searchReport/', views.searchReport, name='searchReport'),
    path('searchConversacion/', views.searchConversacion, name='searchConversacion'),
    path('users/', views.users, name='users'),
]