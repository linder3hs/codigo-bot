# Desplegar en Vercel

[Vercel](https://vercel.com) es la forma más fácil de publicar este proyecto (el plan gratuito alcanza para empezar).

## Opción A: desde GitHub (recomendada)

1. Sube tu bot a tu propio repositorio de GitHub.
2. En [vercel.com/new](https://vercel.com/new) elige **Import** sobre tu repositorio.
3. Antes de pulsar **Deploy**, abre **Environment Variables** y agrega:

   | Nombre | Valor |
   | --- | --- |
   | `DEEPSEEK_API_KEY` | tu key de DeepSeek |
   | `NEXT_PUBLIC_SITE_URL` | la URL final, ej. `https://mi-bot.vercel.app` |

4. Pulsa **Deploy**. Cada `git push` a `main` publica automáticamente.

> Si todavía no sabes tu URL, despliega primero, copia el dominio que te da Vercel, agrégalo en **Settings → Environment Variables** y haz **Redeploy**.

## Opción B: desde la terminal

```bash
npm i -g vercel
vercel          # primer deploy (preview)
vercel env add DEEPSEEK_API_KEY
vercel env add NEXT_PUBLIC_SITE_URL
vercel --prod   # producción
```

## Dominio propio

En el panel de Vercel: **Settings → Domains**. Después actualiza `NEXT_PUBLIC_SITE_URL` con tu dominio y haz Redeploy, para que el sitemap y la imagen de redes usen la URL correcta.

## Otras plataformas

Es una app Next.js normal: funciona en cualquier host que corra Node.js (`npm run build` y `npm start`). Recuerda definir las mismas variables de entorno.

## Antes de publicar

- [ ] Tu key **no** está en el repositorio (`git grep sk-` no debe devolver nada).
- [ ] Pusiste un **límite de gasto** en tu cuenta del proveedor de IA.
- [ ] Probaste que el bot rechaza preguntas fuera de tema.
- [ ] `NEXT_PUBLIC_SITE_URL` apunta a tu dominio real.
