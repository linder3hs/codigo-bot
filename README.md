# Código Bot

Tutor de Frontend, Backend y Vercel para alumnos vibecoders. Next.js + AI SDK + DeepSeek.

## Correr

1. Pon tu key en `.env`: `DEEPSEEK_API_KEY=sk-...`
2. `npm run dev` → http://localhost:3000

## Deploy

`vercel` y agrega `DEEPSEEK_API_KEY` en las env vars del proyecto.

## Límites

- Solo responde de Frontend, Backend, bases de datos y Vercel (system prompt en `src/app/api/chat/route.ts`).
- 25 preguntas por IP por hora (en memoria).
