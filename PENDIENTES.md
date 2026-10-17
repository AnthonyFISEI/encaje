# Pendientes / Observaciones

**Registrado:** 10 de Septiembre de 2026 (revisión de `CONTEXT.md` y `progress_status.md` contra el código)

## Documentación desactualizada
- [ ] `CONTEXT.md` y `progress_status.md` describen dos versiones (premium + réplica `/replica-wp` con `LayoutWpReplica.astro`). La réplica fue eliminada y su diseño se fusionó en `Layout.astro` y las páginas principales (clases `wp-replica-*`). Actualizar ambos documentos.
- [ ] `CONTEXT.md` dice Astro v5.x, pero `package.json` usa `astro ^6.4.4`.
- [ ] `migration_plan.md` y `deployment_guide.md` se mencionan pero no existen en el repo.

## Configuración / despliegue
- [ ] Dominio inconsistente: `astro.config.mjs` usa `site: 'https://encaje.ec'`, pero `progress_status.md` dice que el sitemap apunta a `https://app.encaje.ec`. Definir el dominio final.
- [ ] Se menciona `BASE_URL` = `/front/` en producción, pero no hay `base` configurado en `astro.config.mjs`.
- [ ] Hay dos `.htaccess`: el de la raíz reescribe hacia `dist/`; el de `public/` se copia dentro de `dist/`. Aclarar cuál aplica en cada entorno (Laragon vs cPanel).
- [ ] `public/.htaccess` usa `ErrorDocument 404 /404.html`, pero no existe `src/pages/404.astro` → crear página 404.

## ⚠️ Urgente
- [x] ~~El formulario de `/contacto` era una simulación~~ → conectado a la REST API de Contact Form 7 (formulario ID 1587 en `app.encaje.ec`). Al enviarse con éxito dispara `generate_lead` (GA) y `Lead` (Meta).
- [ ] **Los correos del formulario no llegan.** CF7 responde "enviado" (el formulario funciona), pero el correo se pierde entre el hosting (Namecheap) y el destinatario. Config actual de prueba en WP admin → Contacto → formulario 1587 → pestaña "Correo": Para `anthonysebas.pg@gmail.com`, De `[_site_title] <encajeweb@encaje.ec>`, Reply-To `[your-email]`. DNS revisado y correcto (MX Namecheap, SPF y DKIM presentes; sin DMARC). Pasos:
  1. [ ] Revisar Spam y "Todos los correos" en Gmail (buscar `encaje`).
  2. [ ] cPanel → **Track Delivery**: buscar el destinatario y ver si fue aceptado, rechazado o nunca salió.
  3. [ ] cPanel → Cuentas de correo: verificar que exista el buzón `encajeweb@encaje.ec` (crearlo si no).
  4. [ ] Instalar **WP Mail SMTP** → "Other SMTP": host `mail.encaje.ec`, SSL, puerto 465, usuario `encajeweb@encaje.ec` + su contraseña, From Email `encajeweb@encaje.ec` con "Force From Email". Probar con su pestaña "Email Test".
  5. [ ] Cuando llegue: cambiar "Para" a `info@encaje.ec` (o `info@encaje.ec, anthonysebas.pg@gmail.com` para recibir copia).
  6. [ ] Opcional: traducir al español el cuerpo del mensaje (hoy dice "Message Body", "This is a notification...").
  7. [ ] Opcional: añadir un registro DMARC (`_dmarc.encaje.ec`) para mejorar la entrega en Gmail/Outlook.
- [ ] El correo de administración de WordPress (Ajustes → Generales) en la copia local es `dapl@me.com`. Verificar en producción si pertenece al cliente; si es del desarrollador anterior o de la demo, cambiarlo (ahí llegan avisos de seguridad y restablecimientos de contraseña).
- [ ] Antispam: el formulario no tiene captcha. Akismet está instalado en WP; para que CF7 lo use hay que activarlo con su API key y añadir las opciones `akismet:author` / `akismet:author_email` a los campos del formulario en CF7. Alternativa: Cloudflare Turnstile si llega spam.

## Analítica
- [x] ~~Rellenar IDs de GA/Pixel~~ → IDs reales del cliente cargados en `.env` (`G-1LGPM21QPS` / `1763860834593545`). Falta agregarlos también en el `.env` del servidor de producción antes del próximo build.
- [x] Eventos de Meta conectados (con su equivalente en GA4 entre paréntesis):
  - **Contact** (`generate_lead`): clic en WhatsApp, email o teléfono (global, `Analytics.astro`).
  - **Lead** (`generate_lead`): envío exitoso del formulario de contacto.
  - **ViewContent** (`view_item`): al abrir una ficha de proyecto o un artículo de blog.
  - **FindLocation** (`find_location`): clic en "Cómo llegar" (nuevo enlace junto al mapa en `/contacto`).
  - **Completar registro** y **Programar**: no agregados. El sitio no tiene formulario de registro ni sistema de citas/agendamiento — no hay una acción real que disparen. Si el cliente agrega alguna (ej. "Agendar visita a obra"), avisar para conectarla.
- [ ] Privacidad: la LOPDP de Ecuador pide informar el uso de cookies/seguimiento. Considerar política de privacidad + aviso de cookies (y en ese caso cargar GA/Pixel solo tras aceptar).

## Riesgos en el código
- [ ] `WpSlider.astro`: las imágenes de fallback ahora usan `${BACKEND_URL}`. Si se compila con el `.env` local, el HTML de producción probablemente apuntará a `http://encaje-wp.test` (sin verificar). Lo mismo aplica a otras imágenes con `${BACKEND_URL}` (ej. sección "Entorno y la Sociedad" en `index.astro`). Revisar que el build de producción use la URL real del backend.

- [x] ~~Fichas de proyecto/blog limitadas a 10~~ → resuelto con `fetchAllWp()` en `src/lib/wordpress.js` (pagina toda la colección). Aplicado en fichas y listados de proyectos/blog, categorías y sliders.
- [ ] La portada (`index.astro`) sigue pidiendo solo 10 proyectos (`per_page=10`) para "Destacados"/galería. Es intencional como vitrina, pero si se quiere mostrar todos o elegir destacados desde WP habría que cambiarlo.

## Limpieza
- [ ] Comentario obsoleto en `src/layouts/Layout.astro` (~línea 379) que menciona `LayoutWpReplica.astro`.
- [ ] Archivos sobrantes de la plantilla de Astro: `src/components/Welcome.astro`, `src/assets/astro.svg`, `src/assets/background.svg`.
- [ ] Logos duplicados en `public/`: `_logo.svg`, `__logo.svg` (verificar si se usan antes de borrar).
