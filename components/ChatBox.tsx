"use client";

import React, { useState } from "react";
import { Textarea } from "./ui/textarea";
import ChatBoxButton from "./ChatBoxButton";
import {
  Candy,
  Snowflake,
  Image,
  Flame,
  Drumstick,
  FileStack,
  CookingPot,
} from "lucide-react";
import { Button } from "./ui/button";
import { useRecipeStore } from "@/store/recipeStore";

export default function ChatBox() {
  const setRecipeData = useRecipeStore((state) => state.setRecipeData);
  const setDialogOpen = useRecipeStore((state) => state.setDialogOpen);
  const [ingredients, setIngredients] = useState("");
  const [coldRecipe, setColdRecipe] = useState(false);
  const [hotRecipe, setHotRecipe] = useState(false);
  const [sweetRecipe, setSweetRecipe] = useState(false);
  const [saltyRecipe, setSaltyRecipe] = useState(false);
  const [image, setImage] = useState(false);
  const [numberOfVersions, setNumberOfVersions] = useState(1);

  const filters = {
    cold_recipe: coldRecipe,
    hot_recipe: hotRecipe,
    sweet_recipe: sweetRecipe,
    salty_recipe: saltyRecipe,
    image: image,
    number_of_versions: numberOfVersions,
  };

  const handleGenerated = async () => {
    try {
      const recipe = await fetch("/api/recipe-generation", {
        method: "POST",
        body: JSON.stringify({
          ingredients,
          filters,
        }),
      });
      const data = await recipe.json();
      setRecipeData(data);
      setDialogOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-8">
      <div className=" bg-[var(--color-brown-1)] p-3 rounded-2xl overflow-hidden">
        <Textarea
          className="bg-[var(--color-brown-2)] border-none outline-none text-white placeholder:text-[#EBEBEB] h-14 max-h-14 rounded-lg mb-8"
          placeholder="Entrez les ingrédients ici..."
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        <div className="bg-[var(--color-brown-2)] p-3 rounded-lg flex flex-col gap-3 overflow-hidden">
          <div className="flex justify-between gap-3">
            <ChatBoxButton
              text="Recette froide"
              icon={<Snowflake className="min-w-5 min-h-5" />}
              color="#79B3FF"
              onClick={() => setColdRecipe(!coldRecipe)}
              isSelected={coldRecipe}
            />
            <ChatBoxButton
              text="Recette sucrée"
              icon={<Candy className="min-w-5 min-h-5" />}
              color="#FF91DA"
              onClick={() => setSweetRecipe(!sweetRecipe)}
              isSelected={sweetRecipe}
            />
          </div>
          <div className="flex justify-between gap-3">
            <ChatBoxButton
              text="Recette chaude"
              icon={<Flame className="min-w-5 min-h-5" />}
              color="#D82202"
              onClick={() => setHotRecipe(!hotRecipe)}
              isSelected={hotRecipe}
            />
            <ChatBoxButton
              text="Recette salée"
              icon={<Drumstick className="min-w-5 min-h-5" />}
              color="#782400"
              onClick={() => setSaltyRecipe(!saltyRecipe)}
              isSelected={saltyRecipe}
            />
          </div>
          <div className="flex justify-between gap-3">
            <ChatBoxButton
              icon={<Image className="min-w-6 min-h-6" />}
              color="#5AC89F"
              onClick={() => setImage(!image)}
              isSelected={image}
            />
            <ChatBoxButton
              icon={<FileStack className="min-w-6 min-h-6" />}
              color="#686CD4"
              other={
                <span className="absolute -translate-x-1/2 -translate-y-1/2 top-[70%] left-[60%] text-sm font-bold">
                  {numberOfVersions}
                </span>
              }
              onClick={() => {
                setNumberOfVersions(numberOfVersions + 1);
                if (numberOfVersions >= 3) {
                  setNumberOfVersions(1);
                }
              }}
              isSelected={true}
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <Button
          onClick={handleGenerated}
          className="bg-[var(--color-brown-2)] rounded-xl mt-4 ml-auto"
        >
          <CookingPot size={20} /> Générer
        </Button>
      </div>
    </div>
  );
}
