from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from .models import Evento
from .serializers import EventoSerializer

@method_decorator(csrf_exempt, name='dispatch')
class EventoViewSet(viewsets.ModelViewSet):
    queryset = Evento.objects.all()
    serializer_class = EventoSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['nombre', 'lugar', 'descripcion']
    authentication_classes = []
    permission_classes = [AllowAny]