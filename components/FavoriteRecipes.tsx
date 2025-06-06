import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, CookingPot, Star } from "lucide-react";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  CarouselPreviousForFavoriteRecipes,
  CarouselNextForFavoriteRecipes,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { supabase } from "@/lib/supabase";

interface FavoriteRecipe {
  id: string;
  title: string;
  recipe_image?: string;
  recipe_id: string;
  created_at: string;
}

export default function FavoriteRecipes() {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFavorites() {
      try {
        console.log("🔍 Début de la récupération des favoris...");
        
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        console.log("👤 Utilisateur:", user ? user.id : "Non connecté", userError);

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
          console.error("❌ Erreur lors de la récupération des favoris:", error);
        } else {
          console.log("✅ Favoris récupérés:", data);
          setFavorites(data || []);
        }
      } catch (error) {
        console.error('💥 Erreur lors de la récupération des favoris:', error);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-white">Chargement des favoris...</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-white">Aucune recette favorite trouvée</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center gap-3 text-red mt-4 mb-8">
        <ChevronLeft />
        <ChevronRight />
      </div>
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {favorites.map((favorite) => (
            <CarouselItem key={favorite.id}>
              <div className="p-1">
                <Card className="py-0">
                  <CardContent className="bg-brown-1 rounded-2xl p-4 flex flex-col gap-4">
                    <h2 className="font-fredoka text-2xl text-white font-medium">
                      Recettes favorites
                    </h2>
                    <Image
                      src={favorite.recipe_image || "/assets/img-power-preview/img-1.png"}
                      alt={`image recette ${favorite.title}`}
                      width={1536}
                      height={1024}
                      className="rounded-md"
                    />
                    <h3 className="text-white text-xl font-medium">{favorite.title}</h3>
                    <div className="flex justify-between">
                      <Button className="bg-red" size={"lg"}>
                        <CookingPot className="min-w-6 min-h-6" /> Voir la
                        recette
                      </Button>
                      <Button className="bg-yellow-btn text-black" size={"lg"}>
                        <Star className="min-w-6 min-h-6" /> Retirer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex justify-center gap-3 text-red mt-4 mb-8">
          <CarouselPreviousForFavoriteRecipes />
          <CarouselNextForFavoriteRecipes />
        </div>
      </Carousel>
    </div>
  );
}
