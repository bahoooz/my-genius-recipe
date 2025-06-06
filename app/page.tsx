"use client";

import BeforeDesktopVersion from "@/components/BeforeDesktopVersion";
import ChatBox from "@/components/ChatBox";
import PowerPreview from "@/components/PowerPreview";
import ResponseRecipe from "@/components/ResponseRecipe";
import Title from "@/components/Title";
import Image from "next/image";

export default function Home() {
  return (
    <div className="px-4 pt-12 md:pt-0 md:flex md:items-center md:justify-center md:min-h-screen">
      <div className="md:flex md:justify-center md:items-center md:gap-12 lg:gap-8 xl:gap-16 lg:h-[70dvh] lg:ml-12">
        <div className="md:max-w-[400px] 2xl:max-w-[500px] md:border-none md:p-8 md:border-brown-2 md:overflow-y-scroll md:h-[70dvh] custom-scrollbar">
          <div className="relative max-w-[300px] h-[115px] mx-auto mb-8">
            <Title title="Bienvenue sur My Genius Recipe" />
            <Image
              src={"/assets/mascot.png"}
              alt="mascotte logo"
              width={1024}
              height={1024}
              className="absolute w-16 aspect-square right-1 bottom-0"
            />
          </div>
          <div>
            <p>Le meilleur générateur de recettes alimenté par l'IA 🤖 !</p>{" "}
            <br />
            <p>
              Entre tes ingrédients 🥩, choisis tes filtres 🔍, regarde à quoi
              ressemble l'excellente recette que tu vas cuisiner 🍜, suis les
              étapes de préparation 📝, sauvegarde ta recette ⭐, et puis
              savoure là 😋 !{" "}
            </p>
          </div>
          <ChatBox />
          <ResponseRecipe />
          <PowerPreview />
        </div>
        <BeforeDesktopVersion svgHeight="xl:h-[415px]" />
      </div>
    </div>
  );
}
