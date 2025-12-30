# Cómo Publicar en Internet (Vercel)

Para que tu sistema esté "prendido" siempre y accesible desde cualquier lugar, usaremos **Vercel**, que es gratuito y es la mejor opción para Next.js.

## Paso 1: Subir tu código a GitHub
Ya he guardado (commit) todos los cambios que hicimos hoy. Ahora solo necesitas enviarlos a la nube (GitHub).

1. Abre tu terminal (donde corres el proyecto).
2. Detén el servidor si está corriendo (Ctrl + C).
3. Escribe el siguiente comando y dale Enter:
   ```bash
   git push origin main
   ```
   *(Si te pide contraseña o autenticación, sigue los pasos que te indique la ventana).*

## Paso 2: Crear el Proyecto en Vercel
1. Entra a [vercel.com](https://vercel.com) y crea una cuenta (puedes iniciar sesión con tu GitHub, es lo más fácil).
2. En tu "Dashboard" (panel principal), haz clic en el botón **"Add New..."** -> **"Project"**.
3. Verás una lista de tus repositorios de GitHub. Busca **`Gestion_eventos`** y dale clic al botón **"Import"**.

## Paso 3: Configurar el Proyecto
Vercel detectará que estás usando Next.js. Solo hay un detalle importante: tu proyecto está en una carpeta llamada `inversiones-jp`, no en la raíz.

1. En la pantalla de "Configure Project":
   - Busca donde dice **"Root Directory"** (Directorio Raíz).
   - Dale clic a **"Edit"**.
   - Selecciona la carpeta **`inversiones-jp`**.
2. Dale clic a **"Deploy"**.

## Paso 4: ¡Listo!
Vercel tardará unos minutos en "construir" (Build) tu página. Cuando termine, te dará un **Link** (ejemplo: `inversiones-jp.vercel.app`).

¡Ese link es el que puedes compartir con tus clientes! La página estará activa las 24 horas.

---
**Nota:** Cada vez que hagamos cambios aquí y tú hagas `git push`, Vercel actualizará tu página automáticamente en unos minutos.
