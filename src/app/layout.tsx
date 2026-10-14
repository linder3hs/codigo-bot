import type { Metadata, Viewport } from "next";
import { Fraunces, Karla, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { bot, SITIO } from "@/bot.config";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITIO),
  title: {
    default: bot.titulo,
    template: `%s · ${bot.nombre}`,
  },
  description: bot.descripcion,
  applicationName: bot.nombre,
  category: "education",
  keywords: bot.keywords,
  authors: [{ name: bot.autor }],
  creator: bot.autor,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITIO,
    siteName: bot.nombre,
    title: bot.titulo,
    description: bot.descripcion,
  },
  twitter: {
    card: "summary_large_image",
    title: bot.titulo,
    description: bot.descripcion,
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
