# Sistema de Gestión de Eventos

Un sistema web completo para gestionar eventos con interfaz HTML/CSS/JavaScript y backend Django REST API.

## Características

- ✅ Crear, editar, eliminar y listar eventos
- ✅ Búsqueda de eventos por nombre, lugar o descripción
- ✅ Interfaz web moderna y responsive
- ✅ API REST completa con Django
- ✅ Base de datos SQLite
- ✅ Soporte para CORS (permite peticiones desde archivos HTML locales)

## Estructura del Proyecto

```
Gestion_eventos/
├── css/                    # Estilos CSS
│   ├── estilos.css        # Estilos principales
│   ├── formularios.css    # Estilos de formularios
│   └── mensajes.css       # Estilos de mensajes
├── js/                    # JavaScript del frontend
│   └── script.js         # Lógica principal
├── gestion_eventos/       # Proyecto Django
│   ├── eventos/          # App de eventos
│   ├── manage.py         # Script de gestión Django
│   └── requirements.txt  # Dependencias Python
├── index.html            # Página principal (listado)
├── registrar.html        # Formulario de registro
├── editar.html          # Formulario de edición
└── test_api.html        # Página de prueba de la API
```

## Instalación y Configuración

### 1. Requisitos Previos

- Python 3.8 o superior
- pip (gestor de paquetes de Python)

### 2. Instalar Dependencias

```bash
cd gestion_eventos
pip install -r requirements.txt
```

### 3. Configurar Base de Datos

```bash
python manage.py makemigrations
python manage.py migrate
```

### 4. Crear Superusuario (Opcional)

```bash
python manage.py createsuperuser
```

### 5. Iniciar Servidor

```bash
python manage.py runserver
```

El servidor estará disponible en: http://127.0.0.1:8000

## Uso del Sistema

### Frontend (Archivos HTML)

1. **index.html** - Lista todos los eventos con opciones de búsqueda
2. **registrar.html** - Formulario para crear nuevos eventos
3. **editar.html** - Formulario para editar eventos existentes

### API REST

- **GET** `/api/eventos/` - Listar todos los eventos
- **POST** `/api/eventos/` - Crear nuevo evento
- **GET** `/api/eventos/{id}/` - Obtener evento específico
- **PUT** `/api/eventos/{id}/` - Actualizar evento
- **DELETE** `/api/eventos/{id}/` - Eliminar evento

### Ejemplo de Uso de la API

```javascript
// Crear evento
const response = await fetch('http://127.0.0.1:8000/api/eventos/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        nombre: 'Mi Evento',
        fecha: '2024-12-25',
        lugar: 'Mi Lugar',
        descripcion: 'Descripción del evento'
    })
});

// Listar eventos
const eventos = await fetch('http://127.0.0.1:8000/api/eventos/').then(r => r.json());
```

## Solución de Problemas

### Error de CORS

Si tienes problemas de CORS al abrir los archivos HTML directamente:

1. Verifica que el servidor Django esté ejecutándose
2. Asegúrate de que `django-cors-headers` esté instalado
3. Verifica la configuración en `settings.py`

### Error de Conexión

Si no puedes conectar a la API:

1. Verifica que el servidor esté ejecutándose en el puerto 8000
2. Comprueba que no haya errores en la consola de Django
3. Usa `test_api.html` para probar la conectividad

### Base de Datos

Si hay problemas con la base de datos:

1. Ejecuta `python manage.py makemigrations`
2. Ejecuta `python manage.py migrate`
3. Verifica que `db.sqlite3` se haya creado

## Desarrollo

### Agregar Nuevos Campos

1. Modifica el modelo en `gestion_eventos/eventos/models.py`
2. Ejecuta `python manage.py makemigrations`
3. Ejecuta `python manage.py migrate`
4. Actualiza el frontend para incluir los nuevos campos

### Personalizar Estilos

Los estilos están organizados en archivos CSS separados:
- `estilos.css` - Estilos generales y layout
- `formularios.css` - Estilos específicos de formularios
- `mensajes.css` - Estilos de mensajes de éxito/error

## Tecnologías Utilizadas

- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Backend**: Django 5.2, Django REST Framework
- **Base de Datos**: SQLite
- **APIs**: REST API con soporte CORS

## Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.