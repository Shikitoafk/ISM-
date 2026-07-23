import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const serifFont = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ISM Olympiad — International Science Movement",
  description: "Командная интердисциплинарная олимпиада по лабораторным исследованиям и научным кейсам (биология, химия, физика) для школьников 9–11 классов.",
  keywords: ["ISM", "олимпиада", "химия", "физика", "биология", "лабораторные исследования", "Satbayev University", "Өскемен ұлдарға арналған лицейі"],
  openGraph: {
    title: "ISM Olympiad — Team Science Movement",
    description: "Командная интердисциплинарная олимпиада по лабораторным исследованиям и научным кейсам.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${serifFont.variable} ${sansFont.variable} scroll-smooth`}>
      <body className="bg-navy-950 text-slate-100 font-sans antialiased selection:bg-amber-500 selection:text-navy-950">
        {children}
      </body>
    </html>
  );
}
