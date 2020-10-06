from django.shortcuts import render, redirect
import datetime
from django.contrib.auth.decorators import login_required
from django.contrib.auth import REDIRECT_FIELD_NAME
from django.utils.decorators import method_decorator
from django.contrib.admin.views.decorators import user_passes_test
from users_auth.models import User
from .models import Conversacion
from django.db.models import Subquery
from django.core.paginator import Paginator
from django.contrib import messages
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth import views as django_views
from datetime import date
from django.contrib.auth.forms import PasswordChangeForm
from django.views.generic.edit import (
    CreateView,
    UpdateView,
    DeleteView
)
from .models import Reporte
from django.http import JsonResponse
from django.urls import reverse_lazy
from dashboard.models import Conversacion, Reporte


def superuser_required(
    view_func=None, redirect_field_name=REDIRECT_FIELD_NAME, login_url="account:login"
):
    actual_decorator = user_passes_test(
        lambda u: u.is_active and u.is_admin or u.is_superuser,
        login_url=login_url,
        redirect_field_name=redirect_field_name,
    )
    if view_func:
        return actual_decorator(view_func)
    return actual_decorator

@login_required
def change_password(request):
    if request.method == 'POST':
        form = PasswordChangeForm(request.user, request.POST)
        if form.is_valid():
            user = form.save()
            update_session_auth_hash(request, user) 
            messages.success(request, 'Tu contraseña se actualizo correctamente')
            return redirect('/dashboard/')
        else:
            messages.error(request, 'Corrige el error.')
    else:
        form = PasswordChangeForm(request.user)
    return render(request, 'dashboard/change_password.html', {'form': form})

@login_required
def profile(request):
    today = date.today()
    today_filter = Conversacion.objects.filter(create__year=today.year,
                                       create__month=today.month,
                                       create__day=today.day).distinct('enviadopor').count()
    reparacionesNuevas = Reporte.objects.filter(create__year=today.year,
                                       create__month=today.month,
                                       create__day=today.day).count()
    reparacionesPendientes = Reporte.objects.filter(atendido=False).count()
    context = {
        'todayConsultas' : today_filter,
        'todayReportes' :reparacionesNuevas,
        'todayPendientes' : reparacionesPendientes
    }
    return render(request, 'dashboard/profile.html', context)

@login_required
def searchReport(request):
    if request.POST.get('campo') and request.POST.get('opcion'):
        value = request.POST.get('campo')
        opcion = request.POST.get('opcion')
        if opcion=='1':    
            try:
                dateFilter = datetime.datetime.strptime(value, "%d/%m/%y").date()
                search = Reporte.objects.filter(create__icontains=dateFilter)
                context = {
                    'reportes' : search
                }
                return render(request,'dashboard/reportes.html',context)   
            except ValueError:
                messages.warning(request, "Formato incorrecto")
                return redirect('/dashboard/reportes')
        elif opcion=='2':   
            search = Reporte.objects.filter(cliente__icontains=value).order_by('-create')
            context = {
                'reportes' : search
            }
            return render(request,'dashboard/reportes.html',context)
        else:            
            messages.warning(request, "La opcion enviada no existe")
            return redirect('/dashboard/reporte')
    else:
        messages.warning(request, "Error falta llenar algun campo")
        return redirect('/dashboard/reporte')

@login_required
def searchConversacion(request):
    if request.POST.get('campo'):
        value = request.POST.get('campo')
        try:
            dateFilter = datetime.datetime.strptime(value, "%d/%m/%y").date()
            search = Conversacion.objects.filter(create__icontains=dateFilter)
            context = {
                'conversaciones' : search
            }
            return render(request,'dashboard/conversaciones.html',context)   
        except ValueError:
            messages.warning(request, "Formato incorrecto")
            return redirect('/dashboard/conversaciones')
    else:
        messages.warning(request, "Error falta llenar algun campo")
        return redirect('/dashboard/conversaciones')

@login_required
def trainbot(request):
    return render(request, 'dashboard/trainbot.html')

@login_required
def perfil(request):
    return render(request, 'dashboard/perfil.html')

@login_required
def reportes(request):
    reportes_list = Reporte.objects.filter(
        pk__in=Subquery(
            Reporte.objects.all().values('pk')
        )
    ).order_by("fecha")
    paginator = Paginator(reportes_list, 8)
    page = request.GET.get('page')
    reportes = paginator.get_page(page)
    context = {
        'reportes' : reportes
    }
    return render(request, 'dashboard/reportes.html', context)

@login_required
def conversaciones(request):
    conversaciones_list = Conversacion.objects.filter(
        pk__in=Subquery(
            Conversacion.objects.distinct('enviadopor').values('pk')
        )
    ).order_by("-id")
    paginator = Paginator(conversaciones_list, 8)
    page = request.GET.get('page')
    conversaciones = paginator.get_page(page)
    context = {
        'conversaciones' :conversaciones
    }
    return render(request, 'dashboard/conversaciones.html', context)

@login_required
def del_user(request, identificador):    
    try:
        u = User.objects.get(id = identificador)
        user = request.user
        if u.email==request.user.email:
            user.is_active = False
            user.save()
            kwargs = {
            'template_name' : 'account/logout.html',
            'next_page': '/'
            }
            return django_views.LogoutView.as_view(**kwargs)(request, **kwargs)
        else:
            print("Entre")
            u.is_active = False
            u.save()
            return redirect('/dashboard/users')
    except:
        return render(request, 'dashboard/usuarios.html')


@login_required
def resolverReporte(request, identificador):
    reporte = Reporte.objects.get(id = identificador)
    reporte.atendido = True
    reporte.save()
    return redirect('/dashboard/reportes')

@login_required
def conversacion(request, identificador):
    conversacion = Conversacion.objects.filter(enviadopor="%s" %identificador).all().order_by('id')
    context = {
        'conversacion' : conversacion
    }
    return render(request, 'dashboard/conversacion.html', context)

@login_required
def reporte(request, identificador):
    reporte = Reporte.objects.get(pk=identificador)
    print(reporte.id)
    context = {
        'reporte' : reporte
    }
    return render(request, 'dashboard/reporte.html', context)

@superuser_required
def users(request):
    clientes = User.objects.all()
    context = {
        'clientes' : clientes
    }
    return render(request, 'dashboard/usuarios.html', context)

class AjaxableResponseMixin:

    def form_invalid(self, form):
        if self.request.is_ajax():
            return render(self.request, 'snippet/createCita.html', {'form' : form}, status=505)
        
    def form_valid(self, form):
        response = super().form_valid(form)
        if self.request.is_ajax():
            data = {
                'pk' : self.object.pk,
                'problema' : self.object.problema,
                'modelopc' : self.object.modelopc,
                'cliente' : self.object.cliente,
                'hora' : self.object.hora,
                'fecha' : self.object.fecha,
            }
            return JsonResponse('Ok', safe=False)
        else:
            return response

#CLASS BASED VIEWS PARA Reportes
class ReportCreate(AjaxableResponseMixin, CreateView):
    model = Reporte
    fields = ['problema', 'modelopc', 'cliente', 'fecha','hora']
    def form_valid(self, form):
        busqueda = Reporte.objects.filter(fecha=form.instance.fecha)
        existe = busqueda.filter(hora=form.instance.hora).count()
        if existe==0:
            idC = self.request.POST['idC']
            problema = self.request.POST['problema']
            cliente = self.request.POST['cliente']
            modelo = self.request.POST['modelopc']
            hora = self.request.POST['hora']
            fecha = self.request.POST['fecha']
            print(idC)
            print(problema)
            conversa = Conversacion(texto="Entendido, guarde una cita para "+cliente+" con el modelo de computadora "+modelo+" para el dia "+fecha+" a las "+hora+ " con el siguiente diagnostico "+problema,enviadopor=idC,solucionado=True)
            conversa.save()
            return super(ReportCreate, self).form_valid(form)
        else:
            return render(self.request, 'snippet/createCita.html', {'form' : form}, status=500)
    def get_success_url(self):
        return reverse_lazy('createCita')