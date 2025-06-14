import type { Metadata } from "next";
import "./globals.css";
import { fredoka, quicksand } from "./font";
import MobileNavbar from "@/components/MobileNavbar";
import DesktopNavbar from "@/components/DesktopNavbar";
import ClientLayout from "@/components/ClientLayout";

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
    <html lang="fr" className="bg-[var(--color-bg)]">
      <body
        className={`${fredoka.variable} ${quicksand.variable} antialiased font-quicksand bg-[var(--bgColor)]`}
      >
        <ClientLayout>
          {children}
          <MobileNavbar className="block lg:hidden" />
          <DesktopNavbar className="hidden lg:block" />
        </ClientLayout>
      </body>
    </html>
  );
}
