# Cambiar de modelo

El bot usa DeepSeek por defecto porque es barato. Gracias al [AI SDK](https://ai-sdk.dev) cambiar de proveedor son 3 pasos y no tocas el resto del código.

## Solo cambiar el modelo de DeepSeek

En `src/bot.config.ts`:

```ts
modelo: 'deepseek-reasoner', // en vez de 'deepseek-chat'
```

Revisa los nombres vigentes en la [documentación de DeepSeek](https://api-docs.deepseek.com).

## Usar otro proveedor (OpenAI, Anthropic, Google…)

Ejemplo con OpenAI:

**1. Instala el paquete del proveedor**

```bash
npm install @ai-sdk/openai
```

Otros: `@ai-sdk/anthropic`, `@ai-sdk/google`, `@ai-sdk/mistral`. Lista completa en la [documentación del AI SDK](https://ai-sdk.dev/providers).

**2. Cambia el import y el modelo en `src/app/api/chat/route.ts`**

```ts
// import { deepseek } from '@ai-sdk/deepseek';
import { openai } from '@ai-sdk/openai';

// ...
model: openai(bot.modelo),
```

**3. Pon el nombre del modelo en `src/bot.config.ts` y la key en `.env.local`**

```ts
modelo: 'gpt-4o-mini',
```

```bash
OPENAI_API_KEY=sk-...
```

Variables que lee cada paquete por defecto:

| Paquete | Variable |
| --- | --- |
| `@ai-sdk/deepseek` | `DEEPSEEK_API_KEY` |
| `@ai-sdk/openai` | `OPENAI_API_KEY` |
| `@ai-sdk/anthropic` | `ANTHROPIC_API_KEY` |
| `@ai-sdk/google` | `GOOGLE_GENERATIVE_AI_API_KEY` |

Si ya no usas DeepSeek, quita `@ai-sdk/deepseek` con `npm uninstall @ai-sdk/deepseek`.

## Usar un modelo local (Ollama)

Con [Ollama](https://ollama.com) corriendo, el paquete `@ai-sdk/openai-compatible` apunta a su API local (`http://localhost:11434/v1`). Sirve para probar sin gastar; no funciona en Vercel porque tu máquina no es accesible desde internet.

## Consejos

- Modelos más grandes responden mejor pero cuestan más. Para un tutor, uno pequeño suele bastar.
- Si cambias de modelo, vuelve a probar tu prompt: cada modelo sigue las reglas de forma distinta.
