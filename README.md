# Código Bot

Plantilla open source para crear **tu propio bot de chat especializado**. La versión original es un tutor de Frontend, Backend y Vercel para gente que está aprendiendo a programar con IA, pero puedes convertirlo en un tutor de cocina, un asistente de tu negocio o lo que quieras cambiando un par de archivos.

**Stack:** Next.js (App Router) · Vercel AI SDK · DeepSeek · Tailwind CSS · Streamdown (markdown en streaming).

## Qué incluye

- Chat con respuestas en streaming y bloques de código con colores.
- Un solo lugar para la marca, textos y límites: [`src/bot.config.ts`](src/bot.config.ts).
- Un solo lugar para la personalidad y reglas del bot: [`src/bot.prompt.ts`](src/bot.prompt.ts).
- Límite de preguntas por IP, SEO, sitemap e imagen para redes sociales (Open Graph) ya configurados.

## Empezar en 5 minutos

Necesitas [Node.js](https://nodejs.org) 20 o superior y una API key de [DeepSeek](https://platform.deepseek.com/api_keys).

```bash
git clone https://github.com/linder3hs/codigo-bot.git mi-bot
cd mi-bot
npm install
cp .env.example .env.local
```

Abre `.env.local` y pon tu key:

```bash
DEEPSEEK_API_KEY=sk-...
```

Arranca:

```bash
npm run dev
```

Abre <http://localhost:3000> y pregúntale algo.

## Hazlo tuyo

1. Edita [`src/bot.config.ts`](src/bot.config.ts): nombre, descripción, sugerencias, límites.
2. Edita [`src/bot.prompt.ts`](src/bot.prompt.ts): temas permitidos, tono y reglas.
3. Cambia los colores en `src/app/globals.css` y el icono en `src/app/icon.svg`.
4. Despliégalo en Vercel y pon tu dominio en `NEXT_PUBLIC_SITE_URL`.

## Documentación

| Guía | Para qué sirve |
| --- | --- |
| [Personalizar tu bot](docs/personalizar.md) | Nombre, prompt, colores, fuentes, límites e icono |
| [Cambiar de modelo](docs/modelos.md) | Usar OpenAI, Anthropic, Google u otro en vez de DeepSeek |
| [Desplegar en Vercel](docs/desplegar.md) | Publicar tu bot y configurar variables de entorno |
| [Estructura del proyecto](docs/estructura.md) | Qué hace cada archivo |
| [Preguntas frecuentes](docs/faq.md) | Errores comunes y costos |
| [Cómo contribuir](CONTRIBUTING.md) | Reportar bugs y enviar pull requests |

## Scripts

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo en <http://localhost:3000> |
| `npm run build` | Build de producción |
| `npm start` | Corre el build de producción |
| `npm run lint` | Revisa el código con ESLint |

## Importante antes de publicar tu bot

- **Tu API key es tuya y cuesta dinero.** Nunca la subas a GitHub: `.env*` ya está en `.gitignore`.
- El límite de preguntas vive en memoria y se reinicia en cada deploy. Para producción seria mira [Preguntas frecuentes](docs/faq.md#el-límite-por-hora-no-es-suficiente).
- El prompt reduce, pero no elimina, que alguien lo esquive. Pon un límite de gasto en tu cuenta del proveedor.

## Licencia

[MIT](LICENSE). Úsalo, modifícalo y compártelo libremente. Si te sirvió, una ⭐ en el repo se agradece.
