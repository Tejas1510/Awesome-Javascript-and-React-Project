from django.db import models
from django.utils.timezone import now 

class Conversacion(models.Model):
    create = models.DateTimeField(default=now , editable=False)
    solucionado = models.BooleanField(default=False)
    texto = models.CharField(max_length=512)
    enviadopor = models.CharField(max_length=36)
    response = models.CharField(max_length=36, default='BOT')


class Reporte(models.Model):
    create = models.DateTimeField(default=now, editable=False)
    problema = models.CharField(max_length=1000)
    atendido = models.BooleanField(default=False)
    modelopc = models.CharField(max_length=100)
    cliente = models.CharField(max_length=150)
    fecha = models.DateField(default=now)
    hora = models.TimeField(default=now)
    def __str__(self):
        return self.modelopc
