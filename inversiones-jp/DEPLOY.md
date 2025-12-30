# Guía de Despliegue en Vercel - Inversiones JP

Esta aplicación está construida con Next.js 14+ y Tailwind CSS, y está lista para desplegarse en Vercel con configuración mínima.

## Pasos para el Despliegue

1.  **Subir a GitHub**
    *   Asegúrate de que tu código esté subido a un repositorio de GitHub (público o privado).
    *   Si creaste la carpeta dentro de otro repo, asegúrate de hacer push de todo.
    *   Nota: Como la app está en una subcarpeta (`inversiones-jp`), Vercel necesitará configuración de "Root Directory".

2.  **Crear Proyecto en Vercel**
    *   Ve a [Vercel Dashboard](https://vercel.com/dashboard).
    *   Haz clic en **"Add New..."** -> **"Project"**.
    *   Importa tu repositorio de GitHub `Gestion_eventos` (o el nombre que tenga).

3.  **Configurar Root Directory**
    *   Vercel detectará que tienes múltiples carpetas o te preguntará.
    *   En la sección **Framework Preset**, asegúrate de que diga **Next.js**.
    *   En **Root Directory**, haz clic en "Edit" y selecciona la carpeta `inversiones-jp`.

4.  **Configurar Variables de Entorno**
    *   Esta aplicación usa `LocalStorage`, por lo que **NO requiere** variables de entorno de base de datos por ahora.
    *   Si en el futuro usas Supabase, aquí agregarías `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

5.  **Desplegar**
    *   Haz clic en **"Deploy"**.
    *   Espera a que termine el proceso de construcción (Build).

## Verificación

*   Una vez desplegado, Vercel te dará una URL (ej. `inversiones-jp.vercel.app`).
*   Entra y prueba agregar un producto desde `/admin` (recuerda que los datos se guardan en el navegador de quien los agrega, para una demo real compartida necesitarías una base de datos real como Supabase).

## Nota Importante sobre Persistencia

Actualmente, la aplicación usa **LocalStorage**. Esto significa que:
*   Si agregas un producto desde tu computadora, **SOLO TÚ** lo verás.
*   Si abres la página en tu celular, estará vacía hasta que agregues productos desde el celular.
*   **Para producción real**: Se recomienda migrar el `useStore` para usar un backend real (Supabase, Firebase o API propia).
