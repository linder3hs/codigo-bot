# Preguntas frecuentes

## Me sale un error de API key al preguntar

Revisa que `.env.local` exista en la raíz, que tenga `DEEPSEEK_API_KEY=...` sin comillas ni espacios, y **reinicia** `npm run dev` (las variables solo se leen al arrancar).

## ¿Cuánto cuesta?

El código es gratis. Pagas lo que cobre tu proveedor de IA por uso; DeepSeek es de los más baratos. Mira su página de precios y pon un límite de gasto en tu cuenta.

## El bot responde cosas fuera de tema

Ningún prompt es infalible. Prueba:

- Haz la lista de temas permitidos más concreta en `src/bot.prompt.ts`.
- Baja `temperatura` en `src/bot.config.ts`.
- Prueba otro modelo (ver [Cambiar de modelo](modelos.md)).

## El límite por hora no es suficiente

El límite actual está en memoria: se reinicia en cada deploy y cada instancia del servidor cuenta aparte. Para un límite real usa una base de datos compartida, por ejemplo [Upstash Redis](https://upstash.com) con `@upstash/ratelimit` desde el Marketplace de Vercel, y reemplaza la función `rateLimited` de `src/app/api/chat/route.ts`.

## ¿Puedo guardar el historial de conversaciones?

No viene incluido: la conversación vive en el navegador y se pierde al recargar. Es un buen primer cambio si quieres aprender: guárdala en una base de datos (Postgres, Supabase…) desde `route.ts`.

## ¿Puedo cobrar por usar mi bot?

Sí, la licencia MIT lo permite. Ten en cuenta que tendrás que añadir cuentas de usuario y pagos tú mismo.

## `npm run build` falla descargando fuentes

`next/font/google` y la imagen para redes descargan fuentes de Google al compilar. Necesitas conexión a internet en el build.

## ¿Cómo actualizo mi bot con cambios de este repo?

```bash
git remote add upstream https://github.com/linder3hs/codigo-bot.git
git fetch upstream
git merge upstream/main
```

Como tu personalización vive casi toda en `src/bot.config.ts` y `src/bot.prompt.ts`, los conflictos serán pocos.
