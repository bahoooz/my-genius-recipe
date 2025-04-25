import ChatBox from "@/components/ChatBox";
import PowerPreview from "@/components/PowerPreview";
import Image from "next/image";

export default function Home() {
  return (
    <div className="px-4 pt-12">
      <div className="relative max-w-[300px] h-[115px] mx-auto mb-8">
        <h1 className="font-fredoka text-4xl font-medium leading-12">
          Bienvenue sur My Genius Recipe
        </h1>
        <Image
          src={"/assets/mascot.png"}
          alt="mascotte logo"
          width={1024}
          height={1024}
          className="absolute w-16 aspect-square right-1 bottom-0"
        />
      </div>
      <div>
        <p>Le meilleur générateur de recettes alimenté par l’IA 🤖 !</p> <br />
        <p>
          Entre tes ingrédients 🥩, choisis tes filtres 🔍, regarde à quoi
          ressemble l’excellente recette que tu vas cuisiner 🍜, suis les étapes
          de préparation 📝, sauvegarde ta recette ⭐, et puis savoure là 😋 !{" "}
        </p>
      </div>
      <ChatBox />
      <PowerPreview />
    </div>
  );
}