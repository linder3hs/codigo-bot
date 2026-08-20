import { ImageResponse } from "next/og";

export const alt = "Código Bot · Tutor de Frontend, Backend y Vercel";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori solo usa las fuentes que le pasamos, así que las bajamos de Google Fonts.
async function googleFont(query: string) {
  const css = await fetch(`https://fonts.googleapis.com/css2?family=${query}`, {
    headers: { "User-Agent": "Mozilla/5.0" },
  }).then((r) => r.text());
  const url = css.match(/src: url\((.+?)\)/)?.[1];
  if (!url) throw new Error(`No se encontró la fuente ${query}`);
  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function Image() {
  const [display, mono] = await Promise.all([
    googleFont("Fraunces:opsz,wght@9..144,600"),
    googleFont("JetBrains+Mono:wght@700"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f6efe3",
          color: "#191510",
          padding: "72px 80px",
          fontFamily: "Fraunces",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#191510",
              color: "#fffbf2",
          }}
        >
          {/* dos spans: pegadas, las llaves de JetBrains Mono se ven como un 8 */}
          <div
            style={{
              display: "flex",
              gap: 7,
              fontFamily: "JetBrains Mono",
              fontSize: 24,
            }}
          >
            <span>{"{"}</span>
            <span>{"}"}</span>
          </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 38, letterSpacing: "-0.02em" }}>
              Código Bot
            </div>
            <div
              style={{
                fontFamily: "JetBrains Mono",
                fontSize: 17,
                color: "#7a6e59",
                letterSpacing: 5,
              }}
            >
              FRONTEND · BACKEND · VERCEL
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 94,
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
          }}
        >
          <div style={{ display: "flex", gap: 26 }}>
            <span>¿Qué</span>
            <span style={{ color: "#cf3f18" }}>no</span>
          </div>
          <div style={{ display: "flex" }}>entendiste hoy?</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 120, height: 5, background: "#cf3f18" }} />
          <div style={{ fontSize: 26, color: "#3d362a" }}>
            Tu tutor de código, en español simple.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Fraunces", data: display, style: "normal", weight: 600 },
        { name: "JetBrains Mono", data: mono, style: "normal", weight: 700 },
      ],
    },
  );
}
