import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "MedicalIQA — Assistant IA médical sourcé et conforme HDS",
  description: "QA médicale sur protocoles, guidelines et dossiers — réponses sourcées avec citation, 0 hallucination, hébergement HDS.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body style={{ fontFamily: "var(--font-body)", background: "#eff6ff" }}>{children}</body>
    </html>
  );
}
