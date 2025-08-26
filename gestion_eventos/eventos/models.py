from django.db import models


class Evento(models.Model):
    nombre = models.CharField(max_length=255)
    fecha = models.DateField()
    lugar = models.CharField(max_length=255)
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre