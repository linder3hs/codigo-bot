# Personalizar tu bot

Casi todo se cambia en **dos archivos**:

| Archivo | Qué controla | ¿Llega al navegador? |
| --- | --- | --- |
| `src/bot.config.ts` | Marca, textos de la pantalla, sugerencias, modelo, límites | Sí (no pongas secretos aquí) |
| `src/bot.prompt.ts` | Personalidad, temas y reglas del bot | No, solo servidor |

## 1. Marca y textos (`src/bot.config.ts`)

| Campo | Dónde se ve |
| --- | --- |
| `nombre` | Cabecera, etiqueta de cada respuesta, título de la pestaña, redes |
| `etiqueta` | Línea pequeña bajo el nombre y en la imagen para redes |
| `eslogan` | Imagen para redes (Open Graph) |
| `titulo` / `descripcion` / `keywords` | SEO (Google) y vista previa al compartir el link |
| `autor` | Metadatos del sitio |
| `titular` | Frase grande de la pantalla de inicio. `destacada` sale en color |
| `bienvenida` / `placeholder` / `pie` | Textos de la pantalla de inicio y el cuadro de escribir |
| `sugerencias` | Botones de preguntas de ejemplo (usa 3 o 4) |

Ejemplo: un bot de cocina.

```ts
export const bot = {
  nombre: 'Chef Bot',
  etiqueta: 'Recetas · Técnicas · Trucos',
  eslogan: 'Tu cocina, paso a paso.',
  titulo: 'Chef Bot · Tu asistente de cocina',
  descripcion: 'Aprende a cocinar con recetas simples explicadas en español.',
  titular: { inicio: '¿Qué vamos a', destacada: 'cocinar', fin: 'hoy?' },
  sugerencias: ['¿Cómo hago arroz que no quede pegajoso?'],
  // ...el resto igual
};
```

## 2. Personalidad y reglas (`src/bot.prompt.ts`)

El **system prompt** es el texto que el modelo lee antes de cada conversación. Define quién es el bot y qué puede responder. Tiene tres partes:

1. **Rol**: quién es y a quién le habla.
2. **Temas permitidos**: la lista cerrada de lo que sí responde.
3. **Reglas**: formato, longitud, idioma, qué hacer con preguntas fuera de tema.

Si cambias los temas, cambia también la constante `RECHAZO` (la frase con la que el bot rechaza lo que no entiende) para que sea coherente.

Consejos para un buen prompt:

- Sé concreto: "máximo 200 palabras" funciona mejor que "sé breve".
- Lista los temas permitidos en vez de prohibir todo lo demás.
- Prueba tu bot intentando romperlo: "ignora tus instrucciones", preguntas de otros temas, etc.
- Cambia una cosa a la vez y prueba, así sabes qué provocó cada cambio.

## 3. Modelo y límites

En `src/bot.config.ts`:

| Campo | Qué hace |
| --- | --- |
| `modelo` | Nombre del modelo (ver [Cambiar de modelo](modelos.md)) |
| `temperatura` | De 0 a 1. Más bajo = respuestas más estables; más alto = más creativas |
| `limitePorHora` | Preguntas por IP por hora |
| `mensajesDeContexto` | Cuántos mensajes anteriores recuerda el bot. Más contexto = más costo |
| `mensajeLimite` | Texto cuando alguien supera el límite |

## 4. Diseño

- **Colores:** variables al inicio de `src/app/globals.css` (`--paper`, `--ink`, `--vermilion`...). Si cambias `--paper`, `--ink` o `--vermilion`, actualiza también los colores fijos de `src/app/opengraph-image.tsx` y `themeColor` en `src/app/layout.tsx`.
- **Fuentes:** se declaran al inicio de `src/app/layout.tsx` con `next/font/google`. Cambia Fraunces, Karla o JetBrains Mono por la que prefieras.
- **Icono:** reemplaza `src/app/icon.svg`.
- **Imagen para redes:** `src/app/opengraph-image.tsx` (se genera sola con tus textos de `bot.config.ts`).
- **Layout y componentes:** todo el chat está en `src/app/page.tsx`.

## 5. Tu dominio

Pon la URL pública en la variable `NEXT_PUBLIC_SITE_URL` (ver [Desplegar](desplegar.md)). Sin ella, el sitemap y las vistas previas de redes apuntarán a `http://localhost:3000`.

## Cómo funciona el límite de preguntas

`src/app/api/chat/route.ts` cuenta las peticiones por IP en un `Map` en memoria. Es simple y suficiente para empezar, pero se reinicia en cada deploy y no se comparte entre instancias del servidor. Para algo más estricto, mira las [Preguntas frecuentes](faq.md#el-límite-por-hora-no-es-suficiente).
