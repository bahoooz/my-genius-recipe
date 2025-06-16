"use client";

import React, { useEffect, useState } from "react";
import {
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Dialog } from "./ui/dialog";
import { Button } from "./ui/button";
import { useRecipeStore } from "@/store/recipeStore";
import { ArrowLeft, Carrot, ChefHat, RotateCcw, Star, Eye, Crown, CircleCheckBig, CircleX } from "lucide-react";
import { useAuth } from "@/lib/useAuth";
import { supabase } from "@/lib/supabase";
import { getUserSubscription } from "@/lib/utils";

export default function ResponseRecipe() {
  const { isDialogOpen, setDialogOpen, recipeData, setIsOpenImageRecipe, setImageRecipe, setIsToastNotificationOpen, setToastNotification } = useRecipeStore();
  const [isOpenStepsRecipe, setIsOpenStepsRecipe] = useState(false);
  const [subscription, setSubscription] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    getUserSubscription({user, setSubscription})
  }, [user]);

  const handleAddToFavorites = async () => {
    if (!user) {
      setIsToastNotificationOpen(true);
              setToastNotification({
                text: "Connecte-toi pour ajouter des recettes à tes favoris !",
                icon: <CircleX size={24} />,
                bgColor: "#B34646",
              });
      return;
    }

    try {
      // Récupérer le token d'authentification
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await fetch("/api/manage-favorites/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({
          recipe: {
            content: recipeData,
            title: title || "Recette sans titre",
            description: description || "",
            ingredients: ingredients || "",
            instructions: instructions || "",
            image: recipeData?.imageUrl || "",
          },
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setIsToastNotificationOpen(true);
        setToastNotification({
          text: "Recette ajoutée aux favoris avec succès !",
          icon: <CircleCheckBig size={24} />,
          bgColor: "#05df72",
        });
      } else if (response.status === 409) {
        // Cas spécifique : recette déjà en favoris
        setIsToastNotificationOpen(true);
        setToastNotification({
          text: "Cette recette est déjà dans vos favoris !",
          icon: <CircleX size={24} />,
          bgColor: "#B34646",
        });
      } else {
        setIsToastNotificationOpen(true);
        setToastNotification({
          text: result.error || "Erreur lors de l'ajout aux favoris",
          icon: <CircleX size={24} />,
          bgColor: "#B34646",
        });
      }
    } catch (error) {
      console.error("Erreur:", error);
      setIsToastNotificationOpen(true);
      setToastNotification({
        text: "Erreur lors de l'ajout aux favoris",
        icon: <CircleX size={24} />,
        bgColor: "#B34646",
      });
    }
  };

  console.log(recipeData);
  console.log("URL de l'image:", recipeData?.imageUrl);

  if (!recipeData) {
    return null;
  }

  // Extraction des données avec regex
  const titleMatch = recipeData.recipe.match(/\*(.*?)\*/);
  const descriptionMatch = recipeData.recipe.match(/#(.*?)#/);
  const ingredientsMatch = recipeData.recipe.match(/\$(.*?)\$/s);
  const instructionsMatch = recipeData.recipe.match(/\*\*(.*?)\*\*/g);

  // Extraction des étapes une par une
  const stepsRecipe = [];
  let stepMatch;
  const stepRegex = /\*\*(.*?)\*\*/g;
  while ((stepMatch = stepRegex.exec(recipeData.recipe)) !== null) {
    stepsRecipe.push(stepMatch[1].trim());
  }

  const title = titleMatch ? titleMatch[1] : "";
  const description = descriptionMatch ? descriptionMatch[1] : "";
  const ingredients = ingredientsMatch ? ingredientsMatch[1] : "";
  const instructions = instructionsMatch
    ? instructionsMatch
        .map((match: string) => match.replace(/\*\*/g, ""))
        .join("\n")
    : "";

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[425px] max-h-fit p-0 bg-transparent shadow-none">
        <div className="bg-modal-bg p-4 rounded-3xl shadow-lg max-h-fit">
          <DialogHeader className="bg-white p-2 px-8 rounded-xl relative mb-4">
            <DialogTitle className="text-base flex items-center gap-2">
              {isOpenStepsRecipe ? (
                <div className="absolute -translate-x-1/2 -translate-y-1/2 left-0 top-0 bg-brown-2 rounded-full p-2">
                  <ChefHat className="min-w-7 min-h-7" color="white" />
                </div>
              ) : (
                ""
              )}
              {recipeData === "Erreur."
                ? "Une erreur est survenue lors de la génération de ta recette, veuillez réessayer."
                : isOpenStepsRecipe
                ? "Consignes de préparation de la recette"
                : title}
            </DialogTitle>
            <span className="absolute -top-4 -right-4 text-4xl rotate-16">
              👨‍🍳
            </span>
          </DialogHeader>
          <div className="mb-4">
            {isOpenStepsRecipe ? (
              <div className="overflow-y-auto max-h-[400px]">
                <ol className="list-inside space-y-2">
                  {stepsRecipe.map((step: string, idx: number) => (
                    <li
                      key={idx}
                      className="bg-white/50 p-2 rounded-lg shadow-sm text-sm"
                    >
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ) : (
              <>
                <div className="bg-white p-2 rounded-xl mb-4 h-[150px] relative">
                  <p className="text-black text-sm">{description}</p>
                  <span className="absolute -bottom-2 -left-4 text-4xl -rotate-20">
                    🥤
                  </span>
                </div>
                <div className="bg-white pt-2 pb-8 px-4 rounded-xl relative min-h-[200px]">
                  <ul className="list-disc list-inside text-sm">
                    {ingredients
                      .split("\n")
                      .filter(
                        (line: string) =>
                          line.trim() !== "" && line.trim() !== "/"
                      )
                      .map((ingredient: string, idx: number) => (
                        <li key={idx}>
                          {ingredient.replace(/^- /, "").trim()}
                        </li>
                      ))}
                  </ul>
                  <span className="absolute -bottom-2 -right-4 text-4xl rotate-16">
                    📜
                  </span>
                </div>
              </>
            )}
          </div>
          <div>
            {isOpenStepsRecipe ? (
              <div className="flex flex-row justify-between">
                <Button
                  size={"lg"}
                  className="bg-[#B34646] rounded-2xl h-10"
                  onClick={() => setDialogOpen(false)}
                >
                  <Carrot /> Régale toi ;)
                </Button>
                <Button
                  size={"lg"}
                  className="bg-white rounded-2xl text-[#F4895B] border-2 border-[#F4895B] h-10"
                  onClick={() => setIsOpenStepsRecipe(false)}
                >
                  <ArrowLeft /> Revenir en arrière
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <Button
                  size={"lg"}
                  onClick={() => {
                    setIsOpenStepsRecipe(true);
                  }}
                  className="bg-white text-[#F4895B] border-2 border-[#F4895B] w-full"
                >
                  <ChefHat className="min-w-5 min-h-5" /> Comment je prépare ça ?
                </Button>
                
                <Button disabled={subscription === "free" || !recipeData.imageUrl} size={"lg"} className="relative bg-white text-red border-2 border-red w-full" onClick={() => {
                  setIsOpenImageRecipe(true);
                  setImageRecipe(recipeData?.imageUrl);
                }}>
                  {subscription === "free" && <Crown className="absolute top-1/2 left-2 -translate-y-1/2 min-w-[24px] min-h-[24px] text-yellow-500" />} <Eye className="min-w-5 min-h-5" /> À quoi ça pourrait ressembler ?
                </Button>
              </div>
            )}
          </div>
        </div>
        <DialogFooter className="flex flex-row w-full justify-between">
          <Button
            size={"lg"}
            className="bg-brown-2 rounded-2xl min-h-10 cursor-pointer"
            onClick={() => setDialogOpen(false)}
          >
            <RotateCcw className="min-w-6 min-h-6" /> Nouveau
          </Button>
          <Button
            onClick={handleAddToFavorites}
            size={"lg"}
            className="bg-yellow-btn text-black rounded-2xl min-h-10 cursor-pointer"
          >
            <Star className="min-w-6 min-h-6" /> Mettre en favoris
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
