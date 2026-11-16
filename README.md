# Vibra - Plataforma de Aprendizaje con Videos (ES / PT)

Aplicación web móvil (PWA) diseñada para aprender mediante rutas de cursos estructurados en YouTube, pegar enlaces directos, tomar notas por clase y hacer seguimiento de metas diarias.

## Características incluidas
- **11 Áreas de Cursos Completos**: Música (Violão/Guitarra), Idiomas (Inglés), Fitness, Culinaria/Cocina, Electricidad Residencial, Electrónica y Soldadura, Bisutería Artesanal, Mecánica Básica, Barbería y Degradado, Botánica/Huerto e Informática/Web.
- **Reproductor Oficial YouTube IFrame API**: 100% compatible con las políticas de YouTube, contador automático de minutos reales estudiados y reproducción fluida dentro de la app.
- **Bilingüe Dinámico (ES / PT)**: Cambio instantáneo entre Español y Portugués en toda la interfaz y en los títulos/descripciones de los cursos.
- **Notas y Progreso Persistente**: Guarda notas individuales por video, lecciones completadas, racha de días y meta diaria en `localStorage`.
- **Espacios para Banners Monetag No Intrusivos**: Dos contenedores dedicados (`#monetag-top-banner` y `#monetag-bottom-banner`) con etiqueta `AD` y altura fija para evitar saltos de pantalla o bloqueos de contenido.

## Cómo configurar Monetag y YouTube API
1. **Banners de Monetag**: Abre `index.html` y pega tus scripts de banner (ej. In-Page Push o Banner Estático) dentro de los contenedores `id="monetag-top-banner"` e `id="monetag-bottom-banner"`. Se recomienda evitar Popunders agresivos para mantener la experiencia de estudio limpia.
2. **YouTube Data API v3 (Opcional)**: Si deseas activar el buscador integrado dentro de la app, abre `app.js` y coloca tu clave en la constante `YOUTUBE_DATA_API_KEY`.

## Despliegue en GitHub Pages / Render
1. Sube todos los archivos de esta carpeta a un repositorio en GitHub.
2. Activa **GitHub Pages** en *Settings > Pages* (rama `main`, carpeta `/root`) o conéctalo como *Static Site* en Render.
