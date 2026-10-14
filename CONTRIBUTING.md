# Cómo contribuir

¡Gracias por querer mejorar el proyecto! Todo aporte ayuda: código, documentación o reportar un problema.

## Reportar un bug o proponer una idea

Abre un [issue](../../issues) con:

- Qué esperabas que pasara y qué pasó.
- Pasos para reproducirlo.
- Tu versión de Node (`node -v`) y sistema operativo.

**Nunca pegues tu API key** en un issue.

## Enviar un pull request

1. Haz fork y crea una rama: `git checkout -b mi-mejora`.
2. `npm install` y `npm run dev`.
3. Haz tu cambio, pequeño y enfocado en una sola cosa.
4. Verifica que pasan `npm run lint` y `npm run build`.
5. Abre el PR explicando el qué y el porqué.

## Criterios

- Cambios simples y legibles antes que abstracciones.
- Personalización por `src/bot.config.ts` / `src/bot.prompt.ts`, sin textos de marca fijos en el código.
- Documentación en español.

## Ideas para empezar

- Guardar el historial de chat.
- Límite de preguntas con Redis.
- Modo oscuro.
- Botón para copiar el código de las respuestas.
