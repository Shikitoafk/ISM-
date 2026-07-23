import type { Metadata } from "next";
import { Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { Analytics } from "@vercel/analytics/react";

const cinzelFont = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-serif",
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ISM Olympiad — International Science Movement",
  description: "Team Interdisciplinary Olympiad in Laboratory Research & Case-Based Science (Biology, Chemistry, Physics, Math, CS) for High School Students.",
  keywords: ["ISM", "Olympiad", "Chemistry", "Physics", "Biology", "Mathematics", "Computer Science", "Laboratory Research", "Science Competition"],
  openGraph: {
    title: "ISM Olympiad — International Science Movement",
    description: "Team Interdisciplinary Olympiad in Laboratory Research & Case-Based Science.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzelFont.variable} ${sansFont.variable} scroll-smooth`}>
      <body className="bg-slate-50 text-slate-900 font-sans antialiased selection:bg-brand-800 selection:text-white">
        <LanguageProvider>
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
