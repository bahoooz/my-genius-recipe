import type { Metadata } from "next";
import "./globals.css";
import { fredoka, quicksand } from "./font";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "My Genius Recipe",
  description: "Le meilleur générateur de recettes alimenté par l’IA 🤖 !",
  icons: {
    icon: "/assets/mascot_icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="bg-[var(--color-bg)] relative h-dvh">
      <body
        className={`${fredoka.variable} ${quicksand.variable} antialiased font-quicksand bg-[var(--bgColor)]`}
      >
        {children}
        <Navbar />
      </body>
    </html>
  );
}
