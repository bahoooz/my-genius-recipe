import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { CookingPot } from "lucide-react";

type RecipeImagePreviewProps = {
  img: string;
  title: string;
};

export default function RecipeImagePreview({
  img,
  title,
}: RecipeImagePreviewProps) {
  return (
    <div className="min-h-32 max-h-32 overflow-hidden flex justify-center pt-12 items-center relative rounded-md">
      <h4 className="absolute -translate-y-1/2 -translate-x-1/2 left-1/2 top-1/2 text-white w-full text-center text-xl z-10 font-medium">
        {title}
      </h4>
      <div className="absolute inset-0 bg-black/40"></div>
      <Button className="absolute bg-white/80 text-black rounded-full bottom-3 right-3 h-6"><CookingPot className="min-w-4 min-h-4" /> Voir la recette</Button>
      <Image src={img} width={1536} height={1024} alt="recipe img" />
    </div>
  );
}
