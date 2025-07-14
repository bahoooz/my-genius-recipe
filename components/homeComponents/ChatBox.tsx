"use client";

import React, { useEffect, useState } from "react";
import { Textarea } from "../ui/textarea";
import ChatBoxButton from "./ChatBoxButton";
import {
  Candy,
  Snowflake,
  Image,
  Flame,
  Drumstick,
  FileStack,
  CookingPot,
  Crown,
  Loader2,
  CircleX,
  CircleUserRound,
  WheatOff,
  Info,
  Wheat,
} from "lucide-react";
import { Button } from "../ui/button";
import { useRecipeStore } from "@/store/recipeStore";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/useAuth";

export default function ChatBox() {
  const {
    setRecipeData,
    setDialogOpen,
    setIsLoadingRecipeGeneration,
    isLoadingRecipeGeneration,
    getRemainingRecipes,
    setRemainingRecipes,
    setIsToastNotificationOpen,
    setToastNotification,
  } = useRecipeStore();

  const [ingredients, setIngredients] = useState("");
  const [coldRecipe, setColdRecipe] = useState(false);
  const [hotRecipe, setHotRecipe] = useState(false);
  const [sweetRecipe, setSweetRecipe] = useState(false);
  const [saltyRecipe, setSaltyRecipe] = useState(false);
  const [strictRecipe, setStrictRecipe] = useState(false);
  const [image, setImage] = useState(false);
  const [numberOfVersions, setNumberOfVersions] = useState(1);
  const [isOpenInfoText, setIsOpenInfoText] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const { user } = useAuth();

  const filters = {
    cold_recipe: coldRecipe,
    hot_recipe: hotRecipe,
    sweet_recipe: sweetRecipe,
    salty_recipe: saltyRecipe,
    strict_recipe: strictRecipe,
    image: image,
    number_of_versions: numberOfVersions,
  };

  const handleGenerated = async () => {
    try {
      const currentRemainingRecipes = !user ? getRemainingRecipes() : null;

      setIsLoadingRecipeGeneration(true);

      // Récupérer le token d'authentification via la session
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const token = session?.access_token;

      const recipe = await fetch("/api/recipe-generation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          ingredients,
          filters,
          remainingRecipes: currentRemainingRecipes,
        }),
      });

      const data = await recipe.json();

      // Si la réponse contient un nouveau nombre de recettes restantes, le mettre à jour
      if (
        data.remainingRecipes !== null &&
        data.remainingRecipes !== undefined
      ) {
        setRemainingRecipes(data.remainingRecipes);
      }

      // Gérer les erreurs de limite
      if (recipe.status === 429) {
        setIsToastNotificationOpen(true);
        setToastNotification({
          text: data.error,
          icon: <CircleX size={24} />,
          bgColor: "#B34646",
        });
        setIsLoadingRecipeGeneration(false);
        return;
      }

      setRecipeData(data);
      setDialogOpen(true);
      setIsLoadingRecipeGeneration(false);
    } catch (error) {
      console.log(error);
      setIsLoadingRecipeGeneration(false);
    }
  };

  useEffect(() => {
    async function getUserSubscription() {
      if (user?.id) {
        const { data, error } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("user_id", user?.id)
          .single();
        if (!error) {
          setUserData(data);
        }
      }
    }
    getUserSubscription();
  }, [user?.id]);

  return (
    <div className="mt-8">
      <div className=" bg-[var(--color-brown-1)] p-3 rounded-2xl overflow-hidden relative">
        <Textarea
          className="bg-[var(--color-brown-2)] border-none outline-none text-white placeholder:text-[#EBEBEB] h-14 max-h-14 rounded-lg mb-8"
          placeholder="Entrez les ingrédients ici... (3 ingrédients min. recommandés)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        />
        {isOpenInfoText && (
          <div className="absolute bg-bg w-[90%] left-1/2 -translate-x-1/2 h-fit z-20 top-1/2 p-4 rounded-xl font-medium text-sm popupinfo">
            Active ce filtre si tu veux des recettes{" "}
            <span className="text-[#F09F2D]">uniquement</span> avec les{" "}
            <span className="text-[#F09F2D]">ingrédients</span> que{" "}
            <span className="text-[#F09F2D]">tu as choisis</span>,{" "}
            <span className="text-[#F09F2D]">aucun autre rajouté</span> par
            notre IA !
          </div>
        )}
        <div className="bg-[var(--color-brown-2)] p-3 rounded-lg flex flex-col gap-3 overflow-hidden">
          <div className="relative">
            <Info
              onMouseEnter={() => setIsOpenInfoText(true)}
              onMouseLeave={() => setIsOpenInfoText(false)}
              className={`min-w-5 min-h-5 absolute right-2 top-2 z-50 cursor-pointer ${
                strictRecipe && "text-[#F09F2D]"
              }`}
            />
            <ChatBoxButton
              text="Recette stricte"
              icon={
                strictRecipe ? (
                  <WheatOff className="min-w-5 min-h-5" />
                ) : (
                  <Wheat className="min-w-5 min-h-5" />
                )
              }
              color="#F09F2D"
              onClick={() => setStrictRecipe(!strictRecipe)}
              isSelected={strictRecipe}
              className="w-full"
            />
          </div>
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
              icon={
                <div>
                  {!user && (
                    <CircleUserRound className="absolute top-1/2 left-2 -translate-y-1/2 min-w-[24px] min-h-[24px] text-red" />
                  )}{" "}
                  <Image className="min-w-6 min-h-6" />
                </div>
              }
              color="#5AC89F"
              onClick={() => setImage(!image)}
              isSelected={image}
              isDisabled={!user}
            />
            <ChatBoxButton
              icon={
                <div>
                  {(userData?.subscription === "free" || !user) && (
                    <Crown className="absolute top-1/2 left-2 -translate-y-1/2 min-w-[24px] min-h-[24px] text-yellow-500" />
                  )}
                  <FileStack className="min-w-6 min-h-6" />
                </div>
              }
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
              // isDisabled={userData?.subscription === "free" || !user}
              isDisabled
            />
          </div>
        </div>
      </div>
      <div className="flex">
        <Button
          onClick={handleGenerated}
          className="bg-[var(--color-brown-2)] rounded-xl mt-4 ml-auto"
          disabled={
            isLoadingRecipeGeneration ||
            (!user && getRemainingRecipes() <= 0) ||
            ingredients.length < 3
          }
        >
          {isLoadingRecipeGeneration ? (
            <Loader2 className="animate-spin" />
          ) : (
            <div className="flex items-center gap-2">
              <CookingPot size={20} /> Générer
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
