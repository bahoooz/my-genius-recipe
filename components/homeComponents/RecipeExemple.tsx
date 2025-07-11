import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";
import { Button } from "../ui/button";
import { CookingPot, X } from "lucide-react";

type RecipeExempleTypes = {
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  image: string;
};

export default function RecipeExemple({
  title,
  description,
  ingredients,
  instructions,
  image,
}: RecipeExempleTypes) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="absolute bg-white/80 text-black rounded-full bottom-3 right-3 h-6">
          <CookingPot className="min-w-4 min-h-4" /> Voir la recette
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-fit p-0 bg-transparent shadow-none">
        <div className="bg-bg p-4 rounded-3xl shadow-lg max-h-fit text-brown-2 text-sm">
          <DialogHeader className="flex-row items-center">
            <Image
              className="aspect-square w-32 object-cover rounded-xl"
              src={image}
              alt="Food AI Image"
              width={1536}
              height={1024}
            />
            <DialogTitle className="font-fredoka text-2xl font-medium">
              {title}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <h3 className="text-base font-bold mb-1">Description :</h3>
            <p>{description}</p>
          </div>
          <div className="mt-4">
            <h3 className="text-base font-bold mb-1">Ingrédients :</h3>
            <ul className="max-h-[200px] overflow-y-auto">
              {ingredients.map((ingredient, i) => (
                <li key={i} className="list-disc ml-4">
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-base font-bold mb-1">
              Consignes de préparation :
            </h3>
            <ul className="max-h-[200px] overflow-y-auto">
              {instructions.map((instruction, i) => (
                <li key={i} className="mb-4">
                {instruction}
                </li>
              ))}
            </ul>
          </div>
          <Button
            className="w-full bg-brown-2 mt-6"
            size={"lg"}
            onClick={() => setIsOpen(false)}
          >
            <X className="min-w-6 min-h-6" /> Fermer la recette
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
