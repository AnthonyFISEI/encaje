# Estado del Progreso

**Última actualización:** 10 de Junio de 2026

## ✅ Tareas Completadas
1. **Planificación Inicial:** Diseñamos el plan de migración a arquitectura headless (`migration_plan.md`).
2. **Inicialización de Astro:** Se creó el proyecto base de Astro en la carpeta `c:\laragon\www\encaje`.
3. **Restauración de WordPress (Laragon):** Base de datos y archivos de `wp-content` restaurados y operativos localmente.
4. **Habilitación de REST API para Proyectos:** Exposición del Custom Post Type `project` mediante el MU-plugin `enable-rest-api.php`.
5. **Acondicionamiento de Backend Headless:** Plugin MU `headless-setup.php` configurado para redirecciones selectivas.
6. **Réplica de WordPress en Astro:**
   - Creado catálogo de proyectos en `/replica-wp/proyectos` y detalle en `/replica-wp/proyectos/[slug]`.
   - Replicados estilos del tema de WordPress y menús interactivos.
7. **Integración Completa y Premium (Frontend Astro):**
   - Diseñado `Layout.astro` con tipografías premium y estilos globales dark mode.
   - Creado catálogo de proyectos en `/proyectos` y `/proyectos/[slug]`.
8. **Preloader y Ajustes de Diseño:**
   - Centrado de logo y spinner alineados en WordPress y la réplica de Astro.
   - Unificación de paleta en gris carbón (`#242424`) y fondos.
9. **Página "Quiénes Somos":**
   - Creada página de réplica `/replica-wp/quienes-somos` y página premium `/quienes-somos` con idénticos textos e información de WordPress.
10. **Página "Contacto":**
    - Creada página de réplica `/replica-wp/contacto` y premium `/contacto` alineadas en textos.
11. **Sincronización de Portadas**:
    - Rediseñada la página de inicio premium (`src/pages/index.astro`) para incorporar todas las secciones y contenidos oficiales presentes en la réplica de WordPress (Destacados, Quiénes Somos, Servicios, Galería y Cierre).
12. **Corrección de Diseño en Portada Premium**:
    - Corregido el desplazamiento vertical del hero anulando el margen superior de `.content-wrapper` en la portada.
    - Implementados datos locales *fallback* de proyectos para asegurar la visualización y maquetación ante caídas de la base de datos local.
    - Añadida la importación de Material Icons en `Layout.astro` para corregir la visualización de iconos de la galería.
13. **Planificación de Producción**:
    - Creada la guía de despliegue (`deployment_guide.md`) con las estrategias automáticas (GitHub Actions + FTP + Webhooks en WP) y manuales para el entorno de producción.

## ✅ Tareas Completadas Recientemente
14. **Soporte Dinámico de Base URL:** Modificados todos los layouts, páginas y redireccionamientos para concatenar correctamente `import.meta.env.BASE_URL` con formateo del slash (`/front/` en producción, `/` en local) resolviendo problemas de rutas a localhost.
15. **Implementación de SEO Técnico Dinámico:**
    - Creado el componente reusable `<SEO />` en Astro para meta tags, Open Graph y Twitter Cards.
    - Integrados los metadatos dinámicos de la REST API de WordPress (conectado con Yoast SEO) en las páginas de detalle de proyecto.
    - Agregada e configurada la integración `@astrojs/sitemap` con dominio de producción (`https://app.encaje.ec`).
    - Generado el archivo `robots.txt` dinámico apuntando al sitemap oficial.
16. **Optimización de Imágenes:**
    - Modificado `astro.config.mjs` para autorizar la descarga y optimización de recursos remotos desde los dominios de WordPress (`encaje.ec`, `app.encaje.ec`, `encaje-wp.test`).
    - Reemplazadas de forma incremental las etiquetas `<img>` por el componente `<Image />` de `astro:assets` en la portada y detalles de proyectos, logrando reducciones de peso de más del 95% (e.g. imágenes de 400KB convertidas automáticamente a WebP de 11KB).
17. **Datos Estructurados (JSON-LD):**
    - Implementado un bloque de script `application/ld+json` dinámico en la página de inicio (`index.astro`) estructurado según el esquema `ProfessionalService` de Schema.org para mejorar el SEO local de Encaje.
18. **Implementación de Sistema de Blog:**
    - Creadas las páginas de catálogo de blog y de artículos individuales tanto en el sitio premium (`/blog` y `/blog/[slug]`) como en la réplica de WordPress (`/replica-wp/blog` y `/replica-wp/blog/[slug]`).
    - Añadido el enlace de "Blog" a los menús de navegación superior y pie de página en ambos layouts.
    - Integrado fallback offline de artículos para garantizar builds estáticos estables si el backend de WordPress no responde.
19. **Rediseño Fiel y Ajustes de Cabecera/Menú (Réplica WP):**
    - Reemplazado el logo SVG por `logo.png` en el preloader, cabeceras y footer.
    - Implementada animación tipo puzzle en escritorio: la caja del logo se desplaza a la izquierda y el botón de menú baja para revelar la "X" antes de desplegar el panel de menú.
    - Corregidos márgenes verticales y forzada la alineación al inicio (`!important`) del panel gris para remover espacios vacíos innecesarios.
    - Compactado el ancho del panel de menú y la caja del logo a `300px` (y `400px` al abrirse) para evitar que la barra se vea muy extensa.
    - Solucionado desbordamiento de altura del logo añadiendo `max-height: 60px` a `.wp-logo-img` en la cabecera.
    - Refinada la cuadrícula del menú para hacerla sutil (`rgba(255, 255, 255, 0.06)`) y añadir segmentos de guías horizontales estáticos y dinámicos que atraviesan los números y se conectan con el texto y la flecha alineados.
    - Asegurada la alineación de textos multilínea largos (como "Quiénes Somos") mediante la eliminación de `margin-left: auto` y agregando un ancho mínimo de `20px` a `.menu-line-fill` con alineación derecha (`text-align: right`).

## 📌 Estado Actual
- Las portadas, páginas de "Quiénes Somos", "Proyectos", "Blog" y "Contacto" están completamente creadas, alineadas en contenidos en ambos layouts, y con sus respectivos banners y recursos integrados.
- El menú de navegación tipo réplica en escritorio cuenta con una animación puzzle pulida, una cuadrícula técnica refinada, y dimensiones reducidas a `300px` de ancho.
- El build estático de Astro compila con éxito y el servidor de desarrollo local hot-reloadea de forma instantánea.

## 🚀 Siguientes Pasos
1. **Verificar Despliegue en Producción:** Subir la build final a Laragon / producción una vez que el cliente apruebe el diseño visual actual.
2. **Replicar Detalles Adicionales:** Ajustar detalles visuales que el cliente indique en futuras iteraciones.

## 📝 Actualización Reciente (30 de Junio de 2026)
20. **Registro e Integración de Sliders Dinámicos (CPT):**
    - Registrado Custom Post Type `slider` y taxonomía `slider-location` en el backend (`enable-rest-api.php`).
    - Configurado soporte para títulos, editor, orden de página (`menu_order`), enlaces personalizados (`slider_link`) y texto del botón (`slider_button_text`) expuestos a la REST API de WordPress.
21. **Desarrollo de Componente `<WpSlider />` en Astro:**
    - Creado componente interactivo con transición de desvanecimiento suave (fade) y entrada escalonada (staggered delay) de elementos de texto/botones.
    - Implementadas transiciones automáticas por intervalos (6.5s) y control manual ("SIGUIENTE") con reinicio de temporizador.
    - Configurado fallback condicional para ocultar el botón "SIGUIENTE" cuando solo hay 1 slider.
    - Implementado fallback de cabecera estática automática por página (e.g. Contacto, Quiénes Somos) cuando no hay banners asignados en WordPress para evitar sliders vacíos.
22. **Integración en Páginas del Sitio:**
    - Integrado `<WpSlider location="home" />` en la portada.
    - Integrado `<WpSlider location="contacto" />` en la página de Contacto.
    - Integrado `<WpSlider location="quienes-somos" />` en la página de Quiénes Somos.
23. **Botón Flotante de WhatsApp:**
    - Diseñado e implementado botón flotante de WhatsApp en `Layout.astro` y `LayoutWpReplica.astro` con efectos de pulso radial, transiciones e interactividad por tooltip usando la URL oficial del cliente.
24. **Alineación de Estilos de Tarjetas en Quiénes Somos:**
    - Ajustadas las dimensiones, efectos de sombra, filtros de escala de grises y transiciones hover de las tarjetas de la sección "Quiénes Somos" para igualarse exactamente a la página de inicio.
    - Eliminado el contenedor intermedio en la cuadrícula para permitir el auto-estiramiento nativo por CSS Grid.
25. **Categorías de Proyecto Dinámicas:**
    - Corregida la extracción de términos de taxonomía en `index.astro` y `replica-wp/index.astro` para renderizar el nombre de categoría dinámico real provisto por WordPress (desde `_embedded['wp:term']`) en lugar de textos fijos.

