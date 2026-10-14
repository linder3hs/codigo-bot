'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useEffect, useRef, useState } from 'react';
import { Streamdown } from 'streamdown';
import { createCodePlugin } from '@streamdown/code';
import { bot } from '@/bot.config';

// tema oscuro fijo para los bloques de código (la página es papel claro)
const codePlugin = createCodePlugin({ themes: ['vesper', 'vesper'] });

export default function Home() {
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });
  const [input, setInput] = useState('');
  const bottom = useRef<HTMLDivElement>(null);
  const loading = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    bottom.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, loading]);

  function enviar(texto: string) {
    const t = texto.trim();
    if (!t || loading) return;
    sendMessage({ text: t });
    setInput('');
  }

  return (
    <div className="flex min-h-dvh flex-col">
      {/* ── Cabecera ─────────────────────────────────────────── */}
      <header className="sticky top-0 z-20 border-b border-rule bg-paper/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-5 py-3.5">
          <span className="grid size-9 place-items-center rounded-md bg-ink font-mono text-sm text-paper-2 shadow-[3px_3px_0_var(--vermilion)]">
            {'{}'}
          </span>
          <div className="leading-tight">
            <h1 className="font-display text-[1.3rem] font-semibold tracking-tight text-ink">
              {bot.nombre}
            </h1>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-ink-soft">
              {bot.etiqueta}
            </p>
          </div>
          <span className="ml-auto hidden font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-soft sm:block">
            pregunta sin miedo
          </span>
        </div>
      </header>

      {/* ── Conversación ─────────────────────────────────────── */}
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-10 pt-8">
        {messages.length === 0 ? (
          <div className="rise">
            <p className="font-display text-3xl leading-[1.15] tracking-tight text-ink sm:text-[2.6rem]">
              {bot.titular.inicio}{' '}
              <em className="text-vermilion not-italic">
                {bot.titular.destacada}
              </em>
              <br />
              {bot.titular.fin}
            </p>
            <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-ink-soft">
              {bot.bienvenida}
            </p>

            <ul className="mt-8 border-t border-rule">
              {bot.sugerencias.map((s, i) => (
                <li
                  key={s}
                  className="rise border-b border-rule"
                  style={{ animationDelay: `${120 + i * 70}ms` }}
                >
                  <button
                    onClick={() => enviar(s)}
                    className="group flex w-full items-baseline gap-4 py-3.5 text-left transition-[padding] duration-200 hover:pl-2"
                  >
                    <span className="font-mono text-[0.7rem] text-ink-soft transition-colors group-hover:text-vermilion">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 text-[0.95rem] text-ink-2 transition-colors group-hover:text-ink">
                      {s}
                    </span>
                    <span className="font-mono text-sm text-rule transition-colors group-hover:text-vermilion">
                      ↵
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="space-y-7">
            {messages.map((m) => {
              const texto = m.parts
                .filter((p) => p.type === 'text')
                .map((p) => p.text)
                .join('');

              if (m.role === 'user') {
                return (
                  <div key={m.id} className="rise flex justify-end">
                    <p className="max-w-[85%] rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-[0.95rem] leading-relaxed text-paper-2">
                      {texto}
                    </p>
                  </div>
                );
              }

              return (
                <article
                  key={m.id}
                  className="rise border-l-2 border-vermilion pl-4 sm:pl-5"
                >
                  <p className="mb-2 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-soft">
                    {bot.nombre}
                  </p>
                  <div className="respuesta">
                    <Streamdown
                      plugins={{ code: codePlugin }}
                      isAnimating={status === 'streaming'}
                    >
                      {texto}
                    </Streamdown>
                  </div>
                </article>
              );
            })}

            {status === 'submitted' && (
              <p className="border-l-2 border-rule pl-4 font-mono text-[0.72rem] uppercase tracking-[0.18em] text-ink-soft sm:pl-5">
                pensando<span className="caret">▍</span>
              </p>
            )}
          </div>
        )}

        {error && (
          <p className="mt-6 border-l-2 border-vermilion bg-vermilion/8 px-4 py-2.5 text-sm text-ink-2">
            {error.message || 'Algo falló. Intenta de nuevo.'}
          </p>
        )}
        <div ref={bottom} className="h-px" />
      </main>

      {/* ── Composer ─────────────────────────────────────────── */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          enviar(input);
        }}
        className="sticky bottom-0 z-20 border-t border-rule bg-paper/90 backdrop-blur-sm"
      >
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-5 py-3.5">
          <span className="font-mono text-sm text-vermilion select-none">›</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={bot.placeholder}
            aria-label="Tu pregunta"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent py-1.5 text-[0.95rem] text-ink outline-none placeholder:text-ink-soft/70"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Enviar pregunta"
            className="grid size-9 shrink-0 place-items-center rounded-full bg-vermilion text-paper-2 transition hover:enabled:-translate-y-0.5 hover:enabled:shadow-[0_3px_0_var(--ink)] disabled:bg-rule disabled:text-paper-2"
          >
            <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
              <path
                d="M5 12h13M12 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <p className="mx-auto max-w-3xl px-5 pb-2.5 font-mono text-[0.6rem] uppercase tracking-[0.15em] text-ink-soft/80">
          {bot.limitePorHora} preguntas por hora · {bot.pie}
        </p>
      </form>
    </div>
  );
}
