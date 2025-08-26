from django.contrib import admin
from .models import Evento

@admin.register(Evento)
class EventoAdmin(admin.ModelAdmin):
    list_display = ['nombre', 'fecha', 'lugar', 'descripcion']
    list_filter = ['fecha', 'lugar']
    search_fields = ['nombre', 'lugar', 'descripcion']
    date_hierarchy = 'fecha'
