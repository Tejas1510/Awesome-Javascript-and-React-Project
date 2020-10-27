from django.shortcuts import render,redirect 
import datetime
from django.contrib.auth.decorators import login_required
from chatterbot import ChatBot
from chatterbot.ext.django_chatterbot import settings
from django.views.generic.base import TemplateView
from django.views.generic import View
import json
from chatterbot.conversation import Statement
from django.http import JsonResponse
from chatterbot.trainers import ChatterBotCorpusTrainer
import random
from dashboard.models import Conversacion, Reporte
import string
from chatterbot.comparisons import LevenshteinDistance
from chatterbot.parsing import datetime_parsing
from chatterbot.response_selection import get_most_frequent_response
from datetime import datetime
from chatterbot.trainers import ListTrainer
from django.core.mail import send_mail, BadHeaderError
from .forms import ContactForm
from django.http import HttpResponse, HttpResponseRedirect
from users_auth.forms import ReporteForm

levenshtein_distance = LevenshteinDistance()

class ChatterBotApiView(View):
    bot = ChatBot(**settings.CHATTERBOT)
    def post(self, request, *args, **kwargs):
        input_data = json.loads(request.body.decode('utf-8'))
        if input_data['text'] == '' or input_data['id'] == '':
            return JsonResponse({
                'text': [
                    'El atributo texto o id son requeridos'
                ]
            }, status=400)
        else:
            conversa = Conversacion(texto=input_data['text'],enviadopor=input_data['id'], response='USER')
            conversa.save()
            respuesta = Statement(input_data['text'])
            if levenshtein_distance.compare(respuesta, Statement('Si funciono'))>0.65 or levenshtein_distance.compare(respuesta, Statement('Se soluciono el problema'))>0.65:
                elementosActualizar = Conversacion.objects.filter(enviadopor="%s" %input_data['id']).all().order_by('id')
                for elemento in elementosActualizar:
                    elemento.solucionado = True
                    elemento.save()
                response = self.bot.get_response(input_data)
                print(response)
                conversa = Conversacion(texto=str(response),enviadopor=input_data['id'], solucionado=True)
                conversa.save()
            elif levenshtein_distance.compare(respuesta, Statement('Necesito una cita de reparacion'))>0.65:
                response = Statement('Cita de reparacion')
                elementosActualizar = Conversacion.objects.filter(enviadopor="%s" %input_data['id']).all().order_by('id')
                for elemento in elementosActualizar:
                    elemento.solucionado = True
                    elemento.save()
                conversa = Conversacion(texto='Por favor llena el siguiente formulario para agendar tu cita',enviadopor=input_data['id'])
                conversa.save()
            else:
                response = self.bot.get_response(input_data)
                conversa = Conversacion(texto=str(response),enviadopor=input_data['id'])
                conversa.save()
                print(type(response))
            response_data = response.serialize()
            return JsonResponse(response_data, status=200)
    def get(self, request, *args, **kwargs):
        return JsonResponse({
            'name': self.bot.name
        })

class ChatterBotApiViewAdmin(View):
    def post(self, request, *args, **kwargs):
        bot = ChatBot(**settings.CHATTERBOT)
        input_data = json.loads(request.body.decode('utf-8'))
        if input_data['text1'] == '' or input_data['text2'] == '':
            return JsonResponse({
                'text': [
                    'Los campos texto son requeridos'
                ]
            }, status=400)
        else:
            respuesta = Statement(input_data['text1'])
            correccion = Statement(input_data['text2'])
            trainer = ListTrainer(bot)
            trainer.train([
                input_data['text1'],
                input_data['text2']
            ])
            response = "Nueva respuesta aprendida a la pregunta " +input_data['text1'] + " respondere " + input_data['text2']
            response_data = json.dumps(response)
            return JsonResponse(response_data, status=200, safe=False)
    def get(self, request, *args, **kwargs):
        return JsonResponse({
            'name': self.bot.name
        })

def index(request):
    return render(request, 'chatbot/index.html')

def chatear(request):
    letters = string.ascii_lowercase
    identificador = ''.join(random.choice(letters) for i in range(12))
    form = ReporteForm
    return render(request, 'chatbot/chatbot.html', { 'idC':identificador, 'form':form })

def equipo(request):
    return render(request, 'chatbot/equipo.html')

def acerca(request):
    return render(request, 'chatbot/acerca.html')

def contactanos(request):
    if request.method == 'GET':
        form = ContactForm()
    else:
        form = ContactForm(request.POST)
        if form.is_valid():
            subject = form.cleaned_data['subject']
            from_email = form.cleaned_data['from_email']
            message = "Correo: "+from_email+" Mensaje: "+form.cleaned_data['message']
            try:
                send_mail(subject, message, from_email, ['chatbotorwell@gmail.com'])
            except BadHeaderError:
                return HttpResponse('Ocurrio un error.')
            return render(request, 'chatbot/contactanos.html', {'mensaje': 'El correo se envio correctamente','form': form})
    return render(request, 'chatbot/contactanos.html', {'form': form})    