# Vibra - Plataforma de Aprendizaje con Videos (ES / PT)

Aplicación web móvil (PWA) lista para desplegar en GitHub Pages y Render.

## Archivos incluidos en este paquete
- `index.html`: Estructura principal con logo integrado, selector ES/PT, espacios no intrusivos para Monetag y reproductor YouTube IFrame API.
- `styles.css`: Diseño oscuro móvil responsive.
- `courses-data.js`: 11 áreas de cursos completos con videos reales en Portugués/Español.
- `app.js`: Lógica de reproducción oficial de YouTube, contador de minutos diarios, racha, notas en `localStorage` y buscador opcional con YouTube Data API v3.
- `terminos.html`: Página bilingüe (PT/ES) de Términos de Uso y Política de Privacidad.
- `logo.png`: Logotipo oficial de Vibra recortado a 512x512 px.
- `manifest.json`: Configuración PWA para instalar en Android.

## Cómo configurar Monetag
Pega tus códigos de banner de Monetag dentro de los contenedores `id="monetag-top-banner"` e `id="monetag-bottom-banner"` en `index.html`.
