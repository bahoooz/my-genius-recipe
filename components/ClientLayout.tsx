"use client";

import React, { useEffect, useState } from "react";
import RecipeImageFullScreen from "./RecipeImageFullScreen";
import LoadingRecipeScreen from "./LoadingRecipeScreen";
import { useRecipeStore } from "@/store/recipeStore";
import FavoriteRecipeAlert from "./FavoriteRecipeAlert";
import { useAuth } from "@/lib/useAuth";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoadingRecipeGeneration = useRecipeStore(
    (state) => state.isLoadingRecipeGeneration
  );
  const ToastNotification = useRecipeStore((state) => state.ToastNotification);
  const isToastNotificationOpen = useRecipeStore(
    (state) => state.isToastNotificationOpen
  );
  const { getRemainingRecipes, setRemainingRecipes } = useRecipeStore();
  const { user } = useAuth();
  const [isClient, setIsClient] = useState(false);

  // Gérer l'hydratation et initialiser le compteur
  useEffect(() => {
    setIsClient(true);
    const count = getRemainingRecipes();
    setRemainingRecipes(count);
  }, [getRemainingRecipes, setRemainingRecipes]);

  // Réinitialiser le compteur quand l'utilisateur se connecte
  useEffect(() => {
    if (user && isClient) {
      setRemainingRecipes(5);
    }
  }, [user, setRemainingRecipes, isClient]);

  const remainingRecipes = getRemainingRecipes();

  return (
    <div className="relative h-dvh">
      {/* Affichage du compteur pour les utilisateurs non-connectés */}
      {!user && isClient && (
        <div className="fixed top-4 right-4 z-50 bg-[var(--color-brown-2)] text-white px-3 py-2 rounded-lg shadow-lg">
          <p className="text-sm">
            {remainingRecipes > 0 
              ? `🍽️ ${remainingRecipes} recette${remainingRecipes > 1 ? 's' : ''} gratuite${remainingRecipes > 1 ? 's' : ''}`
              : "⚠️ Plus de recettes gratuites !"
            }
          </p>
        </div>
      )}

      {isToastNotificationOpen && (
        <FavoriteRecipeAlert
          text={ToastNotification?.text || ""}
          icon={ToastNotification?.icon || null}
          bgColor={ToastNotification?.bgColor || "#000000"}
        />
      )}
      <RecipeImageFullScreen />
      {isLoadingRecipeGeneration && <LoadingRecipeScreen />}
      {children}
    </div>
  );
}
