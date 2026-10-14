// ──────────────────────────────────────────────────────────────────
// Configuración de tu bot. Edita SOLO este archivo (y bot.prompt.ts)
// para convertir este proyecto en tu propio bot.
// Guía completa: docs/personalizar.md
// ──────────────────────────────────────────────────────────────────

export const bot = {
  // ── Marca ──────────────────────────────────────────────
  nombre: 'Código Bot',
  etiqueta: 'Frontend · Backend · Vercel', // línea pequeña bajo el nombre
  eslogan: 'Tu tutor de código, en español simple.', // imagen para redes (Open Graph)
  titulo: 'Código Bot · Tutor de Frontend, Backend y Vercel', // <title> y redes
  descripcion:
    'Bot que explica programación en español simple para quienes recién empiezan: HTML, CSS, JavaScript, React, Next.js, Node, Python, bases de datos y deploy en Vercel. Pregúntale qué stack usar para tu proyecto.',
  autor: 'Linder Hassinger',
  keywords: [
    'aprender a programar',
    'tutor de programación',
    'vibecoding',
    'frontend',
    'backend',
    'Next.js',
    'React',
    'bases de datos',
    'deploy en Vercel',
    'qué stack usar',
    'programación en español',
  ],

  // ── Pantalla de inicio ─────────────────────────────────
  // Se muestra como: "{inicio} {destacada}" / "{fin}"  (la destacada va en color)
  titular: { inicio: '¿Qué', destacada: 'no', fin: 'entendiste hoy?' },
  bienvenida:
    'No hay preguntas tontas. Escribe lo que sea de frontend, backend, bases de datos o deploy en Vercel.',
  placeholder: 'Escribe tu pregunta…',
  pie: 'solo temas de código', // junto al límite: "25 preguntas por hora · solo temas de código"
  sugerencias: [
    '¿Qué es una base de datos y cuándo la necesito?',
    '¿Qué stack me recomiendas para una app de reservas?',
    'Explícame qué es una API como si tuviera 10 años',
    '¿Cuál es la diferencia entre frontend y backend?',
  ],

  // ── Modelo y límites ───────────────────────────────────
  // Para cambiar de proveedor mira docs/modelos.md
  modelo: 'deepseek-chat',
  temperatura: 0.3,
  limitePorHora: 25, // preguntas por IP por hora (en memoria, ver docs/personalizar.md)
  mensajesDeContexto: 12, // cuántos mensajes previos se envían al modelo
  mensajeLimite: 'Llegaste al límite de preguntas por hora. Intenta más tarde 🙂',
};

// URL pública del sitio (para SEO, sitemap y Open Graph).
// Defínela en .env como NEXT_PUBLIC_SITE_URL cuando despliegues.
export const SITIO = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
).replace(/\/$/, '');
