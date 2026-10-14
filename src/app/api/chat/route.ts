import { deepseek } from '@ai-sdk/deepseek';
import { convertToModelMessages, streamText, type UIMessage } from 'ai';
import { bot } from '@/bot.config';
import { SYSTEM } from '@/bot.prompt';

export const maxDuration = 60;

// ponytail: rate limit en memoria — se resetea en cada deploy y no se comparte entre instancias.
// Si de verdad hace falta, cambiar a Upstash Redis.
const LIMIT = bot.limitePorHora;
const WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > LIMIT;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';

  if (rateLimited(ip)) {
    return new Response(bot.mensajeLimite, { status: 429 });
  }

  const { messages }: { messages: UIMessage[] } = await req.json();

  const modelMessages = await convertToModelMessages(messages.slice(-bot.mensajesDeContexto));

  const result = streamText({
    model: deepseek(bot.modelo),
    system: SYSTEM,
    messages: modelMessages,
    temperature: bot.temperatura,
  });

  return result.toUIMessageStreamResponse();
}
