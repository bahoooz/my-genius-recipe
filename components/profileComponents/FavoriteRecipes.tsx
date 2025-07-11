import React, { useState, useEffect } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselPreviousForFavoriteRecipes,
  CarouselNextForFavoriteRecipes,
} from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import { supabase } from "@/lib/supabase";
import RemoveFavoriteButton from "./RemoveFavoriteButton";
import SeeDetailsRecipeButton from "./SeeDetailsRecipeButton";

interface FavoriteRecipe {
  id: string;
  title: string;
  description: string;
  instructions: string;
  ingredients: string;
  created_at: string;
  image: string;
}

export default function FavoriteRecipes() {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDetailsId, setOpenDetailsId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        console.log("🔍 Début de la récupération des favoris...");

        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        console.log(
          "👤 Utilisateur:",
          user ? user.id : "Non connecté",
          userError
        );

        if (!user) {
          console.log("❌ Utilisateur non authentifié");
          setLoading(false);
          return;
        }

        // Récupérer les recettes favorites directement avec Supabase
        const { data, error } = await supabase
          .from("favorite_recipes")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        console.log("📊 Résultats de la requête:", { data, error });

        if (error) {
          console.error(
            "❌ Erreur lors de la récupération des favoris:",
            error
          );
        } else {
          console.log("✅ Favoris récupérés:", data);
          setFavorites(data);
        }
      } catch (error) {
        console.error("💥 Erreur lors de la récupération des favoris:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, []);

  // Debugging séparé pour surveiller les changements de favorites
  useEffect(() => {
    console.log("🎯 État actuel des favorites:", favorites);
  }, [favorites]);

  const toggleDetails = (recipeId: string) => {
    setOpenDetailsId((prev) => (prev === recipeId ? null : recipeId));
  };

  const closeDetails = () => {
    setOpenDetailsId(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-white">Chargement des favoris...</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="flex justify-center items-center h-48 bg-red max-w-[300px] px-4 rounded-2xl mb-4">
        <p className="text-white text-center">
          Vous n'avez pas de recette favorite pour le moment 🥯
        </p>
      </div>
    );
  }

  return (
    <div>
      <Carousel className="w-full md:max-w-[400px]">
        <h2 className="font-fredoka text-2xl text-red font-medium mb-2 ml-1">
          Recettes favorites
        </h2>
        <CarouselContent className={`${favorites.length === 1 && "mb-4"}`}>
          {favorites.map((favoriteRecipe) => (
            <CarouselItem key={favoriteRecipe.id}>
              <div className="p-1">
                <Card className="py-0 overflow-hidden shadow-none border-none">
                  <CardContent className="bg-brown-1 p-4 flex flex-col gap-4">
                    <h3 className="text-white text-xl font-medium">
                      {favoriteRecipe.title}
                    </h3>
                    {favoriteRecipe.image && (
                      <img
                        className="mx-auto rounded-2xl w-full max-w-[350px] lg:h-[150px] lg:hover:h-[286px] lg:cursor-pointer transition-all duration-500 object-cover"
                        src={favoriteRecipe.image}
                        alt={favoriteRecipe.title}
                      />
                    )}
                    <div className="flex md:flex-col 2xl:flex-row gap-3 justify-between">
                      <SeeDetailsRecipeButton
                        onClick={() => toggleDetails(favoriteRecipe.id)}
                        isOpen={openDetailsId === favoriteRecipe.id}
                      />
                      <RemoveFavoriteButton id={favoriteRecipe.id} />
                    </div>
                    {openDetailsId === favoriteRecipe.id && (
                      <div className="bg-red rounded-2xl w-full p-2 text-white">
                        <div className="mb-2">
                          <h4 className="text-sm font-bold mb-1">
                            Description :
                          </h4>
                          <p className="text-xs">
                            {favoriteRecipe.description}
                          </p>
                        </div>
                        <div className="mb-2">
                          <h4 className="text-sm font-bold mb-1">
                            Ingrédients :
                          </h4>
                          <div className="text-xs">
                            {favoriteRecipe.ingredients
                              .split("- ")
                              .filter((ingredient) => ingredient.trim())
                              .map((ingredient, index) => (
                                <div key={index}>- {ingredient.trim()}</div>
                              ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-bold mb-1">
                            Consignes de préparation :
                          </h4>
                          <div className="text-xs">
                            {favoriteRecipe.instructions
                              .split("\n")
                              .filter((instruction) => instruction.trim())
                              .map((instruction, index) => (
                                <div key={index} className="mb-2">
                                  {instruction.trim()}
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
              {favorites.length > 1 && (
                <div className="mb-8 mt-4">
                  <div className="flex justify-center items-center gap-3 text-red">
                    <div onClick={closeDetails}>
                      <CarouselPreviousForFavoriteRecipes />
                    </div>
                    <div onClick={closeDetails}>
                      <CarouselNextForFavoriteRecipes />
                    </div>
                  </div>
                </div>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
