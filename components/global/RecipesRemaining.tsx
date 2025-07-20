import { useAuth } from "@/lib/useAuth";
import { useRecipeStore } from "@/store/recipeStore";
import React, { useEffect, useState } from "react";

export default function RecipesRemaining() {
  const { user } = useAuth();
  const { setRemainingRecipes, getRemainingRecipes } = useRecipeStore();
  const [isClient, setIsClient] = useState(false);
  const remainingRecipes = getRemainingRecipes();

  // Gérer l'hydratation et initialiser le compteur
  useEffect(() => {
    setIsClient(true);
    const count = getRemainingRecipes();
    setRemainingRecipes(count);
  }, [getRemainingRecipes, setRemainingRecipes]);

  useEffect(() => {
    if (user && isClient) {
      setRemainingRecipes(5);
    }
  }, [user, setRemainingRecipes, isClient]);
  return (
    <div className="fixed left-0 lg:left-24 bottom-14 lg:bottom-4 p-4 z-50 pointer-events-none opacity-80">
      {!user && isClient ? (
        <div className="text-center bg-red text-white px-3 py-2 rounded-lg shadow-lg">
          <p className="text-xs">
            {remainingRecipes > 0
              ? `🍽️ Génère jusqu'à ${remainingRecipes} recettes dès maintenant !`
              : "⚠️ Plus de recettes, créer ton compte !"}
          </p>
        </div>
      ) : ("")}
    </div>
  );
}
