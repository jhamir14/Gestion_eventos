const API_BASE = (window.location.protocol === 'file:')
  ? 'http://127.0.0.1:8000/api'
  : `${window.location.origin}/api`;

console.log('API Base URL:', API_BASE);

// Registrar Evento (solo en registrar.html)
const formRegistrar = document.getElementById('formRegistrar');
if (formRegistrar) {
    formRegistrar.addEventListener('submit', async function(event) {
        event.preventDefault();
        const payload = {
            nombre: document.getElementById('nombre').value,
            fecha: document.getElementById('fecha').value,
            lugar: document.getElementById('lugar').value,
            descripcion: document.getElementById('descripcion').value,
        };
        try {
            const response = await fetch(`${API_BASE}/eventos/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const errText = await response.text();
                throw new Error(errText || 'Error al registrar');
            }
            await response.json();
            const mensaje = document.getElementById('mensaje');
            if (mensaje) mensaje.innerText = 'Evento registrado correctamente!';
            formRegistrar.reset();
        } catch (error) {
            console.error('Error:', error);
            const mensaje = document.getElementById('mensaje');
            if (mensaje) mensaje.innerText = 'Hubo un error al registrar el evento';
        }
    });
}

// Render helper
function renderEventos(lista) {
    const eventosBody = document.getElementById('eventos-body');
    if (!eventosBody) return;
    eventosBody.innerHTML = '';
    lista.forEach(evento => {
        eventosBody.innerHTML += `
            <tr>
                <td>${evento.nombre}</td>
                <td>${evento.fecha}</td>
                <td>${evento.lugar}</td>
                <td>${evento.descripcion}</td>
                <td>
                    <a href="editar.html?id=${evento.id}" class="btn-edit">Editar</a>
                    <button class="btn-delete" data-id="${evento.id}">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// Cargar lista inicial en index.html
async function cargarEventosInicial(query = '') {
    try {
        console.log('Cargando eventos...');
        const url = `${API_BASE}/eventos/${query ? `?search=${encodeURIComponent(query)}` : ''}`;
        console.log('URL de petición:', url);
        
        const response = await fetch(url);
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error(`Error al cargar eventos: ${response.status} - ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Eventos cargados:', data);
        renderEventos(data);
        
    } catch (e) {
        console.error('Error al cargar eventos:', e);
        const eventosBody = document.getElementById('eventos-body');
        if (eventosBody) {
            eventosBody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; color: red;">
                        Error al cargar eventos: ${e.message}
                    </td>
                </tr>
            `;
        }
    }
}

const buscarInput = document.getElementById('buscar');
if (buscarInput) {
    cargarEventosInicial('');
    buscarInput.addEventListener('input', function() {
        const query = this.value;
        cargarEventosInicial(query);
    });
}

// Delegación para eliminar con confirmación en index.html
const eventosBodyEl = document.getElementById('eventos-body');
if (eventosBodyEl) {
    eventosBodyEl.addEventListener('click', async (e) => {
        const target = e.target;
        if (target && target.classList.contains('btn-delete')) {
            const id = target.getAttribute('data-id');
            const confirmar = window.confirm('¿Deseas eliminar este evento? Esta acción no se puede deshacer.');
            if (!confirmar) return;
            try {
                const resp = await fetch(`${API_BASE}/eventos/${id}/`, { method: 'DELETE' });
                if (!resp.ok && resp.status !== 204) throw new Error('Error al eliminar');
                // Recargar la lista tras eliminar
                const query = buscarInput ? buscarInput.value : '';
                cargarEventosInicial(query);
            } catch (err) {
                console.error(err);
                alert('No se pudo eliminar el evento.');
            }
        }
    });
}

// Utilidad para obtener parámetros de la URL
function getParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
}

// Lógica de edición (prefill + guardar) en editar.html
const formEditar = document.getElementById('formEditar');
if (formEditar) {
    const id = getParam('id');
    const mensaje = document.getElementById('mensaje');
    if (!id) {
        if (mensaje) mensaje.innerText = 'ID de evento no especificado.';
    } else {
        // Prefill
        (async () => {
            try {
                const resp = await fetch(`${API_BASE}/eventos/${id}/`);
                if (!resp.ok) throw new Error('No se pudo cargar el evento');
                const evento = await resp.json();
                document.getElementById('id').value = evento.id;
                document.getElementById('nombre').value = evento.nombre || '';
                document.getElementById('fecha').value = (evento.fecha || '').slice(0, 10);
                document.getElementById('lugar').value = evento.lugar || '';
                document.getElementById('descripcion').value = evento.descripcion || '';
            } catch (err) {
                console.error(err);
                if (mensaje) mensaje.innerText = 'Error al cargar datos del evento.';
            }
        })();

        // Guardar cambios
        formEditar.addEventListener('submit', async (event) => {
            event.preventDefault();
            const payload = {
                nombre: document.getElementById('nombre').value,
                fecha: document.getElementById('fecha').value,
                lugar: document.getElementById('lugar').value,
                descripcion: document.getElementById('descripcion').value,
            };
            try {
                const resp = await fetch(`${API_BASE}/eventos/${id}/`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });
                if (!resp.ok) {
                    const errText = await resp.text();
                    throw new Error(errText || 'Error al guardar cambios');
                }
                if (mensaje) mensaje.innerText = 'Cambios guardados correctamente';
                // Redirigir tras un breve delay
                setTimeout(() => { window.location.href = 'index.html'; }, 800);
            } catch (err) {
                console.error(err);
                if (mensaje) mensaje.innerText = 'No se pudo guardar los cambios.';
            }
        });
    }
}

