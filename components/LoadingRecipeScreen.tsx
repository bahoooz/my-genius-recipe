import Lottie from "lottie-react";
import React, { useState, useEffect } from "react";
import loadingCooking from "@/components/LoadingRecipeScreen.json";
import chefsList from "@/components/ListStarryChef.json";
import Image from "next/image";

export default function LoadingRecipeScreen() {
  const [randomChef, setRandomChef] = useState<any>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * chefsList.length);
    setRandomChef(chefsList[randomIndex]);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full p-4 h-full bg-black/50">
      <div className="w-full max-w-[400px] bg-red rounded-2xl p-4 text-white">
        <div className="flex items-center gap-6 mb-8">
          <div>
            <h2 className="font-fredoka text-xl font-medium mb-4">
              La recette est en cours de création par notre IA... 🍝
            </h2>
            <p>
              En attendant on te présente aléatoirement un chef étoilé réputé
              dans le monde 🌍
            </p>
          </div>
          <Lottie
            className="min-h-[128px] h-[128px] w-auto aspect-square"
            animationData={loadingCooking}
          />
        </div>
        {randomChef && (
          <div className="flex gap-6 items-center">
            <div>
              <h2 className="font-fredoka text-xl font-medium mb-4">
                {randomChef.name}
              </h2>
              <div>{randomChef.histoire}</div>
            </div>
            <div className="relative h-[128px] w-[128px]">
              <Image
                src={randomChef.image}
                alt={randomChef.name}
                width={100}
                height={100}
                className="rounded-full aspect-square object-cover min-w-[128px]"
                priority
              />
              <p className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-white">{randomChef.date}</p>
              <div className="absolute top-0 left-0 w-full h-full bg-black/20 rounded-full"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
