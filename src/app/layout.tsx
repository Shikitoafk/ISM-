import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { Analytics } from "@vercel/analytics/react";

/**
 * The site ships EN / RU / KZ. Russian needs the basic Cyrillic block and
 * Kazakh needs the extended one (Ә Ғ Қ Ң Ө Ұ Ү Һ), so every family below has
 * to declare both subsets or the text drops to a system font mid-sentence.
 * next/font only accepts literal option values, hence the repetition.
 */
const displayFont = Source_Serif_4({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sansFont = Inter({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  variable: "--font-sans",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ISM Olympiad — International Science Movement",
    template: "%s — ISM Olympiad",
  },
  description:
    "Team Interdisciplinary Olympiad in Laboratory Research & Case-Based Science (Biology, Chemistry, Physics, Math, CS) for High School Students.",
  applicationName: "ISM Olympiad",
  keywords: [
    "ISM",
    "Olympiad",
    "Chemistry",
    "Physics",
    "Biology",
    "Mathematics",
    "Computer Science",
    "Laboratory Research",
    "Science Competition",
  ],
  icons: {
    // PNG only: logo.svg is a rough hand-drawn approximation whose flask and
    // letterforms differ from the real mark, and browsers prefer SVG when
    // both are offered.
    icon: [{ url: "/logo.png", type: "image/png", sizes: "681x681" }],
    apple: "/logo.png",
  },
  openGraph: {
    title: "ISM Olympiad — International Science Movement",
    description:
      "Team Interdisciplinary Olympiad in Laboratory Research & Case-Based Science.",
    siteName: "ISM Olympiad",
    type: "website",
    locale: "en_US",
    alternateLocale: ["ru_RU", "kk_KZ"],
    images: [{ url: "/logo.png", width: 681, height: 681, alt: "ISM Olympiad" }],
  },
  twitter: {
    card: "summary",
    title: "ISM Olympiad — International Science Movement",
    description:
      "Team Interdisciplinary Olympiad in Laboratory Research & Case-Based Science.",
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1e3a5f",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable} scroll-smooth`}
    >
      <body className="bg-slate-50 text-slate-900 font-sans antialiased selection:bg-brand-800 selection:text-white">
        <LanguageProvider>{children}</LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
