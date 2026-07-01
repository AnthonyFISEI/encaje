# Contexto del Proyecto: Encaje

## Información General
Este proyecto consiste en migrar el sitio web de **Encaje** (un sitio de soluciones constructivas que muestra obras realizadas como edificios, etc.) desde una plataforma **WordPress + Elementor** hacia una arquitectura moderna con **Astro** (Headless CMS).

## Arquitectura del Sistema
- **Backend (CMS de Contenidos):** WordPress hospedado de forma local mediante **Laragon** (`http://encaje-wp.test`). Los proyectos se manejan como un Custom Post Type (CPT) llamado `project` expuesto en la REST API bajo `/wp-json/wp/v2/projects` (vía un MU-plugin `enable-rest-api.php`).
- **Frontend:** Astro (SSG - Static Site Generation) para velocidad máxima y SEO optimizado. Consumirá los datos a través de la REST API de WordPress local.
- **Despliegue Final (cPanel):** 
  * **Frontend (Astro):** Los archivos estáticos compilados (directorio `dist/`) se ubican en la carpeta raíz `public_html` del dominio principal (`https://encaje.ec`).
  * **Backend (WordPress):** La instalación de WordPress se despliega en un subdominio exclusivo (ej: `https://backend.encaje.ec` o `https://admin.encaje.ec`), apuntando a una subcarpeta aislada (ej. `public_html/backend`).

## Tecnologías Utilizadas
- **Node.js:** v24.13.0
- **NPM:** v11.6.2
- **Astro:** v5.x
- **Laragon:** Servidor local WAMP para levantar el backend de WordPress.
- **WPvivid:** Backup original restaurado de forma manual (DB y wp-content) por incompatibilidad de formato del core.

## Plan de Despliegue en cPanel
1. **Preparar Subdominio:** Crear el subdominio de backend en cPanel (ej. `backend.encaje.ec`) asignándole una carpeta dedicada (ej. `/public_html/backend` o `/backend`).
2. **Subir WordPress:** Copiar la instalación de WordPress a dicha carpeta y configurar su base de datos.
3. **Redirección de Tráfico:** Utilizar el plugin Must-Use (`headless-setup.php`) para redirigir todo el tráfico del frontend de WordPress al dominio principal de Astro (`https://encaje.ec`), exceptuando el panel de administración (`wp-admin`), inicio de sesión (`wp-login.php`), previsualizaciones de Elementor y peticiones REST API.
4. **Compilar y Subir Astro:** Ejecutar `npm run build` localmente y subir el contenido de la carpeta `dist/` a la raíz de `public_html` del dominio principal.
5. **Configuración de Apache:** Añadir un archivo `.htaccess` en la raíz de `public_html` para manejar errores 404 dinámicos y redirecciones de slash.

## Estado de Avance y Continuación
- **Últimos cambios:**
  - Creadas y alineadas las páginas de "Quiénes Somos" y "Contacto" en el sitio premium y réplica con idénticos textos.
  - Corregidos problemas de diseño en la página de inicio premium (posición de hero, fallback local de proyectos para evitar fallos de conexión y carga de Material Icons).
  - Configurado soporte dinámico multi-entorno para `import.meta.env.BASE_URL` (resolviendo la carga de assets y enlaces en subcarpetas del servidor cPanel como `/front/`).
  - Implementado SEO dinámico integrado con Yoast SEO en la REST API de WordPress, y configurada la generación automática de Sitemaps (`@astrojs/sitemap`) con un archivo `robots.txt` para rastreo.
  - Integrada la optimización automática de imágenes mediante `<Image />` de `astro:assets` en la portada y detalles de proyectos, con dominios remotos configurados (`encaje.ec`, `app.encaje.ec`, `encaje-wp.test`).
  - Implementado JSON-LD con marcado de esquema `ProfessionalService` en la portada para mejorar el posicionamiento SEO local de Encaje.
  - **Sistema de Sliders Dinámicos (CPT Sliders):**
    - Registrado Custom Post Type `slider` y taxonomía jerárquica `slider-location` en WordPress.
    - Creados campos meta `slider_link` y `slider_button_text` expuestos en REST API.
    - Diseñado y desarrollado el componente `<WpSlider location="..." />` en Astro para cargar dinámicamente banners asignados a ubicaciones específicas de WordPress, ordenados por `menu_order`.
    - Implementados fallbacks inteligentes en `<WpSlider />`: si no hay sliders en WordPress, la página de inicio muestra un carrusel por defecto, mientras que las subpáginas (Contacto, Quiénes Somos, etc.) muestran de forma automatizada su banner estático original con breadcrumbs e imágenes SVG.
  - **Botón Flotante de WhatsApp:**
    - Agregado botón flotante interactivo con tooltip y animación pulsante a los layouts generales (`Layout.astro` y `LayoutWpReplica.astro`) conectado al enlace oficial de contacto.
  - **Alineación de Tarjetas de Servicios:**
    - Ajustados los estilos de las tarjetas de servicios de "Quiénes Somos" (sombras, efectos hover, filtros, y alturas iguales mediante CSS Grid) para que coincidan con los de la página de inicio.
- **Punto de reanudación:** 
  - Monitoreo de los sliders dinámicos en producción.
  - Desplegar cambios a producción compilando Astro a la carpeta `dist/`.

