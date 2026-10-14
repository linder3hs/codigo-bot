# Estructura del proyecto

```text
.
├── src/
│   ├── bot.config.ts        ← marca, textos, modelo y límites (edítalo)
│   ├── bot.prompt.ts        ← personalidad y reglas del bot (edítalo)
│   └── app/
│       ├── api/chat/route.ts   Endpoint: límite por IP + llamada al modelo + streaming
│       ├── page.tsx            La interfaz del chat (componente de cliente)
│       ├── layout.tsx          Fuentes y metadatos SEO
│       ├── globals.css         Colores y estilos de las respuestas
│       ├── icon.svg            Icono de la pestaña
│       ├── opengraph-image.tsx Imagen al compartir el link (también Twitter)
│       ├── robots.ts           robots.txt
│       └── sitemap.ts          sitemap.xml
├── docs/                    Esta documentación
├── .env.example             Variables de entorno de ejemplo
└── AGENTS.md / CLAUDE.md    Instrucciones para agentes de IA que editen el repo
```

## Cómo viaja una pregunta

1. El usuario escribe en `page.tsx`; el hook `useChat` envía el historial a `POST /api/chat`.
2. `route.ts` revisa el límite por IP y recorta el historial a los últimos `mensajesDeContexto`.
3. `streamText` llama al modelo con el `SYSTEM` de `bot.prompt.ts`.
4. La respuesta vuelve en streaming y `Streamdown` la dibuja como markdown con código coloreado.

## Tecnologías

- [Next.js](https://nextjs.org) (App Router)
- [AI SDK](https://ai-sdk.dev) con `@ai-sdk/deepseek`
- [Tailwind CSS](https://tailwindcss.com) v4
- [Streamdown](https://streamdown.ai) para markdown en streaming
