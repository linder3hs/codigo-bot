import type { Metadata, Viewport } from "next";
import { Fraunces, Karla, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-code",
  subsets: ["latin"],
});

const SITIO = "https://codigo-bot-five.vercel.app";
const TITULO = "Código Bot · Tutor de Frontend, Backend y Vercel";
const DESCRIPCION =
  "Bot que explica programación en español simple para quienes recién empiezan: HTML, CSS, JavaScript, React, Next.js, Node, Python, bases de datos y deploy en Vercel. Pregúntale qué stack usar para tu proyecto.";

export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: {
    default: TITULO,
    template: "%s · Código Bot",
  },
  description: DESCRIPCION,
  applicationName: "Código Bot",
  category: "education",
  keywords: [
    "aprender a programar",
    "tutor de programación",
    "vibecoding",
    "frontend",
    "backend",
    "Next.js",
    "React",
    "bases de datos",
    "deploy en Vercel",
    "qué stack usar",
    "programación en español",
  ],
  authors: [{ name: "Linder Hassinger" }],
  creator: "Linder Hassinger",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITIO,
    siteName: "Código Bot",
    title: TITULO,
    description: DESCRIPCION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: DESCRIPCION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#f6efe3",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${karla.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
